"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile toggle

// Define the structure of a navigation link
interface NavLink {
  href: string;
  label: string;
}

// Updated navLinks: Removed "Contact"
const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // removed scroll-based state: navbar background and text will remain static (white bg + black text)

  // Common styling for desktop navigation links: uppercase, bold, small text, and increased vertical padding
  // desktop links: keep dark text, show a black underbar on hover (remove blue hover color)
  const linkClasses = "relative text-sm uppercase font-extrabold tracking-wide py-4 px-3 text-gray-900 transition-colors duration-300 group";
  
  // Custom element for the animated underbar on hover (more defined and prominent)
  const AnimatedUnderbar = () => (
    <span className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-black transform -translate-x-1/2 group-hover:w-2/3 transition-all duration-300 ease-in-out rounded-full" />
  );

  return (
    // Transparent header until user scrolls — switch to white background with dark text when scrolled
    // Navbar uses a white background with dark text by default (no scroll-based state change)
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
      {/* Desktop/Container Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-0 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 shrink-0 py-3">
          <Image src="/images/ND.png" alt="NexGenDevs" width={56} height={56} className="block" />
        </a>

        {/* Desktop Navigation */}
        {/* Adjusted spacing to accommodate login/signup on the right */}
        <nav className="hidden h-full md:flex items-center md:ml-8 lg:ml-10 space-x-4 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={linkClasses}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
              <AnimatedUnderbar />
            </a>
          ))}
        </nav>

        {/* Right-aligned Login and Signup (Desktop only) */}
        <div className="hidden md:flex items-center space-x-4 ml-auto"> {/* ml-auto pushes these to the right */}
          <a 
            href="/login" 
            className="text-sm uppercase font-extrabold tracking-wide text-gray-900 transition-colors duration-300 px-3 py-2 border border-transparent rounded-md"
          >
            Login
          </a>
          <a 
            href="/signup" 
            className="px-6 py-3 bg-gray-900 text-white text-sm uppercase font-extrabold rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            Signup
          </a>
        </div>

        {/* Hamburger/Close Button (Visible only on small screens) */}
        {/* This will be on the far right on mobile */}
        <button
          onClick={toggleMenu}
          className="text-gray-900 p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-full transition-colors duration-200 hover:bg-gray-100"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu (Conditionally rendered) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white shadow-md"> {/* Added shadow for mobile menu */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={toggleMenu} // Close menu on link click
              className="block rounded-lg py-3 px-3 text-sm uppercase font-extrabold tracking-wide text-gray-800 hover:bg-gray-50 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          {/* Login and Signup for Mobile */}
          <div className="pt-4 border-t border-gray-100 mt-2 space-y-2">
            <a 
              href="/login" 
              onClick={toggleMenu}
              className="block rounded-lg py-3 px-3 text-sm uppercase font-extrabold tracking-wide text-gray-800 hover:bg-gray-50 transition-colors duration-200"
            >
              Customer Login
            </a>
            <a 
              href="/signup" 
              onClick={toggleMenu}
              className="block w-full text-center px-6 py-3 bg-gray-900 text-white text-sm uppercase font-extrabold rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              Signup
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}