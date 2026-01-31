"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";
import Hamburger from "./Hamburger";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  isOpen: boolean;
  links: NavLink[];
  onLinkClick: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onClose: () => void;
}

export default function MobileNav({ isOpen, links, onLinkClick, onLoginClick, onSignupClick, onClose }: MobileNavProps) {
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
        
        {/* Mobile Login/Signup */}
        <div
          className="pt-4 mt-2 space-y-2"
          data-aos="fade-up"
          data-aos-duration="600"
        >
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
        </div>
      </div>
    </div>
  );
}
