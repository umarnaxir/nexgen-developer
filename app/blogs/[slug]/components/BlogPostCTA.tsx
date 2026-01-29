"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "@/components/modals/ContactModal";

export default function BlogPostCTA() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12 p-8 bg-gray-50 rounded-xl border-2 border-black text-center"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-bold text-black mb-4">Ready to Start Your Project?</h2>
      <p className="text-gray-700 mb-6">
        Let's discuss how we can help bring your ideas to life.
      </p>
      <motion.button
        onClick={() => setIsContactModalOpen(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 uppercase tracking-wide"
      >
        Get in Touch
      </motion.button>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </motion.div>
  );
}
