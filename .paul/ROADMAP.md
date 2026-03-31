# Roadmap: Animekey

## Overview

Animekey ships in two milestones. v1 delivers the complete web platform — monorepo foundation, conversion-optimised homepage, browse/discovery, video player with DRM, subscriptions via Checkout.com, and full Arabic/RTL support. v2 expands to mobile (Expo bare), TV, and PlayStation.

## Current Milestone

**v1 — Web Platform** (v1.0.0)
Status: In progress
Phases: 2 of 8 complete

## Phases

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 1 | Monorepo Foundation | 3/3 | ✅ Complete | 2026-03-31 |
| 2 | Homepage Conversion | 3/3 | ✅ Complete | 2026-03-31 |
| 3 | Browse & Discovery | TBD | Not started | - |
| 4 | Video Player & DRM | TBD | Not started | - |
| 5 | Auth & Profiles | TBD | Not started | - |
| 6 | Payments & Subscriptions | TBD | Not started | - |
| 7 | Account & Settings | TBD | Not started | - |
| 8 | Arabic / RTL | TBD | Not started | - |

## Phase Details

### Phase 1: Monorepo Foundation

**Goal:** Restructure repo into pnpm workspaces + Turborepo monorepo with shared tokens and config packages. Web app continues running throughout.
**Depends on:** Nothing
**Research:** Unlikely (design fully approved in brainstorming session)

**Scope:**
- Root workspace setup (pnpm-workspace.yaml, turbo.json, root package.json)
- Move web app to `apps/web/`
- Create `packages/tokens` (design tokens — JS + CSS dual output)
- Create `packages/config` (shared tsconfig + eslint base)
- Scaffold `apps/mobile/` (empty, Expo bare)
- Verify `pnpm --filter web dev` starts clean

**Plans:**
- [x] 01-01: Root workspace + Turborepo setup
- [x] 01-02: Web app migration to `apps/web/`
- [x] 01-03: `packages/tokens` + `packages/config`

---

### Phase 2: Homepage Conversion

**Goal:** Implement the approved `03-homepage-elite.html` design into the Next.js codebase. Platform-first headline, auto-rotating hero, pulsing CTA, preview modal, genre chips, social proof, conversion-optimised layout.
**Depends on:** Phase 1 (tokens available)
**Research:** Unlikely (mockup fully approved)

**Scope:**
- HeroSpotlight rewrite (auto-rotate, particle canvas, click-to-preview modal)
- HomeHeader CTA update ("Watch free for 7 days")
- "Start watching instantly" friction-killer row
- Genre mood picker chips
- Social proof strip
- Promo banner with countdown timer
- Top 5 rail
- Footer CTA

**Plans:**
- [x] 02-02: HeroSpotlight cinematic rewrite, HomeHeader, Storybook stories
- [x] 02-03: GenreChips + FrictionKiller conversion sections
- [x] 02-04: Promo countdown timer (CountdownTimer client island) + FooterCta

---

### Phase 3: Browse & Discovery

**Goal:** Users can find anime via search, genre filters, trending, and recommendations.
**Depends on:** Phase 1
**Research:** Likely (CMS API shape, search integration)

**Scope:**
- Search (instant results, keyboard nav)
- Genre / mood filter pages
- Trending and new-release pages
- Show detail page (episodes, seasons, metadata)
- Recommendations engine (API-driven)

**Plans:**
- [ ] 03-01: Search + genre filter pages
- [ ] 03-02: Show detail page + episode list
- [ ] 03-03: Trending / new releases rails

---

### Phase 4: Video Player & DRM

**Goal:** Users can watch episodes reliably with sub/dub toggle, resume playback, and DRM-protected HLS delivery.
**Depends on:** Phase 3
**Research:** Likely (Widevine/FairPlay integration, HLS DRM pipeline)

**Scope:**
- Custom hls.js player with full controls
- Widevine (Chrome/Android) + FairPlay (Safari/iOS) DRM
- Secure HLS delivery integration
- Sub/dub toggle
- Resume playback (last position persisted)
- Geo-block enforcement at player level

**Plans:**
- [ ] 04-01: Player core (hls.js + custom controls)
- [ ] 04-02: DRM integration (Widevine + FairPlay)
- [ ] 04-03: Sub/dub toggle + resume + geo-block

---

### Phase 5: Auth & Profiles

**Goal:** Complete and harden auth flows — all edge cases, profile management, session handling.
**Depends on:** Phase 1
**Research:** Unlikely (NextAuth v5 already integrated)

**Scope:**
- Profile CRUD (create, edit, delete, avatar)
- Parental controls / profile PIN
- Session management (device list, sign out all)
- Social auth (if required)

**Plans:**
- [ ] 05-01: Profile management
- [ ] 05-02: Session management + security hardening

---

### Phase 6: Payments & Subscriptions

**Goal:** Users can subscribe via Checkout.com, start a free trial, and manage their plan.
**Depends on:** Phase 5 (auth required)
**Research:** Likely (Checkout.com API, webhook handling)

**Scope:**
- Free trial initiation (no card required)
- Checkout.com payment flow (server-side, Server Actions)
- Subscription status enforcement (content gating)
- Plan management (upgrade, cancel, resume)
- Webhook handling (renewals, failures, cancellations)

**Plans:**
- [ ] 06-01: Free trial + Checkout.com payment initiation
- [ ] 06-02: Subscription gating + plan management
- [ ] 06-03: Webhooks + billing event handling

---

### Phase 7: Account & Settings

**Goal:** Users can manage their account, preferences, and viewing history.
**Depends on:** Phase 6
**Research:** Unlikely

**Scope:**
- Account settings (email, password, notifications)
- Viewing history + continue watching management
- Watchlist management
- Language / subtitle preferences
- Download / data management

**Plans:**
- [ ] 07-01: Account settings + preferences
- [ ] 07-02: Watch history + watchlist

---

### Phase 8: Arabic / RTL

**Goal:** Full bilingual experience — every page, component, and flow works flawlessly in Arabic with RTL layout.
**Depends on:** Phases 2–7 (all features complete)
**Research:** Unlikely (next-intl already integrated)

**Scope:**
- Translation strings for all UI copy
- RTL layout audit (every component)
- Arabic typography pass
- Bilingual content rendering (CMS-driven)
- RTL player controls

**Plans:**
- [ ] 08-01: Translation strings + RTL layout audit
- [ ] 08-02: Arabic typography + player RTL

---

## Planned Milestone: v2 — Cross-Platform

**Goal:** Expand Animekey to mobile (iOS + Android), TV, and PlayStation.
**Prerequisite:** v1.0 web platform complete

| Phase | Focus | Research |
|-------|-------|----------|
| 9 | Mobile — Expo bare (iOS + Android) | Likely |
| 10 | Cut & Share feature (native video editing) | Likely |
| 11 | TV mode (Apple TV, Android TV) | Likely |
| 12 | PlayStation web mode (D-pad nav) | Unlikely |

---
*Roadmap created: 2026-03-31*
*Last updated: 2026-03-31*
