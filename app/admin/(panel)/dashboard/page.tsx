import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  Layers,
  Settings2,
  UserCog,
  Users,
} from "lucide-react";
import { canManageUsers, getSession } from "@/lib/admin/auth";
import { getContentStats } from "@/lib/content/store";
import { PageHeader } from "@/components/admin/layout/PageHeader";
import { adminUi } from "@/lib/admin/ui";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [session, stats] = await Promise.all([getSession(), getContentStats()]);
  const canUsers = session ? canManageUsers(session.role) : false;

  const cards: {
    label: string;
    value: string | number;
    hint: string;
    href: string;
  }[] = [
    {
      label: "Projects",
      value: stats.projects,
      hint: `${stats.featuredProjects} featured on home`,
      href: "/admin/projects",
    },
    {
      label: "Services",
      value: stats.services,
      hint: `${stats.servicesActive} active pages`,
      href: "/admin/services",
    },
    {
      label: "Blogs",
      value: stats.blogs,
      hint: `${stats.blogsPublished} published`,
      href: "/admin/blogs",
    },
    {
      label: "Team",
      value: stats.team,
      hint: `${stats.teamActive} visible members`,
      href: "/admin/team",
    },
    ...(canUsers
      ? [
          {
            label: "Users",
            value: stats.users,
            hint: `${stats.usersActive} active accounts`,
            href: "/admin/users",
          },
        ]
      : []),
    {
      label: "Contact",
      value: "Edit",
      hint: "Contact page & footer details",
      href: "/admin/contact",
    },
  ];

  const quickLinks = [
    { href: "/admin/projects", label: "Manage Projects", icon: Briefcase },
    { href: "/admin/services", label: "Manage Services", icon: Layers },
    { href: "/admin/team", label: "Manage Team", icon: Users },
    { href: "/admin/blogs", label: "Manage Blogs", icon: BookOpen },
    { href: "/admin/footer", label: "Footer Settings", icon: Settings2 },
    ...(canUsers
      ? [{ href: "/admin/users", label: "Manage Users", icon: UserCog }]
      : []),
  ];

  return (
    <div>
      <PageHeader
        title={`Welcome back${session?.name ? `, ${session.name.split(" ")[0]}` : ""}`}
        description="Manage projects, services, team, blogs, contact details, and footer from one place."
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className={adminUi.dashboardCard}>
            <p className={adminUi.dashboardCardLabel}>{card.label}</p>
            <p className={adminUi.dashboardCardValue}>{card.value}</p>
            <p className={adminUi.dashboardCardHint}>{card.hint}</p>
          </Link>
        ))}
      </div>

      <div className={cn("mt-6 p-5 sm:mt-8 sm:p-7", adminUi.card)}>
        <h2 className="text-lg font-semibold text-primary">Quick actions</h2>
        <p className="mt-1 text-sm text-text-gray">
          Jump into a content module to add or update site data.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-md border border-gold/25 px-4 py-3.5 text-sm font-medium text-primary transition active:scale-[0.98]",
                  adminUi.softHover
                )}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gold/15 text-gold-dark">
                  <Icon className="h-4 w-4" />
                </span>
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
