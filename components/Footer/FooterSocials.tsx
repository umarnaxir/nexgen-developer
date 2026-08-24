"use client";

import React from "react";
import { Instagram, Linkedin } from "lucide-react";
import XIcon from "@/components/icons/XIcon";
import { cn } from "@/lib/utils";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Instagram className="h-3.5 w-3.5" />,
    href: "https://www.instagram.com/nexgendv?igsh=MTJiczF6aDNxbjB2eg%3D%3D&utm_source=qr",
    ariaLabel: "Instagram",
  },
  {
    icon: <Linkedin className="h-3.5 w-3.5" />,
    href: "https://www.linkedin.com/company/105880683/",
    ariaLabel: "LinkedIn",
  },
  {
    icon: <XIcon className="h-3 w-3" />,
    href: "https://x.com/nexgendv",
    ariaLabel: "X",
  },
];

type FooterSocialsProps = {
  variant?: "dark" | "light";
};

export default function FooterSocials({ variant = "dark" }: FooterSocialsProps) {
  const isLight = variant === "light";

  return (
    <div className="flex flex-nowrap items-center gap-2">
      {socialLinks.map((social) => (
        <a
          key={social.ariaLabel}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95",
            isLight
              ? "border border-neutral-300 bg-white/60 text-neutral-700 hover:border-gold-dark/50 hover:bg-white hover:text-gold-dark hover:shadow-md"
              : "bg-white text-black hover:scale-105"
          )}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
