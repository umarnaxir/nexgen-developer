"use client";

import { motion } from "framer-motion";

export default function TeamHero() {
  return (
    <motion.section 
      className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Meet the NexGen Team
        </motion.h1>
        <motion.p 
          className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto px-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Meet the talented professionals behind NexGen Developer — a collaborative group of engineers, designers, AI specialists, and SEO experts working across leading companies and contributing part-time as a unified freelance team to build innovative digital solutions.
        </motion.p>
      </div>
    </motion.section>
  );
}
