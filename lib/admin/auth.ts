import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import {
  ADMIN_SESSION_COOKIE,
  verifySessionToken,
  type AdminSession,
} from "./session";
import { getUserByEmail, getUsers, writeContent } from "@/lib/content/store";
import type { AdminUser } from "@/lib/content/types";

export {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  verifySessionToken,
  getSessionFromRequest,
  setSessionCookie,
  clearSessionCookie,
  type AdminSession,
} from "./session";

export {
  canManageUsers,
  canDeleteContent,
  canEditContent,
  canDeleteUser,
  canModifyUser,
  assignableRoles,
  canAssignRole,
} from "./permissions";

export function getBootstrapCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || "umar@gmail.com").toLowerCase(),
    password: process.env.ADMIN_PASSWORD || "1122",
    name: process.env.ADMIN_NAME || "Umar",
  };
}

async function ensureBootstrapUser(): Promise<void> {
  try {
    const users = await getUsers({ includeDisabled: true });
    if (users.length > 0) return;

    const creds = getBootstrapCredentials();
    const now = new Date().toISOString();
    const passwordHash = await bcrypt.hash(creds.password, 10);
    const user: AdminUser = {
      id: randomUUID(),
      name: creds.name,
      email: creds.email,
      passwordHash,
      role: "super_admin",
      enabled: true,
      createdAt: now,
      updatedAt: now,
    };
    await writeContent("users", [user]);
  } catch {
    // users.json may not exist yet during first boot — seed script should create it
  }
}

export async function verifyAdminPassword(
  email: string,
  password: string
): Promise<AdminSession | null> {
  await ensureBootstrapUser();

  const user = await getUserByEmail(email);
  if (user) {
    if (!user.enabled) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  // Fallback to env credentials for first-time access
  const creds = getBootstrapCredentials();
  if (email.trim().toLowerCase() !== creds.email) return null;

  const hash = process.env.ADMIN_PASSWORD_HASH;
  const valid = hash
    ? await bcrypt.compare(password, hash)
    : password === creds.password;
  if (!valid) return null;

  return {
    email: creds.email,
    name: creds.name,
    role: "super_admin",
  };
}

export async function getSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
