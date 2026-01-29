"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { teamMembers, containerVariants } from "../data";
import TeamCard from "./TeamCard";

export default function TeamGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="pb-8 sm:pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              index={index}
              setHoveredCard={setHoveredCard}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
