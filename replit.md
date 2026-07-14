# Docka Seguros

Brazilian professional liability (RC) insurance platform — lead capture, multi-step quote form, admin dashboard, and client portal.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run API server (builds then starts on `$PORT`)
- `pnpm --filter @workspace/web run dev` — run React/Vite frontend (on `$PORT` with `$BASE_PATH`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string; `SESSION_SECRET` — session signing key

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite 7 + Wouter + TanStack Query + Tailwind v4 + Framer Motion
- Backend: Express 5 + Drizzle ORM + PostgreSQL + Pino logging
- Validation: Zod (zod/v4), drizzle-zod
- API codegen: Orval (from OpenAPI spec → React Query hooks + Zod schemas)
- Build: esbuild (CJS/ESM bundle with pino plugin)
- File uploads: Google Cloud Storage via Replit sidecar (presigned URLs)

## Where things live

```
lib/db/                  — DB schemas (quotes, admin, portal) + Drizzle client
lib/api-spec/            — OpenAPI 3.1 spec + Orval codegen config
lib/api-zod/             — Generated Zod validators from OpenAPI
lib/api-client-react/    — Generated React Query hooks + customFetch
lib/object-storage-web/  — Uppy-based upload component + useUpload hook
artifacts/api-server/    — Express API server (routes, lib, build)
artifacts/web/           — React/Vite SPA (pages, components, hooks)
```

- DB schema source of truth: `lib/db/src/schema/`
- OpenAPI contract: `lib/api-spec/openapi.yaml`
- Theme/CSS: `artifacts/web/src/index.css` (@theme inline with Tailwind v4)

## Architecture decisions

- Contract-first API: OpenAPI spec drives both backend Zod validation and frontend React Query hooks via Orval codegen
- Admin auth uses Bearer token sessions stored in `admin_sessions` table (no cookies); client portal uses same pattern with `client_sessions`
- Seed runs on first boot (checks admin_users count = 0) — seeds 2 admins, 3 policyholders, 2 client accounts, 150 leads, 80 quotes (password: `12345678`)
- File uploads use GCS presigned PUT URLs via `/api/storage/uploads/request-url`; files served back through `/api/storage/*` proxy
- `lib/object-storage-web` is NOT composite (has JSX) — excluded from root tsconfig references

## Product

- **Landing page** — hero, features, lead capture email form
- **3-step quote form** — company data, operations, risk history with CNPJ/phone/currency inputs
- **Admin dashboard** — clients (policyholders), policies, products, users, quote pipeline management
- **Client portal** — password-based login, policy document access
- All pages in Brazilian Portuguese

## User preferences

- Brazilian Portuguese UI throughout
- All admin credentials: `jose.eduardo.andrade@gmail.com` / `admin@empresa.com`, password `12345678`

## Gotchas

- Never call service ports directly for curl — always use `localhost:80/api/...` (shared proxy)
- `pnpm run dev` at root has no script — start services via workflows
- `@google-cloud/*` packages are externalized in esbuild (loaded at runtime via Replit sidecar)
- After changing OpenAPI spec, run codegen before typecheck: `pnpm --filter @workspace/api-spec run codegen`

## Pointers

- See `pnpm-workspace` skill for workspace structure and TypeScript setup
- See `object-storage` skill for GCS upload flow details
