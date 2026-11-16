import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';

export const JourneyView: React.FC = () => {
  const exp = portfolioData.experience[0];
  const edu = portfolioData.education[0];

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col justify-center py-6 px-4 md:px-8 select-none pointer-events-none">
      {/* Title */}
      <div className="text-center mb-6 pointer-events-auto">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#FFFFFF]">
          CAREER TRAJECTORY & FOUNDATIONS
        </h2>
        <p className="font-mono text-xs text-[#8E8E93] mt-1">
          CHRONOLOGICAL PATHWAY · PRODUCTION EXPERIENCE & COMPUTER SCIENCE ROOTS
        </p>
      </div>

      {/* Timeline Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[460px] overflow-y-auto p-1 pointer-events-auto">
        {/* Milestone 1: Professional Experience */}
        <motion.article
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-2xl bg-[#0B0E14]/95 border border-[#232B3A] backdrop-blur-xl shadow-xl space-y-4 text-left"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#202736] pb-3">
            <span className="font-mono text-xs text-[#C6FF3D] font-bold">
              {exp.period.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#131924] font-mono text-[11px] text-[#8E8E93]">
              {exp.location}
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-[#FFFFFF]">
              {exp.role}
            </h3>
            <p className="font-mono text-sm text-[#C6FF3D] font-medium mt-0.5">
              {exp.company}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
            {exp.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-[#1C222E]">
            <h4 className="font-mono text-[11px] text-[#8E8E93] uppercase tracking-wider">
              Key Contributions & QA Leadership
            </h4>
            <ul className="space-y-2">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#C4C9D6]">
                  <span className="text-[#C6FF3D] font-bold">›</span>
                  <span className="leading-snug">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        {/* Milestone 2: Formal Education */}
        <motion.article
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-2xl bg-[#0B0E14]/95 border border-[#232B3A] backdrop-blur-xl shadow-xl space-y-4 text-left"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#202736] pb-3">
            <span className="font-mono text-xs text-[#8E8E93] font-bold">
              {edu.period} · EDUCATION
            </span>
            <span className="px-2 py-0.5 rounded bg-[#131924] font-mono text-[11px] text-[#8E8E93]">
              {edu.location}
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-[#FFFFFF]">
              {edu.degree}
            </h3>
            <p className="font-mono text-sm text-[#C6FF3D] font-medium mt-0.5">
              {edu.institution}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
            {edu.details}
          </p>

          <div className="space-y-2 pt-4 border-t border-[#1C222E]">
            <h4 className="font-mono text-[11px] text-[#8E8E93] uppercase tracking-wider">
              Core Academic Domains
            </h4>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <div className="p-2.5 rounded-lg bg-[#11151F] border border-[#1E2532] text-xs font-mono text-[#D1D5DB]">
                • Software Testing, Verification & Validation
              </div>
              <div className="p-2.5 rounded-lg bg-[#11151F] border border-[#1E2532] text-xs font-mono text-[#D1D5DB]">
                • Data Structures & Advanced Algorithms
              </div>
              <div className="p-2.5 rounded-lg bg-[#11151F] border border-[#1E2532] text-xs font-mono text-[#D1D5DB]">
                • Distributed Systems & Cloud Architecture
              </div>
              <div className="p-2.5 rounded-lg bg-[#11151F] border border-[#1E2532] text-xs font-mono text-[#D1D5DB]">
                • Relational Database Design & Normalization
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};
