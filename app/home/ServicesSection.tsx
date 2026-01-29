"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  MessageCircle, 
  TrendingUp, 
  Palette,
  ArrowRight
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "We build modern, responsive, and high-performance websites tailored to your business needs, ensuring seamless user experiences.",
      icon: Globe
    },
    {
      title: "App Development",
      description: "We develop powerful mobile and web applications using the latest technologies, ensuring scalability and performance.",
      icon: Smartphone
    },
    {
      title: "AI & ML Solutions",
      description: "We integrate Artificial Intelligence and Machine Learning to automate processes, enhance decision-making, and create smart applications.",
      icon: Cpu
    },
    {
      title: "Chatbots Development",
      description: "Enhance customer engagement with AI-powered chatbots that provide instant and intelligent support across platforms.",
      icon: MessageCircle
    },
    {
      title: "SEO & Digital Marketing",
      description: "Boost your online presence with expert SEO, Google Ads, and digital marketing strategies tailored to your business.",
      icon: TrendingUp
    },
    {
      title: "Graphic Design",
      description: "From logos to social media posts, we craft visually compelling designs that strengthen your brand identity.",
      icon: Palette
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle Grid Background - black/gray only */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-3 sm:mb-4 px-4"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
          >
            Services We Provide
          </h2>
          <p 
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
          >
            The goal is not just to build a website or an app, but to grow your business.
          </p>
        </motion.div>

        {/* Services Grid - 2 rows x 3 columns for 6 services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-5 sm:p-6 md:p-7 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                {/* Icon Container - gray */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <IconComponent 
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" 
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
                  />
                </div>

                {/* Service Title */}
                <h3 
                  className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 sm:mb-4"
                  style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
                >
                  {service.title}
                </h3>

                {/* Service Description */}
                <p 
                  className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4"
                  style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)' }}
                >
                  {service.description}
                </p>
                <Link 
                  href="/services"
                  className="inline-flex items-center text-black hover:text-gray-700 font-bold group"
                  style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7)' }}
                >
                  Read More
                  <ArrowRight 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))' }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
