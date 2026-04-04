import { Github, Linkedin, Youtube, CodepenIcon } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: "https://github.com/BrandonChurch93", Icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/brandonchurch93", Icon: Linkedin },
    { label: "CodePen", href: "https://codepen.io/BrandonLeoChurch", Icon: CodepenIcon },
    { label: "YouTube", href: "https://youtube.com/@BrandonChurch", Icon: Youtube },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--v2-border)",
        padding: "48px clamp(1rem, 4vw, 2rem)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: "var(--v2-container)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Social icons */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="v2-social-icon"
            >
              <social.Icon size={20} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Credit */}
        <p style={{ fontSize: "13px", color: "var(--v2-text-dim)", textAlign: "center" }}>
          Designed and built by Brandon Church &middot; &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
}
