"use client";

import {
  Globe,
  Smartphone,
  Cpu,
  MessageCircle,
  TrendingUp,
  Palette,
  Wrench,
  Server,
  Search,
  Share2,
  MousePointerClick,
  Facebook,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Cpu,
  MessageCircle,
  TrendingUp,
  Palette,
  Wrench,
  Server,
  Search,
  Share2,
  MousePointerClick,
  Facebook,
};

interface ServiceIconProps {
  name?: string;
  className?: string;
}

export default function ServiceIcon({ name, className }: ServiceIconProps) {
  const Icon = name ? iconMap[name] : Globe;
  if (!Icon) return null;
  return <Icon className={className ?? "w-8 h-8"} />;
}
