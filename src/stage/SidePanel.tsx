import React from 'react';
import { Download, Linkedin, Layout, Search, Smartphone, MapPin, Sparkles, CheckCircle2, ShieldCheck, Rocket, Code2, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useOS } from '../store/useOS';

export const LeftSidePanel: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between max-w-sm text-left py-4 select-none space-y-5">
      <div className="space-y-4">
        {/* Big User Portrait Hero Glass Card */}
        <div className="relative group">
          <div className="glass-portrait-card rounded-3xl p-3.5 space-y-3">
            {/* The Big Portrait Image */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F19] shadow-inner group">
              <img
                src="/me.png"
                alt={portfolioData.profile.name}
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[1.02] transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/afaq.png';
                }}
              />

              {/* Gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/25 to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F19]/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                <span>OPEN: UAE / GCC (1 MO)</span>
              </div>

              {/* Verified Developer Badge */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B0F19]/80 backdrop-blur-md border border-white/15 text-accent text-[10px] font-mono font-bold shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Verified Dev</span>
              </div>

              {/* Name & Title Overlay */}
              <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                <div>
                  <h1 className="text-xl font-display font-black text-white tracking-tight leading-tight">
                    {portfolioData.profile.name}
                  </h1>
                  <p className="text-[11px] font-mono font-bold text-accent">
                    {portfolioData.profile.title}
                  </p>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent font-bold border border-accent/30 shrink-0">
                  3+ Yrs Exp
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar under photo inside glass card */}
            <div className="grid grid-cols-3 gap-1.5 text-center pt-1 border-t border-white/10">
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-xs font-bold text-accent font-mono">8 Apps</div>
                <div className="text-[9px] text-ink-muted leading-none mt-0.5">App Store</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-xs font-bold text-emerald-400 font-mono">100%</div>
                <div className="text-[9px] text-ink-muted leading-none mt-0.5">Release QA</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-xs font-bold text-sky-400 font-mono">45 Tools</div>
                <div className="text-[9px] text-ink-muted leading-none mt-0.5">Full Stack</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline Card in Frosted Glass */}
        <div className="glass-pill rounded-2xl p-3 border-l-4 border-l-accent space-y-1">
          <p className="text-xs text-white font-medium italic">
            "{portfolioData.profile.tagline}"
          </p>
          <p className="text-[11px] text-ink-muted leading-relaxed">
            {portfolioData.profile.summary}
          </p>
        </div>

        {/* Phone Experience Interactive Hint (Glass Panel) */}
        <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0 border border-accent/25 shadow-inner">
            <Smartphone className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Interactive Smartphone OS</div>
            <p className="text-[11px] text-ink-muted leading-tight mt-0.5">
              Tap the apps inside the phone to explore projects, skills & career.
            </p>
          </div>
        </div>
      </div>

      {/* Location and Relocation footnote */}
      <div className="text-[11px] font-mono text-ink-muted space-y-1 border-t border-white/10 pt-3">
        <div className="flex items-center gap-1.5 text-white font-semibold">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span>{portfolioData.profile.location}</span>
        </div>
        <p className="text-ink-faint text-[10px]">
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
    <div className="hidden lg:flex flex-col justify-between max-w-xs text-left py-4 select-none space-y-5">
      {/* Top Shortcuts Card in Frosted Glass */}
      <div className="glass-panel p-5 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
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
          className="w-full py-2.5 px-3.5 rounded-xl bg-accent hover:bg-accent-hover text-black font-mono text-xs font-bold flex items-center justify-between shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
            <span>Download CV</span>
          </div>
          <span className="text-[10px] bg-black/15 px-1.5 py-0.5 rounded font-bold">152 KB</span>
        </a>

        {/* LinkedIn Button */}
        <a
          href={portfolioData.profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs font-medium flex items-center justify-between transition-all cursor-pointer shadow-sm"
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
          className="w-full py-2 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-ink-muted hover:text-white font-mono text-xs flex items-center justify-between transition-all cursor-pointer shadow-sm hover:border-accent/40"
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
        <div className="pt-2 border-t border-white/10">
          <button
            onClick={toggleClassicView}
            className="w-full py-2 px-3 rounded-xl border border-dashed border-white/20 hover:border-accent text-ink-muted hover:text-accent font-mono text-xs flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layout className="w-3.5 h-3.5" />
              <span>Classic 2D View</span>
            </div>
            <span className="text-[10px] text-accent font-bold">Switch</span>
          </button>
        </div>
      </div>

      {/* Keyboard navigation tips in Glass Pill Card */}
      <div className="glass-pill p-4 rounded-2xl text-[11px] font-mono text-ink-muted space-y-1.5">
        <div className="font-bold text-white text-[10px] uppercase tracking-wider">Desktop Shortcuts</div>
        <div className="flex justify-between">
          <span>Search / Spotlight</span>
          <kbd className="px-1.5 bg-white/10 rounded border border-white/10 text-white text-[10px]">Ctrl+K</kbd>
        </div>
        <div className="flex justify-between">
          <span>Go Home</span>
          <kbd className="px-1.5 bg-white/10 rounded border border-white/10 text-white text-[10px]">H</kbd>
        </div>
        <div className="flex justify-between">
          <span>Back</span>
          <kbd className="px-1.5 bg-white/10 rounded border border-white/10 text-white text-[10px]">Esc</kbd>
        </div>
      </div>
    </div>
  );
};

