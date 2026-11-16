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
      {/* 3D Glass Hero Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl w-full flex flex-col items-center shadow-[0_24px_70px_rgba(0,0,0,0.7)]"
      >
        {/* Top Tag & Status */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
          <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-mono text-[#94A3B8]">
            PORTFOLIO · 3D FLIGHT WORLD
          </span>
          <span className="glass-pill inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
            <span>OPEN TO RELOCATION · UAE / GCC & LAHORE</span>
          </span>
        </div>

        {/* Main Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#FFFFFF] tracking-tight mb-2 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          AFAQ MEHMOOD
        </h1>

        {/* Dynamic Role Badge */}
        <div className="h-10 flex items-center justify-center mb-4">
          <span className="glass-pill font-mono text-base sm:text-xl text-[#00E5FF] font-bold tracking-wide uppercase px-5 py-1.5 rounded-full border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
            {portfolioData.profile.roles[roleIndex]}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-xl text-[#F1F5F9] font-medium max-w-2xl leading-relaxed mb-4">
          "{portfolioData.profile.tagline}"
        </p>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed mb-8">
          {portfolioData.profile.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          <button
            onClick={() => goToStation(1)}
            className="px-7 py-3.5 rounded-full bg-[#00E5FF] hover:bg-[#00C4DB] text-[#06080F] font-mono text-xs sm:text-sm font-bold transition-all shadow-[0_0_25px_rgba(0,229,255,0.45)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] flex items-center gap-2 group cursor-pointer"
          >
            <span>EXPLORE PRODUCTION WORK</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <a
            href={portfolioData.profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill px-6 py-3.5 rounded-full text-[#F1F5F9] hover:text-[#00E5FF] hover:border-[#00E5FF]/50 font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <span>DOWNLOAD CV</span>
            <span className="text-[#00E5FF]">↓</span>
          </a>

          <button
            onClick={() => goToStation(4)}
            className="glass-pill px-6 py-3.5 rounded-full text-[#F1F5F9] hover:text-[#00E5FF] hover:border-[#00E5FF]/50 font-mono text-xs sm:text-sm transition-all cursor-pointer shadow-lg"
          >
            CONTACT ME ✉
          </button>
        </div>
      </motion.div>
    </div>
  );
};
