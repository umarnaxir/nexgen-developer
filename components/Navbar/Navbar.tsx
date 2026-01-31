"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Hamburger from "./Hamburger";
import LoginModal from "@/components/modals/LoginModal";
import SignupModal from "@/components/modals/SignupModal";
import LogoutModal from "@/components/modals/LogoutModal";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAdmin } from "@/types/auth";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/blogs", label: "Blogs" },
];

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for openLoginModal event from AuthGuard
  useEffect(() => {
    const handleOpenLoginModal = () => {
      setIsLoginModalOpen(true);
    };

    window.addEventListener("openLoginModal", handleOpenLoginModal);
    return () => window.removeEventListener("openLoginModal", handleOpenLoginModal);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] bg-white transition-all duration-300 lg:sticky lg:z-50 ${
        isScrolled 
          ? "lg:bg-white lg:shadow-sm lg:border-b lg:border-gray-100" 
          : "lg:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <NavLogo />

          {/* Desktop Navigation Links - Right Side */}
          <div className="hidden lg:flex items-center ml-auto gap-6">
            <DesktopNav links={navLinks} />
            
            {/* Auth Section */}
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              ) : isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
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
                    <span className="text-sm font-medium text-gray-900 max-w-[100px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {canAccessAdmin(user.role) && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsLogoutModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-sm uppercase font-extrabold tracking-wide text-gray-900 px-4 py-2 border-[1.5px] border-black rounded-md hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsSignupModalOpen(true)}
                    className="px-6 py-2.5 bg-gray-900 text-white text-sm uppercase font-extrabold rounded-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger - aligned with logo row */}
          <div className="lg:hidden flex items-center justify-center shrink-0 w-10 h-10">
            <Hamburger isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full screen overlay */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        links={navLinks} 
        onLinkClick={closeMobileMenu}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignupClick={() => setIsSignupModalOpen(true)}
        onClose={closeMobileMenu}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogoutClick={() => setIsLogoutModalOpen(true)}
      />

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setTimeout(() => setIsSignupModalOpen(true), 100);
        }}
      />
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setTimeout(() => setIsLoginModalOpen(true), 100);
        }}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        userName={user?.name}
      />
    </header>
  );
}

