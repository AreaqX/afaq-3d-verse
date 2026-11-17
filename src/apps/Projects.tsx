import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Layers, Wrench, Search, ChevronRight } from 'lucide-react';
import { portfolioData, Project } from '../data/portfolio';
import { useOS } from '../store/useOS';
import { AppShell } from '../os/AppShell';
import { ProjectDetail } from './ProjectDetail';

export const ProjectsApp: React.FC = () => {
  const selectedProjectId = useOS((state) => state.selectedProjectId);
  const setSelectedProject = useOS((state) => state.setSelectedProject);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Mobile Apps', 'Internal Tools', 'Automation', 'Research'];

  // Selected project for detail view
  const currentProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return portfolioData.projects.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId]);

  // Featured 3 flagship projects for top carousel
  const featuredProjects = useMemo(() => {
    return portfolioData.projects.filter((p) => p.featured).slice(0, 3);
  }, []);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return portfolioData.projects.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchQuery =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <AppShell
      title={currentProject ? currentProject.title : 'App Store'}
      subtitle={currentProject ? 'PROJECT SPECIFICATION' : 'PORTFOLIO OF APPS'}
      onBack={currentProject ? () => setSelectedProject(null) : undefined}
    >
      <AnimatePresence mode="wait">
        {currentProject ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <ProjectDetail
              project={currentProject}
              onBack={() => setSelectedProject(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5 pb-6"
          >
            {/* Search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 15+ production apps & tools..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-alt border border-border text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent"
              />
            </div>

            {/* Top Featured Cards Carousel (App Store Style) */}
            {selectedCategory === 'All' && !searchQuery && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
                    Featured Releases
                  </span>
                  <span className="text-[10px] font-mono text-accent">Store Ready</span>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none snap-x snap-mandatory">
                  {featuredProjects.map((p) => (
                    <motion.div
                      key={p.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedProject(p.id)}
                      className="w-64 shrink-0 rounded-2xl p-4 bg-gradient-to-br from-white via-surface-alt to-[#EAF0F7] border border-border shadow-sm flex flex-col justify-between h-40 cursor-pointer snap-center group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-accent">
                          <span className="font-bold uppercase tracking-wider">{p.category}</span>
                          <span className="text-ink-muted">App Store ✓</span>
                        </div>
                        <h4 className="text-base font-display font-bold text-ink mt-1 group-hover:text-accent transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-[11px] text-ink-muted mt-0.5 line-clamp-2 leading-tight">
                          {p.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/60">
                        <span className="text-[10px] font-mono text-ink-faint">
                          {p.tech.slice(0, 2).join(' · ')}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold">
                          VIEW
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Horizontal Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-accent text-white font-semibold shadow-sm'
                        : 'bg-surface-alt text-ink-muted hover:text-ink border border-border'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* List of Apps */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
                {selectedCategory === 'All' ? 'All Applications & Portals' : selectedCategory} (
                {filteredProjects.length})
              </h3>

              <div className="divide-y divide-border/60 rounded-2xl bg-white border border-border overflow-hidden shadow-sm">
                {filteredProjects.map((p) => (
                  <motion.div
                    key={p.id}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedProject(p.id)}
                    className="p-3.5 flex items-center justify-between gap-3 hover:bg-surface-alt/70 transition-colors cursor-pointer group"
                  >
                    {/* App icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-border"
                      style={{ backgroundColor: p.color ? `${p.color}15` : 'var(--accent-soft)' }}
                    >
                      <Smartphone className="w-6 h-6" style={{ color: p.color || 'var(--accent)' }} />
                    </div>

                    {/* App info */}
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-ink group-hover:text-accent transition-colors truncate">
                          {p.title}
                        </h4>
                        {p.featured && (
                          <span className="px-1.5 py-0.2 rounded bg-accent-soft text-accent text-[9px] font-mono font-bold">
                            Top App
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-ink-muted truncate mt-0.5">{p.subtitle}</p>
                      <p className="text-[10px] text-ink-faint font-mono mt-0.5 truncate">
                        {p.tech.join(', ')}
                      </p>
                    </div>

                    {/* GET Button */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(p.id);
                        }}
                        className="px-3.5 py-1 rounded-full bg-surface-alt hover:bg-accent hover:text-white border border-border text-accent text-xs font-bold transition-all cursor-pointer"
                      >
                        OPEN
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
};
