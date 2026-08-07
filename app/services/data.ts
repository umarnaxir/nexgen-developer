/**
 * Centralized services data - derived from config (admin-managed JSON).
 */

import {
  getServicesForListing,
  type ServiceListingItem,
  type ServiceCategory,
} from "./config";

export type { ServiceListingItem, ServiceCategory };

/** Services for main listing - used by ServicesList with tabbed categories */
export function getServicesListing() {
  return getServicesForListing();
}

/** @deprecated Use getServicesListing() for fresh admin data */
export const servicesForListing = getServicesForListing();

/** Flat services list for simple grids */
export function getServicesCardList() {
  return getServicesForListing()
    .filter((s) =>
      [
        "website-development",
        "app-development",
        "ai-ml",
        "chatbot-development",
        "maintenance-support",
        "deployment-devops",
        "digital-marketing",
        "graphic-designing",
      ].includes(s.slug)
    )
    .map((s) => ({
      title: s.title,
      href: s.href,
      description: s.longDescription,
      features: s.features,
      technologies: s.tools,
      image: s.image,
    }));
}

/** @deprecated Use getServicesCardList() */
export const services = getServicesCardList();
