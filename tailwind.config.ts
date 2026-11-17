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
        phone: "0 1px 2px rgba(15,23,42,.06), 0 12px 32px rgba(15,23,42,.12), 0 32px 64px rgba(15,23,42,.08)",
        card: "0 1px 2px rgba(15,23,42,.04), 0 4px 12px rgba(15,23,42,.03)",
        elevated: "0 8px 24px rgba(15,23,42,.08)",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
