# Typography Research: Premium Dark-Mode Portfolio (2025-2026)

Research compiled March 2026 for brandon-church-portfolio.

---

## Current State

The portfolio currently loads **Geist** and **Geist Mono** via `next/font/google` in `app/layout.js`, but the Tailwind config's `fontFamily.sans` stack falls back to system fonts (Apple system, BlinkMacSystemFont, Segoe UI, Roboto, etc.). Geist is loaded but may not be fully wired into the Tailwind theme.

---

## 1. Serif + Sans-Serif Pairings (Ranked by Fit)

### TIER 1 -- Top Recommendations

#### A. Instrument Serif + Geist
- **Heading:** Instrument Serif (Google Fonts, free)
- **Body:** Geist (already loaded)
- **Why it works:** Instrument Serif was designed by the Instrument agency -- it has a condensed, editorial quality with high contrast that screams "design-forward." Paired with Geist's neutral, modern geometry, you get a serif/sans contrast that feels like a design engineer's portfolio rather than a developer's blog. Instrument Serif's Italian letterforms add warmth without fussiness. Geist keeps everything grounded and technical.
- **Dark mode advantage:** Instrument Serif's thin strokes render beautifully on high-DPI dark backgrounds. The contrast ratio between thick and thin strokes creates visual interest without needing color.
- **Sites using similar approach:** Instrument.com itself, many Vercel-adjacent portfolio sites
- **Weights & Sizes:**
  - Hero h1: Instrument Serif Regular (400), 5rem-7rem (80-112px), italic for accent words
  - Section h2: Instrument Serif Regular, 2.5rem-3rem (40-48px)
  - h3: Geist Medium (500), 1.5rem (24px)
  - Body: Geist Regular (400), 1.125rem (18px)
  - Small/caption: Geist Regular, 0.875rem (14px)
  - Code: Geist Mono Regular, 0.9375rem (15px)

#### B. Fraunces + Geist
- **Heading:** Fraunces (Google Fonts, variable font)
- **Body:** Geist (already loaded)
- **Why it works:** Fraunces is a variable font with four axes (weight, optical size, softness/"SOFT", and wonk/"WONK"). This gives you massive creative range from a single font file. At display sizes, Fraunces has quirky, old-style serif character with "wonky" details that feel handcrafted. It signals creativity and craft without being decorative. The variable axes let you animate between states or tune the exact personality.
- **Dark mode advantage:** The optical size axis means you can optimize rendering at every size. At large sizes, contrast increases naturally. The SOFT axis lets you soften serifs for a warmer dark-mode feel.
- **Sites using it:** Google's own font documentation showcases it prominently
- **Weights & Sizes:**
  - Hero h1: Fraunces 900 weight, WONK=1, opsz=72, 5rem-6rem (80-96px)
  - Section h2: Fraunces 700, WONK=0, opsz=36, 2.5rem (40px)
  - h3: Geist Medium (500), 1.5rem (24px)
  - Body: Geist Regular (400), 1.125rem (18px)
  - Small: Geist Regular, 0.875rem (14px)

### TIER 2 -- Strong Alternatives

#### C. DM Serif Display + DM Sans
- **Heading:** DM Serif Display (Google Fonts)
- **Body:** DM Sans (Google Fonts)
- **Why it works:** These were designed as a family by Colophon Foundry for DeepMind. They share the same underlying metrics and design DNA, which creates effortless harmony. DM Serif Display is a high-contrast transitional face designed specifically for large, poster-style settings. DM Sans is clean, geometric, and highly readable at body sizes.
- **Caveat:** This pairing is becoming more common. It works well but does not differentiate as strongly as Instrument Serif + Geist.
- **Weights & Sizes:**
  - Hero h1: DM Serif Display Regular (400), 4.5rem-6rem (72-96px)
  - h2: DM Serif Display Regular, 2.25rem-2.75rem (36-44px)
  - h3: DM Sans Medium (500), 1.5rem (24px)
  - Body: DM Sans Regular (400), 1rem-1.125rem (16-18px)
  - Small: DM Sans Regular, 0.875rem (14px)

