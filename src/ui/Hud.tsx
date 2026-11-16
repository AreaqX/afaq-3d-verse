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
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-6 text-[#EDEDED] font-mono">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToStation(0)}
            className="pointer-events-auto font-display font-black text-lg md:text-xl tracking-wider text-[#FFFFFF] hover:text-[#C6FF3D] transition-colors focus-visible:outline-none cursor-pointer flex items-center gap-2"
            aria-label="Fly to Hub station"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF3D]" />
            <span>AFAQ MEHMOOD</span>
          </button>
          <span className="hidden sm:inline-block text-[#3A4050]">/</span>
          <span className="hidden lg:inline-block text-xs text-[#8E8E93] tracking-wide">
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F131A]/90 hover:bg-[#161D28] border border-[#232936] hover:border-[#C6FF3D]/50 text-xs text-[#EDEDED] transition-colors"
            title="Download Afaq Mehmood Resume PDF"
          >
            <span>CV</span>
            <span className="text-[#C6FF3D]">↓</span>
          </a>

          {/* Command Palette Trigger */}
          <button
            onClick={toggleCommandPalette}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F131A]/90 hover:bg-[#161D28] border border-[#232936] hover:border-[#C6FF3D]/50 text-xs text-[#A6ADB8] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            aria-label="Open command palette (Ctrl+K or /)"
          >
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#1A202C] text-[10px] text-[#C6FF3D] border border-[#2D3748]">
              Ctrl+K
            </kbd>
          </button>

          {/* Classic View Toggle */}
          <button
            onClick={toggleClassicView}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0F131A]/95 hover:bg-[#161D28] border border-[#C6FF3D]/40 hover:border-[#C6FF3D] text-xs text-[#C6FF3D] font-bold transition-all shadow-md shadow-black cursor-pointer"
            aria-label="Toggle 2D Classic accessible view"
          >
            <span className="w-1.5 h-1.5 rounded-sm bg-[#C6FF3D]" />
            <span>Classic View</span>
          </button>
        </div>
      </header>

      {/* Bottom Navigation HUD Bar */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Station Coordinates & Flight State */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0D14]/95 border border-[#202736] backdrop-blur-md shadow-lg">
            <span className="text-[#8E8E93]">STATION</span>
            <span className="text-[#C6FF3D] font-bold">0{currentStation + 1} / 05</span>
            <span className="text-[#3A4050]">·</span>
            <span className="text-[#EDEDED] font-semibold">{activeMeta.name}</span>
            {isFlying && (
              <span className="text-[10px] text-[#C6FF3D] animate-pulse">
                [TRAVELING...]
              </span>
            )}
          </div>

          {/* SQA Easter Egg Bug Squashed Counter */}
          {squashedBugsCount > 0 && (
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0A0D14]/95 border border-[#C6FF3D]/40 text-xs text-[#C6FF3D] backdrop-blur-md shadow-lg animate-bounce">
              <span>🐞</span>
              <span>BUGS SQUASHED: {squashedBugsCount}</span>
            </div>
          )}
        </div>

        {/* Center: 5 Interactive Station Waypoint Dots */}
        <nav
          aria-label="Main station navigation"
          className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-[#0A0D14]/95 border border-[#202736] backdrop-blur-md shadow-2xl"
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
                    ? 'bg-[#C6FF3D] text-[#07080A] font-bold shadow-md shadow-[#C6FF3D]/25'
                    : 'text-[#8E8E93] hover:text-[#EDEDED] hover:bg-[#151B26]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-[#07080A]' : 'bg-[#404859]'
                  }`}
                />
                <span className="hidden sm:inline">0{station.index + 1}</span>
                <span>{station.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Prev / Next Station Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevStation}
            className="w-9 h-9 rounded-lg bg-[#0A0D14]/95 hover:bg-[#161D28] border border-[#202736] hover:border-[#C6FF3D]/50 text-sm text-[#D1D5DB] hover:text-[#C6FF3D] flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Fly to previous station (ArrowLeft / A)"
          >
            ←
          </button>
          <button
            onClick={nextStation}
            className="w-9 h-9 rounded-lg bg-[#0A0D14]/95 hover:bg-[#161D28] border border-[#202736] hover:border-[#C6FF3D]/50 text-sm text-[#D1D5DB] hover:text-[#C6FF3D] flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Fly to next station (ArrowRight / D)"
          >
            →
          </button>
        </div>
      </footer>
    </div>
  );
};
