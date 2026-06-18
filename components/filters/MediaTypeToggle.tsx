"use client";

import { MediaType } from "@prisma/client";
import { MEDIA_TYPE_LABELS, MEDIA_TYPE_COLORS } from "@/lib/utils/constants";

const DISPLAYED_TYPES: MediaType[] = [
  "ANIME", "MANGA", "MOVIE", "TELEVISION", "ANIMATION",
  "COMIC", "GAME", "LIGHT_NOVEL", "NOVEL", "WEB_SERIES",
  "OVA", "ONA",
];

interface MediaTypeToggleProps {
  selected: MediaType[];
  onChange: (types: MediaType[]) => void;
}

export function MediaTypeToggle({ selected, onChange }: MediaTypeToggleProps) {
  const toggle = (type: MediaType) => {
    const next = selected.includes(type)
      ? selected.filter((t) => t !== type)
      : [...selected, type];
    onChange(next);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {DISPLAYED_TYPES.map((type) => {
        const active = selected.includes(type);
        const color = MEDIA_TYPE_COLORS[type];
        return (
          <button
            key={type}
            onClick={() => toggle(type)}
            className={`media-badge cursor-pointer transition-all ${
              active ? "opacity-100 ring-1" : "opacity-40 hover:opacity-70"
            }`}
            style={{
              backgroundColor: active ? `${color}22` : "transparent",
              borderColor: color,
              color: active ? color : undefined,
            }}
            aria-pressed={active}
          >
            {MEDIA_TYPE_LABELS[type]}
          </button>
        );
      })}
    </div>
  );
}
