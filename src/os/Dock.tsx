import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, MessageSquare, FileText, Linkedin } from 'lucide-react';
import { useOS, AppId } from '../store/useOS';
import { portfolioData } from '../data/portfolio';

export const Dock: React.FC = () => {
  const openApp = useOS((state) => state.openApp);

  const dockApps = [
    {
      id: 'projects' as AppId,
      name: 'Projects',
      icon: LayoutGrid,
      bg: 'bg-accent text-white shadow-sm',
    },
    {
      id: 'messages' as AppId,
      name: 'Messages',
      icon: MessageSquare,
      bg: 'bg-[#2563EB] text-white shadow-sm',
    },
    {
      id: 'resume' as AppId,
      name: 'Resume',
      icon: FileText,
      bg: 'bg-white border border-border text-ink shadow-sm',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      bg: 'bg-[#0A66C2] text-white shadow-sm',
      action: () => window.open(portfolioData.profile.linkedin, '_blank'),
    },
  ];

  return (
    <div className="w-full px-4 pb-2 z-20">
      <div className="dock-blur px-4 py-2.5 rounded-3xl flex items-center justify-around max-w-xs mx-auto shadow-sm">
        {dockApps.map((app) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.name}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08, y: -2 }}
              onClick={() => (app.action ? app.action() : openApp(app.id as AppId))}
              className="flex flex-col items-center group cursor-pointer"
              title={app.name}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${app.bg}`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
