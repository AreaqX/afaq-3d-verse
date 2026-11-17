import React from 'react';
import { Palette, Eye, Layout, Info, Check, Shield } from 'lucide-react';
import { useOS, AccentColor } from '../store/useOS';

export const SettingsApp: React.FC = () => {
  const accent = useOS((state) => state.accent);
  const setAccent = useOS((state) => state.setAccent);
  const reduceMotion = useOS((state) => state.reduceMotion);
  const setReduceMotion = useOS((state) => state.setReduceMotion);
  const toggleClassicView = useOS((state) => state.toggleClassicView);
  const addToast = useOS((state) => state.addToast);

  const accents: { id: AccentColor; name: string; color: string }[] = [
    { id: 'teal', name: 'Deep Teal (Default)', color: '#0E7C7B' },
    { id: 'cobalt', name: 'Cobalt Blue', color: '#1D4ED8' },
    { id: 'amber', name: 'Amber Warmth', color: '#B45309' },
  ];

  return (
    <AppShell title="Settings" subtitle="SYSTEM PREFERENCES">
      <div className="space-y-5 pb-8">
        {/* Accent Color Section */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 px-1">
            <Palette className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
              Accent Theme
            </h3>
          </div>

          <div className="rounded-2xl bg-white border border-border divide-y divide-border/60 overflow-hidden shadow-sm">
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
                    className="w-5 h-5 rounded-full border border-border shadow-xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-ink">{item.name}</span>
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
            <h3 className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
              Accessibility
            </h3>
          </div>

          <div className="rounded-2xl bg-white border border-border p-3.5 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-ink">Reduce Motion</div>
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
            <h3 className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
              View Mode
            </h3>
          </div>

          <div className="rounded-2xl bg-white border border-border p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-ink">Classic 2D Recruiter View</div>
                <div className="text-[11px] text-ink-muted">
                  Standard accessible single-page layout for recruiters and ATS.
                </div>
              </div>
            </div>
            <button
              onClick={toggleClassicView}
              className="w-full py-2 px-3 rounded-xl bg-accent-soft hover:bg-accent hover:text-white text-accent font-mono text-xs font-bold transition-all cursor-pointer text-center"
            >
              Switch to Classic 2D Layout ↗
            </button>
          </div>
        </div>

        {/* About Info */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 px-1">
            <Info className="w-3.5 h-3.5 text-accent" />
            <h3 className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
              About This OS
            </h3>
          </div>

          <div className="rounded-2xl bg-white border border-border p-3.5 shadow-sm space-y-1 text-xs text-ink-muted">
            <div className="flex justify-between font-mono text-[11px]">
              <span>System Version:</span>
              <span className="text-ink font-bold">AfaqOS 3.0 Titanium</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span>Architecture:</span>
              <span className="text-ink">React 18 + TS + Tailwind</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span>Performance:</span>
              <span className="text-success font-bold">Pure CSS 3D · 60 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
