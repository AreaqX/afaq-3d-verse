import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData, SkillCategory } from '../../data/portfolio';
import { useNav } from '../../store/useNav';

export const SkillsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const setSelectedSkill = useNav((state) => state.setSelectedSkill);

  const currentCategory = portfolioData.skills[activeTab];

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center py-6 px-4 md:px-8 select-none pointer-events-none">
      {/* Header */}
      <div className="text-center mb-6 pointer-events-auto">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#FFFFFF]">
          SKILL ORBITS & SPECIALIZATIONS
        </h2>
        <p className="font-mono text-xs text-[#8E8E93] mt-1">
          PRODUCTION TOOLSETS BACKED BY REAL DEPLOYMENTS AND VERIFIED QA PRACTICES
        </p>

        {/* 3 Main Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {portfolioData.skills.map((cat, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveTab(idx);
                  setSelectedSkill(null);
                }}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C6FF3D] text-[#07080A] shadow-md shadow-[#C6FF3D]/15'
                    : 'bg-[#10141D] text-[#8E8E93] hover:text-[#EDEDED] border border-[#202736] hover:bg-[#151B26]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isSelected ? '#07080A' : cat.color }}
                />
                <span>{cat.name.toUpperCase()}</span>
                <span className="text-[10px] opacity-70">({cat.skills.length})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[460px] overflow-y-auto p-1 pointer-events-auto">
        {currentCategory.skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.04 }}
            onMouseEnter={() => setSelectedSkill({ name: skill.name, context: skill.context, category: currentCategory.name })}
            onMouseLeave={() => setSelectedSkill(null)}
            className="p-4 rounded-xl bg-[#0B0E14]/90 border border-[#202634] hover:border-[#C6FF3D] transition-all group cursor-pointer shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-display font-bold text-base text-[#FFFFFF] group-hover:text-[#C6FF3D] transition-colors">
                {skill.name}
              </h3>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D] opacity-60 group-hover:opacity-100" />
            </div>
            <p className="font-mono text-xs text-[#9CA3AF] leading-relaxed">
              {skill.context}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
