# Project Cards & Section Intros · Final Copy

Status: APPROVED by Brandon (Jul 28, 2026). Ship verbatim. No paraphrasing, no "improvements."

## Card descriptions (cardDescription field)

**Ask the Claude Docs (flagship, Selected Work)**
A RAG chatbot that proves its answers or refuses to give one. Every response cites the exact passages behind it, the refusal line is calibrated from real data, and a public eval suite scores every change in CI.

**Modern Softworks**
My studio's site, where accessibility and SEO literally fail the build below a 90. Hand-built design system on 194 CSS tokens, no UI framework, 22 routes of MDX content.

**Hero Animation Builder**
An SVG animation builder with 36 live controls that never lag, because React never re-renders the graphic. Design a layered arc hero, watch a staged fintech site light up with it, and share the whole design as a URL.

**Micro-Interactions Library**
Fifteen copy-paste micro-interactions, zero animation libraries. The code you copy is the exact code you just watched run, and accessibility isn't a checkbox here, it's three of the fifteen patterns.

**AI Cover Letter Generator (archive only)**
Feed it a resume and a job post, get a letter built to an 80-line, paragraph-by-paragraph spec, not a vibe. Extracted context goes in as structured signals, and it exports PDF, Word, or plain text.

## Section intros

**Selected Work (homepage):** Designed, built, and shipped end to end. These are the highlights.

**All Work (/work page header):** Everything I've shipped. The homepage keeps the highlights, this page keeps growing.

## Chip lists (max 4, no version numbers, differentiators only)

- Ask the Claude Docs: RAG Pipeline · CI-Scored Evals · pgvector · Cited Answers
- Modern Softworks: Design System · MDX Pipeline · GSAP · Security Headers
- Hero Animation Builder: SVG Animation · 36 Live Controls · Shareable State · APCA Contrast
- Micro-Interactions Library: Zero Animation Libs · React Aria · Reduced Motion · Static Generation
- AI Cover Letter Generator: Prompt Spec · Context Extraction · Model Fallback Chain

## Truth sweep (build doc items, from the Opus code audit)

Detail-page claims to correct because the code contradicts them:
1. Modern Softworks: "WebGL particle field" → it is Canvas 2D; also delete the dead `ogl` dependency.
2. Modern Softworks: "Zero third-party scripts" → false (Vercel Analytics in CSP allowlist). "No tracking pixels or chat widgets" is the defensible claim.
3. Micro-Interactions: "7 total dependencies" → 6.
4. Micro-Interactions: "exclusively transform and opacity" → "predominantly" (keyframe inventory includes width/height/box-shadow etc).
5. Chatbot: don't hardcode 0.90 judged pass rate on the card/detail page; reference the live eval scoreboard instead so displayed numbers can't drift from evals/latest.json.
