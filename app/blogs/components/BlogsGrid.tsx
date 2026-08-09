"use client";

import BlogCard from "./BlogCard";
import FeaturedBlogCard from "./FeaturedBlogCard";
import type { Blog } from "@/lib/content/types";

type BlogsGridProps = {
  blogs: Blog[];
};

export default function BlogsGrid({ blogs }: BlogsGridProps) {
  if (!blogs.length) {
    return (
      <p className="text-center text-white/60">No blog posts published yet.</p>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3"
      data-aos="fade-up"
    >
      <div className="lg:col-span-3">
        <FeaturedBlogCard blog={featured} />
      </div>
      {rest.map((blog, index) => (
        <BlogCard key={blog.slug} blog={blog} index={index} />
      ))}
    </div>
  );
}
