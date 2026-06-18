"use client";

import { useCallback } from "react";
import { useWheelStore } from "@/store/wheelStore";
import { FilterState } from "@/types/media";

export function useFilters() {
  const { filters, setFilters, updateFilter, clearFilters, applyPreset } = useWheelStore();

  const toggleMediaType = useCallback(
    (type: string) => {
      const current = filters.mediaTypes ?? [];
      const next = current.includes(type as never)
        ? current.filter((t) => t !== type)
        : [...current, type as never];
      updateFilter("mediaTypes", next.length > 0 ? (next as never) : undefined);
    },
    [filters.mediaTypes, updateFilter]
  );

  const toggleGenre = useCallback(
    (genre: string) => {
      const current = filters.genres ?? [];
      const next = current.includes(genre)
        ? current.filter((g) => g !== genre)
        : [...current, genre];
      updateFilter("genres", next.length > 0 ? next : undefined);
    },
    [filters.genres, updateFilter]
  );

  const setYearRange = useCallback(
    (min?: number, max?: number) => {
      setFilters({ ...filters, yearMin: min, yearMax: max });
    },
    [filters, setFilters]
  );

  const activeFilterCount = [
    filters.mediaTypes?.length,
    filters.genres?.length,
    filters.yearMin || filters.yearMax ? 1 : 0,
    filters.countries?.length,
    filters.languages?.length,
    filters.minRating ? 1 : 0,
    filters.onlyCompleted || filters.onlyOngoing ? 1 : 0,
  ]
    .filter(Boolean)
    .reduce((a: number, b) => a + (typeof b === "number" ? b : 0), 0);

  return {
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    applyPreset,
    toggleMediaType,
    toggleGenre,
    setYearRange,
    activeFilterCount,
  };
}

export function useFilterSummary(filters: FilterState): string {
  const parts: string[] = [];
  if (filters.mediaTypes?.length) parts.push(filters.mediaTypes.join(", "));
  if (filters.genres?.length) parts.push(filters.genres.join(", "));
  if (filters.yearMin && filters.yearMax) parts.push(`${filters.yearMin}–${filters.yearMax}`);
  else if (filters.yearMin) parts.push(`From ${filters.yearMin}`);
  else if (filters.yearMax) parts.push(`Until ${filters.yearMax}`);
  return parts.length > 0 ? parts.join(" · ") : "All media";
}
