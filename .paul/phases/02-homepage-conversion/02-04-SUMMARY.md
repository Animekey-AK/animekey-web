---
phase: 02-homepage-conversion
plan: 04
subsystem: ui
tags: [nextjs, tailwind, server-components, client-components, countdown, conversion, homepage]

requires:
  - phase: 02-homepage-conversion/02-03
    provides: FrictionKiller, GenreChips, extended HomepageData + HomeSection types

provides:
  - CountdownTimer ("use client", SSR-safe live countdown)
  - PromoBanner with countdown integration
  - FooterCta (full-width final conversion section)
  - Phase 2 homepage conversion scope: complete

affects: conversion-funnel, promo-system, page-layout

tech-stack:
  added: []
  patterns:
    - Client island pattern — "use client" CountdownTimer inside server PromoBanner
    - SSR-safe timer — useState(null) initialised in useEffect to prevent hydration mismatch
    - Interval cleanup via useEffect return to prevent memory leaks

key-files:
  created:
    - apps/web/components/home/CountdownTimer.tsx
    - apps/web/components/home/FooterCta.tsx
  modified:
    - apps/web/components/home/types.ts
    - apps/web/components/home/homepage.data.ts
    - apps/web/components/home/PromoBanner.tsx
    - apps/web/components/home/SectionRenderer.tsx

key-decisions:
  - "CountdownTimer is a client island inside server PromoBanner — no need to make PromoBanner a client component"
  - "Timer initialises to null on server, sets value in useEffect — zero hydration risk"
  - "FooterCta is a pure server component — no interactivity needed"

patterns-established:
  - "Client island pattern: 'use client' sub-component renders inside server parent — keeps server rendering for layout, client rendering for live data"
  - "SSR-safe timer: useState<T | null>(null) + useEffect initialisation = no hydration mismatch"

duration: ~15min
started: 2026-03-31T00:00:00Z
completed: 2026-03-31T00:00:00Z
---

# Phase 2 Plan 04: Countdown Timer + Footer CTA Summary

**Live countdown timer added to promo banner; full-width "Watch free for 7 days" footer CTA added as final homepage section — Phase 2 homepage conversion scope complete.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~15 min |
| Tasks | 2 auto + 1 checkpoint |
| Files modified | 4 |
| Files created | 2 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Countdown renders in promo banner, ticks, no hydration errors | Pass | SSR-safe via useState(null) + useEffect init; renders nothing on server |
| AC-2: FooterCta is final section before site footer | Pass | Last entry in homeSections; SiteFooter renders immediately below |
| AC-3: No TypeScript errors | Pass | pnpm --filter web typecheck exits 0 |

## Accomplishments

- Client island pattern: `CountdownTimer` ("use client") renders inside server `PromoBanner` — no `PromoBanner` refactor needed
- `useState<TimeLeft | null>(null)` initialised in `useEffect` eliminates all hydration risk — server renders nothing, client picks up immediately
- `FooterCta` — centred full-width section with radial glow, top divider, fluid headline (36→64px), pulsing CTA reusing `animate-cta-pulse`
- Complete page order: Hero → GenreChips → ProofStrip → Rails → FrictionKiller → PromoBanner (timer) → TopRanked → AppDownload → FooterCta → SiteFooter

## Task Commits

| Task | Commit | Description |
|------|--------|-------------|
| Both tasks | `4713e4a` | feat(ANI-114): promo countdown timer + footer CTA — Phase 2 complete |

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `apps/web/components/home/CountdownTimer.tsx` | Created | "use client" SSR-safe countdown DD:HH:MM:SS |
| `apps/web/components/home/FooterCta.tsx` | Created | Full-width last-chance conversion section |
| `apps/web/components/home/PromoBanner.tsx` | Modified | Conditionally renders CountdownTimer when countdownTarget set |
| `apps/web/components/home/types.ts` | Modified | Added countdownTarget?: string to PromoData; added FooterCtaData + HomepageData + HomeSection union |
| `apps/web/components/home/homepage.data.ts` | Modified | Added countdownTarget to promoBanner; added footerCta constant; updated homepageData + homeSections |
| `apps/web/components/home/SectionRenderer.tsx` | Modified | Added footerCta case |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| CountdownTimer as client island | PromoBanner stays a server component — only the timer needs client JS | Minimal JS bundle; server rendering preserved for layout |
| useState(null) + useEffect init | Prevents hydration mismatch — server and first client render both show null | Zero console warnings; clean SSR |
| FooterCta as server component | No interactivity; Link + static copy = pure RSC | Faster, simpler |

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

**Phase 2 scope delivered:**
- ✓ HeroSpotlight cinematic rewrite (02-02)
- ✓ HomeHeader scroll-reactive + CTA (02-02)
- ✓ Genre mood picker chips (02-03)
- ✓ "Start watching instantly" friction-killer row (02-03)
- ✓ Social proof strip (02-02)
- ✓ Promo banner with countdown timer (02-04)
- ✓ Top 5 rail (02-02)
- ✓ Footer CTA (02-04)

**Ready for Phase 3:**
- Genre chip hrefs (`/series?genre=X`) are placeholder until Phase 3 (Browse & Discovery) ships real routes
- All homepage section types are stable — Phase 3 can replace mock data with real API data without touching component APIs

**Blockers:** None

---
*Phase: 02-homepage-conversion, Plan: 04*
*Completed: 2026-03-31*
