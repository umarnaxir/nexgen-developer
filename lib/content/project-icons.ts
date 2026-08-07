import {
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  Dumbbell,
  Eye,
  Globe,
  GraduationCap,
  Heart,
  MapPin,
  Share2,
  ShoppingBag,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  ShoppingBag,
  Dumbbell,
  BookOpen,
  Building2,
  Globe,
  Heart,
  Briefcase,
  MapPin,
  Brain,
  Eye,
  Trophy,
  Share2,
  BarChart3,
  Users,
};

export function resolveProjectIcon(name?: string): LucideIcon {
  if (!name) return Globe;
  return ICON_MAP[name] ?? Globe;
}

export const PROJECT_ICON_OPTIONS = Object.keys(ICON_MAP);
