"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { User, UserRole, Permission, LoginCredentials, hasPermission, canAccessAdmin } from "@/types/auth";
import { 
  login as authLogin, 
  logout as authLogout, 
  getAuthState, 
  initializeUsers,
  syncRoleCookie
} from "@/services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  canAccessAdmin: () => boolean;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage and sync role cookie for middleware
  const refreshAuth = useCallback(() => {
    if (typeof window === "undefined") return;
    
    initializeUsers();
    const { user: storedUser, isAuthenticated: storedAuth } = getAuthState();
    setUser(storedUser);
    setIsAuthenticated(storedAuth);
    syncRoleCookie();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const result = authLogin(credentials);
    
    if (result.success && result.user) {
      setUser(result.user);
      setIsAuthenticated(true);
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  // Logout function
  const logout = () => {
    authLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check if user has a specific permission
  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  // Check if user can access admin panel
  const checkCanAccessAdmin = (): boolean => {
    if (!user) return false;
    return canAccessAdmin(user.role);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasPermission: checkPermission,
    canAccessAdmin: checkCanAccessAdmin,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredPermission?: Permission
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, hasPermission: checkPerm, canAccessAdmin } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null; // AuthGuard will handle redirect
    }

    if (requiredPermission && !checkPerm(requiredPermission)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
