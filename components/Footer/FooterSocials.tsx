"use client";

import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import XIcon from "@/components/icons/XIcon";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Instagram className="h-4 w-4" />,
    href: "https://www.instagram.com/nexgendevelopers_?igsh=MTJiczF6aDNxbjB2eg==",
    ariaLabel: "Instagram",
  },
  {
    icon: <Facebook className="h-4 w-4" />,
    href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F",
    ariaLabel: "Facebook",
  },
  {
    icon: <Linkedin className="h-4 w-4" />,
    href: "https://www.linkedin.com/company/105880683/",
    ariaLabel: "LinkedIn",
  },
  {
    icon: <XIcon className="h-3.5 w-3.5" />,
    href: "https://x.com/nexgendv",
    ariaLabel: "X",
  },
];

export default function FooterSocials() {
  return (
    <div className="flex flex-nowrap items-center justify-start gap-2.5 sm:justify-end">
      {socialLinks.map((social) => (
        <a
          key={social.ariaLabel}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
