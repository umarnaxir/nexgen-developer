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

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [session, stats] = await Promise.all([getSession(), getContentStats()]);
  const canUsers = session ? canManageUsers(session.role) : false;

  const cards: {
    label: string;
    value: string | number;
    hint: string;
    href: string;
    tone: string;
  }[] = [
    {
      label: "Projects",
      value: stats.projects,
      hint: `${stats.featuredProjects} featured`,
      href: "/admin/projects",
      tone: "from-teal-500/15 to-teal-500/5",
    },
    {
      label: "Services",
      value: stats.services,
      hint: `${stats.servicesActive} active`,
      href: "/admin/services",
      tone: "from-emerald-500/15 to-emerald-500/5",
    },
    {
      label: "Blogs",
      value: stats.blogs,
      hint: `${stats.blogsPublished} published`,
      href: "/admin/blogs",
      tone: "from-amber-500/15 to-amber-500/5",
    },
    {
      label: "Team",
      value: stats.team,
      hint: `${stats.teamActive} active`,
      href: "/admin/team",
      tone: "from-sky-500/15 to-sky-500/5",
    },
    ...(canUsers
      ? [
          {
            label: "Users",
            value: stats.users,
            hint: `${stats.usersActive} active`,
            href: "/admin/users",
            tone: "from-violet-500/15 to-violet-500/5",
          },
        ]
      : []),
    {
      label: "Contact",
      value: "Edit",
      hint: "Company details",
      href: "/admin/contact",
      tone: "from-rose-500/15 to-rose-500/5",
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
          <Link
            key={card.label}
            href={card.href}
            className={`group rounded-md border border-neutral-200 bg-gradient-to-br ${card.tone} p-5 transition duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md active:scale-[0.97] active:border-teal-400 sm:p-7`}
          >
            <p className="text-xs font-medium text-neutral-600 sm:text-sm">
              {card.label}
            </p>
            <p className="mt-3 text-xl font-semibold tracking-tight text-neutral-900 sm:mt-4 sm:text-3xl">
              {card.value}
            </p>
            <p className="mt-2 line-clamp-1 text-[11px] text-neutral-500 sm:text-xs">
              {card.hint}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-neutral-200 bg-white p-5 sm:mt-8 sm:p-7">
        <h2 className="text-lg font-semibold text-neutral-900">Quick actions</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Jump into a content module to add or update site data.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-md border border-neutral-200 px-4 py-3.5 text-sm font-medium text-neutral-700 transition hover:border-teal-300 hover:bg-teal-50/50 hover:text-teal-800 active:scale-[0.98]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
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
