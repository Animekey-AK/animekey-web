import type { DefaultSession } from "next-auth";

// ─── Extend NextAuth session and JWT types ────────────────────────────────────
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      image: string | null;
      accessToken?: string;
      profileId?: string;
    } & DefaultSession["user"];
    error?: "RefreshTokenError";
  }

  interface User {
    id?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    accessToken?: string;
  }
}
