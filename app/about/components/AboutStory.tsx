import Link from "next/link";
import { aboutStory } from "../data";

export default function AboutStory() {
  return (
    <section
      id="about-story"
      className="section-light relative overflow-hidden border-t border-black/[0.06] section-y"
    >
      <div className="section-container relative z-10 min-w-0">
        <div className="min-w-0 w-full max-w-full" data-aos="fade-up">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
            {aboutStory.eyebrow}
          </span>
          <h2 className="mt-3 max-w-none text-[clamp(1.85rem,4.5vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-black">
            {aboutStory.headline}
          </h2>

          <p className="mt-6 w-full text-base leading-relaxed text-black/55 sm:text-lg">
            {aboutStory.lead}
          </p>

          <div className="mt-8 grid w-full grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 lg:gap-x-16">
            {aboutStory.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 28)}
                className="text-[15px] leading-[1.85] text-black/50 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <p className="mt-8 w-full text-[15px] leading-relaxed text-gold-dark sm:text-base">
            {aboutStory.quote}
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              href="/team"
              className="text-sm font-semibold text-gold-dark transition-colors hover:text-gold"
            >
              Meet the team
            </Link>
            <Link
              href="/services"
              className="text-sm font-semibold text-black/45 transition-colors hover:text-black"
            >
              View services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
