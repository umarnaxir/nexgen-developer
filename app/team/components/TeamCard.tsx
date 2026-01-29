"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, LucideIcon } from "lucide-react";
import { cardVariants } from "../data";

interface TeamCardProps {
  member: {
    name: string;
    title: string;
    description: string;
    image: string;
    company: string;
    icon: LucideIcon;
    color: string;
  };
  index: number;
  setHoveredCard: (index: number | null) => void;
}

export default function TeamCard({ member, index, setHoveredCard }: TeamCardProps) {
  const IconComponent = member.icon;

  return (
    <motion.article
      variants={cardVariants}
      className="relative group"
      onHoverStart={() => setHoveredCard(index)}
      onHoverEnd={() => setHoveredCard(null)}
    >
      <motion.div
        className="relative border border-white/20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black transition-all duration-300 hover:border-white/40 hover:shadow-xl hover:shadow-white/10"
        whileHover={{ y: -8, scale: 1.02 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
        
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 z-10">
          <motion.div 
            className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white z-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>

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
}
