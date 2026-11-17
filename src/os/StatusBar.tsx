import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { useOS } from '../store/useOS';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState<string>('');
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
    <div
      onClick={() => setControlCenter(!isControlCenterOpen)}
      className="w-full h-11 px-6 flex items-center justify-between text-xs font-medium text-ink select-none cursor-pointer z-30 relative"
      title="Tap to toggle Control Center"
    >
      {/* Left: Time & Carrier */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[13px] tracking-tight">{time || '09:41'}</span>
        <span className="text-[10px] text-ink-faint font-mono hidden sm:inline">Sialkot</span>
      </div>

      {/* Center: Dynamic Island Pill */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 h-6 w-24 bg-black rounded-full flex items-center justify-center gap-1.5 px-2.5 shadow-sm transition-all hover:w-28">
        <span className="w-2 h-2 rounded-full bg-success animate-ping" />
        <span className="text-[9px] text-white/90 font-mono font-medium tracking-tight">OPEN TO WORK</span>
      </div>

      {/* Right: Telemetry (Signal, Wifi, Battery) */}
      <div className="flex items-center gap-2 text-ink">
        <Signal className="w-3.5 h-3.5 text-ink-muted" />
        <Wifi className="w-3.5 h-3.5 text-ink-muted" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-mono text-ink-muted">98%</span>
          <Battery className="w-4 h-4 text-ink-muted" />
        </div>
      </div>
    </div>
  );
};
