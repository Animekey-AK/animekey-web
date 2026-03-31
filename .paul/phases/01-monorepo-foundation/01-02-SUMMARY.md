---
phase: 01-monorepo-foundation
plan: 02
subsystem: infra
tags: [pnpm, turborepo, monorepo, nextjs, migration, workspaces]

requires:
  - phase: 01-01
    provides: pnpm-workspace.yaml, turbo.json, apps/ and packages/ directories

provides:
  - apps/web/ containing the full Next.js web app
  - apps/web/package.json with name @animekey/web
  - root package.json with turbo dev/build/typecheck/lint scripts
  - pnpm-lock.yaml at repo root (workspace lock file)
  - Working dev server at localhost:3000 via pnpm --filter @animekey/web dev

affects:
  - 01-03-packages (packages/ dir is ready; web app is in apps/web/)
  - all future phases (web app source is now at apps/web/** not root **)

tech-stack:
  added: [turbo@2.9.1 (installed via pnpm), pnpm workspaces active]
  patterns:
    - pnpm workspace filter: pnpm --filter @animekey/web <script>
    - turbo pipeline entry: turbo dev / turbo build (delegates to workspace scripts)

key-files:
  created: [package.json (root), pnpm-lock.yaml]
  modified: [apps/web/package.json (name → @animekey/web)]
  moved:
    - app/ → apps/web/app/
    - components/ → apps/web/components/
    - lib/ → apps/web/lib/
    - actions/ → apps/web/actions/
    - constants/ → apps/web/constants/
    - types/ → apps/web/types/
    - public/ → apps/web/public/
    - next.config.ts → apps/web/next.config.ts
    - tsconfig.json → apps/web/tsconfig.json
    - tailwind.config.ts → apps/web/tailwind.config.ts
    - postcss.config.mjs → apps/web/postcss.config.mjs
    - eslint.config.mjs → apps/web/eslint.config.mjs
    - auth.config.ts → apps/web/auth.config.ts
    - proxy.ts → apps/web/proxy.ts
    - components.json → apps/web/components.json
    - package.json → apps/web/package.json
    - .env.local → apps/web/.env.local
  deleted: [package-lock.json, next-env.d.ts, tsconfig.tsbuildinfo]

key-decisions:
  - "Used git mv for tracked files (history preserved), plain mv for untracked files (next.config.ts, auth.config.ts, proxy.ts were ?? in git status)"
  - "Empty dirs (hooks/, services/api/) recreated with mkdir — git cannot track empty directories"
  - "turbo pinned at 2.9.1 after pnpm install resolved latest"

patterns-established:
  - "All web app source lives under apps/web/ — all future feature work targets this path"
  - "pnpm --filter @animekey/web <script> is the correct way to run web-only scripts"
  - "turbo dev at root fans out to all workspace dev scripts"

duration: ~25min
started: 2026-03-31T00:00:00.000Z
completed: 2026-03-31T00:00:00.000Z
---

# Phase 1 Plan 02: Web App Migration Summary

**Next.js web app moved from repo root to `apps/web/` — repo is now a functioning pnpm monorepo with dev server confirmed working.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~25 min |
| Started | 2026-03-31 |
| Completed | 2026-03-31 |
| Tasks | 2 auto + 1 checkpoint (all passed) |
| Files moved | 17 directories/files |
| Files deleted | 3 (package-lock.json, next-env.d.ts, tsconfig.tsbuildinfo) |
| Files created | 2 (root package.json, pnpm-lock.yaml) |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Web app files in apps/web/ | Pass | All directories and config files present in apps/web/ |
| AC-2: Package manifest correct | Pass | name: @animekey/web, all scripts/deps intact |
| AC-3: Root package.json is monorepo root | Pass | turbo scripts, no Next.js deps |
| AC-4: pnpm workspace resolves | Pass | pnpm list --filter @animekey/web lists 23 packages |
| AC-5: Dev server starts clean | Pass | Approved by user at checkpoint |

## Accomplishments

- Moved the full Next.js web app (17 file/directory moves) to `apps/web/` with git history preserved for all tracked files
- Renamed package from `animekey-v2` → `@animekey/web` enabling workspace filtering
- Created lean monorepo root `package.json` with turbo orchestration scripts
- Replaced `package-lock.json` with `pnpm-lock.yaml` (628 packages resolved across 3 workspace projects)
- Dev server confirmed working at localhost:3000 via `pnpm --filter @animekey/web dev`

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `package.json` (root) | Created | Monorepo root with turbo dev/build/typecheck/lint scripts |
| `pnpm-lock.yaml` | Created | pnpm workspace lock file (628 packages, 3 workspace projects) |
| `apps/web/package.json` | Modified (name) | name: animekey-v2 → @animekey/web |
| `apps/web/app/**` | Moved | Next.js App Router (was root app/) |
| `apps/web/components/**` | Moved | React components (was root components/) |
| `apps/web/lib/**` | Moved | Shared lib utilities (was root lib/) |
| `apps/web/actions/**` | Moved | Server Actions (was root actions/) |
| `apps/web/constants/**` | Moved | Route/API constants (was root constants/) |
| `apps/web/types/**` | Moved | TypeScript interfaces (was root types/) |
| `apps/web/public/**` | Moved | Static assets (was root public/) |
| `apps/web/next.config.ts` | Moved | Next.js config (was untracked at root) |
| `apps/web/tsconfig.json` | Moved | TypeScript config — @/* paths still valid |
| `apps/web/tailwind.config.ts` | Moved | Tailwind config |
| `apps/web/postcss.config.mjs` | Moved | PostCSS config |
| `apps/web/eslint.config.mjs` | Moved | ESLint config |
| `apps/web/auth.config.ts` | Moved | NextAuth config (was untracked at root) |
| `apps/web/proxy.ts` | Moved | Proxy config (was untracked at root) |
| `apps/web/components.json` | Moved | shadcn/ui config |
| `apps/web/.env.local` | Moved | Local env vars (was gitignored at root) |
| `package-lock.json` | Deleted | npm lock file replaced by pnpm-lock.yaml |
| `next-env.d.ts` | Deleted | Auto-generated; will regenerate in apps/web/ |
| `tsconfig.tsbuildinfo` | Deleted | Stale build artifact |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| `git mv` for tracked files, `mv` for untracked | `next.config.ts`, `auth.config.ts`, `proxy.ts` were untracked (`??` in git status) — git mv would fail | History preserved for all files that had it; untracked files moved cleanly |
| `mkdir` for hooks/ and services/ | Both dirs had zero tracked files; git cannot track empty dirs | Empty dirs recreated at destination — no content lost |

## Deviations from Plan

### Summary

| Type | Count | Impact |
|------|-------|--------|
| Auto-fixed | 2 | Minimal — same end result |
| Scope additions | 0 | — |
| Deferred | 0 | — |

**Total impact:** Two minor handling differences, both self-corrected, zero functional impact.

### Auto-fixed Issues

**1. Empty directories (hooks/, services/) not moveable by git mv**
- **Found during:** Task 1 (first git mv attempt)
- **Issue:** `git mv hooks ...` failed with "source directory is empty"
- **Fix:** `mkdir -p apps/web/hooks apps/web/services/api` after the successful git mv of non-empty dirs
- **Verification:** Both dirs exist in apps/web/

**2. Untracked config files (next.config.ts, auth.config.ts, proxy.ts) not under git version control**
- **Found during:** Task 1 (second git mv attempt)
- **Issue:** These 3 files were `??` in git status — `git mv` requires files to be tracked
- **Fix:** Used plain `mv` for these 3 files; they are now staged for addition in the next commit
- **Verification:** All 3 files present in apps/web/

## Next Phase Readiness

**Ready:**
- `apps/web/` is the canonical location for all Next.js source — Plan 01-03 and all future phases target `apps/web/**`
- `packages/` directory exists and is empty — ready for tokens + config packages
- pnpm workspace is active — Plan 01-03 packages will be auto-linked once they have a package.json with a name

**Concerns:**
- `next.config.ts`, `auth.config.ts`, `proxy.ts` are still untracked in git (moved from untracked state). Should be committed.
- CLAUDE.md still references `npm run dev` — should be updated to `pnpm --filter @animekey/web dev` or `turbo dev` at some point (deferred, not blocking)

**Blockers:**
- None

---
*Phase: 01-monorepo-foundation, Plan: 02*
*Completed: 2026-03-31*
