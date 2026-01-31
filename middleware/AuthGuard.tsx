"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Permission } from "@/types/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requireAdmin?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export default function AuthGuard({
  children,
  requiredPermission,
  requireAdmin = false,
  redirectTo = "/",
  fallback,
}: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, hasPermission, canAccessAdmin, user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // Not authenticated
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    // Requires admin access but user is not admin
    if (requireAdmin && !canAccessAdmin()) {
      router.replace(redirectTo);
      return;
    }

    // Requires specific permission
    if (requiredPermission && !hasPermission(requiredPermission)) {
      router.replace(redirectTo);
      return;
    }
  }, [isAuthenticated, isLoading, requireAdmin, requiredPermission, canAccessAdmin, hasPermission, router, redirectTo]);

  // Loading state
  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      )
    );
  }

  // Show login prompt if not authenticated
  if (showLoginPrompt && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to access this page.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Go Home
              </button>
              <button
                onClick={() => {
                  // Dispatch custom event to open login modal
                  window.dispatchEvent(new CustomEvent("openLoginModal"));
                }}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 403 Forbidden: user lacks required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">403 Forbidden</h2>
            <p className="text-gray-600 mb-6">
              You do not have permission to access this resource.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 403 Forbidden: admin panel access required (Client or unauthenticated)
  if (requireAdmin && !canAccessAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">403 Forbidden</h2>
            <p className="text-gray-600 mb-6">
              You do not have access to the admin panel.
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
