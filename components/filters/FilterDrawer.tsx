"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";
import { MediaTypeToggle } from "./MediaTypeToggle";
import { GenreMultiSelect } from "./GenreMultiSelect";
import { YearRangePicker } from "./YearRangePicker";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterDrawer({ isOpen, onClose }: FilterDrawerProps) {
  const { filters, updateFilter, clearFilters, activeFilterCount, setYearRange } = useFilters();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-void-900 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            <div className="flex items-center justify-between border-b border-glass-border px-4 py-4">
              <h2 className="font-display text-lg font-bold text-white">
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 rounded-full bg-neon-purple/30 px-2 py-0.5 text-xs text-neon-purple-bright">
                    {activeFilterCount}
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
              {/* Media Types */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Media Type
                </h3>
                <MediaTypeToggle
                  selected={filters.mediaTypes ?? []}
                  onChange={(types) =>
                    updateFilter("mediaTypes", types.length ? types : undefined)
                  }
                />
              </section>

              {/* Genres */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Genres
                </h3>
                <GenreMultiSelect
                  selected={filters.genres ?? []}
                  onChange={(genres) =>
                    updateFilter("genres", genres.length ? genres : undefined)
                  }
                />
              </section>

              {/* Year Range */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Release Year
                </h3>
                <YearRangePicker
                  yearMin={filters.yearMin}
                  yearMax={filters.yearMax}
                  onChange={setYearRange}
                />
              </section>

              {/* Rating */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Minimum Rating
                </h3>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={filters.minRating ?? 0}
                    onChange={(e) =>
                      updateFilter(
                        "minRating",
                        Number(e.target.value) > 0 ? Number(e.target.value) : undefined
                      )
                    }
                    className="flex-1 accent-neon-purple"
                  />
                  <span className="w-8 text-right text-sm text-white/70">
                    {filters.minRating ?? "Any"}
                  </span>
                </div>
              </section>

              {/* Toggles */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Options
                </h3>
                <div className="space-y-3">
                  {[
                    { key: "onlyCompleted" as const, label: "Completed only" },
                    { key: "onlyOngoing" as const, label: "Ongoing only" },
                    { key: "familyFriendly" as const, label: "Family friendly" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex cursor-pointer items-center justify-between">
                      <span className="text-sm text-white/70">{label}</span>
                      <button
                        role="switch"
                        aria-checked={!!filters[key]}
                        onClick={() => updateFilter(key, !filters[key] || undefined)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
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

            {/* Footer */}
            <div className="border-t border-glass-border px-4 py-4 flex gap-3">
              <button
                onClick={clearFilters}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/60 hover:border-white/30 hover:text-white transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
