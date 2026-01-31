"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({ links, isMobile = false, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <>
        {links.map((link, index) => {
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

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <div key={link.href} className="hover:scale-105 transition-transform duration-300">
            <Link
              href={link.href}
              className={`relative text-sm font-extrabold tracking-wide py-4 px-2 text-gray-900 transition-all duration-300 group rounded-md hover:bg-gray-50/80 ${
                isActive ? 'text-gray-900' : 'hover:text-gray-700'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {link.label}
              <span 
                className={`absolute bottom-2 left-1/2 h-[2px] bg-black rounded-full -translate-x-1/2 transition-all duration-300 ease-in-out ${isActive ? 'w-[60%]' : 'w-0 group-hover:w-[60%]'}`}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
}
