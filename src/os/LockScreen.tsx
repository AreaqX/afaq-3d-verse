import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Flashlight, Camera, MessageSquare, Briefcase, Award, ChevronUp } from 'lucide-react';
import { useOS } from '../store/useOS';
import { portfolioData } from '../data/portfolio';

export const LockScreen: React.FC = () => {
  const unlock = useOS((state) => state.unlock);
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setDateStr(
        now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40, scale: 1.05 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-20 flex flex-col justify-between p-6 select-none bg-gradient-to-b from-[#F8F9FB] via-[#F1F4F8] to-[#E5ECF0]"
    >
      {/* Top Header & Lock Icon */}
      <div className="flex flex-col items-center pt-8 space-y-1">
        <Lock className="w-4 h-4 text-ink-muted mb-2 opacity-80" />
        <span className="text-xs font-mono tracking-widest text-ink-muted uppercase">
          {dateStr || 'Monday, November 17'}
        </span>
        <h1 className="text-6xl font-light tracking-tight text-ink font-sans">
          {time || '09:41'}
        </h1>

        <div className="pt-2 text-center">
          <div className="font-display font-bold text-base text-ink tracking-tight">
            {portfolioData.profile.name}
          </div>
          <p className="text-[11px] font-mono text-ink-muted mt-0.5">
            {portfolioData.profile.title}
          </p>
        </div>
      </div>

      {/* Stacked Notification Cards */}
      <div className="space-y-2.5 my-auto max-w-sm mx-auto w-full">
        {/* Notification 1: Status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-border shadow-sm flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-accent-soft flex items-center justify-center text-accent shrink-0 mt-0.5">
            <Briefcase className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-ink">Availability & Status</span>
              <span className="text-[10px] text-ink-faint font-mono">Now</span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5 leading-snug">
              Open to relocation: UAE / GCC (available within 1 month) & Lahore.
            </p>
          </div>
        </motion.div>

        {/* Notification 2: Experience */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-border shadow-sm flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
            <Award className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-ink">Production Shipped</span>
              <span className="text-[10px] text-ink-faint font-mono">1m ago</span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5 leading-snug">
              8+ mobile apps published on Apple App Store & Google Play.
            </p>
          </div>
        </motion.div>

        {/* Notification 3: Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-border shadow-sm flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
            <MessageSquare className="w-4 h-4 text-blue-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-ink">Afaq Mehmood</span>
              <span className="text-[10px] text-ink-faint font-mono">5m ago</span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5 leading-snug">
              "I build mobile apps that ship, and test them until they don't break."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action Area */}
      <div className="space-y-4 pb-4">
        {/* Swipe / Tap to unlock prompt */}
        <motion.button
          onClick={unlock}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="w-full flex flex-col items-center justify-center gap-1 cursor-pointer group"
        >
          <ChevronUp className="w-4 h-4 text-ink-muted group-hover:translate-y-[-2px] transition-transform animate-bounce" />
          <span className="text-xs font-mono font-medium tracking-wide text-ink-muted group-hover:text-accent transition-colors">
            Swipe up or click to unlock
          </span>
        </motion.button>

        {/* Bottom Corner Buttons (Torch & Camera) */}
        <div className="flex items-center justify-between px-4">
          <button
            onClick={unlock}
            className="w-10 h-10 rounded-full bg-white/70 border border-border/80 flex items-center justify-center text-ink-muted hover:text-ink hover:bg-white transition-all shadow-sm cursor-pointer"
            aria-label="Flashlight toggle"
          >
            <Flashlight className="w-4 h-4" />
          </button>
          <button
            onClick={unlock}
            className="w-10 h-10 rounded-full bg-white/70 border border-border/80 flex items-center justify-center text-ink-muted hover:text-ink hover:bg-white transition-all shadow-sm cursor-pointer"
            aria-label="Camera shortcut"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
