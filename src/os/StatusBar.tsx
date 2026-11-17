import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';
import { useOS } from '../store/useOS';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const setControlCenter = useOS((state) => state.setControlCenter);
  const isControlCenterOpen = useOS((state) => state.isControlCenterOpen);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-11 px-5 flex items-center justify-between text-xs text-white select-none z-30 relative shrink-0">
      {/* Left: Time & Carrier */}
      <div
        onClick={() => setControlCenter(!isControlCenterOpen)}
        className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <span className="font-semibold text-[13px] tracking-tight">{time || '09:41'}</span>
        <span className="text-[10px] text-ink-muted font-mono hidden sm:inline">Sialkot</span>
      </div>

      {/* Center: Dynamic Island Pill (Interactive & Realistic) */}
      <div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setControlCenter(!isControlCenterOpen)}
        className={`absolute left-1/2 -translate-x-1/2 top-2 h-7 bg-black rounded-full flex items-center justify-between px-3 border border-white/15 shadow-lg cursor-pointer transition-all duration-300 ${
          isExpanded ? 'w-48 sm:w-52' : 'w-28'
        }`}
        title="Tap to open Control Center"
      >
        {/* Left Indicator inside Dynamic Island */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          {isExpanded ? (
            <span className="text-[10px] font-mono text-white/90 truncate font-medium">
              Afaq · 8 Apps Shipped
            </span>
          ) : (
            <span className="text-[9px] font-mono font-bold tracking-tight text-white/90">
              AVAILABLE
            </span>
          )}
        </div>

        {/* Right: Camera Lens Glint & Mic Dot */}
        <div className="flex items-center gap-1.5 shrink-0 pl-1">
          {/* Subtle Front Lens Glint */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#081220] border border-[#1E293B] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#1E3A8A]/60" />
          </div>
        </div>
      </div>

      {/* Right: Telemetry (Signal, Wifi, Battery) */}
      <div
        onClick={() => setControlCenter(!isControlCenterOpen)}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <Signal className="w-3.5 h-3.5 text-white/90" />
        <Wifi className="w-3.5 h-3.5 text-white/90" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-mono text-white/80 font-medium">98%</span>
          <Battery className="w-4 h-4 text-emerald-400 fill-emerald-400" />
        </div>
      </div>
    </div>
  );
};
