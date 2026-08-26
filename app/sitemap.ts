import type { MetadataRoute } from "next";
import { getAllServiceUrls } from "@/app/services/config";
import { getBlogs, getServices } from "@/lib/content/store";
import { seoConfig } from "@/lib/seo/config";
import type { ServiceRecord } from "@/lib/content/types";

const SITE = seoConfig.siteUrl;
const UPDATED = new Date("2026-08-26T00:00:00.000Z");

function absolute(path: string) {
  return path === "/" ? `${SITE}/` : `${SITE}${path}`;
}

function url(
  path: string,
  options: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority" | "lastModified">
): MetadataRoute.Sitemap[number] {
  return {
    url: absolute(path),
    lastModified: options.lastModified || UPDATED,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

function servicePath(service: ServiceRecord) {
  if (service.parentSlug === "digital-marketing") {
    return `/services/digital-marketing/${service.slug}`;
  }
  return `/services/${service.slug}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, services] = await Promise.all([getBlogs(), getServices()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    url("/", { changeFrequency: "weekly", priority: 1 }),
    url("/services", { changeFrequency: "weekly", priority: 0.9 }),
    url("/projects", { changeFrequency: "weekly", priority: 0.8 }),
    url("/pricing", { changeFrequency: "monthly", priority: 0.8 }),
    url("/about", { changeFrequency: "monthly", priority: 0.7 }),
    url("/team", { changeFrequency: "monthly", priority: 0.6 }),
    url("/blogs", { changeFrequency: "weekly", priority: 0.8 }),
    url("/contact-us", { changeFrequency: "monthly", priority: 0.8 }),
    url("/privacy", { changeFrequency: "yearly", priority: 0.3 }),
    url("/terms", { changeFrequency: "yearly", priority: 0.3 }),
  ];

  const liveServicePaths = services.map(servicePath);
  const servicePaths = liveServicePaths.length
    ? liveServicePaths
    : getAllServiceUrls().map((item) => item.url);

  const serviceRoutes = Array.from(new Set(servicePaths)).map((path) =>
    url(path, { changeFrequency: "monthly", priority: 0.85 })
  );

  const blogRoutes = blogs.map((blog) =>
    url(`/blogs/${blog.slug}`, {
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: new Date(blog.publishDate || blog.date),
    })
  );

  const seen = new Set<string>();
  return [...staticRoutes, ...serviceRoutes, ...blogRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
