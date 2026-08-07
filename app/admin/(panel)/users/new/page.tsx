"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { useAdminPermissions } from "@/components/admin/layout/AdminPermissionsContext";
import { UserForm } from "@/components/admin/forms/UserForm";

export default function NewUserPage() {
  const router = useRouter();
  const { canManageUsers } = useAdminPermissions();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canManageUsers) {
      toast.error("You do not have access to manage users");
      router.replace("/admin/dashboard");
      return;
    }
    setReady(true);
  }, [canManageUsers, router]);

  if (!ready) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-sm text-neutral-500">
        <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
        Checking access…
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Add User"
        description="Create a new admin or editor account."
        actions={
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to users
          </Link>
        }
      />
      <UserForm mode="create" />
    </div>
  );
}
