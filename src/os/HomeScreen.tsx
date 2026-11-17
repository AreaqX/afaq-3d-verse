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
} from 'lucide-react';
import { useOS, AppId } from '../store/useOS';
import { portfolioData } from '../data/portfolio';
import { Dock } from './Dock';

interface AppIconItem {
  id: AppId;
  name: string;
  icon: React.ElementType;
  bg: string;
  badge?: string;
  isPortrait?: boolean;
}

export const HomeScreen: React.FC = () => {
  const openApp = useOS((state) => state.openApp);
  const setSpotlight = useOS((state) => state.setSpotlight);
  const [roleIdx, setRoleIdx] = useState(0);

  const roles = [
    'Mobile App Developer',
    'Software Engineer',
    'SQA & Security Engineer',
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
      bg: 'bg-accent text-white shadow-sm',
      badge: '8 Apps',
    },
    {
      id: 'about',
      name: 'About',
      icon: User,
      bg: 'bg-white border border-border text-ink shadow-sm',
      isPortrait: true,
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: Cpu,
      bg: 'bg-white border border-border text-ink shadow-sm',
      badge: '45 Tools',
    },
    {
      id: 'journey',
      name: 'Journey',
      icon: MapPin,
      bg: 'bg-white border border-border text-ink shadow-sm',
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: FileText,
      bg: 'bg-white border border-border text-ink shadow-sm',
      badge: 'PDF',
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: MessageSquare,
      bg: 'bg-[#2563EB] text-white shadow-sm',
      badge: 'Online',
    },
    {
      id: 'bughunt',
      name: 'Bug Hunt',
      icon: Bug,
      bg: 'bg-emerald-600 text-white shadow-sm',
      badge: 'QA Game',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      bg: 'bg-zinc-800 text-white shadow-sm',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between pt-1 pb-2 px-4 select-none relative overflow-hidden bg-gradient-to-b from-[#F8F9FB] via-[#F2F5F8] to-[#E6EEF0]">
      {/* Background Decorative Faint Shapes */}
      <div className="absolute top-12 -right-16 w-48 h-48 rounded-full bg-accent-soft/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-16 w-52 h-52 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

      {/* Top Search bar pill shortcut */}
      <div className="pt-1 px-1">
        <button
          onClick={() => setSpotlight(true)}
          className="w-full py-1.5 px-3 rounded-xl bg-white/70 hover:bg-white border border-border/80 flex items-center justify-between text-ink-muted text-xs shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-ink-faint" />
            <span className="text-[11px] font-sans">Search apps, projects, skills...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-surface-alt text-[9px] font-mono text-ink-faint border border-border">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Live Interactive Widgets Grid (Apple Style) */}
      <div className="grid grid-cols-2 gap-3 py-2 px-1">
        {/* Widget 1: Status & Relocation */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openApp('about')}
          className="screen-card p-3 rounded-2xl flex flex-col justify-between h-28 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="w-2 h-2 rounded-full bg-success animate-ping" />
            <span className="text-[10px] font-mono font-semibold text-success uppercase">
              Available
            </span>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-ink group-hover:text-accent transition-colors">
              UAE / GCC & Lahore
            </div>
            <p className="text-[10px] text-ink-muted mt-0.5 line-clamp-2 leading-tight">
              Open to relocation within 1 month. Full-time mobile / SQA.
            </p>
          </div>
        </motion.div>

        {/* Widget 2: Rotating Role & Production Count */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openApp('projects')}
          className="screen-card p-3 rounded-2xl flex flex-col justify-between h-28 cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-accent">3+ YEARS EXP</span>
            <Briefcase className="w-3.5 h-3.5 text-accent" />
          </div>
          <div>
            <div className="text-xl font-display font-black text-ink">8 Apps</div>
            <div className="text-[10px] font-mono font-medium text-accent mt-0.5 truncate transition-all">
              {roles[roleIdx]}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Apps Grid (4 cols x 2 rows) */}
      <div className="grid grid-cols-4 gap-y-4 gap-x-2 px-1 py-1 my-auto">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.id}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer relative"
            >
              {/* Icon Square with subtle border */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all ${app.bg}`}
              >
                {app.isPortrait ? (
                  <img
                    src="/me.png"
                    alt={portfolioData.profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to icon if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <Icon className="w-7 h-7" />
                )}

                {/* Badge if present */}
                {app.badge && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-accent text-[9px] font-mono font-bold text-white shadow-sm scale-90">
                    {app.badge}
                  </span>
                )}
              </div>

              {/* App Label */}
              <span className="text-[11px] font-medium text-ink group-hover:text-accent transition-colors text-center tracking-tight">
                {app.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Dock (4 Quick Access Icons) */}
      <Dock />

      {/* Home Indicator Bar */}
      <div className="w-full flex items-center justify-center pt-1 pb-1">
        <div className="w-32 h-1 rounded-full bg-ink/20 hover:bg-ink/40 transition-colors cursor-pointer" />
      </div>
    </div>
  );
};
