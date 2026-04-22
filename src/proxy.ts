import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = ["/dashboard", "/build"];

// Routes that are only for non-authenticated users (redirect to dashboard if logged in)
const AUTH_ROUTES = ["/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for auth token cookie
  const token = request.cookies.get("auth-token")?.value;

  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  if (isProtected) {
    if (!token) {
      // Redirect unauthenticated users to login with callback
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callback", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify the token is valid (lightweight check — just verify structure + expiry)
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid token structure");

      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
      
      if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
        // Token expired — clear cookie and redirect
        const response = NextResponse.redirect(new URL("/login?reason=expired", request.url));
        response.cookies.delete("auth-token");
        return response;
      }
    } catch {
      // Invalid token — clear cookie and redirect
      const response = NextResponse.redirect(new URL("/login?reason=invalid", request.url));
      response.cookies.delete("auth-token");
      return response;
    }
  }

  if (isAuthRoute && token) {
    // If user is already logged in and visiting /login, redirect to dashboard
    try {
      const parts = token.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
        if (payload.exp && payload.exp > Math.floor(Date.now() / 1000)) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }
    } catch {
      // Invalid token — let them through to login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (handled by their own auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
