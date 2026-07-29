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

## P1 · Step Zero: the purge  ✅

Dead code deleted first so no later step edits a decoy file.

**Do:**
- P1.1 Delete: `app/page.js` (dead v1 homepage), the entire dead `app/sections/` folder it imports (Hero, About, Skills, Portfolio, Contact), `Navigation.jsx` (dead; live nav is `Nav.jsx`), and the 0-byte `portfolio-data.js`.
- P1.2 Remove the CodePen entry from `projects.js` entirely, including its vestigial empty `challenge`/`approach` fields. Then remove the now-unused `isExternal` handling from every component and from `sitemap.js` filtering IF nothing else uses it (grep first; if anything else uses it, leave the mechanism and log).
- P1.3 Verify the footer still links to CodePen in the socials (the Easter egg). Do not remove it.
- P1.4 🔶 DECISION: `AIAssistant` is commented out in `layout.js` and `/api/chat` is therefore unused. Delete both, or keep for a future feature? Claude proposes: delete (it can be restored from git). Await Brandon's call, then act.
  - **ANSWERED 2026-07-28 · Brandon: delete both.** Done. Baseline commit `9c0d0a4` makes them restorable.

**Self-audit:** `grep -r` for every deleted filename and for `isExternal` returns no live references; `npm run build` passes; homepage renders identically to baseline; `/projects/[slug]` pages all build (CodePen no longer in `generateStaticParams`).

**🔶 BRANDON:** Files touched: deletions above + `projects.js`, possibly `sitemap.js`. Check: homepage looks unchanged, footer still has the CodePen icon, and `yoursite.com/projects/codepen` (or whatever its slug was) now 404s, which is correct.

---

## P2 · Route-aware navigation  ✅

May already be shipped as the standalone patch discussed on 2026-07-28.

**Do:**
- P2.1 Inspect `Nav.jsx`. If nav links are still hash-only (`#anchor` + `scrollIntoView` with `preventDefault`), implement route-aware links: on `/`, smooth-scroll behavior may remain; on any other route, links navigate to `/#anchor` via real `Link`s. Desktop AND mobile menus.
- P2.2 Add the new nav item **All Work** → `/work` (route created in P6; a dead link is acceptable until then, note it in the log).
- P2.3 Nav label check: section anchor renames from later steps (Selected Work) will be re-verified in P8.4.

**Self-audit:** From `/projects/[any-slug]`, every nav link navigates correctly. From `/`, in-page scrolling still smooth. Keyboard: nav fully tabbable, visible focus.

**🔶 BRANDON:** If you already shipped the nav patch, tell Claude "P2 shipped" and he verifies instead of implements. Test yourself: open any project detail page and click every nav item.

---

## P3 · Data layer  ✅

**Do:**
- P3.1 In `projects.js`, add to EVERY project: `category: "built"` and `homepage: true|false`. Homepage roster (exactly these four true): ask-the-claude-docs, modern-softworks, hero-animation-builder, micro-interactions. AI Cover Letter Generator: `homepage: false`.
- P3.2 Set `featured: true` on ask-the-claude-docs ONLY (it is currently on modern-softworks; flip it). `featured` now means "flagship."
- P3.3 Reorder the array to the new display order: chatbot, Modern Softworks, Hero Animation Builder, Micro-Interactions, Cover Letter Generator. (Note: `getAdjacentProjects` is array-order-based, so case-study prev/next now follows this order. Intended.)
- P3.4 Update every project's `cardDescription` and card tech chips verbatim from `.claude/content/project-copy-final.md` (descriptions + chip lists sections).
- P3.5 Required-fields completeness pass: every project must have slug, title, tagline, image, category, homepage, featured (bool), cardDescription, techStack (the chip list), description, liveUrl or githubUrl. List any project missing any field; fill from existing data or 🔶 ask.

**Self-audit:** A quick node script (throwaway, not committed) validates every entry has every required field and exactly one `featured: true`; build passes; detail pages render with correct prev/next order.

**🔶 BRANDON:** File touched: `projects.js` only. Check: nothing visual changes yet; spot-check two detail pages still render, and prev/next navigation follows the new order.

---

## P4 · Card components  ✅

**Do:**
- P4.1 `ProjectCard.jsx`: remove the hardcoded 2×2 grid-span logic (both motion and reduced-motion branches) and the ≤640px `!important` override that fought it. The component becomes the UNIFORM card: image (16:9), title, cardDescription, ≤4 chips, View Project link. Keep existing entrance stagger and hover behavior.
- P4.2 New `FlagshipCard.jsx`: full-width horizontal split card per mock v3 (visual left, body right; stacks on mobile). Eyebrow "Flagship", larger title, description, chips, CTA. Amber-tinted border treatment consistent with existing accent tokens. Reuses existing motion patterns.
- P4.3 `ProjectsSection.jsx` splits: new `SelectedWork.jsx` renders section header + intro + FlagshipCard (the `featured` project) + uniform grid of `homepage && !featured` projects + centered "View all work →" link to `/work`. Old ProjectsSection is deleted after replacement (grep for imports).

**Self-audit:** No component contains a hardcoded grid span; reduced-motion branch intact in both card components; axe clean on the homepage; grid shows exactly three uniform cards.

**🔶 BRANDON:** Files touched: `ProjectCard.jsx`, new `FlagshipCard.jsx`, new `SelectedWork.jsx`, `app/page.jsx`. Check the homepage Selected Work section against `homepage-mock-v3.html`: flagship full-width on top, three identical cards under it, no size mismatches at desktop, tablet, and phone widths.

---

## P5 · Homepage restructure  ✅

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

## P6 · /work archive page  ✅

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

## P7 · Truth sweep (detail pages)  ✅

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

## P8 · Polish + integration pass  ✅

**Do:**
- P8.1 Motion: new components (FlagshipCard, SelectedWork grid, Tidbits, Credo, Competencies, /work grid) use the site's existing entrance/stagger/hover patterns. No new motion vocabulary. Reduced-motion twin for everything.
- P8.2 Spacing/rhythm: section paddings and internal gaps consistent with existing sections; no one-off values without a token.
- P8.3 Images: flagship + three grid cards + archive cards all share aspect ratio treatment. 🔶 Brandon: a wide crop/screenshot of the chatbot for the flagship visual would land here; existing card image works meanwhile.
- P8.4 Cross-check every nav label against final section names and anchors.
- P8.5 Full-repo hygiene grep: em dashes in authored copy (zero), leftover mock vocabulary ("provisional", "placeholder") in shipped code (zero, except tidbit photo placeholders if P5.3 note stands).

