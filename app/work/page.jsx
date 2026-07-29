import WorkArchive from "../components/WorkArchive";

const siteUrl = "https://brandonchurchportfolio.com";

const description =
  "The full catalog. Everything here is real and running, and the list grows as I build.";

export const metadata = {
  title: "All Work | Brandon Church",
  description,
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "All Work | Brandon Church",
    description,
    url: `${siteUrl}/work`,
    siteName: "Brandon Church",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Brandon Church - AI Product Engineer",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Work | Brandon Church",
    description,
    images: [`${siteUrl}/opengraph-image`],
  },
};

export default function WorkPage() {
  return (
    <main id="v2-main" role="main" style={{ position: "relative", zIndex: 1 }}>
      <WorkArchive />
    </main>
  );
}
