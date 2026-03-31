---
plan: .paul/phases/04-video-player/04-03-PLAN.md
phase: 04-video-player
status: complete
date: 2026-03-31
---

# 04-03 Summary — Player Polish: Error State + Keyboard Shortcuts

## What Was Built

- **Error state** in VideoPlayer:
  - HLS `fatal` error event → sets `error` state
  - `video` element `error` event → fallback error state
  - Renders centered overlay: warning icon, message, "Try again" button (reloads page)
  - Loading spinner hidden when error is set
  - Big play button hidden when error is set
- **Keyboard shortcut overlay**:
  - `?` key toggles `showShortcuts` state
  - Renders blurred backdrop + modal with 6 shortcuts in `<kbd>` styling
  - Dismisses on `?` again, `Escape`, or clicking outside
  - `toggleFullscreen` moved before keyboard `useEffect` to resolve TS declaration order error

## Acceptance Criteria

| Criterion | Result |
|-----------|--------|
| Error state renders with retry button | ✓ — warning icon + message + green "Try again" button |
| ? key shows shortcut overlay | ✓ — blurred backdrop, 6 shortcuts in 2-col grid |
| Escape dismisses overlay | ✓ |
| TypeScript: 0 errors | ✓ |

## Decisions

- `handleRetry` calls `window.location.reload()` — simplest reliable approach for HLS re-init
- Geo-block enforcement deferred: requires real CDN/edge infrastructure not available in this phase

## Phase 4 Closure

All 3 plans complete:
- 04-01: hls.js player, custom controls, WatchPageClient ✓
- 04-02: Episode selection, sub/dub toggle, resume playback ✓
- 04-03: Error state, keyboard shortcut overlay ✓

## Files Modified

- `apps/web/components/player/VideoPlayer.tsx`
