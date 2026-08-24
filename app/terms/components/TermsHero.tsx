"use client";

import { FileText, Handshake, Scale } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function TermsHero() {
  return (
    <PageHero
      eyebrow="Terms"
      title={["The rules we", "work by."]}
      highlight="work by."
      meta="Last updated: February 2, 2026"
      description="Please read these terms carefully before using our services. By accessing or using NexGen, you agree to be bound by these terms."
      pills={[
        { label: "Clear terms", icon: FileText },
        { label: "Fair use", icon: Scale },
        { label: "Honest work", icon: Handshake },
      ]}
      primaryCta={{ label: "Contact us", openContact: true }}
      secondaryCta={{ label: "Read terms", href: "#terms" }}
    />
  );
}
