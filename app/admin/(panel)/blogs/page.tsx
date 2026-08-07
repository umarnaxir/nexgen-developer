"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { useAdminSearch } from "@/components/admin/layout/AdminSearchContext";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { adminFetch, formatAdminDate } from "@/lib/admin/client";
import type { Blog } from "@/lib/content/types";

const PAGE_SIZE = 10;

export default function AdminBlogsPage() {
  const { query: search } = useAdminSearch();
  const { canDeleteContent } = useAdminPermissions();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<{ blogs: Blog[] }>("/api/admin/blogs");
      setBlogs(data.blogs || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.status.toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminFetch(`/api/admin/blogs/${deleteId}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b.id !== deleteId));
      toast.success("Blog deleted");
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Blogs"
        description="Write and publish blog posts for the site."
        actions={
          <Link href="/admin/blogs/new">
            <AdminButton>
              <Plus className="h-4 w-4" />
              Add Blog
            </AdminButton>
          </Link>
        }
      />

      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-4 py-16 text-sm text-neutral-500">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            Loading blogs…
          </div>
        ) : pageItems.length === 0 ? (
          <div className="px-4 py-16 text-center text-sm text-neutral-500">
            {search ? "No blogs match your search." : "No blogs yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Post</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Published</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {pageItems.map((blog) => (
                  <tr key={blog.id} className="hover:bg-neutral-50/80">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          {blog.image ? (
                            <Image
                              src={blog.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900 line-clamp-2">
                            {blog.title}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-neutral-500">
                            {blog.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {blog.category || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {blog.status === "published" ? (
                        <span className="inline-flex rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {formatAdminDate(blog.publishDate)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/blogs/${blog.id}`}>
                          <AdminButton size="sm" variant="secondary">
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </AdminButton>
                        </Link>
                        {canDeleteContent ? (
                          <AdminButton
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => setDeleteId(blog.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </AdminButton>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-sm text-neutral-600">
            <span>
              Page {currentPage} of {totalPages} · {filtered.length} total
            </span>
            <div className="flex gap-2">
              <AdminButton
                size="sm"
                variant="secondary"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </AdminButton>
              <AdminButton
                size="sm"
                variant="secondary"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </AdminButton>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={deleteId != null}
        title="Delete blog post?"
        description="This will permanently remove the blog from the site content. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
