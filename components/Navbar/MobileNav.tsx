"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import NavLinks from "./NavLinks";
import NavLogo from "./NavLogo";
import Hamburger from "./Hamburger";
import type { NavLinkItem } from "./Navbar";
import XIcon from "@/components/icons/XIcon";

interface MobileNavProps {
  isOpen: boolean;
  links: NavLinkItem[];
  onLinkClick: () => void;
  onClose: () => void;
  onGetInTouch: () => void;
}

const contactItems = [
  { icon: Mail, href: "mailto:workwithnexgen@gmail.com", label: "workwithnexgen@gmail.com" },
  { icon: Phone, href: "tel:+916006161726", label: "+91 600-616-1726" },
];

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/916006161726?text=Hi%20NexGen%20Developers%2C%20I%20want%20to%20discuss%20a%20project.", label: "WhatsApp" },
  { icon: XIcon, href: "https://x.com/nexgendv", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/105880683/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/nexgendv?igsh=MTJiczF6aDNxbjB2eg%3D%3D&utm_source=qr", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F", label: "Facebook" },
];

export default function MobileNav({
  isOpen,
  links,
  onLinkClick,
  onClose,
  onGetInTouch,
}: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => AOS.refresh(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed left-0 right-0 top-0 bottom-0 z-[99] h-[100vh] min-h-[100vh] w-[100vw] bg-black light:bg-white overflow-y-auto animate-mobile-nav-in"
    >
      {/* Top bar with logo and close button */}
      <div className="sticky top-0 z-10 flex items-center justify-between h-20 px-4 sm:px-6 bg-black/80 light:bg-white border-b border-white/[0.06] light:border-gray-200 backdrop-blur-xl shrink-0">
        <div onClick={onClose}>
          <NavLogo light />
        </div>
        <Hamburger isOpen={true} onClick={onClose} spinOnMount light />
      </div>

      <div className="flex min-h-[calc(100vh-5rem)] w-[100vw] flex-col px-3 pb-8 pt-2 sm:px-6">
        <div className="w-full space-y-1">
          <NavLinks links={links} isMobile onLinkClick={onLinkClick} />
        </div>

        <div className="glass mt-5 space-y-3 rounded-2xl px-4 py-4" data-aos="fade-up" data-aos-duration="600">
          <div className="space-y-2.5">
            {contactItems.map(({ icon: Icon, href, label }) => (
              <a
                key={href}
                href={href}
                className="flex min-w-0 items-center gap-3 text-sm font-bold tracking-wide text-white light:text-gray-900"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/20 light:border-gold-light bg-gold/10 light:bg-gold-light text-gold light:text-gold-dark">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-1">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 light:border-gray-200 bg-white/[0.04] light:bg-white light:shadow-sm text-silver-light light:text-gray-700 transition-all duration-300 hover:border-gold/50 hover:bg-gold-dark hover:text-white active:scale-95"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-4" data-aos="fade-up" data-aos-duration="600">
          <button
            type="button"
            onClick={onGetInTouch}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark to-gold-dark py-3 px-4 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all duration-300 hover:from-gold-dark hover:to-gold-dark hover:scale-[1.02] active:scale-[0.98]"
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
