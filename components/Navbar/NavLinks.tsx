"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesDropdown from "./ServicesDropdown";
import type { NavLinkItem } from "./Navbar";

interface NavLinksProps {
  links: NavLinkItem[];
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({ links, isMobile = false, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <>
        {links.map((link) => {
          if (link.children) {
            return (
              <ServicesDropdown
                key={link.href}
                label={link.label}
                href={link.href}
                items={link.children}
                isMobile
                onLinkClick={onLinkClick}
              />
            );
          }
          const isActive = pathname === link.href;
          return (
            <div
              key={link.href}
              data-aos="zoom-in"
              data-aos-duration="600"
              className="relative group"
            >
              <Link
                href={link.href}
                onClick={onLinkClick}
                className={`relative block py-3 px-4 text-sm font-extrabold tracking-wide rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-gray-900 bg-gray-50 shadow-sm"
                    : "text-gray-900 hover:bg-gray-50 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                }`}
              >
                {link.label}
              </Link>
            </div>
          );
        })}
      </>
    );
  }

  return null;
}
