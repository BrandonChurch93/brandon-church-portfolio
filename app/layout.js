import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Brandon Church - Senior UI/UX Developer & AI Specialist",
  description:
    "Full-stack developer specializing in AI integration, building intelligent, scalable solutions that create impact. Creator of SwiftSnapAI. 10+ years of experience in enterprise applications.",
  keywords:
    "Brandon Church, UI/UX Developer, AI Engineer, AI Integration, React, TypeScript, Next.js, Chrome Extensions, Full-Stack Developer, WCAG Compliance, SwiftSnapAI",
  authors: [{ name: "Brandon Church" }],
  creator: "Brandon Church",

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Open Graph
  openGraph: {
    title: "Brandon Church - Senior UI/UX Developer & AI Specialist",
    description:
      "Full-stack developer specializing in AI integration, building intelligent, scalable solutions that create impact. Creator of SwiftSnapAI.",
    url: "https://brandonchurchportfolio.com",
    siteName: "Brandon Church Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brandon Church - AI Engineer & Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Brandon Church - Senior UI/UX Developer & AI Specialist",
    description:
      "Full-stack developer specializing in AI integration. Creator of SwiftSnapAI. Building intelligent, scalable solutions.",
    images: ["/og-image.png"],
  },

  // Additional metadata
  metadataBase: new URL("https://brandonchurchportfolio.com"),
  alternates: {
    canonical: "/",
  },

  // Robots
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

// These need to be exported separately in App Router
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0118",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-text`}
      >
        {children}
      </body>
    </html>
  );
}
