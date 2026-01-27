"use client";

import React from "react";
import { MessageCircle, Facebook, Linkedin, Instagram, Github } from "lucide-react";
import { motion } from "framer-motion";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  { 
    icon: <MessageCircle className="w-5 h-5" />, 
    href: "https://api.whatsapp.com/message/X7TDAPSVHSFNC1?autoload=1&app_absent=0", 
    ariaLabel: "WhatsApp" 
  },
  { 
    icon: <Facebook className="w-5 h-5" />, 
    href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F", 
    ariaLabel: "Facebook" 
  },
  { 
    icon: <Linkedin className="w-5 h-5" />, 
    href: "https://www.linkedin.com/company/105880683/", 
    ariaLabel: "LinkedIn" 
  },
  { 
    icon: <Instagram className="w-5 h-5" />, 
    href: "https://www.instagram.com/nexgendevelopers_?igsh=MTJiczF6aDNxbjB2eg==", 
    ariaLabel: "Instagram" 
  },
  { 
    icon: <Github className="w-5 h-5" />, 
    href: "https://github.com/Nexgendevelopers", 
    ariaLabel: "GitHub" 
  },
];

export default function FooterSocials() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex space-x-3"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.ariaLabel}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white transition-all duration-200 hover:bg-gray-800 hover:scale-110"
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
}

