"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
    <footer className="bg-gray-100 border-t border-gray-200 mt-12 pt-4 sm:pt-6 pb-3">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 pb-4 sm:pb-5">
          {/* Logo Section */}
          <div className="sm:col-span-2 lg:col-span-1 flex items-start justify-start">
            <FooterLogo />
          </div>

          {/* Quick Links */}
          <div>
            <FooterLinks title="Quick Links" links={quickLinks} index={0} />
          </div>

          {/* Other Pages */}
          <div>
            <FooterLinks title="Other Pages" links={otherPages} index={1} />
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gray-900 mb-2">
              Contact
            </h3>
            <div className="space-y-1.5 text-xs sm:text-sm text-gray-700 mb-3">
              <motion.a 
                href="tel:6006161726" 
                whileHover={{ scale: 1.05, x: 2 }}
                className="hover:text-black transition-colors block font-medium"
              >
                Call on +91 600-616-1726
              </motion.a>
              <motion.a 
                href="mailto:nexgendevelopers11@gmail.com" 
                whileHover={{ scale: 1.05, x: 2 }}
                className="hover:text-black transition-colors font-medium break-all block"
              >
                nexgendevelopers11@gmail.com
              </motion.a>
            </div>
            {/* Social Icons */}
            <div className="mt-3">
              <FooterSocials />
            </div>
          </motion.div>

          {/* Email Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gray-900 mb-2">
              Subscribe
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg outline-none transition-all text-black"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 text-xs sm:text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide"
              >
                Subscribe
              </motion.button>
            </form>
            
            {/* Alert Message */}
            {showAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 p-3 bg-black text-white text-xs sm:text-sm rounded-lg shadow-lg z-10"
              >
                Thank you for subscribing! We'll keep you updated.
              </motion.div>
            )}
          </motion.div>
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

