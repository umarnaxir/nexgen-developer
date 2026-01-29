"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { blogPosts, allBlogs } from "./data";
import BlogPostHero from "./components/BlogPostHero";
import BlogPostContent from "./components/BlogPostContent";
import RelatedBlogs from "./components/RelatedBlogs";
import BlogPostCTA from "./components/BlogPostCTA";
import BlogPostNotFound from "./components/BlogPostNotFound";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  const blog = blogPosts[slug];
  const relatedBlogs = allBlogs.filter(b => b.slug !== slug).slice(0, 3);

  if (!blog) {
    return <BlogPostNotFound />;
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <BlogPostHero blog={blog} />
          <BlogPostContent blog={blog} />
          <RelatedBlogs relatedBlogs={relatedBlogs} />
          <BlogPostCTA />
        </div>
      </article>
    </div>
  );
}
