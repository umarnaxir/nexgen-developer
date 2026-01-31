"use client";

import React, { useState } from "react";
import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";
import FooterSocials from "./FooterSocials";

interface FooterLink {
  label: string;
  href: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
  ];

  const otherPages: FooterLink[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Blogs", href: "/blogs" },
    { label: "Team", href: "/team" },
  ];

  const legalLinks: FooterLink[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email subscribed:", email);
    setEmail("");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <footer className="bg-gray-100 border-t border-gray-200 pt-8 sm:pt-6 pb-3" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 pb-4 sm:pb-5">
          {/* Logo Section */}
          <div className="hidden sm:flex sm:col-span-2 lg:col-span-1 items-center justify-start">
            <FooterLogo />
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <FooterLinks title="Quick Links" links={quickLinks} index={0} />
          </div>

          {/* Other Pages */}
          <div className="flex flex-col">
            <FooterLinks title="Other Pages" links={otherPages} index={1} />
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <div className="mb-2">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gray-900">
                Contact
              </h3>
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 mb-3">
              <a 
                href="tel:6006161726" 
                className="hover:text-black transition-colors block font-medium hover:translate-x-0.5"
              >
                Call on +91 600-616-1726
              </a>
              <a 
                href="mailto:nexgendevelopers11@gmail.com" 
                className="hover:text-black transition-colors font-medium break-all block hover:translate-x-0.5"
              >
                nexgendevelopers11@gmail.com
              </a>
            </div>
            {/* Social Icons */}
            <div className="mt-3">
              <FooterSocials />
            </div>
          </div>

          {/* Email Subscription */}
          <div className="relative flex flex-col">
            <div className="mb-2">
              <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gray-900">
                Subscribe
              </h3>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none transition-all text-black focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-xs sm:text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400/30 transition-all duration-300 uppercase tracking-wide hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                Subscribe
              </button>
            </form>
            
            {/* Alert Message */}
            {showAlert && (
              <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-black text-white text-xs sm:text-sm rounded-lg shadow-lg z-10">
                Thank you for subscribing! We'll keep you updated.
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-3 sm:pt-4 pb-3">
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500">
              © {currentYear} NexGen Developers. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

