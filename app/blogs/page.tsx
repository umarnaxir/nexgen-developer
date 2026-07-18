import BlogsGrid from "./components/BlogsGrid";
import { getBlogsSEO } from "@/lib/seo/page-seo";

export const metadata = getBlogsSEO();

export default function BlogsPage() {
  return (
    <div className="min-h-screen">
      <section className="pb-20 pt-10 lg:pb-28 lg:pt-14">
        <div className="section-container">
          <BlogsGrid />
        </div>
      </section>
    </div>
  );
}