#### D. Playfair Display + DM Sans
- **Heading:** Playfair Display (Google Fonts)
- **Body:** DM Sans (Google Fonts)
- **Why it works:** Playfair Display has extreme thick/thin contrast inspired by Baskerville. On dark backgrounds, those hairline strokes create an almost luminous quality. DM Sans as the body maintains readability.
- **Caveat:** Playfair Display is becoming overused in editorial/portfolio contexts. Still effective but less distinctive than it was in 2023.
- **Weights & Sizes:**
  - Hero h1: Playfair Display Bold (700), 4rem-5.5rem (64-88px)
  - h2: Playfair Display SemiBold (600), 2.25rem-2.75rem (36-44px)
  - h3: DM Sans Medium (500), 1.375rem (22px)
  - Body: DM Sans Regular (400), 1.0625rem (17px)
  - Small: DM Sans Regular, 0.8125rem (13px)

#### E. Fraunces + DM Sans
- **Heading:** Fraunces (Google Fonts, variable)
- **Body:** DM Sans (Google Fonts)
- **Why it works:** Same Fraunces benefits as above. DM Sans is slightly warmer than Geist, creating a more editorial tone vs. the more technical tone Geist provides.
- **Best for:** If the portfolio leans more toward "creative designer" than "design engineer"

### TIER 3 -- Good But With Caveats

#### F. DM Serif Display + Inter
- **Heading:** DM Serif Display
- **Body:** Inter
- **Why it works:** Solid, professional pairing. Inter is the gold standard for UI body text -- enormous x-height, optimized for screens, excellent at small sizes.
- **Caveat:** Inter is now the most deployed Google Font on the web. It is functionally invisible, which can be either a strength (it disappears, letting content speak) or a weakness (the portfolio looks like every other Next.js app).

---

## 2. Display / Variable Fonts Trending in 2026

### Variable Fonts Awwwards Winners Are Using
Based on Typewolf data and Awwwards trends:

1. **Fraunces** -- 4 axes (weight, optical size, SOFT, WONK). The standout variable font for editorial/display use.
2. **Recursive** -- Sans/mono on a single axis. Useful for design-engineering portfolios where you show code alongside prose.
3. **Roboto Flex** -- 12 axes, the most parameterized Google Font. Overkill for most portfolios but technically impressive.
4. **Anybody** -- Width and weight axes. Good for responsive display text.
5. **Inter** -- Weight axis. Boring but bulletproof.

### Standout Display Fonts for Hero Text (2026)

**Premium (licensed):**
- **Ogg** -- #1 serif on Typewolf 2026. Extreme contrast, fashion-editorial feel.
- **Editorial New** -- Dramatic display serif. Heavy use in luxury/culture sites.
- **Reckless Neue** -- High-contrast serif with a modern edge.
- **GT Super** -- Warm, confident display serif.
- **Clash Display** -- Geometric display sans with personality. Free from Fontshare.
- **Satoshi** -- Clean geometric sans, free from Fontshare.
- **General Sans** -- Neutral with subtle warmth, free from Fontshare.

**Free (Google Fonts):**
- **Instrument Serif** -- Best free display serif for portfolios right now.
- **Fraunces** -- Most versatile free variable display font.
- **Space Grotesk** -- Geometric sans with technical character, good at display sizes.
- **Sora** -- Geometric sans with slightly futuristic feel.

---

## 3. Evaluation of Specific Pairings

### Space Grotesk + [Serif Heading]
Space Grotesk works best as a HEADING font, not body. Its distinctive letterforms (the geometric 'a', the slightly quirky 'g') become distracting at body sizes. Best pairings:
- **Heading:** Space Grotesk Bold (700) | **Body:** Inter or Source Sans 3
- **Heading:** Space Grotesk Medium (500) | **Mono accent:** Space Mono
- Use for portfolios with a technical/engineering emphasis over editorial tone

