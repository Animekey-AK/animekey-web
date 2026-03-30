---
phase: 01-monorepo-foundation
plan: 01
subsystem: infra
tags: [pnpm, turborepo, monorepo, workspaces, expo]

requires: []
provides:
  - pnpm-workspace.yaml declaring apps/* and packages/*
  - turbo.json with build/dev/typecheck/lint pipeline
  - apps/mobile/ scaffold (package.json only)
  - packages/ directory
  - .gitignore updated for Turborepo + pnpm artifacts
affects:
  - 01-02-web-migration (apps/ structure exists, ready to receive apps/web/)
  - 01-03-packages (packages/ dir exists, ready for tokens + config)

tech-stack:
  added: [turborepo, pnpm-workspaces]
  patterns: [monorepo workspace declaration, turbo pipeline with ^build dependency ordering]

key-files:
  created: [pnpm-workspace.yaml, turbo.json, apps/mobile/package.json]
  modified: [.gitignore]

key-decisions:
  - "No globalDependencies in turbo.json — not needed at this stage"
  - "apps/mobile/ scaffold is package.json only — full Expo bare setup deferred to Phase 9"

patterns-established:
  - "^build in turbo.json means build workspace dependencies first"
  - "persistent: true on dev task keeps Next.js dev server + Metro bundler alive"

duration: ~5min
started: 2026-03-31T00:00:00.000Z
completed: 2026-03-31T00:00:00.000Z
---

# Phase 1 Plan 01: Workspace Scaffold Summary

**pnpm workspaces + Turborepo skeleton created — repo is a valid monorepo without touching any existing web app code.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~5 min |
| Started | 2026-03-31 |
| Completed | 2026-03-31 |
| Tasks | 2 completed |
| Files modified | 4 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Workspace declaration exists | Pass | pnpm-workspace.yaml declares `apps/*` and `packages/*` |
| AC-2: Turborepo pipeline is valid | Pass | turbo.json has build/dev/typecheck/lint with correct settings |
| AC-3: Directory structure exists | Pass | apps/, packages/, apps/mobile/ all exist; apps/mobile/package.json has @animekey/mobile |
| AC-4: Existing web app is untouched | Pass | package.json, next.config.ts, app/, components/, lib/ — all byte-for-byte identical |

## Accomplishments

- Created `pnpm-workspace.yaml` declaring `apps/*` and `packages/*` workspaces
- Created `turbo.json` with full build pipeline: `build` (^build dep, .next/** outputs), `dev` (persistent, no cache), `typecheck` (^build dep), `lint`
- Scaffolded `apps/mobile/` with minimal `package.json` (name: `@animekey/mobile`, Expo bare description)
- Created empty `packages/` directory ready for tokens + config packages
- Updated `.gitignore` with Turborepo (`.turbo`), pnpm (`.pnpm-store`), and mobile (`apps/mobile/node_modules`, `apps/mobile/.expo`) entries

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `pnpm-workspace.yaml` | Created | Declares workspace packages at apps/* and packages/* |
| `turbo.json` | Created | Turborepo build pipeline for all workspace tasks |
| `apps/mobile/package.json` | Created | Minimal Expo bare scaffold stub (name: @animekey/mobile) |
| `.gitignore` | Modified | Added .turbo, .pnpm-store, apps/mobile/node_modules, apps/mobile/.expo |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| No `globalDependencies` in turbo.json | Not needed at this stage; premature config | Can add in 01-02 if needed after pnpm install |
| apps/mobile/ is package.json only | Full Expo bare scaffold is Phase 9 scope; stub is enough for workspace recognition | 01-02 and 01-03 can proceed without mobile setup |

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

**Ready:**
- `apps/` directory exists — Plan 01-02 can move the Next.js web app to `apps/web/`
- `packages/` directory exists — Plan 01-03 can create `packages/tokens` and `packages/config`
- Workspace declaration in place — once `apps/web/package.json` has a name field, `pnpm --filter web dev` will work
- Turborepo pipeline ready — once workspace packages have scripts, `turbo build` will resolve the graph

**Concerns:**
- None for 01-02 or 01-03

**Blockers:**
- None

---
*Phase: 01-monorepo-foundation, Plan: 01*
*Completed: 2026-03-31*
