---
name: omniverse-wheel
description: Spin The Omniverse Wheel to get a random anime, manga, movie, game, TV show, comic, or other fictional media recommendation. Accepts optional filter args like "anime", "horror", "90s movies", or "chaos". Examples: /omniverse-wheel, /omniverse-wheel anime, /omniverse-wheel horror movies, /omniverse-wheel 90s
---

# The Omniverse Wheel Skill

Spin the wheel and display a cinematic random media recommendation from an Omniverse Wheel instance.

## Workflow

Make a todo list for all the tasks in this workflow and work on them one after another.

### 1. Parse Filter Args

Read the args string passed by the user (may be empty). Extract:

| Keyword pattern | Maps to |
|---|---|
| `anime`, `manga`, `ova`, `ona` | `mediaTypes: ["ANIME"]` / `["MANGA"]` / etc. |
| `movie` / `movies` | `mediaTypes: ["MOVIE"]` |
| `tv` / `television` | `mediaTypes: ["TELEVISION"]` |
| `game` / `games` | `mediaTypes: ["GAME"]` |
| `comic` / `comics` | `mediaTypes: ["COMIC"]` |
| `animation` / `cartoon` | `mediaTypes: ["ANIMATION"]` |
| `novel` / `book` | `mediaTypes: ["NOVEL", "LIGHT_NOVEL"]` |
| `webseries` / `web series` | `mediaTypes: ["WEB_SERIES"]` |
| `horror`, `fantasy`, `sci-fi`, `romance`, `action`, `comedy`, `thriller`, `mystery`, `drama`, `sports`, `mecha`, `psychological`, `historical`, `supernatural` | `genres: ["<Genre>"]` |
| `90s` | `yearMin: 1990, yearMax: 1999` |
| `80s` | `yearMin: 1980, yearMax: 1989` |
| `2000s` | `yearMin: 2000, yearMax: 2009` |
| `modern` / `new` | `yearMin: 2010` |
| `classic` / `old` | `yearMax: 1999` |
| `family` / `family-friendly` | `familyFriendly: true` |
| `chaos` / (no args) | `{}` (no filters — full random) |

Multiple keywords combine (e.g. "horror anime 90s" → mediaTypes + genres + year).

### 2. Resolve the Base URL

The skill talks to an Omniverse Wheel instance over HTTP. Pick its base URL in this order:

1. `$OMNIVERSE_WHEEL_URL`, if set.
2. `http://localhost:3000` otherwise.

```bash
BASE="${OMNIVERSE_WHEEL_URL:-http://localhost:3000}"
```

Use `$BASE` for every request below, and strip any trailing slash before appending a path.

### 3. Check If the Instance Is Reachable

```bash
curl -s -o /dev/null -w "%{http_code}" "$BASE/api/presets"
```

- If the response is `200` → the instance is up, continue to step 4.
- Otherwise, only try to start a dev server when the current working directory is an
  Omniverse Wheel checkout **and** the base URL is the local default. Check with:
  ```bash
  test -f package.json && grep -q '"name": "omniverse-wheel"' package.json
  ```
  - If that check fails, or `$OMNIVERSE_WHEEL_URL` points somewhere remote, stop and tell the
    user the instance at `$BASE` isn't reachable. Point them at the two ways to fix it: run the
    app locally (`npm run dev` in an Omniverse Wheel checkout) or set `OMNIVERSE_WHEEL_URL` to a
    running instance.
  - If it succeeds, start the dev server in the background:
    ```bash
    npm run dev > /tmp/omniverse-dev.log 2>&1 &
    ```
    Then poll until ready (up to 15 seconds):
    ```bash
    for i in $(seq 1 15); do
      code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/presets")
      [ "$code" = "200" ] && break
      sleep 1
    done
    ```
    If still not up after 15s, report the error from `/tmp/omniverse-dev.log` and stop.

### 4. Spin the Wheel

POST to the spin API with the constructed filter JSON. Always include `"sessionId": "cli-spin"`.

Example for "horror anime":
```bash
curl -s -X POST "$BASE/api/spin" \
  -H "Content-Type: application/json" \
  -d '{"mediaTypes":["ANIME"],"genres":["Horror"],"sessionId":"cli-spin"}'
```

Example for no filters:
```bash
curl -s -X POST "$BASE/api/spin" \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"cli-spin"}'
```

The response shape is:
```json
{
  "winnerToken": "<jwt>",
  "candidates": [{ "id": 1, "canonicalTitle": "...", "originalTitle": "...", "slug": "...", "mediaType": "ANIME", "releaseYear": 1997, "imageUrl": null, "genres": ["Action","Drama"] }],
  "winnerIndex": 7,
  "totalEligible": 57
}
```

The winner is `candidates[winnerIndex]`.

### 5. Display the Result

Format and print the result. If `originalTitle` is present and differs from `canonicalTitle`, show it on the next line.

```
╔══════════════════════════════════════════════════════╗
║         🌀  The Omniverse Has Chosen  🌀             ║
╚══════════════════════════════════════════════════════╝

  🎬  <canonicalTitle>  (<releaseYear or "?">)
      <originalTitle>  ← only if different

  Type    <human-readable mediaType label>
  Genres  <genres joined by " · ">
  Rating  <rating>/10  (or "—" if null)
  Pool    <totalEligible> titles matched your filters

  → <BASE>/title/<slug>
```

Media type labels:
`ANIME=Anime`, `MANGA=Manga`, `MOVIE=Movie`, `TELEVISION=TV`, `ANIMATION=Animation`,
`COMIC=Comics`, `GAME=Game`, `LIGHT_NOVEL=Light Novel`, `NOVEL=Novel`,
`WEB_SERIES=Web Series`, `OVA=OVA`, `ONA=ONA`, `SPECIAL=Special`, `OTHER=Other`

### 6. Handle Edge Cases

- **API returns `{ "error": "No titles match..." }` (HTTP 404):** Say "No titles found matching those filters. Try broader criteria or run `/omniverse-wheel` with no args."
- **API returns any other error:** Show the error message and suggest checking the database is seeded (`npm run db:seed`).
- **`totalEligible` is 0 or missing:** Skip the Pool line.

## Notes

- Do not spin more than once per invocation unless the user explicitly asks for another.
- The winner is selected cryptographically server-side — it is genuinely random and can't be influenced from the client side.
- You can confirm the app is running at any time with `/omniverse-wheel` — if the instance is already up it returns instantly.