**Self-audit:** Visual walk at 360px, 768px, 1280px; hover and focus states on every interactive element; `prefers-reduced-motion` full-page walk; console clean on every route.

**🔶 BRANDON:** No new files, refinements across the set. Do your own three-width walk and flag anything that feels off-rhythm against the rest of the site. This is the step where "feels premium" gets judged, so be picky.

---

## P9 · Final audits  ✅  (re-run in full 2026-07-29 after the refinement phase)

**Do:**
- P9.1 axe on `/`, `/work`, two detail pages: zero violations, hard requirement.
- P9.2 Lighthouse on `/` and `/work`: accessibility and SEO ≥ 0.95; performance/best-practices recorded (no regression vs P0.4 baseline beyond noise).
- P9.3 Full keyboard-only journey: land on `/`, reach and operate every interactive element through to sending the contact form focus, tidbits included.
- P9.4 Route inventory: `/`, `/work`, all `/projects/[slug]`, `/design-system`, `/cube`, sitemap.xml, robots, OG images render.
- P9.5 Decoy check: grep proves none of the P1 deletions are referenced anywhere.
- P9.6 Build log completed; every step above shows ✅.
- P9.7 🔶 **BRANDON'S FRONT-END CHANGE LIST. This is the last gate before P10.** Brandon walks the finished site and writes up everything he wants changed: wording, visual details, spacing, behavior, anything. Requested during P5 on 2026-07-28, scope widened on 2026-07-29 from copy-only to any front-end change. Deliberately parked here so it happens once, against the finished site, instead of in pieces mid-build.
  - Runs after P9.1-P9.6 are green and **before P10 ships anything**. Nothing merges until this list is applied and re-audited.
  - Claude's job: hold still and change nothing until Brandon delivers the list, then apply each item exactly as dictated and re-run the P9.1-P9.4 audits over whatever was touched.
  - Any line he rewrites supersedes `.claude/content/*.md` for that string. When a line changes, update the matching content file too, so the repo stays the single source of truth and no later verbatim check reverts his own edit.
  - Candidates already logged for his consideration, none of them assumed: the hero eyebrow (P5.6d, kept as "Design Engineer" and explicitly marked provisional); the nav label "Work" vs "Selected Work" (P8.4); the surviving Micro-Interactions count and "Every animation" claim (P7 [later]); the `$0.00` refusal metric he suggested and Claude declined as not code-true (P7.4); missing `<title>` on `/cube` and `/design-system` (P8, do-not-touch pages); tidbit photos (P5.3).

**Self-audit is the step.** Remediate anything found, re-run, then hand off.

