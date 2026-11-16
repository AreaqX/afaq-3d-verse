import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '../store/useNav';

export const LoadingScreen: React.FC = () => {
  const isLoading = useNav((state) => state.isLoading);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 25) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080A] text-[#EDEDED] font-mono select-none"
        >
          <div className="w-full max-w-xs px-6 flex flex-col items-center gap-6">
            {/* Minimal Logo / Monogram */}
            <div className="w-14 h-14 rounded-xl bg-[#0C101A] border border-[#1A2333] flex items-center justify-center text-[#00E5FF] font-display font-bold text-xl shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              AM
            </div>

            {/* Title */}
            <div className="text-center space-y-1">
              <div className="text-sm font-semibold tracking-widest text-[#FFFFFF]">
                AFAQ MEHMOOD
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                INITIALIZING 3D FLIGHT WORLD
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-[#101624] rounded-full overflow-hidden border border-[#1A2333]">
              <motion.div
                className="h-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
                initial={{ width: '10%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Progress Percentage & Status */}
            <div className="w-full flex items-center justify-between text-[11px] text-[#64748B]">
              <span>CALIBRATING SENSORS...</span>
              <span className="text-[#00E5FF] font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
