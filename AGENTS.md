# AGENTS.md

AnimeKey v2 — full rebuild of the AnimeKey OTT streaming platform.

## Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Production build
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint
npm run test       # Playwright e2e tests
```

## Stack

- **Next.js 14 App Router** — `app/` directory, Server Components by default
- **TypeScript strict** — `strict: true`, `noImplicitAny: true`, no `any` allowed
- **Tailwind CSS + shadcn/ui** — all styling via Tailwind utility classes
- **Zustand** — client-only UI state (auth UI, player UI)
- **TanStack Query** — all server data fetching and caching
- **hls.js** — HLS video playback with custom React/Tailwind controls
- **NextAuth v5** — sessions in httpOnly cookies, never localStorage
- **next-intl** — English (`en`) and Arabic (`ar`, RTL) via `[locale]` route group
- **t3-env** — server-only env var validation, throws at build time if secrets missing

## API Documentation

**Always fetch the OpenAPI spec before wiring up any new API call.**

| Environment | Swagger UI | OpenAPI JSON |
|-------------|-----------|--------------|
| test | `https://api-test.animekey.tv/media/api` | `https://api-test.animekey.tv/media/api-json` |
| staging | `https://api-staging.animekey.tv/media/api` | `https://api-staging.animekey.tv/media/api-json` |
| production | `https://prodapi.animekey.tv/media/api` | `https://prodapi.animekey.tv/media/api-json` |

The OpenAPI JSON is the authoritative source for exact endpoint paths, request/response shapes, and which auth token each endpoint requires (Basic, AccessToken, RefreshToken, MFAToken, PasswordToken).

All endpoints prefixed `/media/v1/`. API response format:
```json
{ "statusCode": 200, "message": "ACCOUNT.LOGIN_SUCCESS", "result": {} }
```
Always destructure `result` for the actual data.

## Architecture Rules

1. **No secrets on the client.** All API keys, payment credentials, OAuth secrets go in `lib/env.server.ts`. `NEXT_PUBLIC_` vars are only for truly public config.
2. **No localStorage for auth tokens.** Sessions are httpOnly cookies managed by NextAuth.
3. **All payment flows are Server Actions.** Payfort runs server-side only.
4. **Middleware handles auth guards.** `middleware.ts` (Edge runtime) protects routes before any component renders.
5. **No `any` in TypeScript.** Define interfaces for all API responses.

## Directory Structure

```
app/
  [locale]/              # next-intl locale wrapper
    (auth)/              # login, register, forgot-password
    (main)/              # authenticated app shell
    (payment)/           # payment flows
  api/                   # Route Handlers (server-only)
lib/
  env.server.ts          # t3-env server schema — server code only
  env.client.ts          # t3-env client schema — NEXT_PUBLIC_ vars only
  auth.ts                # NextAuth v5 config
components/
  ui/                    # shadcn/ui primitives
  player/                # hls.js video player
  layout/                # header, nav, footer
hooks/                   # client-side custom hooks
services/
  api/                   # typed TanStack Query hooks + fetchers
actions/                 # Server Actions (payments, auth mutations)
types/                   # shared TypeScript interfaces
```

## Git Worktrees

When using git worktrees, always remove the worktree and delete its branch when done:

```bash
git worktree remove --force /path/to/worktree
git branch -D branch-name
```
