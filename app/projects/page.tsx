"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ClientReviewsSection from "@/app/home/ClientReviewsSection";
import FAQSection from "@/app/home/FAQSection";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "/images/project1.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT", "AWS S3"],
      category: "Web Development",
      features: ["Payment Integration", "Inventory Management", "Admin Dashboard", "Real-time Analytics", "Product Recommendations", "Secure Authentication"],
      duration: "3 months",
      client: "TechStart Inc."
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication and real-time transaction processing.",
      image: "/images/project2.png",
      technologies: ["React Native", "Firebase", "Node.js", "PostgreSQL", "Biometric API", "Push Notifications"],
      category: "App Development",
      features: ["Biometric Authentication", "Real-time Transactions", "Bill Payments", "Investment Tracking", "Secure Encryption", "Push Notifications"],
      duration: "4 months",
      client: "FinanceFlow"
    },
    {
      id: 3,
      title: "AI-Powered Analytics Dashboard",
      description: "Intelligent business analytics platform with machine learning predictions and data visualization.",
      image: "/images/project3.png",
      technologies: ["Python", "TensorFlow", "React", "D3.js", "PostgreSQL", "Redis", "Docker"],
      category: "AI/ML",
      features: ["ML Predictions", "Real-time Analytics", "Interactive Visualizations", "Automated Reports", "Custom Dashboards", "Data Integration"],
      duration: "5 months",
      client: "DataInsight Corp"
    },
    {
      id: 4,
      title: "Healthcare Management System",
      description: "Comprehensive healthcare management system with patient records, appointments, and telemedicine features.",
      image: "/images/project4.png",
      technologies: ["Next.js", "PostgreSQL", "AWS", "WebRTC", "HIPAA Compliance", "Twilio"],
      category: "Full Stack",
      features: ["Electronic Health Records", "Appointment Scheduling", "Telemedicine", "Billing Management", "Patient Portal", "HIPAA Compliance"],
      duration: "6 months",
      client: "HealthCare Solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Explore our portfolio of successful projects and innovative solutions
            </p>
          </motion.div>

          {/* Projects Grid - full-card image, overlay, text + button at bottom */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <Link key={project.id} href="/projects" className="block group cursor-pointer">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -6 }}
                  className="relative aspect-[16/9] sm:aspect-[2/1] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Full-card Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Black gradient overlay for text visibility */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"
                    aria-hidden
                  />

                  {/* Category badge - top left */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded uppercase border border-white/30">
                      {project.category}
                    </span>
                  </div>

                  {/* View Project - small button top right */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white/90 text-black text-xs font-semibold rounded-md group-hover:bg-white transition-colors shadow-md whitespace-nowrap">
                      View project
                      <svg className="w-3.5 h-3.5 shrink-0 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>

                  {/* Text - anchored at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 z-10 flex flex-col">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {project.title}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-3 line-clamp-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-white/80 text-xs drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      <span>{project.duration}</span>
                      <span className="text-white/50">·</span>
                      <span>{project.client}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClientReviewsSection />
      <FAQSection />
    </div>
  );
}
