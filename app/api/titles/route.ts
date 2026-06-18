import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TitlesQuerySchema } from "@/lib/validations/titles";
import { buildFilterHash } from "@/lib/random";
import { getEligibleCount } from "@/lib/random";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    // Coerce array params
    if (params.mediaType && !Array.isArray(params.mediaType)) {
      params.mediaType = req.nextUrl.searchParams.getAll("mediaType") as unknown as string;
    }

    const parsed = TitlesQuerySchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { q, page, limit, cursor, countOnly, orderBy, orderDir, ...filterParams } = parsed.data;

    const where: Record<string, unknown> = { isHidden: false };

    if (!filterParams.adultContent) where.adultContent = false;
    if (filterParams.isDemoData !== undefined) where.isDemoData = filterParams.isDemoData;
    if (filterParams.status) where.status = filterParams.status;

    if (filterParams.mediaType) {
      const types = Array.isArray(filterParams.mediaType)
        ? filterParams.mediaType
        : [filterParams.mediaType];
      if (types.length > 0) where.mediaType = { in: types };
    }

    if (filterParams.yearMin || filterParams.yearMax) {
      where.releaseYear = {};
      if (filterParams.yearMin) (where.releaseYear as Record<string, number>).gte = filterParams.yearMin;
      if (filterParams.yearMax) (where.releaseYear as Record<string, number>).lte = filterParams.yearMax;
    }

    if (filterParams.country) where.country = filterParams.country;
    if (filterParams.language) where.language = filterParams.language;
    if (filterParams.minRating) where.rating = { gte: filterParams.minRating };

    if (q) {
      where.OR = [
        { canonicalTitle: { contains: q, mode: "insensitive" } },
        { originalTitle: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    if (filterParams.genre) {
      const genres = Array.isArray(filterParams.genre) ? filterParams.genre : [filterParams.genre];
      where.AND = genres.map((g: string) => ({ genres: { string_contains: g } }));
    }

    // Cursor pagination (more efficient than offset for large sets)
    if (cursor) {
      where.id = { gt: cursor };
    }

    if (countOnly) {
      const filterHash = buildFilterHash(where);
      const count = await getEligibleCount(filterHash, where as never);
      return NextResponse.json({ count, filterHash });
    }

    const [items, total] = await Promise.all([
      prisma.mediaTitle.findMany({
        where: where as never,
        select: {
          id: true,
          canonicalTitle: true,
          originalTitle: true,
          slug: true,
          mediaType: true,
          subType: true,
          status: true,
          releaseYear: true,
          endYear: true,
          country: true,
          language: true,
          genres: true,
          description: true,
          imageUrl: true,
          rating: true,
          popularity: true,
          isDemoData: true,
        },
        orderBy: orderBy
          ? { [orderBy]: orderDir }
          : { popularity: "desc" },
        take: limit,
        skip: cursor ? 0 : (page - 1) * limit,
      }),
      prisma.mediaTitle.count({ where: where as never }),
    ]);

    const normalized = items.map((item) => ({
      ...item,
      genres: Array.isArray(item.genres)
        ? item.genres
        : typeof item.genres === "string"
          ? (JSON.parse(item.genres as string) as string[])
          : [],
    }));

    return NextResponse.json({
      items: normalized,
      total,
      page,
      pageSize: limit,
      hasMore: page * limit < total,
      cursor: items[items.length - 1]?.id,
    });
  } catch (err) {
    console.error("[titles] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
