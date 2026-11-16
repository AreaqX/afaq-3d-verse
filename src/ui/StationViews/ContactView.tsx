import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import { useNav } from '../../store/useNav';

export const ContactView: React.FC = () => {
  const addToast = useNav((state) => state.addToast);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    addToast(`Email copied: ${portfolioData.profile.email}`, 'success');
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-full flex flex-col justify-center items-center text-center py-6 px-4 md:px-8 select-none pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl space-y-6 pointer-events-auto w-full shadow-[0_24px_70px_rgba(0,0,0,0.7)]"
      >
        {/* Beacon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border-[#00E5FF]/40 text-xs font-mono text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping shadow-[0_0_8px_#00E5FF]" />
          <span>TRANSMISSION BEACON ONLINE</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-display font-black text-[#FFFFFF] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          Let's build something reliable.
        </h2>

        {/* Summary Description */}
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          Open to full-time Mobile Application Developer, Software Engineer, and SQA roles. Immediate availability for on-site roles in UAE / GCC or Lahore, and open to global hybrid teams.
        </p>

        {/* Status Callout Box */}
        <div className="glass-card-interactive p-4 sm:p-5 rounded-2xl max-w-lg mx-auto text-left space-y-2 font-mono text-xs text-[#CBD5E1]">
          <div className="flex items-center gap-2 text-[#00E5FF]">
            <span>📍</span>
            <span className="font-bold">LOCATION:</span>
            <span>{portfolioData.profile.location}</span>
          </div>
          <div className="flex items-center gap-2 text-[#F1F5F9]">
            <span>✈</span>
            <span className="font-bold">RELOCATION:</span>
            <span>UAE / GCC (Available within 1 month) & Lahore</span>
          </div>
          {portfolioData.profile.phone && (
            <div className="flex items-center gap-2 text-[#94A3B8]">
              <span>📞</span>
              <span className="font-bold">PHONE:</span>
              <a href={`tel:${portfolioData.profile.phone.replace(/\s+/g, '')}`} className="text-[#00E5FF] hover:underline">
                {portfolioData.profile.phone}
              </a>
            </div>
          )}
        </div>

        {/* Action Buttons Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`mailto:${portfolioData.profile.email}`}
            className="px-6 py-3.5 rounded-xl bg-[#00E5FF] hover:bg-[#00C4DB] text-[#06080F] font-mono text-xs sm:text-sm font-bold transition-all shadow-[0_0_24px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>SEND EMAIL</span>
            <span>↗</span>
          </a>

          <button
            onClick={handleCopyEmail}
            className="glass-card-interactive px-5 py-3.5 rounded-xl text-[#F1F5F9] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:border-[#00E5FF]/50"
          >
            <span>COPY EMAIL</span>
            <span>📋</span>
          </button>

          <a
            href={portfolioData.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card-interactive px-5 py-3.5 rounded-xl text-[#F1F5F9] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:border-[#00E5FF]/50"
          >
            <span>LINKEDIN</span>
            <span>↗</span>
          </a>

          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card-interactive px-5 py-3.5 rounded-xl text-[#F1F5F9] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:border-[#00E5FF]/50"
          >
            <span>DOWNLOAD CV</span>
            <span className="text-[#00E5FF]">↓</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
