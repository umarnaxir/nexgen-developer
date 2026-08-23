export type PlanId = "essential" | "growth" | "premium" | "enterprise";

export type PricingServiceType = "website" | "app" | "other";

export interface PricingPlan {
  id: PlanId;
  name: string;
  price: string;
  description: string;
  bestFor: string;
  timeline: string;
  deliverables: string[];
  ctaLabel: string;
  popular?: boolean;
}

export interface ServicePricingData {
  plans: PricingPlan[];
  intro: string;
  note?: string;
  enterpriseNote: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$180",
    description: "A clean business site to launch quickly.",
    bestFor: "Small businesses & first online presence",
    timeline: "5–6 working days",
    deliverables: [
      "Up to 4 pages",
      "Mobile-responsive layout",
      "Contact form + WhatsApp",
      "Basic SEO & speed setup",
      "1 revision included",
    ],
    ctaLabel: "Get started",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$360",
    description: "Built to generate leads and look premium.",
    bestFor: "Growing brands & service businesses",
    timeline: "9–12 working days",
    deliverables: [
      "Up to 8 pages",
      "Semi-custom UI for your brand",
      "Lead forms + Google Analytics",
      "Structured SEO & indexing",
      "3 revisions included",
    ],
    ctaLabel: "Get started",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$600",
    description: "Fully custom site with admin control.",
    bestFor: "Startups & long-term brands",
    timeline: "14–18 working days",
    deliverables: [
      "Custom UI/UX (no templates)",
      "CMS / admin panel",
      "Payments + advanced SEO",
      "Performance & security setup",
      "Unlimited revisions (in scope)",
    ],
    ctaLabel: "Get started",
  },
];

export const appPricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Basic",
    price: "$4,999",
    description: "A focused MVP to validate your product idea.",
    bestFor: "Early-stage founders & MVPs",
    timeline: "6–8 weeks",
    deliverables: [
      "Up to 5 core screens",
      "iOS or Android (cross-platform)",
      "Basic auth & onboarding",
      "Push notifications setup",
      "App store submission support",
    ],
    ctaLabel: "Get started",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$9,999",
    description: "Production-ready app with core business features.",
    bestFor: "Startups ready to launch & grow",
    timeline: "10–14 weeks",
    deliverables: [
      "Up to 12 screens + flows",
      "Login, signup & payments",
      "Backend API integration",
      "Analytics & crash reporting",
      "Custom UI/UX design",
    ],
    ctaLabel: "Get started",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19,999",
    description: "Scalable product with admin, real-time & advanced logic.",
    bestFor: "Funded startups & complex products",
    timeline: "~5 months",
    deliverables: [
      "Custom backend + admin panel",
      "Real-time chat / live updates",
      "Role-based access & security",
      "CI/CD & deployment support",
      "Ongoing launch support",
    ],
    ctaLabel: "Get started",
  },
];

export const otherPricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    price: "From $150",
    description: "One focused deliverable, done properly.",
    bestFor: "SEO audit, logo, chatbot, or small AI task",
    timeline: "5–7 working days",
    deliverables: [
      "Single service scope",
      "Clear deliverables doc",
      "Basic revisions",
      "Handover & documentation",
    ],
    ctaLabel: "Get quote",
  },
  {
    id: "growth",
    name: "Growth",
    price: "From $350",
    description: "Bundled services or a short retainer.",
    bestFor: "SEO + content, design + social, etc.",
    timeline: "10–14 working days",
    deliverables: [
      "2–3 related services",
      "Strategy & progress reporting",
      "Multiple revision rounds",
      "Optional ongoing support",
    ],
    ctaLabel: "Get quote",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "Custom",
    description: "Larger campaigns or multi-service projects.",
    bestFor: "AI/ML, marketing, design at scale",
    timeline: "Scoped per project",
    deliverables: [
      "Custom scope & timeline",
      "Dedicated resource",
      "Priority communication",
      "Flexible delivery plan",
    ],
    ctaLabel: "Talk to us",
  },
];

export function getPricingForService(
  service: PricingServiceType
): ServicePricingData {
  switch (service) {
    case "app":
      return {
        plans: appPricingPlans,
        intro:
          "App builds take longer than websites — design, development, testing, and store launch all need time. Timelines below are typical for a well-scoped product.",
        note: "Premium apps often run around 5 months from kickoff to launch, depending on features and approvals.",
        enterpriseNote:
          "Building a multi-platform or enterprise app? We’ll scope a custom timeline and dedicated team.",
      };
    case "other":
      return {
        plans: otherPricingPlans,
        intro:
          "Pricing for SEO, design, AI, chatbots, and marketing depends on scope. These are starting points — we confirm after a quick call.",
        enterpriseNote:
          "Need a custom package across multiple services? We’ll put together a quote that fits your goals.",
      };
    case "website":
    default:
      return {
        plans: pricingPlans,
        intro:
          "Website packages are fixed starting prices. Final scope is confirmed on a short call — no surprises.",
        note: "50% advance to start, 50% at deployment. See our Terms for payment details.",
        enterpriseNote:
          "Need a custom or enterprise website? We’ll scope pricing around your requirements.",
      };
  }
}

export const serviceLabels: Record<PricingServiceType, string> = {
  website: "Website",
  app: "App",
  other: "Other",
};
