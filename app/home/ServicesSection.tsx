"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "We build modern, responsive, and high-performance websites tailored to your business needs, ensuring seamless user experiences.",
      image: "/images/website.jpg",
      link: "/services"
    },
    {
      title: "App Development",
      description: "We develop powerful mobile and web applications using the latest technologies, ensuring scalability and performance.",
      image: "/images/app.jpg",
      link: "/services"
    },
    {
      title: "AI & ML Solutions",
      description: "We integrate Artificial Intelligence and Machine Learning to automate processes, enhance decision-making, and create smart applications.",
      image: "/images/ai.jpg",
      link: "/services"
    },
    {
      title: "Chatbots Development",
      description: "Enhance customer engagement with AI-powered chatbots that provide instant and intelligent support across platforms.",
      image: "/images/chatbot.jpg",
      link: "/services"
    },
    {
      title: "SEO & Digital Marketing",
      description: "Boost your online presence with expert SEO, Google Ads, and digital marketing strategies tailored to your business.",
      image: "/images/seo.jpg",
      link: "/services"
    },
    {
      title: "Graphic Design",
      description: "From logos to social media posts, we craft visually compelling designs that strengthen your brand identity.",
      image: "/images/graphic.jpg",
      link: "/services"
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-3 sm:mb-4 px-4">
            Services We Provide
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            The goal is not just to build a website or an app, but to grow your business.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-50 p-4 sm:p-5 rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-300 overflow-hidden"
            >
              <div className="relative w-full h-40 sm:h-48 mb-3 sm:mb-4 rounded-md overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 sm:mb-3">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
              <Link 
                href={service.link}
                className="inline-flex items-center text-black hover:text-gray-700 font-bold group"
              >
                Learn More
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
