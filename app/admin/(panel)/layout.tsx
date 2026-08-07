import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/auth";
import AdminShell from "@/components/admin/layout/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin");
  }

  return (
    <AdminShell
      userName={session.name}
      userEmail={session.email}
      userRole={session.role}
    >
      {children}
    </AdminShell>
  );
}
