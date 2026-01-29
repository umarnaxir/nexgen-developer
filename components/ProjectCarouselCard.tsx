"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Calendar, Users, Code2, ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCarouselCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  category: string;
  duration: string;
  client: string;
  icon: LucideIcon;
  color: string;
  slug: string;
}

export default function ProjectCarouselCard({
  title,
  description,
  image,
  link,
  technologies,
  category,
  duration,
  client,
  icon: IconComponent,
  color,
  slug,
}: ProjectCarouselCardProps) {
  return (
    <div className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Section - Left */}
        <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[400px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6 z-10">
            <div className={`${color} text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg`}>
              <IconComponent className="w-4 h-4" />
              <span className="font-bold text-sm">{category}</span>
            </div>
          </div>
        </div>

        {/* Content Section - Right (White Panel) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Black Line Separator */}
          <div className="w-full h-[2px] bg-black"></div>
          
          {/* Content Below Black Line */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col h-full group-hover:bg-gray-50 transition-colors duration-300">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                {description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, techIndex) => (
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
                <span className="font-semibold">{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-semibold">{client}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-auto pt-6">
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/projects`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
