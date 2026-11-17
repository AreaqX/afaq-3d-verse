import React, { useEffect } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { LeftSidePanel, RightSidePanel } from './SidePanel';
import { useOS } from '../store/useOS';
import { portfolioData } from '../data/portfolio';

export const Stage: React.FC = () => {
  const isClassicView = useOS((state) => state.isClassicView);
  const toggleClassicView = useOS((state) => state.toggleClassicView);
  const goHome = useOS((state) => state.goHome);
  const closeApp = useOS((state) => state.closeApp);
  const currentApp = useOS((state) => state.currentApp);
  const isLocked = useOS((state) => state.isLocked);
  const setControlCenter = useOS((state) => state.setControlCenter);

  // Global desktop keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'Escape') {
        if (currentApp !== 'home') {
          closeApp();
        }
      } else if (e.key.toLowerCase() === 'h') {
        goHome();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentApp, closeApp, goHome]);

  return (
    <div className="relative w-full min-h-screen stage-pattern flex flex-col justify-between overflow-x-hidden">
      {/* Top persistent recruiter skip bar (Desktop / Tablet) */}
      <header className="hidden sm:flex w-full px-6 py-3 border-b border-border bg-surface/80 backdrop-blur-md items-center justify-between z-30 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-bold text-white">Afaq Mehmood</span>
          <span className="text-border">/</span>
          <span className="text-ink-muted">Interactive Mobile OS</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            className="text-white hover:text-accent font-medium underline underline-offset-4 transition-colors"
          >
            Skip to CV PDF (152 KB) ↓
          </a>
          <span className="text-border">|</span>
          <a
            href={`mailto:${portfolioData.profile.email}`}
            className="text-white hover:text-accent font-medium transition-colors"
          >
            Contact ✉
          </a>
          <span className="text-border">|</span>
          <button
            onClick={toggleClassicView}
            className="px-2.5 py-1 rounded-md bg-accent hover:bg-accent-hover text-black font-bold transition-all cursor-pointer shadow-sm"
          >
            Classic 2D View
          </button>
        </div>
      </header>

      {/* Main Stage: Center Phone & Side Panels */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex items-center justify-center lg:justify-between px-0 sm:px-6 py-0 sm:py-6">
        {/* Left Side Panel (Desktop only) */}
        <LeftSidePanel />

        {/* Center: The Smartphone */}
        <div className="flex-1 flex items-center justify-center">
          <PhoneFrame />
        </div>

        {/* Right Side Panel (Desktop only) */}
        <RightSidePanel />
      </main>

      {/* Tablet footnote if side panels hidden */}
      <footer className="hidden sm:flex lg:hidden w-full py-4 text-center items-center justify-center gap-4 text-xs font-mono text-ink-muted border-t border-border/60 bg-white/50">
        <span>Afaq Mehmood · Mobile App Developer · Software Engineer · SQA Engineer</span>
        <button onClick={toggleClassicView} className="text-accent underline cursor-pointer">
          Classic 2D View
        </button>
      </footer>
    </div>
  );
};
