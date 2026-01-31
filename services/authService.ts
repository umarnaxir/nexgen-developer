"use client";

import { User, UserRole, LoginCredentials, canAccessAdmin } from "@/types/auth";
import { canAccessAdminPanel, canCreateRole, canAssignRole, canDeleteUser } from "@/lib/rbac";
import { addAuditLog } from "@/services/auditLogService";

// Storage keys
const AUTH_STORAGE_KEY = "nexgen_auth";
const USERS_STORAGE_KEY = "nexgen_users";
export const ADMIN_ROLE_COOKIE = "nexgen_role";
const COOKIE_MAX_AGE_DAYS = 7;

function setRoleCookie(role: UserRole): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ADMIN_ROLE_COOKIE}=${role}; path=/; max-age=${60 * 60 * 24 * COOKIE_MAX_AGE_DAYS}; SameSite=Lax`;
}

export function clearRoleCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ADMIN_ROLE_COOKIE}=; path=/; max-age=0`;
}

/** Sync role cookie from current auth state (call after restoring auth from localStorage). */
export function syncRoleCookie(): void {
  const { user } = getAuthState();
  if (user && canAccessAdminPanel(user.role)) {
    setRoleCookie(user.role);
  } else {
    clearRoleCookie();
  }
}

// Default admin user (for initial setup)
const DEFAULT_ADMIN: User = {
  id: "1",
  username: "umar",
  email: "umar@nexgen.dev",
  role: UserRole.SUPER_ADMIN,
  name: "Umar Nazir",
  avatar: "/images/team/umar-nazir.jpeg",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
};

// Additional default users (for deploy / demo)
const DEFAULT_TEAM_USER: User = {
  id: "2",
  username: "admin",
  email: "admin@nexgen.dev",
  role: UserRole.ADMIN,
  name: "NexGen Admin",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
};
const DEFAULT_WASEEM_USER: User = {
  id: "3",
  username: "waseem",
  email: "waseem@nexgen.dev",
  role: UserRole.ADMIN,
  name: "Waseem Tariq",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
};
const DEFAULT_TEST_USER: User = {
  id: "4",
  username: "test",
  email: "test@gmail.com",
  role: UserRole.EMPLOYEE,
  name: "test",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
};

const DEFAULT_USERS: User[] = [
  DEFAULT_ADMIN,
  DEFAULT_TEAM_USER,
  DEFAULT_WASEEM_USER,
  DEFAULT_TEST_USER,
];

// Default credentials (for demo / deploy; login with username)
const DEFAULT_CREDENTIALS: Record<string, string> = {
  umar: "2356",
  admin: "admin@21",
  waseem: "waseem123",
  test: "test",
};

// Ensure default credentials exist in localStorage (so deploy / returning visitors can login with waseem, test, admin)
function ensureDefaultCredentials(): void {
  if (typeof window === "undefined") return;
  const credentialsJson = localStorage.getItem("nexgen_credentials");
  let credentials: Record<string, string> = {};
  if (credentialsJson) {
    try {
      credentials = JSON.parse(credentialsJson);
    } catch {
      /* use empty */
    }
  }
  let changed = false;
  for (const [username, password] of Object.entries(DEFAULT_CREDENTIALS)) {
    if (!(username.toLowerCase() in credentials) || credentials[username.toLowerCase()] !== password) {
      credentials[username.toLowerCase()] = password;
      changed = true;
    }
  }
  if (changed || !credentialsJson) {
    localStorage.setItem("nexgen_credentials", JSON.stringify(credentials));
  }
}

