import { PrismaClient, MediaType, MediaStatus } from "@prisma/client";
import { animeTitles } from "./anime";
import { mangaTitles } from "./manga";
import { movieTitles } from "./movies";
import { televisionTitles } from "./television";
import { animationTitles } from "./animation";
import { comicTitles } from "./comics";
import { gameTitles } from "./games";
import { bookTitles } from "./books";
import { webseriesTitles } from "./webseries";

const prisma = new PrismaClient();

function makeSlug(title: string, seen: Set<string>): string {
  const base = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);

  if (!seen.has(base)) {
    seen.add(base);
    return base;
  }
  let i = 2;
  while (seen.has(`${base}-${i}`)) i++;
  const unique = `${base}-${i}`;
  seen.add(unique);
  return unique;
}

function parseGenres(genres: string | unknown): string[] {
  if (typeof genres === "string") {
    try {
      return JSON.parse(genres) as string[];
    } catch {
      return [];
    }
  }
  return [];
}

async function seedExternalSources() {
  const sources = [
    { name: "AniList", baseUrl: "https://anilist.co", apiDocsUrl: "https://anilist.gitbook.io/anilist-apiv2-docs/" },
    { name: "TMDB", baseUrl: "https://www.themoviedb.org", apiDocsUrl: "https://developer.themoviedb.org/docs" },
    { name: "Jikan", baseUrl: "https://api.jikan.moe/v4", apiDocsUrl: "https://docs.api.jikan.moe/" },
    { name: "Kitsu", baseUrl: "https://kitsu.io/api/edge", apiDocsUrl: "https://kitsu.docs.apiary.io/" },
    { name: "TVMaze", baseUrl: "https://api.tvmaze.com", apiDocsUrl: "https://www.tvmaze.com/api" },
    { name: "Open Library", baseUrl: "https://openlibrary.org", apiDocsUrl: "https://openlibrary.org/developers/api" },
    { name: "Comic Vine", baseUrl: "https://comicvine.gamespot.com", apiDocsUrl: "https://comicvine.gamespot.com/api/" },
    { name: "IGDB", baseUrl: "https://www.igdb.com", apiDocsUrl: "https://api-docs.igdb.com/" },
    { name: "YouTube", baseUrl: "https://www.youtube.com", apiDocsUrl: "https://developers.google.com/youtube/v3" },
    { name: "Demo Data", baseUrl: "https://github.com/omniverse-wheel", apiDocsUrl: null },
    { name: "Netflix", baseUrl: "https://www.netflix.com", apiDocsUrl: null },
    { name: "Dropout", baseUrl: "https://www.dropout.tv", apiDocsUrl: null },
    { name: "Critical Role", baseUrl: "https://critrole.com", apiDocsUrl: null },
  ];

  for (const source of sources) {
    await prisma.externalSource.upsert({
      where: { name: source.name },
      create: source,
      update: { baseUrl: source.baseUrl },
    });
  }
  console.log(`✓ Seeded ${sources.length} external sources`);
}

async function seedTitles(
  titles: readonly Record<string, unknown>[],
  label: string
) {
  const slugsSeen = new Set<string>();

  // Pre-fetch existing slugs to avoid conflicts
  const existing = await prisma.mediaTitle.findMany({ select: { slug: true } });
  existing.forEach((r) => slugsSeen.add(r.slug));

  let inserted = 0;
  let skipped = 0;

  for (const raw of titles) {
    const title = raw as {
      canonicalTitle: string;
      originalTitle?: string;
      mediaType: MediaType;
      subType?: string;
      releaseYear?: number;
      endYear?: number;
      status?: MediaStatus;
      country?: string;
      language?: string;
      genres?: string;
      description?: string;
      rating?: number;
      popularity?: number;
      episodeCount?: number;
      duration?: number;
      imageUrl?: string;
      sourceUrl?: string;
      sourceName?: string;
      externalId?: string;
    };

    const slug = makeSlug(title.canonicalTitle, slugsSeen);
    const genres = parseGenres(title.genres);

    try {
      let sourceId: number | undefined;
      if (title.sourceName) {
        const source = await prisma.externalSource.findUnique({
          where: { name: title.sourceName },
        });
        sourceId = source?.id;
      }

      await prisma.mediaTitle.create({
        data: {
          canonicalTitle: title.canonicalTitle,
          originalTitle: title.originalTitle ?? null,
          slug,
          mediaType: title.mediaType,
          subType: title.subType ?? null,
          releaseYear: title.releaseYear ?? null,
          endYear: title.endYear ?? null,
          status: title.status ?? MediaStatus.COMPLETED,
          country: title.country ?? null,
          language: title.language ?? null,
          genres: JSON.stringify(genres),
          themes: "[]",
          alternativeTitles: "[]",
          description: title.description ?? null,
          rating: title.rating ?? null,
          popularity: title.popularity ?? 0,
          episodeCount: title.episodeCount ?? null,
          duration: title.duration ?? null,
          imageUrl: title.imageUrl ?? null,
          sourceUrl: title.sourceUrl ?? null,
          sourceName: title.sourceName ?? "Demo Data",
          externalId: title.externalId ?? null,
          externalSourceId: sourceId ?? null,
          isDemoData: true,
          isVerified: false,
        },
      });
      inserted++;
    } catch (err) {
      // Skip duplicates silently
      if (String(err).includes("Unique constraint")) {
        skipped++;
      } else {
        console.error(`  ✗ Error seeding "${title.canonicalTitle}":`, err);
        skipped++;
      }
    }
  }

  console.log(`✓ ${label}: ${inserted} inserted, ${skipped} skipped`);
}

async function main() {
  console.log("🌌 Starting Omniverse Wheel seed...\n");

  await seedExternalSources();

  await seedTitles(animeTitles as unknown as Record<string, unknown>[], "Anime");
  await seedTitles(mangaTitles as unknown as Record<string, unknown>[], "Manga");
  await seedTitles(movieTitles as unknown as Record<string, unknown>[], "Movies");
  await seedTitles(televisionTitles as unknown as Record<string, unknown>[], "Television");
  await seedTitles(animationTitles as unknown as Record<string, unknown>[], "Western Animation");
  await seedTitles(comicTitles as unknown as Record<string, unknown>[], "Comics");
  await seedTitles(gameTitles as unknown as Record<string, unknown>[], "Games");
  await seedTitles(bookTitles as unknown as Record<string, unknown>[], "Books & Light Novels");
  await seedTitles(webseriesTitles as unknown as Record<string, unknown>[], "Web Series");

  const total = await prisma.mediaTitle.count();
  console.log(`\n✨ Seed complete! Total records in database: ${total}`);
  console.log("   All demo records are marked isDemoData=true.");
  console.log("   Use the Import Wizard to add real data from external APIs.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
