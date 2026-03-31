---
phase: 01-monorepo-foundation
plan: 03
subsystem: infra
tags: [design-tokens, typescript, tailwindcss, monorepo, shared-packages]

requires:
  - phase: 01-02
    provides: apps/web/ with pnpm workspace active

provides:
  - packages/tokens — shared design token definitions (colors, typography, animation)
  - packages/config — shared tsconfig.base.json for all workspace packages
  - apps/web wired to consume @animekey/tokens and @animekey/config
  - Typecheck passing (0 errors) for @animekey/web

affects:
  - 02-homepage-conversion (tokens available for Phase 2 homepage components)
  - 09-mobile (apps/mobile can import @animekey/tokens for React Native StyleSheet)
  - all future packages (extend @animekey/config/tsconfig.base.json)

tech-stack:
  added: []
  patterns:
    - TypeScript-first workspace packages (main/types/exports point to .ts source, no build step)
    - Font family tokens wrap CSS vars: [var(--font-sans), ...fontFamily.sans]
    - fontSize typed explicitly as Record<string, [string, ...]> — no as const (Tailwind compat)
    - @auth/core must be a direct devDep (pnpm strict hoisting exposes transitive dep access)

key-files:
  created:
    - packages/tokens/src/index.ts
    - packages/tokens/package.json
    - packages/tokens/tsconfig.json
    - packages/config/package.json
    - packages/config/tsconfig.base.json
  modified:
    - apps/web/tailwind.config.ts (imports from @animekey/tokens)
    - apps/web/tsconfig.json (extends @animekey/config/tsconfig.base.json)
    - apps/web/package.json (@animekey/tokens + @animekey/config + @auth/core deps)
    - apps/web/types/auth.ts (pre-existing bug fix: @auth/core/jwt augmentation path)

key-decisions:
  - "TypeScript-first packages: main/types/exports = ./src/index.ts, no build step in Phase 1"
  - "fontSize not as const — Tailwind v3 types require mutable tuples"
  - "borderRadius keeps CSS var refs (var(--radius)) — shadcn sets these at runtime; mobile gets numeric values in Phase 9"
  - "@auth/core added as direct devDep — pnpm strict hoisting means transitive deps are not accessible for TS module augmentation"

patterns-established:
  - "Workspace packages use TypeScript source directly — no build step required for monorepo-internal consumption"
  - "Font stacks: tokens export base array, web wraps with CSS var prefix for Next.js font loading"
  - "New workspace packages extend @animekey/config/tsconfig.base.json in their tsconfig.json"

duration: ~30min
started: 2026-03-31T00:00:00.000Z
completed: 2026-03-31T00:00:00.000Z
---

# Phase 1 Plan 03: Shared Packages Summary

**`packages/tokens` and `packages/config` created and wired into `apps/web` — single source of truth for design tokens is live, typecheck passes.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~30 min |
| Started | 2026-03-31 |
| Completed | 2026-03-31 |
| Tasks | 2 auto + 1 checkpoint (all passed) |
| Files created | 5 |
| Files modified | 4 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: packages/tokens exports tokens | Pass | colors, fontFamily, fontSize, borderRadius, keyframes, animation all exported |
| AC-2: packages/config has base tsconfig | Pass | strict, noImplicitAny, esModuleInterop — no framework specifics |
| AC-3: tailwind.config.ts imports from @animekey/tokens | Pass | brand/surface colors, fontFamily, fontSize, borderRadius, animations all imported |
| AC-4: tsconfig.json extends base | Pass | "extends": "@animekey/config/tsconfig.base.json" |
| AC-5: Typecheck passes | Pass | `pnpm --filter @animekey/web typecheck` exits 0, 0 errors |

## Accomplishments

