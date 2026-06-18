import { randomInt } from "crypto";
import { prisma } from "./db";
import { Prisma } from "@prisma/client";
import { addMinutes } from "date-fns";
import { createHash } from "crypto";

export interface RandomTitleOptions {
  where: Prisma.MediaTitleWhereInput;
  filterHash: string;
}

export async function getEligibleCount(
  filterHash: string,
  where: Prisma.MediaTitleWhereInput
): Promise<number> {
  const cached = await prisma.filterCountCache.findUnique({ where: { filterHash } });
  if (cached && cached.expiresAt > new Date()) return cached.totalCount;

  const count = await prisma.mediaTitle.count({ where });
  await prisma.filterCountCache.upsert({
    where: { filterHash },
    create: {
      filterHash,
      filterState: where as object,
      totalCount: count,
      computedAt: new Date(),
      expiresAt: addMinutes(new Date(), 5),
    },
    update: {
      totalCount: count,
      computedAt: new Date(),
      expiresAt: addMinutes(new Date(), 5),
    },
  });
  return count;
}

/**
 * Strategy 1: Offset sampling — accurate, O(offset) via PK index.
 * Safe up to ~100k eligible rows.
 */
async function offsetSample(
  where: Prisma.MediaTitleWhereInput,
  count: number
): Promise<number | null> {
  if (count === 0) return null;
  const offset = randomInt(0, count);
  const rows = await prisma.mediaTitle.findMany({
    where,
    select: { id: true },
    orderBy: { id: "asc" },
    take: 1,
    skip: offset,
  });
  return rows[0]?.id ?? null;
}

/**
 * Strategy 2: ID-range sampling — O(1) index scan.
 * May miss rows in sparse ID ranges; retries up to 3 times.
 */
async function idRangeSample(
  where: Prisma.MediaTitleWhereInput
): Promise<number | null> {
  const agg = await prisma.mediaTitle.aggregate({
    where,
    _min: { id: true },
    _max: { id: true },
  });
  const minId = agg._min.id;
  const maxId = agg._max.id;
  if (!minId || !maxId) return null;

  for (let attempt = 0; attempt < 3; attempt++) {
    const randomId = randomInt(minId, maxId + 1);
    const row = await prisma.mediaTitle.findFirst({
      where: { ...where, id: { gte: randomId } },
      select: { id: true },
      orderBy: { id: "asc" },
    });
    if (row) return row.id;

    // Wrap around to the lower end
    const wrap = await prisma.mediaTitle.findFirst({
      where: { ...where, id: { lte: randomId } },
      select: { id: true },
      orderBy: { id: "desc" },
    });
    if (wrap) return wrap.id;
  }
  return null;
}

/**
 * Select a cryptographically random title ID matching the given where clause.
 * Automatically chooses between strategies based on result set size.
 */
export async function selectRandomTitleId(opts: RandomTitleOptions): Promise<number | null> {
  const count = await getEligibleCount(opts.filterHash, opts.where);
  if (count === 0) return null;

  // Use ID-range for large unfiltered sets, offset for filtered sets
  if (count > 100_000 && !hasComplexFilters(opts.where)) {
    const id = await idRangeSample(opts.where);
    if (id !== null) return id;
  }

  return offsetSample(opts.where, count);
}

/**
 * Select multiple distinct random title IDs from the eligible pool.
 */
export async function selectRandomTitleIds(
  opts: RandomTitleOptions,
  desiredCount: number,
  excludeIds: number[] = []
): Promise<number[]> {
  const where: Prisma.MediaTitleWhereInput = excludeIds.length
    ? { ...opts.where, id: { notIn: excludeIds } }
    : opts.where;

  const count = await prisma.mediaTitle.count({ where });
  if (count === 0) return [];

  const take = Math.min(desiredCount, count);
  const candidates = new Set<number>();

  // For small result sets, just fetch all and shuffle
  if (count <= desiredCount * 3) {
    const rows = await prisma.mediaTitle.findMany({
      where,
      select: { id: true },
      orderBy: { id: "asc" },
    });
    const shuffled = rows.map((r) => r.id).sort(() => Math.random() - 0.5);
    return shuffled.slice(0, take);
  }

  // Otherwise use repeated offset sampling (reservoir-style)
  let attempts = 0;
  while (candidates.size < take && attempts < take * 4) {
    const offset = randomInt(0, count);
    const rows = await prisma.mediaTitle.findMany({
      where,
      select: { id: true },
      orderBy: { id: "asc" },
      take: 1,
      skip: offset,
    });
    if (rows[0]) candidates.add(rows[0].id);
    attempts++;
  }

  return Array.from(candidates);
}

function hasComplexFilters(where: Prisma.MediaTitleWhereInput): boolean {
  const keys = Object.keys(where);
  const simpleKeys = new Set(["isHidden", "adultContent", "isDemoData", "mediaType"]);
  return keys.some((k) => !simpleKeys.has(k));
}

export function buildFilterHash(filter: object): string {
  return createHash("sha256").update(JSON.stringify(filter)).digest("hex").slice(0, 16);
}
