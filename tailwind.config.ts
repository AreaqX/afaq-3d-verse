import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stage: "var(--bg-stage)",
        screen: "var(--bg-screen)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        border: "var(--border)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          soft: "var(--accent-soft)",
        },
        success: "var(--success)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        phone: "0 35px 90px -10px rgba(0,0,0,0.95), 0 0 70px rgba(0,229,255,0.18), inset 0 1px 2px rgba(255,255,255,0.25)",
        card: "0 20px 45px -10px rgba(0,0,0,0.75), 0 0 25px -5px rgba(0,229,255,0.08), inset 0 1px 1px 0 rgba(255,255,255,0.15)",
        elevated: "0 25px 60px -12px rgba(0,0,0,0.85), inset 0 1px 2px rgba(255,255,255,0.2)",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
