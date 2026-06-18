# The Omniverse Wheel

A cinematic spinning roulette wheel for discovering anime, manga, movies, TV series, animation, comics, games, novels, and more from around the world.

## Features

- **Cryptographically fair spins** — winner selected server-side before any animation runs
- **24-segment SVG wheel** with Framer Motion physics animation
- **258+ seed titles** across 9 media categories
- **12 preset wheels** — Every Anime, Horror Roulette, Chaos Mode, and more
- **Advanced filters** — media type, genre, year range, rating, completion status
- **Spin history** — session-based history without requiring an account
- **Responsive design** — dark cinematic UI, mobile-first
- **Accessible** — keyboard navigation, reduced-motion support, screen reader labels

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 16 (or Docker)

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and other secrets

# Run database migrations
npx prisma migrate dev --name init

# Seed demo data (~258 titles)
npm run db:seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and spin the wheel.

### With Docker

```bash
docker compose up -d
# Wait for PostgreSQL to be healthy, then:
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

## Environment Variables

See `.env.example` for all required and optional variables.

Required for basic operation:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — random secret for NextAuth sessions
- `SPIN_JWT_SECRET` — random secret for winner token signing

Optional (for importing real data):
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — for GitHub OAuth login
- `TMDB_API_KEY` — for TMDB movie/TV imports
- AniList, Jikan, Kitsu, TVMaze, Open Library — all free public APIs

## Database

The seed data (`prisma/seed/`) contains ~258 manually curated titles, all marked `isDemoData: true`. These are a starting point; use the Import page to add real data from external APIs.

**The database is not complete.** It is designed to grow. New titles can be added via the Import system or submitted manually.

## Data Sources & Licensing

All data is obtained through official public APIs or manually entered. We do not scrape protected content. Each external source is used in accordance with its terms of service:

- **AniList** — CC BY-NC 4.0 (anime/manga metadata)
- **Jikan** — MIT (unofficial MAL API)
- **Kitsu** — MIT (anime/manga)
- **TMDB** — commercial use requires attribution
- **TVMaze** — CC BY-SA 4.0
- **Open Library** — CC0 / CC BY

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** + **Tailwind CSS**
- **PostgreSQL** + **Prisma ORM**
- **Framer Motion** (wheel animation)
- **Zustand** (state management)
- **TanStack Query** (server state)
- **Zod** (validation)
- **NextAuth v5** (authentication)
- **jose** (JWT for winner tokens)

## Development

```bash
npm run dev          # Development server
npm run build        # Production build
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run test         # Unit tests (vitest)
npm run test:e2e     # E2E tests (playwright)
npm run db:studio    # Prisma Studio (database GUI)
```
