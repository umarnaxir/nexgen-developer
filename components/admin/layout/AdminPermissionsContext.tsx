"use client";

import { createContext, useContext, useMemo } from "react";
import type { AdminRole } from "@/lib/content/types";
import {
  assignableRoles,
  canDeleteContent,
  canDeleteUser,
  canEditContent,
  canManageUsers,
  canModifyUser,
} from "@/lib/admin/permissions";

type AdminPermissionsValue = {
  role: AdminRole;
  canManageUsers: boolean;
  canDeleteContent: boolean;
  canEditContent: boolean;
  canDeleteUser: (targetRole: AdminRole) => boolean;
  canModifyUser: (targetRole: AdminRole) => boolean;
  assignableRoles: AdminRole[];
};

const AdminPermissionsContext = createContext<AdminPermissionsValue | null>(
  null
);

export function AdminPermissionsProvider({
  role,
  children,
}: {
  role: AdminRole;
  children: React.ReactNode;
}) {
  const value = useMemo<AdminPermissionsValue>(
    () => ({
      role,
      canManageUsers: canManageUsers(role),
      canDeleteContent: canDeleteContent(role),
      canEditContent: canEditContent(role),
      canDeleteUser: (targetRole) => canDeleteUser(role, targetRole),
      canModifyUser: (targetRole) => canModifyUser(role, targetRole),
      assignableRoles: assignableRoles(role),
    }),
    [role]
  );

  return (
    <AdminPermissionsContext.Provider value={value}>
      {children}
    </AdminPermissionsContext.Provider>
  );
}

export function useAdminPermissions() {
  const ctx = useContext(AdminPermissionsContext);
  if (!ctx) {
    throw new Error("useAdminPermissions must be used within AdminPermissionsProvider");
  }
  return ctx;
}