### Sora + [Serif Heading]
Sora is geometric with a slightly futuristic, Japanese-influenced aesthetic. Works well:
- **Heading:** Sora Bold/ExtraBold | **Body:** Sora Regular at lighter weight
- Can be used as a single-font system (heading + body) due to weight range
- Best for: Portfolios emphasizing animation, motion design, or futuristic aesthetics
- Pair with a serif accent: Instrument Serif for section labels or pull quotes

### Neue Montreal
**NOT on Google Fonts.** It is a commercial font from Pangram Pangram (~$30-60 for web license). Extremely popular on Awwwards-winning sites. If you want to license it, it pairs well with:
- **Heading:** Neue Montreal Bold | **Body:** Neue Montreal Regular (single font system)
- Or pair with a display serif heading (Editorial New, Instrument Serif)

**Free alternatives to Neue Montreal:**
- **Geist** (already in use -- very similar neo-grotesque character)
- **Urbanist** (Google Fonts -- slightly warmer)
- **General Sans** (Fontshare -- closest match)
- **DM Sans** (Google Fonts -- more geometric but similar neutrality)

### Summary: You do NOT need Neue Montreal. Geist occupies the same niche and is already loaded.

---

## 4. Typography Scale for Premium Portfolios

### Desktop Hero Text Sizes
The trend in 2025-2026 premium portfolios is toward LARGE hero text:

| Element | Size Range | Sweet Spot | Notes |
|---------|-----------|------------|-------|
| Hero h1 | 4rem - 8rem | 5rem - 6rem (80-96px) | Serif display fonts can go larger |
| Section h2 | 2rem - 3.5rem | 2.5rem (40px) | |
| Subsection h3 | 1.25rem - 1.75rem | 1.5rem (24px) | |
| Body | 1rem - 1.25rem | 1.125rem (18px) | 18px is the new standard for dark mode |
| Small/caption | 0.75rem - 0.875rem | 0.875rem (14px) | |
| Code inline | 0.875rem - 0.9375rem | 0.9375rem (15px) | Slightly smaller than body |

### Recommended Type Scale Ratio
- **1.333 (Perfect Fourth):** Best for portfolios. Creates clear hierarchy without extreme jumps.
- **1.5 (Perfect Fifth):** More dramatic. Good if the portfolio is very editorial.
- Avoid 1.2 (Minor Third) -- too subtle for a portfolio with big hero moments.

### Line Heights

| Element | Line Height | Reasoning |
|---------|------------|-----------|
| Hero h1 | 0.9 - 1.0 | Tight. Display text should feel dense and impactful |
| h2 | 1.1 - 1.2 | Slightly more room |
| h3 | 1.2 - 1.3 | |
| Body text | 1.6 - 1.75 | Generous. Dark mode needs more breathing room |
| Small/caption | 1.4 - 1.5 | |

### Letter Spacing

| Element | Letter Spacing | Notes |
|---------|---------------|-------|
| Hero h1 (serif) | -0.02em to -0.04em | Tighten serif display text |
| Hero h1 (sans) | -0.02em to -0.03em | Tighten slightly |
| h2 | -0.01em to -0.02em | Subtle tightening |
| h3 | 0em (normal) | |
| Body | 0em to 0.01em | Very slight opening aids dark-mode readability |
| Small caps / labels | 0.05em to 0.1em | Wide tracking for ALL-CAPS labels |
| Overline / eyebrow text | 0.08em to 0.15em | Spaced-out uppercase micro-labels |

### Heading-to-Body Ratio
The "premium feel" comes from a ratio of roughly **3:1 to 5:1** between hero text and body text. With 18px body text:
- 3:1 = 54px hero (3.375rem) -- minimum for impact
- 4:1 = 72px hero (4.5rem) -- solid premium feel
- 5:1 = 90px hero (5.625rem) -- editorial, high-end
- 6:1 = 108px hero (6.75rem) -- maximum before it feels oversized

---

## 5. What NOT to Use -- Overused Portfolio Fonts

