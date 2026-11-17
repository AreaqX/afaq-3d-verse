import React from 'react';
import { Mail, Copy, Phone, Linkedin, Download, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { AppShell } from '../os/AppShell';
import { useOS } from '../store/useOS';

export const MessagesApp: React.FC = () => {
  const addToast = useOS((state) => state.addToast);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    addToast(`Email copied: ${portfolioData.profile.email}`, 'success');
  };

  const handleCopyPhone = () => {
    if (portfolioData.profile.phone) {
      navigator.clipboard.writeText(portfolioData.profile.phone);
      addToast(`Phone copied: ${portfolioData.profile.phone}`, 'success');
    }
  };

  return (
    <AppShell title="Afaq Mehmood" subtitle="ONLINE · SIALKOT, PK">
      <div className="space-y-4 pb-6 flex flex-col justify-between min-h-[460px] text-white">
        {/* Chat Messages Stream */}
        <div className="space-y-3 pt-2">
          {/* Timestamp Pill */}
          <div className="text-center">
            <span className="text-[10px] font-mono text-ink-muted px-2.5 py-1 rounded-full bg-surface border border-border">
              Today
            </span>
          </div>

          {/* Bubble 1: Welcome */}
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-white/20">
              <img src="/me.png" alt="Afaq" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm p-3 bg-surface border border-border shadow-sm text-xs text-white space-y-1">
              <p>Hi! Thanks for checking out my portfolio. 👋</p>
            </div>
          </div>

          {/* Bubble 2: Introduction */}
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-white/20">
              <img src="/me.png" alt="Afaq" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm p-3 bg-surface border border-border shadow-sm text-xs text-white space-y-1">
              <p>
                I'm a Full Stack Mobile Developer & SQA Specialist with 3+ years of experience shipping production apps to the App Store and Google Play.
              </p>
            </div>
          </div>

          {/* Bubble 3: Relocation */}
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-white/20">
              <img src="/me.png" alt="Afaq" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm p-3 bg-surface border border-border shadow-sm text-xs text-white space-y-1">
              <p>
                I am actively open to relocation (UAE / GCC) within 1 month, and also open to roles in Lahore.
              </p>
              <p className="text-[10px] text-accent font-semibold pt-0.5">
                Let's build something reliable together!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Reply Buttons */}
        <div className="space-y-2 pt-4">
          <div className="text-[10px] font-mono font-bold text-accent uppercase px-1">
            Direct Action Shortcuts
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="p-2.5 rounded-xl bg-accent text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:bg-accent-hover transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Afaq</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="p-2.5 rounded-xl bg-surface border border-border text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-alt transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-accent" />
              <span>Copy Email</span>
            </button>

            {portfolioData.profile.phone && (
              <a
                href={`tel:${portfolioData.profile.phone.replace(/\s+/g, '')}`}
                className="p-2.5 rounded-xl bg-surface border border-border text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-alt transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Phone</span>
              </a>
            )}

            <a
              href={portfolioData.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface border border-border text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-alt transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Quick Message Input Box (Visual only) */}
          <div className="pt-2">
            <div className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-surface border border-border">
              <input
                type="text"
                placeholder="Type a message..."
                readOnly
                onClick={handleCopyEmail}
                className="flex-1 bg-transparent text-xs text-white placeholder:text-ink-muted focus:outline-none cursor-pointer"
              />
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="p-2 rounded-xl bg-accent text-black hover:bg-accent-hover transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
