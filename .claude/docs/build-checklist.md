# Portfolio v2 Restructure · Build Checklist

Repo: Brandon's portfolio (brandonchurchportfolio.com) · Next.js App Router, plain JS, no TS
Executor: Claude Code (Opus) · Product owner: Brandon Church
This document is the single source of truth for the build. Written 2026-07-28.

---

## How to read this document

Work strictly top to bottom, one step at a time. Every step has:
1. **Do** · the work
2. **Self-audit** · Claude verifies nothing broke and the step is correct, and remediates BEFORE presenting
3. **🔶 BRANDON** · the handoff: exactly which files were touched, where to look in the browser, what to click

**🔶 means Brandon has something to do or decide.** Any line starting with 🔶 is an action or opinion request aimed at him. Nothing else uses this emoji.

Status markers, updated live in this file as work proceeds:
⬜ not started · 🟡 in progress · ✅ done and audited · ⛔ blocked (log why in the Build Log)

---

## Rules (always in force)

1. **Copy is law.** All user-facing text ships verbatim from `.claude/content/*.md` and the inline copy blocks below. Never paraphrase, never "improve," never add. If copy seems missing for something, stop and 🔶 ask.
2. **No em dashes** in any authored UI copy, code comments that render, alt text, or metadata. Use interpuncts (·), commas, or periods. This applies to everything Claude authors in this build.
3. **Do-not-touch register** (visual/structural changes forbidden; sanctioned text edits listed in steps are allowed):
   - Hero section layout, 3D cube, animations
   - Contact section
   - Footer (except confirming CodePen link remains)
   - The design system: tokens, existing animations, hover effects, transitions
   - `/design-system` page, `/cube` page
   - Project detail page layout (P7 edits claim TEXT only)
4. **Stop on red.** Any failing build, failing audit, or console error stops forward progress until fixed and logged.
5. **One step per response.** Finish, self-audit, hand off, wait.
6. **Regression gate on every step:** `npm run build` passes, all existing routes respond, zero new console errors on touched pages.
7. **Update this file** after each step: status marker + one Build Log line. That is the only sanctioned edit to this document besides 🔶-answered decisions being recorded.
8. **Reference materials are canonical:** `.claude/design/homepage-mock-v3.html`, `.claude/design/archive-mock-v2.html` (structure and journey, not pixel-law; the live design system supplies the polish), and `.claude/content/` (all copy).
9. **New components use the existing design language.** Reuse existing tokens, motion patterns, and card conventions. Invent nothing visual.
10. **Scope discipline.** Nothing gets built that this document doesn't name. Ideas go in the Build Log as `[later]` lines.

---

## P0 · Pre-flight  ✅

**Do:**
- P0.1 Verify `.claude/design/` contains `homepage-mock-v3.html` and `archive-mock-v2.html`; verify `.claude/content/` contains `about-copy-final.md`, `project-copy-final.md`, `competency-copy-final.md`. Open and read all five.
- P0.2 Verify `.claude/settings.json` (or settings.local.json) carries the agreed permissions posture (defaultMode acceptEdits, allow/ask/deny lists). Report which file holds it.
- P0.3 Create working branch `v2-restructure`.
- P0.4 Capture baselines: `npm run build` output (route list + sizes), and note current homepage + one project detail page visually (screenshot or description) for before/after.

**Self-audit:** All five reference files readable; build green on the branch before any change.

**🔶 BRANDON:** Confirm the five files are the ones you saved. If any are missing, drop them in before Claude proceeds.

---

## P1 · Step Zero: the purge  ⬜

Dead code deleted first so no later step edits a decoy file.

