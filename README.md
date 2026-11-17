# Afaq Mehmood — Interactive Smartphone Portfolio (AfaqOS)

> **Mobile App Developer · Software Engineer · SQA Engineer**  
> *"I build mobile apps that ship, and test them until they don't break."*  
> Location: Sialkot, Pakistan · Status: Open to relocation (UAE / GCC within 1 month) & Lahore

A production-ready personal portfolio where the entire experience lives **INSIDE a realistic, interactive smartphone** floating on a clean desktop stage with smooth cursor parallax tilt, responsive physical hardware buttons, and native mobile auto-adaptation.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS (Clean professional palette: Deep Teal `#0E7C7B`, Off-white `#EEF0F3`, Ink `#0F172A`, Plus Jakarta Sans & JetBrains Mono)
- **3D & Animation**: Framer Motion (CSS 3D perspective transforms, spring physics, cursor tilt)
- **State Management**: Zustand with persistent storage (`useOS`)
- **Static Assets**: 100% static client build (`vite build`) — zero backend, zero database, zero API keys, no env variables.
- **Recruiter Safety Net**: One-click "Classic 2D View" toggle that instantly switches to an accessible, high-density traditional resume layout.

---

## 📱 The Smartphone OS (AfaqOS)

### 1. Lock Screen
- Real-time digital clock, date, and "Afaq Mehmood" role badge.
- Stacked native notifications: *"Open to work · UAE / GCC (1 mo)"*, *"3+ years shipping production apps"*, *"New message: Let's build something reliable"*.
- Interactive "Swipe up to unlock" / click to open the Home Screen.
- Quick torch and camera action triggers.

### 2. Home Screen
- Status bar with dynamic island (*"OPEN TO WORK"*), carrier *"Sialkot"*, battery, Wi-Fi, and signal indicators.
- Live widgets: Availability & Relocation status widget, 3+ Years Experience / rotating role widget.
- 8-app grid with tap opening animations:
  1. **Projects**: App Store style portfolio with featured hero carousel, category filters (*Mobile Apps*, *Internal Tools*, *Automation*, *Research*), and detail pages with "GET" pills, screenshots, and engineering highlights.
  2. **About**: Profile card with Afaq's portrait photo, bio, relocation status, spoken languages, and contact links.
  3. **Skills**: Three core groups (*Mobile Development*, *Software Engineering*, *SQA & Testing*) with tap-to-expand context chips, plus toggle for the complete 45-tool arsenal matrix.
  4. **Journey**: Route timeline displaying experience at *Patronecs Software Company* and *BS Software Engineering* degree at University of Sialkot.
  5. **Resume**: Document preview with one-click direct download of the official 152 KB PDF resume (`/Afaq_Mehmood_Resume.pdf`).
  6. **Messages**: Interactive conversation UI with pre-composed responses and quick action buttons (Email, Copy Email, LinkedIn, WhatsApp).
  7. **Bug Hunt**: 30-second SQA defect squashing easter egg game with real-time score tracking.
  8. **Settings**: Accent color switcher (Teal, Cobalt, Amber), Reduce Motion toggle, Classic 2D view toggle, and system info.
- Dock with 4 quick-access apps: Projects, Messages, Resume, and LinkedIn.
- Bottom home indicator bar: tap or swipe to return to the Home Screen from any app.

### 3. Native Overlays & Shortcuts
- **Control Center**: Tap the battery/Wi-Fi icons or pull down to reveal quick toggles, brightness/volume sliders, and "Say Hi" shortcut.
- **App Switcher**: Multitasking deck showing active apps as cards with tap-to-switch or swipe away.
- **Spotlight Search (`Ctrl+K`)**: Instant search across all apps, projects, and direct actions.
- **Desktop Keyboard Shortcuts**:
  - `Ctrl + K`: Open Spotlight search
  - `H`: Go to Home Screen
  - `Esc`: Go back / Close active app

### 4. Responsive Adaptation
- **Desktop (≥ 1024px)**: Phone floats in 3D perspective with realistic shadows, glare reflection, and side panels for quick recruiter access.
- **Real Mobile (< 640px)**: The outer hardware frame automatically disappears so the OS fills 100% of the mobile browser viewport like a native app.

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

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📝 How to Edit Content (`src/data/portfolio.ts`)

All content is strictly typed and centralized in [src/data/portfolio.ts](file:///d:/work/portfolio/afaq-3d-verse/src/data/portfolio.ts).

### 1. Update Contact Information
```typescript
export const portfolioData: PortfolioData = {
  profile: {
    name: "Afaq Mehmood",
    title: "Mobile App Developer · Software Engineer · SQA Engineer",
    email: "your-email@example.com", // Replace with your email
    linkedin: "https://www.linkedin.com/in/afaqmehmood-500327259",
    location: "Sialkot, Pakistan",
    cv: "/Afaq_Mehmood_Resume.pdf",
    // ...
  }
};
```

### 2. Update Projects
Add or edit project entries in `portfolioData.projects`:
```typescript
{
  id: "outdoor-share",
  title: "Outdoor Share",
  subtitle: "Vehicle Rental Marketplace",
  description: "Vehicle rental marketplace with identity verification...",
  category: "Mobile Apps", // 'Mobile Apps' | 'Internal Tools' | 'Automation' | 'Research'
  tech: ["FlutterFlow", "Stripe", "DocuSeal", "Firebase"],
  platforms: ["App Store", "Play Store"],
  featured: true,
  whatIDid: [
    "Architected end-to-end rental flow...",
    "Integrated DocuSeal for in-app legally binding e-signatures..."
  ]
}
```

### 3. Replace Profile Picture or Resume
- **Profile Picture**: Place your portrait at `public/me.png` (or `public/images/afaq-mehmood.png`).
- **Resume PDF**: Place your latest resume file at `public/Afaq_Mehmood_Resume.pdf`.

---

## 🌐 Deployment

Deployable as a 100% static bundle on any provider:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: Build output in `dist/` can be deployed via GitHub Actions.
