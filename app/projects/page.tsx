"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Calendar, Users, Code2, CheckCircle2, ArrowRight, Globe, Building2, Heart, Briefcase } from "lucide-react";
import ClientReviewsSection from "@/app/home/ClientReviewsSection";
import FAQSection from "@/app/home/FAQSection";

export default function ProjectsPage() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Dr. Jibran Bashir – Orthopedic Care Website",
      description: "A professional medical website showcasing services, expertise, and online appointment booking with a clean and responsive UI.",
      detailedDescription: "A comprehensive medical website designed for Dr. Jibran Bashir's orthopedic practice. The platform features a modern, clean interface that builds trust with patients while providing essential information about services, doctor's expertise, and treatment options. The website includes an integrated appointment booking system, patient testimonials, and detailed service pages.",
      image: "/images/project2.png",
      link: "https://drjibranbashir.com",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design", "SEO Optimization"],
      category: "Medical Website",
      features: [
        "Online Appointment Booking System",
        "Service & Treatment Information",
        "Doctor's Profile & Expertise",
        "Patient Testimonials",
        "Contact Forms & Location Maps",
        "Mobile-Responsive Design",
        "Fast Loading & SEO Optimized",
        "Secure Patient Data Handling"
      ],
      duration: "2 months",
      client: "Dr. Jibran Bashir",
      icon: Building2,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Hotel Sea View – Luxury Stay Website",
      description: "A modern hotel website displaying rooms, gallery, and contact details with an attractive landing section and smooth navigation.",
      detailedDescription: "An elegant and luxurious website for Hotel Sea View, designed to showcase the hotel's premium accommodations and services. The website features stunning visual galleries, detailed room descriptions, amenities information, and an easy-to-use booking interface. The design emphasizes the hotel's luxury brand while maintaining excellent user experience across all devices.",
      image: "/images/project3.png",
      link: "https://thehotelseaview.in",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Image Optimization", "Booking Integration", "Google Maps API"],
      category: "Hospitality Website",
      features: [
        "Interactive Room Gallery",
        "Online Booking System",
        "Amenities Showcase",
        "Location & Directions",
        "Contact & Inquiry Forms",
        "Responsive Mobile Design",
        "High-Quality Image Display",
        "Smooth Animations & Transitions"
      ],
      duration: "2.5 months",
      client: "Hotel Sea View",
      icon: Globe,
      color: "bg-amber-500"
    },
    {
      id: 3,
      title: "Kindness Towards Humanity Foundation",
      description: "A nonprofit organization website highlighting mission, team, gallery, and donation support with a user-friendly design.",
      detailedDescription: "A compassionate and impactful website for the Kindness Towards Humanity Foundation, designed to inspire visitors and facilitate donations. The platform effectively communicates the organization's mission, showcases their humanitarian work through galleries and stories, and provides secure donation options. The design balances emotional connection with clear calls-to-action.",
      image: "/images/project1.png",
      link: "https://kindnesstowardshumanity.in",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Payment Gateway Integration", "Content Management", "Social Media Integration"],
      category: "Nonprofit Website",
      features: [
        "Mission & Vision Pages",
        "Team & Volunteer Information",
        "Project Gallery & Stories",
        "Secure Donation System",
        "Event Calendar & Updates",
        "Contact & Volunteer Forms",
        "Social Media Integration",
        "Impact Reports & Transparency"
      ],
      duration: "3 months",
      client: "Kindness Towards Humanity Foundation",
      icon: Heart,
      color: "bg-red-500"
    },
    {
      id: 4,
      title: "Saibbyweb Office Management Dashboard",
      description: "A web-based system for managing employees, attendance, and documents with secure login and clean UI.",
      detailedDescription: "A comprehensive office management dashboard designed for Saibbyweb to streamline internal operations. The system includes employee management, attendance tracking, document storage, and administrative controls. Built with security and efficiency in mind, the dashboard provides a clean, intuitive interface for managing day-to-day office tasks and maintaining organizational records.",
      image: "/images/project4.png",
      link: "https://sw-office.vercel.app",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Authentication System", "Database Integration", "File Upload System", "Dashboard Analytics"],
      category: "Management System",
      features: [
        "Employee Management System",
        "Attendance Tracking & Reports",
        "Document Storage & Management",
        "Secure User Authentication",
        "Role-Based Access Control",
        "Dashboard Analytics",
        "File Upload & Download",
        "Admin Panel & Settings"
      ],
      duration: "4 months",
      client: "Saibbyweb",
      icon: Briefcase,
      color: "bg-purple-500"
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-6 leading-tight">
              Our Projects
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Showcasing innovative solutions across healthcare, hospitality, nonprofit, and enterprise sectors
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-12">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              const isExpanded = expandedProject === project.id;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row">
                      {/* Image Section */}
                      <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[400px]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-6 left-6 z-10">
                          <div className={`${project.color} text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg`}>
                            <IconComponent className="w-4 h-4" />
                            <span className="font-bold text-sm">{project.category}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="w-full lg:w-1/2 flex flex-col">
                        {/* Black Line Separator */}
                        <div className="w-full h-[2px] bg-black"></div>
                        
                        {/* Content Below Black Line with Hover Effect */}
                        <div className="p-6 sm:p-8 lg:p-10 flex flex-col group-hover:bg-gray-50 transition-colors duration-300">
                        {/* Header */}
                        <div className="mb-6">
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black mb-4 leading-tight">
                            {project.title}
                          </h2>
                          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Code2 className="w-5 h-5 text-gray-600" />
                            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Technologies</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1.5 bg-gray-100 text-gray-800 text-xs font-semibold rounded-md hover:bg-gray-200 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Project Meta */}
                        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="font-semibold">{project.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span className="font-semibold">{project.client}</span>
                          </div>
                        </div>

                        {/* Expandable Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mb-6"
                            >
                              <div className="pt-6 border-t border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-3 text-lg">Project Details</h3>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                  {project.detailedDescription}
                                </p>
                                
                                <div>
                                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    Key Features
                                  </h4>
                                  <div className="grid sm:grid-cols-2 gap-3">
                                    {project.features.map((feature, featureIndex) => (
                                      <div key={featureIndex} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-auto pt-6">
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
                          >
                            <span>Visit Website</span>
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                          <motion.button
                            onClick={() => toggleExpand(project.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <span>{isExpanded ? "Show Less" : "View Details"}</span>
                            <ArrowRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </motion.button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: "Projects Completed", value: "50+", icon: Briefcase },
              { label: "Happy Clients", value: "40+", icon: Users },
              { label: "Technologies Used", value: "30+", icon: Code2 },
              { label: "Years Experience", value: "5+", icon: Calendar }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-black mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ClientReviewsSection />
      <FAQSection />
    </div>
  );
}