// Initialize default users in localStorage
export function initializeUsers(): void {
  if (typeof window === "undefined") return;
  
  const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existingUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  } else {
    // Migrate default admin avatar and ensure default users (admin, waseem, test) exist
    try {
      const users: User[] = JSON.parse(existingUsers);
      const usernames = new Set(users.map((u) => u.username.toLowerCase()));
      let changed = false;
      const adminUser = users.find((u) => u.username === "umar");
      if (adminUser && adminUser.avatar !== "/images/team/umar-nazir.jpeg") {
        adminUser.avatar = "/images/team/umar-nazir.jpeg";
        changed = true;
      }
      for (const defaultUser of DEFAULT_USERS) {
        if (!usernames.has(defaultUser.username.toLowerCase())) {
          users.push(defaultUser);
          usernames.add(defaultUser.username.toLowerCase());
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }
    } catch {
      // Ignore parse errors
    }
  }
  // Always ensure default logins (umar, admin, waseem, test) exist so they work after deploy
  ensureDefaultCredentials();
}

// Get all users from localStorage (excludes soft-deleted)
export function getUsers(includeDeleted = false): User[] {
  if (typeof window === "undefined") return [];
  
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  if (!usersJson) {
    initializeUsers();
    return DEFAULT_USERS;
  }
  
  try {
    const users: User[] = JSON.parse(usersJson);
    if (includeDeleted) return users;
    return users.filter((u) => !u.deletedAt);
  } catch {
    return DEFAULT_USERS;
  }
}

// Save users to localStorage
export function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Get user by ID
export function getUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.id === id);
}

// Get user by username
export function getUserByUsername(username: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.username.toLowerCase() === username.toLowerCase());
}

/** Thrown when RBAC check fails in createUser, updateUser, or deleteUser. */
export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermissionError";
  }
}

// Create new user (optionally enforced by actor's role)
export function createUser(
  userData: Omit<User, "id" | "createdAt" | "updatedAt">,
  password: string,
  actor?: User
): User {
  if (actor && !canCreateRole(actor.role, userData.role)) {
    throw new PermissionError("You cannot create users with the selected role.");
  }

  const users = getUsers(true);
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);

  const credentials = getCredentials();
  credentials[newUser.username.toLowerCase()] = password;
  saveCredentials(credentials);

  if (actor && typeof addAuditLog === "function") {
    addAuditLog({
      action: "user.create",
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      targetType: "user",
      targetId: newUser.id,
      targetLabel: newUser.name,
      details: { role: newUser.role, username: newUser.username },
    });
  }

  return newUser;
}

// Update user (role change enforced by actor)
export function updateUser(id: string, updates: Partial<User>, actor?: User): User | null {
  const users = getUsers(true);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;

  if (updates.role !== undefined && actor && !canAssignRole(actor.role, updates.role)) {
    throw new PermissionError("You cannot assign the selected role.");
  }

  const previous = users[index];
  const roleChanged = updates.role !== undefined && updates.role !== previous.role;

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveUsers(users);

  if (actor && typeof addAuditLog === "function") {
    addAuditLog({
      action: roleChanged ? "user.role_change" : "user.update",
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      targetType: "user",
      targetId: previous.id,
      targetLabel: previous.name,
      details: roleChanged ? { previousRole: previous.role, newRole: updates.role } : updates,
    });
  }

  return users[index];
}

