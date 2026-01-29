"use client";

import { blogs } from "../data";
import BlogCard from "./BlogCard";

export default function BlogsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} index={index} />
      ))}
    </div>
  );
}
