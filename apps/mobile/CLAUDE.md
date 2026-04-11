# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# From apps/mobile/
pnpm prebuild              # Generate native iOS/Android projects
pnpm prebuild:clean        # Clean regenerate native projects
pnpm ios                   # Prebuild + run on iOS simulator
pnpm android               # Prebuild + run on Android emulator

# From monorepo root (../../)
pnpm dev                   # Turbo: start all apps in dev mode
pnpm build                 # Turbo: production build all apps
pnpm typecheck             # Turbo: tsc --noEmit across all packages
pnpm lint                  # Turbo: ESLint across all packages
```

There is no `dev` script in this package — use `pnpm ios` or `pnpm android` for local development.

## Stack

- **Expo 55** (bare workflow) with **React Native 0.83** and **React 19**
- **Expo Router** — file-based routing in `app/`, similar to Next.js App Router
- **NativeWind 4 + Tailwind CSS 3** — Tailwind utility classes for React Native
- **TypeScript strict** — `strict: true`, `noImplicitAny: true`, no `any`
- **react-native-svg-transformer** — import `.svg` files as React components
- **New Architecture enabled** (`newArchEnabled: true` in app.json)

## Monorepo

This app lives at `apps/mobile` in a Turbo monorepo. Shared packages:

| Package | Import | Purpose |
|---------|--------|---------|
| `@animekey/tokens` | `packages/tokens` | Design tokens (colors, fonts) — consumed by `tailwind.config.js` |
| `@animekey/config` | `packages/config` | Shared TS and ESLint config |

Metro is configured to watch the entire workspace root (`../../`) for monorepo resolution.

## Architecture

**Feature-driven modular structure** with four top-level directories:

- **`app/`** — Expo Router routes only. Each file maps to a screen. Route groups: `(auth)` for login/signup, `(tabs)` for the main tab bar, `modal/` for modals. Dynamic routes: `movie/[id]`, `show/[id]`, `watch/[id]`.
- **`features/`** — Domain modules. Each feature has a `screens/` folder with the screen component. Screen files are named `{Feature}Screen.tsx`.
- **`core/`** — App infrastructure: API client (`core/api/client.ts`), environment config (`core/config/`), auth guards (`core/navigation/guards.ts`), root providers (`core/providers/`).
- **`shared/`** — Cross-feature code: UI components (`shared/components/ui/`), hooks, types, constants, and utilities.

Route files in `app/` are thin — they import and render screen components from `features/`.

## Environment Config

Backend URL is selected by `EXPO_PUBLIC_ENV` env var (defaults to `dev`):

| Env | Base URL |
|-----|----------|
| dev | `https://animedev.appskeeper.in` |
| staging | `https://preapi.animekey.tv` |
| production | `https://prodapi.animekey.tv` |

Config lives in `core/config/index.ts`.

## Path Alias

`@/*` maps to the project root. Import as `@/features/home/screens/HomeScreen`, `@/shared/components/ui/Button`, etc.

## Tailwind / NativeWind

Theme extends with `@animekey/tokens`:
- Colors: `brand` (green #71C704), `surface-default` (#070707), `surface-raised` (#1a1a1a)
- Fonts: `font-sans`, `font-display`, `font-description`

Content paths cover `app/`, `features/`, `shared/`, `core/`. If you add a new top-level directory with components, add it to `tailwind.config.js` content array.

## Early-Stage Notes

Several systems are scaffolded but not yet connected:
- **React Query** — query keys defined in `shared/constants/query-keys.ts` but `@tanstack/react-query` is not installed
- **Secure storage** — wrapper in `shared/lib/storage.ts` is stubbed; `expo-secure-store` not installed
- **Auth** — guard logic exists in `core/navigation/guards.ts` but no auth provider is wired up
