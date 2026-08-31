import { Check } from "lucide-react";
import LinkedCopy from "./LinkedCopy";

const paragraphs = [
  "NexGen Developers is a software development studio for startups and growing brands. We plan, design, and ship [websites](/services/website-development), mobile apps, AI products, and chatbots — then keep them live with DevOps and maintenance.",
  "Growth work sits in the same brief. SEO, digital marketing, Google Ads, and Meta Ads are built around the pages we ship, not a separate vendor stack. For search fundamentals we follow [Google Search Central](https://developers.google.com/search); for product UI we typically use [Next.js](https://nextjs.org).",
  "Not sure where to start? Browse the categories below. When you have a scope in mind, [contact NexGen Developers](/contact-us) for a quote.",
];

const points = [
  {
    title: "Build",
    text: "Websites, apps, and AI products with a documented codebase and a launch checklist.",
  },
  {
    title: "Launch",
    text: "DevOps, environments, and tracking so the first release is not a fire drill.",
  },
  {
    title: "Grow",
    text: "SEO, ads, and content against the same funnel — not a disconnected campaign.",
  },
];

export default function ServicesIntro() {
  return (
    <section
      className="section-light border-t border-black/[0.06] section-y"
      aria-labelledby="services-intro-heading"
    >
      <div className="section-container">
        <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
          What you can hire
        </span>
        <h2
          id="services-intro-heading"
          className="mt-3 text-[clamp(1.65rem,1.1rem+2.2vw,2.35rem)] font-semibold tracking-[-0.03em] text-primary"
        >
          Software development and marketing under one roof
        </h2>
        <div className="mt-6 space-y-4 text-fluid-lead text-text-gray">
          {paragraphs.map((text) => (
            <p key={text.slice(0, 40)}>
              <LinkedCopy text={text} />
            </p>
          ))}
        </div>

        <ul className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-3">
          {points.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              <div>
                <p className="text-[15px] font-semibold tracking-[-0.02em] text-primary">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text-gray">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
