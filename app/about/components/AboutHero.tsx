"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-start md:text-center mb-10 sm:mb-12 md:mb-16 px-2"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black mb-3 sm:mb-4">
        About NexGen Developers
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-0 md:mx-auto">
        Where Innovation Meets Excellence
      </p>
    </motion.div>
  );
}
