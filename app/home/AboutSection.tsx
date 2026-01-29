"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const services = [
    { title: "Web & App Development", desc: "Crafting responsive websites and scalable applications that drive business growth." },
    { title: "AI & Machine Learning", desc: "Implementing intelligent solutions that automate processes and generate valuable insights." },
    { title: "Chatbot Development", desc: "Building intelligent conversational interfaces that enhance customer experience." },
    { title: "Digital Marketing", desc: "Developing comprehensive strategies to increase your online presence and drive customer engagement." },
    { title: "Search Engine Optimization", desc: "Implementing data-driven SEO tactics to improve rankings and drive organic traffic to your business.", span: true }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="px-4">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 text-start"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
          >
            Where Innovation Meets Excellence
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 text-start"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
          >
            We are NexGen Developers, a collective of 5-10 engineering professionals from leading tech companies united to deliver premium freelance services. Our team combines diverse expertise with a passion for technological innovation, enabling us to tackle complex challenges with precision and creativity.
          </motion.p>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gray-50 p-4 sm:p-6 rounded-lg border-2 border-transparent transition-all duration-300 ${service.span ? 'md:col-span-2' : ''}`}
              >
                <h4 
                  className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3"
                  style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' }}
                >
                  {service.title}
                </h4>
                <p 
                  className="text-sm sm:text-base text-gray-700"
                  style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)' }}
                >
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
