import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROLE_COOKIE = "nexgen_role";
const ROLES_WITH_ADMIN_ACCESS = ["super_admin", "admin", "employee"];

/**
 * Protects /admin routes: only Super Admin, Admin, and Employee may access.
 * Client role or missing auth → 403 Forbidden.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const role = request.cookies.get(ADMIN_ROLE_COOKIE)?.value;

  if (!role || !ROLES_WITH_ADMIN_ACCESS.includes(role)) {
    const html = `<!DOCTYPE html><html><head><title>403 Forbidden</title></head><body style="font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f9fafb;"><div style="text-align:center;"><h1 style="font-size:2rem;color:#111;">403 Forbidden</h1><p style="color:#6b7280;">You do not have access to the admin panel.</p><a href="/" style="color:#111;text-decoration:underline;">Return home</a></div></body></html>`;
    return new NextResponse(html, {
      status: 403,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
