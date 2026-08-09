import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import {
  canAssignRole,
  canManageUsers,
  getSession,
} from "@/lib/admin/auth";
import { getUsers, writeContent } from "@/lib/content/store";
import type { AdminRole, AdminUser } from "@/lib/content/types";

const ROLES: AdminRole[] = ["super_admin", "admin", "editor"];

function sanitizeUser(user: AdminUser) {
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
}

function parseRole(value: unknown): AdminRole | null {
  if (typeof value === "string" && ROLES.includes(value as AdminRole)) {
    return value as AdminRole;
  }
  return null;
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canManageUsers(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await getUsers({ includeDisabled: true });
  return NextResponse.json({ users: users.map(sanitizeUser) });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canManageUsers(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = parseRole(body.role) || "editor";
    const enabled = body.enabled !== false;

    if (!canAssignRole(session.role, role)) {
      return NextResponse.json(
        { error: "You cannot assign this role." },
        { status: 403 }
      );
    }

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const users = await getUsers({ includeDisabled: true });
    if (users.some((u) => u.email.toLowerCase() === email)) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const user: AdminUser = {
      id: randomUUID(),
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role,
      enabled,
      createdAt: now,
      updatedAt: now,
    };

    users.push(user);
    await writeContent("users", users);
    revalidatePath("/admin/users");
    return NextResponse.json({ user: sanitizeUser(user) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
}
