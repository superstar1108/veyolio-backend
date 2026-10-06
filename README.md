# Vertexa API

Node.js + TypeScript + Express 5 + Prisma (PostgreSQL).

## Setup

1. Install packages — run `install.bat` (VPN-friendly, retries automatically) or `npm install`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`:
   - **Local:** `docker compose up -d` starts Postgres with the default URL, or install PostgreSQL for Windows.
   - **Hosted (free):** create a database on Neon or Supabase and paste its connection string.
3. `npm run db:generate`
4. `npm run dev` → http://localhost:4000/api/health

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start with auto-reload |
| `npm run build` / `npm start` | Production build / run |
| `npm run db:migrate` | Create & apply a migration after editing `prisma/schema.prisma` |
| `npm run db:studio` | Browse the database in the browser |
| `npm run typecheck` | Type-check without building |

## Structure
```
src/
  server.ts            starts the HTTP server
  app.ts               Express app: security, CORS, JSON, rate limit, routes, errors
  config/env.ts        validated environment variables
  lib/prisma.ts        database client
  lib/errors.ts        AppError helpers (NotFound, BadRequest, ...)
  middleware/          validate (Zod) + error handling
  routes/index.ts      mounts all modules under /api
  modules/<feature>/   one folder per feature: routes, schema, service
prisma/schema.prisma   database models
```

## Conventions
- Success: `{ "data": ... }` · Error: `{ "error": { "code", "message", "details?" } }`
- Validation errors → `422`, unknown routes → `404`, duplicates → `409`.
