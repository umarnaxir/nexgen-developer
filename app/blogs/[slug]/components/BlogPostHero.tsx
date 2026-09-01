import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, User } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

interface BlogPostHeroProps {
  blog: {
    title: string;
    excerpt?: string;
    category: string;
    date: string;
    author: string;
    readTime?: string;
    images: string[];
  };
}

export default function BlogPostHero({ blog }: BlogPostHeroProps) {
  return (
    <header className="mb-6 sm:mb-10">
      <div className="mb-4 sm:mb-8">
        <Breadcrumbs
          className="mb-3 sm:mb-5"
          items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blogs" },
            { name: blog.title },
          ]}
        />
        <Link
          href="/blogs"
          className="inline-flex min-h-10 items-center gap-1.5 text-[13px] font-medium text-text-gray touch-manipulation transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 rounded sm:text-sm sm:font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>
      </div>

      <div className="min-w-0 w-full">
        <Link
          href={`/blogs?category=${encodeURIComponent(blog.category)}`}
          className="inline-flex min-h-8 items-center rounded-full border border-gold/40 bg-gold-light/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-gold-dark touch-manipulation transition-colors hover:border-gold hover:bg-gold-light sm:px-3 sm:py-1 sm:text-[11px] sm:font-semibold sm:tracking-[0.18em]"
        >
          {blog.category}
        </Link>
        <h1 className="mt-3 max-w-full break-words text-[1.65rem] font-medium leading-[1.15] tracking-[-0.04em] text-primary sm:mt-4 sm:text-[clamp(2rem,5vw,3.5rem)] sm:font-semibold sm:leading-[1.08]">
          {blog.title}
        </h1>
        {blog.excerpt ? (
          <p className="mt-3 max-w-full text-sm leading-relaxed text-text-gray sm:mt-4 sm:text-lg">
            {blog.excerpt}
          </p>
        ) : null}
        <div className="mt-3 flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-text-gray sm:mt-5 sm:gap-x-4 sm:gap-y-2 sm:text-sm">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <User className="h-3.5 w-3.5 shrink-0 text-gold-dark" />
            <span className="min-w-0 break-words">{blog.author}</span>
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-gold-dark/50" aria-hidden />
          <time className="shrink-0">{blog.date}</time>
          {blog.readTime ? (
            <>
              <span className="h-1 w-1 shrink-0 rounded-full bg-gold-dark/50" aria-hidden />
              <span className="inline-flex shrink-0 items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold-dark" />
                {blog.readTime}
              </span>
            </>
          ) : null}
        </div>

        {blog.images[0] ? (
          <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-gold/25 bg-background-soft sm:mt-7 sm:aspect-auto sm:h-64 lg:h-96">
            <Image
              src={blog.images[0]}
              alt={`${blog.title} — NexGen Developers blog`}
              title={blog.title}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
              priority
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
