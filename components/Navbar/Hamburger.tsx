"use client";

import React from "react";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  /** When true, the close cross spins once on mount (for close button in mobile nav) */
  spinOnMount?: boolean;
}

export default function Hamburger({ isOpen, onClick, spinOnMount = false }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-md shrink-0 hover:scale-110 active:scale-95 transition-transform duration-200"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div
        className={`relative w-6 h-5 flex flex-col justify-between ${
          spinOnMount ? "animate-spin-once" : ""
        }`}
      >
        {/* Hamburger bars / Cross - use absolute positioning when open for perfect X alignment */}
        <span
          className={`absolute left-0 h-[2.5px] bg-black rounded-full transition-all duration-300 ease-in-out origin-center ${
            isOpen
              ? "w-6 top-1/2 -translate-y-1/2 rotate-45"
              : "w-6 top-0 rotate-0"
          }`}
        />
        <span
          className={`absolute left-0 h-[2.5px] bg-black rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0 scale-0" : "w-5 top-1/2 -translate-y-1/2 opacity-100 scale-100"
          }`}
        />
        <span
          className={`absolute left-0 h-[2.5px] bg-black rounded-full transition-all duration-300 ease-in-out origin-center ${
            isOpen
              ? "w-6 top-1/2 -translate-y-1/2 -rotate-45"
              : "w-6 bottom-0 rotate-0"
          }`}
        />
      </div>
    </button>
  );
}
