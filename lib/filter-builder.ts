import { Prisma } from "@prisma/client";
import { FilterState } from "@/types/media";

export function buildWhereClause(filters: FilterState): Prisma.MediaTitleWhereInput {
  const where: Prisma.MediaTitleWhereInput = {
    isHidden: false,
  };

  // Adult content
  if (!filters.includeAdult) {
    where.adultContent = false;
  }

  // Family friendly
  if (filters.familyFriendly) {
    where.adultContent = false;
  }

  // Media types
  if (filters.mediaTypes && filters.mediaTypes.length > 0) {
    where.mediaType = { in: filters.mediaTypes };
  }

  // Year range
  if (filters.yearMin || filters.yearMax) {
    where.releaseYear = {};
    if (filters.yearMin) where.releaseYear.gte = filters.yearMin;
    if (filters.yearMax) where.releaseYear.lte = filters.yearMax;
  }

  // Countries
  if (filters.countries && filters.countries.length > 0) {
    where.country = { in: filters.countries };
  }

  // Languages
  if (filters.languages && filters.languages.length > 0) {
    where.language = { in: filters.languages };
  }

  // Rating
  if (filters.minRating !== undefined) {
    where.rating = { gte: filters.minRating };
  }

  // Status filters
  if (filters.onlyCompleted) {
    where.status = "COMPLETED";
  } else if (filters.onlyOngoing) {
    where.status = "ONGOING";
  }

  // Exclude previously seen titles
  if (filters.excludeIds && filters.excludeIds.length > 0) {
    where.id = { notIn: filters.excludeIds };
  }

  // Genres (JSON array search — partial match)
  if (filters.genres && filters.genres.length > 0) {
    where.OR = filters.genres.map((genre) => ({
      genres: { string_contains: genre },
    }));
  }

  return where;
}
