"use client";

import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-white light:text-gray-900 mb-4">Blog Post Not Found</h1>
        <p className="text-silver light:text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blogs" className="text-gold light:text-gold-dark font-bold hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 rounded">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
