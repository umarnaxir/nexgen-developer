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
import { ArticleSchema } from "@/lib/seo/structured-data";
import { seoConfig } from "@/lib/seo/config";

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

  // Convert date string to ISO format
  const publishedDate = new Date(blog.date).toISOString();
  const blogUrl = `${seoConfig.siteUrl}/blogs/${blog.slug}`;
  const blogImage = blog.images?.[0] 
    ? (blog.images[0].startsWith("http") ? blog.images[0] : `${seoConfig.siteUrl}${blog.images[0]}`)
    : undefined;

  return (
    <>
      <ArticleSchema
        title={blog.title}
        description={blog.excerpt}
        url={blogUrl}
        image={blogImage}
        publishedDate={publishedDate}
        author={blog.author}
        publisher={seoConfig.publisher}
      />
      <div className="min-h-screen">
        <article className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <BlogPostHero blog={blog} />
            <BlogPostContent blog={blog} />
            <RelatedBlogs relatedBlogs={relatedBlogs} />
            <BlogPostCTA />
          </div>
        </article>
      </div>
    </>
  );
}
