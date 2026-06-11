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
  /** demo video under /public — drop a file in and reference it here */
  video?: string;
  /** repo exists but is private — modal says so instead of linking */
  privateRepo?: boolean;
  /** expanded notes shown in the detail window — keep terse and truthful */
  detail?: string[];
}

/*
 * TODO: demo videos still to record (no footage exists yet):
 *   cex-lag-bot, borina-mesh, coordlayer, returnclip, r0am
 * RCDEMO.mp4 exists but belongs to Refined Concept, which spec §6.5
 * intentionally removed — do not re-add it.
 */

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
    privateRepo: true,
    featured: true,
    detail: [
      "Watches Binance spot over websocket and prices 5-minute binaries before the venue's quotes catch up.",
      "Maker-only CLOB entries gated to the 0.50–0.60 confidence band; holds to resolution, so there is no exit-timing risk.",
      "A regime filter stands the bot down in chop; a kill switch and risk sentinel cap exposure per window.",
      "EV, fees, and microstructure are modeled explicitly — edge is computed, not assumed.",
      "A shadow harness runs the full pipeline against a virtual portfolio before any live capital.",
    ],
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
    detail: [
      "Seven specialized agents — CEO, researcher, trading intel, ecommerce scout, inbox triage and more — behind one dashboard.",
      "FastAPI backend dispatches jobs through the Claude Agent SDK; APScheduler handles cron runs while you sleep.",
      "Token-by-token SSE streaming, a live pub/sub activity feed, React Flow network graph, and an artifact browser for generated reports.",
      "Runs 24/7 on a Mac Mini, reachable from any device over Tailscale.",
      "Adding a new agent is ~30 lines of Python.",
    ],
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
    privateRepo: true,
    detail: [
      "A daemon on each machine holds local SQLite memory and a persistent WebSocket to the relay; Claude Code talks to it over MCP stdio.",
      "One versioned, zod-validated envelope is the wire contract for both the WebSocket and local IPC — the relay can be rewritten in another language without breaking deployed daemons.",
      "Autonomous by design: an auto-loaded team-context resource, proactive tool descriptions, and a git watcher that turns commits into shared memories.",
      "Twelve per-phase verification scripts; the relay ships with a Dockerfile and Fly.io config.",
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
    detail: [
      "Scan a QR on the packaging, snap three guided photos, get a refund decision — no app install, under 30 seconds.",
      "Gemini 2.0 Flash vision checks item condition and applies the merchant's own return policy; a PyTorch MobileNetV2 classifier runs side-by-side for comparison.",
      "Swift/SwiftUI App Clip with zero external dependencies; Next.js API handles Shopify order lookup, Cloudinary evidence storage, and Supabase persistence.",
      "Built and shipped at Hack Canada 2026 under the Reactiv ClipKit challenge.",
    ],
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
    detail: [
      "Remote-work accessories brand built end-to-end: sourcing, identity, storefront, growth loop.",
      "Six launch SKUs on a customized Shopify Dawn theme, pushed and verified via CLI.",
      "An automated imagery pipeline generates product and lifestyle shots; a CRO-audit loop drives storefront iteration.",
      "Currently pre-launch: store built, pricing and bundles in tuning.",
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
  video: "/assets/work/guyu/GUYUDEMO.mp4",
};

/** §3.7 — order matters: Programming/Systems leads, Creative last.
 *  core: used across many builds → rendered bright; otherwise dim
 *  (single-project exposure). */
export interface SkillItem {
  name: string;
  core?: boolean;
}

export const skillGroups: { group: string; items: SkillItem[] }[] = [
  {
    group: "Programming / Systems",
    items: [
      { name: "Python", core: true },
      { name: "asyncio", core: true },
      { name: "FastAPI" },
      { name: "Next.js", core: true },
      { name: "React", core: true },
      { name: "TypeScript", core: true },
      { name: "Swift/SwiftUI" },
      { name: "websockets", core: true },
      { name: "SQLite/Supabase", core: true },
      { name: "PyTorch (basic)" },
    ],
  },
  {
    group: "Front-End / Web",
    items: [
      { name: "Next.js", core: true },
      { name: "React", core: true },
      { name: "HTML/CSS/JavaScript", core: true },
      { name: "Shopify Liquid", core: true },
    ],
  },
  {
    group: "Ecommerce & Growth",
    items: [
      { name: "Shopify", core: true },
      { name: "Google Ads" },
      { name: "Meta Ads" },
      { name: "GA4 / GTM", core: true },
      { name: "creative testing" },
    ],
  },
  {
    group: "Creative & Design",
    items: [
      { name: "Adobe Photoshop", core: true },
      { name: "After Effects" },
      { name: "Premiere Pro" },
    ],
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
