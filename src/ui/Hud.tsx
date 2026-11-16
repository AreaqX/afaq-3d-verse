import React from 'react';
import { useNav, STATIONS } from '../store/useNav';
import { portfolioData } from '../data/portfolio';

export const Hud: React.FC = () => {
  const currentStation = useNav((state) => state.currentStation);
  const goToStation = useNav((state) => state.goToStation);
  const toggleClassicView = useNav((state) => state.toggleClassicView);
  const toggleCommandPalette = useNav((state) => state.toggleCommandPalette);
  const squashedBugsCount = useNav((state) => state.squashedBugsCount);
  const isFlying = useNav((state) => state.isFlying);

  const activeMeta = STATIONS[currentStation];

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-6 text-[#F1F5F9] font-mono">
      {/* Top Header Glass Bar */}
      <header className="flex items-center justify-between gap-4 pointer-events-auto">
        {/* Left: Brand Monogram & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToStation(0)}
            className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2.5 hover:border-[#00E5FF]/40 transition-all cursor-pointer group"
            aria-label="Fly to Hub station"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] group-hover:scale-110 transition-transform" />
            <span className="font-display font-black text-sm md:text-base tracking-wider text-[#FFFFFF]">
              AFAQ MEHMOOD
            </span>
          </button>
          <span className="hidden sm:inline-block text-[#334155]">/</span>
          <span className="hidden lg:inline-block text-xs text-[#94A3B8] tracking-wide">
            {portfolioData.profile.title}
          </span>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Skip to CV Button */}
          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs text-[#F1F5F9] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
            title="Download Afaq Mehmood Resume PDF"
          >
            <span>CV</span>
            <span className="text-[#00E5FF]">↓</span>
          </a>

          {/* Command Palette Trigger */}
          <button
            onClick={toggleCommandPalette}
            className="glass-pill hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs text-[#94A3B8] hover:text-[#FFFFFF] hover:border-[#00E5FF]/40 transition-all cursor-pointer"
            aria-label="Open command palette (Ctrl+K or /)"
          >
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-[#00E5FF]">
              Ctrl+K
            </kbd>
          </button>

          {/* Classic View Toggle */}
          <button
            onClick={toggleClassicView}
            className="glass-pill px-4 py-1.5 rounded-full text-xs text-[#00E5FF] font-bold hover:bg-[#00E5FF]/10 hover:border-[#00E5FF] transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
            aria-label="Toggle 2D Classic accessible view"
          >
            <span className="w-1.5 h-1.5 rounded-sm bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
            <span>Classic View</span>
          </button>
        </div>
      </header>

      {/* Bottom Navigation Glass Bar */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Station Coordinates & Flight Telemetry */}
        <div className="flex items-center gap-3 text-xs">
          <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2">
            <span className="text-[#64748B]">STATION</span>
            <span className="text-[#00E5FF] font-bold">0{currentStation + 1} / 05</span>
            <span className="text-[#334155]">·</span>
            <span className="text-[#F1F5F9] font-medium">{activeMeta.name}</span>
            {isFlying && (
              <span className="text-[10px] text-[#00E5FF] animate-pulse">
                [WARPING...]
              </span>
            )}
          </div>

          {/* SQA Bug Squashed Badge */}
          {squashedBugsCount > 0 && (
            <div className="glass-pill hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-[#00E5FF] border-[#00E5FF]/40 shadow-[0_0_12px_rgba(0,229,255,0.2)] animate-bounce">
              <span>🐞</span>
              <span>BUGS SQUASHED: {squashedBugsCount}</span>
            </div>
          )}
        </div>

        {/* Center: 5 Interactive Glass Waypoint Dots */}
        <nav
          aria-label="Main station navigation"
          className="glass-pill p-1.5 rounded-full flex items-center gap-1 sm:gap-2 shadow-2xl"
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
                    ? 'bg-[#00E5FF] text-[#06080F] font-bold shadow-[0_0_15px_rgba(0,229,255,0.45)]'
                    : 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-white/5'
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

        {/* Right: Scroll Gesture Guide */}
        <div className="hidden lg:flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-[11px] text-[#64748B]">
          <span className="text-[#00E5FF] animate-bounce">↓</span>
          <span>SCROLL VERTICALLY TO TRAVEL</span>
        </div>
      </footer>
    </div>
  );
};
