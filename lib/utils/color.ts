import { MediaType } from "@prisma/client";

const MEDIA_TYPE_HUE: Record<MediaType, number> = {
  ANIME: 0,
  MANGA: 24,
  MOVIE: 220,
  TELEVISION: 185,
  ANIMATION: 270,
  COMIC: 48,
  GAME: 140,
  LIGHT_NOVEL: 320,
  NOVEL: 260,
  WEB_SERIES: 170,
  OVA: 15,
  ONA: 345,
  SPECIAL: 210,
  OTHER: 200,
};

export function generateSegmentColor(
  mediaType: MediaType,
  index: number,
  total: number
): { bg: string; text: string; glow: string } {
  const baseHue = MEDIA_TYPE_HUE[mediaType] ?? 200;
  const hueVariation = ((index / total) * 30 - 15) | 0;
  const hue = (baseHue + hueVariation + 360) % 360;
  const saturation = 70 + ((index % 3) * 5);
  const lightness = 35 + ((index % 2) * 8);

  const bg = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const text = lightness > 45 ? "#000000" : "#ffffff";
  const glow = `hsl(${hue}, ${saturation}%, ${Math.min(lightness + 30, 80)}%)`;

  return { bg, text, glow };
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
