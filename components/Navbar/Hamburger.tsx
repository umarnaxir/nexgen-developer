"use client";

import React from "react";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 p-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-md transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span
        className={`block h-[6px] bg-black rounded-full transition-all duration-300 ease-in-out ${
          isOpen ? "w-6 rotate-45 translate-y-[13px]" : "w-6"
        }`}
      />
      <span
        className={`block h-[6px] bg-black rounded-full transition-all duration-300 ease-in-out ${
          isOpen ? "w-5 opacity-0" : "w-5"
        }`}
      />
      <span
        className={`block h-[6px] bg-black rounded-full transition-all duration-300 ease-in-out ${
          isOpen ? "w-6 -rotate-45 -translate-y-[13px]" : "w-6"
        }`}
      />
    </button>
  );
}
