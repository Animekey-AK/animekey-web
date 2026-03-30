# Animekey

## What This Is

A premium anime streaming platform where users can instantly discover and watch high-quality anime — sub or dub — ad-free across any device. Built to remove friction and get users from discovery to watching in seconds. The platform targets conversion-first UX: every screen is engineered to drive subscriptions and reduce drop-off.

## Core Value

Anime fans can watch their favourite shows ad-free, on any device, anytime.

## Current State

| Attribute | Value |
|-----------|-------|
| Type | Application |
| Version | 0.1.0 |
| Status | Active development |
| Last Updated | 2026-03-31 |

## Requirements

### Core Features

1. **Discover anime** — trending, genres, search, recommendations
2. **Watch episodes instantly** — sub or dub, resume playback
3. **Manage watchlist & continue watching**
4. **Subscribe / start free trial** — via Checkout.com
5. **Browse personalised recommendations** based on behaviour

### Validated (Shipped)

- [x] Auth flows — login, register, forgot/reset password (NextAuth v5)
- [x] Guest session handling
- [x] Multi-profile selection screen
- [x] Homepage hero + content carousels (basic)
- [x] Navbar active state + styling polish
- [x] Monorepo migration — pnpm + Turborepo, apps/web, packages/tokens, packages/config — Phase 1

### Active (In Progress)

- [ ] Homepage conversion redesign — mockup approved (`03-homepage-elite.html`)

### Planned (Next)

- [ ] Design tokens package (`packages/tokens`)
- [ ] Browse & discovery (search, genre filtering)
- [ ] Video player (HLS + DRM — Widevine/FairPlay)
- [ ] Checkout.com subscription + free trial flow
- [ ] Arabic / RTL full pass
- [ ] Mobile app (Expo bare — React Native)
- [ ] TV & PlayStation web modes

### Out of Scope (v1)

- Custom video CDN / HLS infrastructure — depends on existing pipeline
- GDPR/COPPA full compliance — architecture must be extensible, not enforced now
- Social features (comments, ratings, community) — post-v1
- Offline downloads — post-v1

## Target Users

**Primary:** Anime fans aged 16–35
- Want instant access without buffering or ads
- Value sub AND dub options
- Expect a premium, fast, mobile-friendly experience
- Arabic-speaking market is a primary segment alongside English

**Secondary:** Casual viewers discovering anime for the first time
- Conversion from free episode → subscriber is the key funnel

## Constraints

### Technical Constraints

- DRM required: Widevine (Android/Web) + FairPlay (iOS/Safari) for all licensed content
- HLS delivery pipeline already exists — must integrate, not replace
- Existing backend API and CMS manage content, users, subscriptions — web app is a client
- Geo-blocking required per licensing regions (access control per region)
- Bilingual (EN + AR, RTL) is mandatory across all surfaces
- Mobile: Expo bare workflow (full native access for DRM + video trim/share)

### Business Constraints

- Timeline is aggressive — must be visually premium and conversion-ready quickly
- Payfort integration exists; migrating to Checkout.com (server-side only)
- Content is already structured in existing CMS — no content migrations required
- Monorepo must not break the existing web app during migration

### Compliance Constraints

- Regional content rights enforcement (strict per-region access control)
- Architecture must be extensible for GDPR/COPPA — not enforced in v1

## Key Decisions

| Decision | Rationale | Date | Status |
|----------|-----------|------|--------|
| Monorepo: pnpm workspaces + Turborepo | Shared tokens, future mobile/TV apps, build caching | 2026-03-31 | Active |
| Mobile: Expo bare workflow | Full native access (DRM, video trim/share) + EAS Build + OTA updates | 2026-03-31 | Active |
| Design tokens: dual output (JS + CSS) | Web (Tailwind config) + Mobile (StyleSheet) from single source | 2026-03-31 | Active |
| Checkout.com replacing Payfort | Better API, regional support, server-side only | 2026-03-31 | Active |
| TV/PS: web app with TV mode | PS5 is Chromium-based; TV mode = D-pad nav + responsive breakpoints | 2026-03-31 | Active |
| Homepage: conversion-first redesign | Platform-first headline, pulsing CTA, social proof, click-to-preview modal | 2026-03-31 | Active |

## Success Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Stream start success rate | ≥ 99% | - | Not started |
| Landing → trial conversion | 5–10%+ | - | Not started |
| Trial → paid conversion | 20–30%+ | - | Not started |
| First load (hero visible) | < 2 seconds | - | Not started |
| Player start time | < 1–2 seconds | - | Not started |
| Episodes per session | ≥ 1–2 | - | Not started |
| Error rate (auth/payments/playback) | < 1% | - | Not started |

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Web framework | Next.js 14 App Router | Server Components by default |
| Language | TypeScript strict | noImplicitAny, no `any` allowed |
| Styling | Tailwind CSS v3 + shadcn/ui | Utility-first, component primitives |
| Auth | NextAuth v5 | httpOnly cookies, never localStorage |
| State | Zustand (UI) + TanStack Query (server) | Client state vs server data separated |
| Video | hls.js + custom React player | DRM: Widevine + FairPlay |
| i18n | next-intl | EN + AR (RTL), `[locale]` route group |
| CMS | Existing CMS | Content already structured |
| Content | Bilingual EN/AR | RTL mandatory |
| Payments | Checkout.com | Server-only, Server Actions |
| Analytics | Frontend events + backend API | Product/conversion + business events |
| Mobile | Expo bare (React Native) | Planned — iOS + Android |
| Monorepo | pnpm workspaces + Turborepo | Planned |
| Design tokens | `packages/tokens` | Shared web + mobile |
| Env validation | t3-env | Server secrets throw at build time |

---
*PROJECT.md — Updated when requirements or context change*
*Last updated: 2026-03-31 after Phase 1 (Monorepo Foundation)*
