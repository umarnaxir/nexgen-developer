"use client";

import { Briefcase, Building2, HandHeart, HeartPulse } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function ProjectsHero() {
  return (
    <PageHero
      eyebrow="Work"
      title={["Work that", "ships and scales."]}
      highlight="scales."
      description="Showcasing innovative solutions across healthcare, hospitality, nonprofit, and enterprise sectors."
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
