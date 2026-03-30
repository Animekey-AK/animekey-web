# CLAUDE.md

AnimeKey v2 — full rebuild of the AnimeKey OTT streaming platform.

## Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Production build
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint
```

## Stack

- **Next.js 14 App Router** — `app/` directory, Server Components by default
- **TypeScript strict** — `strict: true`, `noImplicitAny: true`, no `any` allowed
- **Tailwind CSS + shadcn/ui** — all styling via Tailwind utility classes
- **Zustand** — client-only state (auth UI state, player UI state)
- **TanStack Query (React Query)** — all server data fetching and caching
- **hls.js** — HLS video playback with fully custom React/Tailwind controls
- **NextAuth v5** — sessions in httpOnly cookies, never localStorage
- **next-intl** — English (`en`) and Arabic (`ar`, RTL) via `[locale]` route group
- **t3-env** — server-only env var validation, throws at build time if secrets missing

## Architecture Rules

1. **No secrets on the client.** All API keys, payment credentials, OAuth secrets go in `lib/env.server.ts` (server-only). `NEXT_PUBLIC_` vars are only for truly public config (base URL, etc).
2. **No localStorage for auth tokens.** Sessions are httpOnly cookies managed by NextAuth.
3. **All payment flows are Server Actions.** Payfort initiation, callbacks, and card operations run server-side only. No card data ever touches a URL query parameter.
4. **Middleware handles auth guards.** `middleware.ts` (Edge runtime) protects routes before any component renders.
5. **No `any` in TypeScript.** Define interfaces for all API responses.

## Directory Structure

```
app/
  [locale]/              # next-intl locale wrapper
    (auth)/              # login, register, forgot-password
    (main)/              # authenticated app shell
      layout.tsx         # header + nav + footer
      page.tsx           # home
      movies/
      series/
      watch/[id]/
      account/
    (payment)/           # payment flows
  api/                   # Route Handlers (server-only)
  globals.css
  layout.tsx             # root layout
lib/
  env.server.ts          # t3-env server schema — import only in server code
  env.client.ts          # t3-env client schema — NEXT_PUBLIC_ vars only
  auth.ts                # NextAuth v5 config
  db/                    # future: if DB added
components/
  ui/                    # shadcn/ui primitives
  player/                # hls.js video player
  layout/                # header, nav, footer
hooks/                   # client-side custom hooks
services/
  api/                   # typed React Query hooks + fetchers
actions/                 # Server Actions (payments, auth mutations)
constants/               # routes, API endpoint keys
types/                   # shared TypeScript interfaces
public/
  locales/
    en/
    ar/
```

## Linear

Project: **Platform Rebuild v2**
Active sprint: **Sprint 2 — Foundation & Architecture** (ANI-88 to ANI-95)
Workspace: linear.app/animekey
API key is in `~/.claude/settings.json` under `LINEAR_API_KEY` — the Linear MCP plugin is available globally.
