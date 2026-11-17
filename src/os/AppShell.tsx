import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Home } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 20 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-10 flex flex-col justify-between bg-screen select-none overflow-hidden"
    >
      {/* Top App Header */}
      <div className="h-14 px-4 border-b border-border bg-surface/90 backdrop-blur-md flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onBack || closeApp}
            className="p-1.5 -ml-1.5 rounded-lg text-ink hover:text-accent hover:bg-surface-alt transition-colors flex items-center gap-0.5 cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 text-accent" />
            <span className="text-xs font-medium text-accent">Back</span>
          </button>
        </div>

        {/* Title & optional subtitle */}
        <div className="text-center">
          <h2 className="text-sm font-semibold text-ink leading-tight">{title}</h2>
          {subtitle && <p className="text-[10px] text-ink-faint font-mono">{subtitle}</p>}
        </div>

        {/* Right actions (or Home shortcut) */}
        <div className="flex items-center gap-2">
          {actions ? (
            actions
          ) : (
            <button
              onClick={goHome}
              className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-alt transition-colors cursor-pointer"
              title="Home"
            >
              <Home className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* App Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 select-text">
        {children}
      </div>

      {/* Bottom Home Indicator Bar */}
      <div
        onClick={goHome}
        className="w-full h-6 flex items-center justify-center cursor-pointer shrink-0 bg-transparent hover:bg-black/[0.02] transition-colors"
        title="Tap to go Home"
      >
        <div className="w-32 h-1 rounded-full bg-ink/25 hover:bg-ink/50 transition-colors" />
      </div>
    </motion.div>
  );
};
