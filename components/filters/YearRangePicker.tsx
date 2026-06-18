"use client";

interface YearRangePickerProps {
  yearMin?: number;
  yearMax?: number;
  onChange: (min?: number, max?: number) => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1950;

export function YearRangePicker({ yearMin, yearMax, onChange }: YearRangePickerProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/40">From</label>
        <input
          type="number"
          min={MIN_YEAR}
          max={yearMax ?? CURRENT_YEAR}
          value={yearMin ?? ""}
          placeholder={String(MIN_YEAR)}
          onChange={(e) =>
            onChange(e.target.value ? Number(e.target.value) : undefined, yearMax)
          }
          className="w-24 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white placeholder:text-white/20 focus:border-neon-purple/50 focus:outline-none"
        />
      </div>
      <span className="mt-5 text-white/30">—</span>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/40">To</label>
        <input
          type="number"
          min={yearMin ?? MIN_YEAR}
          max={CURRENT_YEAR}
          value={yearMax ?? ""}
          placeholder={String(CURRENT_YEAR)}
          onChange={(e) =>
            onChange(yearMin, e.target.value ? Number(e.target.value) : undefined)
          }
          className="w-24 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white placeholder:text-white/20 focus:border-neon-purple/50 focus:outline-none"
        />
      </div>
    </div>
  );
}
