export const projects = [
  {
    slug: "modern-softworks",
    title: "Modern Softworks",
    tagline: "A full marketing site for my studio, Modern Softworks. Custom design system from scratch, no UI framework. 22 routes, MDX content pipeline, and enterprise security headers. Accessibility enforced as a hard build failure.",
    featured: true,
    image: "/images/ModernSoftworks.png",
    liveUrl: "https://www.modernsoftworks.com",
    githubUrl: null,
    techStack: ["Next.js 15", "React 19", "TypeScript", "GSAP", "OGL", "MDX", "Resend", "Vercel"],
    metrics: [
      { value: "48", label: "Hand-built components" },
      { value: "22", label: "Pages" },
      { value: "Custom", label: "Accessibility CI/CD" },
    ],
    description:
      "The website for my development studio, Modern Softworks. A full marketing site with lead generation, blog, case studies, and service pages built for private-sector and federal clients. The entire design system is hand-built on CSS custom properties. No Tailwind, no UI framework. 48 components, a semantic color system, typography scale, and spacing tokens all from scratch. Lighthouse CI fails the build if accessibility drops below 90%. Enterprise-grade security headers, zero third-party scripts, and AVIF/WebP only for images.",
    features: [
      "Custom design system: 48 components, 10 section modules, full token system with no framework dependency",
      "MDX content pipeline with 8 blog posts, 6 guides, 3 case studies, reading time, table of contents, and RSS feeds",
      "Dynamic OG image generation per page using Next.js ImageResponse API",
      "Context-aware consultation modal that pre-fills based on which service page the user is on",
      "WebGL particle field and GSAP scroll-triggered animations",
      "Lighthouse CI enforces accessibility and SEO as hard build failures on every push",
      "Enterprise security headers: full CSP, HSTS with preload, X-Frame-Options DENY",
      "Zero third-party scripts. No tracking pixels, no chat widgets, no external JS.",
    ],
  },
  {
    slug: "ask-the-claude-docs",
    title: "Ask the Claude Docs",
    cardTitle: "Ask the Claude Docs · RAG Chatbot",
    subline: "An evaluated RAG chatbot with honest refusals",
    tagline:
      "A RAG assistant over the live Claude Code documentation. Every answer cites the exact doc passage it came from; when nothing clears a calibrated confidence threshold, it declines instead of guessing, and shows its receipts. Quality is measured, not claimed: a CI eval harness scores retrieval and answer quality on every change and publishes the results, failures included.",
    cardDescription:
      "A retrieval-augmented chatbot over the Claude Code docs that proves its answers. Passage-level citations, server-side refusals when the docs don't cover it, and a public eval scoreboard wired into CI.",
    featured: false,
    image: "/images/the-claude-docs.png",
    liveUrl: "https://ask-the-claude-docs.vercel.app",
    githubUrl: "https://github.com/BrandonChurch93/Ask-the-Claude-Docs",
    githubLabel: "View Code",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL + pgvector",
      "Anthropic API",
      "OpenAI Embeddings",
      "Upstash Redis",
      "GitHub Actions",
      "Playwright",
      "Vercel",
    ],
    metrics: [
      { value: "0.90", label: "Judged answer pass rate" },
      { value: "3,141", label: "Doc chunks, re-synced nightly" },
      { value: "5/5", label: "Off-topic questions correctly refused" },
    ],
    description:
      "A production RAG pipeline end to end: a nightly GitHub Action ingests the live Claude Code docs, chunks them along heading boundaries, and embeds only what changed (an unchanged corpus re-syncs in 26 seconds with zero embedding calls). Questions are answered by Claude Haiku from retrieved passages only, streamed with the sources arriving before the first token, with real cost printed on every receipt. The distinctive part is what happens when it can't answer: a server-side gate calibrated from measured score distributions refuses before the model is ever called, and a public /evals page shows retrieval accuracy, LLM-judged answer quality with a noise margin, and the refusal tests, all re-run by CI so a regression cannot merge. The entire application was built by Claude Code executing twelve specification documents I wrote, under a three-tier decision authority that escalated ten real engineering conflicts to me for rulings. Hand-built editorial design system in three typefaces, no UI framework, zero accessibility violations.",
    features: [
      "Server-side refusal gate: below the calibrated similarity threshold the model is never called; a decline costs 30x less than an answer and says so on its receipt",
      "Passage-level citations streamed sources-first over SSE; every [n] marker deep-links to the exact heading on code.claude.com",
      "Public eval scoreboard: retrieval hit@5 and MRR plus a four-check LLM judge with a measured noise margin, re-run by CI on every change; regressions cannot merge",
      "Self-maintaining corpus: a daily Action hash-diffs the live docs and embeds only deltas; first ingest 8 minutes, unchanged re-sync 26 seconds",
      "Spend defenses with asymmetric failure postures: per-IP rate limiting fails open, the global daily spend cap fails closed; every receipt computes cost from real API usage",
      "Built by an AI agent under governance: twelve frozen spec documents, three-tier decision authority, phase gates with self-audits, ten escalated rulings, all logged",
      "Hand-built design system: three typefaces as three voices, token palette with measured WCAG contrast, no UI framework, zero axe violations",
      "Hardened CI: Playwright e2e with axe, Lighthouse budgets, payload assertions, secret greps and CVE gates that caught three real advisories mid-build",
    ],
  },
  {
    slug: "micro-interactions-library",
    title: "Micro-Interactions Library",
    tagline: "15 components, zero animation libraries, built in a weekend.",
    featured: false,
    image: "/images/MicroInteractions.svg",
    liveUrl: "https://micro-interactions-library.vercel.app/",
    githubUrl: "https://github.com/BrandonChurch93/micro-interactions-library",
    techStack: ["Next.js 14", "TypeScript", "CSS Modules", "Web Animations API", "react-aria-components", "Shiki", "Vercel"],
    metrics: [
      { value: "15", label: "Components" },
      { value: "0", label: "Animation libraries" },
      { value: "7", label: "Total dependencies" },
    ],
    description:
      "A collection of 15 production-ready micro-interaction components built as a copy-paste resource for frontend developers. Every animation runs on CSS transitions or the native Web Animations API. No Framer Motion, no GSAP, no animation libraries. All animations use transform and opacity exclusively for GPU-only rendering. The entire site is statically generated with only 7 production dependencies.",
    features: [
      "15 interactive demos with live preview, syntax-highlighted code, and one-click copy",
      "Command palette search (Cmd+K) with fuzzy matching across all components",
      "Accessibility-first: WCAG 2.1 AA, prefers-reduced-motion respected globally, built on react-aria-components",
      "Hydration-safe dark/light theme toggle with no flash of wrong theme",
    ],
  },
  {
    slug: "ai-cover-letter-generator",
    title: "AI Cover Letter Generator",
    tagline: "Resume in, tailored cover letter out, under 30 seconds.",
    featured: false,
    image: "/images/AiCoverLetterGenerator.png",
    liveUrl: "https://ai-cover-letter-generator-ten.vercel.app/",
    githubUrl: "https://github.com/BrandonChurch93/AICoverLetterGenerator",
    techStack: ["Next.js 15", "React 19", "TypeScript", "OpenAI API", "Tailwind CSS", "jsPDF", "Vercel"],
    metrics: [
      { value: "<30s", label: "Generation time" },
      { value: "3", label: "Export formats" },
      { value: "3", label: "AI model fallback chain" },
    ],
    description:
      "A web app that takes a resume and job description and generates a tailored cover letter using OpenAI. The API route extracts context like company name, role, and industry from the input, builds industry-specific prompts using the STAR method, and falls back through a 3-model chain if one is unavailable. Form data is LZ-string compressed and auto-saved to sessionStorage so nothing is lost on refresh. Export as formatted PDF, Word, or plain text.",
    features: [
      "Prompt engineering with regex context extraction and industry-specific STAR method structure",
      "Compressed session persistence with 3-second debounce auto-save",
      "Multi-format export: PDF with auto-pagination, Word with paragraph styling, plain text",
      "Full accessibility infrastructure: focus trapping, aria-live announcements, reduced motion, keyboard shortcuts",
    ],
  },
  {
    slug: "swiftsnapai",
    title: "SwiftSnapAI",
    tagline: "Chrome extension for AI-powered text and image analysis, built when multimodal was brand new.",
    featured: false,
    image: "/images/snapShotAI.png",
    liveUrl: "https://swiftsnapai-3n5uijgvg-brandon-churchs-projects.vercel.app/",
    githubUrl: "https://github.com/BrandonChurch93/swiftsnapai",
    techStack: ["Next.js 15", "React 18", "Chrome MV3", "OpenAI API", "Supabase", "Stripe", "Vite", "Vercel"],
    metrics: [
      { value: "8", label: "Smart AI actions" },
      { value: "3", label: "Pricing tiers" },
      { value: "6", label: "Languages supported" },
    ],
    description:
      "A Chrome extension that lets you highlight text or capture images on any webpage and run AI actions on it without leaving the page. Explain, summarize, fact-check, translate, or generate study guides inline. Built when multimodal AI was just becoming available, this was one of the first extensions to combine GPT-3.5 for text and GPT-4o Vision for image analysis in a single tool. Smart token allocation calculates optimal costs per request based on action type, content length, and user tier. Full Stripe monetization with three pricing tiers, rate limiting at two layers, and an anonymous-to-authenticated upgrade path with zero friction.",
    features: [
      "Inline capture modal with 8 AI actions, conversation threading, and tone selection",
      "GPT-4o Vision image analysis with smart resolution selection based on image complexity",
      "Smart token allocation that scales cost per request by action type, content length, and tier",
      "3-tier Stripe monetization with webhook-driven upgrades and self-service billing portal",
    ],
  },
  {
    slug: "codepen",
    title: "CodePen Collection",
    tagline: "Components, experiments, and creative coding",
    featured: false,
    image: "/images/CodePen-logo.png",
    liveUrl: "https://codepen.io/BrandonLeoChurch",
    githubUrl: null,
    techStack: ["HTML", "CSS", "JavaScript", "React"],
    metrics: [],
    challenge: "",
    approach: "",
    features: [],
    isExternal: true,
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug) {
  const navigable = projects.filter((p) => !p.comingSoon && !p.isExternal);
  const index = navigable.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? navigable[index - 1] : null,
    next: index < navigable.length - 1 ? navigable[index + 1] : null,
  };
}
