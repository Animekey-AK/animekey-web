/**
 * Safe wrapper around useDevMode that satisfies React's rules of hooks.
 * Always called unconditionally; the __DEV__ branch is dead-code-eliminated
 * by Metro in production builds.
 */
export function useDevModeValue() {
  if (__DEV__) {
    return require("@/core/dev/DevModeContext").useDevMode() as {
      mockApi: boolean;
      toggleMockApi: () => void;
    };
  }
  return { mockApi: false, toggleMockApi: () => {} };
}
