---
plan: .paul/phases/03-browse-discovery/03-03-PLAN.md
phase: 03-browse-discovery
status: complete
date: 2026-03-31
---

# 03-03 Summary — New & Hot Page

## What Was Built

- **NewAndHotPage** — "use client" component with:
  - Dark cinematic hero strip with "NEW & HOT" badge and "What's hot / right now." headline + green glow blobs
  - "🔥 Trending Now" section: items with trending badge or rating ≥ 8.8, sorted by rating desc, max 12
  - "🆕 New Releases" section: items with new/masterpiece badges or year ≥ 2022, deduped against trending, sorted by year then rating, max 12
  - AnimatedSection wrappers with staggered delay
- **routes.newAndHot** — added `newAndHot: withLocale("/new-and-hot")` to routes.ts
- **HomeHeader fix** — "New & Hot" nav link now correctly points to `/en/new-and-hot`
- **/new-and-hot/page.tsx** — thin server wrapper

## Acceptance Criteria

| Criterion | Result |
|-----------|--------|
| /en/new-and-hot loads with Trending + New Releases | ✓ — 15 CatalogCards rendered (10 trending + 5 new) |
| "New & Hot" nav link active on /en/new-and-hot | ✓ — pathname match works |
| Nav link points to correct route | ✓ — fixed from /en/series |
| TypeScript strict | ✓ — 0 errors |

## Phase 3 Closure

All 3 plans complete:
- 03-01: Search overlay + genre browse pages ✓
- 03-02: Show detail page + episode list ✓
- 03-03: New & Hot page ✓

PR #23 updated with full Phase 3 description.

## Files Modified/Created

- `apps/web/components/discovery/NewAndHotPage.tsx` (new)
- `apps/web/app/[locale]/(main)/new-and-hot/page.tsx` (new)
- `apps/web/constants/routes.ts` (newAndHot added)
- `apps/web/components/home/HomeHeader.tsx` (nav link fixed)
