/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme — "blueprint paper" palette
        paper: "#F4F1E9",
        paperMuted: "#E9E4D6",
        ink: "#1E2A32",
        inkMuted: "#5B6B73",
        steel: "#2C5F7C",
        steelDark: "#1B4B66",
        rust: "#C4703A",
        rustDark: "#A85A2A",
        gridLight: "#C9D2D6",
        // Dark theme — "night blueprint" palette
        blueprint: "#0B1622",
        blueprintMuted: "#0F1F30",
        cyanLine: "#2DD4BF",
        electric: "#38BDF8",
        amberSafety: "#F5A524",
        textLight: "#E7EDF0",
        textLightMuted: "#9FB0B8",
        gridDark: "#173049",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "blueprint-grid-light":
          "linear-gradient(rgba(44,95,124,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(44,95,124,0.06) 1px, transparent 1px)",
        "blueprint-grid-dark":
          "linear-gradient(rgba(45,212,191,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
        "grid-sm": "16px 16px",
      },
      boxShadow: {
        blueprint: "0 0 0 1px rgba(44,95,124,0.15), 0 8px 30px -8px rgba(27,75,102,0.25)",
        "blueprint-dark": "0 0 0 1px rgba(45,212,191,0.12), 0 8px 30px -8px rgba(0,0,0,0.55)",
      },
      keyframes: {
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        draw: "drawLine 2.2s ease-out forwards",
        fadeUp: "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
