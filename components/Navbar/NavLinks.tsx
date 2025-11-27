"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
        {links.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Link
              href={link.href}
              onClick={onLinkClick}
              className="relative block py-3 px-4 text-sm uppercase font-extrabold tracking-wide text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
            >
              {link.label}
              <motion.span
                className="absolute left-1/2 bottom-2 h-[2px] bg-black rounded-full"
                initial={{ width: 0, x: "-50%" }}
                whileHover={{ width: "40%", x: "-50%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </Link>
          </motion.div>
        ))}
      </>
    );
  }

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="relative text-sm uppercase font-extrabold tracking-wide py-4 px-3 text-gray-900 transition-colors duration-300 group"
          aria-current={pathname === link.href ? 'page' : undefined}
        >
          {link.label}
          <motion.span
            className="absolute bottom-2 left-1/2 h-[2px] bg-black rounded-full"
            initial={{ width: 0, x: "-50%" }}
            whileHover={{ width: "40%", x: "-50%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </Link>
      ))}
    </>
  );
}

