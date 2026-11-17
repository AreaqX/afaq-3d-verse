import React from 'react';
import { Palette, Eye, Layout, Info, Check, Shield } from 'lucide-react';
import { useOS, AccentColor } from '../store/useOS';
import { AppShell } from '../os/AppShell';

export const SettingsApp: React.FC = () => {
  const accent = useOS((state) => state.accent);
  const setAccent = useOS((state) => state.setAccent);
  const reduceMotion = useOS((state) => state.reduceMotion);
  const setReduceMotion = useOS((state) => state.setReduceMotion);
  const toggleClassicView = useOS((state) => state.toggleClassicView);
  const addToast = useOS((state) => state.addToast);

  const accents: { id: AccentColor; name: string; color: string }[] = [
    { id: 'teal', name: 'Electric Cyan / Teal', color: '#00E5FF' },
    { id: 'cobalt', name: 'Cobalt Blue', color: '#3B82F6' },
    { id: 'amber', name: 'Amber Warmth', color: '#F59E0B' },
  ];

  return (
    <AppShell title="Settings" subtitle="SYSTEM PREFERENCES">
      <div className="space-y-5 pb-8 text-white">
        {/* Accent Color Section */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 px-1">
            <Palette className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
              Accent Theme
            </h3>
          </div>

          <div className="rounded-2xl bg-surface border border-border divide-y divide-border overflow-hidden shadow-sm">
            {accents.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setAccent(item.id);
                  addToast(`Accent switched to ${item.name}`, 'info');
                }}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-surface-alt transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-white">{item.name}</span>
                </div>
                {accent === item.id && <Check className="w-4 h-4 text-accent" />}
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility & Motion */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 px-1">
            <Eye className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
              Accessibility
            </h3>
          </div>

          <div className="rounded-2xl bg-surface border border-border p-3.5 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-white">Reduce Motion</div>
              <div className="text-[11px] text-ink-muted">Disable 3D tilt and spring animations</div>
            </div>
            <button
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer ${
                reduceMotion ? 'bg-accent' : 'bg-surface-alt border border-border'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  reduceMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Classic 2D View Mode (Recruiter Safety Net) */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 px-1">
            <Layout className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
              View Mode
            </h3>
          </div>

          <div className="rounded-2xl bg-surface border border-border p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Classic 2D Recruiter View</div>
                <div className="text-[11px] text-ink-muted">
                  Standard accessible single-page layout for recruiters and ATS.
                </div>
              </div>
            </div>
            <button
              onClick={toggleClassicView}
              className="w-full py-2.5 px-3 rounded-xl bg-accent text-black font-mono text-xs font-bold transition-all cursor-pointer text-center shadow-md hover:bg-accent-hover"
            >
              Switch to Classic 2D Layout ↗
            </button>
          </div>
        </div>

        {/* About Info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 px-1">
            <Info className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
              About This OS
            </h3>
          </div>

          <div className="rounded-2xl bg-surface border border-border p-3.5 shadow-sm space-y-1 text-xs text-ink-muted">
            <div className="flex justify-between font-mono text-[11px]">
              <span>System Version:</span>
              <span className="text-white font-bold">AfaqOS 3.0 Titanium</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span>Architecture:</span>
              <span className="text-white">React 18 + TS + Tailwind</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span>Performance:</span>
              <span className="text-emerald-400 font-bold">Pure CSS 3D · 60 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
