// Display order below is the canonical order: it drives the homepage grid, the /work
// archive, and case-study prev/next via getAdjacentProjects.
// `homepage` selects the Selected Work roster; `featured` marks the single flagship.
// `cardTechStack` is the card chip list (max 4); `techStack` stays the full detail-page stack.
export const projects = [
  {
    slug: "ask-the-claude-docs",
    title: "Ask the Claude Docs",
    cardTitle: "Ask the Claude Docs · RAG Chatbot",
    subline: "An evaluated RAG chatbot with honest refusals",
    tagline:
      "A RAG assistant over the live Claude Code documentation. Every answer cites the exact doc passage it came from; when nothing clears a calibrated confidence threshold, it declines instead of guessing, and shows its receipts. Quality is measured, not claimed: a CI eval harness scores retrieval and answer quality on every change and publishes the results, failures included.",
    cardDescription:
      "A RAG chatbot that proves its answers or refuses to give one. Every response cites the exact passages behind it, the refusal line is calibrated from real data, and a public eval suite scores every change in CI.",
    category: "built",
    homepage: true,
    featured: true,
    image: "/images/the-claude-docs.png",
    liveUrl: "https://ask-the-claude-docs.vercel.app",
    githubUrl: "https://github.com/BrandonChurch93/Ask-the-Claude-Docs",
    githubLabel: "View Code",
    cardTechStack: ["RAG Pipeline", "CI-Scored Evals", "pgvector", "Cited Answers"],
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
      { value: "Nightly", label: "Full-corpus re-sync" },
      { value: "0", label: "LLM calls when it refuses" },
      {
        value: "Live",
        label: "CI-scored eval scoreboard",
        href: "https://ask-the-claude-docs.vercel.app/evals",
      },
    ],
    description:
      "A production RAG pipeline end to end: a nightly GitHub Action ingests the live Claude Code docs, chunks them along heading boundaries, and embeds only what changed (an unchanged corpus re-syncs in 26 seconds with zero embedding calls). Questions are answered by Claude Haiku from retrieved passages only, streamed with the sources arriving before the first token, with real cost printed on every receipt. The distinctive part is what happens when it can't answer: a server-side gate calibrated from measured score distributions refuses before the model is ever called, and a public /evals page shows retrieval accuracy, LLM-judged answer quality with a noise margin, and the refusal tests, all re-run by CI so a regression cannot merge. The entire application was built by Claude Code executing twelve specification documents I wrote, under a three-tier decision authority that escalated ten real engineering conflicts to me for rulings. Hand-built editorial design system in three typefaces, no UI framework, with accessibility gated in CI.",
    features: [
      "Server-side refusal gate: below the calibrated similarity threshold the model is never called; a decline costs 30x less than an answer and says so on its receipt",
      "Passage-level citations streamed sources-first over SSE; every [n] marker deep-links to the exact heading on code.claude.com",
      "Public eval scoreboard: retrieval hit@5 and MRR plus a four-check LLM judge with a measured noise margin, re-run by CI on every change; regressions cannot merge",
      "Self-maintaining corpus: a daily Action hash-diffs the live docs and embeds only deltas; first ingest 8 minutes, unchanged re-sync 26 seconds",
      "Spend defenses with asymmetric failure postures: per-IP rate limiting fails open, the global daily spend cap fails closed; every receipt computes cost from real API usage",
      "Built by an AI agent under governance: twelve frozen spec documents, three-tier decision authority, phase gates with self-audits, ten escalated rulings, all logged",
      "Hand-built design system: three typefaces as three voices, token palette with measured WCAG contrast, no UI framework",
      "Hardened CI: Playwright e2e with axe, Lighthouse budgets, payload assertions, secret greps and CVE gates that caught three real advisories mid-build",
    ],
  },
  {
    slug: "modern-softworks",
    title: "Modern Softworks",
    tagline: "A full marketing site for my studio, Modern Softworks. Custom design system from scratch, no UI framework. 22 routes, MDX content pipeline, and enterprise security headers. Accessibility enforced as a hard build failure.",
    cardDescription:
      "My studio's site, where accessibility and SEO literally fail the build below a 90. Hand-built design system on 194 CSS tokens, no UI framework, 22 routes of MDX content.",
    category: "built",
    homepage: true,
    featured: false,
    image: "/images/ModernSoftworks.png",
    liveUrl: "https://www.modernsoftworks.com",
    githubUrl: null,
    cardTechStack: ["Design System", "MDX Pipeline", "GSAP", "Security Headers"],
    techStack: ["Next.js 15", "React 19", "TypeScript", "GSAP", "MDX", "Resend", "Vercel"],
    metrics: [
      { value: "48", label: "Hand-built components" },
      { value: "22", label: "Pages" },
      { value: "Custom", label: "Accessibility CI/CD" },
    ],
    description:
      "The website for my development studio, Modern Softworks. A full marketing site with lead generation, blog, case studies, and service pages built for private-sector and federal clients. The entire design system is hand-built on CSS custom properties. No Tailwind, no UI framework. 48 components, a semantic color system, typography scale, and spacing tokens all from scratch. Lighthouse CI fails the build if accessibility drops below 90%. Enterprise-grade security headers and AVIF/WebP images.",
    features: [
      "Custom design system: 48 components, 10 section modules, full token system with no framework dependency",
      "MDX content pipeline with 8 blog posts, 6 guides, 3 case studies, reading time, table of contents, and RSS feeds",
      "Dynamic OG image generation per page using Next.js ImageResponse API",
      "Context-aware consultation modal that pre-fills based on which service page the user is on",
      "Canvas 2D particle field and GSAP scroll-triggered animations",
      "Lighthouse CI enforces accessibility and SEO as hard build failures on every push",
      "Enterprise security headers: full CSP, HSTS with preload, X-Frame-Options DENY",
      "No tracking pixels, no chat widgets.",
    ],
  },
  {
    slug: "hero-animation-builder",
    title: "Hero Animation Builder",
    subline: "Design a hero animation, watch it ship itself",
    tagline:
      "An interactive builder for SVG arc animations: tune the line, five independent glow layers, an entrance draw, and continuous breathing motion through 36 live controls, then see the design rendered on a fictional fintech marketing site. The whole configuration encodes into the URL, so every design is instantly shareable. Hand-built animation system, minimal runtime dependencies, no animation library.",
    cardDescription:
      "An SVG animation builder with 36 live controls that never lag, because React never re-renders the graphic. Design a layered arc hero, watch a staged fintech site light up with it, and share the whole design as a URL.",
    category: "built",
    homepage: true,
    featured: false,
    image: "/images/animation-builder.png",
    liveUrl: "https://hero-animation-builder.vercel.app",
    githubUrl: "https://github.com/BrandonChurch93/HeroAnimationBuilder",
    githubLabel: "View Code",
    cardTechStack: ["SVG Animation", "36 Live Controls", "Shareable State", "APCA Contrast"],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "react-colorful",
      "SVG",
      "CSS 3D Transforms",
      "Vercel",
    ],
    metrics: [
      { value: "36", label: "Live animation controls" },
      { value: "5", label: "Independent glow layers" },
      { value: "0", label: "Animation libraries" },
    ],
    description:
      "A two-sided piece: a builder and a stage. The builder exposes the full anatomy of a hero arc animation (line thickness and brightness falloff, five named glow layers from Upper Far to Lower Far each with its own color, width, blur, opacity, and offset, a choreographed entrance draw, and a breathing loop) with five tuned presets and a randomizer. The stage is /live, a deliberately fictional fintech brand whose hero, feature grid, and CTA are all lit by whatever the user designed: the config travels as base64 JSON in the URL and is decoded during server-side rendering, no storage anywhere. Two craft decisions do the heavy lifting. The arc is imperatively built SVG, constructed once with attribute-only updates afterward, which is why 36 controls feel instant. And color legibility is guaranteed by an inline implementation of APCA-W3 (the SA98G algorithm): it picks button text color against any user accent and progressively lightens accent-colored text until it clears perceptual contrast thresholds, solving the saturated-hue-on-dark-UI problem that WCAG 2.x luminance math gets wrong.",
    features: [
      "Imperatively built SVG arc: constructed once, then attribute-only updates, so every slider responds instantly with no re-render of the graphic",
      "Inline APCA-W3 (SA98G) contrast engine: picks button text color for any accent and lightens accent text in 5% steps until perceptual legibility thresholds pass",
      "Every design is a URL: the full config encodes as base64 JSON into a query param and decodes during SSR on the staged site, no storage, instantly shareable",
      "Five independent glow layers (Upper Far, Upper Near, Inner, Lower Near, Lower Far), each with its own color, width, blur, opacity, and vertical offset",
      "Choreographed motion: a timed entrance draw with staged glow fade-in, then a continuous breathing loop with speed, intensity, and drift controls",
      "CSS-3D showcase card driven by a hand-written requestAnimationFrame lerp loop, perspective and preserve-3d only, no Three.js",
      "A deliberately fictional fintech brand stages the work: the user's design lights the hero, the ambient card lighting, and the closing CTA",
      "Deliberately few runtime dependencies; the animation system, the contrast engine, and the 3D interaction are all hand-built",
    ],
  },
  {
    slug: "micro-interactions-library",
    title: "Micro-Interactions Library",
    tagline: "15 components, zero animation libraries, built in a weekend.",
    cardDescription:
      "Fifteen copy-paste micro-interactions, zero animation libraries. The code you copy is the exact code you just watched run, and accessibility isn't a checkbox here, it's three of the fifteen patterns.",
    category: "built",
    homepage: true,
    featured: false,
    image: "/images/MicroInteractions.svg",
    liveUrl: "https://micro-interactions-library.vercel.app/",
    githubUrl: "https://github.com/BrandonChurch93/micro-interactions-library",
    cardTechStack: ["Zero Animation Libs", "React Aria", "Reduced Motion", "Static Generation"],
    techStack: ["Next.js 14", "TypeScript", "CSS Modules", "Web Animations API", "react-aria-components", "Shiki", "Vercel"],
    metrics: [
      { value: "15", label: "Components" },
      { value: "0", label: "Animation libraries" },
      { value: "6", label: "Total dependencies" },
    ],
    description:
      "A collection of 15 production-ready micro-interaction components built as a copy-paste resource for frontend developers. Every animation runs on CSS transitions or the native Web Animations API. No Framer Motion, no GSAP, no animation libraries. Animations use predominantly transform and opacity for GPU-only rendering. The entire site is statically generated with only 6 production dependencies.",
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
    cardDescription:
      "Feed it a resume and a job post, get a letter built to an 80-line, paragraph-by-paragraph spec, not a vibe. Extracted context goes in as structured signals, and it exports PDF, Word, or plain text.",
    category: "built",
    homepage: false,
    featured: false,
    image: "/images/AiCoverLetterGenerator.png",
    liveUrl: "https://ai-cover-letter-generator-ten.vercel.app/",
    githubUrl: "https://github.com/BrandonChurch93/AICoverLetterGenerator",
    cardTechStack: ["Prompt Spec", "Context Extraction", "Model Fallback Chain"],
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
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug) {
  const navigable = projects.filter((p) => !p.comingSoon);
  const index = navigable.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? navigable[index - 1] : null,
    next: index < navigable.length - 1 ? navigable[index + 1] : null,
  };
}
