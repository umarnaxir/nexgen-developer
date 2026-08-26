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
      <p className="text-center text-text-gray">No blog posts published yet.</p>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <div className="space-y-5 sm:space-y-10">
      <FeaturedBlogCard blog={featured} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
        {rest.map((blog, index) => (
          <BlogCard key={blog.slug} blog={blog} index={index} />
        ))}
      </div>
    </div>
  );
}
