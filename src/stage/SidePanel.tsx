import React from 'react';
import { Download, Linkedin, Layout, Search, Smartphone, MapPin, Sparkles, CheckCircle2, ShieldCheck, Rocket, Code2, Globe, ExternalLink, Play } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useOS } from '../store/useOS';

// Official published store apps data with direct links
const publishedApps = [
  {
    name: 'OutdoorShare',
    category: 'Vehicle Rental Marketplace',
    color: '#10b981',
    playStore: 'https://play.google.com/store/apps/details?id=com.mycompany.myoutdoorshareffapp',
    appStore: 'https://apps.apple.com/us/app/outdoorshare/id6746942574',
    web: 'https://outdoorshare.app',
  },
  {
    name: 'ForeCash',
    category: 'Financial Forecasting',
    color: '#a855f7',
    playStore: 'https://play.google.com/store/apps/details?id=com.mycompany.forecash',
    appStore: 'https://apps.apple.com/us/app/forecash-financial-forecasting/id6747763876',
  },
  {
    name: 'Sole by SoleTies',
    category: 'Footwear E-Commerce',
    color: '#f59e0b',
    playStore: 'https://play.google.com/store/apps/details?id=com.soleapp.app',
    appStore: 'https://apps.apple.com/us/app/sole-by-soleties/id6766420640',
  },
  {
    name: 'WellQuest',
    category: 'Wellness & Habit Tracker',
    color: '#06b6d4',
    appStore: 'https://apps.apple.com/us/app/wellquest-wellness-tracker/id6764549163',
  },
];

