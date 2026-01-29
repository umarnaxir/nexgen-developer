"use client";

import { useState } from "react";
import { projects } from "../data";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section className="py-8 lg:py-12" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="space-y-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedProject === project.id}
              onToggleExpand={() => toggleExpand(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
