"use client";

import { Bot, Code2, Megaphone, Palette } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function TeamHero() {
  return (
    <PageHero
      variant="dark"
      eyebrow="Team"
      title={"Meet the Team behind NexGen."}
      highlight="NexGen."
      description="Engineers, designers, AI specialists, and marketers — a software development team building digital products for startups and growing brands."
      pills={[
        { label: "Engineers", icon: Code2 },
        { label: "Designers", icon: Palette },
        { label: "AI specialists", icon: Bot },
        { label: "Marketers", icon: Megaphone },
      ]}
      primaryCta={{ label: "Start a project", openContact: true }}
      secondaryCta={{ label: "Meet the team", href: "#team" }}
    />
  );
}
