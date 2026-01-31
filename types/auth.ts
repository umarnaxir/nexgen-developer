// User roles enum
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  EMPLOYEE = "employee",
  CLIENT = "client",
}

// Role hierarchy (higher number = more permissions)
export const RoleHierarchy: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 4,
  [UserRole.ADMIN]: 3,
  [UserRole.EMPLOYEE]: 2,
  [UserRole.CLIENT]: 1,
};

// User interface (deletedAt used for soft-delete)
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  deletedAt?: string;
}

// Auth state interface
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Login credentials
export interface LoginCredentials {
  username: string;
  password: string;
}

// Permission types for RBAC (aligned with lib/rbac.ts)
export type Permission =
  | "view_dashboard"
  | "view_users"
  | "view_blogs"
  | "view_pages"
  | "view_settings"
  | "view_analytics"
  | "manage_users"
  | "manage_blogs"
  | "manage_pages"
  | "manage_settings"
  | "delete_users"
  | "delete_blogs"
  | "assign_roles";

// Role permissions mapping - Employee is read-only; Admin cannot create/assign/delete Super Admin (enforced in lib/rbac + authService)
export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    "view_dashboard",
    "view_users",
    "view_blogs",
    "view_pages",
    "view_settings",
    "view_analytics",
    "manage_users",
    "manage_blogs",
    "manage_pages",
    "manage_settings",
    "delete_users",
    "delete_blogs",
    "assign_roles",
  ],
  [UserRole.ADMIN]: [
    "view_dashboard",
    "view_users",
    "view_blogs",
    "view_pages",
    "view_settings",
    "view_analytics",
    "manage_users",
    "manage_blogs",
    "manage_pages",
    "manage_settings",
    "assign_roles",
    // No delete_users or delete_blogs — only Super Admin can delete
  ],
  [UserRole.EMPLOYEE]: [
    "view_dashboard",
    "view_users",
    "view_blogs",
    "view_pages",
    "view_settings",
    "view_analytics",
  ],
  [UserRole.CLIENT]: [],
};

// Check if a role has a specific permission
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return RolePermissions[role]?.includes(permission) ?? false;
}

// Check if a role can access admin panel (Super Admin, Admin, Employee = yes; Client = no)
export function canAccessAdmin(role: UserRole): boolean {
  return role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN || role === UserRole.EMPLOYEE;
}

// Get role display name
export function getRoleDisplayName(role: UserRole): string {
  const displayNames: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: "Super Admin",
    [UserRole.ADMIN]: "Admin",
    [UserRole.EMPLOYEE]: "Employee",
    [UserRole.CLIENT]: "Client",
  };
  return displayNames[role] || role;
}

// Get role badge color
export function getRoleBadgeColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: "bg-purple-100 text-purple-800",
    [UserRole.ADMIN]: "bg-blue-100 text-blue-800",
    [UserRole.EMPLOYEE]: "bg-green-100 text-green-800",
    [UserRole.CLIENT]: "bg-gray-100 text-gray-800",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
}
