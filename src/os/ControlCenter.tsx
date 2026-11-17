import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Bluetooth, Plane, Volume2, Sun, Moon, Flashlight, MessageSquare, X } from 'lucide-react';
import { useOS } from '../store/useOS';

export const ControlCenter: React.FC = () => {
  const isControlCenterOpen = useOS((state) => state.isControlCenterOpen);
  const setControlCenter = useOS((state) => state.setControlCenter);
  const openApp = useOS((state) => state.openApp);

  if (!isControlCenterOpen) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-md flex flex-col justify-start p-4 pt-12 text-white">
        {/* Close gesture / tap backdrop */}
        <div
          onClick={() => setControlCenter(false)}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          className="relative z-50 w-full space-y-3"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between text-xs text-ink-muted px-1">
            <span className="font-mono font-bold tracking-wider text-white">CONTROL CENTER</span>
            <button
              onClick={() => setControlCenter(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Toggle 4-Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-surface/90 backdrop-blur-md p-3 rounded-2xl border border-border shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent text-black flex items-center justify-center">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Wi-Fi</div>
                <div className="text-[10px] text-emerald-400 font-mono">Connected</div>
              </div>
            </div>

            <div className="bg-surface/90 backdrop-blur-md p-3 rounded-2xl border border-border shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent text-black flex items-center justify-center">
                <Bluetooth className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Bluetooth</div>
                <div className="text-[10px] text-emerald-400 font-mono">On</div>
              </div>
            </div>
          </div>

          {/* Brightness & Volume Sliders */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-surface/90 backdrop-blur-md p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-28">
              <Sun className="w-5 h-5 text-amber-400" />
              <div>
                <div className="h-1.5 w-full bg-surface-alt rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-amber-400 rounded-full" />
                </div>
                <div className="text-[10px] font-mono text-ink-muted mt-1.5">Display: 85%</div>
              </div>
            </div>

            <div className="bg-surface/90 backdrop-blur-md p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-28">
              <Volume2 className="w-5 h-5 text-accent" />
              <div>
                <div className="h-1.5 w-full bg-surface-alt rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-accent rounded-full" />
                </div>
                <div className="text-[10px] font-mono text-ink-muted mt-1.5">Audio: 70%</div>
              </div>
            </div>
          </div>

          {/* Shortcut: "Say Hi" Messages */}
          <button
            onClick={() => {
              setControlCenter(false);
              openApp('messages');
            }}
            className="w-full p-3.5 rounded-2xl bg-accent text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-accent-hover transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Say Hi / Quick Contact</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
