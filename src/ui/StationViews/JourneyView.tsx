import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';

export const JourneyView: React.FC = () => {
  const exp = portfolioData.experience[0];
  const edu = portfolioData.education[0];

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col justify-center py-6 px-4 md:px-8 select-none pointer-events-none">
      {/* 3D Glass Header Container */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-5 sm:p-6 rounded-3xl mb-5 text-center pointer-events-auto"
      >
        <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 inline-block mb-2">
          TIMELINE & TRAJECTORY
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#FFFFFF] tracking-tight">
          CAREER PATHWAY & EDUCATION
        </h2>
        <p className="font-mono text-xs text-[#94A3B8] mt-1 max-w-xl mx-auto">
          CHRONOLOGICAL PROGRESSION · PRODUCTION SOFTWARE ENGINEERING & ACADEMIC ROOTS
        </p>
      </motion.div>

      {/* Timeline Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[460px] overflow-y-auto p-1 pointer-events-auto">
        {/* Milestone 1: Professional Experience */}
        <motion.article
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 text-left border border-white/10 hover:border-[#00E5FF]/40 transition-all shadow-2xl"
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="glass-pill px-3 py-1 rounded-lg font-mono text-xs text-[#00E5FF] font-bold border-[#00E5FF]/30">
              {exp.period.toUpperCase()}
            </span>
            <span className="glass-pill px-2.5 py-1 rounded-lg font-mono text-[11px] text-[#94A3B8]">
              {exp.location}
            </span>
          </div>

          <div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#FFFFFF]">
              {exp.role}
            </h3>
            <p className="font-mono text-sm text-[#00E5FF] font-semibold mt-0.5">
              {exp.company}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            {exp.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-white/10">
            <h4 className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
              Key Contributions & QA Leadership
            </h4>
            <ul className="space-y-2">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#E2E8F0]">
                  <span className="text-[#00E5FF] font-bold">›</span>
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
          className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 text-left border border-white/10 hover:border-[#00E5FF]/40 transition-all shadow-2xl"
        >
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="glass-pill px-3 py-1 rounded-lg font-mono text-xs text-[#94A3B8] font-bold">
              {edu.period} · DEGREE
            </span>
            <span className="glass-pill px-2.5 py-1 rounded-lg font-mono text-[11px] text-[#94A3B8]">
              {edu.location}
            </span>
          </div>

          <div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#FFFFFF]">
              {edu.degree}
            </h3>
            <p className="font-mono text-sm text-[#00E5FF] font-semibold mt-0.5">
              {edu.institution}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
            {edu.details}
          </p>

          <div className="space-y-2 pt-3 border-t border-white/10">
            <h4 className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider font-bold">
              Core Academic Disciplines
            </h4>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <div className="glass-card-interactive p-2.5 rounded-xl text-xs font-mono text-[#E2E8F0]">
                • Software Testing, Verification & Validation
              </div>
              <div className="glass-card-interactive p-2.5 rounded-xl text-xs font-mono text-[#E2E8F0]">
                • Data Structures & Advanced Algorithms
              </div>
              <div className="glass-card-interactive p-2.5 rounded-xl text-xs font-mono text-[#E2E8F0]">
                • Distributed Systems & Cloud Architecture
              </div>
              <div className="glass-card-interactive p-2.5 rounded-xl text-xs font-mono text-[#E2E8F0]">
                • Relational Database Design & Normalization
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};
