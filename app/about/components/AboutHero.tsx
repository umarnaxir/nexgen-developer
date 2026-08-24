"use client";

import { Layers, Lightbulb, Rocket, Users } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      eyebrow="About"
      title={["A studio built", "to launch and grow."]}
      highlight="grow."
      description="A creative studio helping startups and local brands build, launch, and grow, with craft, speed, and clarity."
      pills={[
        { label: "Craft", icon: Lightbulb },
        { label: "Speed", icon: Rocket },
        { label: "Clarity", icon: Layers },
        { label: "Collective", icon: Users },
      ]}
      primaryCta={{ label: "Start a project", openContact: true }}
      secondaryCta={{ label: "Our story", href: "#about-story" }}
    />
  );
}
