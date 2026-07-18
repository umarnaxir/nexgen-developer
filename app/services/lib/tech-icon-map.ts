import {
  BarChart3,
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers,
  Megaphone,
  Palette,
  Search,
  Server,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

const EXACT_MAP: Record<string, LucideIcon> = {
  react: Code2,
  "next.js": Globe,
  "node.js": Server,
  python: Code2,
  django: Server,
  flask: Server,
  "express.js": Server,
  mongodb: Database,
  postgresql: Database,
  mysql: Database,
  "react native": Smartphone,
  flutter: Smartphone,
  swift: Smartphone,
  kotlin: Smartphone,
  java: Code2,
  firebase: Zap,
  aws: Cloud,
  azure: Cloud,
  "google cloud": Cloud,
  gcp: Cloud,
  docker: Layers,
  kubernetes: Layers,
  jenkins: GitBranch,
  "github actions": GitBranch,
  nginx: Server,
  tensorflow: BrainCircuit,
  pytorch: BrainCircuit,
  "scikit-learn": BrainCircuit,
  opencv: BrainCircuit,
  nltk: BrainCircuit,
  "openai api": Bot,
  openai: Bot,
  dialogflow: Bot,
  rasa: Bot,
  webhooks: Zap,
  apis: Zap,
  figma: Palette,
  canva: Palette,
  "adobe photoshop": Palette,
  illustrator: Palette,
  "after effects": Palette,
  "premiere pro": Palette,
  "google analytics": BarChart3,
  "google search console": Search,
  semrush: Search,
  ahrefs: Search,
  "google ads": Megaphone,
  "google tag manager": BarChart3,
  "meta business suite": Share2,
  "facebook ads": Share2,
  "facebook pixel": Share2,
  "instagram ads": Share2,
  linkedin: Share2,
  hootsuite: Share2,
  buffer: Share2,
  "monitoring tools": BarChart3,
  "backup solutions": Shield,
  "all technologies": Sparkles,
};

export function getTechIcon(name: string): LucideIcon {
  const normalized = name.trim().toLowerCase();

  if (EXACT_MAP[normalized]) return EXACT_MAP[normalized];

  if (normalized.includes("react")) return Code2;
  if (normalized.includes("node")) return Server;
  if (normalized.includes("python")) return Code2;
  if (normalized.includes("mongo") || normalized.includes("sql") || normalized.includes("postgres"))
    return Database;
  if (normalized.includes("cloud") || normalized.includes("aws") || normalized.includes("azure"))
    return Cloud;
  if (normalized.includes("docker") || normalized.includes("kubernetes")) return Layers;
  if (normalized.includes("mobile") || normalized.includes("ios") || normalized.includes("android"))
    return Smartphone;
  if (normalized.includes("ai") || normalized.includes("ml") || normalized.includes("tensor"))
    return BrainCircuit;
  if (normalized.includes("openai") || normalized.includes("chatbot") || normalized.includes("bot"))
    return Bot;
  if (normalized.includes("google") || normalized.includes("analytics") || normalized.includes("ads"))
    return BarChart3;
  if (normalized.includes("meta") || normalized.includes("facebook") || normalized.includes("social"))
    return Share2;
  if (normalized.includes("figma") || normalized.includes("design") || normalized.includes("adobe"))
    return Palette;
  if (normalized.includes("seo") || normalized.includes("search")) return Search;
  if (normalized.includes("api")) return Zap;
  if (normalized.includes("monitor") || normalized.includes("backup")) return Shield;
  if (normalized.includes("maintain") || normalized.includes("support")) return Wrench;

  return Sparkles;
}
