"use client";

import { Briefcase, Building2, HandHeart, HeartPulse } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function ProjectsHero() {
  return (
    <PageHero
      eyebrow="Work"
      title={"Projects that ship and scale."}
      highlight="scale."
      description="A software development portfolio across education, e-commerce, fitness, real estate, healthcare, and enterprise. Real products, not mockups."
      pills={[
        { label: "Healthcare", icon: HeartPulse },
        { label: "Hospitality", icon: Building2 },
        { label: "Nonprofit", icon: HandHeart },
        { label: "Enterprise", icon: Briefcase },
      ]}
      primaryCta={{ label: "Start a project", openContact: true }}
      secondaryCta={{ label: "Browse work", href: "#projects" }}
    />
  );
}
