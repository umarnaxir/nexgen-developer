"use client";

import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-4">
        Our Services
      </h1>
      <p className="text-xl text-gray-700 max-w-3xl mx-auto">
        The goal is not just to build a website or an app, but to grow your business.
      </p>
    </motion.div>
  );
}
