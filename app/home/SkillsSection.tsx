"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SkillsSection() {
  const skills = [
    { 
      name: "HTML", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1216/1216733.png"
    },
    { 
      name: "CSS", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/732/732190.png"
    },
    { 
      name: "JavaScript", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
    },
    { 
      name: "React", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1183/1183672.png"
    },
    { 
      name: "Next.js", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png"
    },
    { 
      name: "React Native", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/1183/1183672.png"
    },
    { 
      name: "Python", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png"
    },
    { 
      name: "AI/ML", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
    },
    { 
      name: "FastAPI", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png"
    },
    { 
      name: "Flask", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png"
    },
    { 
      name: "Django", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png"
    },
    { 
      name: "Computer Vision", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
    },
    { 
      name: "SQL", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2772/2772128.png"
    },
    { 
      name: "MongoDB", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968342.png"
    },
    { 
      name: "Canva", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png"
    },
    { 
      name: "Wordpress", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/174/174881.png"
    },
    { 
      name: "Figma", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
    },
    { 
      name: "Adobe PhotoShop", 
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png"
    }
  ];

  return (
    <section id="skills" className="py-12 sm:py-14 md:py-16 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
            -SKILLS
          </p>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-2 sm:mb-3 px-4"
            style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
          >
            AREA OF EXPERTISE
          </h2>
          <p 
            className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto px-4"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
          >
            Let's kickstart your project and collaborate to build something amazing. We bring our expertise to make your next project shine.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 px-4">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white p-4 sm:p-5 rounded-xl shadow-lg text-center border-2 border-gray-200"
            >
              {/* Icon container */}
              <div className="relative flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center relative text-black">
                  <Image 
                    src={skill.iconUrl} 
                    alt={skill.name} 
                    width={56} 
                    height={56} 
                    className="w-full h-full object-contain brightness-0" 
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' }}
                    unoptimized 
                  />
                </div>
              </div>
              
              {/* Skill name */}
              <h3 
                className="text-xs sm:text-sm font-bold text-black uppercase tracking-wide"
                style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.6)' }}
              >
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
