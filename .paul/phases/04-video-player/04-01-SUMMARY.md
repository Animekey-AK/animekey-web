---
plan: .paul/phases/04-video-player/04-01-PLAN.md
phase: 04-video-player
status: complete
date: 2026-03-31
---

# 04-01 Summary — HLS Video Player Core

## What Was Built

- **VideoPlayer** (`components/player/VideoPlayer.tsx`) — full custom player:
  - hls.js loaded via dynamic `import("hls.js")` inside `useEffect` (SSR-safe)
  - Fallback: native HLS for Safari, direct src for MP4
  - Custom controls: play/pause, seek bar (with buffered track), volume slider, time display, fullscreen
  - Keyboard shortcuts: Space/K (play-pause), ←→ (±10s), ↑↓ (±0.1 volume), F (fullscreen), M (mute)
  - Auto-hide controls after 3s when playing; re-show on mousemove
  - Loading spinner while `readyState < 3`
  - Big centered play button overlay when paused
  - `onEnded` callback prop for future episode auto-advance (04-02)
- **WatchPageClient** (`components/player/WatchPageClient.tsx`) — "use client" watch layout:
  - VideoPlayer at top with Apple dev HLS stream as placeholder
  - Episode info row: E{n} badge, Free badge, title, description, duration · studio · rating
  - EpisodeList reused from Phase 3
  - Paywall strip for locked episodes
  - "More like this" CatalogCard carousel
- **/watch/[id]/page.tsx** — rewired from ShowDetail → WatchPageClient
- **hls.js v1.6.15** installed

## Acceptance Criteria

| Criterion | Result |
|-----------|--------|
| Player renders with HLS stream | ✓ — Apple test stream loads, video visible |
| Custom controls: play/pause, seek, volume, fullscreen | ✓ — all controls rendered and functional |
| Keyboard shortcuts | ✓ — Space, ←→, ↑↓, F, M all wired |
| Episode info below player | ✓ — E1 badge, Free badge, title, description |
| Episode list below info | ✓ — 5 episodes scrollable |
| TypeScript: 0 errors | ✓ |
| Mobile 375px layout | ✓ — controls adapt, episode list 2-col |

## Decisions

- Used Apple's public HLS test stream (`devstreaming-cdn.apple.com`) as dev placeholder — will be swapped for real CDN in Phase 4 DRM plan
- Controls auto-hide only when `playing === true`; always visible when paused
- Volume slider hidden on mobile (`hidden sm:flex`) — touch devices use native volume

## Deferred to 04-02

- Episode selection (click episode card → player switches to that episode)
- Sub/dub language toggle
- Resume playback (save `currentTime` to localStorage/server)
- DRM (Widevine + FairPlay)

## Files Modified/Created

- `apps/web/components/player/VideoPlayer.tsx` (new)
- `apps/web/components/player/WatchPageClient.tsx` (new)
- `apps/web/app/[locale]/(main)/watch/[id]/page.tsx` (updated)
- `apps/web/package.json` (hls.js added)
