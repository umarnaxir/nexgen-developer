"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Hamburger from "./Hamburger";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { getServicesNavItems } from "@/app/services/config";

export interface NavLinkItem {
  href: string;
  label: string;
  children?: { label: string; href: string; children?: { label: string; href: string }[] }[];
}

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", children: getServicesNavItems() },
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact-us", label: "Contact" },
];

export default function Navbar({ isHome = false }: { isHome?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { open: openContactModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const headerClass = isHome
    ? `fixed top-0 left-0 right-0 z-[100] backdrop-blur-md transition-all duration-500 lg:sticky lg:z-50 ${
        isScrolled
          ? "border-b border-white/[0.08] bg-black/75"
          : "border-b border-transparent bg-transparent"
      }`
    : `fixed top-0 left-0 right-0 z-[100] bg-white transition-all duration-300 lg:sticky lg:z-50 ${
        isScrolled
          ? "lg:bg-white lg:shadow-md lg:border-b lg:border-gray-100"
          : "lg:bg-transparent"
      }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Side */}
          <NavLogo light={isHome} />

          {/* Desktop Navigation Links + CTA - Right Side */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <DesktopNav links={navLinks} isHome={isHome} />
            <ThemeToggle />
            <button
              type="button"
              onClick={openContactModal}
              className={
                isHome
                  ? "group inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white py-1.5 pl-6 pr-1.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/40"
                  : "group inline-flex items-center gap-2.5 rounded-full border-2 border-gray-200 bg-white py-1.5 pl-6 pr-1.5 text-sm font-bold text-gray-900 transition-all duration-300 hover:border-black hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-black/20"
              }
            >
              Let&apos;s Talk
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-0.5 ${
                  isHome ? "bg-black" : "bg-black"
                }`}
              >
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger - aligned with logo row */}
          <div className="lg:hidden flex items-center gap-1.5 shrink-0">
            <ThemeToggle className="h-9 w-9" />
            <div className="flex items-center justify-center shrink-0 w-10 h-10">
              <Hamburger isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} light={isHome} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full screen overlay */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        links={navLinks}
        onLinkClick={closeMobileMenu}
        onClose={closeMobileMenu}
        onGetInTouch={() => {
          closeMobileMenu();
          openContactModal();
        }}
      />
    </header>
  );
}
