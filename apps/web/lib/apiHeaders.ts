import "server-only";
import { auth } from "./auth";
import { guestHeaders } from "./guestSession";
import { env } from "./env.server";

/**
 * Returns Authorization + x-api-key headers for the current request:
 * - Authenticated users: Bearer <accessToken>
 * - Unauthenticated (guest): Bearer <guestToken> (Basic Auth happens server-side)
 *
 * Use in Server Components, Server Actions, and Route Handlers.
 */
export async function apiAuthHeaders(): Promise<Record<string, string>> {
  const session = await auth();

  if (session?.user.accessToken) {
    return {
      Authorization: `Bearer ${session.user.accessToken}`,
      "x-api-key": env.API_KEY,
    };
  }

  return guestHeaders();
}
