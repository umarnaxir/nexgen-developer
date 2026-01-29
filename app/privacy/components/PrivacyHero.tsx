"use client";

import { motion } from "framer-motion";

export default function PrivacyHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8 sm:mb-12 lg:mb-16 text-center"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black mb-3 sm:mb-4">
        Privacy Policy
      </h1>
      <p className="text-base sm:text-lg text-gray-600">Last updated: January 27, 2026</p>
      <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-3xl mx-auto px-2">
        Your privacy is important to us. This policy explains how we collect, use, protect, and share your personal information when you use our services.
      </p>
    </motion.div>
  );
}
