"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SkillsSection() {
  const skills = [
    { 
      name: "HTML", 
      iconUrl: "https://www.svgrepo.com/show/452228/html-5.svg"
    },
    { 
      name: "CSS", 
      iconUrl: "https://www.svgrepo.com/show/452185/css-3.svg"
    },
    { 
      name: "JavaScript", 
      iconUrl: "https://www.svgrepo.com/show/452045/js.svg"
    },
    { 
      name: "React", 
      iconUrl: "https://www.svgrepo.com/show/452092/react.svg"
    },
    { 
      name: "Next.js", 
      iconUrl: "https://www.svgrepo.com/show/452307/nextjs.svg"
    },
    { 
      name: "React Native", 
      iconUrl: "https://www.svgrepo.com/show/452092/react.svg"
    },
    { 
      name: "Python", 
      iconUrl: "https://www.svgrepo.com/show/452091/python.svg"
    },
    { 
      name: "AI/ML", 
      iconUrl: "https://www.svgrepo.com/show/452195/artificial-intelligence.svg"
    },
    { 
      name: "FastAPI", 
      iconUrl: "https://www.svgrepo.com/show/452091/python.svg"
    },
    { 
      name: "Flask", 
      iconUrl: "https://www.svgrepo.com/show/452091/python.svg"
    },
    { 
      name: "Django", 
      iconUrl: "https://www.svgrepo.com/show/452091/python.svg"
    },
    { 
      name: "Computer Vision", 
      iconUrl: "https://www.svgrepo.com/show/452195/artificial-intelligence.svg"
    },
    { 
      name: "SQL", 
      iconUrl: "https://www.svgrepo.com/show/452228/database.svg"
    },
    { 
      name: "MongoDB", 
      iconUrl: "https://www.svgrepo.com/show/452091/mongodb.svg"
    },
    { 
      name: "Canva", 
      iconUrl: "https://www.svgrepo.com/show/452091/design.svg"
    },
    { 
      name: "Wordpress", 
      iconUrl: "https://www.svgrepo.com/show/452091/wordpress.svg"
    },
    { 
      name: "Figma", 
      iconUrl: "https://www.svgrepo.com/show/452091/figma.svg"
    },
    { 
      name: "Adobe PhotoShop", 
      iconUrl: "https://www.svgrepo.com/show/452091/adobe-photoshop.svg"
    }
  ];

  return (
    <section id="skills" className="py-12 sm:py-14 md:py-16 lg:py-16 bg-white">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-2 sm:mb-3 px-4">
            AREA OF EXPERTISE
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto px-4">
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
                    unoptimized 
                  />
                </div>
              </div>
              
              {/* Skill name */}
              <h3 className="text-xs sm:text-sm font-bold text-black uppercase tracking-wide">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
