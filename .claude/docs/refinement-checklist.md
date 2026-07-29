# Portfolio v2 · Refinement Checklist (P9.6)

Companion to `.claude/docs/build-checklist.md`. Executes the refinement decisions from Brandon's 2026-07-29 front-end review. Written 2026-07-29.

Position in the process: runs AFTER the original checklist's P9.5 (Brandon's review) and BEFORE ship. These refinements touch audited surfaces, so **any earlier P9 results are invalidated**: on completing R8, re-run build-checklist P9 (final audits) in full, then proceed to P10 (ship).

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

## R0 · Pre-flight and the blocker  🟡  (R0.1 and R0.2 done · R0.3 awaiting Brandon)

**Do:**
- R0.1 Verify `.claude/design/competencies-mock-v6.html` exists; open and read it fully. Verify branch state is clean post-P9.5 and build is green.
- R0.2 Baseline screenshots (or descriptions) of: hero, About section, credo strip, competencies, one grid card row, contact.
- R0.3 🔶 **BLOCKER · ELEVEN OR TWELVE YEARS.** The resume says 11 years; the site's locked About copy and hero subhead say twelve. They cannot both be right, and the number appears in surfaces R2 and R6 touch. Brandon rules: **11** or **twelve**. If 11: R2.3 updates the About copy's number, the hero subhead's number (sole sanctioned subhead edit per R-D), and `about-copy-final.md`. If twelve: the site stands; 🔶 Brandon fixes his resume separately. Do not start R1 until answered.

**Self-audit:** Mock readable, build green, baselines captured, ruling recorded here: `YEARS = ____`.

**🔶 BRANDON:** Answer the years question. That's the whole gate.

---

## R1 · Hero eyebrow  ⬜

**Do:** Replace eyebrow text "Design Engineer" with `Designer · Engineer · Founder` (interpuncts, not hyphens or dashes). Sweep for any other surface still carrying "Design Engineer" as a title (metadata should already be clean from P5.6c; verify).

**Self-audit:** Rendered eyebrow correct at all widths; grep confirms no remaining "Design Engineer" title strings anywhere user-visible; build green.

**🔶 BRANDON:** Files touched: hero component only (plus any metadata stragglers found). Look: top of homepage. The first words on your site are now the locked eyebrow.

---

## R2 · About: tidbits out, photo up, number ruling  ⬜

