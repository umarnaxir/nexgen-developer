import { notFound } from "next/navigation";
import BlogPostHero from "./components/BlogPostHero";
import BlogPostContent from "./components/BlogPostContent";
import RelatedBlogs from "./components/RelatedBlogs";
import BlogPostCTA from "./components/BlogPostCTA";
import { ArticleSchema, BreadcrumbSchema, WebPageSchema } from "@/lib/seo/structured-data";
import { seoConfig } from "@/lib/seo/config";
import { getBlogBySlug, getBlogs } from "@/lib/content/store";
import { buildSeoDescription, buildSeoTitle } from "@/lib/seo/utils";
import type { BlogPostType } from "./data";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function toBlogPostType(blog: Awaited<ReturnType<typeof getBlogBySlug>>): BlogPostType | null {
  if (!blog) return null;
  return {
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    date: blog.date,
    category: blog.category,
    author: blog.author,
    readTime: blog.readTime,
    images: blog.images?.length ? blog.images : blog.image ? [blog.image] : [],
    keywords: blog.keywords || [],
    internalLink: blog.internalLink || {
      href: "/services",
      text: "Explore our services",
    },
    externalLink: blog.externalLink || { href: "", text: "" },
    sections:
      blog.sections?.length > 0
        ? blog.sections
        : blog.content
          ? [{ type: "text", content: blog.content }]
          : [],
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [blogRaw, allBlogs] = await Promise.all([
    getBlogBySlug(slug),
    getBlogs(),
  ]);

  if (!blogRaw || blogRaw.status !== "published") {
    notFound();
  }

  const blog = toBlogPostType(blogRaw);
  if (!blog) notFound();

  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== slug)
    .slice(0, 3)
    .map((b) => ({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      date: b.date,
      category: b.category,
      image: b.image,
    }));

  const publishedDate = new Date(blogRaw.publishDate || blog.date).toISOString();
  const modifiedDate = publishedDate;
  const path = `/blogs/${blog.slug}`;
  const blogUrl = `${seoConfig.siteUrl}${path}`;

  return (
    <>
      <WebPageSchema
        name={buildSeoTitle(blog.title)}
        description={buildSeoDescription(blog.excerpt)}
        url={path}
        datePublished={publishedDate}
        dateModified={modifiedDate}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blogs" },
          { name: blog.title, url: path },
        ]}
      />
      <ArticleSchema
        title={blog.title}
        description={blog.excerpt}
        url={blogUrl}
        publishedDate={publishedDate}
        modifiedDate={modifiedDate}
        author={blog.author}
        publisher={seoConfig.publisher}
        image={blog.images[0] || blogRaw.image}
        keywords={blog.keywords}
      />
      <div className="min-h-screen">
        <article className="section-y !pt-[calc(var(--site-nav-height)+2rem)]">
          <div className="section-container">
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
