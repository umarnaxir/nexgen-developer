"use client";

import React, { useState } from "react";
import { MapPin, Globe, Users, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const highlights = [
 {
 icon: MapPin,
 title: "Location",
 description: "We work remotely worldwide.",
 detail: "No fixed office - we collaborate from wherever we are, so your project gets attention across time zones.",
 },
 {
 icon: Globe,
 title: "Remote-first",
 description: "Fully distributed team.",
 detail: "Our entire workflow is built for remote collaboration. Fast communication, async updates, and flexible scheduling.",
 },
 {
 icon: Users,
 title: "Freelancer network",
 description: "Skilled experts on demand.",
 detail: "A curated team of freelancers in development, design, and marketing. Right skills, no long-term overhead.",
 },
 {
 icon: Zap,
 title: "Quick turnaround",
 description: "Agile and responsive.",
 detail: "Small, focused teams mean faster decisions and delivery. From idea to launch without the usual delays.",
 },
];

export default function ContactUsContent() {
 const [activeIndex, setActiveIndex] = useState<number | null>(null);
 const reduceMotion = useReducedMotion();

 return (
 <section className="section-y" data-aos="fade-up">
 <div className="text-center mb-8 sm:mb-12">
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient-light mb-3 sm:mb-4">
 Why work <span className="text-gradient-teal">with us</span>
 </h2>
 <p className="text-silver light:text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
 A remote team of freelancers ready to bring your ideas to life. Interactive, responsive, and focused on delivery.
 </p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
 {highlights.map((item, index) => {
 const Icon = item.icon;
 const isActive = activeIndex === index;
 return (
 <motion.button
 key={item.title}
 type="button"
 onClick={() => setActiveIndex(isActive ? null : index)}
 onMouseEnter={() => setActiveIndex(index)}
 onMouseLeave={() => setActiveIndex(null)}
 data-aos="fade-up"
 data-aos-delay={index * 70}
 whileHover={reduceMotion ? undefined : { y: -6 }}
 transition={{ type: "spring", stiffness: 400, damping: 28 }}
 className={`glass-card text-left w-full min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] p-6 sm:p-7 lg:p-8 rounded-2xl transition-[border-color,background-color,box-shadow] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
 isActive
 ? "border-gold/50 light:border-gold-light shadow-lg"
 : "hover:border-gold/40 light:hover:border-gold-light"
 }`}
 >
 <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
 <span className={`p-2.5 sm:p-3 rounded-xl border transition-colors duration-300 ${isActive ? "border-gold/40 light:border-gold-light bg-gold-dark text-white" : "border-gold/20 light:border-gold-light bg-gold/10 light:bg-gold-light text-gold light:text-gold-dark"}`}>
 <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
 </span>
 <h3 className="font-bold text-white light:text-gray-900 text-base sm:text-lg">{item.title}</h3>
 </div>
 <p className="text-silver-light light:text-gray-700 text-sm sm:text-base font-medium mb-2">{item.description}</p>
 <p className={`text-silver light:text-gray-600 text-sm sm:text-base transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-80"}`}>
 {item.detail}
 </p>
 </motion.button>
 );
 })}
 </div>
 </section>
 );
}