**Do:**
- P1.1 Delete: `app/page.js` (dead v1 homepage), the entire dead `app/sections/` folder it imports (Hero, About, Skills, Portfolio, Contact), `Navigation.jsx` (dead; live nav is `Nav.jsx`), and the 0-byte `portfolio-data.js`.
- P1.2 Remove the CodePen entry from `projects.js` entirely, including its vestigial empty `challenge`/`approach` fields. Then remove the now-unused `isExternal` handling from every component and from `sitemap.js` filtering IF nothing else uses it (grep first; if anything else uses it, leave the mechanism and log).
- P1.3 Verify the footer still links to CodePen in the socials (the Easter egg). Do not remove it.
- P1.4 🔶 DECISION: `AIAssistant` is commented out in `layout.js` and `/api/chat` is therefore unused. Delete both, or keep for a future feature? Claude proposes: delete (it can be restored from git). Await Brandon's call, then act.

**Self-audit:** `grep -r` for every deleted filename and for `isExternal` returns no live references; `npm run build` passes; homepage renders identically to baseline; `/projects/[slug]` pages all build (CodePen no longer in `generateStaticParams`).

**🔶 BRANDON:** Files touched: deletions above + `projects.js`, possibly `sitemap.js`. Check: homepage looks unchanged, footer still has the CodePen icon, and `yoursite.com/projects/codepen` (or whatever its slug was) now 404s, which is correct.

---

## P2 · Route-aware navigation  ⬜

May already be shipped as the standalone patch discussed on 2026-07-28.

**Do:**
- P2.1 Inspect `Nav.jsx`. If nav links are still hash-only (`#anchor` + `scrollIntoView` with `preventDefault`), implement route-aware links: on `/`, smooth-scroll behavior may remain; on any other route, links navigate to `/#anchor` via real `Link`s. Desktop AND mobile menus.
- P2.2 Add the new nav item **All Work** → `/work` (route created in P6; a dead link is acceptable until then, note it in the log).
- P2.3 Nav label check: section anchor renames from later steps (Selected Work) will be re-verified in P8.4.

**Self-audit:** From `/projects/[any-slug]`, every nav link navigates correctly. From `/`, in-page scrolling still smooth. Keyboard: nav fully tabbable, visible focus.

**🔶 BRANDON:** If you already shipped the nav patch, tell Claude "P2 shipped" and he verifies instead of implements. Test yourself: open any project detail page and click every nav item.

---

## P3 · Data layer  ⬜

**Do:**
- P3.1 In `projects.js`, add to EVERY project: `category: "built"` and `homepage: true|false`. Homepage roster (exactly these four true): ask-the-claude-docs, modern-softworks, hero-animation-builder, micro-interactions. AI Cover Letter Generator: `homepage: false`.
- P3.2 Set `featured: true` on ask-the-claude-docs ONLY (it is currently on modern-softworks; flip it). `featured` now means "flagship."
- P3.3 Reorder the array to the new display order: chatbot, Modern Softworks, Hero Animation Builder, Micro-Interactions, Cover Letter Generator. (Note: `getAdjacentProjects` is array-order-based, so case-study prev/next now follows this order. Intended.)
- P3.4 Update every project's `cardDescription` and card tech chips verbatim from `.claude/content/project-copy-final.md` (descriptions + chip lists sections).
- P3.5 Required-fields completeness pass: every project must have slug, title, tagline, image, category, homepage, featured (bool), cardDescription, techStack (the chip list), description, liveUrl or githubUrl. List any project missing any field; fill from existing data or 🔶 ask.

**Self-audit:** A quick node script (throwaway, not committed) validates every entry has every required field and exactly one `featured: true`; build passes; detail pages render with correct prev/next order.

**🔶 BRANDON:** File touched: `projects.js` only. Check: nothing visual changes yet; spot-check two detail pages still render, and prev/next navigation follows the new order.

---

## P4 · Card components  ⬜

