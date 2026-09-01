import Link from "next/link";
import type { ReactNode } from "react";

const LINK_CLASS =
  "underline decoration-gold/40 underline-offset-[3px] transition-colors hover:text-gold-dark hover:decoration-gold";

/** Renders [label](url) in service copy without changing surrounding typography. */
export default function LinkedCopy({ text }: { text: string }) {
  if (!text) return null;

  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const isInternal = href.startsWith("/");
    if (isInternal) {
      nodes.push(
        <Link key={`l-${key++}`} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={`l-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes.length ? nodes : text}</>;
}
