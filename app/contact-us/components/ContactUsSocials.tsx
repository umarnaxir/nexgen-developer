"use client";

import React from "react";
import { MessageCircle, Facebook, Linkedin, Instagram } from "lucide-react";
import XIcon from "@/components/icons/XIcon";

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/916006161726?text=Hi%20NexGen%20Developers%2C%20I%20want%20to%20discuss%20a%20project.", label: "WhatsApp" },
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
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 light:border-gray-200 bg-white/[0.04] light:bg-white light:shadow-sm text-silver-light light:text-gray-700 transition-all duration-200 hover:border-teal-400/50 light:hover:border-teal-200 hover:bg-teal-500 hover:text-white hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/40"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
