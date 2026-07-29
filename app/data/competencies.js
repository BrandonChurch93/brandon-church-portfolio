// Content ships verbatim from .claude/design/competencies-mock-v6.html, which is
// canonical for this section per refinement rule R-A: category names, claims, proofs,
// group labels and every skill item.
//
// `icon` maps each of the mock's line glyphs to its closest lucide equivalent:
//   i-atom→Atom  i-code→Code  i-pen→PenLine  i-layout→LayoutTemplate  i-wave→Waves
//   i-layers→Layers  i-db→Database  i-server→Server  i-zap→Zap  i-branch→GitBranch
//   i-bot→Bot  i-gauge→Gauge  i-shield→ShieldCheck  i-users→Users  i-compass→Compass
//   i-rocket→Rocket  i-search→Search  i-check→CircleCheck  i-doc→FileText  i-plug→Plug
export const competencies = [
  {
    id: "ai-product-engineering",
    index: "01",
    category: "AI Product Engineering",
    claim: "AI products that prove their answers.",
    proof:
      "If a model is in the product, it gets measured. After hours, the same obsession in hardware.",
    groups: [
      {
        label: "Building",
        skills: [
          { icon: "Bot", label: "Claude Code" },
          { icon: "Plug", label: "LLM APIs" },
          { icon: "Database", label: "RAG · hybrid search & re-ranking" },
          { icon: "GitBranch", label: "LangGraph" },
          { icon: "Plug", label: "MCP" },
          { icon: "Bot", label: "Multi-agent orchestration" },
          { icon: "FileText", label: "Context engineering" },
          { icon: "ShieldCheck", label: "Guardrails & structured outputs" },
        ],
      },
      {
        label: "Proving",
        skills: [
          { icon: "CircleCheck", label: "Eval frameworks" },
          { icon: "Users", label: "LLM-as-judge" },
          { icon: "Search", label: "Human-in-the-loop QA" },
          { icon: "Gauge", label: "AI observability" },
          { icon: "Zap", label: "CI-gated evals" },
        ],
      },
    ],
  },
  {
    id: "full-stack-engineering",
    index: "02",
    category: "Full-Stack Engineering",
    claim: "Frontend led. Full stack shipped.",
    proof:
      "A decade deep on the front. Behind it, a backend that holds up at federal scale.",
    groups: [
      {
        label: "Frontend",
        skills: [
          { icon: "Atom", label: "React" },
          { icon: "Code", label: "Next.js" },
          { icon: "ShieldCheck", label: "Angular" },
          { icon: "Code", label: "TypeScript" },
          { icon: "PenLine", label: "Advanced CSS" },
          { icon: "Atom", label: "Three.js" },
          { icon: "Gauge", label: "Performance" },
        ],
      },
      {
        label: "Backend & Data",
        skills: [
          { icon: "Server", label: "Node" },
          { icon: "Server", label: "Python" },
          { icon: "Database", label: "PostgreSQL" },
          { icon: "GitBranch", label: "Data pipelines" },
        ],
      },
      {
        label: "Platforms & Testing",
        skills: [
          { icon: "Rocket", label: "Vercel" },
          { icon: "Server", label: "AWS" },
          { icon: "GitBranch", label: "CI/CD" },
          { icon: "CircleCheck", label: "Automated testing" },
        ],
      },
    ],
  },
  {
    id: "design-systems-craft",
    index: "03",
    category: "Design Systems & Craft",
    claim: "I make products feel inevitable.",
    proof:
      "Tokens to components to motion, built from scratch and built for teams to ship on.",
    groups: [
      {
        label: "Design & Systems",
        skills: [
          { icon: "PenLine", label: "Figma" },
          { icon: "LayoutTemplate", label: "UI/UX design" },
          { icon: "FileText", label: "Information architecture" },
          { icon: "LayoutTemplate", label: "Typography & layout" },
          { icon: "Waves", label: "Motion design" },
          { icon: "Search", label: "User research" },
          { icon: "Layers", label: "Design tokens" },
          { icon: "LayoutTemplate", label: "Component libraries" },
        ],
      },
      {
        label: "Accessibility",
        skills: [
          { icon: "ShieldCheck", label: "WCAG 2.2 & Section 508" },
          { icon: "Code", label: "ARIA" },
          { icon: "Users", label: "Screen reader testing" },
          { icon: "CircleCheck", label: "Auditing & remediation" },
        ],
      },
    ],
  },
  {
    id: "product-leadership",
    index: "04",
    category: "Product Leadership",
    claim: "The role changes. The standard doesn't.",
    proof:
      "VP of Product, studio founder, Director roles across federal and Fortune 500.",
    groups: [
      {
        label: "Leading",
        skills: [
          { icon: "Compass", label: "Product strategy" },
          { icon: "Users", label: "Workshop facilitation" },
          { icon: "Users", label: "Stakeholder management" },
          { icon: "GitBranch", label: "Cross-functional leadership" },
          { icon: "Users", label: "Hiring & mentorship" },
        ],
      },
      {
        label: "Delivering",
        skills: [
          { icon: "Rocket", label: "Zero-to-one launches" },
          { icon: "ShieldCheck", label: "Federal & enterprise compliance" },
          { icon: "FileText", label: "Training & enablement" },
        ],
      },
    ],
  },
];
