import { z } from "zod";
import { MediaType, MediaStatus } from "@prisma/client";

export const TitlesQuerySchema = z.object({
  q: z.string().optional(),
  mediaType: z.array(z.nativeEnum(MediaType)).or(z.nativeEnum(MediaType)).optional(),
  genre: z.array(z.string()).or(z.string()).optional(),
  yearMin: z.coerce.number().int().optional(),
  yearMax: z.coerce.number().int().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
  franchise: z.string().optional(),
  minRating: z.coerce.number().min(0).max(10).optional(),
  status: z.nativeEnum(MediaStatus).optional(),
  adultContent: z.coerce.boolean().optional(),
  isDemoData: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
  cursor: z.coerce.number().int().optional(),
  countOnly: z.coerce.boolean().optional(),
  orderBy: z.enum(["popularity", "rating", "releaseYear", "canonicalTitle"]).optional(),
  orderDir: z.enum(["asc", "desc"]).default("desc"),
});

export type TitlesQuery = z.infer<typeof TitlesQuerySchema>;
