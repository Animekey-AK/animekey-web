import type { NextAuthConfig } from "next-auth";

// ─── Edge-compatible auth config ─────────────────────────────────────────────
// This file is imported by middleware (Edge runtime) and by auth.ts.
// It must NOT import any Node.js-only modules (db drivers, bcrypt, etc.)
// — only pure config that runs in both environments.
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [],
} satisfies NextAuthConfig;
