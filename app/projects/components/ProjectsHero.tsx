"use client";

import { motion } from "framer-motion";

export default function ProjectsHero() {
  return (
    <section className="relative py-8 lg:py-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-6 leading-tight">
            Our Projects
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Showcasing innovative solutions across healthcare, hospitality, nonprofit, and enterprise sectors
          </p>
        </motion.div>
      </div>
    </section>
  );
}
