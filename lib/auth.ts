import "server-only";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { z } from "zod";
import "@/types/auth";

// ─── Validation schema for credentials login ─────────────────────────────────
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// ─── Typed API response shapes ────────────────────────────────────────────────
interface AuthResponse {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

function apiHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY ?? "",
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // ─── Providers ─────────────────────────────────────────────────────────────
  providers: [
    // Email / password — delegates to AnimeKey backend API
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        try {
          const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: apiHeaders(),
            body: JSON.stringify(parsed.data),
          });

          if (!res.ok) return null;

          const user = (await res.json()) as AuthResponse;
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            accessToken: user.accessToken,
          };
        } catch {
          return null;
        }
      },
    }),

    // Google OAuth
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { access_type: "offline", prompt: "consent" },
      },
    }),

    // Facebook OAuth
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  // ─── Session — JWT strategy, httpOnly cookies ──────────────────────────────
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // re-issue cookie daily
  },

  // ─── Custom pages ──────────────────────────────────────────────────────────
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // ─── Callbacks ─────────────────────────────────────────────────────────────
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign-in — persist user fields into JWT
      if (user) {
        token.id = user.id ?? token.sub ?? "";
        if (user.accessToken) token.accessToken = user.accessToken;
      }

      // OAuth first login
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token ?? undefined;
        token.accessTokenExpiresAt = account.expires_at ?? undefined;
      }

      // Access token still valid
      const expiresAt = token.accessTokenExpiresAt;
      if (typeof expiresAt === "number" && Date.now() < expiresAt * 1000) {
        return token;
      }

      // Refresh expired access token
      if (token.refreshToken) {
        try {
          const res = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: apiHeaders(),
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          });

          if (!res.ok) throw new Error("Refresh failed");

          const refreshed = (await res.json()) as RefreshResponse;

          return {
            ...token,
            accessToken: refreshed.accessToken,
            refreshToken: refreshed.refreshToken ?? token.refreshToken,
            accessTokenExpiresAt:
              Math.floor(Date.now() / 1000) + refreshed.expiresIn,
            error: undefined,
          };
        } catch {
          return { ...token, error: "RefreshTokenError" as const };
        }
      }

      return token;
    },

    async session({ session, token }) {
      const t = token as {
        id?: string;
        sub?: string;
        accessToken?: string;
        error?: "RefreshTokenError";
      };
      session.user.id = t.id ?? t.sub ?? "";
      if (t.accessToken) session.user.accessToken = t.accessToken;
      if (t.error) session.error = t.error;
      return session;
    },
  },
});
