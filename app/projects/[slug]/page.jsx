import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProject, getAdjacentProjects } from "../../data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

// Static generation for all project slugs
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Brandon Church`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
      <main style={{ position: "relative", zIndex: 1 }}>
        {/* Back link */}
        <div className="v2-container" style={{ paddingTop: "96px" }}>
          <Link href="/#selected-work" className="v2-text-link">
            <span className="v2-link-arrow-left">←</span> Back to Projects
          </Link>
        </div>

        {/* Hero */}
        <section className="v2-section" style={{ paddingBottom: "0" }}>
          <div className="v2-container">
            <p className="v2-eyebrow" style={{ marginBottom: "16px" }}>
              Case Study
            </p>
            <h1
              className="v2-heading v2-h1"
              style={{ marginBottom: "12px", fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              {project.title}
            </h1>
            {project.subline && (
              <p
                className="v2-body"
                style={{
                  marginBottom: "16px",
                  maxWidth: "600px",
                  color: "var(--v2-text-secondary)",
                }}
              >
                {project.subline}
              </p>
            )}
            <p className="v2-body" style={{ marginBottom: "32px", maxWidth: "600px" }}>
              {project.tagline}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-btn v2-btn-primary"
                >
                  View Live <span className="v2-arrow v2-arrow-external" style={{ fontSize: "12px" }}>↗</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-btn v2-btn-secondary"
                >
                  {project.githubLabel || "GitHub"} <span className="v2-arrow v2-arrow-external" style={{ fontSize: "12px" }}>↗</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section style={{ paddingBottom: "48px" }}>
            <div className="v2-container">
              <ProjectDetailClient metrics={project.metrics} />
            </div>
          </section>
        )}

        {/* Hero Image */}
        <section style={{ paddingBottom: "64px" }}>
          <div className="v2-container">
            <div
              style={{
                borderRadius: "var(--v2-radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--v2-border)",
                aspectRatio: "16 / 9",
                position: "relative",
                background: "var(--v2-bg-alt)",
              }}
            >
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </section>

        {/* Description */}
        {project.description && (
          <section className="v2-section" style={{ paddingTop: "0" }}>
            <div className="v2-container" style={{ maxWidth: "800px" }}>
              <h2 className="v2-heading v2-h2" style={{ marginBottom: "24px" }}>
                Overview
              </h2>
              <p className="v2-body">{project.description}</p>
            </div>
          </section>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section className="v2-section" style={{ paddingTop: "0" }}>
            <div className="v2-container" style={{ maxWidth: "800px" }}>
              <h2 className="v2-heading v2-h2" style={{ marginBottom: "24px" }}>
                Key Features
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {project.features.map((feature, i) => (
                  <li key={i} className="v2-feature-row">
                    <span className="v2-feature-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="v2-section" style={{ paddingTop: "0" }}>
          <div className="v2-container" style={{ maxWidth: "800px" }}>
            <h2 className="v2-heading v2-h2" style={{ marginBottom: "24px" }}>
              Built With
            </h2>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.techStack.map((tech) => (
                <span key={tech} className="v2-pill v2-pill-accent">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="v2-section">
          <div
            className="v2-container v2-project-nav"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid var(--v2-border)",
              paddingTop: "48px",
            }}
          >
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="v2-text-link">
                <span className="v2-link-arrow-left">←</span>
                <div>
                  <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Previous</span>
                  <span style={{ color: "var(--v2-text-secondary)" }}>{prev.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="v2-text-link" style={{ textAlign: "right" }}>
                <div>
                  <span style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Next</span>
                  <span style={{ color: "var(--v2-text-secondary)" }}>{next.title}</span>
                </div>
                <span className="v2-link-arrow-right">→</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      </main>
  );
}
