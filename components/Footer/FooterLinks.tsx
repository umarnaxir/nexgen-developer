import React from "react";
import Link from "next/link";
import {
  Home,
  User,
  FolderKanban,
  Settings,
  Shield,
  FileText,
  BookOpen,
  Users,
  Globe,
  Smartphone,
  Cpu,
  MessageCircle,
  Wrench,
  Rocket,
  TrendingUp,
  Search,
  Share2,
  Palette,
  BarChart2,
  Target,
  LayoutGrid,
  Image as ImageIcon,
  DollarSign,
  Mail,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
  index?: number;
  /** Use grid layout for many links (e.g. service pages). e.g. "2" for grid-cols-2 */
  gridCols?: "2" | "3";
}

// Map link labels to icons: Quick/Other + Development + Digital Marketing services
const getIcon = (label: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    // Quick Links & Other Pages
    Home,
    "About Us": User,
    Projects: FolderKanban,
    Services: Settings,
    Pricing: DollarSign,
    "Privacy Policy": Shield,
    "Terms of Service": FileText,
    Blogs: BookOpen,
    Stories: ImageIcon,
    Posts: MessageCircle,
    Team: Users,
    "Contact Us": Mail,
    // Development Services
    "Website Development": Globe,
    "App Development": Smartphone,
    "AI & ML Solutions": Cpu,
    "Chatbot Development": MessageCircle,
    "Maintenance & Support": Wrench,
    "Deployment & DevOps": Rocket,
    // Digital Marketing Services
    "Digital Marketing": TrendingUp,
    "Search Engine Optimization": Search,
    "Social Media Marketing": Share2,
    "Graphic Designing": Palette,
    "Google Ads": BarChart2,
    "Meta Ads": Target,
  };
  return iconMap[label] || LayoutGrid;
};

export default function FooterLinks({ title, links, gridCols }: FooterLinksProps) {
  const listClass = gridCols
    ? `grid gap-x-4 gap-y-1.5 grid-cols-1 ${gridCols === "2" ? "sm:grid-cols-2" : "sm:grid-cols-3"}`
    : "flex flex-col space-y-2";

  return (
    <div className={title ? "" : "flex-row gap-4"}>
      {title && (
        <div className="mb-2">
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white light:text-gray-900">
            {title}
          </h3>
        </div>
      )}
      <div className={listClass}>
        {links.map((link) => {
          const Icon = getIcon(link.label);
          return (
            <div key={`${link.href}-${link.label}`}>
              <Link
                href={link.href}
                className="group relative inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-silver light:text-gray-600 py-1.5 w-fit transition-colors duration-200 hover:text-white light:hover:text-gold-dark"
              >
                <div className="flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                  <Icon className="w-4 h-4 text-gold light:text-gold-dark group-hover:text-gold light:group-hover:text-gold-dark transition-colors duration-200" />
                </div>
                <span className="block transition-colors duration-200 group-hover:text-white light:group-hover:text-gold-dark group-hover:translate-x-0.5">
                  {link.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
