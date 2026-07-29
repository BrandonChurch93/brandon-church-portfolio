# Portfolio v2 · Refinement Checklist (build-checklist P9.7)

Companion to `.claude/docs/build-checklist.md`. Executes the refinement decisions from Brandon's 2026-07-29 front-end review. Written 2026-07-29.

Position in the process: runs AFTER the original checklist's **P9.7** (Brandon's front-end change list) and BEFORE ship. These refinements touch audited surfaces, so **any earlier P9 results are invalidated**: on completing R8, re-run build-checklist P9 (final audits) in full, then proceed to P10 (ship).

Numbering note (reconciled 2026-07-29 at R8, per the R0 flag): this file originally read "(P9.6)" and cited "P9.5 (Brandon's review)". In `build-checklist.md`, P9.5 is the decoy check and P9.6 is the build-log completion; Brandon's review is **P9.7**. Both references above are now corrected. The sequencing was never in doubt, only the label.

---

## How to read this document

Identical protocol to the build checklist: one step per response · do the work · run the self-audit and remediate BEFORE presenting · hand off with the 🔶 BRANDON block (files touched, where to look, what to click) · stop and wait.

**🔶 means Brandon acts or decides. Nothing else uses this emoji.**

Status: ⬜ not started · 🟡 in progress · ✅ done and audited · ⛔ blocked

## Rules

All ten rules from `build-checklist.md` remain in force (copy law, no em dashes, do-not-touch register, stop on red, one step per response, regression gate, status upkeep, canonical references, existing design language, scope discipline). Refinement-specific additions:

R-A. **`.claude/design/competencies-mock-v6.html` is canonical for the Core Competencies rebuild**: its structure, behavior, AND text. Every category name, claim, proof, group label, and skill item ships verbatim from that file. It supersedes the competencies section of `.claude/content/competency-copy-final.md` (R8 brings that file back in sync).
R-B. **Icons are single-tint line glyphs.** Use lucide-react (add as dependency), stroke via currentColor at the mock's sizing, tinting amber on hover exactly as mocked. Claude maps each mock placeholder glyph to the closest lucide icon. NEVER full-color brand logos, NEVER skill bars or ratings.
R-C. **Every new interaction ships with its reduced-motion twin and keyboard/focus-visible twin.** The mock demonstrates both; match it.
R-D. **The hero subhead's wording is do-not-touch** (Brandon deferred it), with one exception: the number change if R0's ruling requires it.

---

## R0 · Pre-flight and the blocker  ✅  ·  **YEARS = twelve**

**Do:**
- R0.1 Verify `.claude/design/competencies-mock-v6.html` exists; open and read it fully. Verify branch state is clean post-P9.5 and build is green.
- R0.2 Baseline screenshots (or descriptions) of: hero, About section, credo strip, competencies, one grid card row, contact.
- R0.3 🔶 **BLOCKER · ELEVEN OR TWELVE YEARS.** The resume says 11 years; the site's locked About copy and hero subhead say twelve. They cannot both be right, and the number appears in surfaces R2 and R6 touch. Brandon rules: **11** or **twelve**. If 11: R2.3 updates the About copy's number, the hero subhead's number (sole sanctioned subhead edit per R-D), and `about-copy-final.md`. If twelve: the site stands; 🔶 Brandon fixes his resume separately. Do not start R1 until answered.

**Self-audit:** Mock readable, build green, baselines captured, ruling recorded here: `YEARS = ____`.

**🔶 BRANDON:** Answer the years question. That's the whole gate.

---

## R1 · Hero eyebrow  ✅

**Do:** Replace eyebrow text "Design Engineer" with `Designer · Engineer · Founder` (interpuncts, not hyphens or dashes). Sweep for any other surface still carrying "Design Engineer" as a title (metadata should already be clean from P5.6c; verify).

**Self-audit:** Rendered eyebrow correct at all widths; grep confirms no remaining "Design Engineer" title strings anywhere user-visible; build green.

**🔶 BRANDON:** Files touched: hero component only (plus any metadata stragglers found). Look: top of homepage. The first words on your site are now the locked eyebrow.

---

## R2 · About: tidbits out, photo up, number ruling  ✅

