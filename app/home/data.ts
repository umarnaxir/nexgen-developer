import {
  Globe,
  Smartphone,
  BrainCircuit,
  MessageSquare,
  TrendingUp,
  Infinity,
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

export const featuredProjects: FeaturedProject[] = [
  {
    id: 11,
    title: "Exceptional IAS Academy",
    tagline: "A coaching platform built to convert visitors into enrolled students.",
    image: "/images/projects/exceptional.png",
    link: "https://exceptionaliasacademy.vercel.app/",
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
    image: "/images/projects/citadil.png",
    link: "https://citadellibrary.vercel.app/",
    category: "Library",
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

export const footerExtraLinks = [{ label: "Team", href: "/team" }];

export const footerContactPhone = "+916006161726";
export const footerContactEmail = "info@nexgendevelopers.in";
export const footerAddress = {
  region: "Kashmir, India",
  line: "Baramulla, Jammu and Kashmir, India",
};