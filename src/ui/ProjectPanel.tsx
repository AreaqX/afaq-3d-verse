import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '../store/useNav';

export const ProjectPanel: React.FC = () => {
  const activeProject = useNav((state) => state.activeProject);
  const setActiveProject = useNav((state) => state.setActiveProject);

  // Keyboard navigation for panel
  useEffect(() => {
    if (!activeProject) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeProject, setActiveProject]);

  return (
    <AnimatePresence>
      {activeProject && (
        <div className="fixed inset-0 z-40 pointer-events-none flex justify-end">
          {/* Subtle backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* 3D Glass Panel Card */}
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative pointer-events-auto w-full md:w-[480px] h-full glass-panel border-l border-white/10 text-[#F1F5F9] flex flex-col justify-between overflow-y-auto shadow-2xl p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} details`}
          >
            {/* Header with Close and Index */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeProject.color || '#00E5FF' }} />
                <span className="font-mono text-xs text-[#94A3B8] tracking-widest uppercase">
                  {activeProject.category} · SPECIFICATION
                </span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="w-8 h-8 rounded-lg glass-pill flex items-center justify-center text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-colors cursor-pointer"
                aria-label="Close project panel (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 py-6 space-y-6">
              {/* Project Title & Subtitle */}
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold text-[#FFFFFF] tracking-tight">
                  {activeProject.title}
                </h2>
                <p className="font-mono text-xs text-[#00E5FF] mt-1 tracking-wider uppercase font-semibold">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Platform Badges */}
              {activeProject.platforms && (
                <div className="flex flex-wrap gap-2">
                  {activeProject.platforms.map((plat) => (
                    <span
                      key={plat}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg glass-pill text-[11px] font-mono text-[#D1D5DB]"
                    >
                      <span className="text-[#00E5FF]">✓</span>
                      {plat}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider font-bold">Overview</h3>
                <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* What I Did Bullets */}
              {activeProject.whatIDid && activeProject.whatIDid.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider font-bold">
                    Engineering & Quality Highlights
                  </h3>
                  <ul className="space-y-2.5">
                    {activeProject.whatIDid.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#E2E8F0]">
                        <span className="text-[#00E5FF] mt-0.5 select-none font-bold">›</span>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Tags */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider font-bold">Technologies Used</h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg glass-pill text-xs font-mono text-[#00E5FF] border-[#00E5FF]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="border-t border-white/10 pt-4">
              <button
                onClick={() => setActiveProject(null)}
                className="w-full py-3 px-4 rounded-xl bg-[#00E5FF] hover:bg-[#00C4DB] font-mono text-xs text-[#06080F] font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CLOSE SPECIFICATION</span>
                <span className="text-xs opacity-75">[ESC]</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
