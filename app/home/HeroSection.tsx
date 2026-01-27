"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import ContactModal from "@/components/modals/ContactModal";

export default function HeroSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [leftStarHovered, setLeftStarHovered] = useState(false);
  const [rightStarHovered, setRightStarHovered] = useState(false);
  
  // Mouse position tracking for interactive stars
  const leftStarX = useMotionValue(0);
  const leftStarY = useMotionValue(0);
  const rightStarX = useMotionValue(0);
  const rightStarY = useMotionValue(0);
  
  const leftSpringX = useSpring(leftStarX, { stiffness: 150, damping: 15 });
  const leftSpringY = useSpring(leftStarY, { stiffness: 150, damping: 15 });
  const rightSpringX = useSpring(rightStarX, { stiffness: 150, damping: 15 });
  const rightSpringY = useSpring(rightStarY, { stiffness: 150, damping: 15 });
  
  const leftRotateX = useTransform(leftSpringY, [-0.5, 0.5], [15, -15]);
  const leftRotateY = useTransform(leftSpringX, [-0.5, 0.5], [-15, 15]);
  const rightRotateX = useTransform(rightSpringY, [-0.5, 0.5], [15, -15]);
  const rightRotateY = useTransform(rightSpringX, [-0.5, 0.5], [-15, 15]);
  
  const handleLeftStarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    leftStarX.set(x);
    leftStarY.set(y);
  };
  
  const handleRightStarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    rightStarX.set(x);
    rightStarY.set(y);
  };
  
  const handleStarMouseLeave = (side: 'left' | 'right') => {
    if (side === 'left') {
      leftStarX.set(0);
      leftStarY.set(0);
      setLeftStarHovered(false);
    } else {
      rightStarX.set(0);
      rightStarY.set(0);
      setRightStarHovered(false);
    }
  };

  return (
    <section className="relative h-[80vh] sm:h-[85vh] md:h-[90vh] flex items-center justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8 lg:pb-12 overflow-visible bg-white text-black">
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
        <div className="max-w-4xl mx-auto text-center relative w-full">
          
          {/* Star Above Content - Top Right */}
          <motion.div 
            className="absolute top-0 sm:top-2 md:top-4 right-0 sm:right-2 md:right-4 lg:right-8 z-10 cursor-pointer pointer-events-auto"
            onMouseMove={handleRightStarMouseMove}
            onMouseEnter={() => setRightStarHovered(true)}
            onMouseLeave={() => handleStarMouseLeave('right')}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: [360, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 },
              scale: { duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 },
              rotate: {
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            whileHover={{ scale: 1.3, y: -5 }}
            whileTap={{ scale: 0.9 }}
            style={{
              rotateX: rightRotateX,
              rotateY: rightRotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.8, 1, 0.8],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Image 
                src="/images/star.png" 
                alt="Decorative star" 
                width={200} 
                height={200}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600 mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider"
          >
            Team of Freelancers
          </motion.p>
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold leading-[1.1] tracking-tighter mb-3 sm:mb-4 md:mb-6 px-2"
          >
            We are <motion.span 
              className="text-black inline-block"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(0,0,0,0)",
                  "0 0 20px rgba(0,0,0,0.1)",
                  "0 0 0px rgba(0,0,0,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >NexGen Developers</motion.span>
          </motion.h1>
          
          {/* Description Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed px-4 pl-8 sm:pl-12 md:pl-16 lg:pl-20"
          >
            We are freelancers helping startups and local businesses with AI/ML, chatbots, web & app development, SEO, and graphic design to create stunning digital experiences that make a lasting impact.
          </motion.p>

          {/* Action Buttons - Centered below content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-5 md:mt-6"
          >
            <motion.button
              onClick={() => setIsContactModalOpen(true)}
              whileHover={{ scale: 1.08, y: -3, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 4px 15px rgba(0,0,0,0.1)",
                  "0 6px 20px rgba(0,0,0,0.15)",
                  "0 4px 15px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="inline-flex items-center justify-center w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base font-bold text-white bg-black border-2 border-black rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide"
            >
              Get Started
            </motion.button>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <motion.a 
              href="https://api.whatsapp.com/message/X7TDAPSVHSFNC1?autoload=1&app_absent=0" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, y: -3, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 4px 15px rgba(0,0,0,0.1)",
                  "0 6px 20px rgba(0,0,0,0.15)",
                  "0 4px 15px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
              }}
              className="inline-flex items-center justify-center w-auto px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 text-xs sm:text-sm md:text-base font-bold text-black bg-white border-2 border-black rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
              </motion.div>
              WhatsApp
            </motion.a>
          </motion.div>

          {/* Star Below Content - Bottom Left */}
          <motion.div 
            className="absolute bottom-0 sm:bottom-2 md:bottom-4 -left-4 sm:-left-2 md:left-0 lg:left-4 z-10 cursor-pointer pointer-events-auto"
            onMouseMove={handleLeftStarMouseMove}
            onMouseEnter={() => setLeftStarHovered(true)}
            onMouseLeave={() => handleStarMouseLeave('left')}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: [0, 360],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 },
              scale: { duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 },
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            whileHover={{ scale: 1.3, y: 5 }}
            whileTap={{ scale: 0.9 }}
            style={{
              rotateX: leftRotateX,
              rotateY: leftRotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image 
                src="/images/star.png" 
                alt="Decorative star" 
                width={200} 
                height={200}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}