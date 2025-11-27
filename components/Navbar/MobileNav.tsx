"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NavLinks from "./NavLinks";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  isOpen: boolean;
  links: NavLink[];
  onLinkClick: () => void;
}

export default function MobileNav({ isOpen, links, onLinkClick }: MobileNavProps) {
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <NavLinks links={links} isMobile onLinkClick={onLinkClick} />
            
            {/* Mobile Login/Signup */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05 + 0.1, duration: 0.3 }}
              className="pt-4 border-t border-gray-100 mt-2 space-y-2"
            >
              <Link
                href="/admin/login"
                onClick={onLinkClick}
                className="block py-3 px-4 text-sm uppercase font-extrabold tracking-wide text-gray-900 border-[1.5px] border-black rounded-md hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Login
              </Link>
              <Link
                href="/admin/sign-up"
                onClick={onLinkClick}
                className="block w-full py-3 px-4 bg-gray-900 text-white text-sm uppercase font-extrabold rounded-md hover:bg-gray-800 transition-colors duration-300 text-center"
              >
                Signup
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

