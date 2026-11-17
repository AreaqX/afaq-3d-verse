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
      <header className="hidden sm:flex w-full px-6 py-3 border-b border-white/10 bg-[#141B28]/80 backdrop-blur-2xl items-center justify-between z-40 text-xs font-mono shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src="/me.png"
              alt="Afaq Mehmood"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-accent/60 shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/afaq.png';
              }}
            />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse absolute -bottom-0.5 -right-0.5 ring-1 ring-[#0B0F19]" />
          </div>
          <span className="font-bold text-white tracking-wide">Afaq Mehmood</span>
          <span className="text-white/20">/</span>
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
          <span className="text-white/20">|</span>
          <a
            href={`mailto:${portfolioData.profile.email}`}
            className="text-white hover:text-accent font-medium transition-colors"
          >
            Contact ✉
          </a>
          <span className="text-white/20">|</span>
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
          <div className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 w-96 h-14 bg-accent/25 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Right Side Panel (Desktop only >= 1024px) */}
        <RightSidePanel />
      </main>

      {/* Tablet / Medium Screen Footer */}
      <footer className="hidden sm:flex lg:hidden w-full py-3.5 px-6 items-center justify-between text-xs font-mono text-ink-muted border-t border-white/10 bg-[#141B28]/80 backdrop-blur-2xl z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2">
          <img
            src="/me.png"
            alt="Afaq Mehmood"
            className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-400"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/afaq.png';
            }}
          />
          <span className="text-white font-medium">Afaq Mehmood · Available for hire</span>
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
