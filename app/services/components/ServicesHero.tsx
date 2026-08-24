"use client";

import { Bot, Globe, Megaphone, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function ServicesHero() {
  return (
    <PageHero
      eyebrow="Services"
      title={["Everything you need", "to launch and scale."]}
      highlight="scale."
      description="Strategy, design, engineering, and growth in one studio. We ship websites, apps, AI tools, and campaigns that look premium and perform in the real world."
      pills={[
        { label: "Web & Apps", icon: Globe },
        { label: "AI & Chatbots", icon: Bot },
        { label: "Growth", icon: Megaphone },
        { label: "Care", icon: Wrench },
      ]}
      primaryCta={{ label: "Start a project", openContact: true }}
      secondaryCta={{ label: "Browse services", href: "#services-list" }}
    />
  );
}
