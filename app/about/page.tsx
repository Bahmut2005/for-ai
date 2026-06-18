export const metadata = { title: "About — The Omniverse Wheel" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 font-display text-3xl font-bold">
        <span className="text-gradient-purple">About</span>{" "}
        <span className="text-gradient-gold">The Omniverse Wheel</span>
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-white/70">
        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-3 font-display text-lg font-bold text-white">What is This?</h2>
          <p>
            The Omniverse Wheel is a randomized media discovery tool. Spin the wheel to get a
            random recommendation from a large database of anime, manga, movies, television,
            animation, comics, games, novels, and more — from every country and every era.
          </p>
          <p className="mt-3">
            The wheel uses cryptographic randomness: your winner is selected server-side before
            any animation runs, making the result provably fair and impossible to manipulate
            from the client.
          </p>
        </section>

        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-3 font-display text-lg font-bold text-white">Data Sources</h2>
          <p className="mb-4">
            The database is built from a combination of demo seed data and optional imports from
            these public APIs:
          </p>
          <ul className="space-y-2">
            {[
              { name: "AniList", url: "https://anilist.co", desc: "Anime and manga" },
              { name: "Jikan (MyAnimeList)", url: "https://jikan.moe", desc: "Anime and manga" },
              { name: "Kitsu", url: "https://kitsu.io", desc: "Anime and manga" },
              { name: "TMDB", url: "https://www.themoviedb.org", desc: "Movies and TV shows" },
              { name: "TVMaze", url: "https://www.tvmaze.com", desc: "Television series" },
              { name: "Open Library", url: "https://openlibrary.org", desc: "Books and novels" },
            ].map(({ name, url, desc }) => (
              <li key={name} className="flex items-baseline gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neon-purple-bright hover:underline"
                >
                  {name}
                </a>
                <span className="text-white/40">— {desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-3 font-display text-lg font-bold text-white">Database Status</h2>
          <p>
            The current database contains demo seed data with approximately 300 titles across
            all categories. This is a starting point — the database is designed to grow through
            the import system. Titles added via import are sourced from the APIs listed above
            according to their respective licenses and terms of service.
          </p>
          <p className="mt-3 text-white/40">
            We do not scrape protected content. All data is obtained through official public APIs
            or manually submitted by users.
          </p>
        </section>

        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-3 font-display text-lg font-bold text-white">Content Policy</h2>
          <p>
            Adult content is disabled by default. You can enable it in Settings if you are of
            legal age in your jurisdiction. Family-friendly mode restricts results to content
            appropriate for all ages. No moral judgments are attached to any genre or content
            type — only factual content labels are used.
          </p>
        </section>
      </div>
    </div>
  );
}
