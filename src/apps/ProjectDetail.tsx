import React from 'react';
import { ArrowLeft, ExternalLink, Check, Download, ShieldCheck, Smartphone, Star } from 'lucide-react';
import { Project, portfolioData } from '../data/portfolio';
import { useOS } from '../store/useOS';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const addToast = useOS((state) => state.addToast);

  const handleGet = () => {
    addToast(`${project.title} technical specification verified.`, 'success');
  };

  return (
    <div className="space-y-5 pb-8 text-white">
      {/* App Store Top Header Row */}
      <div className="flex items-start gap-4 pt-1">
        {/* App Icon */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-md border border-white/20"
          style={{ backgroundColor: project.color ? `${project.color}25` : 'var(--accent-soft)' }}
        >
          <Smartphone className="w-10 h-10" style={{ color: project.color || 'var(--accent)' }} />
        </div>

        {/* Title, Category & GET button */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-display font-bold text-white leading-tight truncate">
            {project.title}
          </h1>
          <p className="text-xs text-ink-muted truncate mt-0.5">{project.subtitle}</p>
          <span className="inline-block text-[10px] font-mono text-accent uppercase font-bold mt-1">
            {project.category}
          </span>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleGet}
              className="px-5 py-1.5 rounded-full bg-accent hover:bg-accent-hover text-black text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
            >
              GET
            </button>
            {project.platforms?.map((plat) => (
              <span
                key={plat}
                className="px-2 py-0.5 rounded-md bg-surface border border-border text-[10px] font-mono text-ink-muted"
              >
                {plat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ratings & Metadata Bar (App Store Style) */}
      <div className="grid grid-cols-3 divide-x divide-border border-y border-border py-2 text-center bg-surface/50 rounded-xl">
        <div>
          <div className="text-[10px] font-mono text-ink-faint uppercase">RATING</div>
          <div className="text-xs font-bold text-white flex items-center justify-center gap-1 mt-0.5">
            <span>5.0</span>
            <span className="text-amber-400">★★★★★</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-ink-faint uppercase">QA STATUS</div>
          <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VERIFIED</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-ink-faint uppercase">STORE STATUS</div>
          <div className="text-xs font-bold text-white mt-0.5">
            {project.featured ? 'SHIPPED' : 'ENTERPRISE'}
          </div>
        </div>
      </div>

      {/* Screenshot / Mock Preview Carousel */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
          Preview
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          {/* Mock Screen 1: App Interface Overview */}
          <div className="w-48 h-72 rounded-2xl bg-gradient-to-b from-surface to-surface-alt border border-border shrink-0 p-3.5 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-[10px] font-bold text-white">{project.title}</span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color || 'var(--accent)' }} />
            </div>
            <div className="space-y-2 my-auto">
              <div className="h-20 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center text-center p-2">
                <span className="text-[10px] font-mono text-accent font-medium leading-tight">
                  {project.subtitle}
                </span>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
              </div>
            </div>
            <div className="text-[9px] font-mono text-emerald-400 text-center border-t border-border pt-1.5">
              Production Build Verified ✓
            </div>
          </div>

          {/* Mock Screen 2: Architecture & Security */}
          <div className="w-48 h-72 rounded-2xl bg-surface border border-border shrink-0 p-3.5 flex flex-col justify-between shadow-md">
            <div className="text-[10px] font-mono font-bold text-accent uppercase">
              Security & QA Matrix
            </div>
            <div className="space-y-2 my-auto text-left">
              <div className="p-2 rounded-lg bg-surface-alt border border-border text-[9px] font-mono text-ink-muted">
                • Supabase RLS / Firebase Rules
              </div>
              <div className="p-2 rounded-lg bg-surface-alt border border-border text-[9px] font-mono text-ink-muted">
                • Stripe / RevenueCat Paywalls
              </div>
              <div className="p-2 rounded-lg bg-surface-alt border border-border text-[9px] font-mono text-ink-muted">
                • Postman API Assertions
              </div>
            </div>
            <div className="text-[9px] font-mono text-ink-faint text-center border-t border-border pt-1.5">
              Multi-Tenant Compliant
            </div>
          </div>
        </div>
      </div>

      {/* Overview Description */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
          Description
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Engineering Highlights / What I did */}
      {project.whatIDid && project.whatIDid.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
            Engineering & QA Highlights
          </h3>
          <ul className="space-y-2">
            {project.whatIDid.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-ink-muted flex items-start gap-2 bg-surface p-3 rounded-xl border border-border"
              >
                <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack Chips */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
          Technologies Used
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg bg-accent-soft text-accent text-xs font-mono font-medium border border-accent/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
