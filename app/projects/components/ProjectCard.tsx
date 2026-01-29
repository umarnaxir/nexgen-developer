"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Calendar, Users, Code2, CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    detailedDescription: string;
    image: string;
    link: string;
    technologies: string[];
    category: string;
    features: string[];
    duration: string;
    client: string;
    icon: LucideIcon;
    color: string;
  };
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ProjectCard({ project, index, isExpanded, onToggleExpand }: ProjectCardProps) {
  const IconComponent = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[400px]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-6 left-6 z-10">
              <div className={`${project.color} text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg`}>
                <IconComponent className="w-4 h-4" />
                <span className="font-bold text-sm">{project.category}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="w-full h-[2px] bg-black"></div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col group-hover:bg-gray-50 transition-colors duration-300">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black mb-4 leading-tight">
                  {project.title}
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

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
                  onClick={onToggleExpand}
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
}
