"use client";

import { useState } from "react";
import { projects } from "../data";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section className="section-light section-y relative overflow-hidden border-t border-black/[0.06]">
      <div className="section-container relative">
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedProject === project.id}
              onToggleExpand={() =>
                setExpandedProject(expandedProject === project.id ? null : project.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
