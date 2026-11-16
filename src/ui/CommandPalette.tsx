import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav, STATIONS, StationIndex } from '../store/useNav';
import { portfolioData, Project } from '../data/portfolio';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'STATIONS' | 'PROJECTS' | 'ACTIONS';
  icon: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const isCommandPaletteOpen = useNav((state) => state.isCommandPaletteOpen);
  const setCommandPalette = useNav((state) => state.setCommandPalette);
  const goToStation = useNav((state) => state.goToStation);
  const setActiveProject = useNav((state) => state.setActiveProject);
  const toggleClassicView = useNav((state) => state.toggleClassicView);
  const addToast = useNav((state) => state.addToast);
  const squashBug = useNav((state) => state.squashBug);

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate list of all possible commands
  const allCommands = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = [];

    // Stations
    STATIONS.forEach((s) => {
      list.push({
        id: `station-${s.id}`,
        title: `Fly to ${s.name}`,
        subtitle: `Station 0${s.index + 1}`,
        category: 'STATIONS',
        icon: '🚀',
        action: () => {
          goToStation(s.index);
          setCommandPalette(false);
        }
      });
    });

    // Actions
    list.push({
      id: 'action-cv',
      title: 'Download Afaq Mehmood Resume / Portfolio PDF',
      subtitle: 'Official Resume (/Afaq_Mehmood_Resume.pdf)',
      category: 'ACTIONS',
      icon: '📄',
      action: () => {
        const link = document.createElement('a');
        link.href = portfolioData.profile.cv;
        link.download = 'Afaq_Mehmood_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addToast('Downloading Afaq Mehmood Resume PDF...', 'info');
        setCommandPalette(false);
      }
    });

    list.push({
      id: 'action-email',
      title: 'Copy Email Address',
      subtitle: portfolioData.profile.email,
      category: 'ACTIONS',
      icon: '✉',
      action: () => {
        navigator.clipboard.writeText(portfolioData.profile.email);
        addToast(`Email copied: ${portfolioData.profile.email}`, 'success');
        setCommandPalette(false);
      }
    });

    list.push({
      id: 'action-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: portfolioData.profile.linkedin,
      category: 'ACTIONS',
      icon: '🔗',
      action: () => {
        window.open(portfolioData.profile.linkedin, '_blank');
        setCommandPalette(false);
      }
    });

    list.push({
      id: 'action-classic',
      title: 'Toggle Classic 2D View',
      subtitle: 'Clean accessible layout for recruiters and ATS',
      category: 'ACTIONS',
      icon: '📑',
      action: () => {
        toggleClassicView();
        setCommandPalette(false);
      }
    });

    list.push({
      id: 'action-bug',
      title: 'Squash an SQA Bug (+1 Easter Egg)',
      subtitle: 'Simulate squashing a defect in production',
      category: 'ACTIONS',
      icon: '🐞',
      action: () => {
        squashBug();
        setCommandPalette(false);
      }
    });

    // Projects
    portfolioData.projects.forEach((p) => {
      list.push({
        id: `project-${p.id}`,
        title: p.title,
        subtitle: `${p.category} · ${p.tech.slice(0, 3).join(', ')}`,
        category: 'PROJECTS',
        icon: '📱',
        action: () => {
          goToStation(1); // Go to Work station
          setActiveProject(p);
          setCommandPalette(false);
        }
      });
    });

    return list;
  }, [goToStation, setActiveProject, toggleClassicView, addToast, squashBug, setCommandPalette]);

  // Filter commands
  const filtered = useMemo(() => {
    if (!search.trim()) return allCommands;
    const query = search.toLowerCase();
    return allCommands.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.subtitle.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
    );
  }, [allCommands, search]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  // Handle keyboard navigation within palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setCommandPalette(false);
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPalette(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl glass-panel border border-white/10 rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-[#EDEDED]"
            role="dialog"
            aria-modal="true"
            aria-label="Command search palette"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <span className="text-base text-[#00E5FF]">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Jump to station, project, CV, or action..."
                className="w-full bg-transparent text-sm text-[#FFFFFF] placeholder-[#64748B] focus:outline-none"
              />
              <kbd className="px-2 py-0.5 rounded-md glass-pill text-[10px] text-[#94A3B8]">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-transparent">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#94A3B8]">
                  No matching stations, projects, or commands found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#FFFFFF] shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                          : 'text-[#CBD5E1] hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm select-none">{item.icon}</span>
                        <div>
                          <div className={`text-xs font-medium ${isSelected ? 'text-[#00E5FF]' : ''}`}>
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[#64748B]">{item.subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#64748B] uppercase tracking-wider">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer tips */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 bg-black/40 text-[11px] text-[#64748B]">
              <div className="flex items-center gap-2">
                <span>Navigate</span>
                <kbd className="px-1.5 py-0.5 glass-pill rounded text-[10px]">↑↓</kbd>
                <span>Select</span>
                <kbd className="px-1.5 py-0.5 glass-pill rounded text-[10px]">↵</kbd>
              </div>
              <div className="text-[#00E5FF] font-bold">FLIGHT COMMAND SYSTEM</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
