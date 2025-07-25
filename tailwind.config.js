/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - Pink/Magenta
        primary: {
          DEFAULT: "#ff3f81",
          light: "#ff6b9d",
          dark: "#e91e63",
          darker: "#c2185b",
        },
        // Secondary palette - Purple
        secondary: {
          DEFAULT: "#a78bfa",
          light: "#c4b5fd",
          dark: "#8b5cf6",
          darker: "#7c3aed",
        },
        // Background colors
        background: {
          DEFAULT: "#23153c",
          dark: "#1a0f2e",
          light: "#2d1b4e",
        },
        // Surface colors
        surface: {
          DEFAULT: "#2d1b4e",
          light: "#3a2461",
          dark: "#23153c",
        },
        // Text colors
        text: {
          DEFAULT: "#ffffff",
          muted: "#e0e0e0",
          dim: "#b0b0b0",
        },
        // Glass effect
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          strong: "rgba(255, 255, 255, 0.1)",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 0.6s ease-out",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left": "slideLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right": "slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-shift": "gradientShift 15s ease infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        120: "30rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 30px rgba(255, 63, 129, 0.5)",
        "glow-lg": "0 0 60px rgba(255, 63, 129, 0.5)",
        "glow-secondary": "0 0 30px rgba(167, 139, 250, 0.5)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-strong": "0 8px 32px 0 rgba(31, 38, 135, 0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, rgba(255, 63, 129, 0.5) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(167, 139, 250, 0.5) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(255, 63, 129, 0.5) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