### Hard Avoid (Screams "Default Template")
1. **Poppins** -- The most overused Google Font in portfolio/startup design. Instantly makes a site look like a Framer or Webflow template.
2. **Roboto** -- The Toyota Camry of fonts. Dependable, invisible, and completely devoid of personality.
3. **Open Sans** -- Generic to the point of being non-existent.
4. **Lato** -- Was fresh in 2018. Now reads as dated.
5. **Montserrat** -- Overused in "modern" portfolios since 2019.
6. **Raleway** -- The thin-weight fad from 2015 left this font permanently associated with outdated design.

### Use With Caution (Not Bad, But Common)
7. **Inter** -- Excellent font, but it is now the default for Next.js, Vercel, Tailwind docs, and thousands of SaaS products. Using it as your primary sans-serif makes the portfolio look like every other developer site. Acceptable as body text if paired with a distinctive heading font.
8. **Playfair Display** -- Was the go-to serif for portfolios in 2020-2023. Starting to feel dated. Still works if used sparingly.
9. **Source Sans Pro / Source Serif Pro** -- Good fonts, but "I picked the first Adobe font I found" energy.

### The General Rule
If a font shows up in the default Squarespace/Framer/Webflow template gallery, avoid it as your primary font. These fonts are not bad -- they are just too common to signal design taste.

---

## 6. Final Recommendation for This Portfolio

### Primary Recommendation: Instrument Serif + Geist

**Rationale:**
1. Geist is already loaded. Zero additional configuration for the body font.
2. Instrument Serif is free on Google Fonts and can be loaded via `next/font/google`.
3. The pairing signals "design engineer" -- someone who appreciates both editorial craft (serif headings) and technical precision (Geist body/mono).
4. Instrument Serif has a condensed, italic style that is distinctive without being decorative.
5. Neither font is overused. Geist is growing but still signals Vercel/engineering taste rather than "template."
6. Both fonts render well on dark backgrounds at high DPI.

### Implementation Spec

```
// layout.js additions
import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

// Add to <body> className:
// `${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`
```

```
// tailwind.config.js fontFamily additions
fontFamily: {
  sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
  serif: ["var(--font-serif)", "Georgia", "serif"],
  mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
},
```

```
// Typography classes to define in globals.css or as Tailwind utilities

/* Hero heading */
.hero-heading {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  font-weight: 400;
}

/* Section heading */
.section-heading {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 400;
}

/* Subsection heading */
.subsection-heading {
  font-family: var(--font-geist-sans);
  font-size: 1.5rem;
  line-height: 1.25;
  letter-spacing: -0.01em;
  font-weight: 500;
}

/* Body */
body {
  font-family: var(--font-geist-sans);
  font-size: 1.125rem; /* 18px */
  line-height: 1.65;
  letter-spacing: 0.005em;
  font-weight: 400;
}

/* Eyebrow / overline labels */
.eyebrow {
  font-family: var(--font-geist-sans);
  font-size: 0.75rem;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
}

/* Code */
.code {
  font-family: var(--font-geist-mono);
  font-size: 0.9375rem;
  line-height: 1.5;
}
```

### Alternative Recommendation: Fraunces + Geist

If you want more personality and the ability to animate typography (the variable axes enable CSS transitions between weight/wonk/softness states), Fraunces is the pick. It requires more deliberate tuning but offers more creative range.

---

## Sources

- Typewolf Top 10 Sans-Serif 2026: typewolf.com/top-10-sans-serif-fonts
- Typewolf Top 10 Serif 2026: typewolf.com/top-10-serif-fonts
- Trending Fonts 2026: madegooddesigns.com/trending-fonts/
- Fontpair Instrument Serif pairings: fontpair.co/fonts/instrument-serif
- Fraunces + DM Sans: fontpair.co/pairings/fraunces-dm-sans
- Untitled UI Best Free Fonts 2026: untitledui.com/blog/best-free-fonts
- Design Shack Responsive Typography Guide: designshack.net/articles/typography/guide-to-responsive-typography-sizing-and-scales/
