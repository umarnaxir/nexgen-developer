"use client";

import React from "react";
import Link from "next/link";
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
    <div
      className={`flex flex-col space-y-2 ${title ? '' : 'flex-row gap-4'}`}
    >
      {title && (
        <div className="mb-2">
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gray-900">
            {title}
          </h3>
        </div>
      )}
      {links.map((link) => {
        const Icon = getIcon(link.label);
        return (
          <div key={link.label}>
            <Link
              href={link.href}
              className="group relative inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 py-1.5 w-fit transition-colors duration-200 hover:text-teal-600"
            >
              <div className="flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                <Icon className="w-4 h-4 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
              </div>
              <span className="block transition-colors duration-200 group-hover:text-teal-600 group-hover:translate-x-0.5">
                {link.label}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
