import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// ─── Protected route prefixes ─────────────────────────────────────────────────
const PROTECTED = ["/account", "/watch", "/plans", "/select-profile"];
const AUTH_ONLY = ["/login", "/register", "/forgot-password"]; // redirect if already authed

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && AUTH_ONLY.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Guard protected routes
  if (!isAuthenticated && PROTECTED.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  // Run on all routes except static assets, _next internals, and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
