"use client";

import { useFilters } from "@/hooks/useFilters";
import { MediaTypeToggle } from "@/components/filters/MediaTypeToggle";
import { GenreMultiSelect } from "@/components/filters/GenreMultiSelect";
import { YearRangePicker } from "@/components/filters/YearRangePicker";
import Link from "next/link";

export default function FiltersPage() {
  const { filters, updateFilter, clearFilters, setYearRange, activeFilterCount } = useFilters();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">
          Advanced Filters
          {activeFilterCount > 0 && (
            <span className="ml-3 rounded-full bg-neon-purple/30 px-2.5 py-0.5 text-sm text-neon-purple-bright">
              {activeFilterCount} active
            </span>
          )}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={clearFilters}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 hover:border-white/30 hover:text-white transition-colors"
          >
            Clear All
          </button>
          <Link href="/" className="btn-primary text-sm">
            Go to Wheel
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Media Type
          </h2>
          <MediaTypeToggle
            selected={filters.mediaTypes ?? []}
            onChange={(types) => updateFilter("mediaTypes", types.length ? types : undefined)}
          />
        </section>

        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Genres
          </h2>
          <GenreMultiSelect
            selected={filters.genres ?? []}
            onChange={(genres) => updateFilter("genres", genres.length ? genres : undefined)}
          />
        </section>

        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Release Year
          </h2>
          <YearRangePicker
            yearMin={filters.yearMin}
            yearMax={filters.yearMax}
            onChange={setYearRange}
          />
        </section>

        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Rating
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={filters.minRating ?? 0}
              onChange={(e) =>
                updateFilter("minRating", Number(e.target.value) > 0 ? Number(e.target.value) : undefined)
              }
              className="flex-1 accent-neon-purple"
            />
            <span className="w-16 text-right text-sm text-white/70">
              {filters.minRating ? `≥ ${filters.minRating}` : "Any"}
            </span>
          </div>
        </section>

        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Status & Content
          </h2>
          <div className="space-y-4">
            {[
              { key: "onlyCompleted" as const, label: "Completed series only", desc: "Exclude ongoing and cancelled titles" },
              { key: "onlyOngoing" as const, label: "Ongoing only", desc: "Only currently airing/publishing titles" },
              { key: "familyFriendly" as const, label: "Family friendly", desc: "Exclude mature-rated content" },
            ].map(({ key, label, desc }) => (
              <label key={key} className="flex cursor-pointer items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white/80">{label}</p>
                  <p className="text-xs text-white/40">{desc}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={!!filters[key]}
                  onClick={() => updateFilter(key, !filters[key] || undefined)}
                  className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors ${
                    filters[key] ? "bg-neon-purple" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      filters[key] ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
