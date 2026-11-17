import React from 'react';
import { Briefcase, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { AppShell } from '../os/AppShell';

export const JourneyApp: React.FC = () => {
  return (
    <AppShell title="Journey" subtitle="CAREER & EDUCATION">
      <div className="space-y-6 pb-8 text-white">
        {/* Route Activity Header */}
        <div className="p-4 rounded-2xl bg-surface border border-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-accent uppercase">
              ACTIVE POSITION
            </span>
            <div className="text-xs font-bold text-white mt-0.5">
              Senior Software Developer
            </div>
            <span className="text-[11px] text-ink-muted">Patronecs Software Company</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center text-accent border border-accent/20">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        {/* Vertical Timeline Activity Route */}
        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
          {/* Milestone 1: Experience */}
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} className="relative space-y-2">
              {/* Timeline Route Node */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-black ring-4 ring-screen shadow-md">
                <div className="w-2 h-2 rounded-full bg-black" />
              </div>

              <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-[10px] font-mono font-bold text-accent">
                    {exp.period}
                  </span>
                  <span className="text-[10px] font-mono text-ink-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent" />
                    {exp.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                  <p className="text-xs font-medium text-accent mt-0.5">{exp.company}</p>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-mono font-bold text-accent uppercase">
                    Deliverables & QA Leadership:
                  </div>
                  <ul className="space-y-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="text-[11px] text-ink-muted flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        <span className="leading-tight">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Milestone 2 & 3: Education */}
          {portfolioData.education.map((edu, idx) => (
            <div key={idx} className="relative space-y-2">
              {/* Timeline Route Node */}
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-surface border-2 border-accent flex items-center justify-center text-accent ring-4 ring-screen shadow-md">
                <GraduationCap className="w-3 h-3 text-accent" />
              </div>

              <div className="bg-surface p-4 rounded-2xl border border-border shadow-sm space-y-2">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-[10px] font-mono font-bold text-ink-muted">
                    {edu.period}
                  </span>
                  <span className="text-[10px] font-mono text-ink-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                  <p className="text-xs font-medium text-accent mt-0.5">{edu.institution}</p>
                </div>

                {edu.details && (
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {edu.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};
