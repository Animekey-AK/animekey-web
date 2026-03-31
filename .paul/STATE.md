# Project State

## Project Reference

See: .paul/PROJECT.md (updated 2026-03-31)

**Core value:** Anime fans can watch their favourite shows ad-free, on any device, anytime.
**Current focus:** v1 Web Platform — Phase 4: Video Player & DRM

## Current Position

Milestone: v1 — Web Platform (v1.0.0)
Phase: 3 of 8 (Browse & Discovery) — In progress
Plan: Phase 3 complete (3/3 plans)
Status: Phase 3 shipped — PR #23 raised (feature/ANI-browse-discovery-03-01 → develop)
Last activity: 2026-03-31 — PR #23 updated, Phase 4 next

Notes:
- Phase 2 shipped: cinematic hero, genre chips, friction-killer, proof strip, promo + countdown, top-ranked, app download, footer CTA
- Homepage mockup-alignment: ProofStrip full-bleed stat band, FrictionKiller instant card row, GenreChips client-side toggle, PromoBanner dark gradient no-image, FooterCta eyebrow+two-CTAs, TopRanked vertical list, MediaCard opacity raised, section order matches mockup
- Framer Motion installed — AnimatedSection wrapper for scroll-triggered entry animations
- Homepage layout contract: main gets pt-16, hero wrapper gets -mt-16 for full-bleed, ProofStrip rendered outside container for full-bleed
- Client island pattern: "use client" CountdownTimer inside server PromoBanner
- PR #22 (feature/ANI-114-homepage-hero-rebuild → develop) updated — ready to merge before Phase 3

Progress:
- Milestone: [████████░░] 75%
- Phase 3: [██████████] 100% (3/3 plans complete — DONE)
- Phase 4: [░░░░░░░░░░] 0% (next)

## Loop Position

```
Phase 2: PLAN ✓ → APPLY ✓ → UNIFY ✓  [complete]
Phase 3: PLAN ✓ → APPLY ✓ → UNIFY ✓  [complete — all 3 plans done, PR #23]
Phase 4: PLAN → APPLY → UNIFY         [next]
```

## Accumulated Context

### Decisions

| Decision | Phase | Impact |
|----------|-------|--------|
| pnpm workspaces + Turborepo | 1 | Monorepo structure for all apps |
| Expo bare (not managed) | Pre-phase | DRM + video trim/share require full native access |
| Checkout.com replacing Payfort | 6 | Server-side only, Server Actions |
| Design tokens: JS + CSS dual output | 1 | Single source of truth for web + mobile |
| Homepage approved: `03-homepage-elite.html` / `mockup.html` | 2 | Platform-first, pulsing CTA, mockup-exact sections |
| TV/PS: web app TV mode | Post-v1 | PS5 is Chromium; D-pad nav layer on web |
| No globalDependencies in turbo.json | 1 | Not needed at scaffold stage; add in 01-02 if required |
| TypeScript-first packages (no build) | 1 | Phase 1 scope; mobile needs compiled output in Phase 9 |
| @auth/core as direct devDep in apps/web | 1 | pnpm strict hoisting means transitive deps need explicit declaration for TS augmentation |
| framer-motion installed in apps/web | 2 | Scroll-triggered section entry animations via AnimatedSection |
| GenreChips client-side toggle | 2 | Chips filter homepage in-place, not navigate to /series?genre=X |
| ProofStrip full-bleed outside container | 2 | Rendered in HomePage.tsx before the padded container |

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
Stopped at: Phase 3 complete — all 3 plans done, PR #23 updated
Next action: /paul:plan 4 — Video Player & DRM (Phase 4, plan 04-01)
Resume file: .paul/ROADMAP.md

---
*STATE.md — Updated after every significant action*
