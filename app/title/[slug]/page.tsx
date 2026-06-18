import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { MEDIA_TYPE_LABELS, MEDIA_TYPE_COLORS, COUNTRIES } from "@/lib/utils/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const title = await prisma.mediaTitle.findUnique({ where: { slug } });
  if (!title) return { title: "Not Found" };
  return { title: `${title.canonicalTitle} — The Omniverse Wheel` };
}

export default async function TitleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const title = await prisma.mediaTitle.findUnique({
    where: { slug, isHidden: false },
  });

  if (!title) notFound();

  const genres = Array.isArray(title.genres)
    ? (title.genres as string[])
    : typeof title.genres === "string"
    ? (JSON.parse(title.genres as string) as string[])
    : [];

  const color = MEDIA_TYPE_COLORS[title.mediaType];
  const typeLabel = MEDIA_TYPE_LABELS[title.mediaType];

  const relatedRaw = await prisma.mediaTitle.findMany({
    where: {
      isHidden: false,
      mediaType: title.mediaType,
      id: { not: title.id },
    },
    select: {
      id: true,
      canonicalTitle: true,
      slug: true,
      mediaType: true,
      releaseYear: true,
      imageUrl: true,
    },
    orderBy: { popularity: "desc" },
    take: 6,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
        ← Back to Wheel
      </Link>

      <div className="grid gap-8 md:grid-cols-[auto_1fr]">
        {/* Poster */}
        <div className="relative mx-auto h-64 w-44 shrink-0 overflow-hidden rounded-2xl border border-glass-border bg-void-800 md:h-72 md:w-48">
          {title.imageUrl ? (
            <Image src={title.imageUrl} alt={title.canonicalTitle} fill className="object-cover" sizes="192px" />
          ) : (
            <Image src="/images/placeholder-poster.svg" alt="No image" fill className="object-cover" sizes="192px" />
          )}
        </div>

        {/* Info */}
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className="rounded-lg px-2.5 py-1 text-xs font-bold"
              style={{ color, backgroundColor: `${color}22` }}
            >
              {typeLabel}
            </span>
            {title.status && (
              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-white/50">
                {title.status}
              </span>
            )}
            {title.isDemoData && (
              <span className="rounded-lg bg-yellow-500/10 px-2.5 py-1 text-xs text-yellow-400/70">
                Demo Data
              </span>
            )}
          </div>

          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            {title.canonicalTitle}
          </h1>
          {title.originalTitle && title.originalTitle !== title.canonicalTitle && (
            <p className="mt-1 text-base text-white/40">{title.originalTitle}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50">
            {title.releaseYear && (
              <span>{title.releaseYear}{title.endYear && title.endYear !== title.releaseYear ? `–${title.endYear}` : ""}</span>
            )}
            {title.country && <span>{COUNTRIES[title.country] ?? title.country}</span>}
            {title.rating && <span>★ {title.rating.toFixed(1)}</span>}
          </div>

          {genres.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {genres.map((g) => (
                <span key={g} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                  {g}
                </span>
              ))}
            </div>
          )}

          {title.description && (
            <p className="mt-4 text-sm leading-relaxed text-white/70">{title.description}</p>
          )}

          {title.sourceUrl && (
            <a
              href={title.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-glass-border px-3 py-1.5 text-xs text-white/40 hover:border-white/30 hover:text-white transition-colors"
            >
              View on {title.sourceName ?? "Source"} ↗
            </a>
          )}
        </div>
      </div>

      {/* Related */}
      {relatedRaw.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-display text-lg font-bold text-white/70">
            More {typeLabel}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {relatedRaw.map((r) => (
              <Link
                key={r.id}
                href={`/title/${r.slug}`}
                className="glass group rounded-xl border border-glass-border p-2 transition-colors hover:border-neon-purple/30"
              >
                <div className="relative mb-2 aspect-[2/3] overflow-hidden rounded-lg bg-void-800">
                  {r.imageUrl ? (
                    <Image src={r.imageUrl} alt={r.canonicalTitle} fill className="object-cover" sizes="120px" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl">🎴</div>
                  )}
                </div>
                <p className="line-clamp-2 text-xs text-white/70 group-hover:text-white">
                  {r.canonicalTitle}
                </p>
                {r.releaseYear && (
                  <p className="mt-0.5 text-xs text-white/30">{r.releaseYear}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
