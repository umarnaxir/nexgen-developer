"use client";

import React from "react";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import { motion } from "framer-motion";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  { icon: <Twitter className="w-5 h-5" />, href: "#", ariaLabel: "Twitter" },
  { icon: <Facebook className="w-5 h-5" />, href: "#", ariaLabel: "Facebook" },
  { icon: <Instagram className="w-5 h-5" />, href: "#", ariaLabel: "Instagram" },
  { icon: <Github className="w-5 h-5" />, href: "#", ariaLabel: "GitHub" },
];

export default function FooterSocials() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex space-x-5"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.ariaLabel}
          href={social.href}
          aria-label={social.ariaLabel}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.15, color: "#111827" }}
          whileTap={{ scale: 0.95 }}
          className="text-gray-400 transition-colors duration-200"
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}

