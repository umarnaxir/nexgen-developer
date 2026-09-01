import { notFound } from "next/navigation";
import BlogPostHero from "./components/BlogPostHero";
import BlogPostContent from "./components/BlogPostContent";
import BlogPostSidebar from "./components/BlogPostSidebar";
import GetStartedCTA from "@/components/GetStartedCTA";
import { ArticleSchema, BreadcrumbSchema, WebPageSchema } from "@/lib/seo/structured-data";
import { seoConfig } from "@/lib/seo/config";
import { getBlogBySlug, getBlogs } from "@/lib/content/store";
import { buildSeoDescription, buildSeoTitle } from "@/lib/seo/utils";
import { buildBlogToc, type BlogPostType } from "./data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

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
    relatedLinks: blog.relatedLinks,
    faqs: blog.faqs,
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

  const others = allBlogs.filter((item) => item.slug !== slug);
  const sameCategory = others.filter((item) => item.category === blog.category);
  const rest = others.filter((item) => item.category !== blog.category);
  const relatedBlogs = [...sameCategory, ...rest].slice(0, 4).map((item) => ({
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    date: item.date,
    category: item.category,
    image: item.image,
  }));

  const categories = Array.from(new Set(allBlogs.map((item) => item.category))).sort();
  const toc = buildBlogToc(blog.sections);

  const usefulLinks: { href: string; text: string; external?: boolean }[] = [];
  const seenHrefs = new Set<string>();
  const pushLink = (href: string, text: string, external?: boolean) => {
    if (!href || !text || seenHrefs.has(href)) return;
    seenHrefs.add(href);
    usefulLinks.push({ href, text, external });
  };

  for (const link of blog.relatedLinks || []) {
    pushLink(link.href, link.text);
  }
  pushLink(blog.internalLink.href, blog.internalLink.text);
  if (blog.externalLink.href && blog.externalLink.text) {
    pushLink(blog.externalLink.href, blog.externalLink.text, true);
  }
  pushLink("/services", "Explore our services");
  pushLink("/contact-us", "Contact NexGen Developers");
  pushLink("/blogs", "All blog articles");

  const publishedDate = new Date(blogRaw.publishDate || blog.date).toISOString();
  const modifiedDate = publishedDate;
  const path = `/blogs/${blog.slug}`;
  const blogUrl = `${seoConfig.siteUrl}${path}`;

  return (
    <>
      <WebPageSchema
        name={buildSeoTitle(blogRaw.seoTitle || blog.title)}
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
        title={blogRaw.seoTitle || blog.title}
        description={blog.excerpt}
        url={blogUrl}
        publishedDate={publishedDate}
        modifiedDate={modifiedDate}
        author={blog.author}
        publisher={seoConfig.publisher}
        image={blog.images[0] || blogRaw.image}
        keywords={blog.keywords}
      />
      <main className="min-h-screen">
        <article className="min-w-0 pt-[calc(var(--site-nav-height)+2.5rem)] pb-8 sm:pt-[calc(var(--site-nav-height)+2.75rem)] sm:pb-10 lg:pt-[calc(var(--site-nav-height)+3rem)] lg:pb-12">
          <div className="page-gutter">
            <div className="content-cap grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
              <div className="min-w-0 w-full">
                <BlogPostHero blog={blog} />
                <BlogPostContent blog={blog} />
              </div>
              <BlogPostSidebar
                category={blog.category}
                categories={categories}
                toc={toc}
                relatedBlogs={relatedBlogs}
                usefulLinks={usefulLinks}
                keywords={blog.keywords}
              />
            </div>
          </div>
        </article>
        <GetStartedCTA
          eyebrow="Have a project in mind?"
          heading="Ready to turn this into a product?"
          description="Tell us what you want to build. We'll help with websites, apps, SEO, and custom software from first brief to launch."
        />
      </main>
    </>
  );
}
