"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "@/components/modals/ContactModal";

export default function ContactCTA() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="text-center"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4 px-2">Ready to Start Your Project?</h2>
      <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
        Get in touch with us today for a free consultation and custom quote. Let's discuss how we can help bring your digital vision to life.
      </p>
      <motion.button
        onClick={() => setIsContactModalOpen(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-sm sm:text-base font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl"
      >
        Contact Us Now
      </motion.button>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </motion.div>
  );
}
