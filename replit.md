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

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/hachiko run dev` — run frontend locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
