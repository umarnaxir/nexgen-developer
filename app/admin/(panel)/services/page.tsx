"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { useAdminSearch } from "@/components/admin/layout/AdminSearchContext";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ConfirmModal } from "@/components/admin/ui/ConfirmModal";
import { AdminServiceCard } from "@/components/admin/preview/AdminProjectCard";
import { adminFetch } from "@/lib/admin/client";
import { cmsFields } from "@/lib/content/cms-fields";
import type { ServiceRecord } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export default function AdminServicesPage() {
  const { query: search } = useAdminSearch();
  const { canDeleteContent } = useAdminPermissions();
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"cards" | "table">("cards");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await adminFetch<{ services: ServiceRecord[] }>(
        "/api/admin/services"
      );
      setServices(data.services || []);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [services, search]);

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
      await adminFetch(`/api/admin/services/${deleteId}`, { method: "DELETE" });
      setServices((prev) => prev.filter((s) => s.id !== deleteId));
      toast.success("Service deleted");
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
        title={cmsFields.services.pageTitle}
        description={`Same data as ${cmsFields.services.frontendRoute} — cards mirror public service pages.`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-md border border-gold/25 p-0.5">
              <button
                type="button"
                onClick={() => setView("cards")}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded px-2.5 text-xs font-medium transition",
                  view === "cards"
                    ? "bg-gold text-primary"
                    : "text-text-gray hover:bg-gold/10"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Cards
              </button>
              <button
                type="button"
                onClick={() => setView("table")}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded px-2.5 text-xs font-medium transition",
                  view === "table"
                    ? "bg-gold text-primary"
                    : "text-text-gray hover:bg-gold/10"
                )}
              >
                <List className="h-3.5 w-3.5" />
                Table
              </button>
            </div>
            <Link href="/admin/services/new">
              <AdminButton>
                <Plus className="h-4 w-4" />
                Add Service
              </AdminButton>
            </Link>
          </div>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border border-gold/25 bg-white py-16 text-sm text-text-gray">
          <Loader2 className="h-4 w-4 animate-spin text-gold-dark" />
          Loading services…
        </div>
      ) : pageItems.length === 0 ? (
        <div className="rounded-md border border-gold/25 bg-white px-4 py-16 text-center text-sm text-text-gray">
          {search ? "No services match your search." : "No services yet."}
        </div>
      ) : view === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pageItems.map((service) => (
            <AdminServiceCard
              key={service.id}
              service={service}
              canDelete={canDeleteContent}
              onDelete={() => setDeleteId(service.id)}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-gold/25 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-b border-gold/25 bg-background-soft text-xs uppercase tracking-wide text-text-gray">
                <tr>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Parent</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/15">
                {pageItems.map((service) => (
                  <tr key={service.id} className="hover:bg-gold/[0.06]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-background-soft">
                          {service.content.image ? (
                            <Image
                              src={service.content.image}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-primary line-clamp-2">
                            {service.label}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-text-gray">
                            {service.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-text-gray">
                      {service.category.replace("-", " ")}
                    </td>
                    <td className="px-4 py-3 text-text-gray">
                      {service.parentSlug || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {service.enabled ? (
                        <span className="inline-flex rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-medium text-gold-dark">
                          Enabled
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-background-soft px-2.5 py-0.5 text-xs font-medium text-text-gray">
                          Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/services/${service.id}`}>
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
                            onClick={() => setDeleteId(service.id)}
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
        </div>
      )}

      {!loading && filtered.length > PAGE_SIZE && (
        <div className="mt-4 flex items-center justify-between rounded-md border border-gold/25 bg-white px-4 py-3 text-sm text-text-gray">
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

      <ConfirmModal
        open={deleteId != null}
        title="Delete service?"
        description="This will permanently remove the service from the site content. This action cannot be undone."
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setDeleteId(null)}
      />
    </div>
  );
}
