export type PlanId = "essential" | "growth" | "premium" | "enterprise";

export type PricingServiceType = "website" | "app" | "other";

export interface PricingPlan {
  id: PlanId;
  name: string;
  price: string;
  description: string;
  bestFor: string;
  deliverables: string[];
  quote: string;
  accent: "green" | "blue" | "purple" | "orange";
  ctaLabel: string;
  ctaType: "get-started" | "contact-sales";
  popular?: boolean;
}

export interface ServicePricingData {
  plans: PricingPlan[];
  enterprise: PricingPlan;
}

// ----- Website development pricing (default) -----
export const pricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "ESSENTIAL",
    price: "₹14,999",
    description: "Entry-level professional business website",
    bestFor: "Small businesses, local brands, first serious online presence",
    deliverables: [
      "Up to 4 pages (Home, About, Services, Contact)",
      "Mobile-responsive, modern layout",
      "Clean professional UI (studio-grade template)",
      "Brand color alignment",
      "Contact form with email notification",
      "WhatsApp chat integration",
      "Google Maps integration",
      "Basic on-page SEO (meta tags, headings)",
      "SSL & hosting configuration support",
      "Speed-optimized build",
      "1 revision",
      "Delivery: 5-6 working days",
    ],
    quote: "A credible, professional online presence that builds trust.",
    accent: "green",
    ctaLabel: "Get Started",
    ctaType: "get-started",
  },
  {
    id: "growth",
    name: "GROWTH",
    price: "₹29,999",
    description: "Semi-custom business website",
    bestFor: "Growing businesses, service providers, startups",
    deliverables: [
      "Everything in ESSENTIAL",
      "Up to 8 pages",
      "Semi-custom UI tailored to brand identity",
      "Improved UX for lead conversion",
      "Professional typography & layout system",
      "Advanced lead capture forms",
      "Backend lead routing (email / dashboard)",
      "Social media & Google review integration",
      "Google Analytics setup",
      "Structured SEO (H1-H3, image optimization)",
      "Sitemap & search engine indexing",
      "Performance optimization",
      "3 revisions",
      "Delivery: 9-12 working days",
    ],
    quote: "A growth-ready website focused on leads, credibility, and visibility.",
    accent: "blue",
    ctaLabel: "Get Started",
    ctaType: "get-started",
    popular: true,
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "₹49,999",
    description: "Fully custom, startup-grade website",
    bestFor: "Serious brands, funded startups, long-term businesses",
    deliverables: [
      "Everything in GROWTH",
      "Fully custom UI/UX (no templates)",
      "Brand-aligned design system",
      "Conversion-optimized layouts",
      "Visual consistency across all pages",
      "CMS / Admin panel for content control",
      "Blog / content publishing system",
      "Payment gateway integration",
      "Advanced lead management",
      "Funnel-based landing sections",
      "SEO-ready site architecture",
      "Core Web Vitals optimization",
      "Security hardening & backups",
      "Basic brand kit (colors, fonts, usage)",
      "Conversion tracking setup",
      "Priority support",
      "Unlimited revisions (within scope)",
      "Delivery: 14-18 working days",
    ],
    quote: "A scalable, high-performance digital asset built for long-term growth.",
    accent: "purple",
    ctaLabel: "Get Started",
    ctaType: "get-started",
  },
];

export const enterprisePlan: PricingPlan = {
  id: "enterprise",
  name: "ENTERPRISE",
  price: "Custom",
  description: "Enterprise-grade custom solution",
  bestFor: "Enterprises, large-scale businesses, complex integrations",
  deliverables: [
    "Everything in PREMIUM",
    "Multi-platform integration (CRM, ERP, etc.)",
    "Custom dashboard & analytics",
    "Advanced security & compliance",
    "Performance optimization for high traffic",
    "Ongoing consultation & strategy",
    "Training & documentation",
    "Flexible delivery timeline",
    "Custom enterprise architecture",
    "Advanced API development",
    "Multi-user role management",
    "Scalable cloud infrastructure setup",
    "Dedicated project manager",
    "White-glove support & maintenance",
    "Custom SLA & response times",
    "Post-launch optimization & support",
  ],
  quote:
    "A tailored enterprise solution designed to meet your unique business requirements and scale with your growth.",
  accent: "orange",
  ctaLabel: "Contact Sales",
  ctaType: "contact-sales",
};

