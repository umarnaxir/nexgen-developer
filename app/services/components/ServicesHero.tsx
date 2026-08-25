"use client";

import { Bot, Globe, Megaphone, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function ServicesHero() {
  return (
    <PageHero
      eyebrow="Services"
      title={["Software development", "services that scale."]}
      highlight="scale."
      description="Professional software development services in India. Custom products, AI, chatbots, SEO, and digital marketing in one studio. We ship work that looks premium and performs in the real world."
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
