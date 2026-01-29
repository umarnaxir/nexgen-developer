"use client";

import { motion } from "framer-motion";

export default function BlogsHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-4">
        Our Blog
      </h1>
      <p className="text-xl text-gray-700 max-w-3xl mx-auto">
        Insights, tips, and updates from the NexGen Developers team
      </p>
    </motion.div>
  );
}
