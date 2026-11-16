import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import { useNav } from '../../store/useNav';

export const SkillsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const setSelectedSkill = useNav((state) => state.setSelectedSkill);

  const currentCategory = portfolioData.skills[activeTab];

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center py-6 px-4 md:px-8 select-none pointer-events-none">
      {/* 3D Glass Header Container */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-5 sm:p-6 rounded-3xl mb-5 text-center pointer-events-auto"
      >
        <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 inline-block mb-2">
          ORBITS & SPECIALIZATIONS
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#FFFFFF] tracking-tight">
          TECHNICAL COMPETENCY
        </h2>
        <p className="font-mono text-xs text-[#94A3B8] mt-1 max-w-xl mx-auto">
          PRODUCTION TOOLSETS BACKED BY REAL DEPLOYMENTS AND VERIFIED QA PRACTICES
        </p>

        {/* 3 Main Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-4">
          {portfolioData.skills.map((cat, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveTab(idx);
                  setSelectedSkill(null);
                }}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#00E5FF] text-[#06080F] shadow-[0_0_18px_rgba(0,229,255,0.4)]'
                    : 'glass-pill text-[#94A3B8] hover:text-[#FFFFFF] hover:border-[#00E5FF]/40'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isSelected ? '#06080F' : cat.color }}
                />
                <span>{cat.name.toUpperCase()}</span>
                <span className="text-[10px] opacity-75">({cat.skills.length})</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Skills 3D Glass Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[440px] overflow-y-auto p-1 pointer-events-auto">
        {currentCategory.skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
            onMouseEnter={() => setSelectedSkill({ name: skill.name, context: skill.context, category: currentCategory.name })}
            onMouseLeave={() => setSelectedSkill(null)}
            className="glass-card-interactive p-4 rounded-2xl group cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-display font-bold text-base text-[#FFFFFF] group-hover:text-[#00E5FF] transition-colors">
                {skill.name}
              </h3>
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#00E5FF] transition-all" />
            </div>
            <p className="font-mono text-xs text-[#94A3B8] leading-relaxed group-hover:text-[#CBD5E1] transition-colors">
              {skill.context}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