**Do:**
- P4.1 `ProjectCard.jsx`: remove the hardcoded 2×2 grid-span logic (both motion and reduced-motion branches) and the ≤640px `!important` override that fought it. The component becomes the UNIFORM card: image (16:9), title, cardDescription, ≤4 chips, View Project link. Keep existing entrance stagger and hover behavior.
- P4.2 New `FlagshipCard.jsx`: full-width horizontal split card per mock v3 (visual left, body right; stacks on mobile). Eyebrow "Flagship", larger title, description, chips, CTA. Amber-tinted border treatment consistent with existing accent tokens. Reuses existing motion patterns.
- P4.3 `ProjectsSection.jsx` splits: new `SelectedWork.jsx` renders section header + intro + FlagshipCard (the `featured` project) + uniform grid of `homepage && !featured` projects + centered "View all work →" link to `/work`. Old ProjectsSection is deleted after replacement (grep for imports).

**Self-audit:** No component contains a hardcoded grid span; reduced-motion branch intact in both card components; axe clean on the homepage; grid shows exactly three uniform cards.

**🔶 BRANDON:** Files touched: `ProjectCard.jsx`, new `FlagshipCard.jsx`, new `SelectedWork.jsx`, `app/page.jsx`. Check the homepage Selected Work section against `homepage-mock-v3.html`: flagship full-width on top, three identical cards under it, no size mismatches at desktop, tablet, and phone widths.

---

## P5 · Homepage restructure  ⬜

All copy verbatim from `.claude/content/`. Structure per `homepage-mock-v3.html`. Scroll order: Hero · Selected Work · About · Credo strip · Core Competencies · Contact.

**Do:**
- P5.1 Section heading: "Featured Projects" → **Selected Work**, with intro line: `The projects that best show what I do right now. Each one shipped, each one live, each one built end to end.` Update the section anchor id and the hero "View My Work" target accordingly.
- P5.2 About rewrite: heading stays "How I got here". Replace body with the four paragraphs from `about-copy-final.md`, exactly. Keep the existing headshot treatment.
- P5.3 Tidbits: new component under the About text. Label "Tap for the weirder stuff". Five tappable pills (real `<button>`s, `aria-expanded`, one open at a time, expand-in-place panel below the row, keyboard operable, focus-visible, reduced-motion safe). Labels + revealed text verbatim from `competency-copy-final.md`. Photo slots may ship as styled placeholders; 🔶 Brandon supplies real photos later (log as `[later]`).
- P5.4 Credo strip: new full-width band between About and Competencies, styled per mock (subtle accent gradient, thin borders). Text verbatim: `Every product I've shipped has passed federal accessibility audits. All of them.` + sub-line `SECTION 508 · WCAG 2.2 · 100% PASS RATE`. This is the only strip on the page.
- P5.5 Core Competencies rebuild: 2×2 grid of four pillar cards, order and ALL text verbatim from `competency-copy-final.md` (claims, proofs, substack rows in pillar 2, chips). Delete the old three-card layout and its "AI-Augmented Development" chip placement.
- P5.6 Coherence sweep, sanctioned text-only edits:
  a. Subhead: "...end to end, **built on** twelve years of UX, accessibility, and frontend leadership."
  b. $40 billion → **$43 billion** anywhere it appears (About had it; grep the whole repo including metadata).
  c. OG/meta: every title/alt says **AI Product Engineer** (og:image alt currently says "Design Engineer").
  d. 🔶 DECISION: the hero eyebrow still reads "Design Engineer", which splits the lead. Claude proposes replacing it with `Designer · Engineer · Founder`. Approve, supply your own, or keep as-is. Then act.

**Self-audit:** Every copy block diffs clean against its `.claude/content/` source (character-for-character); axe zero violations on `/`; Lighthouse a11y ≥ 0.95; no em dashes anywhere in rendered copy (`grep` the components); tab order sane through tidbits; reduced-motion walk of the whole page.

**🔶 BRANDON:** Files touched: `app/page.jsx`, About/Tidbits/Credo/Competencies components, metadata/OG files. Walk the full homepage against mock v3 top to bottom. Tap all five tidbits (mouse, then keyboard, then phone). Read the About out loud once; it should sound like you. Check the credo strip on mobile.

---

## P6 · /work archive page  ⬜

Greenfield route per `archive-mock-v2.html`.

