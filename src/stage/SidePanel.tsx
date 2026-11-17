import React from 'react';
import { Download, Linkedin, Layout, Search, Smartphone, MapPin, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useOS } from '../store/useOS';

export const LeftSidePanel: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between max-w-sm text-left py-6 select-none space-y-6">
      <div className="space-y-4">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-mono font-semibold">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>OPEN TO RELOCATION: UAE / GCC (1 MO)</span>
        </div>

        {/* Title & Name */}
        <div>
          <h1 className="text-4xl xl:text-5xl font-display font-black text-ink tracking-tight">
            {portfolioData.profile.name}
          </h1>
          <p className="text-sm font-mono font-bold text-accent mt-2 leading-snug">
            {portfolioData.profile.title}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-sm text-ink-muted leading-relaxed italic border-l-2 border-accent/40 pl-3">
          "{portfolioData.profile.tagline}"
        </p>

        {/* Short Summary */}
        <p className="text-xs text-ink-faint leading-relaxed">
          {portfolioData.profile.summary}
        </p>

        {/* Phone Experience Interactive Hint */}
        <div className="p-3.5 rounded-2xl bg-white border border-border shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Interactive Mobile OS</div>
            <p className="text-[11px] text-ink-muted">
              Tap the apps. Everything lives inside the phone.
            </p>
          </div>
        </div>
      </div>

      {/* Location and Relocation footnote */}
      <div className="text-[11px] font-mono text-ink-muted space-y-1 border-t border-border/80 pt-4">
        <div className="flex items-center gap-1.5 text-ink font-semibold">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>{portfolioData.profile.location}</span>
        </div>
        <p className="text-ink-faint">
          Full-time mobile / SQA developer · Visa sponsorship required
        </p>
      </div>
    </div>
  );
};

export const RightSidePanel: React.FC = () => {
  const toggleClassicView = useOS((state) => state.toggleClassicView);
  const setSpotlight = useOS((state) => state.setSpotlight);
  const addToast = useOS((state) => state.addToast);

  const handleDownload = () => {
    addToast('Downloading Afaq Mehmood Resume PDF...', 'info');
  };

  return (
    <div className="hidden lg:flex flex-col justify-between max-w-xs text-left py-6 select-none space-y-6">
      {/* Top Shortcuts Card */}
      <div className="bg-white p-5 rounded-3xl border border-border shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
          <span className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
            Quick Actions
          </span>
          <Sparkles className="w-3.5 h-3.5 text-accent" />
        </div>

        {/* Download CV Button */}
        <a
          href={portfolioData.profile.cv}
          download="Afaq_Mehmood_Resume.pdf"
          onClick={handleDownload}
          className="w-full py-2.5 px-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold flex items-center justify-between shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Download CV</span>
          </div>
          <span className="text-[10px] opacity-80 font-normal">PDF</span>
        </a>

        {/* LinkedIn Button */}
        <a
          href={portfolioData.profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3.5 rounded-xl bg-surface-alt hover:bg-white border border-border text-ink font-mono text-xs font-medium flex items-center justify-between transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            <span>LinkedIn</span>
          </div>
          <span className="text-xs text-ink-muted">↗</span>
        </a>

        {/* Spotlight Trigger */}
        <button
          onClick={() => setSpotlight(true)}
          className="w-full py-2 px-3 rounded-xl bg-surface-alt border border-border text-ink-muted hover:text-ink font-mono text-xs flex items-center justify-between transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-accent" />
            <span>Search (Spotlight)</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] text-ink-faint border border-border">
            Ctrl+K
          </kbd>
        </button>

        {/* Classic View Toggle (Recruiter Safety Net) */}
        <div className="pt-2 border-t border-border/60">
          <button
            onClick={toggleClassicView}
            className="w-full py-2 px-3 rounded-xl border border-dashed border-border hover:border-accent text-ink-muted hover:text-accent font-mono text-xs flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layout className="w-3.5 h-3.5" />
              <span>Classic 2D View</span>
            </div>
            <span className="text-[10px] text-accent font-bold">Switch</span>
          </button>
        </div>
      </div>

      {/* Keyboard navigation tips */}
      <div className="p-4 rounded-2xl bg-surface-alt border border-border text-[11px] font-mono text-ink-muted space-y-1.5">
        <div className="font-bold text-ink text-[10px] uppercase">Desktop Shortcuts</div>
        <div className="flex justify-between">
          <span>Search / Spotlight</span>
          <kbd className="px-1 bg-white rounded border border-border">Ctrl+K</kbd>
        </div>
        <div className="flex justify-between">
          <span>Go Home</span>
          <kbd className="px-1 bg-white rounded border border-border">H</kbd>
        </div>
        <div className="flex justify-between">
          <span>Back</span>
          <kbd className="px-1 bg-white rounded border border-border">Esc</kbd>
        </div>
      </div>
    </div>
  );
};
