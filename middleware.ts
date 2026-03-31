import { auth } from "@/lib/auth";
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

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const localePrefix = getLocalePrefix(pathname);
  const normalizedPath = stripLocalePrefix(pathname);
  const isAuthenticated = !!req.auth;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && AUTH_ONLY.some((p) => normalizedPath.startsWith(p))) {
    return NextResponse.redirect(new URL(`${localePrefix || ""}/`, req.nextUrl.origin));
  }

  // Guard protected routes
  if (!isAuthenticated && PROTECTED.some((p) => normalizedPath.startsWith(p))) {
    const loginUrl = new URL(
      `${localePrefix || ""}/login`,
      req.nextUrl.origin,
    );
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  // Run on all routes except static assets, _next internals, and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
