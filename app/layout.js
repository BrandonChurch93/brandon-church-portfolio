import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import Providers from "./providers";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Metadata export (without viewport and themeColor)
export const metadata = {
  title: "Brandon Church | Front-End Developer & XR/AI UI/UX Designer",
  description:
    "Senior Front-End Developer and UI/UX Designer specializing in AI integration and Extended Reality (XR) experiences. Building the future of human-computer interaction.",
  keywords:
    "Brandon Church, Front-End Developer, UI/UX Designer, XR Design, AI Integration, Extended Reality, AR/VR Design, Portfolio",
  authors: [{ name: "Brandon Church" }],
  creator: "Brandon Church",
  publisher: "Brandon Church",
  openGraph: {
    title: "Brandon Church | Front-End Developer & XR/AI UI/UX Designer",
    description:
      "Senior Front-End Developer and UI/UX Designer specializing in AI integration and Extended Reality (XR) experiences.",
    url: "https://brandonchurchportfolio.com",
    siteName: "Brandon Church Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brandon Church - XR/AI UI/UX Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandon Church | Front-End Developer & XR/AI UI/UX Designer",
    description:
      "Senior Front-End Developer and UI/UX Designer specializing in AI integration and Extended Reality (XR) experiences.",
    images: ["/images/og-image.png"],
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

// Separate viewport export (NEW)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6366f1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Additional meta tags for PWA and mobile */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Brandon Church",
              jobTitle: "Front-End Developer & UI/UX Designer",
              description:
                "Senior Front-End Developer specializing in AI integration and XR experiences",
              url: "https://brandonchurchportfolio.com",
              sameAs: [
                // Add your social media URLs here
                "https://linkedin.com/in/brandonchurch",
                "https://github.com/brandonchurch",
              ],
              skills: [
                "Front-End Development",
                "UI/UX Design",
                "Extended Reality (XR)",
                "AI Integration",
                "React",
                "Next.js",
                "Three.js",
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>

        {/* Global cursor effects container */}
        <div id="cursor-portal" />

        {/* Toast/notification container */}
        <div id="notification-portal" />
      </body>
    </html>
  );
}
