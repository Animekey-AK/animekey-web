---
phase: 05-auth-profiles
plan: 02
subsystem: auth
tags: [nextauth, server-actions, profiles, pin, sessions]

requires:
  - phase: 05-auth-profiles/05-01
    provides: AccountPage component, createProfile/deleteProfile actions, /account page

provides:
  - setProfilePin and removeProfilePin server actions
  - signOutAllSessions and signOutSession server actions
  - PIN controls per profile card in AccountPage (🔒 button, inline 4-digit form, PIN badge)
  - Active Sessions section in AccountPage (device/location/lastActive + Current badge)

affects: [06-payments]

tech-stack:
  added: []
  patterns:
    - "ActiveSession interface defined inline in page.tsx (one-use type, not exported)"
    - "dev-placeholder guard: id check skips API actions for placeholder profiles"
    - "PIN form uses numeric inputMode + pattern=[0-9]* for mobile-friendly input"

key-files:
  created:
    - apps/web/actions/setProfilePin.ts
    - apps/web/actions/removeProfilePin.ts
    - apps/web/actions/signOutAllSessions.ts
    - apps/web/actions/signOutSession.ts
  modified:
    - apps/web/components/account/AccountPage.tsx
    - apps/web/app/[locale]/(main)/account/page.tsx

key-decisions:
  - "signOutSession added as separate action (not in plan files_modified) — required for individual session sign-out"
  - "dev-placeholder guard on PIN button matches existing delete button pattern"
  - "ActiveSession type defined in page.tsx, not exported — one-use, avoids types/ file bloat"

patterns-established:
  - "PIN form: inline below profile list, not a modal — consistent with add-profile form pattern"
  - "Session list: server-fetched, dev placeholder if empty — same pattern as profiles"

duration: ~25min
started: 2026-04-05T00:00:00Z
completed: 2026-04-05T00:00:00Z
---

# Phase 5 Plan 02: Profile PIN Management + Active Session List Summary

**Per-profile 4-digit PIN set/remove controls and active device session list added to /account, wired to server actions with graceful dev fallback.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | ~25 min |
| Tasks | 3 completed (+ 1 checkpoint approved) |
| Files created | 4 |
| Files modified | 2 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| AC-1: PIN management per profile | Pass | 🔒 button on hover → inline 4-digit form → setProfilePin; PIN badge shown when pinEnabled; Remove PIN calls removeProfilePin |
| AC-2: Device session list | Pass | ACTIVE SESSIONS section: "Chrome on macOS / Cairo, EG · Just now / Current" badge; Sign out of all devices calls signOutAllSessions |
| AC-3: TypeScript clean + visual | Pass | 0 errors; full-page screenshot verified at checkpoint |

## Accomplishments

- Four server actions: `setProfilePin` (POST /profiles/:id/pin), `removeProfilePin` (DELETE), `signOutAllSessions` (DELETE /sessions, best-effort), `signOutSession` (DELETE /sessions/:id)
- PIN button (🔒) appears on profile card hover — "Set PIN" opens inline numeric form; "Remove PIN" calls action immediately
- PIN enabled state reflected optimistically in profiles list (pinEnabled: true/false toggle)
- Active sessions section fetches from API with dev placeholder fallback (Chrome on macOS / Cairo, EG)
- `handleSignOut` now calls `signOutAllSessions()` server action before `signOut()` client call

## Task Commits

| Task | Commit | Description |
|------|--------|-------------|
| Tasks 1–3 | `c3f15ae` | feat(account): profile PIN management + active session list |

## Files Created/Modified

| File | Change | Purpose |
|------|--------|---------|
| `apps/web/actions/setProfilePin.ts` | Created | POST /profiles/:id/pin with 4-digit validation |
| `apps/web/actions/removeProfilePin.ts` | Created | DELETE /profiles/:id/pin |
| `apps/web/actions/signOutAllSessions.ts` | Created | DELETE /sessions (best-effort) |
| `apps/web/actions/signOutSession.ts` | Created | DELETE /sessions/:id (individual sign-out) |
| `apps/web/components/account/AccountPage.tsx` | Modified | PIN controls, sessions section, updated sign-out handler |
| `apps/web/app/[locale]/(main)/account/page.tsx` | Modified | getSessions fetch + dev placeholder, passes sessions prop |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| `signOutSession.ts` added (not in plan) | Individual session sign-out button requires a DELETE /sessions/:id action | Minor scope addition, within plan intent |
| `ActiveSession` type in page.tsx | One-use type, no need to pollute types/ | Stays co-located with its only consumer |
| PIN button hidden for dev-placeholder | Avoids fake API calls in dev; consistent with delete button pattern | No regression in dev mode |

## Deviations from Plan

### Auto-fixed Issues

**1. Scope addition — signOutSession.ts**
- **Found during:** Task 2 implementation
- **Issue:** Plan listed three actions but individual session sign-out requires a fourth
- **Fix:** Created `signOutSession.ts` following same pattern
- **Verification:** TypeScript clean, wired to per-session "Sign out" button

## Issues Encountered

None.

## Next Phase Readiness

**Ready:**
- Phase 5 auth & profiles fully complete — account page, profile CRUD, PIN, sessions
- Server action pattern established and consistent for Phase 6 to follow
- `/account` route production-ready (degrades to dev placeholders without backend)

**Concerns:**
- PIN entry on the select-profile screen (when switching profiles) not yet implemented — that would require updating ProfilePicker + selectProfile action to prompt PIN. Deferred to Phase 7 or a Phase 5 plan 03 if needed.

**Blockers:**
- None

---
*Phase: 05-auth-profiles, Plan: 02*
*Completed: 2026-04-05*