/* Floating Stage Badges (Visible on tablet & Lovable preview viewports around the phone) */
export const FloatingStageBadges: React.FC = () => {
  const toggleClassicView = useOS((state) => state.toggleClassicView);
  const addToast = useOS((state) => state.addToast);

  const handleDownload = () => {
    addToast('Downloading Afaq Mehmood Resume PDF (152 KB)...', 'success');
  };

  return (
    <>
      {/* Left Flanking Profile Card (Tablet & Lovable Preview) */}
      <div className="hidden sm:flex lg:hidden flex-col gap-3 absolute left-3 xl:left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto max-w-[210px]">
        {/* User Portrait Card in Glass */}
        <div className="glass-portrait-card rounded-3xl p-3 text-left space-y-2.5">
          <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F19] shadow-inner">
            <img
              src="/me.png"
              alt={portfolioData.profile.name}
              className="w-full h-full object-cover object-top filter contrast-[1.05]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/afaq.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0B0F19]/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[9px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available</span>
            </div>

            <div className="absolute bottom-1.5 left-2 right-2">
              <div className="text-xs font-bold text-white truncate">{portfolioData.profile.name}</div>
              <div className="text-[9px] font-mono text-accent truncate">Mobile & SQA Dev</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 text-center">
            <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
              <div className="text-[11px] font-bold text-accent font-mono">8 Apps</div>
              <div className="text-[8px] text-ink-muted">Store Ready</div>
            </div>
            <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
              <div className="text-[11px] font-bold text-emerald-400 font-mono">100%</div>
              <div className="text-[8px] text-ink-muted">QA Rate</div>
            </div>
          </div>
        </div>

        {/* Relocation badge */}
        <div className="glass-pill p-2.5 rounded-2xl text-left space-y-0.5">
          <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-bold">
            <Globe className="w-3 h-3" />
            <span>UAE / GCC (1 Mo)</span>
          </div>
          <p className="text-[9px] text-ink-muted leading-tight">
            Open to relocation & Lahore roles.
          </p>
        </div>
      </div>

      {/* Right Flanking Badges (Tablet & Lovable Preview) */}
      <div className="hidden sm:flex lg:hidden flex-col gap-3 absolute right-3 xl:right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto max-w-[190px]">
        {/* Quick Action: Download CV */}
        <a
          href={portfolioData.profile.cv}
          download="Afaq_Mehmood_Resume.pdf"
          onClick={handleDownload}
          className="p-3 rounded-2xl bg-accent text-black font-bold text-xs shadow-lg shadow-cyan-500/25 hover:bg-accent-hover transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-black" />
            <span>Resume PDF</span>
          </div>
          <span className="text-[9px] bg-black/15 px-1.5 py-0.5 rounded font-mono">152 KB</span>
        </a>

        <div className="glass-pill p-3 rounded-2xl text-left space-y-1">
          <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold">
            <Code2 className="w-3.5 h-3.5" />
            <span>45 Tech Tools</span>
          </div>
          <p className="text-[10px] text-ink-muted leading-tight">
            FlutterFlow, Dart, React, Supabase, Firebase.
          </p>
        </div>

        {/* Quick Toggle Classic View */}
        <button
          onClick={toggleClassicView}
          className="glass-panel p-3 rounded-2xl hover:border-accent text-white text-xs font-medium flex items-center justify-between cursor-pointer group transition-colors"
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
