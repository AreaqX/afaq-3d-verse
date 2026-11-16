# Afaq Mehmood — 3D Flight Portfolio

> **Mobile App Developer · Software Engineer · SQA Engineer**  
> *"I build mobile apps that ship, and test them until they don't break."*  
> Location: Sialkot, Pakistan · Status: Open to relocation (UAE / GCC) & Lahore

A production-ready, fully immersive 3D personal portfolio experience. The entire site is a continuous full-screen WebGL world where visitors travel along an eased spline trajectory between 5 stations in deep space.

---

## ⚡ Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS (Electric Lime `#C6FF3D`, Deep Near-Black `#07080A`, Space Grotesk + JetBrains Mono)
- **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Post-Processing**: `@react-three/postprocessing` (Subtle Bloom, Vignette, Chromatic Aberration during flight)
- **State & Transitions**: Zustand (`useNav`), Framer Motion
- **Architecture**: 100% pure static client build (`vite build`) — zero backend, zero database, zero API keys.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:8080` (or the port Vite outputs) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory with zero TypeScript errors.

To preview the built production bundle locally:
```bash
npm run preview
```

---

## 🧭 The 5 Stations & Navigation

1. **Station 01 — HUB**: Floating 3D extruded title "AFAQ MEHMOOD", dynamically morphing role titles (*Mobile App Developer* / *Software Engineer* / *SQA Engineer*), location badge, and "Enter The Flight" launch button.
2. **Station 02 — WORK (Device Constellation)**: Floating 3D procedural smartphones arranged in a slowly rotating constellation ring. Includes category filtering (*Mobile Apps*, *Internal Tools*, *Automation*, *Research*). Clicking any phone brings it into focus and slides in the detailed specification panel.
3. **Station 03 — SKILLS (Skill Orbit)**: Concentric interactive 3D orbital rings (*Mobile Development*, *Software Engineering*, *SQA & Testing*). Drag rings to spin them, or hover any glowing skill node to reveal production context.
4. **Station 04 — JOURNEY (Trajectory Path)**: 3D illuminated flight timeline showcasing career milestones (*Patronecs Software Company*) and education (*University of Sialkot BS Software Engineering*).
5. **Station 05 — CONTACT (Transmission Beacon)**: Pulsing 3D crystal beacon with direct `mailto:`, one-click email copy (with instant toast), LinkedIn profile, and resume download.

### Navigation Controls
- **HUD Waypoint Dots**: Click any of the 5 labeled dots at the bottom to fly directly to that station.
- **Keyboard Navigation**:
  - `→` / `D` or `↓`: Next Station
  - `←` / `A` or `↑`: Previous Station
  - `Enter`: Advance / Enter flight
  - `Esc`: Return to Hub or close active project panel
  - `1` - `5`: Direct jump to stations 1 through 5
  - `Ctrl + K`, `Cmd + K`, or `/`: Open Command Search Palette
- **Mouse / Touch Parallax**: Subtle pointer look-around and drag rotation across all stations.
- **🐞 SQA Easter Egg**: Tiny robotic bugs drift through space. Click one to squash it with a particle explosion and increment the in-memory "Bugs Squashed" counter.

---

## 📝 How to Edit Content (`src/data/portfolio.ts`)

All portfolio content is hardcoded and strictly typed in a single file: [src/data/portfolio.ts](file:///d:/work/portfolio/afaq-3d-verse/src/data/portfolio.ts).

### 1. Updating Profile & Email
Open `src/data/portfolio.ts` and modify the `profile` object:
```typescript
export const portfolioData: PortfolioData = {
  profile: {
    name: "Afaq Mehmood",
    title: "Mobile App Developer · Software Engineer · SQA Engineer",
    email: "your-actual-email@example.com", // Replace YOUR_EMAIL_HERE
    linkedin: "https://www.linkedin.com/in/afaqmehmood-500327259",
    // ...
  }
};
```

### 2. Updating Projects
Each project has a typed schema:
```typescript
{
  id: "outdoor-share",
  title: "Outdoor Share",
  subtitle: "Vehicle Rental Marketplace",
  description: "Vehicle rental marketplace with identity verification...",
  category: "Mobile Apps", // 'Mobile Apps' | 'Internal Tools' | 'Automation' | 'Research'
  tech: ["FlutterFlow", "Stripe", "DocuSeal", "Firebase"],
  platforms: ["App Store", "Play Store"],
  whatIDid: [
    "Architected end-to-end rental flow...",
    // ...
  ],
  color: "#10b981",
  screenshot: "/screens/outdoor-share.png",
  featured: true
}
```

### 3. Adding Real Screenshots
1. Place your PNG/JPEG image files in `/public/screens/` (e.g. `/public/screens/outdoor-share.png`).
2. Set the `screenshot` property on the corresponding project in `src/data/portfolio.ts`:
   ```typescript
   screenshot: "/screens/outdoor-share.png",
   ```
3. If no screenshot is provided or the file is missing, the procedural canvas mock UI renders automatically on the 3D phone screen with the project's accent color, typography, and wireframe blocks.

---

## 📑 Recruiter Safety Net (Classic View)

For recruiters, ATS, or users on lower-spec hardware:
- Click the persistent **"Classic View"** button in the top right header (or select it in the `Ctrl+K` command palette).
- The site renders a clean, accessible, single-page 2D layout containing all profile data, projects, experience, skills, and contact links.
- Your preference is persisted automatically in `localStorage`.
- Click **"Launch 3D Experience"** at any time to return to WebGL flight mode.
- If WebGL is not supported by the browser, the application automatically falls back to Classic View.

---

## 🚢 Deployment

The project builds to a pure static bundle in `dist/`.

### Vercel
```bash
npm run build
# Deploy dist/ folder directly, or connect your Git repository with:
# Framework Preset: Vite
# Build Command: npm run build
# Output Directory: dist
```

### Netlify
```bash
# Build Command: npm run build
# Publish Directory: dist
```

### GitHub Pages
Configure GitHub Actions with `npm run build` and publish the `dist` directory.
