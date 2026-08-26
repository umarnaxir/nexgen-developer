"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LayoutDashboard,
  Layers,
  Phone,
  Settings2,
  Users,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminRole } from "@/lib/content/types";
import { adminConfig, brand, getAdminNav, logos } from "@/lib/theme";
import { adminUi } from "@/lib/admin/ui";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  Briefcase,
  Layers,
  Users,
  BookOpen,
  Phone,
  Settings2,
  UserCog,
};

type AdminSidebarProps = {
  userName?: string;
  userRole?: AdminRole;
  collapsed: boolean;
  onCollapsedChange: (value: boolean) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (value: boolean) => void;
};

export default function AdminSidebar({
  userName,
  userRole = "editor",
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileOpenChange,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const visibleNav = getAdminNav(userRole);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[2px] lg:hidden"
          aria-label="Close overlay"
          onClick={() => onMobileOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          adminUi.sidebar.root,
          "w-full max-w-none",
          "lg:w-64 lg:translate-x-0",
          collapsed && "lg:w-[4.5rem]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-2 border-b px-4 py-4 sm:px-5",
            adminUi.sidebar.border
          )}
        >
          <div className={cn("flex min-w-0 items-center gap-2.5", collapsed && "lg:hidden")}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gold/30 bg-gold/10">
              <Image
                src={logos.mark}
                alt={brand.name}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </span>
            <div className="min-w-0">
              <p className={adminUi.sidebar.brandTitle}>{brand.adminTitle}</p>
              <p className={adminUi.sidebar.brandSub}>
                {userName || "Administrator"}
              </p>
            </div>
          </div>

          {collapsed && (
            <span className="mx-auto hidden h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-gold/30 bg-gold/10 lg:inline-flex">
              <Image
                src={logos.mark}
                alt={brand.name}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </span>
          )}

          <button
            type="button"
            onClick={() => onCollapsedChange(!collapsed)}
            className={adminUi.sidebar.iconBtn}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
            ) : (
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
            )}
          </button>

          <button
            type="button"
            onClick={() => onMobileOpenChange(false)}
            className={adminUi.sidebar.iconBtnMobile}
            aria-label="Close menu"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4 sm:px-4">
          {visibleNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = ICONS[item.icon] ?? LayoutDashboard;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onMobileOpenChange(false)}
                className={cn(
                  adminUi.sidebar.navItem,
                  active ? adminUi.sidebar.navActive : adminUi.sidebar.navIdle,
                  collapsed && "lg:justify-center lg:px-2"
                )}
                title={item.label}
              >
                <Icon className="h-5 w-5 shrink-0 sm:h-4 sm:w-4" />
                <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={cn("border-t p-3 sm:p-2", adminUi.sidebar.border)}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              adminUi.sidebar.visit,
              collapsed && "lg:justify-center lg:px-2"
            )}
            title={adminConfig.visitSiteLabel}
          >
            <ExternalLink className="h-5 w-5 shrink-0 sm:h-4 sm:w-4" />
            <span className={cn(collapsed && "lg:hidden")}>
              {adminConfig.visitSiteLabel}
            </span>
          </a>
        </div>
      </aside>
    </>
  );
}
