interface ServiceSectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}

export default function ServiceSectionHeader({
  title,
  description,
  tone = "light",
  align = "left",
}: ServiceSectionHeaderProps) {
  const light = tone === "light";

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2
        className={`text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] ${
          light ? "text-black" : "text-white"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-[15px] leading-relaxed sm:mt-4 sm:text-base ${
            light ? "text-black/55" : "text-white/55"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
