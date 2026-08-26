"use client";

import { Eye, Lock, Shield } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function PrivacyHero() {
  return (
    <PageHero
      eyebrow="Privacy"
      title={["Your data.", "Our responsibility."]}
      highlight="responsibility."
      meta="Last updated: February 2, 2026"
      description="Your privacy matters. This policy explains how we collect, use, protect, and share your personal information when you browse our website, read our blog, or contact us about our services."
      pills={[
        { label: "Protected", icon: Shield },
        { label: "Encrypted", icon: Lock },
        { label: "Transparent", icon: Eye },
      ]}
      primaryCta={{ label: "Contact us", openContact: true }}
      secondaryCta={{ label: "Read policy", href: "#privacy" }}
    />
  );
}
