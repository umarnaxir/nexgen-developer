/** Distill a long service description into a short lead + 3 punchy points. */

const MAX_LEAD = 140;
const MAX_POINT = 96;

function splitSentences(text: string): string[] {
  return (text.match(/[^.!?]+[.!?]+/g) ?? [text])
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

function clean(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();
}

function shorten(text: string, max: number): string {
  const t = clean(text);
  if (t.length <= max) return t.replace(/[.!?]+$/, "");
  const cut = t.slice(0, max);
  const at = Math.max(cut.lastIndexOf(","), cut.lastIndexOf(" "));
  const base = (at > max * 0.55 ? cut.slice(0, at) : cut).trim();
  return base.replace(/[,.\s-]+$/, "");
}

const POINT_TITLES = ["The scope", "How we build", "What you get"] as const;

export type OverviewPoint = {
  title: string;
  text: string;
};

export type DerivedOverview = {
  lead: string;
  points: OverviewPoint[];
};

export function deriveOverview(description: string): DerivedOverview {
  const sentences = splitSentences(description);
  const lead = shorten(sentences[0] ?? description, MAX_LEAD);

  const body = sentences.slice(1);
  const picked: string[] = [];

  for (const sentence of body) {
    if (picked.length >= 3) break;
    const short = shorten(sentence, MAX_POINT);
    if (!short || picked.some((p) => p.slice(0, 28) === short.slice(0, 28))) continue;
    picked.push(short);
  }

  // Fallbacks if the source description is thin
  while (picked.length < 3) {
    const fallbacks = [
      "Clear scope, modern stack, and delivery you can track.",
      "Design, build, and integrate with quality at every step.",
      "Launch-ready work tuned for performance, SEO, and growth.",
    ];
    picked.push(fallbacks[picked.length]!);
  }

  return {
    lead: lead.endsWith(".") ? lead : `${lead}.`,
    points: picked.slice(0, 3).map((text, i) => ({
      title: POINT_TITLES[i]!,
      text: text.endsWith(".") ? text : `${text}.`,
    })),
  };
}
