import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Code, ShieldCheck, ChevronDown, Check, Wrench } from 'lucide-react';
import { portfolioData, SkillCategory } from '../data/portfolio';
import { AppShell } from '../os/AppShell';

export const SkillsApp: React.FC = () => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'groups' | 'tools'>('groups');

  const icons = [Smartphone, Code, ShieldCheck];

  return (
    <AppShell title="Skills" subtitle="45 VERIFIED TOOLS">
      <div className="space-y-4 pb-8 text-white">
        {/* View Switcher Pill */}
        <div className="flex p-1 rounded-xl bg-surface border border-border">
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'groups'
                ? 'bg-accent text-black font-bold shadow-sm'
                : 'text-ink-muted hover:text-white'
            }`}
          >
            Core Competencies (3)
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tools'
                ? 'bg-accent text-black font-bold shadow-sm'
                : 'text-ink-muted hover:text-white'
            }`}
          >
            All 45 Tools Matrix
          </button>
        </div>

        {activeTab === 'groups' ? (
          /* 3 Main Groups (iOS Settings / Control Center Style) */
          <div className="space-y-4">
            {portfolioData.skills.map((group, gIdx) => {
              const Icon = icons[gIdx % icons.length];
              return (
                <div key={group.name} className="space-y-1.5">
                  <div className="flex items-center gap-2 px-1">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                    <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                      {group.name}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-surface border border-border divide-y divide-border overflow-hidden shadow-sm">
                    {group.skills.map((skill) => {
                      const isExpanded = expandedSkill === skill.name;
                      return (
                        <div key={skill.name} className="transition-colors">
                          <button
                            onClick={() =>
                              setExpandedSkill(isExpanded ? null : skill.name)
                            }
                            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-surface-alt/60 transition-colors cursor-pointer"
                          >
                            <span className="text-xs font-medium text-white font-sans">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-ink-muted transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-accent' : ''
                                }`}
                              />
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-accent-soft px-3.5 pb-3 text-xs text-ink-muted leading-relaxed"
                              >
                                <div className="pt-1 flex items-start gap-1.5 text-accent font-medium text-[11px]">
                                  <Check className="w-3 h-3 shrink-0 mt-0.5" />
                                  <span>{skill.context}</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Comprehensive 45 Tools Matrix */
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-ink-muted uppercase tracking-wider px-1">
              Production Tools & Platforms ({portfolioData.tools.length})
            </h3>

            <div className="rounded-2xl bg-surface border border-border divide-y divide-border overflow-hidden shadow-sm">
              {portfolioData.tools.map((tool) => (
                <div key={tool.name} className="p-3 flex items-start justify-between gap-3 text-left">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm select-none">{tool.icon}</span>
                      <span className="text-xs font-bold text-white">{tool.name}</span>
                      {tool.badge && (
                        <span className="px-1.5 py-0.2 rounded bg-accent-soft text-accent text-[9px] font-mono font-bold border border-accent/20">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-ink-faint block uppercase">
                      {tool.category}
                    </span>
                    <p className="text-[11px] text-ink-muted leading-snug pt-0.5">
                      {tool.context}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};
