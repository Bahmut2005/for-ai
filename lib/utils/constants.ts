import { MediaType } from "@prisma/client";

export const WHEEL_PHYSICS = {
  SEGMENT_COUNT: 24,
  INITIAL_VELOCITY: 2400,
  DECEL_DURATION: 5500,
  MIN_ROTATIONS: 5,
  REVEAL_DELAY: 500,
} as const;

export const MEDIA_TYPE_LABELS: Record<MediaType, string> = {
  ANIME: "Anime",
  MANGA: "Manga",
  MOVIE: "Movie",
  TELEVISION: "Television",
  ANIMATION: "Animation",
  COMIC: "Comics",
  GAME: "Game",
  LIGHT_NOVEL: "Light Novel",
  NOVEL: "Novel",
  WEB_SERIES: "Web Series",
  OVA: "OVA",
  ONA: "ONA",
  SPECIAL: "Special",
  OTHER: "Other",
};

export const MEDIA_TYPE_COLORS: Record<MediaType, string> = {
  ANIME: "#ef4444",
  MANGA: "#f97316",
  MOVIE: "#3b82f6",
  TELEVISION: "#06b6d4",
  ANIMATION: "#8b5cf6",
  COMIC: "#eab308",
  GAME: "#22c55e",
  LIGHT_NOVEL: "#ec4899",
  NOVEL: "#a78bfa",
  WEB_SERIES: "#14b8a6",
  OVA: "#fb923c",
  ONA: "#f43f5e",
  SPECIAL: "#94a3b8",
  OTHER: "#64748b",
};

export const PRESET_WHEELS = [
  {
    id: "every-anime",
    name: "Every Anime",
    description: "All anime series and films in the database",
    emoji: "⛩️",
    filters: { mediaTypes: ["ANIME", "OVA", "ONA", "SPECIAL"] },
  },
  {
    id: "anime-90s",
    name: "Anime From the 1990s",
    description: "Classic anime from the golden 90s era",
    emoji: "📼",
    filters: { mediaTypes: ["ANIME", "OVA"], decadeStart: 1990, decadeEnd: 1999 },
  },
  {
    id: "modern-anime",
    name: "Modern Anime",
    description: "Anime from 2010 to present",
    emoji: "✨",
    filters: { mediaTypes: ["ANIME", "ONA"], yearMin: 2010 },
  },
  {
    id: "marvel-dc",
    name: "Marvel & DC",
    description: "Comics and adaptations from the Big Two",
    emoji: "🦸",
    filters: { franchises: ["Marvel", "DC Comics"] },
  },
  {
    id: "indie-comics",
    name: "Independent Comics",
    description: "Comics from outside the Big Two",
    emoji: "📓",
    filters: { mediaTypes: ["COMIC"], excludeFranchises: ["Marvel", "DC Comics"] },
  },
  {
    id: "every-movie",
    name: "Every Movie",
    description: "Films from around the world",
    emoji: "🎬",
    filters: { mediaTypes: ["MOVIE"] },
  },
  {
    id: "horror-roulette",
    name: "Horror Roulette",
    description: "If you dare…",
    emoji: "👻",
    filters: { genres: ["Horror"] },
  },
  {
    id: "fantasy-roulette",
    name: "Fantasy Roulette",
    description: "Magic, dragons, and other worlds",
    emoji: "🐉",
    filters: { genres: ["Fantasy"] },
  },
  {
    id: "sci-fi-roulette",
    name: "Sci-Fi Roulette",
    description: "Futures, AIs, and the cosmos",
    emoji: "🚀",
    filters: { genres: ["Sci-Fi", "Science Fiction"] },
  },
  {
    id: "animation-only",
    name: "Animation Only",
    description: "All animated series and films",
    emoji: "🎨",
    filters: { mediaTypes: ["ANIME", "ANIMATION", "OVA", "ONA"] },
  },
  {
    id: "live-action-only",
    name: "Live Action Only",
    description: "Real people, real drama",
    emoji: "🎭",
    filters: { mediaTypes: ["MOVIE", "TELEVISION", "WEB_SERIES"] },
  },
  {
    id: "chaos-mode",
    name: "Chaos Mode",
    description: "Completely Unhinged Omniverse Mode — anything goes",
    emoji: "🌀",
    filters: {},
  },
] as const;

export const SPIN_MODES = [
  { id: "direct", name: "Direct Title Spin", description: "Spin directly to a title" },
  { id: "hierarchical", name: "Hierarchical Spin", description: "Category → Genre → Title" },
  { id: "franchise", name: "Franchise Spin", description: "Spin a franchise, then a title" },
  { id: "chaos", name: "Chaos Mode", description: "Everything, randomized" },
] as const;

export const COUNTRIES: Record<string, string> = {
  JP: "Japan",
  US: "United States",
  KR: "South Korea",
  CN: "China",
  FR: "France",
  GB: "United Kingdom",
  DE: "Germany",
  IT: "Italy",
  ES: "Spain",
  IN: "India",
  BR: "Brazil",
  CA: "Canada",
  AU: "Australia",
  MX: "Mexico",
  RU: "Russia",
};
