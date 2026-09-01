import { LucideIcon } from "lucide-react";

interface PrivacySectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  delay?: number;
  dark?: boolean;
  altBg?: boolean;
  id?: string;
}

export default function PrivacySection({
  icon: Icon,
  title,
  children,
  delay = 0,
  id,
}: PrivacySectionProps) {
  const sectionId =
    id ??
    title
      .toLowerCase()
      .replace(/^\d+\.\s*/, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <section
      id={sectionId}
      data-aos="fade-up"
      data-aos-delay={Math.min(Math.round(delay * 1000), 200)}
      className="scroll-mt-28 rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_16px_48px_-36px_rgba(0,0,0,0.1)] transition-colors hover:border-gold-dark/20 sm:p-6 lg:p-8"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-dark/20 bg-gold-dark/10 text-gold-dark">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-fluid-h3 font-semibold tracking-[-0.02em] text-black">{title}</h2>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-black/60 sm:text-base [&_strong]:font-semibold [&_strong]:text-black">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
