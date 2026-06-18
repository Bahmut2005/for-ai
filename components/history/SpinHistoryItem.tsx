"use client";

import Image from "next/image";
import Link from "next/link";
import { SpinHistoryEntry } from "@/types/media";
import { MEDIA_TYPE_LABELS, MEDIA_TYPE_COLORS } from "@/lib/utils/constants";

interface SpinHistoryItemProps {
  entry: SpinHistoryEntry;
}

export function SpinHistoryItem({ entry }: SpinHistoryItemProps) {
  const { mediaTitle, spunAt } = entry;
  const color = MEDIA_TYPE_COLORS[mediaTitle.mediaType];
  const label = MEDIA_TYPE_LABELS[mediaTitle.mediaType];

  return (
    <Link
      href={`/title/${mediaTitle.slug}`}
      className="glass group flex items-center gap-3 rounded-xl border border-glass-border p-3 transition-colors hover:border-neon-purple/30 hover:bg-white/5"
    >
      <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-void-800">
        {mediaTitle.imageUrl ? (
          <Image
            src={mediaTitle.imageUrl}
            alt={mediaTitle.canonicalTitle}
            fill
            className="object-cover"
            sizes="40px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-lg">🎴</span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white group-hover:text-neon-purple-bright">
          {mediaTitle.canonicalTitle}
        </p>
        <div className="mt-0.5 flex items-center gap-2">
          <span
            className="rounded px-1.5 py-0.5 text-xs font-medium"
            style={{ color, backgroundColor: `${color}22` }}
          >
            {label}
          </span>
          {mediaTitle.releaseYear && (
            <span className="text-xs text-white/40">{mediaTitle.releaseYear}</span>
          )}
        </div>
      </div>

      <time className="shrink-0 text-xs text-white/30">
        {new Date(spunAt).toLocaleDateString()}
      </time>
    </Link>
  );
}
