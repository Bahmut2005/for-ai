"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, Calendar, Globe, Film, ArrowRight } from "lucide-react";
import { MediaType } from "@prisma/client";
import { SpinCandidateTitle } from "@/types/api";
import { MEDIA_TYPE_COLORS, MEDIA_TYPE_LABELS } from "@/lib/utils/constants";
import { clsx } from "clsx";

interface MediaResultCardProps {
  title: SpinCandidateTitle & {
    description?: string | null;
    rating?: number | null;
    country?: string | null;
    status?: string | null;
    episodeCount?: number | null;
    duration?: number | null;
    sourceName?: string | null;
    sourceUrl?: string | null;
    originalTitle?: string | null;
    slug?: string;
  };
  className?: string;
}

export function MediaResultCard({ title, className }: MediaResultCardProps) {
  const typeColor = MEDIA_TYPE_COLORS[title.mediaType as MediaType] ?? "#94a3b8";
  const typeLabel = MEDIA_TYPE_LABELS[title.mediaType as MediaType] ?? title.mediaType;

  return (
    <div
      className={clsx(
        "glass-bright relative overflow-hidden rounded-2xl",
        className
      )}
    >
      {/* Gradient accent bar */}
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${typeColor}, transparent)`,
        }}
      />

      <div className="flex gap-4 p-5 sm:gap-6 sm:p-6">
        {/* Poster */}
        <div className="relative h-40 w-28 flex-none overflow-hidden rounded-xl bg-void-800 sm:h-48 sm:w-32">
          {title.imageUrl ? (
            <Image
              src={title.imageUrl}
              alt={`${title.canonicalTitle} cover`}
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl opacity-30">
              {title.mediaType === "GAME"
                ? "🎮"
                : title.mediaType === "MANGA"
                  ? "📖"
                  : title.mediaType === "COMIC"
                    ? "💥"
                    : title.mediaType === "NOVEL" || title.mediaType === "LIGHT_NOVEL"
                      ? "📚"
                      : "🎬"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          {/* Type badge */}
          <div className="flex items-center gap-2">
            <span
              className="media-badge"
              style={{ backgroundColor: typeColor + "33", color: typeColor }}
            >
              {typeLabel}
            </span>
            {title.genres?.slice(0, 2).map((g) => (
              <span
                key={g}
                className="media-badge bg-white/5 text-white/60"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold leading-tight text-white sm:text-2xl">
            {title.canonicalTitle}
          </h3>

          {/* Original title */}
          {title.originalTitle && title.originalTitle !== title.canonicalTitle && (
            <p className="text-sm text-white/50">{title.originalTitle}</p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
            {title.releaseYear && (
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {title.releaseYear}
              </span>
            )}
            {title.country && (
              <span className="flex items-center gap-1">
                <Globe size={12} />
                {title.country}
              </span>
            )}
            {title.rating && (
              <span className="flex items-center gap-1">
                <Star size={12} className="text-neon-gold" />
                <span className="text-neon-gold">{title.rating.toFixed(1)}</span>
              </span>
            )}
            {title.episodeCount && (
              <span className="flex items-center gap-1">
                <Film size={12} />
                {title.episodeCount} eps
              </span>
            )}
          </div>

          {/* Description */}
          {title.description && (
            <p className="line-clamp-3 text-sm text-white/70">
              {title.description}
            </p>
          )}

          {/* Actions */}
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {title.slug && (
              <Link
                href={`/title/${title.slug}`}
                className="flex items-center gap-1.5 rounded-lg bg-neon-purple/20 px-3 py-1.5 text-sm font-medium text-neon-purple-bright transition-all hover:bg-neon-purple/30"
              >
                Full Details
                <ArrowRight size={12} />
              </Link>
            )}
            {title.sourceUrl && (
              <a
                href={title.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-glass-border px-3 py-1.5 text-sm text-white/60 transition-all hover:border-glass-border-bright hover:text-white"
              >
                {title.sourceName ?? "Source"}
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