**Do:**
- P6.1 Create `app/work/page.jsx`: page header **All Work**, breadcrumb "← Home", intro verbatim: `The full catalog. Everything here is real and running, and the list grows as I build.` Uniform grid of ALL projects (uniform `ProjectCard`, no flagship treatment), ordered per the array. Project count line ("5 projects").
- P6.2 Dormant filter system, data-driven: derive categories from `projects.js`. Render the filter row ONLY when 2+ categories each contain ≥1 project. Today that's false, so no filters render and no dead code ships commented out. When true, filters render as accessible pressed-state buttons with counts, filtering the grid. Write it, test it by temporarily faking a second category in dev, then revert the fake.
- P6.3 Category corner-tags on card images follow the same rule: render only when 2+ populated categories exist.
- P6.4 `sitemap.js`: add the `/work` entry manually (hand-authored file). Metadata: title/description for the page, consistent titling (AI Product Engineer).
- P6.5 Confirm nav "All Work" (from P2.2) now resolves.

**Self-audit:** `/work` builds statically where possible (note the client boundary from ProjectCard's framer-motion); axe zero violations; filter logic verified via the dev-fake then reverted (grep to confirm reversion); sitemap includes `/work`; page renders correctly at all three widths.

**🔶 BRANDON:** Files touched: new `app/work/page.jsx`, `sitemap.js`, small nav confirm. Visit `/work` directly and via nav from a project detail page. Confirm: five uniform cards, no filters visible (correct for now), count reads 5, breadcrumb works.

---

## P7 · Truth sweep (detail pages)  ⬜

Claim TEXT corrections only; layout untouched. From the code audit of 2026-07-28.

**Do:**
- P7.1 Modern Softworks detail: "WebGL particle field" → "Canvas 2D particle field" (or drop the claim). 
- P7.2 Modern Softworks detail: replace "Zero third-party scripts..." with the defensible claim: "No tracking pixels, no chat widgets."
- P7.3 Micro-Interactions detail: "7 total dependencies" → "6"; "exclusively transform and opacity" → "predominantly transform and opacity".
- P7.4 Chatbot detail: remove any hardcoded judged pass rate (0.90); replace with a link to the live eval scoreboard so displayed numbers can't drift.
- P7.5 Grep all detail content for other absolute claims ("zero", "all", "every", "exclusively") and list any that look risky in the Build Log for Brandon; change nothing beyond P7.1-7.4 without a 🔶 answer.
- 🔶 SIDE QUEST (different repo, Brandon's task, not Claude's): delete the dead `ogl` dependency from the Modern Softworks site's own codebase.

**Self-audit:** The four corrections verified in rendered pages; no layout diffs; build passes.

**🔶 BRANDON:** Files touched: `projects.js` (description/features fields) only. Read the Modern Softworks and Micro-Interactions detail pages once through; everything stated should now be code-true.

---

## P8 · Polish + integration pass  ⬜

**Do:**
- P8.1 Motion: new components (FlagshipCard, SelectedWork grid, Tidbits, Credo, Competencies, /work grid) use the site's existing entrance/stagger/hover patterns. No new motion vocabulary. Reduced-motion twin for everything.
- P8.2 Spacing/rhythm: section paddings and internal gaps consistent with existing sections; no one-off values without a token.
- P8.3 Images: flagship + three grid cards + archive cards all share aspect ratio treatment. 🔶 Brandon: a wide crop/screenshot of the chatbot for the flagship visual would land here; existing card image works meanwhile.
- P8.4 Cross-check every nav label against final section names and anchors.
- P8.5 Full-repo hygiene grep: em dashes in authored copy (zero), leftover mock vocabulary ("provisional", "placeholder") in shipped code (zero, except tidbit photo placeholders if P5.3 note stands).

**Self-audit:** Visual walk at 360px, 768px, 1280px; hover and focus states on every interactive element; `prefers-reduced-motion` full-page walk; console clean on every route.

**🔶 BRANDON:** No new files, refinements across the set. Do your own three-width walk and flag anything that feels off-rhythm against the rest of the site. This is the step where "feels premium" gets judged, so be picky.

---

## P9 · Final audits  ⬜

**Do:**
- P9.1 axe on `/`, `/work`, two detail pages: zero violations, hard requirement.
- P9.2 Lighthouse on `/` and `/work`: accessibility and SEO ≥ 0.95; performance/best-practices recorded (no regression vs P0.4 baseline beyond noise).
- P9.3 Full keyboard-only journey: land on `/`, reach and operate every interactive element through to sending the contact form focus, tidbits included.
- P9.4 Route inventory: `/`, `/work`, all `/projects/[slug]`, `/design-system`, `/cube`, sitemap.xml, robots, OG images render.
- P9.5 Decoy check: grep proves none of the P1 deletions are referenced anywhere.
- P9.6 Build log completed; every step above shows ✅.

**Self-audit is the step.** Remediate anything found, re-run, then hand off.

**🔶 BRANDON · FINAL AUDIT:** Claude will present a completed checklist summary with numbers. Your walk: (1) full homepage scroll on desktop and phone, (2) tap every tidbit, (3) click every nav link from a detail page, (4) visit /work, (5) read About and both reworked detail pages once, (6) confirm the credo strip is the only strip. Approve or punch-list.

---

## P10 · Ship  ⬜

**Do:**
- P10.1 Merge `v2-restructure` per Brandon's go.
- P10.2 🔶 Brandon deploys via his normal pipeline (Claude provides the exact commands/PR if asked).
- P10.3 Post-deploy spot check on production: homepage, /work, one detail page, sitemap.xml, OG preview via a link-preview tool.
- P10.4 Log `[later]` wishlist for the next cycle: tidbit photos, concept study + Concepts section thaw (design already specced: split card, domain chips, intro line, in the decision log), LinkedIn About variant, chatbot wide screenshot if not landed in P8.3.

**🔶 BRANDON:** Say ship. Then go update LinkedIn with the $43 billion you've been underselling by three.

---

## Build Log

(One line per step: date · step · result · anything notable. ⛔ entries get a cause.)

- 2026-07-28 · Document created. Awaiting P0.
- 2026-07-28 · P0 · ✅ All five reference files read. Permissions posture lives in `.claude/settings.local.json` (no `settings.json`); defaultMode acceptEdits, allow/ask/deny present as agreed. Branch `v2-restructure` created off `main`. Baseline build green (Next 16.2.2, 14 static pages, 6 project slugs); route list + homepage/detail-page description saved to scratchpad `P0-baseline.md`.
- 2026-07-28 · P0 · Note · Repo root is `brandon-church-portfolio/`, one level below the session working directory. All checklist paths resolve relative to it.
- 2026-07-28 · P0 · ⚠️ Pre-existing dirty worktree carried onto the branch: 10 untracked files in `app/components/` (incl. `Navigation.jsx`, a P1.1 delete target) and 4 deleted-but-uncommitted `.claude/*.md` predecessors. `Navigation.jsx` is NOT in git, so P1.1 deleting it is NOT reversible. 🔶 answer needed before P1 runs.
- 2026-07-28 · P0 · Note · `isExternal` has an unrelated local-variable namesake in `Button.jsx:153-158` (derived from `href.startsWith("http")`). P1.2's grep must not touch it.
- 2026-07-28 · P0 · Note · Detail pages back-link to `/#projects` (`app/projects/[slug]/page.jsx:36`). P5.1's anchor rename must update it; re-verify in P8.4.
- 2026-07-28 · P0 · Note · `/design-system` contains three "Design Engineer" strings. That page is do-not-touch, so P5.6c excludes them.
- 2026-07-28 · P0 · [later] · Section-intro copy conflicts between the two content files (see P0 handoff). Checklist inline blocks match `competency-copy-final.md`; that reading governs unless Brandon says otherwise at P5/P6.
