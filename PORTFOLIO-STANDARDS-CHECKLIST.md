# Premium Portfolio Website Standards Checklist (2026)

A comprehensive product lifecycle and web standards reference for a best-in-class
design engineer portfolio. Covers mobile experience, performance, accessibility,
legal, SEO, progressive enhancement, analytics, and deployment.

---

## 1. Mobile Experience

### Viewport Height Units

| Unit | Behavior | Use Case |
|------|----------|----------|
| `svh` | Smallest viewport (toolbar visible) | Hero sections, full-screen layouts (DEFAULT CHOICE) |
| `lvh` | Largest viewport (toolbar hidden) | Rarely needed directly |
| `dvh` | Dynamically adjusts as toolbar shows/hides | Use sparingly; causes reflow on scroll |
| `vh` | Legacy; ignores mobile toolbar entirely | Fallback only |

**Recommendation:** Use `svh` for ~90% of viewport-height layouts. It guarantees
content fits even with the address bar showing. Use `dvh` only when you have a
tested reason (e.g., a continuously visible element that should truly fill the
dynamic viewport). Always provide a `vh` fallback for the ~5% of users on older
browsers.

```css
.hero {
  height: 100vh;          /* fallback */
  height: 100svh;         /* modern browsers */
}
```

Browser support: `svh`, `lvh`, `dvh` reached Baseline Widely Available in June 2025
(~95% global support as of early 2026).

### Touch Interactions (Replacing Hover)

- Use `@media (hover: hover) and (pointer: fine)` to scope hover effects to
  desktop only. Never rely on hover for essential information disclosure.
- Replace hover reveals with tap-to-toggle or `focus-within` on mobile.
- Minimum touch target: **44x44 CSS pixels** (Apple HIG + Material Design).
- Minimum spacing between interactive elements: **8px**.
- Provide visible tap feedback (`:active` state, scale transform, opacity change).
- Long press can serve as a hover equivalent but must not be the only path to content.
- WCAG 1.4.13 (Content on Hover or Focus): hover-revealed content must be
  dismissible, hoverable, and persistent.

### Mobile Animation Considerations

- Cap animation complexity on mobile. Use `will-change` sparingly (it allocates
  GPU memory; overuse crashes mobile Safari).
- Respect `prefers-reduced-motion` (see Accessibility section).
- Avoid parallax on mobile; it fights native scroll inertia and drains battery.
- Test on real devices in low-power mode (Lenis and smooth scroll libraries lag
  in Safari low-power mode).
- Keep animated layers small. Large compositor layers blow out GPU memory on
  mobile devices.

### iOS Safari Scroll Gotchas

- `scroll-behavior: smooth` in CSS can block JavaScript `scrollTo()` / `scrollTop`
  assignments in Safari 15.4+. If using JS scroll control, set
  `scroll-behavior: auto` on the target element.
- Lenis smooth scroll has known issues on iOS Safari, particularly: unexpected
  scroll-to-top on initial scroll, lagging in low-power mode, and conflicts with
  native momentum scrolling.
