import { z } from "zod";
import { MediaType } from "@prisma/client";

export const FilterStateSchema = z.object({
  mediaTypes: z.array(z.nativeEnum(MediaType)).optional(),
  genres: z.array(z.string()).optional(),
  yearMin: z.number().int().min(1900).max(2100).optional(),
  yearMax: z.number().int().min(1900).max(2100).optional(),
  countries: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  franchises: z.array(z.string()).optional(),
  minRating: z.number().min(0).max(10).optional(),
  maxRating: z.number().min(0).max(10).optional(),
  onlyCompleted: z.boolean().optional(),
  onlyOngoing: z.boolean().optional(),
  familyFriendly: z.boolean().optional(),
  includeAdult: z.boolean().optional(),
  includeDemoData: z.boolean().optional(),
  includeHidden: z.boolean().optional(),
  sessionId: z.string().optional(),
  excludeIds: z.array(z.number()).optional(),
  presetId: z.string().optional(),
});

export type FilterState = z.infer<typeof FilterStateSchema>;

export const SpinRequestSchema = FilterStateSchema;
export type SpinRequest = FilterState;

export const CandidateTitleSchema = z.object({
  id: z.number(),
  canonicalTitle: z.string(),
  originalTitle: z.string().nullable(),
  slug: z.string(),
  mediaType: z.nativeEnum(MediaType),
  releaseYear: z.number().nullable(),
  imageUrl: z.string().nullable(),
  genres: z.array(z.string()),
});

export type CandidateTitle = z.infer<typeof CandidateTitleSchema>;

export const SpinResponseSchema = z.object({
  winnerToken: z.string(),
  candidates: z.array(CandidateTitleSchema),
  winnerIndex: z.number(),
  totalEligible: z.number(),
});

export type SpinResponse = z.infer<typeof SpinResponseSchema>;
