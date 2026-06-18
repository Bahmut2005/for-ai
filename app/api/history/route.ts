import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const GetHistorySchema = z.object({
  sessionId: z.string().min(1),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const parsed = GetHistorySchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid params" }, { status: 400 });
    }

    const { sessionId, page, limit } = parsed.data;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.spinHistory.findMany({
        where: { sessionId },
        include: {
          mediaTitle: {
            select: {
              id: true,
              canonicalTitle: true,
              originalTitle: true,
              slug: true,
              mediaType: true,
              releaseYear: true,
              imageUrl: true,
              genres: true,
              rating: true,
            },
          },
        },
        orderBy: { spunAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.spinHistory.count({ where: { sessionId } }),
    ]);

    const normalized = items.map((item) => ({
      ...item,
      mediaTitle: {
        ...item.mediaTitle,
        genres: Array.isArray(item.mediaTitle.genres)
          ? item.mediaTitle.genres
          : typeof item.mediaTitle.genres === "string"
            ? (JSON.parse(item.mediaTitle.genres as string) as string[])
            : [],
      },
    }));

    return NextResponse.json({
      items: normalized,
      total,
      page,
      pageSize: limit,
      hasMore: page * limit < total,
    });
  } catch (err) {
    console.error("[history GET] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
