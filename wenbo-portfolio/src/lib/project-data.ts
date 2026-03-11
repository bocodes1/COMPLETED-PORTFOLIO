export interface Project {
  id: string;
  category: string;
  title: string;
  shortTitle: string;
  timeline?: string;
  overview: string;
  role: string;
  tools: string[];
  problem: string;
  solution: string[];
  outcomes: string[];
  mediaPath: string;
  gradient: string;
  number: string;
  hasVideo: boolean;
  videoFile?: string;
}

export const projects: Project[] = [
  {
    id: "guyu",
    category: "Front-End & Growth",
    title: "GUYU — Front-End & Growth",
    shortTitle: "GUYU",
    timeline: "June 2025 — January 2026",
    overview:
      "Supported GUYU's North America expansion (US & Canada) by building the Shopify storefront foundation, shaping go-to-market positioning, and setting up the early growth system to increase awareness and social credibility.",
    role: "Business Builder / Growth + Front-End Execution (North America Launch)",
    tools: [
      "Shopify",
      "Google Ads",
      "Meta Ads",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "GA4",
      "Google Tag Manager",
      "Creative Testing",
      "Influencer Outreach",
      "Liquid",
    ],
    problem:
      "GUYU is a well-established skincare brand in China, but its North American presence (US & Canada) was still early. The challenge wasn't creating a brand from zero—it was translating a proven product line into a North America-ready storefront and growth system, while building awareness and social credibility in a market where GUYU had limited visibility.",
    solution: [
      "Conducted North America-focused market and competitor research to refine positioning, messaging, and offer strategy",
      "Built and structured a Shopify storefront for US/Canada customers (collection hierarchy, PDP clarity, and conversion-focused layout)",
      "Supported paid acquisition setup and planning across Google Ads and Meta Ads with measurement readiness in mind",
      "Implemented analytics foundations (GA4 + GTM) to track core funnel actions and inform iteration",
      "Developed social content direction and UGC guidelines to improve hooks, clarity, and scroll-stopping creative",
      "Identified and shortlisted influencer partners aligned with GUYU's product positioning and supported outreach coordination",
    ],
    outcomes: [
      "Launched a North America-ready Shopify storefront and established a clear go-to-market foundation",
      "Created a repeatable creative + testing workflow to iterate faster and reduce guesswork",
      "Improved tracking readiness to support smarter budget allocation and performance analysis",
      "Built an influencer pipeline to increase social proof and brand visibility for US/Canada audiences",
    ],
    mediaPath: "/assets/work/guyu",
    gradient: "from-violet-600/20 via-blue-600/20 to-cyan-400/20",
    number: "01",
    hasVideo: true,
    videoFile: "GUYUDEMO.mp4",
  },
  {
    id: "refined-concept",
    category: "Ecommerce Brand Build",
    title: "Refined Concept — Ecommerce Brand Build",
    shortTitle: "Refined Concept",
    overview:
      "Co-founded an ecommerce brand with Edison (University of Western Ontario) selling modern furniture and home decor with IKEA-level affordability but a more premium, prestige feel.",
    role: "Co-Founder / Brand & Growth Lead",
    tools: [
      "Shopify",
      "Adobe Photoshop",
      "Figma",
      "Google Ads",
      "Meta Ads",
    ],
    problem:
      "The modern furniture market is dominated by either expensive designer brands or cheap, generic options. We saw an opportunity to create a brand that offers quality modern furniture at accessible prices while maintaining a premium aesthetic.",
    solution: [
      "Defined brand positioning: affordable prestige — IKEA pricing with elevated design",
      "Developed product direction focused on modern couches, furniture, and home decor",
      "Built premium Shopify storefront with sophisticated UI and clear brand identity",
      "Created collection structure and merchandising logic for intuitive browsing",
      "Established visual language and brand guidelines for consistent presentation",
    ],
    outcomes: [
      "Launched cohesive brand with clear market differentiation",
      "Built storefront that communicates premium value at accessible prices",
      "Created scalable collection framework for product expansion",
      "Established partnership workflow for ongoing collaboration",
    ],
    mediaPath: "/assets/work/refined-concept",
    gradient: "from-amber-500/20 via-orange-600/20 to-rose-500/20",
    number: "02",
    hasVideo: true,
    videoFile: "RCDEMO.mp4",
  },
  {
    id: "ads-growth-engine",
    category: "Performance Marketing / Creative Strategy",
    title: "Ads + Growth Engine",
    shortTitle: "Ads + Growth Engine",
    overview:
      "Creative strategy + production and Google/Meta execution with tracking foundations and a repeatable testing loop to drive higher CTR and scalable acquisition.",
    role: "Creative Strategist / Performance Marketer",
    tools: [
      "Meta Ads",
      "Google Ads",
      "Creative Strategy",
      "Creative Production",
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "GA4",
      "Google Tag Manager",
      "Creative Testing",
      "Attribution Setup",
    ],
    problem:
      "Performance stalls when creative is inconsistent and measurement is unclear—teams burn budget without learning what actually drives attention, clicks, and conversions.",
    solution: [
      "Developed creative strategy and test plans (hooks, angles, formats, CTAs) to generate consistent iterations",
      "Produced UGC-style creatives with strong first 2 seconds using Photoshop / Premiere Pro / After Effects to improve scroll-stop and CTR",
      "Ran and optimized campaigns across Meta Ads + Google Ads to test, learn, and scale winners",
      "Set up GA4 + GTM foundations to track key funnel actions and turn results into next tests",
      "Built a repeatable loop: test → analyze → iterate in short cycles to reduce guesswork",
    ],
    outcomes: [
      "Faster creative iteration with clearer learnings per test cycle",
      "More consistent ad performance workflow across channels",
      "Tracking-ready foundation for smarter optimization and scaling",
    ],
    mediaPath: "/assets/work/ads-growth-engine",
    gradient: "from-emerald-500/20 via-teal-600/20 to-cyan-400/20",
    number: "03",
    hasVideo: false,
  },
  {
    id: "frontend-conversion-ui",
    category: "Development / Conversion UI",
    title: "Front-End + Conversion UI Builds",
    shortTitle: "Conversion UI Builds",
    overview:
      "Cost-efficient, high-conversion websites and storefront UIs designed for speed, clarity, and fast decision-making.",
    role: "Front-End Builder / Conversion-Focused UI",
    tools: [
      "Next.js",
      "React",
      "HTML/CSS/JavaScript",
      "Shopify",
      "Liquid",
      "UI Systems",
      "Performance Optimization",
    ],
    problem:
      "Most sites lose users because pages are slow, cluttered, or confusing—people won't spend time figuring things out.",
    solution: [
      "Built modern front-end pages with clear hierarchy, strong typography, and minimal friction",
      "Designed conversion-first layouts (above-the-fold clarity, strong CTAs, trust cues, clean navigation)",
      "Implemented Shopify storefront structure when applicable (collections, PDP clarity, merchandising flow)",
      "Optimized for speed and maintainability (reusable sections/components, lightweight assets)",
    ],
    outcomes: [
      "Faster browsing and clearer paths to purchase/contact",
      "More premium perception through consistent spacing and UI polish",
      "Easier iteration because the structure is modular and reusable",
    ],
    mediaPath: "/assets/work/frontend-conversion-ui",
    gradient: "from-fuchsia-500/20 via-purple-600/20 to-indigo-500/20",
    number: "04",
    hasVideo: false,
  },
];

