import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Smartphone, FileText, Mail, X, ArrowRight } from 'lucide-react';
import { useOS, AppId } from '../store/useOS';
import { portfolioData } from '../data/portfolio';

export const Spotlight: React.FC = () => {
  const isSpotlightOpen = useOS((state) => state.isSpotlightOpen);
  const setSpotlight = useOS((state) => state.setSpotlight);
  const openApp = useOS((state) => state.openApp);
  const setSelectedProject = useOS((state) => state.setSelectedProject);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSpotlightOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSpotlightOpen]);

  // Global Ctrl+K hotkey
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlight(!isSpotlightOpen);
      } else if (e.key === 'Escape' && isSpotlightOpen) {
        setSpotlight(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSpotlightOpen, setSpotlight]);

  const items = useMemo(() => {
    const list: {
      id: string;
      title: string;
      subtitle: string;
      category: 'APPS' | 'PROJECTS' | 'ACTIONS';
      action: () => void;
    }[] = [];

    // Apps
    list.push({ id: 'app-projects', title: 'Projects (App Store)', subtitle: 'View 8 mobile apps & internal tools', category: 'APPS', action: () => openApp('projects') });
    list.push({ id: 'app-about', title: 'About Afaq Mehmood', subtitle: 'Profile, location & relocation status', category: 'APPS', action: () => openApp('about') });
    list.push({ id: 'app-skills', title: 'Technical Skills & Arsenal', subtitle: '45 production tools & competencies', category: 'APPS', action: () => openApp('skills') });
    list.push({ id: 'app-journey', title: 'Career Journey & Education', subtitle: 'Patronecs experience & BS degree', category: 'APPS', action: () => openApp('journey') });
    list.push({ id: 'app-resume', title: 'Resume Viewer', subtitle: 'Download CV PDF (/Afaq_Mehmood_Resume.pdf)', category: 'APPS', action: () => openApp('resume') });
    list.push({ id: 'app-messages', title: 'Messages / Contact', subtitle: 'Direct email, phone & chat', category: 'APPS', action: () => openApp('messages') });
    list.push({ id: 'app-bughunt', title: 'Bug Hunt QA Mini-Game', subtitle: 'Play 30s defect squashing game', category: 'APPS', action: () => openApp('bughunt') });
    list.push({ id: 'app-settings', title: 'Settings', subtitle: 'Theme accents & classic view', category: 'APPS', action: () => openApp('settings') });

    // Projects
    portfolioData.projects.forEach((p) => {
      list.push({
        id: `proj-${p.id}`,
        title: p.title,
        subtitle: `${p.category} · ${p.subtitle}`,
        category: 'PROJECTS',
        action: () => {
          setSelectedProject(p.id);
          openApp('projects');
        },
      });
    });

    // Actions
    list.push({
      id: 'act-cv',
      title: 'Download Resume PDF',
      subtitle: 'Official Afaq_Mehmood_Resume.pdf (152 KB)',
      category: 'ACTIONS',
      action: () => {
        window.open(portfolioData.profile.cv, '_blank');
        setSpotlight(false);
      },
    });

    return list;
  }, [openApp, setSelectedProject, setSpotlight]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items.slice(0, 6);
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  if (!isSpotlightOpen) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-md flex flex-col justify-start p-4 pt-12">
        {/* Backdrop tap to close */}
        <div onClick={() => setSpotlight(false)} className="absolute inset-0" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          className="relative z-50 w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl border border-border overflow-hidden"
        >
          {/* Search Header */}
          <div className="p-3.5 border-b border-border flex items-center gap-2.5">
            <Search className="w-4 h-4 text-accent shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps, projects, actions..."
              className="w-full text-xs text-ink placeholder:text-ink-faint focus:outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-ink-muted hover:text-ink"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-border/60 p-1">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-xs text-ink-faint font-mono">
                No matching results.
              </div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setSpotlight(false);
                  }}
                  className="w-full p-2.5 rounded-xl flex items-center justify-between text-left hover:bg-surface-alt transition-colors group cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-semibold text-ink group-hover:text-accent transition-colors truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-ink-muted truncate">{item.subtitle}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-accent transition-colors shrink-0" />
                </button>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
