"use client";

import React from "react";
import { MessageCircle, Facebook, Linkedin, Instagram } from "lucide-react";
import XIcon from "@/components/icons/XIcon";
import WhatsAppLink from "@/components/WhatsAppLink";

const socialLinks = [
  { icon: MessageCircle, href: null, label: "WhatsApp" },
  { icon: XIcon, href: "https://x.com/nexgendv", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/105880683/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/nexgendv?igsh=MTJiczF6aDNxbjB2eg%3D%3D&utm_source=qr", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F", label: "Facebook" },
];

export default function ContactUsSocials() {
  return (
    <section className="py-8 sm:py-12 border-t border-white/10 light:border-gray-200" data-aos="fade-up">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white light:text-gray-900 mb-2 sm:mb-3">Connect with us</h2>
        <p className="text-silver light:text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto">
          Follow us on social media or drop a message. We&apos;re here to help.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => {
            const className =
              "flex h-14 w-14 items-center justify-center rounded-full bg-[#e6c9a6] text-black transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:bg-[#d1ac81] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 sm:h-16 sm:w-16";
            const icon = (
              <Icon className="h-6 w-6 text-black sm:h-7 sm:w-7" strokeWidth={2} />
            );
            if (!href) {
              return (
                <WhatsAppLink key={label} aria-label={label} className={className}>
                  {icon}
                </WhatsAppLink>
              );
            }
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={className}
              >
                {icon}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
