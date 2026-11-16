import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNav } from '../../store/useNav';
import { portfolioData } from '../../data/portfolio';

export const HubView: React.FC = () => {
  const goToStation = useNav((state) => state.goToStation);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioData.profile.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center text-center px-4 py-8 select-none">
      {/* Top Tag & Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-2.5 mb-4"
      >
        <span className="px-3.5 py-1 rounded-full bg-[#0C101A] border border-[#1A2333] text-xs font-mono text-[#94A3B8]">
          PORTFOLIO · 3D FLIGHT EXPERIENCE
        </span>
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0C101A] border border-[#00E5FF]/40 text-xs font-mono text-[#00E5FF]">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <span>OPEN TO RELOCATION · UAE / GCC & LAHORE</span>
        </span>
      </motion.div>

      {/* Main Name */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#FFFFFF] tracking-tight mb-2 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      >
        AFAQ MEHMOOD
      </motion.h1>

      {/* Role Switcher */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-10 flex items-center justify-center mb-4"
      >
        <span className="font-mono text-lg sm:text-2xl text-[#00E5FF] font-bold tracking-wide uppercase px-4 py-1 rounded-lg bg-[#0C101A]/80 border border-[#00E5FF]/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          {portfolioData.profile.roles[roleIndex]}
        </span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-base sm:text-xl text-[#F1F5F9] font-medium max-w-2xl leading-relaxed mb-4"
      >
        "{portfolioData.profile.tagline}"
      </motion.p>

      {/* Summary */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed mb-8"
      >
        {portfolioData.profile.summary}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto"
      >
        <button
          onClick={() => goToStation(1)}
          className="px-6 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#00C4DB] text-[#06080F] font-mono text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.35)] flex items-center gap-2 group cursor-pointer"
        >
          <span>EXPLORE PRODUCTION WORK</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <a
          href={portfolioData.profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-[#0C101A] hover:bg-[#131926] border border-[#1A2333] hover:border-[#00E5FF]/50 text-[#F1F5F9] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>DOWNLOAD CV</span>
          <span className="text-[#00E5FF]">↓</span>
        </a>

        <button
          onClick={() => goToStation(4)}
          className="px-5 py-3 rounded-xl bg-[#0C101A] hover:bg-[#131926] border border-[#1A2333] hover:border-[#00E5FF]/50 text-[#F1F5F9] font-mono text-xs sm:text-sm transition-all cursor-pointer"
        >
          CONTACT ME ✉
        </button>
      </motion.div>
    </div>
  );
};
