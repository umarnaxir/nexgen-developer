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
      className="flex flex-col space-y-2"
    >
      <h3 className="text-sm font-extrabold uppercase tracking-widest text-gray-900 mb-2">
        {title}
      </h3>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="group relative inline-block text-sm font-medium text-gray-700 py-1 w-fit"
        >
          <span className="block transition-colors duration-200 group-hover:text-gray-900">
            {link.label}
          </span>
          <motion.span
            className="absolute left-1/2 bottom-0 h-[1.5px] bg-black rounded-full"
            initial={{ width: 0, x: "-50%" }}
            whileHover={{ width: "50%", x: "-50%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </Link>
      ))}
    </motion.div>
  );
}

