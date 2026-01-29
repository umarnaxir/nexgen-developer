"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ContactModal from "@/components/modals/ContactModal";

export default function HeroSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "NEXGEN DEVELOPERS";
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100); // Adjust speed as needed

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
    <section className="relative h-screen flex items-center justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8 lg:pb-12 overflow-visible text-black">
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

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl relative z-10 w-full">
        <div className="max-w-5xl mx-auto text-center relative w-full">
          
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600 mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
          >
            Team of Freelancers
          </motion.p>
          
          {/* Main Headline - Mobile and Desktop: Split into two lines with same styling */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: '0.5rem',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 45px rgba(255, 255, 255, 0.5)'
              }}
              className="font-extrabold tracking-tighter text-black"
            >
              We are
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1rem',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5)'
              }}
              className="font-extrabold tracking-tighter uppercase text-black"
            >
              {displayedText}
              {!isTypingComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block w-1 h-[1em] bg-black ml-1"
                  style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}
                />
              )}
            </motion.div>
          </div>
          
          {/* Description Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              lineHeight: 1.5,
              marginTop: 'clamp(1.5rem, 4vh, 2.5rem)',
              marginBottom: 'clamp(2rem, 5vh, 3rem)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)'
            }}
            className="mt-4 md:mt-6 text-gray-700 max-w-4xl mx-auto text-center leading-tight"
          >
            We are freelancers helping startups and local businesses with AI/ML, chatbots, web & app development, SEO, and graphic design to create stunning digital experiences that make a lasting impact.
          </motion.p>

          {/* Action Buttons - Mobile: Vertical stack, Desktop: Horizontal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center mt-4 md:mt-6"
          >
            <motion.button
              onClick={() => setIsContactModalOpen(true)}
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 2px 10px rgba(0,0,0,0.1)",
                  "0 4px 15px rgba(0,0,0,0.12)",
                  "0 2px 10px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 md:px-10 py-2.5 md:py-2.5 text-sm md:text-sm font-bold text-white bg-black border-2 border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-black/20 uppercase tracking-wide active:scale-[0.96]"
            >
              Get Started
            </motion.button>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <motion.a 
              href="https://api.whatsapp.com/message/X7TDAPSVHSFNC1?autoload=1&app_absent=0" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 2px 10px rgba(0,0,0,0.1)",
                  "0 4px 15px rgba(0,0,0,0.12)",
                  "0 2px 10px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
              }}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 md:px-10 py-2.5 md:py-2.5 text-sm md:text-sm font-bold text-black bg-white border-2 border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-black/20 uppercase tracking-wide active:scale-[0.96]"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))' }}
              >
                <MessageCircle className="w-4 h-4 md:w-4 md:h-4 mr-2" />
              </motion.div>
              WhatsApp
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
    </>
  );
}