export const LeftSidePanel: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between max-w-sm text-left py-2 select-none space-y-4">
      <div className="space-y-4">
        {/* Editorial Poster Header (Jane Hawkins style) */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl xl:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-white tracking-tight uppercase">
              AFAQ MEHMOOD
            </h1>
            <span className="w-3 h-3 rounded-full bg-orange-500 shadow-md shadow-orange-500/50" />
          </div>
          <p className="text-xs font-mono font-bold text-orange-400 tracking-wider uppercase">
            Mobile App Developer · Software Engineer · SQA
          </p>
        </div>

        {/* Big Editorial Portrait Card with Graphic Accents */}
        <div className="relative group">
          <div className="glass-portrait-card rounded-3xl p-3 space-y-2.5 relative overflow-hidden">
            {/* Artistic Geometric Accents (Matching Reference Poster) */}
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-orange-500/20 blur-xl pointer-events-none" />
            <div className="absolute top-4 right-4 w-5 h-5 rounded-full border-2 border-white/60 pointer-events-none z-10" />
            <div className="absolute bottom-16 -left-3 w-8 h-8 rounded-full bg-orange-500/80 pointer-events-none z-10" />

            {/* The Big Portrait Image */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F19] shadow-2xl">
              <img
                src="/me.png"
                alt={portfolioData.profile.name}
                className="w-full h-full object-cover object-top filter contrast-[1.08] brightness-[1.02] transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/afaq.png';
                }}
              />

              {/* Gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/25 to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0F19]/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                <span>OPEN: UAE / GCC (1 MO)</span>
              </div>

              {/* Name & Quick Badges Overlay */}
              <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                <div>
                  <div className="text-white font-bold text-sm leading-tight flex items-center gap-1">
                    <span>{portfolioData.profile.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="text-[10px] font-mono text-ink-muted">
                    {portfolioData.profile.location}
                  </div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/40 shrink-0">
                  3+ Yrs Exp
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar under photo */}
            <div className="grid grid-cols-3 gap-1 text-center pt-1 border-t border-white/10">
              <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-xs font-bold text-orange-400 font-mono">4 Stores</div>
                <div className="text-[8px] text-ink-muted leading-none mt-0.5">Live Apps</div>
              </div>
              <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-xs font-bold text-emerald-400 font-mono">100%</div>
                <div className="text-[8px] text-ink-muted leading-none mt-0.5">Release QA</div>
              </div>
              <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/5">
                <div className="text-xs font-bold text-sky-400 font-mono">45 Tools</div>
                <div className="text-[8px] text-ink-muted leading-none mt-0.5">Arsenal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Published Apps Store Directory Card */}
        <div className="glass-panel rounded-2xl p-3.5 space-y-2 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-orange-400" />
              <span>Published Store Apps</span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>

          <div className="space-y-1.5">
            {publishedApps.map((app) => (
              <div
                key={app.name}
                className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-orange-500/40 transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-white truncate">{app.name}</div>
                  <div className="text-[9px] text-ink-muted truncate">{app.category}</div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {app.appStore && (
                    <a
                      href={app.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded-lg bg-black/60 hover:bg-black border border-white/15 text-[10px] text-white font-mono flex items-center gap-1 transition-all hover:border-accent"
                      title={`${app.name} on Apple App Store`}
                    >
                      <span></span>
                      <ExternalLink className="w-2.5 h-2.5 text-accent" />
                    </a>
                  )}

                  {app.playStore && (
                    <a
                      href={app.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded-lg bg-black/60 hover:bg-black border border-white/15 text-[10px] text-white font-mono flex items-center gap-1 transition-all hover:border-emerald-400"
                      title={`${app.name} on Google Play`}
                    >
                      <Play className="w-2.5 h-2.5 text-emerald-400 fill-emerald-400" />
                      <ExternalLink className="w-2.5 h-2.5 text-emerald-400" />
                    </a>
                  )}

                  {app.web && (
                    <a
                      href={app.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded-lg bg-black/60 hover:bg-black border border-white/15 text-[10px] text-white font-mono flex items-center gap-1 transition-all hover:border-sky-400"
                      title={`${app.name} Web App`}
                    >
                      <Globe className="w-2.5 h-2.5 text-sky-400" />
                      <ExternalLink className="w-2.5 h-2.5 text-sky-400" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tagline Card */}
        <div className="glass-pill rounded-xl p-3 border-l-2 border-l-accent text-[11px] text-ink-muted italic leading-relaxed">
          "{portfolioData.profile.tagline}"
        </div>
      </div>

      {/* Location footnote */}
      <div className="text-[10px] font-mono text-ink-muted space-y-1 border-t border-white/10 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-1 text-white">
          <MapPin className="w-3 h-3 text-orange-400" />
          <span>{portfolioData.profile.location}</span>
        </div>
        <span className="text-emerald-400 font-bold">Relocation: 1 Month</span>
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
    <div className="hidden lg:flex flex-col justify-between max-w-xs text-left py-2 select-none space-y-4">
      {/* Top Shortcuts Card in Frosted Glass */}
      <div className="glass-panel p-5 rounded-3xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Quick Actions</span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
        </div>

        {/* Download CV Button */}
        <a
          href={portfolioData.profile.cv}
          download="Afaq_Mehmood_Resume.pdf"
          onClick={handleDownload}
          className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-mono text-xs font-bold flex items-center justify-between shadow-lg shadow-orange-500/25 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
            <span>Download CV</span>
          </div>
          <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-bold">152 KB</span>
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
          className="w-full py-2 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-ink-muted hover:text-white font-mono text-xs flex items-center justify-between transition-all cursor-pointer shadow-sm hover:border-orange-500/40"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-orange-400" />
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
            className="w-full py-2 px-3 rounded-xl border border-dashed border-white/20 hover:border-orange-400 text-ink-muted hover:text-orange-400 font-mono text-xs flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layout className="w-3.5 h-3.5" />
              <span>Classic 2D View</span>
            </div>
            <span className="text-[10px] text-orange-400 font-bold">Switch</span>
          </button>
        </div>
      </div>

      {/* About & SQA Engineering Summary Card */}
      <div className="glass-panel p-4 rounded-2xl space-y-2 border-l-2 border-l-emerald-500 text-left">
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold text-xs uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>SQA & Mobile Developer</span>
        </div>
        <p className="text-[11px] text-ink-muted leading-relaxed">
          I build mobile apps that ship to App Store & Google Play, and test them with regression suites, edge-case analysis, and automated workflows.
        </p>
      </div>

      {/* Keyboard navigation tips */}
      <div className="glass-pill p-3.5 rounded-2xl text-[11px] font-mono text-ink-muted space-y-1.5">
        <div className="font-bold text-white text-[10px] uppercase tracking-wider">Shortcuts</div>
        <div className="flex justify-between">
          <span>Search</span>
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
      <div className="hidden sm:flex lg:hidden flex-col gap-2.5 absolute left-3 xl:left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto max-w-[210px]">
        {/* User Portrait Card in Glass */}
        <div className="glass-portrait-card rounded-3xl p-3 text-left space-y-2">
          <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F19] shadow-inner">
            <img
              src="/me.png"
              alt={portfolioData.profile.name}
              className="w-full h-full object-cover object-top filter contrast-[1.08]"
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
              <div className="text-[9px] font-mono text-orange-400 truncate">Mobile & SQA Dev</div>
            </div>
          </div>

          {/* Quick published store apps indicators */}
          <div className="space-y-1 pt-1 border-t border-white/10">
            <div className="text-[9px] font-mono font-bold text-orange-400 uppercase">Live Stores</div>
            <div className="flex flex-wrap gap-1">
              <a
                href="https://apps.apple.com/us/app/forecash-financial-forecasting/id6747763876"
                target="_blank"
                rel="noopener noreferrer"
                className="px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-white border border-white/10 hover:border-accent"
              >
                 App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.mycompany.forecash"
                target="_blank"
                rel="noopener noreferrer"
                className="px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-emerald-400 border border-white/10 hover:border-emerald-400"
              >
                ▶ Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Relocation badge */}
        <div className="glass-pill p-2 rounded-2xl text-left space-y-0.5">
          <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
            <Globe className="w-3 h-3" />
            <span>UAE / GCC (1 Mo)</span>
          </div>
          <p className="text-[8px] text-ink-muted leading-tight">
            Open to relocation & Lahore roles.
          </p>
        </div>
      </div>

      {/* Right Flanking Badges (Tablet & Lovable Preview) */}
      <div className="hidden sm:flex lg:hidden flex-col gap-2.5 absolute right-3 xl:right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-auto max-w-[190px]">
        {/* Quick Action: Download CV */}
        <a
          href={portfolioData.profile.cv}
          download="Afaq_Mehmood_Resume.pdf"
          onClick={handleDownload}
          className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-xs shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-black" />
            <span>Resume PDF</span>
          </div>
          <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded font-mono">152 KB</span>
        </a>

        <div className="glass-pill p-2.5 rounded-2xl text-left space-y-1">
          <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold">
            <Rocket className="w-3.5 h-3.5" />
            <span>4 Published Apps</span>
          </div>
          <p className="text-[9px] text-ink-muted leading-tight">
            ForeCash, OutdoorShare, Sole by SoleTies, WellQuest.
          </p>
        </div>

        {/* Quick Toggle Classic View */}
        <button
          onClick={toggleClassicView}
          className="glass-panel p-2.5 rounded-2xl hover:border-orange-400 text-white text-xs font-medium flex items-center justify-between cursor-pointer group transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5 text-orange-400" />
            <span>Classic 2D</span>
          </div>
          <span className="text-[10px] text-orange-400 font-mono font-bold group-hover:underline">Switch</span>
        </button>
      </div>
    </>
  );
};
