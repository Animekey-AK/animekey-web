---
phase: 02-homepage-conversion
plan: 02
subsystem: ui
tags: [react, nextjs, tailwind, storybook, animation, canvas, hero]

requires:
  - phase: 01-monorepo-foundation
    provides: apps/web scaffold, Tailwind config, globals.css, Storybook 10.3.3

provides:
  - Cinematic full-screen hero with 4 rotating slides + particle canvas
  - HeroPreviewModal — full-screen click-to-preview overlay
  - Scroll-reactive fixed HomeHeader with pulsing CTA
  - HeroCinematicData / HeroSlide type model replacing HeroData
  - Co-located Storybook stories for HeroSpotlight + HomeHeader
  - Fully responsive hero (mobile 390px, tablet 768px, desktop 1440px)

affects: [03-content-rails, 04-player, any phase that imports HomepageData or HomeSection]

tech-stack:
  added: []
  patterns:
    - Inline style objects for complex multi-stop CSS gradients (too long for Tailwind arbitrary)
    - Canvas null narrowing via typed const capture (cv/cx) after null guard at useEffect top
    - clamp() for fluid responsive font sizes via inline style
    - sm:justify-center lg:justify-end for breakpoint-aware vertical alignment
    - animate-cta-pulse keyframe defined in globals.css @layer utilities

key-files:
  created:
    - apps/web/components/home/HeroPreviewModal.tsx
    - apps/web/components/home/HeroSpotlight.stories.tsx
    - apps/web/components/home/HomeHeader.stories.tsx
  modified:
    - apps/web/components/home/types.ts
    - apps/web/components/home/homepage.data.ts
    - apps/web/components/home/HeroSpotlight.tsx
    - apps/web/components/home/HomePage.tsx
    - apps/web/components/home/SectionRenderer.tsx
    - apps/web/components/home/HomeHeader.tsx
    - apps/web/app/[locale]/(main)/layout.tsx
    - apps/web/app/globals.css
    - apps/web/.storybook/preview.ts

key-decisions:
  - "Inline style for gradients: CSS radial+linear combos too long for Tailwind arbitrary values"
  - "clamp() for headline font: fluid scaling instead of fixed breakpoint classes"
  - "Canvas null narrowing: capture typed const refs after null guard to satisfy TS strict"
  - "-mt-16 hero wrapper + pt-16 on main: lets hero bleed behind fixed header without layout shift"
  - "sm:justify-center lg:justify-end: tablet centers content vertically, desktop anchors bottom"

patterns-established:
  - "Hero wrapper uses -mt-16 in HomePage.tsx to break out of main's pt-16 clearance"
  - "Storybook stories are co-located with their component (HeroSpotlight.stories.tsx)"
  - "Client components that need canvas use typed const capture for null narrowing in closures"

duration: ~4 hours (multi-session, including responsive fix)
started: 2026-03-31T00:00:00Z
completed: 2026-03-31T23:30:00Z
---

# Phase 2 Plan 02: Cinematic Hero Rebuild Summary

**Full-screen cinematic hero with 4 rotating slides, particle canvas, urgency panel, preview modal, and scroll-reactive header — rebuilt against approved `03-homepage-elite.html` design with full mobile/tablet/desktop responsive treatment.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~4 hours (multi-session) |
| Started | 2026-03-31 |
| Completed | 2026-03-31 |
| Tasks | 6 tasks + 1 checkpoint completed |
| Files modified | 9 files modified, 3 created |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: Full-screen hero, 4 rotating slides | Pass | min-h-screen, 4 slides, 6.5s auto-rotation, 420ms fade, slide dots |
| AC-2: Platform-first content structure | Pass | Fixed headline, badge, sub-headline, pills, description all present |
| AC-3: Pulsing CTA + social proof | Pass | animate-cta-pulse, counter animates from 0, avatar stack, trial copy |
| AC-4: Urgency panel (right side, desktop) | Pass | hidden lg:flex, two glassmorphism cards, countdown + live count |
| AC-5: Particle canvas | Pass | 100 particles, rgba(113,199,4), rAF loop, edge wrap, resize handler |
| AC-6: Preview modal | Pass | Click anywhere → modal; Escape / backdrop / × all close it |
| AC-7: Scroll-reactive fixed header | Pass | scrollY > 40 triggers blur/border; transparent at top; CTA present |
| AC-8: No regressions (typecheck exits 0) | Pass | `npx tsc --noEmit` produces no output (clean) |

## Accomplishments

