import {
  Globe,
  Smartphone,
  BrainCircuit,
  MessageSquare,
  TrendingUp,
  Infinity,
  Server,
  type LucideIcon,
} from "lucide-react";

export type FeaturedProject = {
  id: number;
  title: string;
  tagline: string;
  image: string;
  link: string;
  category: string;
};

export type HomeService = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  image: string;
  highlights: string[];
};

export type HeroService = {
  title: string;
  description: string;
  ctaLabel: string;
  icon: LucideIcon;
  href: string;
  highlights: string[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: 11,
    title: "Exceptional IAS Academy",
    tagline: "A coaching platform built to convert visitors into enrolled students.",
    image: "/images/projects/exceptionalias.png",
    link: "https://www.exceptionaliasacademy.com/",
    category: "Education",
  },
  {
    id: 12,
    title: "ShoesHub Poonch",
    tagline: "A refined e-commerce experience for a modern footwear brand.",
    image: "/images/projects/shoeshub.png",
    link: "https://shoeshubpoonch.vercel.app/",
    category: "E-Commerce",
  },
  {
    id: 13,
    title: "FitSpace Gym",
    tagline: "An energetic digital presence that drives memberships.",
    image: "/images/projects/fitspacegym.png",
    link: "https://fitspacegym.vercel.app/",
    category: "Fitness",
  },
  {
    id: 14,
    title: "Citadel Library",
    tagline: "A calm, structured website for a premium study space.",
    image: "/images/projects/citadel.png",
    link: "https://citadellibrary.vercel.app/",
    category: "Library",
  },
  {
    id: 15,
    title: "PlaceHub",
    tagline: "Buy, rent, and sell verified properties with confidence.",
    image: "/images/projects/placehub.png",
    link: "https://findyourperfectplace.vercel.app/",
    category: "Real Estate",
  },
];

export const homeServices: HomeService[] = [
  {
    title: "Website Development",
    description:
      "Fast, responsive websites engineered for growth, conversion, and long-term performance.",
    icon: Globe,
    href: "/services/website-development",
    image: "/images/services/website.png",
    highlights: ["SEO Ready", "Mobile First", "Fast Loading", "Secure Build"],
  },
  {
    title: "App Development",
    description:
      "Mobile and web apps built to scale with your business, users, and product roadmap.",
    icon: Smartphone,
    href: "/services/app-development",
    image: "/images/services/app.png",
    highlights: ["Cross Platform", "Scalable", "Offline Support", "Push Alerts"],
  },
  {
    title: "AI & ML Solutions",
    description:
      "Intelligent systems that automate workflows, analyze data, and accelerate decisions.",
    icon: BrainCircuit,
    href: "/services/ai-ml",
    image: "/images/services/ai.png",
    highlights: ["Automation", "Smart Insights", "Data Driven", "Custom Models"],
  },
  {
    title: "Chatbot Development",
    description:
      "Conversational AI that supports customers around the clock with natural, helpful responses.",
    icon: MessageSquare,
    href: "/services/chatbot-development",
    image: "/images/services/chatbot.png",
    highlights: ["24/7 Support", "Multi-channel", "NLP Powered", "Easy Integration"],
  },
  {
    title: "Digital Marketing",
    description:
      "Strategies that amplify visibility, generate qualified leads, and grow your brand online.",
    icon: TrendingUp,
    href: "/services/digital-marketing",
    image: "/images/services/digital-marketing.png",
    highlights: ["Lead Growth", "Brand Reach", "Analytics Ready", "Paid Campaigns"],
  },
  {
    title: "Deployment & DevOps",
    description:
      "Reliable infrastructure, CI/CD pipelines, and cloud deployments that keep products shipping.",
    icon: Infinity,
    href: "/services/deployment-devops",
    image: "/images/services/deployment-and-devOps .png",
    highlights: ["Zero Downtime", "Cloud Native", "Auto Scaling", "CI/CD Ready"],
  },
];

export const heroServices: HeroService[] = [
  {
    title: "Web Development",
    description:
      "High-performance websites crafted with clean code, modern design and conversion-focused experiences that drive results.",
    ctaLabel: "Build My Website",
    icon: Globe,
    href: "/services/website-development",
    highlights: [
      "Custom Websites",
      "E-Commerce Solutions",
      "CMS Development",
      "Performance Optimized",
      "SEO Ready",
    ],
  },
  {
    title: "Mobile Applications",
    description:
      "Native and cross-platform apps designed for speed, usability and scale — from first tap to long-term growth.",
    ctaLabel: "Build My App",
    icon: Smartphone,
    href: "/services/app-development",
    highlights: [
      "iOS & Android",
      "Cross Platform",
      "Offline Support",
      "Push Notifications",
      "Scalable Backend",
    ],
  },
  {
    title: "AI & Machine Learning",
    description:
      "Intelligent systems that automate operations, surface insights and help your team make faster, better decisions.",
    ctaLabel: "Explore AI Solutions",
    icon: BrainCircuit,
    href: "/services/ai-ml",
    highlights: [
      "Custom Models",
      "Process Automation",
      "Predictive Insights",
      "Data Pipelines",
      "ML Ops",
    ],
  },
  {
    title: "AI Chatbots",
    description:
      "Conversational AI that answers customers instantly, qualifies leads and works around the clock across your channels.",
    ctaLabel: "Build My Chatbot",
    icon: MessageSquare,
    href: "/services/chatbot-development",
    highlights: [
      "24/7 Support",
      "Multi-channel",
      "NLP Powered",
      "Lead Qualification",
      "Easy Integration",
    ],
  },
  {
    title: "Digital Growth",
    description:
      "SEO, paid media and content strategies that increase visibility, generate qualified leads and grow your brand.",
    ctaLabel: "Grow My Brand",
    icon: TrendingUp,
    href: "/services/digital-marketing",
    highlights: [
      "SEO & Content",
      "Paid Campaigns",
      "Analytics Ready",
      "Brand Reach",
      "Conversion Funnels",
    ],
  },
  {
    title: "Deployment & DevOps",
    description:
      "Cloud infrastructure, CI/CD and monitoring that keep products shipping reliably with zero-drama releases.",
    ctaLabel: "Ship With Confidence",
    icon: Server,
    href: "/services/deployment-devops",
    highlights: [
      "CI/CD Pipelines",
      "Cloud Native",
      "Auto Scaling",
      "Zero Downtime",
      "Observability",
    ],
  },
];

export const heroAvatars = [
  { src: "/images/team/me.JPG", alt: "NexGen team member" },
  { src: "/images/team/waseem.jpeg", alt: "NexGen team member" },
  { src: "/images/team/faizan.png", alt: "NexGen team member" },
];

export const footerExtraLinks = [{ label: "Team", href: "/team" }];

/** @deprecated Prefer getContactInfo() from @/lib/content/store */
export const footerContactPhone = "+916006161726";
/** @deprecated Prefer getContactInfo() from @/lib/content/store */
export const footerContactEmail = "workwithnexgen@gmail.com";
/** @deprecated Prefer getContactInfo() from @/lib/content/store */
export const footerAddress = {
  region: "Jammu and Kashmir, India",
  line: "Baramulla, Jammu and Kashmir, India",
};