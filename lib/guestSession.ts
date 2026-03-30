import "server-only";
import { env } from "./env.server";

// ─── Guest session token cache ────────────────────────────────────────────────
// Tokens are cached in-process and refreshed before expiry.
// This module only runs on the server — credentials never reach the client.

interface GuestToken {
  accessToken: string;
  expiresAt: number; // Unix timestamp (ms)
}

interface GuestAuthResponse {
  accessToken: string;
  expiresIn: number; // seconds
}

// In-process singleton cache (per Edge / Node instance)
let cached: GuestToken | null = null;
const REFRESH_MARGIN_MS = 60_000; // refresh 1 min before expiry

async function fetchGuestToken(): Promise<GuestToken> {
  const credentials = Buffer.from(
    `${env.GUEST_BASIC_USER}:${env.GUEST_BASIC_PASS}`
  ).toString("base64");

  const res = await fetch(`${env.API_BASE_URL}/auth/guest`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "x-api-key": env.API_KEY,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Guest auth failed: ${res.status}`);
  }

  const data = (await res.json()) as GuestAuthResponse;

  return {
    accessToken: data.accessToken,
    expiresAt: Date.now() + data.expiresIn * 1000,
  };
}

/**
 * Returns a valid guest access token, refreshing from the API if needed.
 * Call from Server Components, Server Actions, or Route Handlers only.
 */
export async function getGuestToken(): Promise<string> {
  if (cached && cached.expiresAt - REFRESH_MARGIN_MS > Date.now()) {
    return cached.accessToken;
  }

  cached = await fetchGuestToken();
  return cached.accessToken;
}

/**
 * Authorization headers for an unauthenticated (guest) API request.
 */
export async function guestHeaders(): Promise<Record<string, string>> {
  const token = await getGuestToken();
  return {
    Authorization: `Bearer ${token}`,
    "x-api-key": env.API_KEY,
  };
}
