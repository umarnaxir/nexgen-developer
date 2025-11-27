"use client";

import React from "react";
import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterSocials from "./FooterSocials";

interface FooterLink {
  label: string;
  href: string;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const siteLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
  ];

  const moreLinks: FooterLink[] = [
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  const workLinks: FooterLink[] = [
    { label: "Work With Us", href: "/work" },
    { label: "Write For Us", href: "/write" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-12 pt-10 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-10 items-start">
          {/* Links Section */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <FooterLinks title="Site" links={siteLinks} index={0} />
            <FooterLinks title="More" links={moreLinks} index={1} />
            <FooterLinks title="Work" links={workLinks} index={2} />
          </div>

          {/* Logo and Contact Section */}
          <div className="md:col-span-1 flex flex-col items-center md:items-end gap-6">
            <FooterLogo />
            <FooterContact />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 pb-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">
            © Copyright {currentYear} NexGen Developers
          </div>
          <FooterSocials />
        </div>
      </div>
    </footer>
  );
}

