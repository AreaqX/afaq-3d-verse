import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  User,
  Cpu,
  MapPin,
  FileText,
  MessageSquare,
  Bug,
  Settings,
  Briefcase,
  Search,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Star,
  Download,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { useOS, AppId } from '../store/useOS';
import { portfolioData } from '../data/portfolio';
import { Dock } from './Dock';

interface AppIconItem {
  id: AppId;
  name: string;
  icon: React.ElementType;
  gradient: string;
  badge?: string;
  badgeColor?: string;
  isPortrait?: boolean;
}

export const HomeScreen: React.FC = () => {
  const openApp = useOS((state) => state.openApp);
  const setSelectedProject = useOS((state) => state.setSelectedProject);
  const setSpotlight = useOS((state) => state.setSpotlight);
  const addToast = useOS((state) => state.addToast);

  // Rotating roles for widget
  const [roleIdx, setRoleIdx] = useState(0);
  const roles = [
    'Senior Mobile Developer',
    'Full-Stack Software Engineer',
    'SQA & Security Specialist',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const apps: AppIconItem[] = [
    {
      id: 'projects',
      name: 'Projects',
      icon: LayoutGrid,
      gradient: 'bg-gradient-to-tr from-[#0052D4] via-[#4364F7] to-[#6FB1FC]',
      badge: '8 APPS',
      badgeColor: 'bg-sky-500',
    },
    {
      id: 'about',
      name: 'About',
      icon: User,
      gradient: 'bg-gradient-to-tr from-[#1E293B] to-[#334155]',
      isPortrait: true,
      badge: 'VERIFIED',
      badgeColor: 'bg-emerald-500',
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: Cpu,
      gradient: 'bg-gradient-to-tr from-[#065F46] via-[#059669] to-[#10B981]',
      badge: '45 TOOLS',
      badgeColor: 'bg-emerald-500',
    },
    {
      id: 'journey',
      name: 'Journey',
      icon: MapPin,
      gradient: 'bg-gradient-to-tr from-[#581C87] via-[#7C3AED] to-[#A855F7]',
      badge: 'CAREER',
      badgeColor: 'bg-purple-500',
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: FileText,
      gradient: 'bg-gradient-to-tr from-[#1E293B] via-[#2A374F] to-[#3B82F6]',
      badge: '152 KB',
      badgeColor: 'bg-blue-500',
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: MessageSquare,
      gradient: 'bg-gradient-to-tr from-[#047857] via-[#10B981] to-[#34D399]',
      badge: 'ONLINE',
      badgeColor: 'bg-emerald-500',
    },
    {
      id: 'bughunt',
      name: 'Bug Hunt',
      icon: Bug,
      gradient: 'bg-gradient-to-tr from-[#C2410C] via-[#EA580C] to-[#FB923C]',
      badge: 'QA GAME',
      badgeColor: 'bg-amber-500',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      gradient: 'bg-gradient-to-tr from-[#334155] via-[#475569] to-[#64748B]',
    },
  ];

  // Featured flagship app for hero spotlight
  const featuredApp = portfolioData.projects[0]; // Outdoor Share

  const handleLaunchFeatured = () => {
    setSelectedProject(featuredApp.id);
    openApp('projects');
  };

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToast('Downloading Afaq Mehmood Resume PDF (152 KB)...', 'success');
  };

  return (
    <div className="w-full h-full flex flex-col justify-between pt-1 pb-2 px-3.5 select-none relative overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#080C15] via-[#0E1524] to-[#060910] text-white">
      {/* Background Decorative Ethereal Glow Spheres */}
      <div className="absolute top-10 -right-16 w-52 h-52 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 -left-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Top Search Pill Shortcut */}
      <div className="pt-0.5 px-0.5 shrink-0">
        <button
          onClick={() => setSpotlight(true)}
          className="w-full py-1.5 px-3 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 flex items-center justify-between text-ink-muted text-xs shadow-sm transition-all cursor-pointer backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] text-white/80 font-sans">
              Search apps, projects, 45 tools...
            </span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-white/70 border border-white/10">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Live Apple-Style Widgets Container */}
      <div className="space-y-2.5 py-2 px-0.5 shrink-0">
        {/* Widget 1: Profile & Status Card */}
        <div
          onClick={() => openApp('about')}
          className="screen-card p-3 rounded-2xl cursor-pointer hover:border-accent/40 transition-all flex items-center gap-3 relative overflow-hidden group"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-accent/15 blur-xl pointer-events-none" />

          {/* Avatar with live pulse radar */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20 shadow-md bg-surface-alt">
            <img
              src="/me.png"
              alt="Afaq Mehmood"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/afaq-mehmood.png';
              }}
            />
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0E1524]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-bold text-xs text-white truncate">Afaq Mehmood</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
              </div>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-semibold border border-emerald-500/30">
                HIRE ME
              </span>
            </div>

            <div className="text-[11px] font-mono font-medium text-accent truncate mt-0.5">
              {roles[roleIdx]}
            </div>

            <div className="flex items-center gap-2 mt-1.5">
              <a
                href={portfolioData.profile.cv}
                download="Afaq_Mehmood_Resume.pdf"
                onClick={handleDownloadCV}
                className="px-2 py-0.5 rounded-lg bg-accent/20 hover:bg-accent hover:text-black border border-accent/40 text-[10px] font-mono font-semibold text-accent transition-all flex items-center gap-1"
              >
                <Download className="w-2.5 h-2.5" />
                <span>CV (152 KB)</span>
              </a>

              <span className="text-[10px] text-ink-muted truncate">
                UAE / GCC · Lahore
              </span>
            </div>
          </div>
        </div>

        {/* Widget 2: Featured App Spotlight Banner */}
        <div
          onClick={handleLaunchFeatured}
          className="screen-card p-3 rounded-2xl cursor-pointer hover:border-accent/40 transition-all space-y-2 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-accent">
              <Sparkles className="w-3 h-3" />
              <span>FEATURED APP STORE RELEASE</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>5.0</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white shrink-0 shadow-sm border border-white/20">
              <LayoutGrid className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white truncate">
                  {featuredApp.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-mono text-white/90 group-hover:bg-accent group-hover:text-black transition-colors">
                  GET ›
                </span>
              </div>
              <p className="text-[10px] text-ink-muted line-clamp-1 mt-0.5">
                {featuredApp.subtitle}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {featuredApp.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Engineering Metrics Row */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="p-1.5 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-xs font-bold font-mono text-white">8 Apps</div>
            <div className="text-[8px] font-mono text-ink-muted uppercase">Stores</div>
          </div>
          <div className="p-1.5 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-xs font-bold font-mono text-accent">3+ Yrs</div>
            <div className="text-[8px] font-mono text-ink-muted uppercase">Exp</div>
          </div>
          <div className="p-1.5 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-xs font-bold font-mono text-emerald-400">45 Tools</div>
            <div className="text-[8px] font-mono text-ink-muted uppercase">Arsenal</div>
          </div>
          <div className="p-1.5 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-xs font-bold font-mono text-amber-400">100%</div>
            <div className="text-[8px] font-mono text-ink-muted uppercase">QA Rate</div>
          </div>
        </div>
      </div>

      {/* Main Apps Grid (4 cols x 2 rows) */}
      <div className="grid grid-cols-4 gap-y-3 gap-x-2 px-1 py-1 shrink-0 my-auto">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.id}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center gap-1 group cursor-pointer relative"
            >
              {/* Glossy Squircle App Icon */}
              <div
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all shadow-lg border border-white/20 ${app.gradient}`}
              >
                {app.isPortrait ? (
                  <img
                    src="/me.png"
                    alt={portfolioData.profile.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/afaq-mehmood.png';
                    }}
                  />
                ) : (
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
                )}

                {/* Specular Inner Glint */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/20 pointer-events-none" />

                {/* Badge if present */}
                {app.badge && (
                  <span
                    className={`absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[8px] font-mono font-bold text-white shadow-md border border-black/20 scale-90 ${
                      app.badgeColor || 'bg-accent'
                    }`}
                  >
                    {app.badge}
                  </span>
                )}
              </div>

              {/* App Label */}
              <span className="text-[11px] font-medium text-white/90 group-hover:text-accent transition-colors text-center tracking-tight truncate max-w-[64px]">
                {app.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Dock (4 Quick Access Apps) */}
      <Dock />

      {/* Bottom Home Indicator Bar */}
      <div className="w-full flex items-center justify-center pt-1 pb-1 shrink-0">
        <div className="w-32 h-1 rounded-full bg-white/25 hover:bg-white/50 transition-colors cursor-pointer" />
      </div>
    </div>
  );
};
