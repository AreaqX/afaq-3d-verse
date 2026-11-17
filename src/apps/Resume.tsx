import React from 'react';
import { Download, FileText, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { AppShell } from '../os/AppShell';
import { useOS } from '../store/useOS';

export const ResumeApp: React.FC = () => {
  const addToast = useOS((state) => state.addToast);

  const handleDownload = () => {
    addToast('Downloading Afaq Mehmood Resume PDF...', 'info');
  };

  return (
    <AppShell
      title="Resume"
      subtitle="DOCUMENT VIEWER"
      actions={
        <a
          href={portfolioData.profile.cv}
          download="Afaq_Mehmood_Resume.pdf"
          onClick={handleDownload}
          className="p-1.5 rounded-lg text-accent hover:bg-surface-alt transition-colors"
          title="Download PDF"
        >
          <Download className="w-4 h-4" />
        </a>
      }
    >
      <div className="space-y-4 pb-8">
        {/* Document Header Card */}
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-accent uppercase">
              OFFICIAL CURRICULUM VITAE
            </span>
            <h2 className="text-sm font-bold text-ink">Afaq Mehmood</h2>
            <p className="text-[11px] text-ink-muted">Afaq_Mehmood_Resume.pdf (152 KB)</p>
          </div>

          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>

        {/* Paper Document Representation */}
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm space-y-4 text-left">
          {/* Document Header */}
          <div className="border-b border-border pb-3 text-center">
            <h1 className="text-base font-bold text-ink">{portfolioData.profile.name}</h1>
            <p className="text-[11px] font-mono text-accent font-medium mt-0.5">
              {portfolioData.profile.title}
            </p>
            <div className="text-[10px] text-ink-faint font-mono mt-1 space-x-2">
              <span>{portfolioData.profile.location}</span>
              <span>•</span>
              <span>{portfolioData.profile.email}</span>
              <span>•</span>
              <span>{portfolioData.profile.phone}</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1">
            <h3 className="text-[11px] font-mono font-bold text-ink uppercase tracking-wider">
              Professional Summary
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              {portfolioData.profile.summary}
            </p>
          </div>

          {/* Core Competencies */}
          <div className="space-y-1.5 pt-2 border-t border-border/60">
            <h3 className="text-[11px] font-mono font-bold text-ink uppercase tracking-wider">
              Core Competencies
            </h3>
            <div className="flex flex-wrap gap-1">
              {[
                'Full Stack Mobile & Web',
                'FlutterFlow Development',
                'Firebase & Supabase (BaaS)',
                'Row-Level Security (RLS) & RBAC',
                'Quality Assurance & Testing',
                'Bug Tracking & Test Case Design',
                'Stripe & RevenueCat Payments',
                'ClickUp, Trello, Jira',
                'Microsoft Office Suite',
                'AI-Driven Workflows (Claude, MCP)',
              ].map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 rounded bg-surface-alt border border-border text-[10px] font-mono text-ink-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <h3 className="text-[11px] font-mono font-bold text-ink uppercase tracking-wider">
              Professional Experience
            </h3>
            {portfolioData.experience.map((exp, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-ink">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="font-mono text-[10px] text-ink-muted">{exp.period}</span>
                </div>
                <p className="text-ink-muted text-[11px] leading-relaxed">
                  {exp.description}
                </p>
                <ul className="space-y-1 pt-1">
                  {exp.highlights.slice(0, 4).map((h, hIdx) => (
                    <li key={hIdx} className="text-[11px] text-ink-muted flex items-start gap-1.5">
                      <span className="text-accent font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <h3 className="text-[11px] font-mono font-bold text-ink uppercase tracking-wider">
              Education
            </h3>
            {portfolioData.education.map((edu, i) => (
              <div key={i} className="flex justify-between text-xs">
                <div>
                  <div className="font-bold text-ink">{edu.degree}</div>
                  <div className="text-[11px] text-ink-muted">{edu.institution}</div>
                </div>
                <span className="font-mono text-[10px] text-ink-muted">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Big Bottom Download Button */}
        <a
          href={portfolioData.profile.cv}
          download="Afaq_Mehmood_Resume.pdf"
          onClick={handleDownload}
          className="w-full py-3.5 px-4 rounded-2xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Complete Resume (PDF)</span>
        </a>
      </div>
    </AppShell>
  );
};
