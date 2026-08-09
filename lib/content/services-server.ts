import "server-only";
import { readFileSync, existsSync } from "fs";
import path from "path";
import type { ServiceRecord } from "./types";
import { serviceToDefinition } from "./services-runtime";
import {
  DIGITAL_MARKETING_SERVICES,
  TOP_LEVEL_SERVICES,
  getServiceHref,
  type ServiceCategory,
  type ServiceDefinition,
  type ServiceListingItem,
  type SubServiceDefinition,
  type NavServiceItem,
} from "@/app/services/config";

function readServicesFromDisk(): ServiceRecord[] {
  const file = path.join(process.cwd(), "content", "services.json");
  if (!existsSync(file)) return [];
  try {
    return JSON.parse(readFileSync(file, "utf8")) as ServiceRecord[];
  } catch {
    return [];
  }
}

function activeServices() {
  return readServicesFromDisk().filter((s) => s.enabled !== false);
}

export function getTopLevelServiceMap(): Record<string, ServiceDefinition> {
  const services = activeServices().filter((s) => !s.parentSlug);
  if (!services.length) return TOP_LEVEL_SERVICES;
  const map: Record<string, ServiceDefinition> = {};
  for (const service of services) {
    map[service.slug] = serviceToDefinition(service) as ServiceDefinition;
  }
  return map;
}

export function getDigitalMarketingServiceMap(): Record<
  string,
  SubServiceDefinition
> {
  const services = activeServices().filter(
    (s) => s.parentSlug === "digital-marketing"
  );
  if (!services.length) return DIGITAL_MARKETING_SERVICES;
  const map: Record<string, SubServiceDefinition> = {};
  for (const service of services) {
    map[service.slug] = serviceToDefinition(service) as SubServiceDefinition;
  }
  return map;
}

export function getTopLevelServiceServer(
  slug: string
): ServiceDefinition | undefined {
  return getTopLevelServiceMap()[slug];
}

export function getDigitalMarketingServiceServer(
  subSlug: string
): SubServiceDefinition | undefined {
  return getDigitalMarketingServiceMap()[subSlug];
}

export function getRelatedServicesUpToSixServer(
  relatedSlugs: string[] | undefined,
  excludeSlug?: string
): ServiceDefinition[] {
  const TOP = getTopLevelServiceMap();
  const DM = getDigitalMarketingServiceMap();
  const lookup = (slug: string) => TOP[slug] || DM[slug];

  let result = (relatedSlugs || [])
    .map(lookup)
    .filter((s): s is ServiceDefinition => Boolean(s))
    .filter((s) => s.slug !== excludeSlug);

  if (result.length >= 6) return result.slice(0, 6);
  const seen = new Set(result.map((s) => s.slug));

  for (const def of [...Object.values(TOP), ...Object.values(DM)]) {
    if (result.length >= 6) break;
    if (def.slug === excludeSlug || seen.has(def.slug)) continue;
    result.push(def);
    seen.add(def.slug);
  }
  return result.slice(0, 6);
}

export function getServicesForListingServer(): ServiceListingItem[] {
  const categories: Record<string, ServiceCategory> = {
    "website-development": "development",
    "app-development": "development",
    "ai-ml": "development",
    "chatbot-development": "development",
    "digital-marketing": "digital-marketing",
    seo: "digital-marketing",
    "social-media-marketing": "digital-marketing",
    "graphic-designing": "digital-marketing",
    "google-ads": "digital-marketing",
    "meta-ads": "digital-marketing",
    "maintenance-support": "support",
    "deployment-devops": "support",
  };

  const TOP = getTopLevelServiceMap();
  const DM = getDigitalMarketingServiceMap();
  const items: ServiceListingItem[] = [];

  for (const def of Object.values(TOP)) {
    items.push({
      slug: def.slug,
      title: def.label,
      shortDescription: def.content.description.slice(0, 120) + "...",
      longDescription: def.content.description,
      features: def.content.benefits,
      benefits: def.content.benefits,
      process: def.content.process,
      tools: def.content.technologies ?? "",
      faqs: def.content.faqs ?? [],
      image: def.content.image ?? "/images/services/website.png",
      href: getServiceHref(def),
      icon: def.icon,
      category: categories[def.slug] ?? "development",
      useCases: def.content.useCases,
      expectedResults: def.content.expectedResults,
    });
  }

  for (const def of Object.values(DM)) {
    items.push({
      slug: def.slug,
      title: def.label,
      shortDescription: def.content.description.slice(0, 120) + "...",
      longDescription: def.content.description,
      features: def.content.benefits,
      benefits: def.content.benefits,
      process: def.content.process,
      tools: def.content.technologies ?? "",
      faqs: def.content.faqs ?? [],
      image: def.content.image ?? "/images/services/website.png",
      href: getServiceHref(def),
      icon: def.icon,
      category: "digital-marketing",
      useCases: def.content.useCases,
      expectedResults: def.content.expectedResults,
    });
  }

  return items;
}

export function getServicesNavItemsServer(): NavServiceItem[] {
  const TOP = getTopLevelServiceMap();
  const DM = getDigitalMarketingServiceMap();

  return Object.keys(TOP).map((slug) => {
    const def = TOP[slug];
    if (slug === "digital-marketing") {
      const children = Object.keys(DM).map((subSlug) => {
        const sub = DM[subSlug];
        return {
          label:
            subSlug === "seo" ? "Search Engine Optimization" : sub.label,
          href: `/services/digital-marketing/${subSlug}`,
        };
      });
      return { label: def.label, href: `/services/${slug}`, children };
    }
    return { label: def.label, href: `/services/${slug}` };
  });
}
