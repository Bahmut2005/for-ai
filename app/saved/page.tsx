"use client";

import Link from "next/link";
import { PRESET_WHEELS } from "@/lib/utils/constants";
import { useWheelStore } from "@/store/wheelStore";
import { PresetWheelCard } from "@/components/PresetWheelCard";

export default function SavedPage() {
  const { filters, applyPreset } = useWheelStore();

  const hasCustomFilters =
    filters.mediaTypes?.length ||
    filters.genres?.length ||
    filters.yearMin ||
    filters.yearMax ||
    filters.minRating;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 font-display text-2xl font-bold text-white">Saved Wheels</h1>
      <p className="mb-8 text-sm text-white/40">
        Preset wheel configurations for quick access.
      </p>

      {hasCustomFilters && (
        <div className="glass mb-8 rounded-2xl border border-neon-purple/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Current Custom Filter</p>
              <p className="mt-0.5 text-xs text-white/40">
                {filters.mediaTypes?.join(", ") || "All types"} ·{" "}
                {filters.genres?.join(", ") || "All genres"}
              </p>
            </div>
            <Link href="/" className="btn-primary text-sm">
              Spin Now
            </Link>
          </div>
        </div>
      )}

      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
        Preset Wheels
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {PRESET_WHEELS.map((preset) => (
          <div key={preset.id} onClick={() => applyPreset(preset.id, preset.filters as never)}>
            <Link href="/">
              <PresetWheelCard
                preset={preset}
                onSelect={() => applyPreset(preset.id, preset.filters as never)}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
