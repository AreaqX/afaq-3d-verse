import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone } from 'lucide-react';
import { useOS, AppId } from '../store/useOS';

export const AppSwitcher: React.FC = () => {
  const isAppSwitcherOpen = useOS((state) => state.isAppSwitcherOpen);
  const setAppSwitcher = useOS((state) => state.setAppSwitcher);
  const appHistory = useOS((state) => state.appHistory);
  const openApp = useOS((state) => state.openApp);
  const goHome = useOS((state) => state.goHome);

  if (!isAppSwitcherOpen) return null;

  const validApps = appHistory.filter((a) => a !== 'home');

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-md flex flex-col justify-between p-4 pt-10">
        {/* Backdrop tap to close */}
        <div onClick={() => setAppSwitcher(false)} className="absolute inset-0" />

        <div className="relative z-50 text-center text-xs font-mono font-bold text-white tracking-widest uppercase pb-2">
          RECENTS / APP SWITCHER
        </div>

        {/* Horizontal Stack of App Cards */}
        <div className="relative z-50 flex gap-4 overflow-x-auto py-6 px-4 scrollbar-none snap-x snap-mandatory my-auto">
          {validApps.length === 0 ? (
            <div className="mx-auto text-center text-white/80 text-xs font-mono py-12">
              No recent background apps.
            </div>
          ) : (
            validApps.map((appId) => (
              <motion.div
                key={appId}
                whileTap={{ scale: 0.95 }}
                onClick={() => openApp(appId)}
                className="w-56 h-80 rounded-2xl bg-white border border-border shadow-2xl flex flex-col justify-between p-4 cursor-pointer shrink-0 snap-center group"
              >
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-bold text-xs text-ink uppercase tracking-wider">{appId}</span>
                  <Smartphone className="w-4 h-4 text-accent" />
                </div>
                <div className="my-auto text-center space-y-1">
                  <div className="text-sm font-bold text-ink">Active Session</div>
                  <p className="text-[10px] text-ink-muted">Tap to resume</p>
                </div>
                <div className="text-center text-[10px] font-mono text-accent font-semibold">
                  AfaqOS Multitasking
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Close Button & Home */}
        <div className="relative z-50 flex items-center justify-center gap-3 pb-4">
          <button
            onClick={goHome}
            className="px-6 py-2 rounded-full bg-white/90 hover:bg-white text-ink text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Close All & Go Home
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
};
