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
        <span className="px-3 py-1 rounded-full bg-[#121620] border border-[#242C3A] text-xs font-mono text-[#8E8E93]">
          PORTFOLIO · 3D FLIGHT EXPERIENCE
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121620] border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D]">
          <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-pulse" />
          <span>OPEN TO RELOCATION · UAE / GCC & LAHORE</span>
        </span>
      </motion.div>

      {/* Main Name */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#FFFFFF] tracking-tight mb-2 drop-shadow-2xl"
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
        <span className="font-mono text-lg sm:text-2xl text-[#C6FF3D] font-bold tracking-wide uppercase px-3 py-1 rounded bg-[#0A0E14]/70 border border-[#C6FF3D]/20 backdrop-blur-sm shadow-sm">
          {portfolioData.profile.roles[roleIndex]}
        </span>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-base sm:text-xl text-[#EDEDED] font-medium max-w-2xl leading-relaxed mb-4"
      >
        "{portfolioData.profile.tagline}"
      </motion.p>

      {/* Summary */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-xs sm:text-sm text-[#9CA3AF] max-w-2xl leading-relaxed mb-8"
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
          className="px-6 py-3 rounded-lg bg-[#C6FF3D] hover:bg-[#B4F524] text-[#07080A] font-mono text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#C6FF3D]/20 flex items-center gap-2 group cursor-pointer"
        >
          <span>EXPLORE PRODUCTION WORK</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <a
          href={portfolioData.profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-lg bg-[#11151F] hover:bg-[#1A202E] border border-[#262F40] hover:border-[#C6FF3D]/50 text-[#EDEDED] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>DOWNLOAD CV</span>
          <span className="text-[#C6FF3D]">↓</span>
        </a>

        <button
          onClick={() => goToStation(4)}
          className="px-5 py-3 rounded-lg bg-[#11151F] hover:bg-[#1A202E] border border-[#262F40] hover:border-[#C6FF3D]/50 text-[#EDEDED] font-mono text-xs sm:text-sm transition-all cursor-pointer"
        >
          CONTACT ME ✉
        </button>
      </motion.div>
    </div>
  );
};
