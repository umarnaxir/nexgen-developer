import { Metadata } from "next";
import { getBlogPostSEO } from "@/lib/seo/page-seo";
import { blogPosts } from "./data";

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogPosts[slug];

  if (!blog) {
    return getBlogPostSEO({
      title: "Blog Post Not Found",
      description: "The blog post you are looking for could not be found.",
      slug: slug,
      publishedDate: new Date().toISOString(),
    });
  }

  // Convert date string to ISO format
  const publishedDate = new Date(blog.date).toISOString();

  return getBlogPostSEO({
    title: blog.title,
    description: blog.excerpt,
    slug: blog.slug,
    image: blog.images?.[0],
    publishedDate: publishedDate,
    author: blog.author,
    category: blog.category,
    keywords: blog.keywords,
  });
}

export default async function BlogLayout({ children, params }: BlogLayoutProps) {
  return <>{children}</>;
}
