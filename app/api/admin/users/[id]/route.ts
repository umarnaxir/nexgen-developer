import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import {
  canAssignRole,
  canDeleteUser,
  canManageUsers,
  canModifyUser,
  getSession,
} from "@/lib/admin/auth";
import { getUsers, writeContent } from "@/lib/content/store";
import type { AdminRole, AdminUser } from "@/lib/content/types";

const ROLES: AdminRole[] = ["super_admin", "admin", "editor"];

type Params = { params: Promise<{ id: string }> };

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

function isSelf(session: { id?: string; email: string }, user: AdminUser) {
  if (session.id && session.id === user.id) return true;
  return session.email.toLowerCase() === user.email.toLowerCase();
}

export async function GET(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canManageUsers(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const users = await getUsers({ includeDisabled: true });
  const user = users.find((u) => u.id === id);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  if (!canModifyUser(session.role, user.role) && user.role === "super_admin") {
    return NextResponse.json(
      { error: "You cannot view or edit a super admin account." },
      { status: 403 }
    );
  }
  return NextResponse.json({ user: sanitizeUser(user) });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canManageUsers(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const users = await getUsers({ includeDisabled: true });
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const current = users[index];

    if (!canModifyUser(session.role, current.role)) {
      return NextResponse.json(
        { error: "You cannot modify a super admin account." },
        { status: 403 }
      );
    }

    const name =
      body.name !== undefined ? String(body.name).trim() : current.name;
    const email =
      body.email !== undefined
        ? String(body.email).trim().toLowerCase()
        : current.email;
    const role = body.role !== undefined ? parseRole(body.role) : current.role;
    const enabled =
      body.enabled !== undefined ? Boolean(body.enabled) : current.enabled;

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!role) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }

    if (!canAssignRole(session.role, role)) {
      return NextResponse.json(
        { error: "You cannot assign this role." },
        { status: 403 }
      );
    }

    if (
      users.some(
        (u) => u.id !== id && u.email.toLowerCase() === email.toLowerCase()
      )
    ) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 400 }
      );
    }

    // Super admin role is permanent for existing super admins
    if (current.role === "super_admin" && role !== "super_admin") {
      return NextResponse.json(
        { error: "A super admin cannot be demoted." },
        { status: 400 }
      );
    }

    if (current.role === "super_admin" && enabled === false) {
      return NextResponse.json(
        { error: "A super admin account cannot be disabled." },
        { status: 400 }
      );
    }

    let passwordHash = current.passwordHash;
    if (body.password !== undefined && String(body.password).length > 0) {
      const password = String(body.password);
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters." },
          { status: 400 }
        );
      }
      passwordHash = await bcrypt.hash(password, 10);
    }

    const updated: AdminUser = {
      ...current,
      name,
      email,
      role,
      enabled,
      passwordHash,
      updatedAt: new Date().toISOString(),
    };

    users[index] = updated;
    await writeContent("users", users);
    revalidatePath("/admin/users");
    return NextResponse.json({ user: sanitizeUser(updated) });
  } catch {
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!canManageUsers(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const users = await getUsers({ includeDisabled: true });
  const user = users.find((u) => u.id === id);

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  if (isSelf(session, user)) {
    return NextResponse.json(
      { error: "You cannot delete your own account." },
      { status: 400 }
    );
  }

  if (!canDeleteUser(session.role, user.role)) {
    return NextResponse.json(
      { error: "Super admin accounts cannot be deleted." },
      { status: 403 }
    );
  }

  const next = users.filter((u) => u.id !== id);
  await writeContent("users", next);
  revalidatePath("/admin/users");
  return NextResponse.json({ message: "User deleted." });
}
