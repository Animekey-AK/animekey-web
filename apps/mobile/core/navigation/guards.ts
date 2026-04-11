// Navigation guard logic — used inside _layout.tsx files via <Redirect />.
// Keep pure (no RN imports) so it's easy to unit test.

export function getAuthRedirect(
  isAuthenticated: boolean,
  segment: string
): string | null {
  const isAuthRoute = segment === "(auth)";

  if (!isAuthenticated && !isAuthRoute) return "/(auth)/sign-in";
  if (isAuthenticated && isAuthRoute) return "/(tabs)/home";

  return null;
}
