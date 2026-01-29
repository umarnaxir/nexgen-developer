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
        {links.map((link) => (
          <div key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className="relative block py-3 px-4 text-sm font-extrabold tracking-wide text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute left-1/2 bottom-2 h-[2px] bg-black rounded-full w-0 group-hover:w-[40%] -translate-x-1/2 transition-all duration-300 ease-in-out" />
            </Link>
          </div>
        ))}
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
              className={`relative text-sm font-extrabold tracking-wide py-4 px-3 text-gray-900 transition-all duration-300 group ${
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
