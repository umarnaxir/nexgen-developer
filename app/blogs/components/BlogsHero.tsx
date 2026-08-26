"use client";

import { BookOpen, BrainCircuit, PenLine, Search } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function BlogsHero() {
  return (
    <PageHero
      size="compact"
      eyebrow="Blog"
      title="NexGen insights."
      highlight="insights."
      description="Practical guides from NexGen Developers on software, AI, search, chatbots, and design, written from shipped work."
      pills={[
        { label: "Software", icon: BookOpen },
        { label: "AI", icon: BrainCircuit },
        { label: "SEO", icon: Search },
        { label: "Product", icon: PenLine },
      ]}
      primaryCta={{ label: "Start a project", openContact: true }}
      secondaryCta={{ label: "Read articles", href: "#blog-list" }}
    />
  );
}
