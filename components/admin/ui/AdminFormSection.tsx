import { cn } from "@/lib/utils";
import { adminUi } from "@/lib/admin/ui";

type AdminFormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function AdminFormSection({
  title,
  description,
  children,
  className,
}: AdminFormSectionProps) {
  return (
    <section className={cn(adminUi.card, "p-5 sm:p-6", className)}>
      <div className="mb-4 border-b border-gold/15 pb-3">
        <h2 className="text-sm font-semibold text-primary">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs leading-relaxed text-text-gray">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

type AdminFieldMetaProps = {
  paths: string[];
  className?: string;
};

export function AdminFieldMeta({ paths, className }: AdminFieldMetaProps) {
  if (!paths.length) return null;
  return (
    <p className={cn("text-[11px] leading-snug text-gold-dark/80", className)}>
      Frontend: {paths.join(" · ")}
    </p>
  );
}
