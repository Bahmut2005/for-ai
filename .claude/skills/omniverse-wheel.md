---
description: |
  Spin The Omniverse Wheel to get a random anime, manga, movie, game, TV show,
  comic, or other fictional media recommendation. You can optionally pass filter
  args like "anime", "horror", "90s", "movies", or "chaos".
  Examples: /omniverse-wheel, /omniverse-wheel anime, /omniverse-wheel horror movies
---

You are spinning The Omniverse Wheel to get a random media recommendation.

## Steps

1. **Parse args** (if provided) to determine filters:
   - Genre keywords (horror, fantasy, sci-fi, romance, etc.) → `genres` array
   - Media type keywords (anime, manga, movie/movies, tv/television, game/games, comic/comics, animation, novel, webseries) → `mediaTypes` array
   - Era keywords (90s → yearMin:1990 yearMax:1999, 80s → 1980–1989, 2000s → 2000–2009, modern → yearMin:2010, classic → yearMax:1999)
   - "chaos" → empty filters (everything)
   - "family" or "family-friendly" → familyFriendly: true

2. **Check if the app is running** by running:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/presets
   ```
   - If the response is `200`, the server is up.
   - If not `200`, start it:
     ```bash
     npm run dev &
     ```
     Wait up to 10 seconds for it to be ready (retry the curl check every 2 seconds).

3. **Spin the wheel** — POST to the spin API with the filters:
   ```bash
   curl -s -X POST http://localhost:3000/api/spin \
     -H "Content-Type: application/json" \
     -d '<FILTER_JSON>'
   ```

   Build `<FILTER_JSON>` based on parsed args. Example for "horror anime":
   ```json
   {
     "mediaTypes": ["ANIME"],
     "genres": ["Horror"],
     "sessionId": "cli-spin"
   }
   ```
   For no args (or "chaos"), use `{"sessionId": "cli-spin"}`.

   Valid `mediaTypes` enum values: ANIME, MANGA, MOVIE, TELEVISION, ANIMATION, COMIC, GAME, LIGHT_NOVEL, NOVEL, WEB_SERIES, OVA, ONA

4. **Display the result** in this format:

   ```
   ╔══════════════════════════════════════════════════╗
   ║       🌀  The Omniverse Has Chosen  🌀           ║
   ╚══════════════════════════════════════════════════╝

   🎬  <canonicalTitle>  (<releaseYear>)
       <originalTitle if different>

   Type:    <mediaType label>
   Genres:  <genres joined by ", ">
   Rating:  <rating>/10  (or "—" if null)
   Status:  <status>

   <description truncated to 2 sentences>

   🔗 http://localhost:3000/title/<slug>
   ```

   If `totalEligible` is available, add:
   ```
   Pool: <totalEligible> eligible titles matched your filters
   ```

5. **If the API returns 404** (no titles match), say:
   > No titles found matching those filters. Try broader criteria or run `/omniverse-wheel chaos`.

6. **If the server fails to start**, say:
   > Could not start the Omniverse Wheel server. Make sure you're in the project directory and have run `npm install` and `npx prisma migrate dev`.

## Notes
- The winner is selected cryptographically server-side — it's genuinely random, not influenced by the display order.
- The `winnerIndex` field in the response tells you which position in the `candidates` array won.
- Do not spin more than once per invocation unless the user explicitly asks for another spin.