**Do:**
- R2.1 Delete the tidbits component entirely: the "Tap for the weirder stuff" label, all five pills, all panels, associated styles and state. Grep for orphaned imports. Log the five story fragments in the Build Log as `[later]` content (candidate future home: project detail pages).
- R2.2 Rebalance the section: widen the photo column ratio and use a taller crop of the existing headshot so image and text reach rough visual parity at desktop. Do not touch the About prose.
- R2.3 Apply the R0 years ruling if it was 11: About copy number, hero subhead number, and update `.claude/content/about-copy-final.md` to match (note the edit in that file's status line).

**Self-audit:** No tidbit code remains (grep); About renders balanced at 1280/768/360; prose diffs clean against `about-copy-final.md` (post-ruling version); axe clean on `/`; build green.

**🔶 BRANDON:** Files touched: About component (+ content file if 11). Look: the About section. Judge the text-to-photo balance at desktop and phone; this one is a taste call, so say "bigger" or "smaller" if the ratio isn't right yet.

---

## R3 · Credo strip: Option 2 copy  ✅

**Do:** Replace the strip's main line with, verbatim:
`Every product I've shipped for the federal government has passed its accessibility audit, and everything I build today starts accessible, from the design system up.`
Style per the competencies mock's credo treatment: the closing phrase "accessible, from the design system up" carries the accent color. Sub-line unchanged: `SECTION 508 · WCAG 2.2 · 100% PASS RATE`. Ensure graceful two-line setting at desktop and clean wrapping at mobile; adjust max-width/type size within the existing scale if needed.

**Self-audit:** Text character-exact; accent phrase correct; renders without orphans/widows at 1280/768/360; still the only strip on the page; build green.

**🔶 BRANDON:** Files touched: credo component. Look: the strip between About and Competencies. Read it once aloud; this is the claim you said you could defend, confirm it reads that way on screen.

---

## R4 · Core Competencies rebuild (the main event)  ✅

**Do:**
- R4.1 Replace the 2x2 card grid with the editorial-rows layout from mock v6: full-width rows, hairline dividers, category-first hierarchy (mono index → category heading → gold claim line → muted proof), right side = stacked full-width labeled groups of icon+label skill items.
- R4.2 Hover wash per mock: absolutely-positioned overlay with the warm gradient, inline padding with matching negative margins, radius, opacity fade ~350ms. Skill item hover/focus: lift, amber icon tint, soft background. Entrance stagger per row. Reduced-motion and keyboard twins for all of it (R-C).
- R4.3 Content verbatim from the mock (R-A): order AI Product Engineering → Full-Stack Engineering → Design Systems & Craft → Product Leadership; all 48 skill items, group labels, claims, proofs exactly as written there.
- R4.4 Icons: add lucide-react; map each placeholder glyph to the closest lucide equivalent (Claude's judgment); single-tint stroke styling per R-B.
- R4.5 Delete the old pillar components and any now-dead styles (grep for imports).

**Self-audit:** Text diff between rendered section and mock v6 text = zero differences; row count 4, group count 9, skill count 48; hover wash fades (not snaps) and clears text with padding; keyboard walk reaches every skill item with visible focus; reduced-motion walk clean; axe zero violations on `/`; Lighthouse a11y ≥ 0.95; build green; no orphaned imports.

**🔶 BRANDON:** Files touched: new competencies components, lucide-react added, old pillars deleted. Look: the full section. Do the mouse-around test (row wash fade, skill lifts), then the keyboard tab-through, then phone width. Compare side by side against mock v6 in your browser; this step's bar is "matches the mock."

---

## R5 · Grid thumbnail treatment  ✅

**Do:** Apply a uniform warm treatment to project card images (grid cards on homepage and /work; flagship exempt, its cream screenshot is the intended pop): a subtle CSS overlay/duotone wash consistent with the site palette so the three current thumbnails (logo lockup, purple, navy) stop reading as three different design worlds. One rule, token-based, no image editing.

**Self-audit:** Treatment applied consistently across homepage grid and /work; flagship untouched; images still legible; contrast of any text-over-image unaffected; build green.

**🔶 BRANDON:** Files touched: card image styles. Look: the three grid cards, then /work. The row should now read as one family. 🔶 Separately logged as `[later]`: the better long-term fix is re-cropped, consistently framed screenshots, which only you can produce.

---

## R6 · Grid chip cap  ✅

**Do:** Cap grid-card chips at 3 (flagship keeps 4). Claude proposes which chip drops from each affected card (Modern Softworks, Hero Animation Builder, Micro-Interactions, and Cover Letter on /work), listing the proposed cuts in the handoff BEFORE editing `projects.js`; edit after Brandon's confirm.

**Self-audit (post-confirm):** No grid card renders more than 3 chips at desktop; no chip row wraps to a second line at 1280; build green.

**🔶 BRANDON:** Confirm or amend the four proposed chip cuts, then verify no ragged second lines on any card.

---

## R7 · Contact rhythm pass  ✅

Sanctioned scope amendment to the do-not-touch register: visual sizing only, zero functional or copy changes.

**Do:** Bring the contact section's density up to the restructured site's rhythm: widen the form's max-width toward the content grid, increase input/textarea sizing and padding consistent with the site's spacing scale, and scale the section heading treatment if it reads small against neighboring sections. No field changes, no copy changes, no logic changes.

**Self-audit:** Form submits exactly as before (test it); focus states intact; axe clean; section no longer reads undersized against Competencies above it at 1280/768/360; build green.

**🔶 BRANDON:** Files touched: contact styles only. Look: scroll Competencies → Contact and judge whether the size mismatch you flagged is gone. You reserved the right to veto this one; if it reads worse, say revert and it reverts.

---

## R8 · Sweep, sync, and exit  ✅

**Do:**
- R8.1 Regenerate the competencies section of `.claude/content/competency-copy-final.md` from the shipped implementation (categories, claims, proofs, groups, all 48 items) so the content folder is truthful again; update that file's status line with today's date. Credo section of the same file updated to Option 2. Tidbits section marked `removed from site · fragments retained as [later] content`.
- R8.2 Hygiene greps across the repo: em dashes in authored copy (zero), "Design Engineer" title strings (zero), tidbit remnants (zero), mock vocabulary in shipped code (zero), old pillar imports (zero).
- R8.3 Verify the hero "View My Work" CTA targets the Selected Work anchor and scrolls correctly (carried verification from the review).
- R8.4 Update this document: all statuses, complete Build Log.

**Self-audit:** All greps zero; content folder diffs clean against shipped site; build green; this file fully ✅.

**🔶 BRANDON · EXIT:** Refinements complete. The path from here: return to `build-checklist.md`, **re-run P9 in full** (these refinements invalidated the earlier audit results: axe, Lighthouse, keyboard journey, route inventory), then P10 ship. Claude states this explicitly in the exit handoff and waits for your go.

---

## Build Log

- 2026-07-29 · Document created. Awaiting R0 and the years ruling.
- 2026-07-29 · R0.1 · ✅ `competencies-mock-v6.html` present (14,504 bytes) and read in full. Its own tallies verified against the R4 targets and they match exactly: **4 rows, 9 group labels, 48 skill items**, plus 20 distinct icon symbols to map to lucide in R4.4. Build green, 13 static pages, Next 16.2.2. Branch `v2-restructure`.
- 2026-07-29 · R0.2 · ✅ Baselines captured as **real Chrome screenshots**, not descriptions, at 1280px and 390px for hero, About, credo, competencies, grid cards, and contact (12 files in `scratchpad/baseline-shots/`), with a written companion at `scratchpad/R0-baseline.md`. The About shot confirms the R2.2 imbalance: the prose column runs far taller than the small 3:4 portrait, leaving a large empty region beneath the photo.
- 2026-07-29 · R0.2 · Note · The first hero capture failed because the `header` selector matched the zero-height skip-link wrapper added in build P4. Re-captured as a viewport shot. Harmless, recorded so the selector trap is not re-entered.
- 2026-07-29 · R0.3 · ⛔ **BLOCKED, awaiting the years ruling.** Attempted to settle it from evidence rather than just relaying the question: the resume PDF is compressed so a raw string scan found no dates, and rendering it needs poppler, which was not installed for a single lookup. Ruling recorded here once given: `YEARS = ____`.
- 2026-07-29 · R0 · 🔶 Three carried-over items Brandon should be aware of before R1 starts, none of which R0 can resolve alone:
  1. **Build-checklist P9.1 is still ⛔.** `.v2-metric-label` renders 4.21:1 against a 4.5:1 AA minimum on every detail page. No R step touches it, so it will resurface the moment P9 is re-run after R8. Two one-line fixes were already measured as passing (`--v2-text-muted`, `--v2-text-secondary`).
  2. **Numbering mismatch between the two documents.** This file is subtitled "(P9.6)" and says it runs after "P9.5 (Brandon's review)", but in `build-checklist.md` P9.5 is the decoy check and Brandon's review is **P9.7**. The sequencing intent is unambiguous, so no renumbering was done; flagged so the two documents can be reconciled at R8.
  3. **35 uncommitted paths.** Everything from P1 through P9 sits on top of commit `9c0d0a4`. Recommend a checkpoint commit before R1 so the refinement phase is separable from the restructure, exactly as the P0 baseline commit protected the original state. Brandon's call.
- 2026-07-29 · R0 · Note for R4/R8 coherence · Mock v6's Full-Stack proof line reads "A decade deep on the front", while About and the hero say "twelve years". These are not contradictory (a decade on frontend specifically, twelve years overall), but if the R0.3 ruling lands on **11** the phrasings should be sanity-checked together.
- 2026-07-29 · R0.3 · 🔶 **ANSWERED · YEARS = twelve.** Brandon is twelve years in; the resume's "11" is stale and he corrects it on his side. **Zero site edits follow from this ruling.** R2.3 is therefore a no-op, the hero subhead stays untouched under R-D with its exception unused, and `about-copy-final.md` needs no change. "A decade deep on the front" also stands as frontend-specific. R0 closes ✅.
- 2026-07-29 · R0 · 🔶 ANSWERED · Checkpoint commit approved and created: **`69d9f11` "checkpoint before refinement phase"**, covering all of build-checklist P0 through P9 (8 added, 12 deleted, 15 modified). Tree clean at zero uncommitted paths before R1 began, so the restructure and refinement phases are cleanly separable.
- 2026-07-29 · R0 · 🔶 ANSWERED · Numbering mismatch to be reconciled at R8, as proposed.
- 2026-07-29 · **build-checklist P9.1 · ⛔ → ✅ RESOLVED** at Brandon's instruction to fix it now rather than at the P9 re-run. Chose **`--v2-text-muted` (#A8A29E)** over `--v2-text-secondary` (#D6D3D1). Rationale: the token ladder runs text → secondary → muted → dim, and the label was on `dim`. Muted is the single step up that clears AA, whereas secondary would have jumped two steps and left the 12px label nearly as bright as the large metric value above it, flattening the hierarchy the design intends. **Measured result: 4.21:1 → 6.93:1** against a 4.5:1 requirement. One rule changed at `v2.css:806`, with the reason recorded in a comment.
- 2026-07-29 · R1 · ✅ Hero eyebrow now reads `Designer · Engineer · Founder` with interpuncts, applied to **both** hero branches (animated `HeroSection.jsx:64` and reduced-motion line 105) so they stay in sync as they have since P5.6d. Verified rendering on one line at 390px and 1280px.
- 2026-07-29 · R1 · Sweep result: metadata confirmed still clean from P5.6c, with `jobTitle`, both og:image `alt` strings (homepage and `/work`) and the OG image route all reading "AI Product Engineer". The **only** remaining "Design Engineer" strings in the repo are three in `/design-system` (two demo `h1`s at lines 120 and 151 showing sample hero typography, plus "Design Engineering" as a discipline heading at line 288). That page is on the Rule 3 do-not-touch register, so they were left alone. 🔶 Brandon: they are live on a real route, so if the retired title should not appear anywhere, that page needs an explicit exemption.
- 2026-07-29 · R-FONT · 🔶 ANSWERED · Brandon approved in full: `/design-system` change sanctioned retroactively (that page's job is documenting the system, and post-ruling it would otherwise document a font the site never ships), Geist Mono scoping correct, and the **control-diff methodology adopted as the standing technique for any future zero-diff acceptance test** in preference to comparing against a stale baseline.
- 2026-07-29 · R-FONT · 🔶 ADDRESSED · `--v2-font-mono` keeps its name (renaming has no visual payoff and would touch consumers for vanity). A dedicated comment now sits at its definition in `v2.css` marking the sans resolution as intentional per the 2026-07-29 ruling, so a future reader does not "fix" it back into a lie.
- 2026-07-29 · R6 · Analysis only, **no data edited**, per the step's requirement to propose first. Every chip was measured in-browser at 1280px, where the grid is 3 columns and the chip row is **302px wide**, the tightest case. Note 1024px is *looser*, not tighter, because the grid drops to 2 wider columns there.
- 2026-07-29 · R6 · ⚠️ **Two premises in the step do not match the built site.**
  1. **AI Cover Letter Generator is listed as needing a cut but already has only 3 chips.** No cut is available. It still wraps to two lines at 362px because its labels are long ("Model Fallback Chain" alone is 136px).
  2. **Ask the Claude Docs renders as a uniform grid card on `/work`, with 4 chips.** The step says "flagship keeps 4", but it is only a flagship on the homepage. So the cap either has to reach it on `/work` or be waived there. 🔶 Brandon's call.
- 2026-07-29 · R6 · ⚠️ **The cap alone cannot satisfy this step's own audit criterion.** "No chip row wraps to a second line at 1280" is unreachable for three cards at any choice of three chips, because their labels are simply too wide for a 302px row. Measured best case per card, including the 6px gaps: Hero Animation Builder **324px**, Micro-Interactions **316px**, Cover Letter **362px**, all over 302px. Modern Softworks and the chatbot each have three trios that do fit. Capping at 3 is still a clear improvement (Modern Softworks drops from 2 lines to 1, and every card is 1 line at 1024px), but the "zero wraps at 1280" bar needs either shorter labels, a 2-chip cap on the long-label cards, or a small reduction in chip type/padding (roughly 7% would fix Hero and Micro; Cover Letter would need about 17%).
- 2026-07-29 · **R-SUBHEAD · ✅ SANCTIONED SCOPE ADDITION · amendment to rule R-D.** R-D had made the hero subhead do-not-touch; Brandon amended it and supplied final copy, shipped verbatim with no em dashes: *"I believe the next decade of scientific discovery and human prosperity gets built, not wished for. I'm building my part of it: AI products, end to end, at every scale."* Applied to **both** hero branches (animated and reduced-motion), keeping them in sync as they have been since P5.6d.
  - Verified verbatim against the live page, apostrophe escaped as `&apos;` to match the `AboutSection` convention.
  - **Sets cleanly within the existing hero styles, nothing restyled:** 3 lines at 1440/1280/768, 4 at 390, 5 at 360. CTAs stay above the fold at every width and there is no horizontal overflow anywhere. Minor typographic note, not acted on because the amendment was copy-only: at 1280 the third line carries just "scale."
  - **Deliberately NOT changed: the four metadata `description` fields** in `page.jsx` (meta, openGraph, twitter, JSON-LD) and the OG image route still carry the previous subhead wording. Those are SEO copy rather than the hero line, the amendment named only the subhead, and the new line is a manifesto that would read poorly as a search description. 🔶 Brandon's call whether they should follow.
  - `/design-system` also retains the old wording twice and stays untouched under Rule 3.
  - `about-copy-final.md` "Facts locked" updated: the hero subhead is recorded as **finalized** (it was previously deferred), with the full text and a note about the metadata divergence. The twelve-years ruling was also added there.
- 2026-07-29 · **R-CENTER · ✅ SANCTIONED PRE-SHIP ADDITION · hero centered at 1024 and below. Contained fix, well inside the timebox.**
  - **Root cause, and it was deliberate rather than a bug.** `v2.css` carried `@media(max-width:1200px){.v2-hero-content{transform:translateY(-80px)}}` and `@media(max-width:768px){...translateY(-130px)}`. Those exactly matched the measured offsets. They existed to lift the copy clear of the cube once it becomes bottom-anchored at narrow widths.
  - **Why it became visible now:** those lifts were tuned against a **two-line** H1. The R-H1 change made the title one line, shortening the block by roughly 84px in the 940-1200px band, so the same lift left the content sitting visibly high.
  - **Fix:** both `transform` declarations removed, nothing else. The section already centers via flex `align-items: center`, so deleting the lift is sufficient. **The cube's own rules are untouched** (`bottom: -100px`, `transform: none`, `opacity: 0.3` at ≤768 all unchanged).
  - **Result: 0px off viewport center at 1440, 1280, 1024, 768 and 390.** Previously 0 / 0 / -80 / -130 / -130.
  - **Side effects checked, none found.** Cube canvas still present and rendering at every width with identical computed positioning. Entrance animations verified still running (hero CTA group opacity 0 → 1 at 1024, 768 and 390). Reduced-motion path renders centered with content visible. Hero block fully in viewport at every width.
  - Bonus, visible in the 1024 comparison screenshots: the single-line title previously ran *into* the cube cluster; centered, it now clears it, so composition improved rather than merely re-centering.
  - Gates re-run after the change: build green, axe **zero violations** across 4 pages x 3 widths, Lighthouse `/` **a11y 100 · SEO 100** perf 89 bp 100 and `/work` **a11y 100 · SEO 100** perf 94 bp 100, keyboard journey 73 stops with zero missing focus, 12/12 routes 200 and `/projects/codepen` 404.
  - 🔶 One taste note for Brandon, deliberately not acted on: centering at 390 places the subhead and CTAs over the faded (0.3 opacity) cube, where previously they sat above it. Legible and axe-clean, and the composition is better balanced, but it is a visual change on mobile. Reverting is one line per breakpoint.
- 2026-07-29 · **R-H1 · ✅ SANCTIONED HERO AMENDMENT · H1 holds one line at desktop.** `.v2-h1` ceiling lowered `clamp(3rem, 8vw, 5.5rem)` → `clamp(3rem, 8vw, 4.7rem)`. **The curve was adjusted, not replaced with a fixed size:** the 8vw slope and 3rem floor are untouched, so the cap is simply reached earlier, at roughly a 940px viewport, and the type stays fluid below that.
  - **Measured line count by rendered box height** (the SplitText per-character spans make span-position counting unreliable): **1 line at 1440, 1280, 1024, 940, 900, 768, 600 and 480px**; 2 lines at 390px. So it holds a single line well past the 1280+ requirement, down to about 480px, and mobile wraps normally as specified.
  - Sizing detail: the cap binds only from ~940px up. At 768px the old ceiling already produced one line, because 8vw there is 61.4px, below the previous 5.5rem cap.
  - **Check 1, balance against the cube: no change needed.** The title now ends at x=690 at 1280 and x=770 at 1440, inside its 640px column with no overflow. The cube is painted in a full-bleed canvas rather than a bounded element, so DOM clearance is not meaningful; the 1280 screenshot confirms clean separation, and the wider horizontal title reads as a better counterweight to the cube cluster than the previous stacked two-line block.
  - **Check 2, vertical rhythm: no change needed, and this was verified rather than assumed.** Gaps are unchanged at eyebrow→h1 24px, h1→subhead 24px, subhead→CTA 40px. The hero block stays **perfectly centered at 1440 and 1280 (0px off)**. It sits above center at 1024 (-80px), 768 and 390 (-130px), but an A/B measurement injecting the old 5.5rem ceiling produced **identical offsets at every width**, proving that behavior is pre-existing hero layout and not a consequence of this change.
  - Audit after the change: build green, axe **zero violations** on `/` at 360/768/1280, zero horizontal overflow, console clean, Lighthouse a11y 100 / SEO 100 / perf 89 / best-practices 100.
- 2026-07-29 · **R-LINKEDIN · ✅ SANCTIONED SCOPE ADDITION.** Profile URL changed to `https://www.linkedin.com/in/brandon-church-ms`. Repo-wide grep found **three** instances of the old URL; the two shipped ones were updated:
  1. `app/components/Footer.jsx:8` — the footer social link. **Updated.**
  2. `app/page.jsx:77` — JSON-LD `sameAs`. **Updated.**
  3. `PORTFOLIO-STANDARDS-CHECKLIST.md:425` — a JSON-LD code example inside an old research document, carrying a *different* stale URL (`/in/brandonchurch`, no "93"). **Not updated:** it is neither a component, metadata, nor live JSON-LD, and rewriting a historical research doc was outside the stated scope. 🔶 Listed for Brandon.
  - Verified live: every `linkedin.com/in/...` occurrence rendered on `/` now reads `brandon-church-ms`, with zero remaining references to `brandonchurch93` anywhere in `app/`.
- 2026-07-29 · R8.1 · ✅ `competency-copy-final.md` synced to what ships. The Core Competencies section was **generated programmatically from `app/data/competencies.js`** rather than retyped, so it cannot drift from the implementation: 4 rows, 9 group labels, 48 skill items, with claims and proofs. Credo section replaced with the Option 2 line plus a note on the accent phrase and what it superseded. Tidbits section retitled **"About tidbits · REMOVED FROM SITE"**, marked `[later]`, with all five fragments retained and the note that nothing in it currently renders. Status line updated with today's date and a summary of the three revisions. Section intros left unchanged, still accurate.
- 2026-07-29 · R8.1 · Verified rather than asserted: an automated check diffed the content file against the live page. Credo line and sub-line, all 4 claims, all 4 proofs, all 9 group labels, every skill item and the Selected Work intro all present; all 5 tidbit labels confirmed **absent**. Result: content file matches the shipped site. (The checker printed "49 skills" because it splits on the interpunct and "RAG · hybrid search & re-ranking" contains one; the true count is 48, independently confirmed by the mock diff.)
- 2026-07-29 · R8.2 · ✅ Hygiene greps. **Zero** "Design Engineer" title strings outside `/design-system`, **zero** tidbit remnants, **zero** old pillar imports or dead pillar styles, **zero** references to the removed font variables, **zero** mock vocabulary in shipped code after one fix: a comment in `competencies.js` used the word "placeholder" to describe the mock's glyphs and was reworded, since it was authored by this build and tripped the sweep.
- 2026-07-29 · R8.2 · Em dashes: **zero in authored copy**. Seven exist in the repo (3 in `ContactSection.jsx`, 4 in `Nav.jsx`) and all seven are **pre-existing non-rendering JSX comments**; a diff against checkpoint `69d9f11` confirms this build introduced none of them. Rule 2 covers authored UI copy and comments that render, so these are outside it. Recorded precisely rather than reported as a blanket zero.
- 2026-07-29 · R8.3 · ✅ Hero "View My Work" CTA verified live, not just in source. Both hero branches target `#selected-work`; clicking it moved the page from `scrollY 0` to `900` and left `#selected-work` at **0px from the viewport top**.
- 2026-07-29 · R8.4 · ✅ Numbering mismatch reconciled per the R0 flag: this file's title changed from "(P9.6)" to "(build-checklist P9.7)" and its position line now cites **P9.7**, Brandon's front-end change list, rather than P9.5, which is the decoy check. A note records the correction. Sequencing was never ambiguous, only the label.
- 2026-07-29 · R8 · Final audit: build green, 13 static pages. **axe zero violations across `/`, `/work` and two detail pages at 360/768/1280**, contrast and target-size running, zero horizontal overflow, browser console clean with zero errors and zero warnings. Data validator passes all 5 checks. Competencies still diff to **zero text differences vs mock v6** (4 rows, 9 groups, 48 skills).
- 2026-07-29 · R7 · Diagnosis by measurement: at 1280px the contact column was **640px inside a 1200px grid, 53% of the width every other section uses**, which is the size mismatch Brandon flagged. The problem is desktop-only; at 768px and 360px the column already filled 83% and 91%.
- 2026-07-29 · R7 · ✅ Sizing changes, visual only. Column `640px → 880px` (**53% → 73%** of the grid). Inputs: padding `12px 16px → 15px 18px`, `min-height 44px → 52px`, font `15px → 16px`, giving a rendered height of `49px → 56px`. Textarea `min-height 140px → 176px`. Form and field-grid gaps `16px → 20px`, both on the 4px spacing scale.
- 2026-07-29 · R7 · The heading condition in the step ("scale the section heading if it reads small") was checked and **deliberately not acted on**: `#contact h2` already computes to exactly the same size as `#competencies h2`, 44px at 1280 and 32px below. The heading was never the problem, the column width was.
- 2026-07-29 · R7 · **Form verified to submit exactly as before, without sending a real message.** The form POSTs to a live `formsubmit.co` endpoint that emails Brandon, so the request was intercepted in-browser and answered with a mock rather than delivered. Confirmed: all 7 fields intact and unchanged (`_honey`, `_subject`, `_template`, `_captcha`, `name`, `email`, `message`) with the same ids and required flags; method POST; correct endpoint; `multipart/form-data` body carrying the right values; and the success path rendering "Message sent · I'll get back to you within 24 hours." Two intermediate failures during this test were faults in the test harness, not the site: the first parsed the multipart body as JSON, the second omitted an `Access-Control-Allow-Origin` header on the mock so the cross-origin fetch was blocked.
- 2026-07-29 · R7 · Audit: build green. Focus states intact, measured rest vs focus on `#contact-name` (border to accent, background to surface, and the 3px accent ring all still apply). Zero field, copy or logic changes. axe **zero violations** on `/` at 360/768/1280, console clean.
- 2026-07-29 · R6 · 🔶 CONFIRMED by Brandon ("looks good"). Three assumptions were taken from the recommendations as presented and are each a one-line reversal: the three nominated cuts, **Option A** for the chatbot (cap enforced in the component so the flagship keeps 4 on the homepage while `/work` shows 3), and acceptance of the two-line wrap where it is unavoidable.
- 2026-07-29 · R6 · ✅ Cap implemented in `ProjectCard` as `.slice(0, 3)`, so no uniform card can ever exceed three chips regardless of data. `FlagshipCard` is untouched and still renders four. Cuts applied to `projects.js`: **MDX Pipeline** (Modern Softworks), **SVG Animation** (Hero Animation Builder), **Static Generation** (Micro-Interactions). AI Cover Letter Generator needed no cut, it already had three.
- 2026-07-29 · R6 · The chatbot renders in both contexts, so it gained `cardTechStackGrid`, following the existing `cardTechStack`/`techStack` override convention. This drops **CI-Scored Evals** on `/work` only and leaves the flagship's four chips in their originally approved order, so no approved copy was reordered to satisfy a layout cap.
- 2026-07-29 · R6 · Content file synced per the P9.7 precedent: `project-copy-final.md` chip lists now reflect what ships, with the flagship and grid variants listed separately, the heading updated from "max 4" to "flagship max 4 · uniform grid cards max 3", and a dated note recording every dropped chip.
- 2026-07-29 · R6 · Audit results: build green. **No grid card exceeds 3 chips at any of 1440/1280/1024/768/390 on either page**, verified programmatically; flagship holds at 4 throughout. Wrap outcome at 1280 is as predicted from the measurements: Modern Softworks improved from 2 lines to **1**, the chatbot's `/work` card sits on **1**, and Hero, Micro and Cover Letter remain at 2 because their labels exceed a 302px row at any three-chip combination. Every card is single-line at 1024px and below. Data validator still passes all five checks; axe **zero violations** on `/` and `/work` at all widths; console clean.
- 2026-07-29 · R6 · 🔶 [later] · If the 1280 two-line wrap on those three cards ever needs to go, the options measured in the analysis above still stand: shorter labels, a two-chip cap on long-label cards, or roughly a 7% reduction in chip type and padding (Cover Letter would need about 17%). Not pursued, since Brandon accepted the wrap.
- 2026-07-29 · R5 · ⚠️ **Found on inspection: the flagship was NOT exempt, it was being washed like everything else.** The existing `sepia(0.6) saturate(0.7) brightness(0.7) hue-rotate(-10deg)` was declared on `.v2-project-img`, a class **both** `ProjectCard` and `FlagshipCard` use, so the chatbot's cream screenshot was being dimmed at rest. R5's premise that the flagship is "the intended pop" was therefore not true of the shipped site. Fixing that turned out to be the larger half of this step.
- 2026-07-29 · R5 · ✅ Treatment scoped and strengthened. The blanket filter was removed from `.v2-project-img` (which keeps only its transition, shared with the flagship's hover scale) and re-declared on `.v2-project-img-wrap .v2-project-img`, a wrapper **only the uniform card uses**, so the flagship is now exempt by structure rather than by exception. Grid thumbnails get `grayscale(1) brightness(0.8) contrast(1.05)` plus a token-based `::after` wash, `linear-gradient(160deg, var(--v2-accent), var(--v2-bg))` at `mix-blend-mode: overlay` and `opacity 0.34`, fading to 0 on hover over 600ms on the existing bloom easing so the true image is still revealed.
- 2026-07-29 · R5 · Chosen by visual trial, not guesswork. Five candidates were rendered and compared: current, exempt-only, a stronger sepia duotone, a sepia-plus-soft-light overlay, and grayscale-plus-amber-overlay. The last unified decisively, collapsing a green logo lockup, a purple UI and a navy card into one warm family while the earlier sepia variants left each thumbnail's original hue identifiable. Trial images retained in `scratchpad/r5-trials/`.
- 2026-07-29 · R5 · Audit: applied identically across the homepage grid (3 cards) and `/work` (5 cards), verified as a single distinct filter value and a single overlay opacity across all of them. Flagship image filter reads `none`, confirmed exempt. Images remain legible; the wash sits on the image only and no text is set over it, so no text contrast is affected. axe **zero violations** on `/` and `/work` at 360/768/1280, console clean, build green.
- 2026-07-29 · R5 · [later] · As noted in the step, the durable fix is re-cropped, consistently framed screenshots, which only Brandon can produce. The CSS wash is the interim unifier.
- 2026-07-29 · R4.1 · ✅ Editorial-rows layout replaces the 2x2 card grid. Full-width rows on a `380px 1fr` grid with hairline dividers and a top border, category-first hierarchy on the left (mono index → category heading → amber claim → muted proof), stacked labeled skill groups on the right. Collapses to a single column at 900px per the mock.
- 2026-07-29 · R4.2 · ✅ Hover wash implemented as the mock specifies: an absolutely-positioned `::before` overlay carrying the warm gradient, inset to the row's own `28px` inline padding and matching `-28px` negative margins so the wash reads as padded rather than clipping text, `border-radius` on the token scale, and an **opacity fade measured at `opacity 0.35s`** rather than a snap. Skill items lift `translateY(-2px)`, tint their background amber, brighten their label, and tint the icon amber at `scale(1.12)`. Entrance stagger per row at `delay: i * 0.08`, matching the site's existing pattern rather than the mock's raw CSS animation.
- 2026-07-29 · R4.2 · Both twins verified per R-C. **Reduced motion:** a `prefers-reduced-motion` block neutralizes the wash transition and both skill transforms, on top of each row's reduced-motion render path. **Keyboard/focus-visible:** measured on real Tab focus, not programmatic focus, and confirmed `:focus-visible` matches with label at `--v2-text`, background `rgba(212,165,116,0.12)`, `translateY(-2px)`, a 2px amber outline, and the icon amber at `scale(1.12)`.
- 2026-07-29 · R4.3 · ✅ Content verbatim. An automated diff parsed `competencies-mock-v6.html` and the rendered section and compared every index, category, claim, proof, group label and skill string: **zero differences**. Counts confirmed **4 rows, 9 groups, 48 skills**, in the mock's order (AI Product Engineering → Full-Stack Engineering → Design Systems & Craft → Product Leadership).
- 2026-07-29 · R4.4 · ✅ `lucide-react@0.518.0` added. All 20 of the mock's placeholder glyphs mapped to lucide equivalents, and every name was verified to exist in the installed version before use: atom→Atom, code→Code, pen→PenLine, layout→LayoutTemplate, wave→Waves, layers→Layers, db→Database, server→Server, zap→Zap, branch→GitBranch, bot→Bot, gauge→Gauge, shield→ShieldCheck, users→Users, compass→Compass, rocket→Rocket, search→Search, check→CircleCheck, doc→FileText, plug→Plug. Single-tint line glyphs at `strokeWidth 1.6`, 15px, colored by `currentColor` per R-B; `aria-hidden` since the adjacent label carries the meaning. No brand logos, no skill bars, no ratings.
- 2026-07-29 · R4.5 · ✅ Old pillar implementation deleted: the `CompetencyCard` component, the metric/metricLabel model, the substack rows, the "AI-Augmented Development" chip, and 44 lines of `.v2-competencies-grid` / `.v2-substack` CSS. Every relative import in `app/` verified to resolve. Remaining grep hits for `metricLabel` and "AI-Augmented Development" are inside `/design-system`, which holds its own independent demo arrays and is not the homepage pillar code.
- 2026-07-29 · R4 · Audit results: build green, 13 static pages. Text diff vs mock **zero**. axe **zero violations** on `/` at 360/768/1280 with contrast and target-size running, zero horizontal overflow, console clean. **Lighthouse accessibility 100** (gate ≥95), SEO 100, best-practices 100, performance 90.
- 2026-07-29 · R4 · Observation, intended not accidental: the section adds **48 new tab stops**. The mock specifies `tabindex="0"` on every skill and R4's own self-audit requires the keyboard walk to reach each one, so this is by design; it gives keyboard users the same affordance the hover tint gives mouse users. All 48 were confirmed reachable in order with a visible focus state. 🔶 Worth Brandon's eye at R8 if the tab burden feels heavy on a real keyboard pass.
- 2026-07-29 · **R-FONT · ✅ SANCTIONED SCOPE ADDITION · the system-sans rendering is now official.** Brandon's ruling: "the current rendering IS the site. I've been designing and approving the system-sans version all week; make the accident official." Credit where due, this was surfaced by Claude while screenshotting R3's credo, not by any brief.
  - **Removed both dead font loads and a third.** `Cormorant_Garamond`, `Geist` and also `Geist_Mono` were deleted from `layout.js`, along with the three variable classNames on `<body>`. Geist Mono was not named in the ruling but is dead by the identical mechanism, so leaving it would have contradicted the stated rationale; flagged rather than silently scoped.
  - **Tokens made truthful, not deleted**, per instruction 2. `--v2-font-heading`, `--v2-font-body` and `--v2-font-mono` now declare the explicit platform stack that actually renders, matching `tailwind.config.js` `fontFamily.sans`. All three previously computed to empty. Note: `--v2-font-mono` intentionally carries the **same sans stack**, because its two consumers (`v2.css` feature numbers, `Nav.jsx:370` mobile numerals) have always rendered in sans; giving it a real monospace stack would have been a visible change and failed the acceptance test. 🔶 Flagged: the name now understates what it holds.
  - **Header comment updated** per instruction 3: no longer claims Cormorant Garamond + Geist.
  - **Savings, instruction 4:** webfont assets **21 files / 440 KB → 0 files / 0 KB**, and **4 preloaded woff2 on `/` → 0**. Nothing rendered differently for those 440 KB.
- 2026-07-29 · **R-FONT · Acceptance test: PASSED on all four specified surfaces.**
  - **Method correction, deliberate.** The instruction said to compare against the R0 baselines, but R1, R2 and R3 legitimately changed the hero, About and credo since R0, so an R0 comparison would have reported those as font failures. Instead the site was screenshotted immediately **before** the font change and again after, which isolates the variable properly. Pixel comparison via pixelmatch.
  - `about` **IDENTICAL** · `credo` **IDENTICAL** · `competencies` **IDENTICAL** · `contact` **IDENTICAL** (0 pixels differ).
  - `hero` 6.44% and `cards` 0.11% initially differed. **Proven to be animation noise by a control experiment**: the same build was captured twice and diffed against itself, yielding hero 6.63% and cards 0.1096%, the latter bit-for-bit the same pixel count. The diff images confirm it visually, all red is confined to the rotating 3D cube and to the fixed nav's scroll state, with **zero red on any text glyph anywhere**.
  - Verified separately: computed `font-family` on `/` is byte-identical before and after, and the mono consumers still render the same stack.
- 2026-07-29 · R-FONT · 🔶 **One genuine visual change, outside the four surfaces Brandon listed, needs his sign-off.** `/design-system` was the **only page in the build that actually rendered Cormorant Garamond**, because `design-system/page.jsx:31-33` referenced the next/font variables **directly** rather than through the `--v2-*` tokens, and those variables did resolve inside `<body>`. Removing the font loads necessarily changes that page. Its three font constants were repointed at `var(--v2-font-*)` so the page documents the type the site actually ships instead of referencing deleted variables. This touches the Rule 3 do-not-touch register; it was unavoidable given instruction 1, and is reversible.
- 2026-07-29 · R-FONT · Audit: build green, 13 static pages. Zero dangling references to `--font-cormorant`, `--font-geist-sans` or `--font-geist-mono` anywhere in `app/`. axe **zero violations** on `/`, `/work` and a detail page at 360/768/1280, console clean.
- 2026-07-29 · R3 · ✅ Credo line replaced with the Option 2 copy, verified character-exact against the checklist's inline block. Closing phrase "accessible, from the design system up." carries the accent via a new `.v2-credo-accent` span. Sub-line unchanged. Confirmed still exactly one strip on the page and the old "All of them." line is gone.
- 2026-07-29 · R3 · Setting tuned by measurement, not by eye. The old `34ch` at `clamp(1.375rem, 2.8vw, 1.875rem)` set the longer claim on **3 lines**. Four configurations were tested in-browser; the chosen one is `max-width: 58ch` at `clamp(1.125rem, 2vw, 1.5rem)` with `line-height 1.35` and `text-wrap: balance`. Result: **2 lines from 768px up** (24px type at 1280/1440, 873px measure), 4 lines at 390px, 5 at 360px, all wrapping cleanly. This config was preferred over an 84ch variant that also achieved 2 lines, because it keeps the larger 24px type and a much shorter, more readable measure.
- 2026-07-29 · R3 · ⚠️ Dangling reference in the brief, resolved by judgment: R3 says to style "per the competencies mock's credo treatment", but `competencies-mock-v6.html` **contains no credo section**. The explicit instruction (accent on the closing phrase) was unambiguous and was followed; the accent styling was modelled on the mock's only accent-text precedent, `.claim` (accent color, weight 600).
- 2026-07-29 · R3 · Audit: build green, axe zero violations on `/` at 360/768/1280 with contrast and target-size running, zero overflow, console clean.
- 2026-07-29 · **🔶🔶 MAJOR PRE-EXISTING FINDING, NOT FIXED, AWAITING BRANDON · the site's display typeface has never rendered.** Noticed while screenshotting the credo: the serif face was missing. Traced and confirmed, this is not an R3 side effect and predates the entire v2 restructure.
  - **Root cause.** `layout.js:56` applies the three next/font variable classes to `<body>`, while `v2.css:38` composes `--v2-font-heading: var(--font-cormorant), Georgia, serif` inside `:root` (that is, `<html>`). Measured: `--font-cormorant` resolves on `body` but is **empty on `html`**. Per the CSS custom-property spec a declaration containing an unresolvable `var()` is invalid at computed-value time, so `--v2-font-heading` computes to the guaranteed-invalid value at `:root` and **inherits that emptiness to every descendant, body included**.
  - **Effect.** `--v2-font-heading` and `--v2-font-body` are empty everywhere, so every `font-family: var(--v2-font-*)` declaration is invalid and the browser falls back to `-apple-system, system-ui, Segoe UI, Roboto, ...`. **Every heading and all body copy across the whole site renders in the system sans stack.** Cormorant Garamond and Geist are downloaded but never applied. The file's own header comment reads "V2 DESIGN SYSTEM — Warm Amber + Cormorant Garamond + Geist", so the intent is unambiguous.
  - **Fix verified but deliberately NOT applied.** Injecting the font variables at `:root` in-browser flips `h1` from the system stack to `"Cormorant Garamond", "Cormorant Garamond Fallback", Georgia, serif`. Before/after screenshots saved to `scratchpad/font-finding/`. The likely one-line repo fix is to move (or copy) the next/font variable classNames from `<body>` onto `<html>` in `layout.js`.
  - **Why it is being held:** it transforms the typography of every page on the site, which is far outside R3's scope and squarely a Rule 3 design-system decision. Brandon's call on whether, and when, to land it.
- 2026-07-29 · R2.1 · ✅ Tidbits removed completely: `Tidbits.jsx` deleted, its import and usage removed from `AboutSection.jsx`, and the full 57-line `.v2-tidbit*` CSS block (1,310 bytes) cut from `v2.css`. Repo-wide grep for "tidbit" and "weirder stuff" across jsx/js/css returns **zero**, and the rendered page confirms all six strings are gone.
- 2026-07-29 · R2.1 · [later] · **The five tidbit fragments, retained as content, not lost.** Candidate future home per the review: project detail pages.
  1. A rover roams my house → Home-built, LLM-connected, and fully convinced it owns the hallway.
  2. My desk robots talk back → Two desk companions wired to LLMs. They have opinions now.
  3. I print the parts I design → If a build needs a part that doesn't exist, I design it, print it, and bolt it on.
  4. There was a VR chapter → C#, game dev, and VR before any of this. It still comes in handy.
  5. My UI sounds aren't files → The cover letter app synthesizes its sounds from oscillators, live, in the browser.
- 2026-07-29 · R2.2 · ✅ Rebalanced. Photo column `clamp(240px, 25vw, 320px)` → `clamp(280px, 34vw, 440px)`; crop `aspect-ratio 3/4` → `3/4.4` (taller); `sizes` updated to match the new render width so the correct image variant is served; mobile override `250px` → `300px`. About prose untouched.
- 2026-07-29 · R2.2 · Balance measured rather than eyeballed, photo height as a percentage of text-column height: **1280px → 95%**, **1440px → 96%** (was a small block against a very tall column, with dead space beneath). At 768px and below the layout stacks `column-reverse`, so side-by-side parity does not apply there.
- 2026-07-29 · R2.2 · 🔶 REVISION after Brandon's review: "it looks like it starts at the top of the section instead of being centered with the textual content", plus a request to reduce the image by no more than 20%.
  - **Diagnosed by measurement.** The photo *was* centered, but against the **whole text column**, which leads with the "ABOUT" eyebrow and the "How I got here" heading. That put its center 59px above the prose center and its top only 12px below the section top, which is exactly what read as "starts at the top".
  - **Fix:** kept `align-self: center` and added `margin-top: clamp(72px, 8vw, 118px)` to `.v2-about-photo`, roughly the height of the heading block, which re-centers the photo against the prose rather than the column. Zeroed at the 768px breakpoint where the layout stacks `column-reverse` and the offset would be wrong.
  - **Size reduced 15%**, inside the 20% cap: `clamp(280px, 34vw, 440px)` → `clamp(240px, 29vw, 374px)`.
  - **Measured result**, photo center vs prose center: **1440px -1px · 1280px -7px · 1024px -15px · 900px -17px**, all visually imperceptible. At 374x549 the photo now brackets the 553px-tall prose block, aligning top and bottom within 3px. Stacked widths correctly report `margin-top: 0`.
- 2026-07-29 · R2.3 · No-op, as the R0.3 ruling was **twelve**. Verified positively rather than assumed: "built on twelve years" and "Twelve years of that standard" both still render, and `about-copy-final.md` was not edited.
- 2026-07-29 · R2 · Audit results: build green, 13 static pages. All four About paragraphs still diff clean character-for-character against `about-copy-final.md`. axe zero violations on `/` at 360/768/1280 with contrast and target-size running, zero horizontal overflow, browser console clean.
- 2026-07-29 · R1 · Audit results: build green, 13 static pages. **Real-browser axe now returns zero violations on every page at every width** (`/`, `/work`, and both audited detail pages at 360/768/1280), which it did not before this step, since the contrast fix landed here. Zero horizontal overflow, browser console clean with zero errors and zero warnings.
