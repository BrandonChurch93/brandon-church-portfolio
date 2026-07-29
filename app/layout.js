import "./globals.css";
import "./v2.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";

// The site renders in the system sans stack. Cormorant Garamond, Geist and Geist Mono
// were previously loaded here but never applied: their next/font variables landed on
// <body> while v2.css composed --v2-font-* at :root, so those tokens were invalid at
// computed-value time and inherited empty everywhere. The webfonts were downloaded and
// discarded. They are gone; --v2-font-* now declares the stack that actually renders.

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
      <body className="antialiased">
        <div className="v2">
          <GrainOverlay />
          <GlowBackground />
          <ScrollProgress />
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
