"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Hamburger from "./Hamburger";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLogo />

          {/* Desktop Navigation */}
          <DesktopNav links={navLinks} />

          {/* Desktop Login/Signup */}
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/admin/login"
                className="text-sm uppercase font-extrabold tracking-wide text-gray-900 px-4 py-2 border-[1.5px] border-black rounded-md hover:shadow-md transition-all duration-300"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/admin/sign-up"
                className="px-6 py-2.5 bg-gray-900 text-white text-sm uppercase font-extrabold rounded-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
              >
                Signup
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Hamburger isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        links={navLinks} 
        onLinkClick={closeMobileMenu} 
      />
    </motion.header>
  );
}

