import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Globe, Shield, Award, Mail, Phone, Download, Linkedin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { AppShell } from '../os/AppShell';
import { useOS } from '../store/useOS';

export const AboutApp: React.FC = () => {
  const addToast = useOS((state) => state.addToast);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    addToast(`Email copied: ${portfolioData.profile.email}`, 'success');
  };

  const facts = [
    {
      icon: MapPin,
      label: 'Location',
      value: portfolioData.profile.location,
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Within 1 month (Open to UAE / GCC & Lahore)',
      highlight: true,
    },
    {
      icon: Shield,
      label: 'Visa Status',
      value: portfolioData.profile.visaStatus || 'Sponsorship required',
    },
    {
      icon: Globe,
      label: 'Languages',
      value: portfolioData.profile.languages?.join(', ') || 'English, Urdu, Punjabi',
    },
    {
      icon: Award,
      label: 'Production Experience',
      value: '3+ Years (8+ Apps Shipped)',
    },
  ];

  return (
    <AppShell title="Profile" subtitle="AFAQ MEHMOOD">
      <div className="space-y-4 pb-8">
        {/* Profile Header Card */}
        <div className="bg-surface rounded-3xl p-5 border border-border shadow-sm flex flex-col items-center text-center space-y-3">
          {/* Avatar with status badge */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent shadow-lg bg-surface-alt">
              <img
                src="/me.png"
                alt={portfolioData.profile.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/afaq-mehmood.png';
                }}
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-surface" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-xl font-display font-bold text-white">
                {portfolioData.profile.name}
              </h1>
              <CheckCircle2 className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xs font-mono font-medium text-accent mt-0.5">
              {portfolioData.profile.title}
            </p>
          </div>

          <p className="text-xs text-ink-muted italic border-l-2 border-accent pl-3 text-left py-1">
            "{portfolioData.profile.tagline}"
          </p>

          <p className="text-xs text-ink-muted leading-relaxed text-left">
            {portfolioData.profile.summary}
          </p>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-2 gap-2 w-full pt-1">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="py-2.5 px-3 rounded-xl bg-accent text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-accent-hover transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="py-2.5 px-3 rounded-xl bg-surface-alt border border-border text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span>Copy Email</span>
            </button>
          </div>
        </div>

        {/* Quick Facts List Rows (iOS Settings Style) */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-mono font-bold text-ink-muted uppercase tracking-wider px-1">
            Core Profile Facts
          </h3>
          <div className="rounded-2xl bg-surface border border-border divide-y divide-border overflow-hidden shadow-sm">
            {facts.map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 text-ink-muted">
                    <Icon className="w-4 h-4 text-accent" />
                    <span className="font-medium text-white">{fact.label}</span>
                  </div>
                  <span
                    className={`font-mono text-right text-[11px] truncate ${
                      fact.highlight ? 'text-accent font-bold' : 'text-ink-muted'
                    }`}
                  >
                    {fact.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions (Download CV & LinkedIn) */}
        <div className="space-y-2">
          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            className="w-full py-3 px-4 rounded-2xl bg-surface border border-border hover:border-accent text-white font-semibold text-xs flex items-center justify-between shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-accent" />
              <span>Download Official Resume PDF</span>
            </div>
            <span className="text-[10px] font-mono text-accent font-bold">152 KB</span>
          </a>

          <a
            href={portfolioData.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-surface border border-border hover:border-accent text-white font-semibold text-xs flex items-center justify-between shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>Connect on LinkedIn</span>
            </div>
            <span className="text-[10px] font-mono text-accent">↗</span>
          </a>
        </div>
      </div>
    </AppShell>
  );
};
