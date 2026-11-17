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
        phone: "0 25px 70px -15px rgba(0,0,0,0.85), 0 0 50px rgba(0,229,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.15)",
        card: "0 2px 8px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)",
        elevated: "0 12px 36px rgba(0,0,0,0.45)",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
