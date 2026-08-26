import BlogsGrid from "./components/BlogsGrid";
import { getBlogsSEO } from "@/lib/seo/page-seo";
import { getBlogs } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import Link from "next/link";

export const metadata = getBlogsSEO();
export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const blogs = await getBlogs();
  const categories = Array.from(new Set(blogs.map((blog) => blog.category))).sort();
  const activeCategory = category?.trim() || "";
  const filtered = activeCategory
    ? blogs.filter(
        (blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : blogs;
  const visible = filtered.length > 0 ? filtered : blogs;

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
      />
      <section className="min-w-0 overflow-x-hidden pb-12 pt-[calc(var(--site-nav-height)+1.5rem)] sm:pb-20 sm:pt-[calc(var(--site-nav-height)+2.5rem)] lg:pb-28">
        <div className="px-4 sm:px-6 lg:px-14">
          <div className="mx-auto w-full min-w-0 max-w-7xl">
          <header className="mb-5 max-w-3xl sm:mb-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-dark sm:text-[11px] sm:tracking-[0.35em]">
              Blog
            </p>
            <h1 className="mt-2 text-[1.75rem] font-medium tracking-[-0.04em] text-primary sm:mt-3 sm:text-5xl sm:font-semibold">
              Software development insights
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-text-gray sm:mt-4 sm:text-lg">
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

          {categories.length > 1 ? (
            <div className="mb-5 flex w-full min-w-0 gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] sm:mb-8 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
              <Link
                href="/blogs"
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium touch-manipulation transition-colors sm:text-[12px] ${
                  !activeCategory
                    ? "border-gold bg-gold-light text-primary"
                    : "border-gold/30 bg-white text-text-gray hover:border-gold/60"
                }`}
              >
                All
              </Link>
              {categories.map((item) => {
                const isActive = item.toLowerCase() === activeCategory.toLowerCase();
                return (
                  <Link
                    key={item}
                    href={`/blogs?category=${encodeURIComponent(item)}`}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium touch-manipulation transition-colors sm:text-[12px] ${
                      isActive
                        ? "border-gold bg-gold-light text-primary"
                        : "border-gold/30 bg-white text-text-gray hover:border-gold/60"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          ) : null}

          <BlogsGrid blogs={visible} />
          </div>
        </div>
      </section>
    </div>
  );
}
