type Variant = "benefits" | "results";

function splitList(value: string): string[] {
  return value
    .split(/,\s*|\s*&\s*|\s*\/\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function contextualBenefitPoints(title: string): string[] {
  const lower = title.toLowerCase();

  if (lower.includes("frontend")) {
    return ["Component-based UI architecture", "Accessible, responsive layouts", "Performance-focused builds"];
  }
  if (lower.includes("backend")) {
    return ["Scalable server-side logic", "Secure API design", "Database integration"];
  }
  if (lower.includes("database")) {
    return ["Schema design and optimization", "Reliable data storage", "Query performance tuning"];
  }
  if (lower.includes("api") || lower.includes("graphql") || lower.includes("rest")) {
    return ["Clean endpoint structure", "Authentication-ready design", "Third-party ready integrations"];
  }
  if (lower.includes("responsive") || lower.includes("mobile-first")) {
    return ["Works across all screen sizes", "Touch-friendly interactions", "Consistent cross-device UX"];
  }
  if (lower.includes("performance")) {
    return ["Faster load times", "Optimized assets and code", "Core Web Vitals focus"];
  }
  if (lower.includes("security")) {
    return ["Industry best practices", "Data protection measures", "Regular security reviews"];
  }
  if (lower.includes("integration")) {
    return ["CRM, payment, and tool connections", "Reliable webhook handling", "Minimal disruption to existing systems"];
  }
  if (lower.includes("native") && lower.includes("ios")) {
    return ["Swift & Kotlin expertise", "Platform-native UX patterns", "Device API access"];
  }
  if (lower.includes("cross-platform")) {
    return ["One codebase, two platforms", "Consistent feature parity", "Lower long-term maintenance"];
  }
  if (lower.includes("app store") || lower.includes("play store") || lower.includes("deployment")) {
    return ["Submission guidance and support", "Store assets and metadata", "Review feedback handling"];
  }
  if (lower.includes("push notification")) {
    return ["Segmented user targeting", "Engagement campaigns", "Platform-compliant setup"];
  }
  if (lower.includes("purchase") || lower.includes("payment")) {
    return ["Secure checkout flows", "Subscription and one-time billing", "PCI-aware implementation"];
  }
  if (lower.includes("offline")) {
    return ["Local data caching", "Sync when back online", "Reliable offline-first UX"];
  }
  if (lower.includes("real-time") || lower.includes("synchronization")) {
    return ["Live data updates", "Conflict handling", "Low-latency sync"];
  }
  if (lower.includes("maintenance") || lower.includes("update")) {
    return ["Bug fixes and patches", "OS compatibility updates", "Ongoing feature support"];
  }
  if (lower.includes("machine learning") || lower.includes("deep learning")) {
    return ["Custom model training", "Production-ready pipelines", "Iterative improvement cycles"];
  }
  if (lower.includes("nlp") || lower.includes("language")) {
    return ["Text classification and extraction", "Conversational interfaces", "Domain-tuned models"];
  }
  if (lower.includes("computer vision")) {
    return ["Image and video analysis", "Object detection workflows", "Real-world deployment"];
  }
  if (lower.includes("predictive") || lower.includes("analytics")) {
    return ["Forecasting and trend analysis", "Actionable business insights", "Data-driven decisions"];
  }
  if (lower.includes("chatbot") || lower.includes("virtual assistant")) {
    return ["Intent-based conversation flows", "Multi-channel deployment", "CRM and tool integration"];
  }
  if (lower.includes("recommendation")) {
    return ["Personalized user experiences", "Behavior-based suggestions", "Conversion optimization"];
  }
  if (lower.includes("seo") || lower.includes("search")) {
    return ["On-page and technical SEO", "Keyword-focused content", "Ranking improvement strategy"];
  }
  if (lower.includes("social media")) {
    return ["Content calendar planning", "Community engagement", "Paid and organic growth"];
  }
  if (lower.includes("google ads") || lower.includes("ppc")) {
    return ["Campaign structure and targeting", "Conversion tracking setup", "Continuous bid optimization"];
  }
  if (lower.includes("meta") || lower.includes("facebook") || lower.includes("instagram")) {
    return ["Audience and lookalike targeting", "Creative A/B testing", "Retargeting funnels"];
  }
  if (lower.includes("graphic") || lower.includes("design") || lower.includes("brand")) {
    return ["On-brand visual systems", "Multi-format deliverables", "Consistent identity across channels"];
  }
  if (lower.includes("devops") || lower.includes("cloud") || lower.includes("docker")) {
    return ["Automated CI/CD pipelines", "Scalable infrastructure", "Monitoring and alerting"];
  }

  return [
    "Tailored to your project scope",
    "Delivered with clear milestones",
    "Built for long-term maintainability",
  ];
}

function contextualResultPoints(title: string): string[] {
  const lower = title.toLowerCase();

  if (lower.includes("app store") || lower.includes("play store") || lower.includes("live on")) {
    return ["Published on major app stores", "Review-ready assets and metadata", "Launch checklist completed"];
  }
  if (lower.includes("traffic") || lower.includes("visibility")) {
    return ["Higher organic reach", "Improved search presence", "More qualified visitors"];
  }
  if (lower.includes("lead") || lower.includes("conversion")) {
    return ["More qualified inquiries", "Better funnel performance", "Trackable ROI metrics"];
  }
  if (lower.includes("ranking") || lower.includes("seo")) {
    return ["Improved keyword positions", "Stronger domain authority", "Sustainable organic growth"];
  }
  if (lower.includes("satisfaction") || lower.includes("retention")) {
    return ["Better user experience scores", "Higher repeat engagement", "Stronger brand trust"];
  }
  if (lower.includes("secure") || lower.includes("security")) {
    return ["Reduced vulnerability exposure", "Compliance-aware setup", "Ongoing protection"];
  }
  if (lower.includes("scalable") || lower.includes("architecture")) {
    return ["Ready for user growth", "Flexible infrastructure", "Reduced technical debt"];
  }
  if (lower.includes("automated") || lower.includes("automation")) {
    return ["Less manual workload", "Faster response times", "Consistent process execution"];
  }
  if (lower.includes("roi") || lower.includes("roas")) {
    return ["Clear performance reporting", "Optimized ad spend", "Data-backed decisions"];
  }
  if (lower.includes("brand")) {
    return ["Stronger market recognition", "Consistent visual identity", "Memorable customer touchpoints"];
  }

  return [
    "Measurable progress toward your goals",
    "Tracked with clear KPIs",
    "Reviewed and refined over time",
  ];
}

/** Derive 3–4 display key points for the benefits/outcomes spotlight panel. */
export function deriveKeyPoints(label: string, variant: Variant): string[] {
  let title = label.trim();
  const extracted: string[] = [];

  const parenMatch = title.match(/\(([^)]+)\)/);
  if (parenMatch) {
    extracted.push(...splitList(parenMatch[1]));
    title = title.replace(/\([^)]+\)/, "").trim();
  }

  if (extracted.length === 0 && title.includes(" & ")) {
    extracted.push(...splitList(title));
    title = extracted[0] ?? title;
  }

  const contextual =
    variant === "benefits"
      ? contextualBenefitPoints(label)
      : contextualResultPoints(label);

  const merged = [...extracted, ...contextual];
  const unique = [...new Set(merged.map((point) => point.trim()))].filter(Boolean);

  return unique.slice(0, 4);
}

/** Short headline without parenthetical detail — used as spotlight title. */
export function getSpotlightTitle(label: string): string {
  return label.replace(/\([^)]+\)/, "").replace(/\s+/g, " ").trim();
}
