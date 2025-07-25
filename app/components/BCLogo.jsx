const BCLogo = ({ className = "", size = "default", animate = false }) => {
  const sizes = {
    small: { width: 36, height: 36, fontSize: "16px" },
    default: { width: 44, height: 44, fontSize: "18px" },
    large: { width: 56, height: 56, fontSize: "22px" },
  };

  const { width, height, fontSize } = sizes[size] || sizes.default;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BC Logo"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="bc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3f81" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle
        cx="28"
        cy="28"
        r="26"
        stroke="url(#bc-gradient)"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />

      {/* Inner circle with glass effect */}
      <circle
        cx="28"
        cy="28"
        r="24"
        fill="rgba(255, 255, 255, 0.05)"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="0.5"
      />

      {/* BC Text with animation */}
      <g className={animate ? "animate-bc-neon" : ""}>
        <text
          x="28"
          y="28"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize={fontSize}
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5"
          filter="url(#neonGlow)"
          style={{
            textShadow:
              "0 0 10px rgba(255, 63, 129, 0.8), 0 0 20px rgba(255, 63, 129, 0.6), 0 0 30px rgba(255, 63, 129, 0.4)",
          }}
        >
          BC
        </text>
      </g>

      {/* Accent dot */}
      <circle cx="42" cy="14" r="2.5" fill="#ff3f81" opacity="0.8" />
    </svg>
  );
};

export default BCLogo;