**Do:**
- R2.1 Delete the tidbits component entirely: the "Tap for the weirder stuff" label, all five pills, all panels, associated styles and state. Grep for orphaned imports. Log the five story fragments in the Build Log as `[later]` content (candidate future home: project detail pages).
- R2.2 Rebalance the section: widen the photo column ratio and use a taller crop of the existing headshot so image and text reach rough visual parity at desktop. Do not touch the About prose.
- R2.3 Apply the R0 years ruling if it was 11: About copy number, hero subhead number, and update `.claude/content/about-copy-final.md` to match (note the edit in that file's status line).

**Self-audit:** No tidbit code remains (grep); About renders balanced at 1280/768/360; prose diffs clean against `about-copy-final.md` (post-ruling version); axe clean on `/`; build green.

**🔶 BRANDON:** Files touched: About component (+ content file if 11). Look: the About section. Judge the text-to-photo balance at desktop and phone; this one is a taste call, so say "bigger" or "smaller" if the ratio isn't right yet.

---

## R3 · Credo strip: Option 2 copy  ⬜

**Do:** Replace the strip's main line with, verbatim:
`Every product I've shipped for the federal government has passed its accessibility audit, and everything I build today starts accessible, from the design system up.`
Style per the competencies mock's credo treatment: the closing phrase "accessible, from the design system up" carries the accent color. Sub-line unchanged: `SECTION 508 · WCAG 2.2 · 100% PASS RATE`. Ensure graceful two-line setting at desktop and clean wrapping at mobile; adjust max-width/type size within the existing scale if needed.

**Self-audit:** Text character-exact; accent phrase correct; renders without orphans/widows at 1280/768/360; still the only strip on the page; build green.

**🔶 BRANDON:** Files touched: credo component. Look: the strip between About and Competencies. Read it once aloud; this is the claim you said you could defend, confirm it reads that way on screen.

---

## R4 · Core Competencies rebuild (the main event)  ⬜

**Do:**
- R4.1 Replace the 2x2 card grid with the editorial-rows layout from mock v6: full-width rows, hairline dividers, category-first hierarchy (mono index → category heading → gold claim line → muted proof), right side = stacked full-width labeled groups of icon+label skill items.
- R4.2 Hover wash per mock: absolutely-positioned overlay with the warm gradient, inline padding with matching negative margins, radius, opacity fade ~350ms. Skill item hover/focus: lift, amber icon tint, soft background. Entrance stagger per row. Reduced-motion and keyboard twins for all of it (R-C).
- R4.3 Content verbatim from the mock (R-A): order AI Product Engineering → Full-Stack Engineering → Design Systems & Craft → Product Leadership; all 48 skill items, group labels, claims, proofs exactly as written there.
- R4.4 Icons: add lucide-react; map each placeholder glyph to the closest lucide equivalent (Claude's judgment); single-tint stroke styling per R-B.
- R4.5 Delete the old pillar components and any now-dead styles (grep for imports).

**Self-audit:** Text diff between rendered section and mock v6 text = zero differences; row count 4, group count 9, skill count 48; hover wash fades (not snaps) and clears text with padding; keyboard walk reaches every skill item with visible focus; reduced-motion walk clean; axe zero violations on `/`; Lighthouse a11y ≥ 0.95; build green; no orphaned imports.

**🔶 BRANDON:** Files touched: new competencies components, lucide-react added, old pillars deleted. Look: the full section. Do the mouse-around test (row wash fade, skill lifts), then the keyboard tab-through, then phone width. Compare side by side against mock v6 in your browser; this step's bar is "matches the mock."

---

## R5 · Grid thumbnail treatment  ⬜

**Do:** Apply a uniform warm treatment to project card images (grid cards on homepage and /work; flagship exempt, its cream screenshot is the intended pop): a subtle CSS overlay/duotone wash consistent with the site palette so the three current thumbnails (logo lockup, purple, navy) stop reading as three different design worlds. One rule, token-based, no image editing.

**Self-audit:** Treatment applied consistently across homepage grid and /work; flagship untouched; images still legible; contrast of any text-over-image unaffected; build green.

**🔶 BRANDON:** Files touched: card image styles. Look: the three grid cards, then /work. The row should now read as one family. 🔶 Separately logged as `[later]`: the better long-term fix is re-cropped, consistently framed screenshots, which only you can produce.

---

## R6 · Grid chip cap  ⬜

**Do:** Cap grid-card chips at 3 (flagship keeps 4). Claude proposes which chip drops from each affected card (Modern Softworks, Hero Animation Builder, Micro-Interactions, and Cover Letter on /work), listing the proposed cuts in the handoff BEFORE editing `projects.js`; edit after Brandon's confirm.

**Self-audit (post-confirm):** No grid card renders more than 3 chips at desktop; no chip row wraps to a second line at 1280; build green.

**🔶 BRANDON:** Confirm or amend the four proposed chip cuts, then verify no ragged second lines on any card.

---

## R7 · Contact rhythm pass  ⬜

Sanctioned scope amendment to the do-not-touch register: visual sizing only, zero functional or copy changes.

**Do:** Bring the contact section's density up to the restructured site's rhythm: widen the form's max-width toward the content grid, increase input/textarea sizing and padding consistent with the site's spacing scale, and scale the section heading treatment if it reads small against neighboring sections. No field changes, no copy changes, no logic changes.

**Self-audit:** Form submits exactly as before (test it); focus states intact; axe clean; section no longer reads undersized against Competencies above it at 1280/768/360; build green.

**🔶 BRANDON:** Files touched: contact styles only. Look: scroll Competencies → Contact and judge whether the size mismatch you flagged is gone. You reserved the right to veto this one; if it reads worse, say revert and it reverts.

---

## R8 · Sweep, sync, and exit  ⬜

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
