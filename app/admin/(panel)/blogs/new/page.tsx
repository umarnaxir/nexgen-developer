"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { BlogForm } from "@/components/admin/forms/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <PageHeader
        title="Add Blog"
        description="Create an SEO-optimized post with meta fields and structured content blocks."
        actions={
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1.5 text-sm text-text-gray hover:text-gold-dark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blogs
          </Link>
        }
      />
      <BlogForm mode="create" />
    </div>
  );
}
