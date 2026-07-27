import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0C0B0A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, rgba(212, 165, 116, 0.05) 40%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-300px",
            left: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212, 165, 116, 0.08) 0%, transparent 60%)",
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontSize: "20px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#D4A574",
            marginBottom: "24px",
            display: "flex",
          }}
        >
          Product Builder
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 600,
            color: "#F5F0EB",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "24px",
            display: "flex",
          }}
        >
          Brandon Church
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 400,
            color: "#D4A574",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "32px",
            display: "flex",
          }}
        >
          Design Engineer
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#A09A93",
            lineHeight: 1.5,
            maxWidth: "700px",
            display: "flex",
          }}
        >
          I design, build, and ship full-stack AI products end to end, on
          twelve years of UX, accessibility, and frontend leadership.
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, #D4A574, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
