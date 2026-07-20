type Variant = "benefits" | "results";

const MIN_POINTS = 5;

function splitList(value: string): string[] {
  return value
    .split(/,\s*|\s*&\s*|\s*\/\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function padToFive(points: string[], fillers: string[]): string[] {
  const unique = [...new Set(points.map((p) => p.trim()).filter(Boolean))];
  for (const filler of fillers) {
    if (unique.length >= MIN_POINTS) break;
    if (!unique.includes(filler)) unique.push(filler);
  }
  while (unique.length < MIN_POINTS) {
    unique.push(`Clear next step ${unique.length + 1}`);
  }
  return unique.slice(0, Math.max(MIN_POINTS, Math.min(unique.length, 6)));
}

const DEFAULT_BENEFIT_FILLERS = [
  "Scoped to your business goals",
  "Clear milestones and updates",
  "Built for long-term maintainability",
  "Documented for your team",
  "Ready for iteration after launch",
];

const DEFAULT_RESULT_FILLERS = [
  "Measurable progress toward your goals",
  "Tracked with clear KPIs",
  "Reviewed and refined over time",
  "Aligned with your launch timeline",
  "Supported after go-live",
];

function contextualBenefitPoints(title: string): string[] {
  const lower = title.toLowerCase();

  if (lower.includes("frontend")) {
    return [
      "Component-based UI architecture",
      "Accessible, responsive layouts",
      "Performance-focused builds",
      "Reusable design system patterns",
      "Cross-browser compatibility checks",
    ];
  }
  if (lower.includes("backend")) {
    return [
      "Scalable server-side logic",
      "Secure API design",
      "Database integration",
      "Auth and role handling",
      "Clean service boundaries",
    ];
  }
  if (lower.includes("database")) {
    return [
      "Schema design and optimization",
      "Reliable data storage",
      "Query performance tuning",
      "Backup-friendly structure",
      "Migration-ready setup",
    ];
  }
  if (lower.includes("api") || lower.includes("graphql") || lower.includes("rest")) {
    return [
      "Clean endpoint structure",
      "Authentication-ready design",
      "Third-party ready integrations",
      "Versioning and docs",
      "Error handling and validation",
    ];
  }
  if (lower.includes("responsive") || lower.includes("mobile-first")) {
    return [
      "Works across all screen sizes",
      "Touch-friendly interactions",
      "Consistent cross-device UX",
      "Fast mobile load paths",
      "Adaptive content layout",
    ];
  }
  if (lower.includes("performance")) {
    return [
      "Faster load times",
      "Optimized assets and code",
      "Core Web Vitals focus",
      "Caching where it helps",
      "Ongoing performance checks",
    ];
  }
  if (lower.includes("security")) {
    return [
      "Industry best practices",
      "Data protection measures",
      "Regular security reviews",
      "Secure auth patterns",
      "Least-privilege access",
    ];
  }
  if (lower.includes("integration")) {
    return [
      "CRM, payment, and tool connections",
      "Reliable webhook handling",
      "Minimal disruption to existing systems",
      "Clear data mapping",
      "Tested end-to-end flows",
    ];
  }
  if (lower.includes("native") && (lower.includes("ios") || lower.includes("android"))) {
    return [
      "Swift and Kotlin expertise",
      "Platform-native UX patterns",
      "Device API access",
      "Store-ready builds",
      "OS update compatibility",
    ];
  }
  if (lower.includes("cross-platform")) {
    return [
      "One codebase, two platforms",
      "Consistent feature parity",
      "Lower long-term maintenance",
      "Shared UI components",
      "Faster dual-platform releases",
    ];
  }
  if (lower.includes("app store") || lower.includes("play store") || lower.includes("deployment")) {
    return [
      "Submission guidance and support",
      "Store assets and metadata",
      "Review feedback handling",
      "Release checklist coverage",
      "Version rollout planning",
    ];
  }
  if (lower.includes("push notification")) {
    return [
      "Segmented user targeting",
      "Engagement campaigns",
      "Platform-compliant setup",
      "Opt-in and preference handling",
      "Delivery analytics hooks",
    ];
  }
  if (lower.includes("purchase") || lower.includes("payment")) {
    return [
      "Secure checkout flows",
      "Subscription and one-time billing",
      "PCI-aware implementation",
      "Receipt and status handling",
      "Failed-payment recovery paths",
    ];
  }
  if (lower.includes("offline")) {
    return [
      "Local data caching",
      "Sync when back online",
      "Reliable offline-first UX",
      "Conflict-aware updates",
      "Graceful degraded modes",
    ];
  }
  if (lower.includes("real-time") || lower.includes("synchronization")) {
    return [
      "Live data updates",
      "Conflict handling",
      "Low-latency sync",
      "Connection recovery",
      "Scalable event channels",
    ];
  }
  if (lower.includes("maintenance") || lower.includes("update")) {
    return [
      "Bug fixes and patches",
      "OS compatibility updates",
      "Ongoing feature support",
      "Dependency upgrades",
      "Health monitoring options",
    ];
  }
  if (lower.includes("machine learning") || lower.includes("deep learning") || lower.includes("ai")) {
    return [
      "Custom model training",
      "Production-ready pipelines",
      "Iterative improvement cycles",
      "Evaluation against real metrics",
      "Safe rollout and monitoring",
    ];
  }
  if (lower.includes("nlp") || lower.includes("language")) {
    return [
      "Text classification and extraction",
      "Conversational interfaces",
      "Domain-tuned models",
      "Multilingual options when needed",
      "Feedback loops for accuracy",
    ];
  }
  if (lower.includes("computer vision")) {
    return [
      "Image and video analysis",
      "Object detection workflows",
      "Real-world deployment",
      "Accuracy and latency tuning",
      "Privacy-aware processing",
    ];
  }
  if (lower.includes("predictive") || lower.includes("analytics")) {
    return [
      "Forecasting and trend analysis",
      "Actionable business insights",
      "Data-driven decisions",
      "Dashboard-ready outputs",
      "Model refresh cadence",
    ];
  }
  if (lower.includes("chatbot") || lower.includes("virtual assistant")) {
    return [
      "Intent-based conversation flows",
      "Multi-channel deployment",
      "CRM and tool integration",
      "Human handoff when needed",
      "Continuous training from chats",
    ];
  }
  if (lower.includes("recommendation")) {
    return [
      "Personalized user experiences",
      "Behavior-based suggestions",
      "Conversion optimization",
      "Cold-start handling",
      "A/B testing friendly setup",
    ];
  }
  if (lower.includes("seo") || lower.includes("search")) {
    return [
      "On-page and technical SEO",
      "Keyword-focused content",
      "Ranking improvement strategy",
      "Internal linking structure",
      "Measurable traffic goals",
    ];
  }
  if (lower.includes("social media")) {
    return [
      "Content calendar planning",
      "Community engagement",
      "Paid and organic growth",
      "Platform-native creatives",
      "Performance reporting",
    ];
  }
  if (lower.includes("google ads") || lower.includes("ppc")) {
    return [
      "Campaign structure and targeting",
      "Conversion tracking setup",
      "Continuous bid optimization",
      "Landing page alignment",
      "Budget pacing and ROAS focus",
    ];
  }
  if (lower.includes("meta") || lower.includes("facebook") || lower.includes("instagram")) {
    return [
      "Audience and lookalike targeting",
      "Creative A/B testing",
      "Retargeting funnels",
      "Pixel and event setup",
      "Creative refresh cycles",
    ];
  }
  if (lower.includes("graphic") || lower.includes("design") || lower.includes("brand")) {
    return [
      "On-brand visual systems",
      "Multi-format deliverables",
      "Consistent identity across channels",
      "Source files you can reuse",
      "Clear revision rounds",
    ];
  }
  if (lower.includes("devops") || lower.includes("cloud") || lower.includes("docker")) {
    return [
      "Automated CI/CD pipelines",
      "Scalable infrastructure",
      "Monitoring and alerting",
      "Secure environment config",
      "Rollback-ready releases",
    ];
  }

  return DEFAULT_BENEFIT_FILLERS;
}

function contextualResultPoints(title: string): string[] {
  const lower = title.toLowerCase();

  if (lower.includes("app store") || lower.includes("play store") || lower.includes("live on")) {
    return [
      "Published on major app stores",
      "Review-ready assets and metadata",
      "Launch checklist completed",
      "Version tracking in place",
      "Post-launch support path",
    ];
  }
  if (lower.includes("traffic") || lower.includes("visibility")) {
    return [
      "Higher organic reach",
      "Improved search presence",
      "More qualified visitors",
      "Clear channel attribution",
      "Month-over-month tracking",
    ];
  }
  if (lower.includes("lead") || lower.includes("conversion")) {
    return [
      "More qualified inquiries",
      "Better funnel performance",
      "Trackable ROI metrics",
      "Faster response pathways",
      "Conversion event clarity",
    ];
  }
  if (lower.includes("ranking") || lower.includes("seo")) {
    return [
      "Improved keyword positions",
      "Stronger domain signals",
      "Sustainable organic growth",
      "Technical SEO hygiene",
      "Content that matches intent",
    ];
  }
  if (lower.includes("satisfaction") || lower.includes("retention")) {
    return [
      "Better user experience scores",
      "Higher repeat engagement",
      "Stronger brand trust",
      "Fewer support friction points",
      "Clearer product value delivery",
    ];
  }
  if (lower.includes("secure") || lower.includes("security")) {
    return [
      "Reduced vulnerability exposure",
      "Compliance-aware setup",
      "Ongoing protection",
      "Access control clarity",
      "Incident-ready monitoring",
    ];
  }
  if (lower.includes("scalable") || lower.includes("architecture")) {
    return [
      "Ready for user growth",
      "Flexible infrastructure",
      "Reduced technical debt",
      "Easier feature expansion",
      "Stable under peak load",
    ];
  }
  if (lower.includes("automated") || lower.includes("automation")) {
    return [
      "Less manual workload",
      "Faster response times",
      "Consistent process execution",
      "Fewer human error points",
      "Time back for core work",
    ];
  }
  if (lower.includes("roi") || lower.includes("roas")) {
    return [
      "Clear performance reporting",
      "Optimized ad spend",
      "Data-backed decisions",
      "Campaign waste reduced",
      "Goals tied to revenue",
    ];
  }
  if (lower.includes("brand")) {
    return [
      "Stronger market recognition",
      "Consistent visual identity",
      "Memorable customer touchpoints",
      "Assets ready for campaigns",
      "Clear brand guidelines",
    ];
  }
  if (lower.includes("website") || lower.includes("web app") || lower.includes("load")) {
    return [
      "Modern, responsive experience",
      "Improved load performance",
      "SEO-friendly foundations",
      "Maintainable codebase",
      "Ready for future features",
    ];
  }

  return DEFAULT_RESULT_FILLERS;
}

/** Derive at least 5 key points for the benefits/outcomes spotlight panel. */
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
  }

  const contextual =
    variant === "benefits" ? contextualBenefitPoints(label) : contextualResultPoints(label);

  const fillers = variant === "benefits" ? DEFAULT_BENEFIT_FILLERS : DEFAULT_RESULT_FILLERS;

  return padToFive([...extracted, ...contextual], fillers);
}

/** Short headline without parenthetical detail, used as spotlight title. */
export function getSpotlightTitle(label: string): string {
  return label.replace(/\([^)]+\)/, "").replace(/\s+/g, " ").trim();
}
