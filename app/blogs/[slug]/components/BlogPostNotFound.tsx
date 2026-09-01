import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-2xl border border-gold/25 bg-white p-10 text-center shadow-[0_16px_40px_-28px_rgba(14,13,13,0.16)]">
        <h1 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-primary">
          Blog Post Not Found
        </h1>
        <p className="mb-8 text-text-gray">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/blogs"
          className="font-semibold text-gold-dark hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 rounded"
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
