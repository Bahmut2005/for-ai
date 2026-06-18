import { MediaType, MediaStatus } from "@prisma/client";

export interface MediaTitleBasic {
  id: number;
  canonicalTitle: string;
  originalTitle: string | null;
  slug: string;
  mediaType: MediaType;
  subType: string | null;
  status: MediaStatus;
  releaseYear: number | null;
  endYear: number | null;
  country: string | null;
  language: string | null;
  genres: string[];
  description: string | null;
  imageUrl: string | null;
  rating: number | null;
  popularity: number;
  isDemoData: boolean;
}

export interface MediaTitleFull extends MediaTitleBasic {
  alternativeTitles: string[];
  themes: string[];
  episodeCount: number | null;
  volumeCount: number | null;
  duration: number | null;
  sourceUrl: string | null;
  sourceName: string | null;
  externalId: string | null;
  franchise: { id: number; name: string; slug: string } | null;
  universe: { id: number; name: string; slug: string } | null;
  bannerUrl: string | null;
  adultContent: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpinHistoryEntry {
  id: number;
  spunAt: Date;
  mediaTitle: MediaTitleBasic;
  filterHash: string | null;
}

export type FilterState = {
  mediaTypes?: MediaType[];
  genres?: string[];
  yearMin?: number;
  yearMax?: number;
  countries?: string[];
  languages?: string[];
  franchises?: string[];
  minRating?: number;
  onlyCompleted?: boolean;
  onlyOngoing?: boolean;
  familyFriendly?: boolean;
  includeAdult?: boolean;
  excludeIds?: number[];
  presetId?: string;
};

export type SpinMode = "direct" | "hierarchical" | "franchise" | "chaos";
