# Project State

## Project Reference

See: .paul/PROJECT.md (updated 2026-03-31)

**Core value:** Anime fans can watch their favourite shows ad-free, on any device, anytime.
**Current focus:** v1 Web Platform — Phase 3: Browse & Discovery

## Current Position

Milestone: v1 — Web Platform (v1.0.0)
Phase: 3 of 8 (Browse & Discovery) — Not started
Plan: Not started
Status: Phase 2 complete — ready to plan Phase 3
Last activity: 2026-03-31 — Phase 2 complete, PR #22 open on GitHub

Notes:
- Phase 2 shipped: cinematic hero, genre chips, friction-killer, proof strip, promo + countdown, top-ranked, app download, footer CTA
- Homepage layout contract: main gets pt-16, hero wrapper gets -mt-16 for full-bleed behind fixed header
- Client island pattern established: "use client" CountdownTimer inside server PromoBanner
- PR #22 (feature/ANI-114-homepage-hero-rebuild → develop) is open — merge before starting Phase 3

Progress:
- Milestone: [███░░░░░░░] 30%
- Phase 3: [░░░░░░░░░░] 0%

## Loop Position

```
PLAN ──▶ APPLY ──▶ UNIFY
  ✓        ✓        ✓     [Phase 2 complete — ready for Phase 3 PLAN]
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
Stopped at: Phase 2 complete — homepage conversion fully shipped
Next action: Merge PR #22, then /paul:plan for Phase 3 (Browse & Discovery)
Resume file: .paul/ROADMAP.md

---
*STATE.md — Updated after every significant action*
