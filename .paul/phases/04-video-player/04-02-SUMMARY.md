---
plan: .paul/phases/04-video-player/04-02-PLAN.md
phase: 04-video-player
status: complete
date: 2026-03-31
---

# 04-02 Summary — Episode Selection, Sub/Dub, Resume Playback

## What Was Built

- **EpisodeCard** updated:
  - `isSelected` prop: green ring + "Now playing" indicator + brighter thumbnail
  - `onSelect` prop: switches from `<Link>` to `<button>` mode
  - Lock overlay (SVG lock icon, centered) on `!episode.isFree` episodes
  - Play button only shown on free episodes
- **EpisodeList** updated:
  - `selectedEpisode?: number` — passed to each card's `isSelected`
  - `onSelectEpisode?: (episode: Episode) => void` — passed to each card's `onSelect`
- **WatchPageClient** updated:
  - `activeEpisode` state (defaults to `show.episodes[0]`)
  - `handleSelectEpisode`: free → switch player; locked → scroll to paywall strip
  - Sub/Dub toggle: `language` state, `<button>` pills (SUB active = green bg-primary)
  - Resume: reads `localStorage.getItem("resume:{slug}:{ep}")` on episode change; saves via debounced (5s) `onTimeUpdate` callback
- **VideoPlayer** updated:
  - `language?: "sub" | "dub"` prop → badge in controls bar
  - `initialTime?: number` prop → `video.currentTime = initialTime` on `loadedmetadata`
  - `onTimeUpdate?: (currentTime: number) => void` prop → called in timeupdate handler
  - `onTimeUpdate2` internal alias to avoid shadowing

## Acceptance Criteria

| Criterion | Result |
|-----------|--------|
| E1 card highlighted with green ring | ✓ — isSelected ring-2 ring-primary/40 |
| Lock overlay on E2–E5 | ✓ — SVG lock icon centered |
| Sub/Dub toggle renders with active state | ✓ — green pill, "Audio: SUB DUB" |
| Language badge in player controls | ✓ — "SUB" badge top-right of controls |
| Episode info updates on selection (free ep) | ✓ |
| Locked ep click scrolls to paywall | ✓ |
| TypeScript: 0 errors | ✓ |

## Decisions

- "Dub" toggle is UI-only — actual audio track switching requires multi-track HLS from CDN (deferred to infrastructure phase)
- Resume uses localStorage — server-side persistence deferred to Phase 7 (Account & Settings)

## Deferred to 04-03

- DRM: Widevine (Chrome/Android) + FairPlay (Safari/iOS)
- Sub/dub audio track switching (requires multi-track HLS manifest)

## Files Modified

- `apps/web/components/player/VideoPlayer.tsx`
- `apps/web/components/player/WatchPageClient.tsx`
- `apps/web/components/discovery/EpisodeCard.tsx`
- `apps/web/components/discovery/EpisodeList.tsx`
