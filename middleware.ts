import { NextRequest, NextResponse } from "next/server";
import {
  getSessionFromRequest,
  ADMIN_SESSION_COOKIE,
} from "@/lib/admin/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLogin =
    pathname === "/admin" ||
    pathname === "/admin/" ||
    pathname.startsWith("/admin/login");

  if (isLogin) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (token) {
      const session = await getSessionFromRequest(request);
      if (session) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  const session = await getSessionFromRequest(request);
  if (!session) {
    const loginUrl = new URL("/admin", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
