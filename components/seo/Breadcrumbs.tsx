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
    <nav aria-label="Breadcrumb" className={cn("mb-4", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em]">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight
                  className={cn(
                    "h-3 w-3",
                    light ? "text-white/35" : "text-black/30"
                  )}
                  aria-hidden
                />
              ) : null}
              {last || !item.href ? (
                <span
                  className={light ? "text-gold/90" : "text-gold-dark"}
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
