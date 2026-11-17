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
      bg: 'bg-gradient-to-tr from-[#0052D4] via-[#4364F7] to-[#6FB1FC] text-white shadow-md border border-white/20',
    },
    {
      id: 'messages' as AppId,
      name: 'Messages',
      icon: MessageSquare,
      bg: 'bg-gradient-to-tr from-[#059669] to-[#10B981] text-white shadow-md border border-white/20',
    },
    {
      id: 'resume' as AppId,
      name: 'Resume',
      icon: FileText,
      bg: 'bg-gradient-to-tr from-[#1E293B] via-[#2D3A54] to-[#3B82F6] text-white shadow-md border border-white/20',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      bg: 'bg-gradient-to-tr from-[#005582] via-[#0077B5] to-[#00A0DC] text-white shadow-md border border-white/20',
      action: () => window.open(portfolioData.profile.linkedin, '_blank'),
    },
  ];

  return (
    <div className="w-full px-3 pb-2 z-20">
      <div className="dock-blur px-4 py-2.5 rounded-[28px] flex items-center justify-around max-w-[280px] mx-auto shadow-xl">
        {dockApps.map((app) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.name}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.1, y: -2 }}
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
