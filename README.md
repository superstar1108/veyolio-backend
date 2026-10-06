# Vertexa API

Node.js + TypeScript + Express 5 + Prisma (PostgreSQL).

## Setup

1. Install packages — run `install.bat` (VPN-friendly, retries automatically) or `npm install`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`:
    - **Local:** `docker compose up -d` starts Postgres with the default URL, or install PostgreSQL for Windows.
    - **Supabase:** create a project, open **Connect** in the Supabase dashboard, and use its direct connection string or session pooler string. Replace the local `DATABASE_URL` in `.env` with that URI. If the direct connection is unavailable on your network or host, use the session pooler. Avoid the transaction pooler with this configuration.
3. `npm run db:generate`
4. Apply the existing migrations to the selected database with `npm run db:deploy`.
5. `npm run dev` → http://localhost:4000/api/health

For deployment, set `DATABASE_URL` in the hosting provider's environment settings to the Supabase URI and set `CORS_ORIGINS=https://veyolio.com` (add `https://www.veyolio.com` only if the frontend is served from that origin). Run `npm run db:deploy` as a release/deploy step. Do not commit `.env` or put the database password in source control. Keep `npm run db:migrate` for creating migrations during development; use `npm run db:deploy` to apply committed migrations to Supabase.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Start with auto-reload |
| `npm run build` / `npm start` | Production build / run |
| `npm run db:migrate` | Create & apply a migration after editing `prisma/schema.prisma` |
| `npm run db:deploy` | Apply committed migrations to the configured database |
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
