"use client";

import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Blog Post Not Found</h1>
        <p className="text-gray-700 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blogs" className="text-black font-bold hover:text-gray-700">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
