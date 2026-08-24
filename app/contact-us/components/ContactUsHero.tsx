"use client";

import { Clock, Mail, MapPin, MessageSquare } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function ContactUsHero() {
  return (
    <PageHero
      eyebrow="Contact"
      title={["Let's start", "a conversation."]}
      highlight="conversation."
      description="Tell us about your project. We'll get back within one business day."
      pills={[
        { label: "1-day reply", icon: Clock },
        { label: "Clear next steps", icon: MessageSquare },
        { label: "Direct to the studio", icon: Mail },
        { label: "Baramulla, India", icon: MapPin },
      ]}
      primaryCta={{ label: "Start a project", openContact: true }}
      secondaryCta={{ label: "Send a message", href: "#contact" }}
    />
  );
}
