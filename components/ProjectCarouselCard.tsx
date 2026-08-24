"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Calendar, Users, Code2, ArrowRight, LucideIcon } from "lucide-react";

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
  slug,
}: ProjectCarouselCardProps) {
  return (
    <div className="group glass-card overflow-hidden rounded-2xl sm:rounded-3xl h-full">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Image Section - Left */}
        <div className="relative w-full lg:w-1/2 h-48 sm:h-72 lg:h-auto min-h-[280px] sm:min-h-[360px] lg:min-h-[400px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* gradient veil to blend image into the dark card */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:bg-gradient-to-r" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10">
            <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/50 px-3 py-1.5 text-white shadow-lg backdrop-blur sm:px-4 sm:py-2">
              <IconComponent className="w-4 h-4 text-gold" />
              <span className="font-bold text-xs sm:text-sm">{category}</span>
            </div>
          </div>
        </div>

        {/* Content Section - Right */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Teal accent separator */}
          <div className="h-px w-full bg-gradient-to-r from-gold/60 via-gold-dark/30 to-transparent" />

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-10 flex flex-col h-full">
            {/* Header */}
            <div className="mb-3 sm:mb-6">
              <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-white light:text-gray-900 mb-2 sm:mb-4 leading-tight">
                {title}
              </h2>
              <p className="text-silver light:text-gray-600 text-sm sm:text-lg leading-relaxed mb-3 sm:mb-6">
                {description}
              </p>
            </div>

            {/* Tech Stack - Hidden on mobile */}
            <div className="mb-3 sm:mb-6 hidden sm:block">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-5 h-5 text-gold" />
                <h3 className="font-bold text-silver-light light:text-gray-700 text-sm uppercase tracking-wide">Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1.5 border border-white/10 light:border-gray-200 bg-white/[0.04] light:bg-gray-100 text-silver-light light:text-gray-700 text-xs font-semibold rounded-md transition-colors hover:border-gold/30 light:hover:border-gold-light hover:text-white light:hover:text-gold-dark"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-silver-dark light:text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold/80" />
                <span className="font-semibold">{duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold/80" />
                <span className="font-semibold">{client}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto pt-4 sm:pt-6">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-bold rounded-lg bg-gradient-to-r from-gold-dark to-gold-dark text-white shadow-lg shadow-gold-dark/25 transition-all hover:from-gold hover:to-gold-dark hover:scale-105 active:scale-95"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href={`/projects`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-bold rounded-lg border border-white/15 light:border-gray-200 bg-white/[0.04] light:bg-white light:shadow-sm text-white light:text-gray-900 backdrop-blur transition-all hover:border-gold/40 light:hover:border-gold-light hover:bg-white/[0.07] light:hover:bg-gray-100 hover:scale-105 active:scale-95"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
