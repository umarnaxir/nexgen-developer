"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ContactModal from "@/components/modals/ContactModal";
import { ArrowRight, Building2, Code2, Brain, Search, Layers } from "lucide-react";

const teamMembers = [
  {
    name: "Umar Nazir",
    title: "Software Engineer",
    description:
      "Umar Nazir is a Software Engineer and SEO Executive at NexGen Developer and a full-time employee at Saibbyweb. He leads the NexGen team with a vision to deliver scalable and high-quality digital solutions.",
    image: "/images/me.JPG",
    company: "Saibbyweb",
    icon: Code2,
    color: "from-blue-500/10 to-blue-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Khalid Jan",
    title: "Back-End Engineer",
    description:
      "Khalid Jan is a Back-End Engineer at Harmukh Technologies, specializing in secure APIs, server-side development, and scalable backend systems.",
    image: "/images/khalid.jpeg",
    company: "Harmukh Technologies",
    icon: Layers,
    color: "from-purple-500/10 to-purple-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Syed Owais Qadri",
    title: "AI Engineer",
    description:
      "Syed Owais Qadri is an AI Engineer at Saibbyweb with experience in machine learning, data analysis, and intelligent automation.",
    image: "/images/owais.jpg",
    company: "Saibbyweb",
    icon: Brain,
    color: "from-green-500/10 to-green-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Owais Tariq Lone",
    title: "AI Engineer",
    description:
      "Owais Tariq Lone is an AI Engineer at Fractal and also works as an AI Engineer at NexGen Developer, focusing on smart, data-driven solutions.",
    image: "/images/ovais-tariq.jpeg",
    company: "Fractal AI",
    icon: Brain,
    color: "from-cyan-500/10 to-cyan-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },  
  {
    name: "Mohsin Jan",
    title: "Digital Marketing Analyst",
    description:
      "Mohsin Jan is an Digital Marketing Analyst based in Hyderabad, helping businesses improve online visibility and organic growth.",
    image: "/images/mohsin.jpeg",
    company: "Bitlogic Systems",
    icon: Search,
    color: "from-orange-500/10 to-orange-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Waseem Tariq",
    title: "Full Stack Software Engineer",
    description:
      "Waseem Tariq is a Full Stack Software Engineer experienced in building end-to-end web applications using modern frontend and backend technologies.",
    image: "/images/waseem.jpeg",
    company: "Freelance",
    icon: Code2,
    color: "from-pink-500/10 to-pink-600/10",
    socials: {
      facebook: "https://www.facebook.com/people/NexGen-Developers/61572910985245/",
      instagram: "https://www.instagram.com/nexgendevelopers_/",
      twitter: "#",
      linkedin: "#",
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TeamPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.section 
        className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-12 md:pb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet the NexGen Team
          </motion.h1>
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Meet the talented professionals behind NexGen Developer — a collaborative group of engineers, designers, AI specialists, and SEO experts working across leading companies and contributing part-time as a unified freelance team to build innovative digital solutions.
          </motion.p>
        </div>
      </motion.section>

      {/* Team grid */}
      <section className="pb-8 sm:pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member, index) => {
              const IconComponent = member.icon;
              const isHovered = hoveredCard === index;
              
              return (
                <motion.article
                  key={member.name}
                  variants={cardVariants}
                  className="relative group"
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <motion.div
                    className="relative border border-white/20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black transition-all duration-300 hover:border-white/40 hover:shadow-xl hover:shadow-white/10"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                    
                    {/* Image Section */}
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 z-10">
                      {/* Top icon badge */}
                      <motion.div 
                        className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white z-20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.div>

                      {/* Main Content */}
                      <div className="space-y-2 sm:space-y-3">
                        <motion.h3 
                          className="text-lg sm:text-xl font-bold text-white"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
                          {member.name}
                        </motion.h3>
                        <motion.p 
                          className="text-sm sm:text-base text-gray-300 font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.45 }}
                        >
                          {member.title}
                        </motion.p>
                        <motion.div 
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-400"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{member.company}</span>
                        </motion.div>
                        <motion.p 
                          className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.55 }}
                        >
                          {member.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Privacy Note */}
      <motion.section 
        className="pt-4 sm:pt-6 pb-8 sm:pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            className="bg-gray-900/50 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm"
            whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Additional Team Members
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              NexGen Developer also collaborates with several other skilled professionals. Due to privacy and confidentiality reasons, their details are not publicly listed.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Ready to work with us?
          </motion.h2>
          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors mb-3 sm:mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <span>Get started</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          <motion.p 
            className="text-gray-400 text-sm sm:text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Let&apos;s build something amazing together.
          </motion.p>
        </div>
      </motion.section>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