- Created `packages/tokens` as a TypeScript-first workspace package exporting all brand design tokens (lime green `#71C704` palette, dark `#070707` surface, typography scale, animations)
- Created `packages/config` with `tsconfig.base.json` — the foundation for all future workspace packages' TypeScript configuration
- Wired `apps/web/tailwind.config.ts` to import all 6 token categories from `@animekey/tokens` — hardcoded values replaced by the single source of truth
- Extended `apps/web/tsconfig.json` from the shared base while preserving all Next.js-specific settings
- Fixed pre-existing `@auth/core/jwt` module augmentation issue exposed by pnpm's strict hoisting

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `packages/tokens/src/index.ts` | Created | Design token definitions — colors, typography, fontSize, borderRadius, animations |
| `packages/tokens/package.json` | Created | @animekey/tokens workspace package manifest (TypeScript-first) |
| `packages/tokens/tsconfig.json` | Created | Extends @animekey/config base |
| `packages/config/package.json` | Created | @animekey/config workspace package manifest |
| `packages/config/tsconfig.base.json` | Created | Base TypeScript config for all workspace packages |
| `apps/web/tailwind.config.ts` | Modified | Imports from @animekey/tokens (6 token categories) |
| `apps/web/tsconfig.json` | Modified | Adds "extends": "@animekey/config/tsconfig.base.json" |
| `apps/web/package.json` | Modified | Adds @animekey/tokens, @animekey/config, @auth/core deps |
| `apps/web/types/auth.ts` | Modified | Pre-existing bug fix (pnpm hoisting compat) |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| TypeScript-first packages (no build) | Phase 1 scope; bundler resolves .ts directly | Fast iteration; build step can be added in Phase 9 when mobile needs compiled output |
| `fontSize` typed explicitly, not `as const` | `as const` makes tuples `readonly`; Tailwind v3 types require mutable arrays | Tokens are still properly typed; just not narrowed to literals |
| `borderRadius` keeps `var(--radius)` refs | shadcn/ui sets this CSS var at runtime; numeric values needed later | Mobile (Phase 9) will define separate numeric border radius values |

## Deviations from Plan

### Summary

| Type | Count | Impact |
|------|-------|--------|
| Auto-fixed | 3 | All resolved cleanly, zero functional impact |
| Scope additions | 0 | — |
| Deferred | 0 | — |

### Auto-fixed Issues

**1. fontSize as const incompatible with Tailwind v3 types**
- **Found during:** Task 2 typecheck
- **Issue:** `as const` makes tuples `readonly ["6rem", {...}]`, Tailwind expects mutable `[string, {...}]`
- **Fix:** Typed `fontSize` explicitly as `Record<string, [string, {lineHeight?: string; fontWeight?: string}]>` instead of `as const`
- **Verification:** Typecheck passes, Tailwind resolves all fontSize utilities correctly

**2. @auth/core module augmentation fails under pnpm strict hoisting**
- **Found during:** Task 2 typecheck
- **Issue:** `@auth/core` is a transitive dep of `next-auth`; pnpm's strict layout means it's not in `apps/web/node_modules` and TypeScript can't find it for `declare module "@auth/core/jwt"` augmentation. This worked under npm (flat hoisting) but fails under pnpm.
- **Fix:** Added `"@auth/core": "^0.41.0"` to apps/web devDependencies; ran `pnpm install`
- **Verification:** Typecheck passes, JWT types resolve correctly

## Next Phase Readiness

**Ready:**
- `@animekey/tokens` is importable by any workspace package via `workspace:*`
- `@animekey/config/tsconfig.base.json` is ready for all new packages to extend
- Phase 2 (Homepage Conversion) can immediately use token values for new components
- Mobile (Phase 9) can import `tokens` default export for React Native StyleSheet

**Concerns:**
- `borderRadius` tokens contain `var(--radius)` CSS var references — these are web-only. Mobile will need its own numeric radius values when Expo is set up (Phase 9). Document this in the mobile package setup.
- No build step for packages/tokens means it cannot be consumed outside the monorepo (e.g., as an npm package). Add a build step if external consumption is needed post-v1.

**Blockers:**
- None

---
*Phase: 01-monorepo-foundation, Plan: 03*
*Completed: 2026-03-31*
