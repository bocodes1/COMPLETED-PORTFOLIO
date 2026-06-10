/**
 * All site content per build spec §3.
 * Spec rule: keep content truthful — no invented metrics or credentials.
 */

export interface ProjectMeta {
  label: string;
  value: string;
}

export interface ProjectEntry {
  id: string;
  /** mono path shown in the Mac window title bar */
  windowTitle: string;
  title: string;
  description: string;
  meta: ProjectMeta[];
  /** real link, only where confirmed to exist (spec §6.6) */
  link?: { label: string; url: string };
  /** flagship card spans the full grid width */
  featured?: boolean;
}

export const projects: ProjectEntry[] = [
  {
    id: "cex-lag-bot",
    windowTitle: "~/projects/cex-lag-bot",
    title: "CEX-Lag Arbitrage Engine",
    description:
      "Exploits pricing lag between Binance and 5-minute binary options. Maker-only, hold-to-resolution, regime-filtered.",
    meta: [
      { label: "stack", value: "Python · asyncio · websockets" },
      { label: "status", value: "live · profitable backtest" },
      { label: "edge", value: "confidence-gated 0.50–0.60" },
    ],
    // TODO: add GitHub link when the repo goes public (verified private as of 2026-06-10)
    featured: true,
  },
  {
    id: "borina-mesh",
    windowTitle: "~/projects/borina-mesh",
    title: "Multi-Agent Command Center",
    description:
      "Orchestration layer routing tasks across model tiers; scheduler, SSE telemetry, mobile dispatch bridge.",
    meta: [
      { label: "stack", value: "FastAPI · Next.js · Agent SDK" },
      { label: "status", value: "in development" },
      { label: "scope", value: "8 agents · tiered routing" },
    ],
    link: { label: "github", url: "https://github.com/bocodes1/borina-mesh" },
  },
  {
    id: "coordlayer",
    windowTitle: "~/projects/coordlayer",
    title: "Agent Coordination Layer",
    description:
      "Shared memory + context protocol across Claude Code sessions and machines. Versioned protocol, SQLite store, WebSocket relay.",
    meta: [
      { label: "stack", value: "MCP · SQLite · WebSocket · Next.js" },
      { label: "status", value: "MVP shipped on Fly.io" },
      { label: "scope", value: "cross-machine sync" },
    ],
  },
  {
    id: "returnclip",
    windowTitle: "~/projects/returnclip",
    title: "AI Returns Verification",
    description:
      "iOS App Clip that scans, photographs an item, and returns an AI refund decision in ~30s; vision-checks condition, applies merchant policy.",
    meta: [
      { label: "stack", value: "SwiftUI · Next.js · PyTorch · Gemini" },
      { label: "built", value: "App Clip + API + ML model" },
      { label: "context", value: "Hack Canada 2026 · shipped" },
      // TODO: add `result:` row ONLY if it actually placed (spec §6.3) — confirm first
    ],
    link: { label: "github", url: "https://github.com/bocodes1/returnclip-hackathon" },
  },
  {
    id: "r0am",
    windowTitle: "~/projects/r0am",
    title: "R0AM — DTC Brand",
    description:
      "Premium remote-work accessories brand. Sourcing, brand identity, automated Shopify build + CRO audit pipeline.",
    meta: [
      { label: "stack", value: "Shopify · Liquid · automation" },
      { label: "status", value: "in build" },
      { label: "scope", value: "brand → store → CRO loop" },
    ],
  },
];

export const experience = {
  id: "guyu",
  windowTitle: "~/experience/guyu",
  title: "GUYU — Front-End & Growth Intern",
  // Real timeline carried over from the previous site's data (spec §6.2)
  timeline: "June 2025 — January 2026",
  description:
    "Market research, Shopify build, influencer-driven social growth for an emerging brand; owned storefront and tracking.",
  meta: [
    { label: "role", value: "Front-End & Growth Intern" },
    { label: "built", value: "Shopify storefront · GA4/GTM" },
    { label: "outcome", value: "launched · growing social presence" },
  ],
};

/** §3.7 — order matters: Programming/Systems leads, Creative last */
export const skillGroups: { group: string; items: string[] }[] = [
  {
    group: "Programming / Systems",
    items: [
      "Python",
      "asyncio",
      "FastAPI",
      "Next.js",
      "React",
      "TypeScript",
      "Swift/SwiftUI",
      "websockets",
      "SQLite/Supabase",
      "PyTorch (basic)",
    ],
  },
  {
    group: "Front-End / Web",
    items: ["Next.js", "React", "HTML/CSS/JavaScript", "Shopify Liquid"],
  },
  {
    group: "Ecommerce & Growth",
    items: ["Shopify", "Google Ads", "Meta Ads", "GA4 / GTM", "creative testing"],
  },
  {
    group: "Creative & Design",
    items: ["Adobe Photoshop", "After Effects", "Premiere Pro"],
  },
];

export const education = [
  {
    school: "University of Toronto",
    credential: "Bachelor of Commerce",
    status: "current",
    note: "Building business acumen alongside practical skills in marketing, strategy, and execution.",
  },
  {
    school: "Heritage Woods Secondary School",
    credential: "High School",
    status: "completed",
    note: "Early exposure to technology and business.",
  },
];

export const contact = {
  email: "wenbozhao.zhao@mail.utoronto.ca",
  links: [
    { name: "GitHub", url: "https://github.com/bocodes1" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/wenbo-zhao-5035a5332/" },
    { name: "Instagram", url: "https://www.instagram.com/wenbozhao123" },
    { name: "X", url: "https://x.com/Boboscales" },
  ],
};

export const aboutCopy =
  "I'm a builder based in Toronto and Vancouver. I bridge strategy and execution — but mostly I build. I get my hands dirty: writing the code, shipping the systems, standing up the infrastructure that makes a product actually work. I move fast, test relentlessly, and care about things that generate real results. Right now I'm focused on low-latency trading systems and shipping products end-to-end.";
