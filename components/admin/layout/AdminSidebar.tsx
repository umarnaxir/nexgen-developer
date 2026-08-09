"use client";

import Link from "next/link";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminRole } from "@/lib/content/types";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: AdminRole[];
};

const NAV: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
  { href: "/admin/contact", label: "Contact", icon: Phone },
  { href: "/admin/footer", label: "Footer", icon: Settings2 },
  {
    href: "/admin/users",
    label: "Users",
    icon: UserCog,
    roles: ["super_admin", "admin"],
  },
];

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

  const visibleNav = NAV.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

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
          "fixed inset-y-0 left-0 z-[100] flex flex-col bg-neutral-950 text-white transition-transform duration-300 ease-out",
          // Mobile: full-screen drawer
          "w-full max-w-none",
          // Desktop widths
          "lg:w-64 lg:translate-x-0",
          collapsed && "lg:w-[4.5rem]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-4 sm:px-5">
          <div className={cn("min-w-0", collapsed && "lg:hidden")}>
            <p className="truncate text-sm font-semibold tracking-tight text-white">
              NexGen Admin
            </p>
            <p className="truncate text-xs text-white/45">
              {userName || "Administrator"}
            </p>
          </div>

          {/* Desktop collapse — same chevron style */}
          <button
            type="button"
            onClick={() => onCollapsedChange(!collapsed)}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white lg:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
            ) : (
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
            )}
          </button>

          {/* Mobile close — same ChevronLeft as collapse */}
          <button
            type="button"
            onClick={() => onMobileOpenChange(false)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white transition hover:bg-white/10 active:scale-95 lg:hidden"
            aria-label="Close menu"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4 sm:px-4">
          {visibleNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onMobileOpenChange(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-3.5 text-[15px] transition sm:py-2.5 sm:text-sm",
                  active
                    ? "bg-teal-500/15 text-teal-300 shadow-[inset_0_0_0_1px_rgba(45,212,191,0.2)]"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
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

        <div className="border-t border-white/10 p-3 sm:p-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-3.5 text-[15px] text-teal-300/90 transition hover:bg-teal-500/10 hover:text-teal-200 sm:py-2.5 sm:text-sm",
              collapsed && "lg:justify-center lg:px-2"
            )}
            title="Visit site"
          >
            <ExternalLink className="h-5 w-5 shrink-0 sm:h-4 sm:w-4" />
            <span className={cn(collapsed && "lg:hidden")}>Visit site</span>
          </a>
        </div>
      </aside>
    </>
  );
}