**🔶 BRANDON · FINAL AUDIT:** Claude will present a completed checklist summary with numbers. Your walk: (1) full homepage scroll on desktop and phone, (2) tap every tidbit, (3) click every nav link from a detail page, (4) visit /work, (5) read About and both reworked detail pages once, (6) confirm the credo strip is the only strip, (7) **do your copy cherry-pick pass per P9.7 and hand Claude the list of lines you want reworded.** Approve or punch-list.

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
- 2026-07-28 · P0 · 🔶 ANSWERED · Brandon: (1) make the baseline commit, (2) `competency-copy-final.md` + checklist inline blocks are canonical and `project-copy-final.md` intros were stale, patch them, (3) five tidbits is correct, mock predates the fifth, (4) delete AIAssistant + `/api/chat`, (5) proceed to P1.
- 2026-07-28 · P1 · Baseline commit `9c0d0a4` "baseline before v2 restructure" created on `v2-restructure` covering the whole tree, including the 10 previously untracked components. Every P1 deletion is now reversible.
- 2026-07-28 · P1 · ✅ Purge complete. Deleted `app/page.js`, `app/sections/` (5 files), `Navigation.jsx`, `portfolio-data.js`, `AIAssistant.jsx`, `app/api/chat/` (`app/api/` now gone entirely). Removed the orphaned `AIAssistant` import and its commented-out usage from `layout.js`. Net 3,284 deletions / 12 insertions across 15 files.
- 2026-07-28 · P1 · CodePen entry removed from `projects.js` including its empty `challenge`/`approach`/`features`/`metrics`. Roster now 5. `isExternal` mechanism removed from `projects.js` (`getAdjacentProjects`), `sitemap.js`, and `ProjectCard.jsx` (4 sites). `Button.jsx`'s unrelated local `isExternal` left untouched as flagged in P0.
- 2026-07-28 · P1 · P1.3 verified: `Footer.jsx` still carries the CodePen social link and `CodepenIcon`. The Easter egg survives. The CodePen profile URL also remains in the homepage JSON-LD `sameAs`, which is correct.
- 2026-07-28 · P1 · Content fix per Brandon: patched the two stale section-intro lines in `.claude/content/project-copy-final.md` to match `competency-copy-final.md`, with an inline note recording why. The content folder is now internally consistent.
- 2026-07-28 · P1 · Audit results: build green (12 static pages, down from 14: `/api/chat` and the codepen slug both gone). Live-server route check: all 5 project slugs 200, `/projects/codepen` 404, `/api/chat` 404, `/`, `/cube`, `/design-system`, `/sitemap.xml`, `/robots.txt` all 200. Sitemap lists exactly 5 project URLs, no codepen. Server log clean, zero errors.
- 2026-07-28 · P1 · Expected visual delta, not a regression: the homepage project grid now shows 5 cards instead of 6, because the CodePen card left with its data entry. P4 reduces this to flagship + 3.
- 2026-07-28 · P1 · [later] · `app/data/training-data.json` (27KB) is now orphaned, having been imported only by the deleted `AIAssistant.jsx`. Not named in this document, so left in place per Rule 10. 🔶 Brandon: say the word and it goes.
- 2026-07-28 · P1 · 🔶 ANSWERED · Brandon approved deleting `training-data.json`. **Sanctioned scope addition beyond the written P1 list**, same rationale as `AIAssistant` and restorable from baseline commit `9c0d0a4`. Deleted; `app/data/` now holds `projects.js` only; grep for `training-data` is clean.
- 2026-07-28 · P2 · 🔶 ANSWERED · Brandon: not shipped, implement. Inspection confirmed it: `Nav.jsx` was hash-only, one `navLinks` array of four `#anchor` entries with an unconditional `e.preventDefault()` + `scrollIntoView`, so every nav link was inert on non-homepage routes.
- 2026-07-28 · P2 · ✅ Route-aware nav implemented in `Nav.jsx` (139 insertions / 88 deletions, only file touched). `navLinks` entries now carry a `type` of `section` or `route`. Three helpers drive both menus: `smoothScrolls()`, `resolvedHref()`, `isLinkActive()`. On `/` section links keep the existing smooth-scroll behavior as sanctioned by P2.1; on every other route they render as real `next/link` navigations to `/#anchor`. Desktop and mobile menus both map through the same helpers.
- 2026-07-28 · P2 · P2.2 done. **All Work** added at position 2, matching mock v3's nav order. It is a real route link, not an anchor. Active state reuses the existing convention (accent on mobile, full-strength text on desktop) driven by `pathname === "/work"`, rather than inventing the mock's permanent accent treatment, per Rule 9.
- 2026-07-28 · P2 · Also fixed while route-awareness was being wired: the wordmark used `window.location.href = "/"` (a full page reload) off-homepage and now renders as a `next/link`; the scroll-spy `useEffect` is guarded by `isHome` so it no longer walks for anchors that cannot exist off-homepage.
- 2026-07-28 · P2 · Audit results: build green (12 static pages). Live-server href check from `/projects/modern-softworks` returns `/#projects`, `/#about`, `/#competencies`, `/#contact`, `/work`, and `/` for the wordmark. From `/` the section links correctly remain bare `#anchor`. Both map sites verified to use all three helpers. Focus-visible styling confirmed present in `globals.css:70` and `v2.css:1106`; all nav items are native `a`/`Link` and therefore tabbable. Server log clean.
- 2026-07-28 · P2 · Expected: **All Work currently 404s**, since `/work` is not created until P6. Noted per P2.2. P2.3's nav label cross-check stays deferred to P8.4; the label is still "Projects" against anchor `#projects` and both change together in P5.1.
- 2026-07-28 · P3 · ✅ Data layer complete. `projects.js` is the only file touched. All 5 projects carry `category: "built"` and an explicit boolean `homepage`. Roster: ask-the-claude-docs, modern-softworks, hero-animation-builder, micro-interactions-library are `true`; ai-cover-letter-generator is `false`. `featured` flipped off modern-softworks and onto ask-the-claude-docs, which is now the sole flagship. Array reordered to the P3.3 display order.
- 2026-07-28 · P3 · **Field-model decision for P3.4, resolved from the code rather than assumed.** P3.5 phrases the chip list as `techStack`, but `ProjectCard.jsx:81` reads `project.cardTechStack || project.techStack.slice(0, ...)` while the detail page at `projects/[slug]/page.jsx:169` renders the **full** `techStack`. Overwriting `techStack` with the 4 content-file chips would have stripped the detail-page tech lists, which the do-not-touch register protects. So the content-file chip lists went into `cardTechStack` (the pre-existing card-override field, already used by hero-animation-builder) and `techStack` was left intact. `cardTechStack` is now populated on all 5.
- 2026-07-28 · P3 · P3.4 copy shipped verbatim. A throwaway checker parsed `project-copy-final.md` directly and diffed both `cardDescription` and `cardTechStack` for all 5 projects character-for-character against it: 10/10 exact, zero em dashes. Scripts live in the scratchpad and are not committed.
- 2026-07-28 · P3 · P3.5 completeness: no project was missing a required field after the pass, nothing needed a 🔶 ask. Validator confirms every entry has slug, title, tagline, image, category, homepage, boolean featured, cardDescription, techStack, description, and at least one of liveUrl/githubUrl; exactly one `featured: true`; no card chip list exceeds 4.
- 2026-07-28 · P3 · Audit results: build green (12 static pages). Live prev/next chain verified across all 5 detail pages and follows the new array order exactly, with a null prev on the first and null next on the last. New chips render on the homepage; old version-numbered chips ("Next.js 16", "PostgreSQL + pgvector", "Upstash Redis") no longer appear on any card. Server log clean.
- 2026-07-28 · P3 · Expected transient, resolved by P4, not a data fault: the flagship card currently shows ask-the-claude-docs' **tagline** rather than its new `cardDescription`, because `ProjectCard.jsx:59` gates the description behind `!isFeatured` and the featured branch renders `tagline`. Data verified correct. P4.1 removes that featured special-casing and P4.2's FlagshipCard renders the description.
- 2026-07-28 · P3 · Expected transient, resolved by P4.3: the homepage still renders all 5 cards, including `homepage: false` ai-cover-letter-generator, because `ProjectsSection` does not yet filter on the new flag. `SelectedWork` introduces that filter.
- 2026-07-28 · P3 · Note for P6.2/P6.3 · All 5 projects share the single category "built", so exactly one category is populated. The archive filter row and the card corner-tags must therefore stay dormant, which is the intended state.
- 2026-07-28 · P4 · ✅ Card components complete. `ProjectCard.jsx` rewritten as the uniform card: all `isFeatured` branching removed, so no eyebrow, no tagline variant, no per-card `sizes` split, and both the motion and reduced-motion branches lost their `gridColumn`/`gridRow` spans. Entrance stagger (`index * 0.08`) and hover behavior preserved unchanged. The reduced-motion branch also gained the `height: 100%` the motion branch already had, so uniform cards sit flush in reduced motion too.
- 2026-07-28 · P4 · P4.1 CSS: removed the `.v2-projects-grid > *` span-reset block at the 640px breakpoint, which existed only to fight the hardcoded spans. The legitimate `grid-template-columns` responsive rules at 1024px and 640px were left in place.
- 2026-07-28 · P4 · P4.2 new `FlagshipCard.jsx`: full-width split, visual left and body right, stacking to one column at 820px per mock v3. Eyebrow "Flagship", larger title, `cardDescription`, chips, "View Project" CTA. Amber treatment and hover reuse the existing `.v2-card-glow` accent card rather than inventing one. Supporting `.v2-flagship*` classes appended to `v2.css` in a marked block using existing tokens only (`--v2-border`, `--v2-surface`, `--v2-radius-*`); no existing token, animation, or hover rule was modified.
- 2026-07-28 · P4 · P4.3 new `SelectedWork.jsx` replaces `ProjectsSection.jsx`: header, FlagshipCard for the `featured` project, uniform grid of `homepage && !featured`, and a centered "View all work →" link to `/work` using the existing `v2-btn v2-btn-ghost`. `page.jsx` import swapped. Grep confirmed no remaining importers before `ProjectsSection.jsx` was deleted.
- 2026-07-28 · P4 · **Copy seam, deliberate:** the section heading still reads "Featured Projects" and no intro paragraph is rendered yet. P5.1 owns that copy (heading rename, verbatim intro line, anchor id, hero target) and authoring it early would have meant inventing copy ahead of its step. The `id="projects"` anchor is likewise unchanged until P5.1.
- 2026-07-28 · P4 · ⚠️ **Remediated pre-existing axe violation, Rule 4.** The first homepage axe run returned one moderate `region` violation: the "Skip to main content" link sat outside any landmark. Confirmed pre-existing rather than P4-introduced (the `page.jsx` diff is only the import swap, and detail pages, which have no skip link, returned zero violations). Fixed by wrapping the skip link in a `<header>` banner landmark in `page.jsx`. Re-run returned zero violations, passes up from 36 to 38.
- 2026-07-28 · P4 · Audit results: build green (12 static pages). Zero hardcoded grid spans remain in `ProjectCard`/`FlagshipCard`/`SelectedWork`. Reduced-motion branches confirmed present in all three. axe on `/`: **0 violations**. Rendered structure inside `<section id="projects">`: exactly 1 flagship wrapper, exactly 3 uniform cards, 4 "View Project" CTAs. `homepage: false` ai-cover-letter-generator correctly absent from the homepage. Server log clean.
- 2026-07-28 · P4 · Tooling note · The repo ships no axe/Lighthouse dependency, so an axe-core + jsdom harness was installed **in the scratchpad**, leaving `package.json` untouched. It is structural only: `color-contrast`, `target-size`, and `scrollable-region-focusable` are explicitly disabled because jsdom has no layout engine and would otherwise report false passes. 🔶 P9.1/P9.2 need a real browser-based axe and Lighthouse run to close those out; flagging now so it is not discovered at the audit gate.
- 2026-07-28 · P4 · Note for P5.5 · The old three-card `CompetenciesSection.jsx` still carries hardcoded `gridColumn: span 2` spans (lines 70 and 174) plus a matching `grid-column: span 1 !important` reset at `v2.css:597` in the 768px block. Both are out of P4's scope (P4.1 names `ProjectCard` only) and should be removed when P5.5 rebuilds that section as a 2x2.
- 2026-07-28 · P5.1 · ✅ Heading "Featured Projects" → **Selected Work** with the verbatim intro line. Section anchor renamed `#projects` → `#selected-work` and propagated to all four consumers in one pass: `SelectedWork.jsx` (the `id`), `HeroSection.jsx` (both motion branches, `href` and `getElementById`), `Nav.jsx`, and the detail-page back-link at `projects/[slug]/page.jsx:36`. Grep confirms zero `#projects` references remain anywhere.
- 2026-07-28 · P5.2 · ✅ About rewritten to the four approved paragraphs from `about-copy-final.md`, verbatim. Heading "How I got here" and the existing headshot treatment untouched.
- 2026-07-28 · P5.3 · ✅ New `Tidbits.jsx` under the About text. Label "Tap for the weirder stuff", five real `<button>`s with `aria-expanded`, `aria-controls`, and `id`, one open at a time, panel expands in place below the row as a `role="region"` labelled by its trigger. Clicking an open pill closes it. Reduced-motion path renders the panel with no animation. All ten strings (5 labels + 5 reveals) verified verbatim.
- 2026-07-28 · P5.4 · ✅ New `CredoStrip.jsx` mounted between About and Core Competencies. Text and `SECTION 508 · WCAG 2.2 · 100% PASS RATE` sub-line verbatim. Confirmed exactly one strip renders on the page.
- 2026-07-28 · P5.5 · ✅ Core Competencies rebuilt as a 2x2 of four pillar cards, order and all text verbatim (categories, claims, proofs, pillar-2 substack rows, chips). Old three-card layout deleted along with its metric/metricLabel model and the "AI-Augmented Development" chip, both confirmed absent from the rendered page. Substack rows render the source string split into a bold lead and remainder, so the characters are unchanged. Also cleared the leftover `grid-column: span 1 !important` reset at `v2.css:597` flagged in P4, since no spans remain.
- 2026-07-28 · P5.6a · ✅ Subhead now reads "end to end, **built on** twelve years..." in both hero branches, the four `page.jsx` metadata copies (description, openGraph, twitter, JSON-LD), and the OG image route. `/design-system` retains the old wording and was deliberately skipped as do-not-touch.
- 2026-07-28 · P5.6b · ✅ `$40 billion` no longer exists anywhere in the repo. The About rewrite carries `$43 billion`; a repo-wide grep across js/jsx/json/md confirms zero remaining `$40` references.
- 2026-07-28 · P5.6c · ✅ OG/meta now say **AI Product Engineer**: og:image `alt`, JSON-LD `jobTitle`, the OG image route's rendered line, and the About headshot `alt`. The only remaining "Design Engineer" strings are `HeroSection.jsx:64` (held for P5.6d) and three in `/design-system`, which is do-not-touch.
- 2026-07-28 · P5 · Audit results: build green (12 static pages). Rendered DOM order verified as Hero, Selected Work, About, Credo strip, Core Competencies, Contact, an exact match to the P5 spec. axe on `/`: **0 violations**, 38 passes. Copy diffed character-for-character against the content files: 4/4 About paragraphs, 10/10 tidbit strings, 2/2 credo lines, 4/4 pillars with claims/proofs, 16/16 chips, 2/2 substack rows. Zero em dashes in the rendered page. Anchor rename verified live from a detail page and from the homepage. Server log clean.
- 2026-07-28 · P5 · Verification note · The five tidbit reveal texts are correctly absent from the SSR HTML because no pill is open on load, so they were verified against the component source **and** confirmed present in the shipped client chunk, proving they will render on click.
- 2026-07-28 · P5 · [later] · Tidbit photo slots ship as styled empty boxes marked `aria-hidden="true"`, carrying no placeholder text so no mock vocabulary reaches production (keeps P8.5 clean). 🔶 Brandon supplies real photos in a later cycle.
- 2026-07-28 · P5 · 🔶 **OPEN · P5.6d, the only thing blocking P5 from ✅.** Hero eyebrow still reads "Design Engineer". Found while implementing: the two hero branches already **disagree**, animated renders "Design Engineer" (`HeroSection.jsx:64`) and reduced-motion renders "Brandon Church" (line 104). Whatever Brandon picks must be applied to both. Awaiting his call.
- 2026-07-28 · P5 · Note for P8.4 · Nav label is still "Projects" while the section it targets is now titled "Selected Work". The `href` is correct and working; only the visible label is out of step. P2.3 deferred this cross-check to P8.4.
- 2026-07-28 · P5.6d · 🔶 ANSWERED · Brandon: **keep "Design Engineer" for now**, explicitly provisional pending his copy pass. Applied option 3 as offered, which included syncing the branches: the reduced-motion hero eyebrow read "Brandon Church" and now reads "Design Engineer", so both branches finally agree. Reversible in one line if he changes his mind at P9.7.
- 2026-07-28 · P5 · ✅ **P5 CLOSED.** Post-5.6d re-audit: build green, axe on `/` still 0 violations, coherence sweep still clean (subhead "built on", no `$40 billion`, `$43 billion` present, zero em dashes). The 5 reported copy-checker failures are the known SSR limitation only, the collapsed tidbit panels, and the same 5 strings pass via component source and the shipped client chunk.
- 2026-07-28 · P6.1 · ✅ New route `app/work/page.jsx` (server component, owns metadata) rendering new `WorkArchive.jsx` (client, owns filter state). Page header **All Work**, "← Home" breadcrumb, intro verbatim, count line reading "5 projects", and a uniform grid of all 5 projects in array order with no flagship treatment. Count is derived from the visible set, so it stays correct once filters activate.
- 2026-07-28 · P6.2 · ✅ Filter system is data-driven and dormant. `populatedCategories()` derives categories from `projects.js` and the row renders only when 2 or more have at least one project. Today that is false, so no filters render and **no commented-out dead code ships**; the only HTML comments on the page are React's own `<!-- -->` text separators and suspense markers.
- 2026-07-28 · P6.3 · ✅ Card corner-tags follow the identical rule via a `showCategoryTag` prop on `ProjectCard`, driven by the same `filtersEnabled` flag. Dormant today.
- 2026-07-28 · P6.2 · **Dormancy proven by test, then reverted.** Temporarily flipped ai-cover-letter-generator to `category: "concept"`, rebuilt, and confirmed the system activates correctly: 3 buttons rendering "All 5 / built 4 / concept 1", `aria-pressed` on each, a `role="group"` labelled "Filter projects by category", and corner-tags appearing on all 5 cards. Filter predicate unit-tested separately (client-side clicking cannot be exercised headlessly): every category returns exactly its own count and the counts sum to the full set. Fake reverted; `projects.js` verified **byte-identical by sha256** to its pre-test state, and grep for "concept" across the app returns zero.
- 2026-07-28 · P6.4 · ✅ `/work` added to the hand-authored `sitemap.js` at priority 0.8, between the homepage and the project URLs. Sitemap now serves 7 URLs. Page metadata added: title "All Work | Brandon Church" matching the detail-page pattern, description set to the approved intro line rather than invented copy, plus canonical, openGraph and twitter blocks. OG image alt reads "Brandon Church - AI Product Engineer", consistent with P5.6c.
- 2026-07-28 · P6.5 · ✅ Nav "All Work" resolves. Verified 200 from both `/` and `/projects/modern-softworks`; it had been a known dead link since P2.2.
- 2026-07-28 · P6 · ⚠️ **Remediated a real axe violation this step introduced, Rule 4.** First `/work` run returned one moderate `heading-order`: card titles were `h3` sitting directly under the page `h1`, skipping `h2`. Fixed properly rather than cosmetically by adding a `headingLevel` prop to `ProjectCard`, defaulting to `h3` so the homepage outline (section `h2` then card `h3`) is unchanged, with `/work` passing `h2`. Styling is class-driven so there is zero visual change. Re-run: `/work` and `/` both zero violations.
- 2026-07-28 · P6 · Audit results: build green, 13 static pages. **`/work` prerenders as fully static** despite the client boundary from framer-motion. axe zero violations on `/work` in both dormant and filters-active states, and on `/` as a regression check. Sitemap contains `/work`. Server log clean.
- 2026-07-28 · P6 · Process note · An earlier verification pass on `/work` appeared to show an empty page. That was a fault in the check, not the page: the HTML is emitted as a single line so `grep -c` counted lines rather than occurrences, and the saved response had been captured mid-server-start. Re-verified with a real parser against a fresh fetch. Recorded so the same trap is not re-entered at P9.
- 2026-07-28 · P7.1 · ✅ Modern Softworks: "WebGL particle field" → "Canvas 2D particle field". Zero "WebGL" references remain on the page.
- 2026-07-28 · P7.2 · ✅ Modern Softworks: the features bullet now reads exactly "No tracking pixels, no chat widgets." **Scope note:** the same false claim also appeared a second time in the `description` field ("Enterprise-grade security headers, zero third-party scripts, and AVIF/WebP only for images"). Fixing only the bullet would have left a known-false claim rendering directly above it, so the clause was dropped there too, leaving "Enterprise-grade security headers and AVIF/WebP only for images". No replacement claim was invented. Zero "third-party scripts" references remain.
- 2026-07-28 · P7.3 · ✅ Micro-Interactions: metric "7 Total dependencies" → "6"; description "only 7 production dependencies" → "6"; "All animations use transform and opacity exclusively" → "Animations use predominantly transform and opacity". Zero "exclusively" references remain.
- 2026-07-28 · P7.4 · 🟡 **Half done.** The hardcoded `0.90` judged pass rate is deleted and returns zero occurrences on the rendered page, so the drifting number is gone. The **link** half is blocked: `metrics` render as plain `<span>`s (`ProjectDetailClient.jsx:10-11`) and `features` render as plain text inside `<li>` (`projects/[slug]/page.jsx:150`), so neither can carry an anchor. Every way to add a real clickable link changes detail-page structure, which Rule 3 protects and P7 limits to TEXT only. 🔶 Awaiting Brandon's call on method.
- 2026-07-28 · P7.4 · ⚠️ Visual consequence of the removal: `.v2-metrics-grid` is `repeat(3, 1fr)` at desktop, so the chatbot now shows 2 metrics in a 3-column row and the third column sits empty. At 768px and below it reflows to 2 columns and looks correct. This resolves itself if the eval-scoreboard link fills the freed slot.
- 2026-07-28 · P7.5 · Absolute-claim sweep run across every `description` and `features` entry for zero/all/every/exclusively/never/only/100%/entire/any. 32 hits total; the large majority are descriptive and defensible and **nothing beyond P7.1-P7.4 was changed**. The ones that carry real risk, for Brandon to rule on:
  - **`ask-the-claude-docs` metric "5/5 · Off-topic questions correctly refused"** — a hardcoded eval number in exactly the drift class P7.4 was written to eliminate. Strongly recommend it goes the same way as the 0.90.
  - **`ask-the-claude-docs` metric "3,141 · Doc chunks, re-synced nightly"** — the label itself says the corpus re-syncs nightly, so the number is guaranteed to go stale.
  - **`ask-the-claude-docs`** claims "zero accessibility violations" (description) and "zero axe violations" (features[6]); the same absolute stated twice, and only true until it is not.
  - **`modern-softworks`** "AVIF/WebP only for images" — one PNG falsifies it.
  - **`micro-interactions-library`** "Every animation runs on CSS transitions or the native Web Animations API" — survived P7.3 because it describes the mechanism rather than the properties, but it is the same shape of claim that P7.3 just softened.
  - **`hero-animation-builder`** "Six runtime dependencies total" (features[7] and the metric) — same countable-drift class as the Micro-Interactions dependency count that P7.3 corrected.
