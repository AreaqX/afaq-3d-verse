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
        background: "#06080F",
        surface: "#0C101A",
        "surface-elevated": "#131926",
        border: "#1A2333",
        "border-light": "#253147",
        foreground: "#F1F5F9",
        muted: "#94A3B8",
        "muted-dark": "#475569",
        accent: {
          DEFAULT: "#00E5FF",
          hover: "#00B8D4",
          dim: "#0284C7",
          glow: "rgba(0, 229, 255, 0.25)"
        },
        cyan: {
          DEFAULT: "#00E5FF",
          hover: "#00C4DB",
          dim: "#0369A1",
          glow: "rgba(0, 229, 255, 0.25)"
        }
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        "cyan-glow": "0 0 25px rgba(0, 229, 255, 0.35)",
        "cyan-subtle": "0 0 15px rgba(0, 229, 255, 0.15)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
