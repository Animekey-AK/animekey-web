---
phase: 02-homepage-conversion
plan: 03
subsystem: ui
tags: [nextjs, tailwind, server-components, homepage, conversion]

requires:
  - phase: 02-homepage-conversion/02-02
    provides: HeroSpotlight, HomeHeader, SectionRenderer, types.ts foundation

provides:
  - GenreChips component (horizontally scrollable genre/mood chip row)
  - FrictionKiller component (conversion-focused trust-signal section)
  - Extended HomepageData + HomeSection types
  - Updated homeSections page order

affects: browse-discovery, content-rails, conversion-funnel

tech-stack:
  added: []
  patterns:
    - Server-component homepage sections with status guard (status !== "ready" → null)
    - Tailwind arbitrary variant for scrollbar hiding ([&::-webkit-scrollbar]:hidden)
    - Reuse of animate-cta-pulse from globals.css across conversion CTAs

key-files:
  created:
    - apps/web/components/home/GenreChips.tsx
    - apps/web/components/home/FrictionKiller.tsx
  modified:
    - apps/web/components/home/types.ts
    - apps/web/components/home/homepage.data.ts
    - apps/web/components/home/SectionRenderer.tsx

key-decisions:
  - "Server components only — no 'use client' for these sections"
  - "Genre chip hrefs use prefetch={false} — browse routes don't exist yet"
  - "FrictionKiller reuses animate-cta-pulse from globals.css — no new animation"

patterns-established:
  - "New homepage section = types.ts interface + homepage.data.ts constant + component + SectionRenderer case"
  - "Status guard pattern: if (section.status !== 'ready') return null"

duration: ~20min
started: 2026-03-31T00:00:00Z
completed: 2026-03-31T00:00:00Z
---

# Phase 2 Plan 03: Genre Chips + Friction Killer Summary

**Genre mood picker row and "Start watching instantly" conversion section added to homepage — both wired into SectionRenderer with correct page order.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~20 min |
| Tasks | 3 auto + 1 checkpoint |
| Files modified | 3 |
| Files created | 2 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Genre chips render, single-line scrollable on mobile | Pass | flex overflow-x-auto, scrollbar hidden via Tailwind arbitrary variants |
| AC-2: Genre chips link to browse routes | Pass | prefetch={false}, routes.series + ?genre= query params |
| AC-3: FrictionKiller shows trust signals + CTA | Pass | 4 signals, animate-cta-pulse CTA, live count |
| AC-4: Correct section order in page | Pass | hero → genreChips → proofStrip → rails → frictionKiller → promoBanner → topRanked → appDownload |
| AC-5: No TypeScript errors | Pass | pnpm --filter web typecheck exits 0 |

## Accomplishments

- 10-chip genre mood picker row with emoji + label, hover green tint, hidden scrollbar — single line on all viewports
- Conversion section with radial glow, trust signals, pulsing CTA (`animate-cta-pulse`), and live viewer count
- Types extended cleanly: `GenreChipsData`, `FrictionKillerData`, `TrustSignal` added; `HomepageData` and `HomeSection` union updated
- Page order updated in `homeSections` — no layout changes required

## Task Commits

| Task | Commit | Description |
|------|--------|-------------|
| All tasks | `625ffc3` | feat(ANI-114): genre mood chips + friction-killer conversion row |

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `apps/web/components/home/GenreChips.tsx` | Created | Horizontally scrollable genre/mood chip nav row |
| `apps/web/components/home/FrictionKiller.tsx` | Created | "Start watching instantly" trust-signal conversion section |
| `apps/web/components/home/types.ts` | Modified | Added GenreChipsData, FrictionKillerData, TrustSignal; updated HomepageData + HomeSection |
| `apps/web/components/home/homepage.data.ts` | Modified | Added genreChips + frictionKiller constants; updated homepageData + homeSections |
| `apps/web/components/home/SectionRenderer.tsx` | Modified | Added genreChips and frictionKiller cases |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Server components only | No interactivity needed; simpler, faster | All new components are RSC |
| prefetch={false} on genre chips | Browse/filter routes don't exist yet — avoids 404 noise | No prefetch overhead |
| Reuse animate-cta-pulse | Already in globals.css; consistent with hero CTA | No new CSS added |

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

**Ready:**
- Homepage core conversion sections complete: hero, genre chips, rails, friction-killer, proof strip, promo, top-ranked, app download
- All sections follow consistent pattern (types → data → server component → SectionRenderer case)
- GenreChips hrefs ready to point to real browse routes when Phase 3 (Browse & Discovery) ships

**Remaining Phase 2 scope (not yet built):**
- Promo banner countdown timer (currently static)
- Footer CTA section

**Concerns:**
- Genre chip hrefs currently link to non-existent `/series?genre=X` routes — placeholder until Phase 3
- Promo banner countdown requires `"use client"` — deferred

**Blockers:** None

---
*Phase: 02-homepage-conversion, Plan: 03*
*Completed: 2026-03-31*
