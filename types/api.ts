import { MediaTitleBasic, MediaTitleFull, SpinHistoryEntry } from "./media";

export interface ApiResponse<T> {
  data: T;
  error?: never;
}

export interface ApiError {
  data?: never;
  error: string;
  code?: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  cursor?: number;
}

export interface SpinCandidateTitle {
  id: number;
  canonicalTitle: string;
  originalTitle: string | null;
  slug: string;
  mediaType: string;
  releaseYear: number | null;
  imageUrl: string | null;
  genres: string[];
}

export interface SpinResponse {
  winnerToken: string;
  candidates: SpinCandidateTitle[];
  winnerIndex: number;
  totalEligible: number;
}

export interface TitlesResponse extends PaginatedResponse<MediaTitleBasic> {}

export interface HistoryResponse extends PaginatedResponse<SpinHistoryEntry> {}

export interface TitleDetailResponse {
  title: MediaTitleFull;
  relatedTitles: MediaTitleBasic[];
}

export interface CountResponse {
  count: number;
  filterHash: string;
}
