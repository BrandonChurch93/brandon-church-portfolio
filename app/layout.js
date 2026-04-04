import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./v2.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";
import ScrollProgress from "./components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL("https://brandonchurchportfolio.com"),
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C0A09",
};

function GrainOverlay() {
  return <div className="v2-grain" aria-hidden="true" />;
}

function GlowBackground() {
  return (
    <div className="v2-glow-bg" aria-hidden="true">
      <div className="v2-glow-spot v2-glow-spot-1" />
      <div className="v2-glow-spot v2-glow-spot-2" />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <div className="v2">
          <GrainOverlay />
          <GlowBackground />
          <ScrollProgress />
          <Nav />
          {children}
          <Footer />
          <AIAssistant />
        </div>
      </body>
    </html>
  );
}
