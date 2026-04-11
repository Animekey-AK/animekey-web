---
phase: 05-auth-profiles
plan: 01
subsystem: auth
tags: [nextauth, server-actions, profiles, account-page]

requires:
  - phase: 04-video-player
    provides: WatchPageClient component that needed isGuest prop

provides:
  - /account page with profile list, add/delete profile, sign out
  - createProfile and deleteProfile server actions
  - isGuest soft sign-in banner on watch page

affects: [06-payments, 07-subscription-management]

tech-stack:
  added: []
  patterns:
    - "Server component fetches data → passes to 'use client' AccountPage"
    - "useTransition wraps server actions for pending state"
    - "Dev placeholder profile (id: dev-placeholder) skips API calls"

key-files:
  created:
    - apps/web/components/account/AccountPage.tsx
    - apps/web/actions/createProfile.ts
    - apps/web/actions/deleteProfile.ts
    - apps/web/app/[locale]/(main)/account/page.tsx
  modified:
    - apps/web/components/player/WatchPageClient.tsx
    - apps/web/app/[locale]/(main)/watch/[id]/page.tsx

key-decisions:
  - "AccountPage receives profiles as props from server component (not useSession) for SSR"
  - "Dev placeholder (id: dev-placeholder) short-circuits delete API call"
  - "isGuest=true on watch page shows soft banner, not a blocker redirect"

patterns-established:
  - "Optimistic profile add with router.refresh() for eventual consistency"
  - "useTransition for server action loading state without useState isPending"

duration: ~30min
started: 2026-03-31T00:00:00Z
completed: 2026-03-31T00:00:00Z
---

# Phase 5 Plan 01: Account Page & Profile Management Summary

**`/account` page with profile list (add/delete/kids toggle), sign-out, and soft "sign in" banner on watch page — wired to real server actions with graceful dev fallback.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~30 min |
| Tasks | 10 completed |
| Files created | 4 |
| Files modified | 2 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| /en/account loads with profile list, Add button, Sign out | Pass | Dev placeholder "Main Profile" shown; 1/5 counter visible |
| Watch page shows "sign in" banner for unauthenticated user | Pass | Banner renders below player; non-blocking |
| TypeScript: 0 errors | Pass | `npx tsc --noEmit` clean |

## Accomplishments

- Full `AccountPage` component with profile cards (initials avatar, delete ×), inline "Add profile" form (name + Kids toggle), account links section, "Sign out of all devices"
- `createProfile` and `deleteProfile` server actions wired to `API_BASE_URL/profiles` with bearer auth + x-api-key headers; graceful error return
- `/account` server route: fetches profiles from API, falls back to dev placeholder when backend unavailable
- `isGuest` prop on `WatchPageClient` shows soft banner "Sign in to save your progress and unlock all episodes" with primary-colored "Sign in →" link

## Task Commits

| Task | Commit | Description |
|------|--------|-------------|
| Tasks 1–10 | `472123e` | feat(account): account page with profile management + sign-in banner |

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `apps/web/components/account/AccountPage.tsx` | Created | Profile management UI — "use client" |
| `apps/web/actions/createProfile.ts` | Created | POST /profiles server action |
| `apps/web/actions/deleteProfile.ts` | Created | DELETE /profiles/:id server action |
| `apps/web/app/[locale]/(main)/account/page.tsx` | Created | Server component — fetches profiles, renders AccountPage |
| `apps/web/components/player/WatchPageClient.tsx` | Modified | Added `isGuest` prop + sign-in banner |
| `apps/web/app/[locale]/(main)/watch/[id]/page.tsx` | Modified | Reads `auth()`, passes `isGuest={!session?.user}` |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Props-down data flow (not useSession) | Server component owns data fetch; client island is pure UI | Enables SSR with no client auth waterfall |
| Dev placeholder in server component (not client) | Keeps AccountPage stateless about environment | Cleaner separation; easier to remove when backend is live |
| `isGuest` default false | Authenticated users shouldn't see the banner; opt-in for guests | No regression on existing watch page |

## Deviations from Plan

None — plan executed exactly as specified. Task 7 (verify account route) was pre-existing; confirmed and skipped.

## Issues Encountered

None.

## Next Phase Readiness

**Ready:**
- Profile CRUD actions exist and degrade gracefully without a backend
- Account page route live at `/en/account`
- Auth session read pattern established in watch page (reusable for Phase 6)

**Concerns:**
- Profile PIN management (05-02 scope) will need a modal or dedicated route decision

**Blockers:**
- None

---
*Phase: 05-auth-profiles, Plan: 01*
*Completed: 2026-03-31*
