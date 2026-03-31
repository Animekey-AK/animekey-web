import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

// ─── Protected route prefixes ─────────────────────────────────────────────────
const PROTECTED = ["/account", "/watch", "/plans", "/select-profile"];
const AUTH_ONLY = ["/login", "/register", "/forgot-password"]; // redirect if already authed
const LOCALE_PREFIX = /^\/(en|ar)(?=\/|$)/;

function getLocalePrefix(pathname: string) {
  const match = pathname.match(LOCALE_PREFIX);
  return match ? `/${match[1]}` : "";
}

function stripLocalePrefix(pathname: string) {
  const normalized = pathname.replace(LOCALE_PREFIX, "");
  return normalized.length > 0 ? normalized : "/";
}

// Use the lightweight Edge-compatible auth proxy — does NOT pull in Node.js
// providers or token refresh logic from lib/auth.ts.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Dev bypass — skip auth guards so the player can be tested locally without a backend
  if (process.env.NODE_ENV === "development") return NextResponse.next();

  const { pathname } = req.nextUrl;
  const localePrefix = getLocalePrefix(pathname);
  const normalizedPath = stripLocalePrefix(pathname);
  const isAuthenticated = !!req.auth;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && AUTH_ONLY.some((p) => normalizedPath.startsWith(p))) {
    const url = req.nextUrl.clone();
    url.pathname = `${localePrefix || ""}/`;
    return NextResponse.redirect(url);
  }

  // Guard protected routes
  if (!isAuthenticated && PROTECTED.some((p) => normalizedPath.startsWith(p))) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = `${localePrefix || ""}/login`;
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  // Run on all routes except static assets, _next internals, and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
