"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Home, 
  User, 
  FolderKanban, 
  Settings, 
  Shield, 
  FileText, 
  BookOpen, 
  Users 
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
  index: number;
}

// Map link labels to icons
const getIcon = (label: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    "Home": Home,
    "About Us": User,
    "Projects": FolderKanban,
    "Services": Settings,
    "Privacy Policy": Shield,
    "Terms of Service": FileText,
    "Blogs": BookOpen,
    "Team": Users,
  };
  
  return iconMap[label] || FileText; // Default to FileText if no match
};

export default function FooterLinks({ title, links, index }: FooterLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex flex-col space-y-2 ${title ? '' : 'flex-row gap-4'}`}
    >
      {title && (
        <motion.div
          className="group relative mb-2"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gray-900 relative"
          >
            {title}
          </motion.h3>
          <motion.div
            className="absolute -top-1 left-0 h-[2px] bg-black"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            whileTap={{ width: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.div>
      )}
      {links.map((link, linkIndex) => {
        const Icon = getIcon(link.label);
        return (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + linkIndex * 0.05 }}
          >
            <Link
              href={link.href}
              className="group relative inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 py-1.5 w-fit transition-colors duration-200"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors duration-200" />
              </motion.div>
              <motion.span 
                className="block transition-colors duration-200 group-hover:text-black"
                whileHover={{ x: 2 }}
              >
                {link.label}
              </motion.span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

