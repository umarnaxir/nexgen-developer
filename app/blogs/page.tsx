import BlogsGrid from "./components/BlogsGrid";
import { getBlogsSEO } from "@/lib/seo/page-seo";
import { getBlogs } from "@/lib/content/store";

export const metadata = getBlogsSEO();
export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen">
      <section className="pb-20 pt-[calc(var(--site-nav-height)+2.5rem)] lg:pb-28">
        <div className="section-container">
          <BlogsGrid blogs={blogs} />
        </div>
      </section>
    </div>
  );
}
