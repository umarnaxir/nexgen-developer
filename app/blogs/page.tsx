import BlogsHero from "./components/BlogsHero";
import BlogsGrid from "./components/BlogsGrid";
import { getBlogsSEO } from "@/lib/seo/page-seo";

export const metadata = getBlogsSEO();

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <BlogsHero />
          <BlogsGrid />
        </div>
      </section>
    </div>
  );
}