// Delete user (soft-delete by default; actor enforces RBAC)
export function deleteUser(id: string, actor?: User, soft = true): boolean {
  const users = getUsers(true);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;

  const user = users[index];
  if (actor && !canDeleteUser(actor.role, user.role)) {
    throw new PermissionError("You cannot delete this user.");
  }
  if (user.role === UserRole.SUPER_ADMIN) {
    const superAdminCount = users.filter((u) => u.role === UserRole.SUPER_ADMIN && !u.deletedAt).length;
    if (superAdminCount <= 1) return false;
  }

  if (soft) {
    users[index] = {
      ...users[index],
      deletedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } else {
    users.splice(index, 1);
  }
  saveUsers(users);

  if (actor && typeof addAuditLog === "function") {
    addAuditLog({
      action: "user.delete",
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      targetType: "user",
      targetId: user.id,
      targetLabel: user.name,
      details: { role: user.role, soft },
    });
  }

  return true;
}

// Restore soft-deleted user (Super Admin only; optional)
export function restoreUser(id: string, actor?: User): User | null {
  const users = getUsers(true);
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  const user = users[index];
  if (!user.deletedAt) return user;
  if (actor && actor.role !== UserRole.SUPER_ADMIN) {
    throw new PermissionError("Only Super Admin can restore deleted users.");
  }
  const { deletedAt, ...rest } = users[index];
  users[index] = { ...rest, updatedAt: new Date().toISOString() };
  saveUsers(users);
  if (actor && typeof addAuditLog === "function") {
    addAuditLog({
      action: "user.restore",
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      targetType: "user",
      targetId: user.id,
      targetLabel: user.name,
    });
  }
  return users[index];
}

// Get credentials from localStorage
function getCredentials(): Record<string, string> {
  if (typeof window === "undefined") return DEFAULT_CREDENTIALS;
  
  const credentialsJson = localStorage.getItem("nexgen_credentials");
  if (!credentialsJson) {
    localStorage.setItem("nexgen_credentials", JSON.stringify(DEFAULT_CREDENTIALS));
    return DEFAULT_CREDENTIALS;
  }
  
  try {
    return JSON.parse(credentialsJson);
  } catch {
    return DEFAULT_CREDENTIALS;
  }
}

// Save credentials to localStorage
function saveCredentials(credentials: Record<string, string>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("nexgen_credentials", JSON.stringify(credentials));
}

// Authenticate user
export function authenticate(credentials: LoginCredentials): { success: boolean; user?: User; error?: string } {
  const { username, password } = credentials;
  
  // Get stored credentials
  const storedCredentials = getCredentials();
  const storedPassword = storedCredentials[username.toLowerCase()];
  
  // Check if credentials match
  if (!storedPassword || storedPassword !== password) {
    return { success: false, error: "Invalid username or password" };
  }
  
  // Get user data
  const user = getUserByUsername(username);
  if (!user) {
    return { success: false, error: "User not found" };
  }
  
  if (!user.isActive) {
    return { success: false, error: "Account is deactivated" };
  }
  
  return { success: true, user };
}

// Login user and store in localStorage
export function login(credentials: LoginCredentials): { success: boolean; user?: User; error?: string } {
  const result = authenticate(credentials);
  
  if (result.success && result.user) {
    const authData = {
      user: result.user,
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    if (canAccessAdminPanel(result.user.role)) {
      setRoleCookie(result.user.role);
    } else {
      clearRoleCookie();
    }
  }
  
  return result;
}

// Logout user
export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  clearRoleCookie();
}

// Get current auth state from localStorage (syncs user data from users list)
export function getAuthState(): { user: User | null; isAuthenticated: boolean } {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false };
  }
  
  const authJson = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authJson) {
    return { user: null, isAuthenticated: false };
  }
  
  try {
    const authData = JSON.parse(authJson);
    let user = authData.user || null;
    
    // Sync user data from users list (e.g. updated avatar me.JPG for Umar Nazir)
    if (user) {
      const latestUser = getUserById(user.id);
      if (latestUser) {
        user = { ...user, ...latestUser };
      }
    }
    
    return {
      user,
      isAuthenticated: authData.isAuthenticated || false,
    };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  const { isAuthenticated } = getAuthState();
  return isAuthenticated;
}

// Check if current user can access admin
export function canCurrentUserAccessAdmin(): boolean {
  const { user, isAuthenticated } = getAuthState();
  if (!isAuthenticated || !user) return false;
  return canAccessAdmin(user.role);
}

// Update user password
export function updatePassword(username: string, newPassword: string): boolean {
  const credentials = getCredentials();
  const usernameLower = username.toLowerCase();
  
  if (!(usernameLower in credentials)) return false;
  
  credentials[usernameLower] = newPassword;
  saveCredentials(credentials);
  return true;
}

/** Get stored password for a user. Only Super Admin can retrieve passwords. */
export function getPasswordForUser(username: string, actor?: User): string | null {
  if (actor && actor.role !== UserRole.SUPER_ADMIN) return null;
  const credentials = getCredentials();
  const stored = credentials[username.toLowerCase()];
  return stored ?? null;
}
