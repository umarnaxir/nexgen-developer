"use client";

import { Bot, Cloud, Globe, Megaphone } from "lucide-react";
import PageHero from "@/components/PageHero";

type ServicesHeroProps = {
  title: string;
};

export default function ServicesHero({ title }: ServicesHeroProps) {
  return (
    <PageHero
      eyebrow="Services"
      title={title}
      highlight="NexGen Developers"
      description="Compare NexGen Developers’ full software development and marketing services: websites, apps, AI/ML, chatbots, DevOps, SEO, and paid campaigns. One studio for build, launch, and growth — get a free quote when you are ready."
      pills={[
        { label: "Development", icon: Globe },
        { label: "AI & ML", icon: Bot },
        { label: "DevOps", icon: Cloud },
        { label: "Marketing", icon: Megaphone },
      ]}
      primaryCta={{ label: "Start a project", openContact: true }}
      secondaryCta={{ label: "Browse services", href: "#services-list" }}
      size="compact"
    />
  );
}
