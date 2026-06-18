export const metadata = { title: "Import — The Omniverse Wheel" };

export default function ImportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 font-display text-2xl font-bold text-white">Dataset Import</h1>
      <p className="mb-8 text-sm text-white/40">
        Import titles from external APIs or upload your own CSV/JSON file.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { name: "AniList", desc: "Anime & manga from AniList GraphQL API", emoji: "⛩️", available: false },
          { name: "Jikan (MAL)", desc: "Anime & manga from MyAnimeList", emoji: "📺", available: false },
          { name: "TMDB", desc: "Movies & TV shows from The Movie Database", emoji: "🎬", available: false },
          { name: "TVMaze", desc: "Television series metadata", emoji: "📡", available: false },
          { name: "Open Library", desc: "Books and novels", emoji: "📚", available: false },
          { name: "CSV / JSON Upload", desc: "Upload your own title list", emoji: "📁", available: false },
        ].map((source) => (
          <div
            key={source.name}
            className="glass flex items-start gap-3 rounded-2xl border border-glass-border p-4 opacity-60"
          >
            <span className="text-3xl">{source.emoji}</span>
            <div>
              <p className="font-medium text-white">{source.name}</p>
              <p className="mt-0.5 text-xs text-white/40">{source.desc}</p>
              <span className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/30">
                Coming soon
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 glass rounded-2xl border border-glass-border p-6 text-center">
        <p className="text-sm text-white/40">
          Import functionality requires API keys configured in your environment.
          See <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">.env.example</code> for
          the required variables.
        </p>
      </div>
    </div>
  );
}