export const skills = {
  "Creative & Design": [
    { name: "Adobe Photoshop", icon: "/assets/icons/photoshop.svg" },
    { name: "Adobe After Effects", icon: "/assets/icons/after-effects.svg" },
    { name: "Adobe Premiere Pro", icon: "/assets/icons/premiere-pro.svg" },
  ],
  "Front-End / Web": [
    { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
    { name: "React", icon: "/assets/icons/react.svg" },
    { name: "HTML/CSS/JavaScript", icon: "/assets/icons/html-css-js.svg" },
  ],
  "Programming / Automation": [
    { name: "Python", icon: "/assets/icons/python.svg" },
  ],
  "Ecommerce & Growth": [
    { name: "Shopify", icon: "/assets/icons/shopify.svg" },
    { name: "Google Ads", icon: "/assets/icons/google-ads.svg" },
    { name: "Meta Ads", icon: "/assets/icons/meta-ads.svg" },
    { name: "GA4 / GTM", icon: "/assets/icons/ga4-gtm.svg" },
    { name: "Creative Testing", icon: "/assets/icons/creative-testing.svg" },
  ],
};

export const education = [
  {
    status: "Current",
    school: "University of Toronto",
    degree: "Bachelor of Commerce",
    description:
      "Currently pursuing a Bachelor of Commerce, building business acumen alongside practical skills in marketing, strategy, and execution.",
    isCurrent: true,
  },
  {
    status: "Completed",
    school: "Heritage Woods Secondary School",
    degree: "High School",
    description:
      "Foundation in academics and early exposure to technology and business concepts.",
    isCurrent: false,
  },
];

export const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/wenbozhao123",
    icon: "instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/wenbo-zhao-5035a5332/",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/bocodes1",
    icon: "github",
  },
  {
    name: "X",
    url: "https://x.com/Boboscales",
    icon: "x",
  },
];
