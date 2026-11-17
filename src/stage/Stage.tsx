import React, { useEffect } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { LeftSidePanel, RightSidePanel, FloatingStageBadges } from './SidePanel';
import { useOS } from '../store/useOS';
import { portfolioData } from '../data/portfolio';

export const Stage: React.FC = () => {
  const isClassicView = useOS((state) => state.isClassicView);
  const toggleClassicView = useOS((state) => state.toggleClassicView);
  const goHome = useOS((state) => state.goHome);
  const closeApp = useOS((state) => state.closeApp);
  const currentApp = useOS((state) => state.currentApp);

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
    <div className="relative w-full min-h-screen stage-pattern flex flex-col justify-between overflow-x-hidden text-white select-none">
      {/* Top persistent recruiter bar (Matte Dark Glass) */}
      <header className="hidden sm:flex w-full px-6 py-3 border-b border-[#24314A] bg-[#141B28]/90 backdrop-blur-md items-center justify-between z-40 text-xs font-mono shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
          <span className="font-bold text-white tracking-wide">Afaq Mehmood</span>
          <span className="text-border">/</span>
          <span className="text-accent font-semibold">Mobile App Developer · Software Engineer · SQA Engineer</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            className="text-accent hover:underline font-bold transition-colors flex items-center gap-1"
          >
            <span>CV PDF (152 KB) ↓</span>
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
            className="px-3 py-1 rounded-lg bg-accent hover:bg-accent-hover text-black font-bold transition-all cursor-pointer shadow-md shadow-cyan-500/20"
          >
            Classic 2D View
          </button>
        </div>
      </header>

      {/* Main Stage: Center Phone & Surrounding Elements */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center lg:justify-between px-0 sm:px-6 py-0 sm:py-6">
        {/* Left Side Panel (Desktop only >= 1024px) */}
        <LeftSidePanel />

        {/* Floating Stage Badges (Tablet & Medium Screens flanking phone) */}
        <FloatingStageBadges />

        {/* Center: The Smartphone */}
        <div className="relative flex-1 flex items-center justify-center z-30">
          <PhoneFrame />

          {/* Ambient Stage Reflection Glow underneath the phone */}
          <div className="hidden sm:block absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 h-10 bg-accent/20 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Right Side Panel (Desktop only >= 1024px) */}
        <RightSidePanel />
      </main>

      {/* Tablet / Medium Screen Footer */}
      <footer className="hidden sm:flex lg:hidden w-full py-3.5 px-6 items-center justify-between text-xs font-mono text-ink-muted border-t border-[#24314A] bg-[#141B28]/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Afaq Mehmood · Available for hire</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            className="text-accent underline font-bold"
          >
            Resume PDF (152 KB)
          </a>
          <button onClick={toggleClassicView} className="text-white underline cursor-pointer">
            Classic 2D View
          </button>
        </div>
      </footer>
    </div>
  );
};
