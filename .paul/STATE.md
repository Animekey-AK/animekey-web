# Project State

## Project Reference

See: .paul/PROJECT.md (updated 2026-03-31)

**Core value:** Anime fans can watch their favourite shows ad-free, on any device, anytime.
**Current focus:** v1 Web Platform — Phase 2: Homepage Conversion

## Current Position

Milestone: v1 — Web Platform (v1.0.0)
Phase: 2 of 8 (Homepage Conversion) — In Progress (core sections complete, 2 items deferred)
Plan: 02-03 complete
Status: Loop closed — ready for next PLAN or phase decision
Last activity: 2026-03-31 — GenreChips + FrictionKiller shipped; homepage core conversion complete

Notes:
- 02-01-PLAN.md was written against the wrong design (card-based hero). ABORTED, all changes reverted.
- 02-02-PLAN.md: HeroSpotlight cinematic rewrite, HomeHeader, Storybook stories.
- 02-03-PLAN.md: GenreChips + FrictionKiller conversion sections.
- Homepage layout contract: main gets pt-16, hero wrapper gets -mt-16 for full-bleed behind fixed header.
- Remaining Phase 2 scope: promo countdown timer (needs "use client"), footer CTA.

Progress:
- Milestone: [██░░░░░░░░] 25%
- Phase 2: [██████░░░░] 60%

## Loop Position

```
PLAN ──▶ APPLY ──▶ UNIFY
  ✓        ✓        ✓     [Loop 02-03 complete — ready for next PLAN]
```

## Accumulated Context

### Decisions

| Decision | Phase | Impact |
|----------|-------|--------|
| pnpm workspaces + Turborepo | 1 | Monorepo structure for all apps |
| Expo bare (not managed) | Pre-phase | DRM + video trim/share require full native access |
| Checkout.com replacing Payfort | 6 | Server-side only, Server Actions |
| Design tokens: JS + CSS dual output | 1 | Single source of truth for web + mobile |
| Homepage approved: `03-homepage-elite.html` | 2 | Platform-first, pulsing CTA, preview modal |
| TV/PS: web app TV mode | Post-v1 | PS5 is Chromium; D-pad nav layer on web |
| No globalDependencies in turbo.json | 1 | Not needed at scaffold stage; add in 01-02 if required |
| TypeScript-first packages (no build) | 1 | Phase 1 scope; mobile needs compiled output in Phase 9 |
| @auth/core as direct devDep in apps/web | 1 | pnpm strict hoisting means transitive deps need explicit declaration for TS augmentation |

### Deferred Issues

| Issue | Origin | Effort | Revisit |
|-------|--------|--------|---------|
| Figma design system | Pre-init | M | After Phase 2 (homepage shipped) |
| Storybook component library | Pre-init | M | After Phase 2, when component variants multiply |
| GDPR/COPPA compliance | Pre-init | L | Post-v1 |

### Blockers/Concerns

None active.

## Session Continuity

Last session: 2026-03-31
Stopped at: Plan 02-03 unified — genre chips + friction-killer shipped
Next action: Decide — continue Phase 2 (promo countdown + footer CTA) or wrap Phase 2 and merge PR
Resume file: .paul/phases/02-homepage-conversion/02-03-SUMMARY.md

---
*STATE.md — Updated after every significant action*
