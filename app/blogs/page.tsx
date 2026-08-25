import BlogsGrid from "./components/BlogsGrid";
import PageFAQ from "@/components/seo/PageFAQ";
import { getBlogsSEO } from "@/lib/seo/page-seo";
import { getBlogs } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { blogsFaqs } from "@/lib/seo/faqs";
import Link from "next/link";

export const metadata = getBlogsSEO();
export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen">
      <PageJsonLd
        path="/blogs"
        title="Software Development Insights Blog"
        description="Read the NexGen Developers blog on software development, AI, SEO, and product delivery. Practical guides for startups. Explore the latest articles today."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blogs" },
        ]}
        faqs={blogsFaqs}
      />
      <section className="pb-20 pt-[calc(var(--site-nav-height)+2.5rem)] lg:pb-28">
        <div className="section-container">
          <header className="mb-10 max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
              Blog
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-primary sm:text-5xl">
              Software development insights
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-text-gray sm:text-lg">
              Practical guides from NexGen Developers on software development, AI, search, chatbots, and design — written from shipped work. Need implementation? See{" "}
              <Link href="/services" className="text-gold-dark underline-offset-2 hover:underline">
                our services
              </Link>{" "}
              or{" "}
              <Link href="/contact-us" className="text-gold-dark underline-offset-2 hover:underline">
                contact the team
              </Link>
              .
            </p>
          </header>
          <BlogsGrid blogs={blogs} />
        </div>
      </section>
      <PageFAQ
        faqs={blogsFaqs}
        title="Blog questions"
        description="What we publish, how often, and how to request a topic or implementation help."
      />
    </div>
  );
}
