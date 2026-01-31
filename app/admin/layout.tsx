"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/middleware/AuthGuard";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import { useAuth } from "@/contexts/AuthContext";
import LogoutModal from "@/components/modals/LogoutModal";

const SIDEBAR_COLLAPSED_KEY = "nexgen_admin_sidebar_collapsed";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  // Load collapsed state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      setSidebarCollapsed(stored === "true");
    }
  }, []);

  const toggleSidebarCollapsed = () => {
    const newValue = !sidebarCollapsed;
    setSidebarCollapsed(newValue);
    if (typeof window !== "undefined") {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(newValue));
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const sidebarWidth = sidebarCollapsed ? "pl-0 lg:pl-20" : "pl-0 lg:pl-64";

  return (
    <AuthGuard requireAdmin={true}>
      <div className="min-h-screen bg-gray-100 admin-panel" data-admin>
        {/* Sidebar */}
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setLogoutModalOpen(true)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapsed}
        />

        {/* Main Content */}
        <div className={`${sidebarWidth} transition-all duration-300`}>
          {/* Header */}
          <AdminHeader 
            onMenuClick={() => setSidebarOpen(true)}
            onLogout={() => setLogoutModalOpen(true)}
            user={user}
          />

          {/* Page Content */}
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>

        {/* Logout Modal */}
        <LogoutModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handleLogout}
          userName={user?.name}
        />
      </div>
    </AuthGuard>
  );
}
