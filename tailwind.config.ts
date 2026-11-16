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
        background: "#07080A",
        surface: "#0F1115",
        "surface-elevated": "#15181F",
        border: "#20232A",
        "border-light": "#2E333D",
        foreground: "#EDEDED",
        muted: "#8E8E93",
        "muted-dark": "#4A4D55",
        lime: {
          DEFAULT: "#C6FF3D",
          hover: "#B4F524",
          dim: "#88B81E",
          glow: "rgba(198, 255, 61, 0.25)"
        }
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        "lime-glow": "0 0 25px rgba(198, 255, 61, 0.35)",
        "lime-subtle": "0 0 15px rgba(198, 255, 61, 0.15)"
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scanline 8s linear infinite"
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
