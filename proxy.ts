// Next.js 16 "Proxy" (formerly Middleware). Optimistic check ONLY — the real
// authorization gate is verifySession() in lib/auth/dal.ts, called inside every
// protected page, Server Action, and admin Route Handler.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get(SESSION_COOKIE_NAME)?.value);

  // Admin API: block unauthenticated requests with JSON 401.
  if (pathname.startsWith("/api/admin")) {
    if (!hasSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const isLogin = pathname === "/admin/login";

  // Unauthenticated → bounce to login (except the login page itself).
  if (!hasSession && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
  // Already authenticated → skip the login page.
  if (hasSession && isLogin) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
