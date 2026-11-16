import React from 'react';
import { useNav, STATIONS } from '../store/useNav';
import { portfolioData } from '../data/portfolio';

export const Hud: React.FC = () => {
  const currentStation = useNav((state) => state.currentStation);
  const goToStation = useNav((state) => state.goToStation);
  const nextStation = useNav((state) => state.nextStation);
  const prevStation = useNav((state) => state.prevStation);
  const toggleClassicView = useNav((state) => state.toggleClassicView);
  const toggleCommandPalette = useNav((state) => state.toggleCommandPalette);
  const squashedBugsCount = useNav((state) => state.squashedBugsCount);
  const isFlying = useNav((state) => state.isFlying);

  const activeMeta = STATIONS[currentStation];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-6 text-[#F1F5F9] font-mono">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => goToStation(0)}
            className="font-display font-black text-lg md:text-xl tracking-wider text-[#FFFFFF] hover:text-[#00E5FF] transition-colors focus-visible:outline-none cursor-pointer flex items-center gap-2"
            aria-label="Fly to Hub station"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
            <span>AFAQ MEHMOOD</span>
          </button>
          <span className="hidden sm:inline-block text-[#334155]">/</span>
          <span className="hidden lg:inline-block text-xs text-[#94A3B8] tracking-wide">
            {portfolioData.profile.title}
          </span>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
          {/* Skip to CV Button */}
          <a
            href={portfolioData.profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0C101A]/90 hover:bg-[#131926] border border-[#1A2333] hover:border-[#00E5FF]/50 text-xs text-[#F1F5F9] transition-colors"
            title="Download Afaq Mehmood Resume PDF"
          >
            <span>CV</span>
            <span className="text-[#00E5FF]">↓</span>
          </a>

          {/* Command Palette Trigger */}
          <button
            onClick={toggleCommandPalette}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0C101A]/90 hover:bg-[#131926] border border-[#1A2333] hover:border-[#00E5FF]/50 text-xs text-[#94A3B8] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            aria-label="Open command palette (Ctrl+K or /)"
          >
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#131A28] text-[10px] text-[#00E5FF] border border-[#1F293D]">
              Ctrl+K
            </kbd>
          </button>

          {/* Classic View Toggle */}
          <button
            onClick={toggleClassicView}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0C101A]/95 hover:bg-[#131926] border border-[#00E5FF]/40 hover:border-[#00E5FF] text-xs text-[#00E5FF] font-bold transition-all shadow-md shadow-black cursor-pointer"
            aria-label="Toggle 2D Classic accessible view"
          >
            <span className="w-1.5 h-1.5 rounded-sm bg-[#00E5FF]" />
            <span>Classic View</span>
          </button>
        </div>
      </header>

      {/* Bottom Navigation HUD Bar */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Station Coordinates & Flight State */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0C101A]/95 border border-[#1A2333] backdrop-blur-md shadow-lg">
            <span className="text-[#64748B]">STATION</span>
            <span className="text-[#00E5FF] font-bold">0{currentStation + 1} / 05</span>
            <span className="text-[#334155]">·</span>
            <span className="text-[#F1F5F9] font-semibold">{activeMeta.name}</span>
            {isFlying && (
              <span className="text-[10px] text-[#00E5FF] animate-pulse">
                [TRAVELING...]
              </span>
            )}
          </div>

          {/* SQA Easter Egg Bug Squashed Counter */}
          {squashedBugsCount > 0 && (
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0C101A]/95 border border-[#00E5FF]/40 text-xs text-[#00E5FF] backdrop-blur-md shadow-lg">
              <span>🐞</span>
              <span>BUGS SQUASHED: {squashedBugsCount}</span>
            </div>
          )}
        </div>

        {/* Center: 5 Interactive Station Waypoint Dots & Scroll Prompt */}
        <div className="flex flex-col items-center gap-1.5">
          <nav
            aria-label="Main station navigation"
            className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-[#0C101A]/95 border border-[#1A2333] backdrop-blur-md shadow-2xl"
          >
            {STATIONS.map((station) => {
              const isActive = currentStation === station.index;
              return (
                <button
                  key={station.id}
                  onClick={() => goToStation(station.index)}
                  aria-label={`Fly to station ${station.index + 1}: ${station.shortLabel}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00E5FF] text-[#06080F] font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#131926]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-[#06080F]' : 'bg-[#334155]'
                    }`}
                  />
                  <span className="hidden sm:inline">0{station.index + 1}</span>
                  <span>{station.shortLabel}</span>
                </button>
              );
            })}
          </nav>
          <span className="text-[10px] text-[#64748B] font-mono tracking-wider hidden md:inline">
            ⇄ SCROLL OR SWIPE HORIZONTALLY TO FLY BETWEEN STATIONS
          </span>
        </div>

        {/* Right: Prev / Next Station Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevStation}
            className="w-9 h-9 rounded-lg bg-[#0C101A]/95 hover:bg-[#131926] border border-[#1A2333] hover:border-[#00E5FF]/50 text-sm text-[#F1F5F9] hover:text-[#00E5FF] flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Fly to previous station (ArrowLeft / A / Scroll Left)"
            title="Previous Station (Scroll Up/Left)"
          >
            ←
          </button>
          <button
            onClick={nextStation}
            className="w-9 h-9 rounded-lg bg-[#0C101A]/95 hover:bg-[#131926] border border-[#1A2333] hover:border-[#00E5FF]/50 text-sm text-[#F1F5F9] hover:text-[#00E5FF] flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Fly to next station (ArrowRight / D / Scroll Right)"
            title="Next Station (Scroll Down/Right)"
          >
            →
          </button>
        </div>
      </footer>
    </div>
  );
};
