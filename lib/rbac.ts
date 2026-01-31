/**
 * Centralized Role-Based Access Control (RBAC) configuration.
 * Single source of truth for role hierarchy, permissions, and authorization rules.
 */

import { UserRole } from "@/types/auth";

// ---------------------------------------------------------------------------
// Permission constants (action-based)
// ---------------------------------------------------------------------------

export const Permission = {
  // Admin panel access
  ACCESS_ADMIN: "access_admin",

  // Users
  USERS_VIEW: "users_view",
  USERS_CREATE: "users_create",
  USERS_EDIT: "users_edit",
  USERS_DELETE: "users_delete",
  USERS_CREATE_SUPER_ADMIN: "users_create_super_admin",
  USERS_ASSIGN_SUPER_ADMIN: "users_assign_super_admin",
  USERS_DELETE_SUPER_ADMIN: "users_delete_super_admin",

  // Content
  BLOGS_VIEW: "blogs_view",
  BLOGS_CREATE: "blogs_create",
  BLOGS_EDIT: "blogs_edit",
  BLOGS_DELETE: "blogs_delete",

  PAGES_VIEW: "pages_view",
  PAGES_EDIT: "pages_edit",

  SETTINGS_VIEW: "settings_view",
  SETTINGS_EDIT: "settings_edit",

  // System
  SETTINGS_SYSTEM_VIEW: "settings_system_view",
  SETTINGS_SYSTEM_EDIT: "settings_system_edit",
  LOGS_VIEW: "logs_view",
} as const;

export type PermissionKey = (typeof Permission)[keyof typeof Permission];

// ---------------------------------------------------------------------------
// Role → Permissions mapping (strict hierarchy)
// ---------------------------------------------------------------------------

export const ROLE_PERMISSIONS: Record<UserRole, PermissionKey[]> = {
  [UserRole.SUPER_ADMIN]: [
    Permission.ACCESS_ADMIN,
    Permission.USERS_VIEW,
    Permission.USERS_CREATE,
    Permission.USERS_EDIT,
    Permission.USERS_DELETE,
    Permission.USERS_CREATE_SUPER_ADMIN,
    Permission.USERS_ASSIGN_SUPER_ADMIN,
    Permission.USERS_DELETE_SUPER_ADMIN,
    Permission.BLOGS_VIEW,
    Permission.BLOGS_CREATE,
    Permission.BLOGS_EDIT,
    Permission.BLOGS_DELETE,
    Permission.PAGES_VIEW,
    Permission.PAGES_EDIT,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_EDIT,
    Permission.SETTINGS_SYSTEM_VIEW,
    Permission.SETTINGS_SYSTEM_EDIT,
    Permission.LOGS_VIEW,
  ],
  [UserRole.ADMIN]: [
    Permission.ACCESS_ADMIN,
    Permission.USERS_VIEW,
    Permission.USERS_CREATE,
    Permission.USERS_EDIT,
    // No delete: USERS_DELETE, BLOGS_DELETE — only Super Admin can delete
    Permission.BLOGS_VIEW,
    Permission.BLOGS_CREATE,
    Permission.BLOGS_EDIT,
    Permission.PAGES_VIEW,
    Permission.PAGES_EDIT,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_EDIT,
    Permission.SETTINGS_SYSTEM_VIEW,
    Permission.SETTINGS_SYSTEM_EDIT,
    Permission.LOGS_VIEW,
  ],
  [UserRole.EMPLOYEE]: [
    Permission.ACCESS_ADMIN,
    Permission.USERS_VIEW,
    Permission.BLOGS_VIEW,
    Permission.PAGES_VIEW,
    Permission.SETTINGS_VIEW,
    Permission.SETTINGS_SYSTEM_VIEW,
    Permission.LOGS_VIEW,
    // No create/edit/delete
  ],
  [UserRole.CLIENT]: [
    // No admin access; frontend only
  ],
};

// ---------------------------------------------------------------------------
// Roles that each role is allowed to CREATE
// ---------------------------------------------------------------------------

export const ROLES_CREATABLE_BY: Record<UserRole, UserRole[]> = {
  [UserRole.SUPER_ADMIN]: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.CLIENT],
  [UserRole.ADMIN]: [UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.CLIENT],
  [UserRole.EMPLOYEE]: [],
  [UserRole.CLIENT]: [],
};

// ---------------------------------------------------------------------------
// Roles that each role is allowed to ASSIGN (when editing a user)
// ---------------------------------------------------------------------------

export const ROLES_ASSIGNABLE_BY: Record<UserRole, UserRole[]> = {
  [UserRole.SUPER_ADMIN]: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.CLIENT],
  [UserRole.ADMIN]: [UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.CLIENT],
  [UserRole.EMPLOYEE]: [],
  [UserRole.CLIENT]: [],
};

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function canAccessAdminPanel(role: UserRole): boolean {
  return ROLE_PERMISSIONS[role]?.includes(Permission.ACCESS_ADMIN) ?? false;
}

export function hasPermission(role: UserRole, permission: PermissionKey): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canCreateRole(actorRole: UserRole, targetRole: UserRole): boolean {
  const allowed = ROLES_CREATABLE_BY[actorRole];
  return allowed?.includes(targetRole) ?? false;
}

export function canAssignRole(actorRole: UserRole, newRole: UserRole): boolean {
  const allowed = ROLES_ASSIGNABLE_BY[actorRole];
  return allowed?.includes(newRole) ?? false;
}

export function canDeleteUser(actorRole: UserRole, targetRole: UserRole): boolean {
  if (targetRole === UserRole.SUPER_ADMIN) {
    return hasPermission(actorRole, Permission.USERS_DELETE_SUPER_ADMIN);
  }
  return hasPermission(actorRole, Permission.USERS_DELETE);
}

export function getCreatableRoles(actorRole: UserRole): UserRole[] {
  return ROLES_CREATABLE_BY[actorRole] ?? [];
}

export function getAssignableRoles(actorRole: UserRole): UserRole[] {
  return ROLES_ASSIGNABLE_BY[actorRole] ?? [];
}
