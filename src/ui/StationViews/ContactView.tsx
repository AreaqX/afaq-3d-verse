import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import { useNav } from '../../store/useNav';

export const ContactView: React.FC = () => {
  const addToast = useNav((state) => state.addToast);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    addToast('Email copied to clipboard (YOUR_EMAIL_HERE)', 'success');
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-full flex flex-col justify-center items-center text-center py-6 px-4 md:px-8 select-none pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-8 sm:p-12 rounded-3xl bg-[#0B0E14]/95 border border-[#232B3A] backdrop-blur-xl shadow-2xl space-y-6 pointer-events-auto w-full"
      >
        {/* Beacon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121620] border border-[#C6FF3D]/30 text-xs font-mono text-[#C6FF3D]">
          <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping" />
          <span>TRANSMISSION BEACON ONLINE</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#FFFFFF] tracking-tight">
          Let's build something reliable.
        </h2>

        {/* Summary Description */}
        <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
          Open to full-time Mobile Application Developer, Software Engineer, and SQA roles. Immediate availability for on-site roles in UAE / GCC or Lahore, and open to global hybrid teams.
        </p>

        {/* Status Callout Box */}
        <div className="p-4 rounded-xl bg-[#10141D] border border-[#1E2534] max-w-lg mx-auto text-left space-y-1 font-mono text-xs text-[#D1D5DB]">
          <div className="flex items-center gap-2 text-[#C6FF3D]">
            <span>📍</span>
            <span className="font-bold">LOCATION:</span>
            <span>{portfolioData.profile.location}</span>
          </div>
          <div className="flex items-center gap-2 text-[#EDEDED]">
            <span>✈</span>
            <span className="font-bold">RELOCATION:</span>
            <span>UAE / GCC (Available within 1 month) & Lahore</span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`mailto:${portfolioData.profile.email}`}
            className="px-6 py-3 rounded-xl bg-[#C6FF3D] hover:bg-[#B4F524] text-[#07080A] font-mono text-xs sm:text-sm font-bold transition-all shadow-lg shadow-[#C6FF3D]/20 flex items-center gap-2 cursor-pointer"
          >
            <span>SEND EMAIL</span>
            <span>↗</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="px-5 py-3 rounded-xl bg-[#121620] hover:bg-[#1A2130] border border-[#263042] hover:border-[#C6FF3D]/50 text-[#EDEDED] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>COPY EMAIL</span>
            <span>📋</span>
          </button>

          <a
            href={portfolioData.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#121620] hover:bg-[#1A2130] border border-[#263042] hover:border-[#C6FF3D]/50 text-[#EDEDED] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>LINKEDIN</span>
            <span>↗</span>
          </a>

          <a
            href={portfolioData.profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#121620] hover:bg-[#1A2130] border border-[#263042] hover:border-[#C6FF3D]/50 text-[#EDEDED] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>RESUME PDF</span>
            <span className="text-[#C6FF3D]">↓</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
