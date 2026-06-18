"use client";

const COMMON_GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery",
  "Romance", "Sci-Fi", "Slice of Life", "Thriller", "Psychological",
  "Historical", "Sports", "Supernatural", "Music", "Martial Arts",
  "Mecha", "Space", "Post-Apocalyptic",
];

interface GenreMultiSelectProps {
  selected: string[];
  onChange: (genres: string[]) => void;
}

export function GenreMultiSelect({ selected, onChange }: GenreMultiSelectProps) {
  const toggle = (genre: string) => {
    const next = selected.includes(genre)
      ? selected.filter((g) => g !== genre)
      : [...selected, genre];
    onChange(next);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {COMMON_GENRES.map((genre) => {
        const active = selected.includes(genre);
        return (
          <button
            key={genre}
            onClick={() => toggle(genre)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
              active
                ? "border-neon-purple/60 bg-neon-purple/20 text-neon-purple-bright"
                : "border-white/10 bg-white/5 text-white/50 hover:border-white/30 hover:text-white/70"
            }`}
            aria-pressed={active}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
