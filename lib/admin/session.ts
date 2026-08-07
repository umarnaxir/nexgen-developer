import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import type { AdminRole } from "@/lib/content/types";

export const ADMIN_SESSION_COOKIE = "nexgen_admin_session";
export const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export type AdminSession = {
  id?: string;
  email: string;
  name: string;
  role: AdminRole;
};

export function getSecretKey() {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "nexgen-dev-admin-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(session: AdminSession): Promise<string> {
  return new SignJWT({
    id: session.id || "",
    email: session.email,
    name: session.name,
    role: session.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey());
}

function normalizeRole(role: unknown): AdminRole {
  if (role === "admin" || role === "editor" || role === "super_admin") {
    return role;
  }
  return "editor";
}

export async function verifySessionToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (!payload.email || typeof payload.email !== "string") return null;
    return {
      id: typeof payload.id === "string" ? payload.id : undefined,
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : "Admin",
      role: normalizeRole(payload.role),
    };
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(
  request: NextRequest
): Promise<AdminSession | null> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
