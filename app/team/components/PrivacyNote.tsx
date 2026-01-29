"use client";

import { motion } from "framer-motion";

export default function PrivacyNote() {
  return (
    <motion.section 
      className="pt-4 sm:pt-6 pb-8 sm:pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          className="bg-gray-900/50 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm"
          whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Additional Team Members
          </h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            NexGen Developer also collaborates with several other skilled professionals. Due to privacy and confidentiality reasons, their details are not publicly listed.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
