import React from 'react';
import { Download, Linkedin, Layout, Search, Smartphone, MapPin, Sparkles, CheckCircle2, ShieldCheck, Rocket, Code2, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useOS } from '../store/useOS';

export const LeftSidePanel: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between max-w-sm text-left py-6 select-none space-y-6">
      <div className="space-y-4">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>OPEN TO RELOCATION: UAE / GCC (1 MO)</span>
        </div>

        {/* Title & Name */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl xl:text-5xl font-display font-black text-white tracking-tight">
              {portfolioData.profile.name}
            </h1>
            <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
          </div>
          <p className="text-sm font-mono font-bold text-accent mt-2 leading-snug">
            {portfolioData.profile.title}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-sm text-ink-muted leading-relaxed italic border-l-2 border-accent pl-3">
          "{portfolioData.profile.tagline}"
        </p>

        {/* Short Summary */}
        <p className="text-xs text-ink-muted leading-relaxed">
          {portfolioData.profile.summary}
        </p>

        {/* Phone Experience Interactive Hint */}
        <div className="p-4 rounded-2xl bg-[#141B28]/90 border border-border backdrop-blur-md shadow-card flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0 border border-accent/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Interactive Smartphone OS</div>
            <p className="text-[11px] text-ink-muted">
              Tap the apps inside the phone to explore projects, skills & career.
            </p>
          </div>
        </div>
      </div>

      {/* Location and Relocation footnote */}
      <div className="text-[11px] font-mono text-ink-muted space-y-1 border-t border-border pt-4">
        <div className="flex items-center gap-1.5 text-white font-semibold">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>{portfolioData.profile.location}</span>
        </div>
        <p className="text-ink-faint">
          Full-time mobile / SQA developer · Open to UAE/GCC & Lahore
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
    addToast('Downloading Afaq Mehmood Resume PDF (152 KB)...', 'success');
  };

  return (
    <div className="hidden lg:flex flex-col justify-between max-w-xs text-left py-6 select-none space-y-6">
      {/* Top Shortcuts Card */}
      <div className="bg-[#141B28]/90 backdrop-blur-md p-5 rounded-3xl border border-border shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Quick Actions
          </span>
          <Sparkles className="w-3.5 h-3.5 text-accent" />
        </div>

        {/* Download CV Button */}
        <a
          href={portfolioData.profile.cv}
          download="Afaq_Mehmood_Resume.pdf"
          onClick={handleDownload}
          className="w-full py-2.5 px-3.5 rounded-xl bg-accent hover:bg-accent-hover text-black font-mono text-xs font-bold flex items-center justify-between shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-black" />
            <span>Download CV</span>
          </div>
          <span className="text-[10px] bg-black/15 px-1.5 py-0.5 rounded font-bold">152 KB</span>
        </a>

        {/* LinkedIn Button */}
        <a
          href={portfolioData.profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3.5 rounded-xl bg-surface-alt hover:bg-white/10 border border-border text-white font-mono text-xs font-medium flex items-center justify-between transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            <span>LinkedIn Profile</span>
          </div>
          <span className="text-xs text-ink-muted">↗</span>
        </a>

        {/* Spotlight Trigger */}
        <button
          onClick={() => setSpotlight(true)}
          className="w-full py-2 px-3 rounded-xl bg-surface-alt border border-border text-ink-muted hover:text-white font-mono text-xs flex items-center justify-between transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-accent" />
            <span>Search (Spotlight)</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/80 border border-white/10">
            Ctrl+K
          </kbd>
        </button>

        {/* Classic View Toggle (Recruiter Safety Net) */}
        <div className="pt-2 border-t border-border">
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
      <div className="p-4 rounded-2xl bg-[#141B28]/90 backdrop-blur-md border border-border text-[11px] font-mono text-ink-muted space-y-1.5 shadow-card">
        <div className="font-bold text-white text-[10px] uppercase">Desktop Shortcuts</div>
        <div className="flex justify-between">
          <span>Search / Spotlight</span>
          <kbd className="px-1 bg-white/10 rounded border border-white/10 text-white">Ctrl+K</kbd>
        </div>
        <div className="flex justify-between">
          <span>Go Home</span>
          <kbd className="px-1 bg-white/10 rounded border border-white/10 text-white">H</kbd>
        </div>
        <div className="flex justify-between">
          <span>Back</span>
          <kbd className="px-1 bg-white/10 rounded border border-white/10 text-white">Esc</kbd>
        </div>
      </div>
    </div>
  );
};

/* Floating Stage Badges (Visible on tablet & medium laptop viewports around the phone) */
export const FloatingStageBadges: React.FC = () => {
  const toggleClassicView = useOS((state) => state.toggleClassicView);
  const addToast = useOS((state) => state.addToast);

  const handleDownload = () => {
    addToast('Downloading Afaq Mehmood Resume PDF (152 KB)...', 'success');
  };

  return (
    <>
      {/* Left Flanking Badges (Tablet / Medium Desktop) */}
      <div className="hidden sm:flex lg:hidden flex-col gap-3 absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto max-w-[190px]">
        <div className="p-3 rounded-2xl bg-[#141B28]/90 border border-border backdrop-blur-md shadow-lg space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-accent text-xs font-bold">
            <Rocket className="w-3.5 h-3.5" />
            <span>8 Store Apps</span>
          </div>
          <p className="text-[10px] text-ink-muted leading-tight">
            App Store & Play Store published mobile apps.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#141B28]/90 border border-border backdrop-blur-md shadow-lg space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Release QA</span>
          </div>
          <p className="text-[10px] text-ink-muted leading-tight">
            End-to-end testing, test cases, and bug tracking.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-[#141B28]/90 border border-border backdrop-blur-md shadow-lg space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold">
            <Code2 className="w-3.5 h-3.5" />
            <span>45 Tech Tools</span>
          </div>
          <p className="text-[10px] text-ink-muted leading-tight">
            FlutterFlow, Dart, React, Supabase, Firebase.
          </p>
        </div>
      </div>

      {/* Right Flanking Badges (Tablet / Medium Desktop) */}
      <div className="hidden sm:flex lg:hidden flex-col gap-3 absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto max-w-[190px]">
        {/* Quick Action: Download CV */}
        <a
          href={portfolioData.profile.cv}
          download="Afaq_Mehmood_Resume.pdf"
          onClick={handleDownload}
          className="p-3 rounded-2xl bg-accent text-black font-bold text-xs shadow-lg shadow-cyan-500/20 hover:bg-accent-hover transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-black" />
            <span>Resume PDF</span>
          </div>
          <span className="text-[9px] bg-black/15 px-1.5 py-0.5 rounded font-mono">152 KB</span>
        </a>

        <div className="p-3 rounded-2xl bg-[#141B28]/90 border border-border backdrop-blur-md shadow-lg space-y-1 text-left">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
            <Globe className="w-3.5 h-3.5" />
            <span>UAE / GCC (1 Mo)</span>
          </div>
          <p className="text-[10px] text-ink-muted leading-tight">
            Open to relocation within 1 month. Also Lahore.
          </p>
        </div>

        {/* Quick Toggle Classic View */}
        <button
          onClick={toggleClassicView}
          className="p-3 rounded-2xl bg-[#141B28]/90 border border-dashed border-border hover:border-accent text-white text-xs font-medium backdrop-blur-md shadow-lg flex items-center justify-between cursor-pointer group transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-accent" />
            <span>Classic 2D</span>
          </div>
          <span className="text-[10px] text-accent font-mono font-bold group-hover:underline">Switch</span>
        </button>
      </div>
    </>
  );
};
