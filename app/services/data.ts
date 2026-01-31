/**
 * Centralized services data - derived from config.
 * Single source of truth for Services listing page and dynamic pages.
 */

import {
  getServicesForListing,
  type ServiceListingItem,
  type ServiceCategory,
} from "./config";

export type { ServiceListingItem, ServiceCategory };

/** Services for main listing - used by ServicesList with tabbed categories */
export const servicesForListing = getServicesForListing();

/** Flat services list (top-level only) for simple grids - maps to legacy ServiceCard shape */
export const services = getServicesForListing()
  .filter((s) => ["website-development", "app-development", "ai-ml", "chatbot-development", "maintenance-support", "deployment-devops", "digital-marketing", "graphic-designing"].includes(s.slug))
  .map((s) => ({
    title: s.title,
    href: s.href,
    description: s.longDescription,
    features: s.features,
    technologies: s.tools,
    image: s.image,
  }));
