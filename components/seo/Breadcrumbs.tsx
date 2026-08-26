import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = {
  name: string;
  href?: string;
};

export default function Breadcrumbs({
  items,
  className,
  light = false,
}: {
  items: Crumb[];
  className?: string;
  light?: boolean;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4 min-w-0 max-w-full", className)}>
      <ol className="flex min-w-0 max-w-full flex-wrap items-center gap-1 text-[10px] font-medium uppercase tracking-[0.14em] sm:text-[11px] sm:tracking-[0.18em]">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li
              key={`${item.name}-${index}`}
              className={cn("flex min-w-0 items-center gap-1", last && "max-w-full")}
            >
              {index > 0 ? (
                <ChevronRight
                  className={cn(
                    "h-3 w-3 shrink-0",
                    light ? "text-white/35" : "text-black/30"
                  )}
                  aria-hidden
                />
              ) : null}
              {last || !item.href ? (
                <span
                  className={cn(
                    "min-w-0 truncate",
                    light ? "text-gold/90" : "text-gold-dark"
                  )}
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light
                      ? "text-white/55 hover:text-white"
                      : "text-black/45 hover:text-black"
                  )}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
