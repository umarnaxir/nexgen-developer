"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  X,
  BookOpen,
  Home,
  ChevronLeft,
  ChevronRight,
  ScrollText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getRoleDisplayName, getRoleBadgeColor } from "@/types/auth";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: BookOpen,
  },
  {
    name: "Pages",
    href: "/admin/pages",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    name: "Audit Logs",
    href: "/admin/logs",
    icon: ScrollText,
  },
];

export default function AdminSidebar({ isOpen, onClose, onLogout, collapsed = false, onToggleCollapse }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - full width on mobile when open, collapsed/expanded on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          collapsed ? "lg:w-20 w-64" : "w-64"
        } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo, Collapse Arrow & Close Button */}
          <div className={`flex items-center h-16 border-b border-gray-200 ${collapsed ? "lg:flex-col lg:justify-center lg:gap-1 lg:px-0 justify-between px-6" : "justify-between px-6"}`}>
            <div className={`flex items-center ${collapsed ? "lg:flex-col lg:gap-1" : "gap-2 flex-1 min-w-0"}`}>
              <Link href="/admin" className="flex items-center gap-2 shrink-0">
                <span className={`font-bold text-lg text-black ${collapsed ? "lg:hidden" : ""}`}>
                  NexGen Admin
                </span>
              </Link>
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-black"
                  title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {collapsed ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <ChevronLeft className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className={`border-b border-gray-200 ${collapsed ? "px-0 py-4 flex justify-center" : "px-6 py-4"}`}>
              <div className={`flex items-center ${collapsed ? "flex-col gap-1" : "gap-3"}`}>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{user.name}</p>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {getRoleDisplayName(user.role)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className={`flex-1 py-4 space-y-1 overflow-y-auto ${collapsed ? "px-2" : "px-4"}`}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  title={collapsed ? item.name : undefined}
                  className={`flex items-center rounded-lg transition-colors ${
                    collapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
                  } ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className={`border-t border-gray-200 space-y-2 ${collapsed ? "p-2" : "p-4"}`}>
            <Link
              href="/"
              className={`flex items-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${
                collapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
              }`}
              title={collapsed ? "Back to Site" : undefined}
            >
              <Home className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium">Back to Site</span>}
            </Link>
            <button
              onClick={onLogout}
              className={`w-full flex items-center rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
                collapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
              }`}
              title={collapsed ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