// ----- App development pricing -----
export const appPricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "STARTER",
    price: "₹24,999",
    description: "Entry-level cross-platform or single-platform app",
    bestFor: "MVPs, small businesses, simple apps",
    deliverables: [
      "Up to 5 screens",
      "Cross-platform (React Native / Flutter) or native",
      "Basic UI/UX, responsive layout",
      "Offline support (basic)",
      "Push notifications setup",
      "App store / Play Store listing support",
      "1 revision",
      "Delivery: 6-8 working days",
    ],
    quote: "A solid first version to validate your idea and reach users.",
    accent: "green",
    ctaLabel: "Get Started",
    ctaType: "get-started",
  },
  {
    id: "growth",
    name: "GROWTH",
    price: "₹49,999",
    description: "Feature-rich business or consumer app",
    bestFor: "Startups, product companies, apps with auth & payments",
    deliverables: [
      "Everything in STARTER",
      "Up to 12 screens",
      "Auth (login, signup, social login)",
      "Backend API integration",
      "In-app purchases or payment gateway",
      "Analytics & crash reporting",
      "Custom UI/UX design",
      "3 revisions",
      "Delivery: 10-14 working days",
    ],
    quote: "A growth-ready app with core features to acquire and retain users.",
    accent: "blue",
    ctaLabel: "Get Started",
    ctaType: "get-started",
    popular: true,
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "₹89,999",
    description: "Fully custom, scalable app with advanced features",
    bestFor: "Funded startups, marketplaces, apps with complex logic",
    deliverables: [
      "Everything in GROWTH",
      "Unlimited screens (within scope)",
      "Custom backend / admin panel",
      "Real-time features (chat, live updates)",
      "Advanced security & role-based access",
      "Performance optimization",
      "CI/CD & deployment support",
      "Unlimited revisions (within scope)",
      "Delivery: 18-24 working days",
    ],
    quote: "A scalable, production-grade app built for long-term growth.",
    accent: "purple",
    ctaLabel: "Get Started",
    ctaType: "get-started",
  },
];

export const appEnterprisePlan: PricingPlan = {
  id: "enterprise",
  name: "ENTERPRISE",
  price: "Custom",
  description: "Enterprise-grade custom app & integrations",
  bestFor: "Enterprises, multi-app ecosystems, complex integrations",
  deliverables: [
    "Everything in PREMIUM",
    "Multi-platform (iOS, Android, Web, PWA)",
    "CRM / ERP / internal tool integration",
    "Custom analytics & dashboards",
    "White-label or multi-tenant support",
    "Dedicated project manager",
    "SLA & priority support",
    "Post-launch optimization & maintenance",
  ],
  quote:
    "A tailored enterprise app solution that integrates with your systems and scales with your business.",
  accent: "orange",
  ctaLabel: "Contact Sales",
  ctaType: "contact-sales",
};

// ----- Other services (AI/ML, Chatbot, SEO, Graphic Design, etc.) -----
export const otherPricingPlans: PricingPlan[] = [
  {
    id: "essential",
    name: "ESSENTIAL",
    price: "From ₹9,999",
    description: "Focused deliverables for a single service",
    bestFor: "Single project: SEO audit, logo, chatbot, or small AI feature",
    deliverables: [
      "One primary service (SEO / Design / Chatbot / AI feature)",
      "Clear scope & deliverables",
      "Basic revisions",
      "Documentation or handover",
      "Delivery: 5-7 working days",
    ],
    quote: "Quality output for one clear goal without the full-project overhead.",
    accent: "green",
    ctaLabel: "Get Quote",
    ctaType: "get-started",
  },
  {
    id: "growth",
    name: "GROWTH",
    price: "From ₹24,999",
    description: "Bundled or ongoing service package",
    bestFor: "Multiple services or ongoing work (e.g. SEO + content, design + social)",
    deliverables: [
      "Everything in ESSENTIAL",
      "2–3 services or ongoing retainer",
      "Strategy & reporting",
      "Multiple revisions",
      "Ongoing support option",
      "Delivery: 10-14 working days",
    ],
    quote: "More value when you combine services or need ongoing support.",
    accent: "blue",
    ctaLabel: "Get Quote",
    ctaType: "get-started",
    popular: true,
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: "Custom",
    description: "Full-service or custom project",
    bestFor: "Large campaigns, custom AI/ML, full brand + digital strategy",
    deliverables: [
      "Everything in GROWTH",
      "Custom scope (AI/ML, Chatbot, SEO, Graphic Design, DevOps)",
      "Dedicated resource or team",
      "Unlimited revisions (within scope)",
      "Priority support",
      "Flexible timeline",
    ],
    quote: "A tailored package for complex or long-term engagements.",
    accent: "purple",
    ctaLabel: "Contact Us",
    ctaType: "get-started",
  },
];

export const otherEnterprisePlan: PricingPlan = {
  id: "enterprise",
  name: "ENTERPRISE",
  price: "Custom",
  description: "Enterprise-grade custom solution",
  bestFor: "Enterprises, agencies, large-scale campaigns or integrations",
  deliverables: [
    "Everything in PREMIUM",
    "Multi-brand or multi-region",
    "Custom SLA & dedicated support",
    "Training & documentation",
    "Ongoing optimization & strategy",
  ],
  quote:
    "A tailored enterprise solution for AI/ML, Chatbot, SEO, Design, or other services.",
  accent: "orange",
  ctaLabel: "Contact Sales",
  ctaType: "contact-sales",
};

// ----- Get pricing data by service type -----
export function getPricingForService(service: PricingServiceType): ServicePricingData {
  switch (service) {
    case "website":
      return { plans: pricingPlans, enterprise: enterprisePlan };
    case "app":
      return { plans: appPricingPlans, enterprise: appEnterprisePlan };
    case "other":
      return { plans: otherPricingPlans, enterprise: otherEnterprisePlan };
    default:
      return { plans: pricingPlans, enterprise: enterprisePlan };
  }
}

export const serviceLabels: Record<PricingServiceType, string> = {
  website: "Website development",
  app: "App development",
  other: "Other services",
};
