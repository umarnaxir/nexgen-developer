"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { ServiceForm } from "@/components/admin/forms/ServiceForm";
import { adminFetch } from "@/lib/admin/client";
import type { ServiceRecord } from "@/lib/content/types";

export default function EditServicePage() {
  const params = useParams();
  const id = String(params.id || "");
  const [service, setService] = useState<ServiceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await adminFetch<{ service: ServiceRecord }>(
          `/api/admin/services/${id}`
        );
        if (!cancelled) setService(data.service);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load service";
        if (!cancelled) {
          setError(message);
          toast.error(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div>
      <PageHeader
        title="Edit Service"
        description={service?.label || "Update service details."}
        actions={
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-md border border-neutral-200 bg-white py-16 text-sm text-neutral-500">
          <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
          Loading service…
        </div>
      ) : error || !service ? (
        <div className="rounded-md border border-neutral-200 bg-white px-5 py-12 text-center text-sm text-neutral-600">
          {error || "Service not found."}
        </div>
      ) : (
        <ServiceForm mode="edit" initial={service} />
      )}
    </div>
  );
}
