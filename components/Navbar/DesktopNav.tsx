"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesDropdown from "./ServicesDropdown";
import type { NavLinkItem } from "./Navbar";

interface DesktopNavProps {
  links: NavLinkItem[];
  isHome?: boolean;
}

export default function DesktopNav({ links, isHome = false }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 sm:gap-3">
      {links.map((link) =>
        link.children ? (
          <ServicesDropdown
            key={link.href}
            label={link.label}
            href={link.href}
            items={link.children}
            isHome={isHome}
          />
        ) : (
          <div key={link.href} className="hover:scale-105 transition-transform duration-300">
            <Link
              href={link.href}
              className={`relative rounded-md px-2 py-4 text-sm font-semibold tracking-wide transition-all duration-300 group ${
                pathname === link.href
                  ? isHome
                    ? "text-white"
                    : "text-black"
                  : isHome
                    ? "text-white/60 hover:text-white"
                    : "text-gray-700 hover:text-black"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
              <span
                className={`absolute bottom-2 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300 ease-in-out ${
                  isHome ? "bg-white" : "bg-black"
                } ${pathname === link.href ? "w-[60%]" : "w-0 group-hover:w-[60%]"}`}
              />
            </Link>
          </div>
        )
      )}
    </nav>
  );
}
