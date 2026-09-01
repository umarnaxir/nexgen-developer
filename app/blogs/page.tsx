import BlogsGrid from "./components/BlogsGrid";
import BlogsHero from "./components/BlogsHero";
import { getBlogsSEO, blogsSeoCopy } from "@/lib/seo/page-seo";
import { getBlogs } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import Link from "next/link";

export function generateMetadata() {
  return getBlogsSEO();
}
export const revalidate = 3600;

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
    <main className="min-h-screen">
      <PageJsonLd
        path="/blogs"
        title={blogsSeoCopy.title}
        description={blogsSeoCopy.description}
        exactTitle
        exactDescription
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blogs" },
        ]}
      />
      <BlogsHero />
      <section
        id="blog-list"
        className="min-w-0 overflow-x-hidden pb-12 pt-8 sm:pb-20 sm:pt-12 lg:pb-28"
      >
        <div className="page-gutter">
          <div className="content-cap">
          {categories.length > 1 ? (
            <div className="mb-5 flex w-full min-w-0 gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] sm:mb-8 sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
              <Link
                href="/blogs"
                className={`tap-target shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium touch-manipulation transition-colors sm:text-[12px] ${
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
                    className={`tap-target shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium touch-manipulation transition-colors sm:text-[12px] ${
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
    </main>
  );
}
