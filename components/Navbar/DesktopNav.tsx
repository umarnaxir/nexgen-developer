"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesDropdown from "./ServicesDropdown";
import type { NavLinkItem } from "./Navbar";

interface DesktopNavProps {
  links: NavLinkItem[];
}

export default function DesktopNav({ links }: DesktopNavProps) {
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
          />
        ) : (
          <div key={link.href} className="hover:scale-105 transition-transform duration-300">
            <Link
              href={link.href}
              className={`relative text-sm font-extrabold tracking-wide py-4 px-2 text-gray-900 transition-all duration-300 group rounded-md hover:bg-gray-50/80 ${
                pathname === link.href ? "text-gray-900" : "hover:text-gray-700"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
              <span
                className={`absolute bottom-2 left-1/2 h-[2px] bg-black rounded-full -translate-x-1/2 transition-all duration-300 ease-in-out ${
                  pathname === link.href ? "w-[60%]" : "w-0 group-hover:w-[60%]"
                }`}
              />
            </Link>
          </div>
        )
      )}
    </nav>
  );
}
