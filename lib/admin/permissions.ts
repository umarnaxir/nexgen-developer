import type { AdminRole } from "@/lib/content/types";

/** Super admin + admin can manage users (add/edit). */
export function canManageUsers(role: AdminRole) {
  return role === "super_admin" || role === "admin";
}

/** Super admin + admin can delete content. Editors cannot. */
export function canDeleteContent(role: AdminRole) {
  return role === "super_admin" || role === "admin";
}

/** All roles can create/update content, upload, and toggle visibility. */
export function canEditContent(role: AdminRole) {
  return role === "super_admin" || role === "admin" || role === "editor";
}

/** Super admin accounts can never be deleted. */
export function canDeleteUser(actorRole: AdminRole, targetRole: AdminRole) {
  if (targetRole === "super_admin") return false;
  return canManageUsers(actorRole);
}

/** Admins cannot edit/demote/disable super admins. */
export function canModifyUser(actorRole: AdminRole, targetRole: AdminRole) {
  if (!canManageUsers(actorRole)) return false;
  if (targetRole === "super_admin" && actorRole !== "super_admin") return false;
  return true;
}

/** Roles the actor is allowed to assign when creating/updating users. */
export function assignableRoles(actorRole: AdminRole): AdminRole[] {
  if (actorRole === "super_admin") {
    return ["super_admin", "admin", "editor"];
  }
  if (actorRole === "admin") {
    return ["admin", "editor"];
  }
  return [];
}

export function canAssignRole(actorRole: AdminRole, role: AdminRole) {
  return assignableRoles(actorRole).includes(role);
}
