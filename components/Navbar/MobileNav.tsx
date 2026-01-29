"use client";

import React from "react";
import NavLinks from "./NavLinks";

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
}

export default function MobileNav({ isOpen, links, onLinkClick, onLoginClick, onSignupClick }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
    >
      <div className="px-4 pt-2 pb-4 space-y-1">
        <NavLinks links={links} isMobile onLinkClick={onLinkClick} />
        
        {/* Mobile Login/Signup */}
        <div className="pt-4 border-t border-gray-100 mt-2 space-y-2">
          <button
            onClick={() => {
              onLoginClick();
              onLinkClick();
            }}
            className="block w-full py-3 px-4 text-sm uppercase font-extrabold tracking-wide text-gray-900 border-[1.5px] border-black rounded-md hover:bg-gray-50 transition-colors duration-200 text-center"
          >
            Login
          </button>
          <button
            onClick={() => {
              onSignupClick();
              onLinkClick();
            }}
            className="block w-full py-3 px-4 bg-gray-900 text-white text-sm uppercase font-extrabold rounded-md hover:bg-gray-800 transition-colors duration-300 text-center"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
