import React from 'react';
import { ChevronLeft, Home, X } from 'lucide-react';
import { useOS } from '../store/useOS';

interface AppShellProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  title,
  subtitle,
  onBack,
  actions,
  children,
}) => {
  const goHome = useOS((state) => state.goHome);
  const closeApp = useOS((state) => state.closeApp);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goHome();
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-between bg-[#0B0F19] text-white select-none overflow-hidden">
      {/* Top App Header with Large High-Contrast Back Button */}
      <div className="h-14 px-3.5 border-b border-[#24314A] bg-[#141B28] flex items-center justify-between shrink-0 z-40 shadow-md">
        {/* Prominent Back Button */}
        <button
          onClick={handleBack}
          className="px-3 py-1.5 rounded-xl bg-accent/20 hover:bg-accent hover:text-black border border-accent/40 text-accent font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm group"
          aria-label="Back to Home"
          title="Back to Home"
        >
          <ChevronLeft className="w-4 h-4 text-accent group-hover:-translate-x-0.5 group-hover:text-black transition-transform" />
          <span>Back</span>
        </button>

        {/* Title & Subtitle */}
        <div className="text-center min-w-0 px-2 flex-1">
          <h2 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[9px] sm:text-[10px] text-accent font-mono tracking-wider truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Actions / Home Shortcut */}
        <div className="flex items-center gap-1.5 shrink-0">
          {actions}
          <button
            onClick={goHome}
            className="p-1.5 rounded-xl bg-surface-alt hover:bg-white/15 text-white/90 border border-[#24314A] transition-colors cursor-pointer"
            title="Return to Home Screen"
            aria-label="Home"
          >
            <Home className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>

      {/* App Body (Scrollable with solid opaque matte dark background) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 select-text bg-[#0B0F19]">
        {children}
      </div>

      {/* Dedicated Bottom Navigation Bar with Home Controls */}
      <div className="w-full h-11 px-4 border-t border-[#24314A] bg-[#141B28] flex items-center justify-between shrink-0 z-40 shadow-inner">
        {/* Left: Home Button */}
        <button
          onClick={goHome}
          className="text-xs font-mono text-accent hover:text-white flex items-center gap-1 cursor-pointer font-bold transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        {/* Center: Tap to go home bar */}
        <div
          onClick={goHome}
          className="w-24 h-1.5 rounded-full bg-white/30 hover:bg-accent transition-colors cursor-pointer"
          title="Tap to go Home"
        />

        {/* Right: Close App */}
        <button
          onClick={handleBack}
          className="text-xs font-mono text-ink-muted hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Close</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
