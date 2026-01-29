"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TermsSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  delay?: number;
  dark?: boolean;
  altBg?: boolean;
}

export default function TermsSection({ icon: Icon, title, children, delay = 0, dark = false, altBg = false }: TermsSectionProps) {
  const bgClass = dark
    ? "bg-black p-4 sm:p-6 lg:p-8 rounded-xl text-white"
    : altBg
    ? "bg-white p-4 sm:p-6 lg:p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
    : "bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl border-2 border-gray-200 transition-all duration-300";
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={bgClass}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4">
        <div className={dark ? "bg-white p-2 sm:p-3 rounded-lg flex-shrink-0" : "bg-black p-2 sm:p-3 rounded-lg flex-shrink-0"}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${dark ? "text-black" : "text-white"}`} />
        </div>
        <div className="flex-1 w-full">
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 ${dark ? "text-white" : "text-black"}`}>
            {title}
          </h2>
          <div className={`text-sm sm:text-base leading-relaxed ${dark ? "text-gray-200" : "text-gray-700"}`}>
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