- 2026-07-28 · P7 · Audit results: build green, 13 static pages. All four corrections verified in the **rendered** pages, not just the source. axe zero violations on all three reworked detail pages. Only `projects.js` was touched, so no layout diff.
- 2026-07-28 · P7 · 🔶 SIDE QUEST restated, Brandon's task in a different repo, not Claude's: delete the dead `ogl` dependency from the Modern Softworks site's own codebase. Note that `"OGL"` also still appears in this repo's `techStack` for that project, so it will keep rendering in "Built With" until the dependency is actually gone.
- 2026-07-29 · P7 · 🔶 ANSWERED · Brandon: (1) P7.4 Option B, link-aware metrics; (2) act on all five P7.5 items under the rule **replace snapshot claims (counts, scores, absolutes) with process claims, architectural claims, or live links**; (3) remove OGL from the Modern Softworks `techStack` now, since the dependency is never imported and "Built With: OGL" is false today regardless of the other repo.
- 2026-07-29 · P7.4 · ✅ Option B implemented. `MetricCard` in `ProjectDetailClient.jsx` now renders as an `<a>` when a metric carries `href`, with `target="_blank"`, `rel="noopener noreferrer"`, an `aria-hidden` arrow, and accent styling from existing tokens. Metrics without `href` render exactly as before, so the other three projects are untouched.
- 2026-07-29 · P7.4 · Chatbot metric trio rebuilt to the rule, one of each kind: **Nightly · Full-corpus re-sync** (process/cadence), **0 · LLM calls when it refuses** (architectural, true per features[0] where the model is never called below threshold), **Live · CI-scored eval scoreboard** (live link). Three metrics again, so the ragged 3-column grid noted in P7 is resolved.
- 2026-07-29 · P7.4 · ⚠️ Brandon's suggested candidate **"$0.00 · what a refusal costs" was deliberately not used**: the project's own copy says a decline "costs 30x less than an answer" and prints real cost on its receipt, so a refusal is cheap but not free. Shipping $0.00 would have introduced a new false claim in the exact step meant to remove them. "0 · LLM calls when it refuses" carries the same architectural point and is literally true. 🔶 Flagged for Brandon to overrule if the receipt genuinely reads $0.00.
- 2026-07-29 · P7.4 · The inferred scoreboard URL `https://ask-the-claude-docs.vercel.app/evals` was **verified live, HTTP 200**, not assumed.
- 2026-07-29 · P7.5 · ✅ All five acted on. "5/5 refusals" removed, the scoreboard link now carries refusal performance. "3,141 chunks" dropped in favour of the durable cadence claim. "zero accessibility violations" and "zero axe violations" both removed and replaced by the process truth "accessibility gated in CI", stated once in the description, with the detailed CI bullet (features[7]) already carrying the specifics. "AVIF/WebP only for images" → "AVIF/WebP images". Hero Animation Builder's count dropped in three places: tagline → "minimal runtime dependencies", metric → "0 · Animation libraries" (architectural absence, parallel to Micro-Interactions), features[7] → "Deliberately few runtime dependencies".
- 2026-07-29 · P7 · ✅ OGL removed from the Modern Softworks `techStack`. Zero "OGL" references remain anywhere, including the homepage cards.
- 2026-07-29 · P7 · Audit results: build green, 13 static pages. Every correction verified in **rendered** pages. axe zero violations on all four detail pages plus `/` and `/work` as regression checks. Server log clean.
- 2026-07-29 · P7 · [later] · Two same-class claims survive because they were outside the five Brandon ruled on, both on `micro-interactions-library`: the metric and description still assert **"only 6 production dependencies"** (a count, the very thing P7.3 set from 7 to 6), and the description still opens **"Every animation runs on CSS transitions or the native Web Animations API"**. Consistent with the new rule these would become a minimal-dependencies claim and a softened mechanism claim. 🔶 Brandon's call, a candidate for the P9.7 copy pass.
- 2026-07-29 · P8.1 · ✅ Motion audited across all seven touched components. Five already matched the house pattern exactly (`opacity 0→1`, `y 20→0`, `duration 0.6`, `easeOutCubic`, `viewport once`). **Two deviations found and corrected:** `Tidbits` used `duration 0.25` (not a token, the scale is 150/200/300/500/800ms) and an off-grid `y: -6`, now `duration 0.3` matching `--v2-duration-panel` and `y: -8` on the 8px grid; `CredoStrip` used `viewport amount 0.3` where every other component uses `0.2`, now aligned. No new motion vocabulary remains. Reduced-motion twin confirmed in all seven.
- 2026-07-29 · P8.2 · ✅ Spacing one-offs removed. `.v2-flagship-body` padding `clamp(24px,4vw,36px)` → `clamp(20px,4vw,32px)`, matching `.v2-card`. `WorkArchive` container `paddingTop 120px` → `96px`, matching the established below-nav value on the detail page, and `paddingBottom 96px` → `var(--v2-section-padding)`. The credo strip keeps its own smaller band padding by design, since a strip is deliberately not a full section.
- 2026-07-29 · P8.3 · ✅ Image treatment consistent: flagship, homepage grid cards, and archive cards all use `next/image` with `fill`, `objectFit: cover`, and the shared `v2-project-img` class, so the grayscale-to-color hover is identical everywhere. Grid and archive cards are 16:9 via `.v2-project-img-wrap`; the flagship fills its split column at desktop and becomes 16:9 once it stacks at 820px, which is the mock's intent rather than a mismatch.
- 2026-07-29 · P8.4 · ✅ Nav cross-check found exactly one mismatch, the last thing outstanding from P2.3: label "Projects" pointed at `#selected-work` whose heading reads "Selected Work". Changed to **"Work"**, which is what both canonical mocks use alongside "All Work". Verified rendering as "Work" from the homepage and as `/#selected-work` from a detail page. All other labels confirmed coherent with their targets: About, Competencies (Core Competencies), Contact, All Work (/work).
- 2026-07-29 · P8.5 · ✅ Hygiene greps clean. Zero em dashes in any file authored this build, and zero introduced into shared files (`v2.css`, `Nav.jsx`, `layout.js`, `page.jsx`, detail page). Zero instances of provisional/placeholder/lorem/TODO/FIXME/mock in shipped code. The tidbit photo slots need no exemption after all, since they ship as empty `aria-hidden` boxes carrying no text.
- 2026-07-29 · P8 · Audit results: build green, 13 static pages. **axe zero violations on all 9 built routes**: `/`, `/work`, and all five project detail pages, plus `/sitemap.xml`, `/robots.txt` and `/opengraph-image` all returning 200. Zero React hydration or error markers in served HTML on `/`, `/work`, and a detail page. Server log clean. Regression pass confirms copy, data integrity and page structure all unchanged: DOM order still Hero · Selected Work · About · Credo · Competencies · Contact, with 1 flagship, 3 uniform cards, 5 tidbits and 4 pillars.
- 2026-07-29 · P8 · Focus and reduced motion verified structurally: every new interactive element is a native `button`/`a`/`Link`, so it is tabbable by default, and `.v2 :focus-visible` (v2.css:1125) plus `*:focus-visible` (globals.css:70) both reach them. `globals.css:413` kills all transition and animation durations under `prefers-reduced-motion`, on top of each component's own reduced-motion branch.
- 2026-07-29 · P8 · Responsive: only one fixed width was added across the whole build, `flex: 0 0 84px` on the tidbit photo slot, and it stacks to full width at 520px so it cannot overflow at 360px. Three breakpoints added: 820px (flagship stacks), 520px (tidbit panel stacks), 460px (substack stacks).
- 2026-07-29 · P8 · ⚠️ **Pre-existing axe violations found on two do-not-touch pages. Not fixed, by rule.** `/cube`: `document-title` (serious) and `region` (moderate). `/design-system`: `document-title` (serious), `heading-order` (moderate), `landmark-unique` (moderate). Confirmed pre-existing, `git diff` shows this build never touched either page, and both sit on the Rule 3 register. P9.1 does not cover them either. 🔶 Brandon: both pages are missing a `<title>`, which is an SEO and screen-reader issue on live routes. Say the word and they are quick fixes, otherwise they ship as-is.
- 2026-07-29 · P9 · **Tooling upgraded to a real browser.** Chrome was found installed locally, so Lighthouse 12.8.2 and puppeteer-core 25.4.0 were added to the scratchpad harness (`package.json` still untouched). This replaces the jsdom approximation flagged back in P4 and means `color-contrast` and `target-size` genuinely ran for the first time.
- 2026-07-29 · P9.1 · Real-browser axe at 360/768/1280px. **`/` and `/work`: zero violations at every width**, with contrast and target-size confirmed running. Zero horizontal overflow on any page at any width. Browser console: zero errors and zero warnings across all pages and widths.
- 2026-07-29 · P9.1 · ⛔ **BLOCKED, hard requirement not met on detail pages.** One serious `color-contrast` violation, identical on every project detail page: `.v2-metric-label` renders `#837b76` (`--v2-text-dim`) on `#1c1917` (`--v2-bg-alt`) at **4.21:1**, below the 4.5:1 AA minimum for 12px text.
  - **Pre-existing, not introduced by this build.** It fires identically on Modern Softworks metrics that were never touched. It only appears on detail pages because metric labels sit on the elevated card background; the same token on the darker page background measures 4.76:1 and passes, which is why `/` and `/work` are clean.
  - An initial run also flagged `.v2-metric-value` on the new "Live" link metric, but that was an artifact of measuring mid-entrance-animation. Re-measured with animations settled, it passes. The harness now settles animations and scrolls the full page before asserting.
  - Fix candidates measured in-browser, not calculated by hand: **`--v2-text-muted` (#A8A29E) → 0 violations**, and `--v2-text-secondary` (#D6D3D1) → 0 violations. Either is a one-line change to `.v2-metric-label` at `v2.css:806`.
  - Not applied: `.v2-metric-label` is design-system CSS, which Rule 3 puts on the do-not-touch register, and it changes the look of every detail page. 🔶 Brandon's call.
- 2026-07-29 · P9.2 · ✅ Lighthouse, real Chrome. `/` accessibility **100**, SEO **100**, performance 85, best-practices 100. `/work` accessibility **100**, SEO **100**, performance 89, best-practices 100. Both clear the ≥95 gate on accessibility and SEO with room to spare.
- 2026-07-29 · P9.2 · ⚠️ **Honest gap: the "no regression vs P0.4 baseline" comparison could not be made.** P0.4 captured the route list and build output but never a Lighthouse baseline, which was an omission in that step. An attempt to recover one by building the baseline commit in a git worktree failed: Turbopack rejects a `node_modules` symlink pointing outside the project root, and a full copy exceeded a 10-minute budget and was abandoned rather than risk the working tree. The worktree was pruned and the tree verified intact. Current performance numbers are recorded above as the new baseline going forward.
- 2026-07-29 · P9.3 · ✅ Real keyboard-only journey driven in-browser. 30 focusable elements reached in a sensible order, **every one showing a visible focus ring**. Nav, skip link, hero CTAs, flagship, all three grid cards, View all work, all five tidbits, both contact links, all three form fields, Send Message, and all four footer socials. Tidbits operate on **both Enter and Space**, toggle closed on repeat, and enforce one-open-at-a-time under keyboard control (opening #1 then #4 leaves exactly one panel showing #4). Contact section reachable with 10 interactive elements.
- 2026-07-29 · P9.3 · Observation, pre-existing, not blocking: the "Skip to main content" link sits at **tab position 8**, after the whole nav, because `page.jsx` children render after `<Nav>` in `layout.js`. It works, but conventionally a skip link is the first stop. 🔶 Candidate for P9.7.
- 2026-07-29 · P9.4 · ✅ Route inventory, all 200: `/`, `/work`, `/cube`, `/design-system`, all five `/projects/[slug]`, `/sitemap.xml` (application/xml), `/robots.txt` (text/plain), `/opengraph-image` (image/png, 103KB). `/projects/codepen` correctly 404s.
- 2026-07-29 · P9.5 · ✅ Decoy check clean. Every P1 deletion is unreferenced and absent from disk: `page.js`, `sections/` (all five), `Navigation.jsx`, `portfolio-data.js`, `training-data.json`, `AIAssistant.jsx`, `api/`, `ProjectsSection.jsx`. Also clean: `isExternal`, `codepen` slug, `OGL`. The single grep hit is the known false positive, a JSX section-label comment `{/* Navigation */}` at `projects/[slug]/page.jsx:178` that describes the prev/next block and predates this build. Left alone under Rule 10; renaming it would permanently silence the false positive if Brandon wants that at P9.7.
- 2026-07-29 · P9.6 · P0 through P8 all show ✅. P9 holds at 🟡 pending the P9.1 contrast ruling, and P10 cannot start until P9.7 is delivered and applied.
- 2026-07-29 · P9.1 · ✅ **BLOCKER RESOLVED.** Brandon ruled to fix it immediately rather than defer to the P9 re-run. `.v2-metric-label` moved from `--v2-text-dim` to `--v2-text-muted`, chosen over `--v2-text-secondary` because it is the single step up the token ladder that clears AA while keeping the 12px label subordinate to the metric value above it. **Measured 4.21:1 → 6.93:1** against the 4.5:1 requirement. Real-browser axe now returns **zero violations on `/`, `/work` and both audited detail pages at 360/768/1280**. Applied during refinement R1; see `refinement-checklist.md`.
- 2026-07-29 · P9.7 · ✅ Delivered. Brandon's front-end review produced the eight-step refinement phase now tracked in `.claude/docs/refinement-checklist.md`. A checkpoint commit `69d9f11` was taken first so the restructure and refinement phases stay separable.
- 2026-07-29 · P9.7 · ✅ **COMPLETE.** The refinement phase finished all eight steps; see `refinement-checklist.md`, every step ✅. Delivered: hero eyebrow, tidbits removed and About rebalanced, credo Option 2, the Core Competencies editorial rebuild against mock v6, grid thumbnail unification, chip cap, and the contact rhythm pass. Two sanctioned scope additions landed alongside: the **P9.1 contrast blocker was fixed** (4.21:1 → 6.93:1) and the **dead webfont loads were removed** after they were found never to have applied, saving 440 KB across 21 files with a verified zero visual diff.
- 2026-07-29 · **P9 · ✅ RE-RUN COMPLETE, post-refinement. All gates pass on a clean production build** (dev server stopped and `.next` deleted first, so Lighthouse numbers are meaningful).
  - **P9.1 axe · PASS, hard requirement met.** Zero violations on `/`, `/work`, `/projects/ask-the-claude-docs` and `/projects/modern-softworks`, at 360/768/1280 each, with `color-contrast` and `target-size` genuinely running. Zero horizontal overflow anywhere. Browser console clean, zero errors and zero warnings.
  - **P9.2 Lighthouse · PASS.** `/` accessibility **100**, SEO **100**, performance 88, best-practices 100. `/work` accessibility **100**, SEO **100**, performance 94, best-practices 100. Both clear the ≥95 gate. **Performance improved against the pre-refinement run** (`/` 85 → 88, `/work` 89 → 94), most likely from removing the 440 KB of never-applied webfonts. This also closes the P9.2 baseline gap noted earlier: these numbers are now the recorded baseline.
  - **P9.3 keyboard journey · PASS.** 73 focusable stops reached in order, **zero without a visible focus affordance**. All **48** competency skill items reachable. Contact reached and operable through textarea and Send Message. Zero tidbit controls remain.
  - **P9.4 route inventory · PASS.** All 12 routes 200 with correct content types, including `sitemap.xml` (application/xml, 7 URLs), `robots.txt` and `/opengraph-image` (image/png). `/projects/codepen` correctly 404s.
  - **P9.5 decoy check · PASS.** Every deleted artifact unreferenced and absent from disk: `page.js`, `sections/`, `Navigation.jsx`, `portfolio-data.js`, `training-data.json`, `AIAssistant.jsx`, `api/`, `ProjectsSection.jsx`, `Tidbits.jsx`. Also clean: `isExternal`, `codepen`, `OGL`, both removed font variables, and the old LinkedIn URL. The single grep hit is a CSS comment, `/* Navigation entrance animation */` in `globals.css`, describing an animation rather than referencing the deleted component.
  - **P9.6 · this log complete; P0 through P9 all ✅.**
  - Regression suite alongside: data validator 5/5, competencies still **zero text differences vs mock v6** (4 rows, 9 groups, 48 skills), content files match the shipped site, About prose still verbatim.
- 2026-07-29 · P9 · Note · The hero subhead was replaced twice during this step under Brandon's R-D amendment, so P9.1, P9.2 and P9.3 were **re-run after the final wording** rather than reported from the earlier pass. Both runs were clean; the numbers above are from the final build.
- 2026-07-29 · P9 · 🔶 Editorial consequence worth Brandon's eye: the new subhead no longer states years of experience, so **"twelve years" now appears in visible page copy only in About paragraph 3**. It also still sits in the four `page.jsx` metadata `description` fields and the OG image route, which retain the previous subhead wording by design. Nothing is contradictory; the claim is simply carried by About now.
- 2026-07-29 · P9 · ➡️ Superseded: **re-run P9.1 through P9.6 in full, then P10.** The refinement phase rewrote audited surfaces, so the numbers recorded above describe the pre-refinement site and must be regenerated before anything ships. Tooling is ready: real-browser axe and Lighthouse via Chrome, plus the keyboard-journey harness, all in the scratchpad.
- 2026-07-29 · P9 · ⚠️ **All P9 audit results are now stale.** The refinement phase rewrites the hero eyebrow, About, credo strip, the entire Core Competencies section, card thumbnails, chips, and contact sizing. Per `refinement-checklist.md` R8's exit, P9.1 through P9.6 must be **re-run in full** after R8 completes, before P10 ships anything. The numbers recorded above describe the pre-refinement site.
- 2026-07-29 · P8 · 🔶 P8.3 open item, unchanged: a wide crop or screenshot of the chatbot for the flagship visual would land here. The existing card image works meanwhile and looks correct in the split layout.
- 2026-07-28 · P9.7 · Added at Brandon's request during P5: a dedicated copy cherry-pick pass in the final audit. He walks the finished front end once and hands over a list of lines to reword, rather than doing it piecemeal mid-build. Rule recorded there: a line he rewrites supersedes the content files, and the matching `.claude/content/*.md` gets updated with it so nothing silently reverts.
