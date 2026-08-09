"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { ServiceForm } from "@/components/admin/forms/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <PageHeader
        title="Add Service"
        description="Create a new service page."
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
      <ServiceForm mode="create" />
    </div>
  );
}
