import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '../store/useNav';
import { portfolioData, Project } from '../data/portfolio';

export const ProjectPanel: React.FC = () => {
  const activeProject = useNav((state) => state.activeProject);
  const setActiveProject = useNav((state) => state.setActiveProject);
  const categoryFilter = useNav((state) => state.categoryFilter);

  // Filter projects corresponding to current view
  const projectList = useMemo(() => {
    if (categoryFilter === 'All') {
      return portfolioData.projects.filter((p) => p.featured);
    }
    return portfolioData.projects.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  const currentIndex = activeProject ? projectList.findIndex((p) => p.id === activeProject.id) : -1;

  const handleNext = () => {
    if (currentIndex === -1 || projectList.length === 0) return;
    const nextIdx = (currentIndex + 1) % projectList.length;
    setActiveProject(projectList[nextIdx]);
  };

  const handlePrev = () => {
    if (currentIndex === -1 || projectList.length === 0) return;
    const prevIdx = (currentIndex - 1 + projectList.length) % projectList.length;
    setActiveProject(projectList[prevIdx]);
  };

  // Keyboard navigation for panel
  useEffect(() => {
    if (!activeProject) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeProject, currentIndex, projectList]);

  return (
    <AnimatePresence>
      {activeProject && (
        <div className="fixed inset-0 z-40 pointer-events-none flex justify-end">
          {/* Subtle backdrop overlay for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto md:hidden"
          />

          {/* Panel Card */}
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="relative pointer-events-auto w-full md:w-[480px] h-full bg-[#0B0E14]/95 border-l border-[#202530] text-[#EDEDED] flex flex-col justify-between overflow-y-auto backdrop-blur-xl shadow-2xl shadow-black/80 p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} details`}
          >
            {/* Header with Close and Index */}
            <div className="flex items-center justify-between border-b border-[#202530] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeProject.color || '#C6FF3D' }} />
                <span className="font-mono text-xs text-[#8E8E93] tracking-widest uppercase">
                  {activeProject.category} · {currentIndex !== -1 ? `${currentIndex + 1}/${projectList.length}` : 'SPEC'}
                </span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="w-8 h-8 rounded flex items-center justify-center border border-[#202530] text-[#8E8E93] hover:text-[#C6FF3D] hover:border-[#C6FF3D] transition-colors"
                aria-label="Close project panel (Esc)"
              >
                ✕
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 py-6 space-y-6">
              {/* Project Title & Subtitle */}
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#FFFFFF] tracking-tight">
                  {activeProject.title}
                </h2>
                <p className="font-mono text-xs text-[#C6FF3D] mt-1 tracking-wider uppercase">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Platform Badges */}
              {activeProject.platforms && (
                <div className="flex flex-wrap gap-2">
                  {activeProject.platforms.map((plat) => (
                    <span
                      key={plat}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131720] border border-[#222A38] text-[11px] font-mono text-[#D1D5DB]"
                    >
                      <span className="text-[#C6FF3D]">✓</span>
                      {plat}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider">Overview</h3>
                <p className="text-sm md:text-base text-[#D4D7E1] leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* What I Did Bullets */}
              {activeProject.whatIDid && activeProject.whatIDid.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider">
                    Engineering & Quality Highlights
                  </h3>
                  <ul className="space-y-2.5">
                    {activeProject.whatIDid.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#C4C8D4]">
                        <span className="text-[#C6FF3D] mt-0.5 select-none font-bold">›</span>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Tags */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider">Technologies Used</h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-sm bg-[#11151C] border border-[#1E2532] text-xs font-mono text-[#C6FF3D]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Navigation (Prev / Next) */}
            <div className="border-t border-[#202530] pt-4 flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                className="flex-1 py-2.5 px-4 rounded border border-[#202530] hover:border-[#C6FF3D] font-mono text-xs text-[#D1D5DB] hover:text-[#C6FF3D] transition-all flex items-center justify-center gap-2"
                aria-label="Previous project"
              >
                <span>←</span>
                <span>PREV</span>
              </button>

              <button
                onClick={() => setActiveProject(null)}
                className="py-2.5 px-4 rounded border border-[#202530] font-mono text-xs text-[#8E8E93] hover:text-[#FFFFFF] transition-colors"
              >
                ESC
              </button>

              <button
                onClick={handleNext}
                className="flex-1 py-2.5 px-4 rounded bg-[#C6FF3D] hover:bg-[#B4F524] font-mono text-xs text-[#07080A] font-semibold transition-all flex items-center justify-center gap-2"
                aria-label="Next project"
              >
                <span>NEXT</span>
                <span>→</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
