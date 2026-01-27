"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
  index: number;
}

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
        <motion.h3 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gray-900 mb-2"
        >
          {title}
        </motion.h3>
      )}
      {links.map((link, linkIndex) => (
        <motion.div
          key={link.label}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + linkIndex * 0.05 }}
        >
          <Link
            href={link.href}
            className="group relative inline-block text-xs sm:text-sm font-medium text-gray-700 py-0.5 w-fit"
          >
            <motion.span 
              className="block transition-colors duration-200 group-hover:text-black"
              whileHover={{ x: 2 }}
            >
              {link.label}
            </motion.span>
            <motion.span
              className="absolute left-0 bottom-0 h-[2px] bg-black"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

