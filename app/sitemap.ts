import type { MetadataRoute } from "next";
import { getAllServiceUrls } from "@/app/services/config";
import { getBlogs } from "@/lib/content/store";
import { seoConfig } from "@/lib/seo/config";

const SITE = seoConfig.siteUrl;
const UPDATED = new Date("2026-08-25T00:00:00.000Z");

function url(
  path: string,
  options: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority" | "lastModified">
): MetadataRoute.Sitemap[number] {
  return {
    url: path === "/" ? `${SITE}/` : `${SITE}${path}`,
    lastModified: options.lastModified || UPDATED,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getBlogs();

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

  const serviceRoutes = getAllServiceUrls().map((service) =>
    url(service.url, { changeFrequency: "monthly", priority: 0.85 })
  );

  const blogRoutes = blogs.map((blog) =>
    url(`/blogs/${blog.slug}`, {
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: new Date(blog.publishDate || blog.date),
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
