# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Hachiko Veterinary Care — a pet care business website with a live booking system.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/hachiko), green & black brand palette
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Animations**: Framer Motion

## Architecture

- `artifacts/hachiko` — React + Vite frontend, served at `/`
- `artifacts/api-server` — Express API server, served at `/api`
- `lib/db` — Drizzle schema + PostgreSQL connection
- `lib/api-spec` — OpenAPI spec (source of truth)
- `lib/api-client-react` — Generated React Query hooks
- `lib/api-zod` — Generated Zod validation schemas

## Key Features

- **Booking system**: Multi-step booking flow (service → date/time → details → review → confirmation)
  - Bookings stored in PostgreSQL via `bookings` table
  - Confirmation ID returned from server (e.g., `HVC-XXXXXX`)
  - POST `/api/bookings`, GET `/api/bookings`, GET `/api/bookings/:id`

## Key Commands

On Replit (pnpm):
- `pnpm --filter @workspace/api-server run dev` — run API server
- `pnpm --filter @workspace/hachiko run dev` — run frontend
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks/Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

Local development (npm):
- `npm install` — install all dependencies
- `npm run dev` — start both API server and frontend concurrently
- `npm run dev:api` — start API server only (port 8080)
- `npm run dev:web` — start frontend only (port 5173)

## Local Setup

1. Copy `.env.example` to `.env` and fill in your values
2. Set up a PostgreSQL database and set `DATABASE_URL`
3. Run `npm install` then `npm run dev`
4. Frontend: http://localhost:5173
5. API server: http://localhost:8080
6. Admin panel: http://localhost:5173/admin

See `.vscode/launch.json` for VS Code debugger configuration.