- After iOS 26.3, a Safari feature flag ("Prefer Page Rendering Updates near
  60fps") can re-enable itself, reducing ProMotion displays to 60fps scrolling.
  This is out of your control but worth noting.
- Elastic overscroll (rubber banding) on iOS cannot be disabled reliably.
  Design around it rather than fighting it.
- Fixed-position elements and the bottom bar: use `env(safe-area-inset-bottom)`
  for proper spacing on devices with home indicators.

### Mobile Navigation Patterns

| Pattern | When to Use |
|---------|-------------|
| Bottom tab bar (3-5 items) | High-frequency navigation, app-like feel |
| Hamburger menu | Content-focused sites where nav is secondary |
| Minimal header with scroll-aware hide/show | Portfolio sites (recommended) |
| Full-screen overlay menu | Creative/experimental portfolios |

**For a design engineer portfolio:** A minimal top header that hides on scroll-down
and reveals on scroll-up is the standard. Hamburger is acceptable if the menu
interaction itself showcases design skill (animated overlay, creative transitions).
Bottom nav is unusual for portfolios and may feel app-like in a way that clashes
with the editorial feel.

### Breakpoints

| Breakpoint | Target |
|------------|--------|
| 320-360px | Small phones (min viable width) |
| 375-430px | Modern smartphones (iPhone 14-16, Pixel, Galaxy) |
| 768px | Tablets portrait |
| 1024px | Tablets landscape / small laptops |
| 1280px | Standard laptops |
| 1440px | Desktop (design comp target) |
| 1920px | Full HD monitors |

**Primary design targets:** 375px (mobile), 1440px (desktop). Design fluid between
breakpoints rather than targeting specific devices. Use container queries where
layout depends on component width rather than viewport width.

---

## 2. Performance Standards

### Core Web Vitals Thresholds (2026)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5-4.0s | > 4.0s |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1-0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | 200-500ms | > 500ms |

Measured at the 75th percentile (p75) of real user data. For a portfolio site,
target: **LCP < 1.5s, CLS < 0.05, INP < 100ms**.

### Font Loading Strategy

**Recommended approach for this portfolio (Next.js 15 + Tailwind):**

1. Use `next/font` for automatic optimization. It self-hosts fonts, eliminating
   external network requests to Google Fonts.
2. Preload 1-2 critical font files max (e.g., heading weight + body weight).
3. Use `font-display: swap` for brand/heading fonts (visual identity matters).
4. Use `font-display: optional` for body text (prevents layout shift; if the font
   doesn't arrive in ~100ms, the fallback is used permanently for that page load).
5. Subset fonts to needed character ranges (Latin only unless supporting other
   scripts).
6. Use WOFF2 format exclusively (best compression, universal support).
7. Define `size-adjust`, `ascent-override`, `descent-override` on fallback fonts
   to minimize CLS during swap.

**Target:** Total font payload under 100KB (all weights combined).

### Image Optimization

| Format | Use Case | Savings vs JPEG |
|--------|----------|-----------------|
| AVIF | Primary format; best compression | 50-70% smaller |
| WebP | Fallback for older Safari/browsers | 25-35% smaller |
| JPEG | Ultimate fallback | baseline |
| SVG | Icons, logos, illustrations | N/A |

**Next.js `next/image` handles format negotiation automatically.** Configure:
- `formats: ['image/avif', 'image/webp']` in `next.config.js`
- Set `deviceSizes` and `imageSizes` for responsive srcset generation
- Use `priority` prop on above-the-fold images (hero, headshot)
- Use `placeholder="blur"` with `blurDataURL` for progressive loading
- Lazy load all below-fold images (default behavior)
- Set explicit `width` and `height` to prevent CLS
- Cache TTL: minimum 30 days (`minimumCacheTTL: 2592000`)

### Animation Performance Tiers

| Tier | Properties | Impact |
|------|-----------|--------|
| Compositor-only (BEST) | `transform`, `opacity` | Zero main-thread cost, 60fps guaranteed |
| Paint-only | `background-color`, `box-shadow`, `border-color` | Triggers repaint, no reflow |
| Layout-triggering (AVOID) | `width`, `height`, `margin`, `padding`, `top/left` | Triggers reflow + repaint + composite |

**Rules:**
- Animate ONLY `transform` and `opacity` for motion effects.
- Use `transform: translateX/Y/Z()` instead of `top/left` for positioning.
- Use `transform: scale()` instead of `width/height` for size changes.
- `filter` and `clip-path` are increasingly compositor-accelerated but test on
  target devices.
- Use `will-change: transform` only on elements that will actually animate, and
  remove it after animation completes if possible.
- Framer Motion handles most of this automatically via its motion values system.

### Bundle Size Targets

| Asset | Target | Notes |
|-------|--------|-------|
| Total JS (gzipped) | < 100KB | For a portfolio, aim for < 75KB |
| Total CSS (gzipped) | < 15KB | Tailwind with purging handles this |
| First-load JS | < 80KB | Next.js shared chunk + page |
| Analytics script | < 1KB | Use Plausible or similar |
| Total page weight | < 500KB | Excluding lazy-loaded images |

### Lighthouse Score Targets

| Category | Target |
|----------|--------|
| Performance | 95-100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

A design engineer portfolio should score 100 across the board. Anything less is
a missed opportunity to demonstrate competence.

---

## 3. Accessibility Requirements (WCAG 2.2 AA)

### Focus Management

- [ ] Visible focus indicators on ALL interactive elements (minimum 2px outline
      or equivalent visual change).
- [ ] WCAG 2.4.11 (Focus Not Obscured): focused elements must not be fully hidden
      behind sticky headers, modals, or other overlays. At minimum, a portion of
      the focused element must remain visible.
- [ ] WCAG 2.4.13 (Focus Appearance): focus indicator must have a contrast ratio
      of at least 3:1 against adjacent colors and cover a minimum area.
- [ ] For SPA navigation: manage focus programmatically. When navigating between
      sections, move focus to the new content or a heading within it.
- [ ] `tabindex` should never exceed 0. Use natural DOM order.
- [ ] All interactive elements must be reachable by keyboard (Tab/Shift+Tab).
- [ ] Escape key must close modals, menus, and overlays.

### Animation and Reduced Motion

- [ ] Implement `prefers-reduced-motion: reduce` media query:
  - Disable parallax effects entirely
  - Disable scroll-triggered entrance animations
  - Reduce or eliminate transition durations
  - Replace motion-based state changes with instant or opacity-only transitions
  - Disable smooth scrolling (`scroll-behavior: auto`)
- [ ] Provide an on-page toggle for motion preferences (goes beyond the OS
      setting; shows intentionality).
- [ ] No content should auto-play, flash, or blink for more than 3 seconds
      without user control (WCAG 2.2.2, 2.3.1).
- [ ] ~35% of users who can enable reduced motion do so. This is not an edge case.

### Screen Reader Considerations for Scroll Animations

- [ ] Content that is visually hidden until scroll-triggered must still be
      accessible in the DOM. Use `opacity: 0` + `transform`, never
      `display: none` or `visibility: hidden` on content that screen readers
      should access.
- [ ] Ensure scroll-triggered content does not reorder the logical reading
      sequence.
- [ ] Use `aria-live` regions sparingly; do not announce decorative animations.
- [ ] All section transitions should be navigable via headings (screen reader
      heading navigation is a primary browsing method).

### Color Contrast (Amber-on-Dark Palette)

| Element | Minimum Ratio | WCAG Level |
|---------|--------------|------------|
| Body text (< 18px / < 14px bold) | 4.5:1 | AA |
| Large text (>= 18px / >= 14px bold) | 3:1 | AA |
| UI components and graphical objects | 3:1 | AA |
| Focus indicators | 3:1 | AA |

**Amber/gold on dark background specifics:**
- Pure amber (#FFBF00) on black (#000000) = 12.6:1 (passes easily)
- Amber (#FFBF00) on dark gray (#1a1a1a) = ~11:1 (passes)
- Darker amber (#CC9900) on dark gray (#1a1a1a) = ~7:1 (passes AA, passes AAA)
- Light amber on medium-dark backgrounds: CHECK CAREFULLY. As backgrounds lighten
  toward gray (#333-#555), amber text can fail contrast.
- Always verify with WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

### Structural Accessibility

- [ ] Skip link: first focusable element, links to `#main-content`.
- [ ] Landmark regions: `<header>`, `<nav>`, `<main>`, `<footer>`, and `<section>`
      with `aria-label` for multiple sections of the same type.
- [ ] Heading hierarchy: exactly one `<h1>` per page, no skipped levels
      (h1 > h2 > h3, never h1 > h3).
- [ ] Language attribute: `<html lang="en">`.
- [ ] Page title: unique, descriptive `<title>` for each route.

### Form Accessibility (Contact Form)

- [ ] Every input has a visible `<label>` (not just placeholder text).
- [ ] Use `aria-describedby` for help text or format hints.
- [ ] Error messages: associated with inputs via `aria-describedby` or
      `aria-errormessage`. Use `aria-invalid="true"` on invalid fields.
- [ ] Error summary: on submission failure, provide a summary of errors and move
      focus to it.
- [ ] Required fields: use `aria-required="true"` and a visual indicator beyond
      just color (asterisk + legend).
- [ ] Submit button: clear, descriptive text ("Send Message" not just "Submit").
- [ ] Success confirmation: announce via `aria-live="polite"` region.

### Alt Text Strategy for Project Screenshots

- [ ] Functional screenshots (showing a UI): describe what the interface shows
      and its purpose. Example: "Dashboard view of the AI Cover Letter Generator
      showing a generated cover letter alongside the original job description."
- [ ] Decorative images: use `alt=""` (empty alt, not missing alt).
- [ ] Complex diagrams: provide `aria-describedby` pointing to a longer
      description.
- [ ] Do not begin alt text with "Image of" or "Screenshot of" (screen readers
      already announce the image role).
- [ ] Keep alt text under ~125 characters when possible.

---

## 4. Legal Requirements

### Privacy Policy

**Yes, a portfolio with a contact form needs a privacy policy.** You are collecting
personal data (name, email, message content).

Required disclosures:
- [ ] What data you collect (name, email, message text, analytics data)
- [ ] Why you collect it (to respond to inquiries, to understand site usage)
- [ ] How you store it and for how long
- [ ] Third parties who process the data (FormSubmit.co, analytics provider, hosting)
- [ ] User rights (access, deletion, correction)
- [ ] Contact information for privacy inquiries
- [ ] Date of last update

### Cookie Consent

| Region | Requirement |
|--------|-------------|
| EU (GDPR / ePrivacy) | Explicit opt-in consent before setting non-essential cookies. Banner required. |
| California (CCPA/CPRA) | "Do Not Sell/Share" link required if selling data. Opt-out model. |
| Rest of US | No federal requirement (yet), but best practice to disclose. |

**For a portfolio site:** If you use only privacy-respecting analytics (Plausible,
Fathom, Umami) that set no cookies, you likely do not need a cookie consent banner
at all. This is a significant advantage of choosing cookieless analytics.

If you use Google Analytics, reCAPTCHA, or any cookie-setting third-party script,
you need a consent banner with opt-in for EU visitors.

### GDPR Implications for Contact Forms

- [ ] Legal basis: legitimate interest (responding to inquiries) or consent.
- [ ] Data minimization: collect only what you need (name, email, message).
- [ ] Storage limitation: define and document a retention period.
- [ ] Right to erasure: be able to delete someone's data on request.
- [ ] If using FormSubmit.co: their privacy policy is dated 2019 and lacks a
      formal Data Processing Agreement (DPA). For stricter GDPR compliance,
      consider self-hosted form handling or a provider with a DPA
      (Formspree, Netlify Forms).

### FormSubmit.co Legal Considerations

- FormSubmit processes form data through their servers before forwarding to your
  email. This makes them a data processor under GDPR.
- Their privacy policy (last updated January 2019) is sparse by 2026 standards.
- No published DPA available.
- **Risk assessment:** Low risk for a personal portfolio, but disclose FormSubmit
  as a processor in your privacy policy. For maximum professionalism, consider
  alternatives with proper GDPR documentation.

### Required Legal Pages

| Page | Required? | Notes |
|------|-----------|-------|
| Privacy Policy | YES | Required if collecting any data |
| Cookie Policy | CONDITIONAL | Only if setting cookies |
| Terms of Use | OPTIONAL | Not typical for portfolios |
| Impressum | CONDITIONAL | Required in Germany/Austria |
| Copyright Notice | RECOMMENDED | In footer: (c) 2026 Brandon Church |

### Copyright Notice

A copyright notice in the footer is standard practice:
`Copyright 2026 Brandon Church. All rights reserved.`

You automatically hold copyright on your original work. Registration is optional
but provides additional legal protection in the US.

---

## 5. SEO and Meta Tags

### Essential Meta Tags

```html
<head>
  <!-- Core -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Brandon Church - Design Engineer</title>
  <meta name="description" content="Design engineer specializing in..." />
  <link rel="canonical" href="https://brandonchurch.dev/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Brandon Church - Design Engineer" />
  <meta property="og:description" content="Design engineer specializing in..." />
  <meta property="og:image" content="https://brandonchurch.dev/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://brandonchurch.dev/" />
  <meta property="og:site_name" content="Brandon Church" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Brandon Church - Design Engineer" />
  <meta name="twitter:description" content="Design engineer specializing in..." />
  <meta name="twitter:image" content="https://brandonchurch.dev/og-image.jpg" />
  <meta name="twitter:creator" content="@handle" />

  <!-- Additional -->
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Brandon Church" />
  <meta name="theme-color" content="#0a0a0a" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.json" />
</head>
```

**OG Image:** 1200x630px, JPG or PNG. Design a branded card with your name, title,
and a visual element. This is what appears when your site is shared on LinkedIn,
Twitter, Slack, iMessage, etc.

### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Brandon Church",
  "jobTitle": "Design Engineer",
  "url": "https://brandonchurch.dev",
  "sameAs": [
    "https://github.com/brandonchurch",
    "https://linkedin.com/in/brandonchurch",
    "https://twitter.com/handle"
  ],
  "knowsAbout": ["React", "TypeScript", "UI Design", "Design Systems"],
  "image": "https://brandonchurch.dev/headshot.jpg",
  "description": "Design engineer specializing in...",
  "alumniOf": {
    "@type": "Organization",
    "name": "..."
  }
}
```

Additionally, consider `WebSite` schema with `SearchAction` if you add search, and
`CreativeWork` or `SoftwareApplication` for individual project pages if you create
dedicated routes.

**AI Visibility:** In 2026, JSON-LD is not just for Google rich results. AI search
engines (ChatGPT Search, Perplexity, Google AI Overviews) pull structured data to
generate answers. Proper schema markup directly affects your visibility in AI-
generated responses.

### Sitemap and Robots

```
/public/robots.txt:
User-agent: *
Allow: /
Sitemap: https://brandonchurch.dev/sitemap.xml
```

For Next.js, use the built-in `app/sitemap.ts` or `app/sitemap.xml` convention
to generate sitemaps automatically.

### Page Speed as Ranking Factor

Google confirms page experience (including Core Web Vitals) is a ranking signal.
For a low-competition query like your name, it matters less for ranking but
significantly affects the impression you make when recruiters and hiring managers
click through.

---

## 6. Progressive Enhancement and Edge Cases

### JavaScript Disabled

- [ ] Critical content (your name, about text, project descriptions, contact info)
      must be visible without JavaScript.
- [ ] Next.js with SSR/SSG handles this well: HTML is rendered server-side.
- [ ] Test by disabling JS in DevTools. Navigation should work (standard anchor
      links). Animations won't play, but content must be readable.
- [ ] `<noscript>` tag: optional, but can note that animations require JS.

### Service Worker / Offline Support

**Verdict: Nice-to-have, not essential for a portfolio.**

Pros:
- Cached pages load instantly on repeat visits.
- Shows technical competence.
- Offline fallback page is a thoughtful touch.

Cons:
- Aggressive caching can serve stale content (you update your portfolio, visitors
  see the old version).
- Adds complexity.
- Minimal real-world benefit (portfolio visitors are online).

**If implemented:** Use `next-pwa` or Workbox with a network-first strategy for HTML
and cache-first for static assets. Include an offline fallback page.

### Print Stylesheet

**Yes, some recruiters still print or "Save as PDF."** A print stylesheet is a
low-effort, high-signal detail.

```css
@media print {
  /* Hide navigation, animations, decorative elements */
  nav, footer, .decorative { display: none; }

  /* Ensure readable text */
  body { color: #000; background: #fff; font-size: 12pt; }

  /* Show URLs after links */
  a[href]::after { content: " (" attr(href) ")"; font-size: 0.8em; }

  /* Avoid page breaks inside project cards */
  .project-card { break-inside: avoid; }
}
```

### Dark/Light Mode

- [ ] Detect system preference: `prefers-color-scheme: dark` / `light`.
- [ ] Your portfolio is dark-themed. Consider: (a) stay dark-only (bold choice,
      defensible for a design engineer), or (b) offer a toggle with the system
      preference as default.
- [ ] If dark-only: ensure contrast ratios meet WCAG AA against the dark background.
- [ ] Store preference in `localStorage` if offering a toggle. Apply before first
      paint to avoid flash of wrong theme (use a blocking `<script>` in `<head>`
      or Next.js cookies).

### High Contrast Mode (Windows)

- [ ] Test with Windows High Contrast Mode / `forced-colors: active` media query.
- [ ] Ensure borders and outlines remain visible (high contrast mode strips
      background colors and shadows).
- [ ] Use `currentColor` for SVG icons so they adapt to forced color schemes.

### Browser Support Targets (2026)

| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | Last 2 major (130+) | ~65% desktop market share |
| Safari | Last 2 major (18+) | Critical for iOS |
| Firefox | Last 2 major (133+) | ~3% share but important for accessibility |
| Edge | Last 2 major (130+) | Chromium-based, tracks Chrome |
| Samsung Internet | Last 2 | Notable Android share |

Use the Baseline "Widely Available" standard as your guide: features available in
all major engines for 2.5+ years are safe to use without fallbacks.

---

## 7. Analytics and Monitoring

### What to Track

| Event | Method | Why |
|-------|--------|-----|
| Page views | Auto | Basic traffic understanding |
| Scroll depth (25/50/75/100%) | Custom event | Know if visitors read your content |
| Project card clicks | Custom event | Which projects generate interest |
| Resume download clicks | Custom event | Direct hiring signal |
| Contact form submissions | Custom event | Conversion tracking |
| Outbound link clicks (GitHub, LinkedIn) | Custom event | Where visitors go next |
| Referral source | Auto | Where traffic comes from (LinkedIn, Google, direct) |
| Device type | Auto | Mobile vs desktop split |

### Privacy-Respecting Analytics Comparison

| Feature | Plausible | Fathom | Umami |
|---------|-----------|--------|-------|
| Price | $9/mo | $14/mo | Free (self-hosted) |
| Script size | < 1KB | < 2KB | < 2KB |
| Cookies | None | None | None |
| GDPR compliant | Yes (no consent needed) | Yes (SOC 2 + ISO 27001) | Yes |
| Cookie banner needed | No | No | No |
| Self-hostable | Yes (paid) | No | Yes (free) |
| Custom events | Yes | Yes | Yes |
| Impact on Lighthouse | Negligible | Negligible | Negligible |

**Recommendation:** Plausible or Umami. Both are cookieless, meaning you avoid
needing a cookie consent banner entirely. Plausible is the simplest paid option.
Umami is free if self-hosted (Vercel + free PostgreSQL tier works).

### Error Monitoring

- For a portfolio, Sentry's free tier (5K errors/month) is more than enough.
- Alternatively, rely on Vercel's built-in error logging if deployed there.
- At minimum, catch and log client-side errors with `window.onerror` and
  `window.onunhandledrejection`.

---

## 8. Deployment and Infrastructure

### Hosting (Next.js)

| Platform | Pros | Cons |
|----------|------|------|
| Vercel | Zero-config Next.js, edge network, analytics, preview deploys | Vendor lock-in, costs scale with traffic |
| Netlify | Good free tier, form handling built-in | Next.js support less native |
| Cloudflare Pages | Fast edge network, generous free tier | Next.js support via @opennextjs/cloudflare |
| Self-hosted (VPS) | Full control, cheapest at scale | Maintenance burden |

**Recommendation for a portfolio:** Vercel free tier. It handles SSR/SSG, image
optimization, edge caching, analytics, and preview deployments out of the box.
The free tier (100GB bandwidth/month) is more than enough for a portfolio.

### Caching Strategy

| Asset Type | Cache-Control | Notes |
|------------|---------------|-------|
| Static assets (JS/CSS/fonts) | `public, max-age=31536000, immutable` | Content-hashed filenames; safe to cache forever |
| Images (optimized by Next.js) | `public, max-age=2592000` | 30-day minimum |
| HTML pages | `s-maxage=86400, stale-while-revalidate=604800` | CDN caches 1 day, serves stale up to 7 days while revalidating |
| API routes (if any) | `no-cache` or short `s-maxage` | Depends on use case |

Vercel automatically applies sensible defaults for Next.js deployments. Static
files get `immutable` caching. ISR pages get `s-maxage` + `stale-while-revalidate`.

### Compression

- Vercel and Netlify automatically serve Brotli (`br`) and Gzip (`gz`) compressed
  responses.
- Brotli achieves ~15-20% better compression than Gzip for text assets.
- No manual configuration needed on these platforms.

### Custom Domain and SSL

- [ ] Custom domain configured (e.g., `brandonchurch.dev`).
- [ ] SSL certificate: automatic via Let's Encrypt on Vercel/Netlify (no action needed).
- [ ] Force HTTPS redirect (automatic on Vercel).
- [ ] HSTS header enabled: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- [ ] Consider HSTS preloading: https://hstspreload.org/

### Redirects

- [ ] If migrating from a previous portfolio URL, set up 301 redirects for any
      pages that were indexed by Google.
- [ ] Redirect `www.` to non-www (or vice versa) -- pick one and be consistent.
- [ ] Redirect HTTP to HTTPS (automatic on most platforms).

### Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Adjust CSP to match your actual third-party dependencies.

---

## Quick-Reference Implementation Priority

### Must-Have (Launch Blockers)

1. Semantic HTML with proper heading hierarchy and landmarks
2. WCAG 2.2 AA color contrast (verify every text/background combination)
3. Keyboard navigability and visible focus indicators
4. `prefers-reduced-motion` support
5. Responsive design that works at 375px and 1440px
6. `svh` viewport units with `vh` fallback
7. `next/image` with AVIF/WebP and explicit dimensions
8. `next/font` with proper `font-display` strategy
9. Essential meta tags (title, description, OG, Twitter Card)
10. Privacy policy page
11. HTTPS with proper SSL
12. Lighthouse scores > 95 in all categories
13. Alt text on all images
14. Skip link

### Should-Have (First Week Post-Launch)

1. JSON-LD structured data (Person schema)
2. Sitemap and robots.txt
3. Analytics (cookieless: Plausible or Umami)
4. Custom event tracking (resume downloads, project clicks)
5. Print stylesheet
6. Touch target sizing verification (44x44 minimum)
7. Error monitoring (Sentry free tier)
8. OG image designed and tested
9. Security headers
10. Copyright notice in footer

### Nice-to-Have (Polish Phase)

1. Service worker with offline fallback page
2. On-page motion toggle
3. Light mode option
4. `forced-colors` / High Contrast Mode testing
5. Manifest for PWA installability
6. Performance budget CI check (bundle size gates)
7. Cookie policy (only if adding cookie-setting scripts)
8. Automated accessibility testing in CI (axe-core)

---

## Testing Checklist Before Launch

- [ ] Test on real iPhone (Safari) -- not just Chrome DevTools emulation
- [ ] Test on real Android device (Chrome)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with keyboard-only navigation
- [ ] Test with JavaScript disabled
- [ ] Test with `prefers-reduced-motion: reduce` enabled
- [ ] Test with `prefers-color-scheme: light` (even if dark-only, verify no breaks)
- [ ] Test print preview (Cmd+P)
- [ ] Run Lighthouse in incognito (no extensions)
- [ ] Run WebAIM WAVE accessibility checker
- [ ] Validate HTML with W3C validator
- [ ] Test OG tags with LinkedIn Post Inspector and Twitter Card Validator
- [ ] Test structured data with Google Rich Results Test
- [ ] Verify all links work (no 404s)
- [ ] Test contact form submission end-to-end
- [ ] Check mobile toolbar/viewport height behavior on iOS Safari
- [ ] Test on slow 3G throttling in DevTools
