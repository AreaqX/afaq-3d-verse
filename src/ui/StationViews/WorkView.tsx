import React, { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '../../store/useNav';
import { portfolioData, Project } from '../../data/portfolio';

export const WorkView: React.FC = () => {
  const activeProject = useNav((state) => state.activeProject);
  const setActiveProject = useNav((state) => state.setActiveProject);
  const categoryFilter = useNav((state) => state.categoryFilter);
  const setCategoryFilter = useNav((state) => state.setCategoryFilter);

  const categories = ['All', 'Mobile Apps', 'Internal Tools', 'Automation', 'Research'] as const;

  // Filter projects list
  const projectList = useMemo(() => {
    if (categoryFilter === 'All') {
      return portfolioData.projects.filter((p) => p.featured);
    }
    if (categoryFilter === 'Research') {
      return portfolioData.research.map((r) => ({
        id: r.id,
        title: r.title,
        subtitle: 'LAB EXPLORATION',
        description: r.description,
        category: 'Research' as const,
        tech: r.tags,
        platforms: ['Web' as const],
        whatIDid: [
          'Evaluated modern architectural paradigms and rapid prototyping workflows',
          'Authored benchmarks and prototype integrations',
          'Documented production feasibility and security implications'
        ],
        color: '#00E5FF',
        featured: false
      }));
    }
    return portfolioData.projects.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  // Set default active project if none selected or if filtered out
  useEffect(() => {
    if (projectList.length > 0) {
      if (!activeProject || !projectList.some((p) => p.id === activeProject.id)) {
        setActiveProject(projectList[0]);
      }
    }
  }, [categoryFilter, projectList, activeProject, setActiveProject]);

  const current = activeProject || projectList[0];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-between py-6 px-4 md:px-8 select-none pointer-events-none">
      {/* Category Glass Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#FFFFFF] drop-shadow-md">
            PRODUCTION WORK
          </h2>
          <p className="font-mono text-xs text-[#94A3B8]">
            {projectList.length} PROJECTS IN THIS CATEGORY · SELECT BELOW TO INSPECT
          </p>
        </div>

        <nav aria-label="Project categories" className="glass-pill p-1 rounded-full flex items-center gap-1 shadow-lg">
          {categories.map((cat) => {
            const isSelected = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00E5FF] text-[#06080F] font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 my-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Project Selector List */}
        <div className="lg:col-span-5 h-[280px] lg:h-[460px] overflow-y-auto pr-1 space-y-2.5 pointer-events-auto">
          {projectList.map((p, idx) => {
            const isSelected = current?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setActiveProject(p)}
                className={`p-4 rounded-2xl cursor-pointer text-left flex items-start gap-3.5 transition-all ${
                  isSelected
                    ? 'glass-card-interactive border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)] bg-[#0E1526]/85'
                    : 'glass-card-interactive hover:border-white/20'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full mt-1 shrink-0 shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: p.color || '#00E5FF', color: p.color || '#00E5FF' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-display font-bold text-sm truncate ${isSelected ? 'text-[#00E5FF]' : 'text-[#FFFFFF]'}`}>
                      {p.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#00E5FF] shrink-0 font-bold px-1.5 py-0.5 rounded bg-[#00E5FF]/10">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[#94A3B8] truncate mt-0.5">
                    {p.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 font-mono text-[10px] text-[#CBD5E1]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Project Glassy Inspector Card */}
        <div className="lg:col-span-7 h-full flex flex-col justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {current && (
              <motion.article
                key={current.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 md:p-8 rounded-3xl space-y-5"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider font-semibold">
                        {current.subtitle}
                      </span>
                      <span className="text-[#334155]">·</span>
                      <span className="font-mono text-xs text-[#94A3B8] uppercase">
                        {current.category}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-[#FFFFFF] drop-shadow-sm">
                      {current.title}
                    </h3>
                  </div>

                  {/* Platform Badges */}
                  {current.platforms && (
                    <div className="flex flex-wrap gap-1.5">
                      {current.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#D1D5DB] flex items-center gap-1.5"
                        >
                          <span className="text-[#00E5FF]">✓</span>
                          <span>{plat}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-[#D1D5DB] leading-relaxed">
                  {current.description}
                </p>

                {/* Highlights */}
                {current.whatIDid && current.whatIDid.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
                      Engineering & QA Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {current.whatIDid.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#C4C9D6]">
                          <span className="text-[#00E5FF] font-bold mt-0.5 select-none">›</span>
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <h4 className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {current.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00E5FF] shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
