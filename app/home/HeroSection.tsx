"use client";

import React, { useState, useEffect } from "react";
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
    <section className="relative sm:h-screen h-auto flex items-center justify-center pt-10 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-6 md:pb-8 lg:pb-12 overflow-visible text-black" data-aos="fade-up">
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
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-teal-600 mb-2 sm:mb-3 md:mb-4 uppercase tracking-wider"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
          >
            Team of Freelancers
          </p>
          
          {/* Main Headline - Mobile and Desktop: Split into two lines with same styling */}
          <div className="text-center">
            <div
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
            </div>
            <div
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
                <span
                  className="inline-block w-1 h-[1em] bg-black ml-1 animate-pulse"
                  style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}
                />
              )}
            </div>
          </div>
          
          {/* Description Text */}
          <p 
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
          </p>

          {/* Action Buttons - Mobile: Vertical stack, Desktop: Horizontal */}
          <div 
            className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center mt-4 md:mt-6"
          >
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 md:px-10 py-2.5 md:py-2.5 text-sm md:text-sm font-bold text-white bg-black border-2 border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400/30 uppercase tracking-wide active:scale-[0.96] hover:shadow-lg transition-shadow"
            >
              Get Started
            </button>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <a 
              href="https://api.whatsapp.com/message/X7TDAPSVHSFNC1?autoload=1&app_absent=0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center px-8 md:px-10 py-2.5 md:py-2.5 text-sm md:text-sm font-bold text-black bg-white border-2 border-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400/30 uppercase tracking-wide active:scale-[0.96] hover:shadow-lg transition-shadow"
            >
              <div
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))' }}
              >
                <MessageCircle className="w-4 h-4 md:w-4 md:h-4 mr-2" />
              </div>
              WhatsApp
            </a>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}