- Replaced card-based HeroSpotlight with cinematic full-screen hero exactly matching the approved elite mockup
- Canvas particle system with requestAnimationFrame, edge-wrapping, and proper TypeScript null narrowing
- Auto-rotation with stale-closure-safe `curRef` pattern; dot clicks reset timer correctly
- HeroPreviewModal: keyboard (Escape), backdrop click, and × button all dismiss correctly
- Fully responsive: `clamp(28px, 6.5vw, 68px)` headline, `sm:justify-center lg:justify-end`, mobile-tightened spacing
- Clean Storybook stories (Default + Loading) co-located for both HeroSpotlight and HomeHeader

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `apps/web/components/home/types.ts` | Modified | Removed HeroData; added HeroPill, HeroSlide, HeroCinematicData |
| `apps/web/components/home/homepage.data.ts` | Modified | 4 hero slides with distinct colorVariant, pills, viewer counts |
| `apps/web/components/home/HeroSpotlight.tsx` | Modified (full rewrite) | Cinematic hero: gradients, canvas, animations, urgency panel, dots |
| `apps/web/components/home/HeroPreviewModal.tsx` | Created | Full-screen preview overlay with Escape/backdrop/× dismiss |
| `apps/web/components/home/HomePage.tsx` | Modified | Hero rendered full-width with -mt-16 wrapper outside content container |
| `apps/web/components/home/SectionRenderer.tsx` | Modified | Hero case updated to pass HeroCinematicData |
| `apps/web/components/home/HomeHeader.tsx` | Modified | Fixed position, scroll-reactive, New & Hot link, pulsing CTA |
| `apps/web/app/[locale]/(main)/layout.tsx` | Modified | Added pt-16 to <main> for fixed header clearance |
| `apps/web/app/globals.css` | Modified | Added animate-cta-pulse keyframe + hero-hover-hint CSS |
| `apps/web/.storybook/preview.ts` | Modified | Added globals.css import + viewport defaults |
| `apps/web/components/home/HeroSpotlight.stories.tsx` | Created | Default + Loading stories |
| `apps/web/components/home/HomeHeader.stories.tsx` | Created | Default story |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Inline `style` for slide gradients | CSS radial+linear combos exceed Tailwind arbitrary value length limit | Pattern for future complex gradients |
| `clamp()` via inline `style` for headline | Fluid scaling at any viewport width; Tailwind can't express clamp() with vw units natively | Mobile headline no longer wraps to 4 lines |
| Typed const capture for canvas refs | TypeScript doesn't narrow nullability across closure boundaries; `const cv: HTMLCanvasElement = canvas` after null guard fixes TS2531 inside nested functions | Required pattern for any canvas useEffect |
| `-mt-16` hero wrapper in HomePage | Hero must bleed behind fixed 64px header for cinematic full-bleed. `<main>` needs `pt-16` for non-hero content | Layout contract: main gets pt-16, hero wrapper gets -mt-16 |
| `sm:justify-center lg:justify-end` | Tablet (768px) had ~450px empty gradient space above content with justify-end. Centering at sm fixes this. lg reverts to cinematic bottom-anchor | Resolved "looks cheap" tablet feedback |

## Deviations from Plan

### Summary

| Type | Count | Impact |
|------|-------|--------|
| Scope additions | 1 | Extended human-verify checkpoint to include responsive fix |
| Auto-fixed | 2 | TypeScript null narrowing, Storybook preview.ts import |

**Total impact:** Essential fixes only, no scope creep beyond responsive.

### Auto-fixed Issues

**1. TypeScript TS18047 — canvas/ctx null in closures**
- **Found during:** Task 2 (HeroSpotlight)
- **Issue:** TS strict mode doesn't narrow null through closure boundaries; `canvas.width` inside `resize()` errors even after top-level null guard
- **Fix:** Capture `const cv: HTMLCanvasElement = canvas; const cx: CanvasRenderingContext2D = ctx;` after null check, use these inside nested functions
- **Verification:** `tsc --noEmit` exits 0

**2. Responsive design — "looks cheap" on mobile/tablet**
- **Found during:** human-verify checkpoint (Playwright screenshots at 390px and 768px)
- **Issue:** `text-[52px]` headline wrapped to 4 lines on mobile; `justify-end` left ~450px empty gradient at tablet top
- **Fix:** `clamp(28px, 6.5vw, 68px)` headline, `sm:justify-center lg:justify-end`, mobile-tightened spacing throughout, `hidden sm:flex` avatar stack, responsive button sizes
- **Verification:** Playwright screenshots confirmed clean layout at 390px, 768px, 1440px

## Issues Encountered

| Issue | Resolution |
|-------|------------|
| 02-01-PLAN.md written against wrong (card-based) design | Aborted 02-01, reverted all changes, created 02-02 against correct approved design |
| TypeScript null narrowing in canvas useEffect | Typed const capture pattern (cv/cx) — documented in key-decisions |
| Mobile headline wrapping to 4 lines at 52px | clamp() fluid font scaling |
| Tablet empty space with justify-end | sm:justify-center breakpoint override |

## Next Phase Readiness

**Ready:**
- HeroCinematicData / HeroSlide types are stable; content rails in Phase 3 can add MediaCard types alongside
- Homepage layout contract (pt-16 main, -mt-16 hero wrapper) is set; no layout changes needed
- Storybook configured and co-located stories pattern established
- HomeHeader fixed + reactive — header is done for Phase 2 scope

**Concerns:**
- Desktop headline wraps to 3 lines at 68px with 640px content width ("now." floats alone). This was in the approved mockup treatment and user confirmed desktop was visually acceptable. If it becomes an issue, reduce max-w or clamp max to ~56px.
- No real API data yet — homepage.data.ts is static mock. Phase 3+ will need to wire up TanStack Query hooks.

**Blockers:**
- None

---
*Phase: 02-homepage-conversion, Plan: 02*
*Completed: 2026-03-31*
