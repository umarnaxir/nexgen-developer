"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { AdminSearchProvider } from "./AdminSearchContext";
import { AdminPermissionsProvider } from "./AdminPermissionsContext";
import type { AdminRole } from "@/lib/content/types";
import { adminUi } from "@/lib/admin/ui";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
  userRole: AdminRole;
};

export default function AdminShell({
  children,
  userName,
  userEmail,
  userRole,
}: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AdminSearchProvider>
      <AdminPermissionsProvider role={userRole}>
        <div data-admin className={cn(adminUi.shell, "admin-panel")}>
          <AdminSidebar
            userName={userName}
            userRole={userRole}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            mobileOpen={mobileOpen}
            onMobileOpenChange={setMobileOpen}
          />

          <div
            className={cn(
              "min-h-screen min-w-0 transition-[padding] duration-300",
              collapsed ? "lg:pl-[4.5rem]" : "lg:pl-64"
            )}
          >
            <AdminHeader
              userName={userName}
              userEmail={userEmail}
              userRole={userRole}
              mobileNavOpen={mobileOpen}
              onOpenMobileNav={() => setMobileOpen((v) => !v)}
            />
            <main className="px-3 py-5 sm:px-5 sm:py-8 lg:px-8">
              <div className="w-full min-w-0">{children}</div>
            </main>
          </div>
        </div>
      </AdminPermissionsProvider>
    </AdminSearchProvider>
  );
}
