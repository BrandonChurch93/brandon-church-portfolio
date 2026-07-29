import { projects } from "./data/projects";

const siteUrl = "https://brandonchurchportfolio.com";

export default function sitemap() {
  const projectUrls = projects
    .filter((p) => !p.comingSoon)
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
