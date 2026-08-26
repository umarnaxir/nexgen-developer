"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/content/types";

type ProjectsListProps = {
  projects: Project[];
};

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-light section-y relative overflow-hidden border-t border-black/[0.06]">
      <div className="section-container relative">
        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedProject === project.id}
              onToggleExpand={() =>
                setExpandedProject(
                  expandedProject === project.id ? null : project.id
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
