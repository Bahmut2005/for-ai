import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { prisma } from "@/lib/db";
import { buildFilterHash, selectRandomTitleId, selectRandomTitleIds } from "@/lib/random";
import { SpinRequestSchema } from "@/lib/validations/spin";
import { buildWhereClause } from "@/lib/filter-builder";
import { WHEEL_PHYSICS } from "@/lib/utils/constants";

const JWT_SECRET = new TextEncoder().encode(
  process.env.SPIN_JWT_SECRET ?? "dev-secret-change-in-production"
);
const JWT_TTL = Number(process.env.SPIN_JWT_TTL_SECONDS ?? 15);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SpinRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid filter state", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const filters = parsed.data;
    const filterHash = buildFilterHash(filters);
    const where = buildWhereClause(filters);

    // Select the winner cryptographically FIRST
    const winnerId = await selectRandomTitleId({ where, filterHash });

    if (!winnerId) {
      return NextResponse.json(
        { error: "No titles match the current filters. Try adjusting your selection." },
        { status: 404 }
      );
    }

    // Fetch winner details
    const winner = await prisma.mediaTitle.findUnique({
      where: { id: winnerId },
      select: {
        id: true,
        canonicalTitle: true,
        originalTitle: true,
        slug: true,
        mediaType: true,
        releaseYear: true,
        imageUrl: true,
        genres: true,
        description: true,
        rating: true,
        country: true,
        episodeCount: true,
        duration: true,
        sourceName: true,
        sourceUrl: true,
        status: true,
      },
    });

    if (!winner) {
      return NextResponse.json({ error: "Failed to resolve winner" }, { status: 500 });
    }

    // Get display candidates (SEGMENT_COUNT - 1 additional titles)
    const additionalCount = WHEEL_PHYSICS.SEGMENT_COUNT - 1;
    const additionalIds = await selectRandomTitleIds(
      { where, filterHash },
      additionalCount,
      [winnerId]
    );

    const additionalTitles = await prisma.mediaTitle.findMany({
      where: { id: { in: additionalIds } },
      select: {
        id: true,
        canonicalTitle: true,
        originalTitle: true,
        slug: true,
        mediaType: true,
        releaseYear: true,
        imageUrl: true,
        genres: true,
      },
    });

    // Build candidate array with winner at a random position
    const winnerIndex = Math.floor(Math.random() * WHEEL_PHYSICS.SEGMENT_COUNT);
    const candidates = [...additionalTitles];
    candidates.splice(winnerIndex, 0, {
      ...winner,
      genres: winner.genres,
    });

    // Ensure we have exactly SEGMENT_COUNT candidates (pad if needed)
    while (candidates.length < WHEEL_PHYSICS.SEGMENT_COUNT) {
      const lastTitle = additionalTitles[candidates.length % additionalTitles.length];
      if (lastTitle) candidates.push(lastTitle);
      else break;
    }

    // Normalize genres from JSON string to array
    const normalizedCandidates = candidates.slice(0, WHEEL_PHYSICS.SEGMENT_COUNT).map((c) => ({
      ...c,
      genres: Array.isArray(c.genres)
        ? c.genres
        : typeof c.genres === "string"
          ? (JSON.parse(c.genres as string) as string[])
          : [],
    }));

    // Sign winner token (short-lived JWT — 15 seconds)
    const winnerToken = await new SignJWT({ winnerId, filterHash })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${JWT_TTL}s`)
      .sign(JWT_SECRET);

    // Record spin in history (fire and forget)
    const sessionId = (filters as { sessionId?: string }).sessionId ?? "anonymous";
    prisma.spinHistory
      .create({
        data: {
          sessionId,
          mediaTitleId: winnerId,
          filterHash,
          wheelConfig: { candidateIds: normalizedCandidates.map((c) => c.id) },
        },
      })
      .catch(() => {}); // non-blocking

    return NextResponse.json({
      winnerToken,
      candidates: normalizedCandidates,
      winnerIndex,
      totalEligible: await prisma.mediaTitle.count({ where }).catch(() => 0),
    });
  } catch (err) {
    console.error("[spin] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
