import { MediaType } from "@prisma/client";
import { MEDIA_TYPE_LABELS } from "./constants";

export function formatMediaType(type: MediaType): string {
  return MEDIA_TYPE_LABELS[type] ?? type;
}

export function formatYear(year: number | null | undefined): string {
  if (!year) return "Unknown";
  return String(year);
}

export function formatYearRange(
  start: number | null | undefined,
  end: number | null | undefined
): string {
  if (!start) return "Unknown";
  if (!end) return `${start}–Present`;
  if (start === end) return String(start);
  return `${start}–${end}`;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
