"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ContactModal from "@/components/modals/ContactModal";

export default function HeroSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-white text-black">
      {/* Graph/Grid Background */}
      <div className="absolute inset-0 opacity-[0.12]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-3 uppercase tracking-wider"
          >
            Team of Freelancers
          </motion.p>
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold leading-tight tracking-tighter mb-4 sm:mb-6 px-2"
          >
            We are <span className="text-black">NexGen Developers</span>
          </motion.h1>
          
          {/* Description Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4"
          >
            We are freelancers helping startups and local businesses with AI/ML, chatbots, web & app development, SEO, and graphic design to create stunning digital experiences that make a lasting impact.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <motion.button
              onClick={() => setIsContactModalOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white bg-black border-2 border-black rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide"
            >
              Get Started
            </motion.button>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <motion.a 
              href="https://api.whatsapp.com/message/X7TDAPSVHSFNC1?autoload=1&app_absent=0" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-black bg-white border-2 border-black rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}