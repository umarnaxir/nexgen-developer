import { Metadata } from "next";
import { getBlogPostSEO } from "@/lib/seo/page-seo";
import { getBlogBySlug } from "@/lib/content/store";

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status !== "published") {
    return getBlogPostSEO({
      title: "Blog Post Not Found",
      description: "The blog post you are looking for could not be found.",
      slug,
      publishedDate: new Date().toISOString(),
    });
  }

  const publishedDate = new Date(blog.publishDate || blog.date).toISOString();

  return getBlogPostSEO({
    title: blog.title,
    description: blog.excerpt,
    slug: blog.slug,
    publishedDate,
    author: blog.author,
    category: blog.category,
    keywords: blog.keywords,
  });
}

export default async function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}
