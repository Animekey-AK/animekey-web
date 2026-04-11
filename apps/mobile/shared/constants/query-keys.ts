// Cross-feature React Query keys.
// Feature-specific keys live alongside their api file (e.g. features/home/api/home.api.ts).
// Only keys that are invalidated across feature boundaries belong here.

export const QUERY_KEYS = {
  // Invalidated on auth state change (logout clears all user-scoped caches)
  USER_PROFILE: ["user", "profile"] as const,
  USER_WATCHLIST: ["user", "watchlist"] as const,
  USER_CONTINUE_WATCHING: ["user", "continueWatching"] as const,
} as const;
