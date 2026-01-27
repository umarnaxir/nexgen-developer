"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What services does NexGen Developers offer?",
      answer: "We offer a comprehensive range of services including web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, graphic design, deployment & DevOps, and ongoing maintenance & support. We provide end-to-end solutions from concept to deployment."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex full-stack application could take 2-6 months. We provide detailed timelines during the initial consultation and keep you updated throughout the development process."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer flexible pricing options including project-based pricing (fixed price for complete projects), hourly rates (pay for actual time worked), and monthly retainers (dedicated support & maintenance). Every project is unique, and we provide personalized pricing based on your specific requirements, timeline, and complexity."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer comprehensive maintenance and support services. This includes bug fixes, updates, security patches, performance optimization, and feature enhancements. We offer both one-time support and monthly retainer packages depending on your needs."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with modern technologies including React, Next.js, Node.js, Python, React Native, MongoDB, PostgreSQL, AWS, Docker, and more. Our team stays updated with the latest frameworks and tools to deliver cutting-edge solutions."
    },
    {
      question: "How do you ensure project quality?",
      answer: "We follow industry best practices including code reviews, testing (unit, integration, and end-to-end), continuous integration/continuous deployment (CI/CD), and regular client feedback sessions. We also conduct thorough quality assurance testing before deployment."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
            -FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-3 sm:mb-4 px-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4">
            Find answers to common questions about our services and process
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl border-2 border-transparent transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 sm:px-8 py-4 sm:py-6 text-left flex items-center justify-between focus:outline-none"
              >
                <h3 className="text-lg sm:text-xl font-bold text-black pr-4">
                  {faq.question}
                </h3>
                <motion.svg
                  className="w-6 h-6 text-black flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-4 sm:pb-6">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
