"use client";

import { BadgeCheck, CalendarClock, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";

export default function PricingHero() {
  return (
    <PageHero
      eyebrow="Pricing"
      title={["Software development", "pricing, made clear."]}
      highlight="clear."
      description="Starting prices for software development services from NexGen Developers. We confirm scope and timeline before work begins. No surprises."
      pills={[
        { label: "Fixed starting prices", icon: BadgeCheck },
        { label: "Scope call before kickoff", icon: CalendarClock },
        { label: "50% advance, 50% at launch", icon: ShieldCheck },
      ]}
      primaryCta={{ label: "Start a project", openContact: true }}
      secondaryCta={{ label: "View packages", href: "#pricing" }}
    />
  );
}
