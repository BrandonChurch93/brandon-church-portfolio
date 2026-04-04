"use client";

import dynamic from "next/dynamic";

const RubiksCube = dynamic(() => import("../components/RubiksCube"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--v2-text-dim)",
      fontSize: "14px",
    }}>
      Loading cube...
    </div>
  ),
});

export default function CubePage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "32px",
      padding: "24px",
      position: "relative",
      zIndex: 1,
    }}>
      <h1 className="v2-heading v2-h2">Rubik&apos;s Cube Component</h1>
      <p className="v2-caption">Auto-animating, amber palette, no interaction required</p>

      {/* Cube preview at hero-like size */}
      <div style={{
        width: "min(500px, 80vw)",
        height: "min(500px, 80vw)",
        position: "relative",
        overflow: "hidden",
      }}>
        <RubiksCube
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        />
      </div>
    </div>
  );
}
