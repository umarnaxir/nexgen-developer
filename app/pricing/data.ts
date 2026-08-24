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
    name: "SEO & Growth",
    price: "On request",
    description: "Audits, technical SEO, and content systems quoted after we see the site and goals.",
    bestFor: "Local brands & content sites",
    timeline: "Scoped per brief",
    deliverables: [
      "Site & keyword review",
      "Technical SEO plan",
      "On-page recommendations",
      "Reporting cadence on agreement",
    ],
    ctaLabel: "Get a quote",
  },
  {
    id: "growth",
    name: "AI & Models",
    price: "On request",
    description: "Chatbots, custom models, and AI features are scoped to data, tools, and integrations.",
    bestFor: "Product teams adding AI",
    timeline: "Scoped per brief",
    deliverables: [
      "Use-case & model fit",
      "Chatbot or workflow build",
      "Tool / API integrations",
      "Handover & usage guide",
    ],
    ctaLabel: "Get a quote",
    popular: true,
  },
  {
    id: "premium",
    name: "Design & more",
    price: "On request",
    description: "Brand, campaigns, and mixed scopes, priced once the requirement is clear.",
    bestFor: "Launches & multi-service work",
    timeline: "Scoped per brief",
    deliverables: [
      "Brand or campaign scope",
      "Design + production plan",
      "Optional ads or social",
      "Flexible delivery timeline",
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
          "App builds take longer than websites. Design, development, testing, and store launch all need time. Timelines below are typical for a well-scoped product.",
        note: "Premium apps often run around 5 months from kickoff to launch, depending on features and approvals.",
        enterpriseNote:
          "Building a multi-platform or enterprise app, or adding AI on top? We scope a custom timeline and quote once the requirement is agreed.",
      };
    case "other":
      return {
        plans: otherPricingPlans,
        intro:
          "SEO, AI models, chatbots, design, and marketing are not listed as fixed prices. We quote after a short call once the requirement is clear.",
        note: "These cards are starting scopes only. Final pricing is based on requirements, not a published rate card.",
        enterpriseNote:
          "Need SEO plus AI, or a mixed campaign? Send the brief and we will price the work to that scope. Nothing is locked in until we agree the requirement.",
      };
    case "website":
    default:
      return {
        plans: pricingPlans,
        intro:
          "Website packages are fixed starting prices. Final scope is confirmed on a short call. No surprises.",
        note: "50% advance to start, 50% at deployment. See our Terms for payment details.",
        enterpriseNote:
          "Need a custom or enterprise website, or extras like SEO and AI? We scope pricing around the actual requirement, not a one-size rate.",
      };
  }
}

export const serviceLabels: Record<PricingServiceType, string> = {
  website: "Website",
  app: "App",
  other: "Other",
};
