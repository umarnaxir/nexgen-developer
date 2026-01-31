"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";
import { Settings, LogOut, User as UserIcon } from "lucide-react";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";
import Hamburger from "./Hamburger";
import { User, canAccessAdmin } from "@/types/auth";
import type { NavLinkItem } from "./Navbar";

interface MobileNavProps {
  isOpen: boolean;
  links: NavLinkItem[];
  onLinkClick: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onClose: () => void;
  isAuthenticated?: boolean;
  user?: User | null;
  onLogoutClick?: () => void;
}

export default function MobileNav({ 
  isOpen, 
  links, 
  onLinkClick, 
  onLoginClick, 
  onSignupClick, 
  onClose,
  isAuthenticated,
  user,
  onLogoutClick,
}: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => AOS.refresh(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-[99] min-h-svh bg-white overflow-y-auto animate-mobile-nav-in"
    >
      {/* Top bar with logo and close button */}
      <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 sm:px-6 bg-white shrink-0">
        <div onClick={onClose}>
          <NavLogo />
        </div>
        <Hamburger isOpen={true} onClick={onClose} spinOnMount />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-8 pt-2 space-y-1">
        <NavLinks links={links} isMobile onLinkClick={onLinkClick} />
        
        {/* Mobile Auth Section */}
        <div
          className="pt-4 mt-2 space-y-2"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          {isAuthenticated && user ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Admin Panel Link */}
              {canAccessAdmin(user.role) && (
                <Link
                  href="/admin"
                  onClick={onLinkClick}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 text-sm uppercase font-extrabold tracking-wide text-gray-900 border-[1.5px] border-black rounded-md hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <Settings className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={() => {
                  onLinkClick();
                  onLogoutClick?.();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-600 text-white text-sm uppercase font-extrabold rounded-md hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onLoginClick();
                  onLinkClick();
                }}
                className="block w-full py-3 px-4 text-sm uppercase font-extrabold tracking-wide text-gray-900 border-[1.5px] border-black rounded-md hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
              >
                Login
              </button>
              <button
                onClick={() => {
                  onSignupClick();
                  onLinkClick();
                }}
                className="block w-full py-3 px-4 bg-gray-900 text-white text-sm uppercase font-extrabold rounded-md hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-center"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
