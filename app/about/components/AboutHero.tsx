"use client";

import { Layers, Lightbulb, Rocket, Users } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      eyebrow="About"
      title={["A software development", "studio that ships."]}
      highlight="ships."
      description="NexGen Developers is a Baramulla software development studio helping startups and local brands with custom software, AI, chatbots, and digital marketing — from first brief to what ships after launch."
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
