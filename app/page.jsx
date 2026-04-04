import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import CompetenciesSection from "./components/CompetenciesSection";
import ContactSection from "./components/ContactSection";

const siteUrl = "https://brandonchurchportfolio.com";

export const metadata = {
  title: "Brandon Church | Design Engineer",
  description:
    "Design Engineer. One-person product team. I design, build, and ship from concept to production.",
  authors: [{ name: "Brandon Church" }],
  creator: "Brandon Church",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brandon Church | Design Engineer",
    description:
      "One-person product team. I design, build, and ship from concept to production.",
    url: `${siteUrl}`,
    siteName: "Brandon Church",
    images: [
      {
        url: "https://brandonchurchportfolio.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Brandon Church - Design Engineer",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandon Church | Design Engineer",
    description:
      "One-person product team. I design, build, and ship from concept to production.",
    images: ["https://brandonchurchportfolio.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Brandon Church",
    jobTitle: "Design Engineer",
    url: siteUrl,
    image: `${siteUrl}/images/headshot.png`,
    description:
      "One-person product team. I design, build, and ship from concept to production.",
    knowsAbout: [
      "Design Systems",
      "Frontend Engineering",
      "Accessibility",
      "React",
      "Next.js",
      "TypeScript",
    ],
    sameAs: [
      "https://linkedin.com/in/brandonchurch93",
      "https://github.com/BrandonChurch93",
      "https://codepen.io/BrandonLeoChurch",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boise",
      addressRegion: "ID",
      addressCountry: "US",
    },
  },
};

export default function V2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip link for accessibility */}
      <a
        href="#v2-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] v2-btn v2-btn-primary"
      >
        Skip to main content
      </a>

      <main id="v2-main" role="main" style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <CompetenciesSection />
        <ContactSection />
      </main>
    </>
  );
}
