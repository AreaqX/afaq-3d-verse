import React from 'react';
import { portfolioData } from '../data/portfolio';
import { useOS } from '../store/useOS';
import { Download, Linkedin, Mail, Copy, Smartphone, MapPin, CheckCircle2, ExternalLink, Sparkles, Globe, Play, ShieldCheck, Rocket, Code2 } from 'lucide-react';

export const ClassicView: React.FC = () => {
  const toggleClassicView = useOS((state) => state.toggleClassicView);
  const addToast = useOS((state) => state.addToast);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    addToast(`Email copied: ${portfolioData.profile.email}`, 'success');
  };

  const featuredProjects = portfolioData.projects.filter((p) => p.featured);
  const internalTools = portfolioData.projects.filter((p) => p.category === 'Internal Tools');
  const automationProjects = portfolioData.projects.filter((p) => p.category === 'Automation');

  return (
    <div className="min-h-screen bg-[#11141A] text-white font-sans antialiased overflow-y-auto selection:bg-accent-soft selection:text-accent">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-[#141B28]/95 border-b border-[#24314A] backdrop-blur-xl px-4 sm:px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <span className="font-display font-black text-lg text-white tracking-tight">AFAQ MEHMOOD</span>
          <span className="hidden sm:inline font-mono text-xs text-accent">/ 2D RECRUITER VIEW</span>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            className="px-3.5 py-1.5 rounded-xl bg-[#1A2335] hover:bg-white/10 border border-[#24314A] text-xs font-mono font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            <span>CV (152 KB)</span>
          </a>
          <button
            onClick={toggleClassicView}
            className="px-4 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-black text-xs font-mono font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-black" />
            <span>3D Smartphone Experience</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Profile / Hero Section with Portrait */}
        <section aria-labelledby="profile-heading" className="bg-[#141B28] p-6 sm:p-8 rounded-3xl border border-[#24314A] shadow-xl space-y-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl shrink-0 bg-[#0B0F19]">
              <img
                src="/me.png"
                alt="Afaq Mehmood"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/afaq.png';
                }}
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B0F19]" />
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPEN TO RELOCATION: UAE / GCC (1 MO) & LAHORE</span>
              </div>
              <div className="flex items-center gap-2">
                <h1 id="profile-heading" className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                  Afaq Mehmood
                </h1>
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
              </div>
              <p className="font-mono text-sm sm:text-base text-accent font-bold">
                {portfolioData.profile.title}
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-white font-medium leading-relaxed italic border-l-4 border-accent pl-4">
            "{portfolioData.profile.tagline}"
          </p>

          <p className="text-sm text-[#94A3B8] leading-relaxed">
            {portfolioData.profile.summary}
          </p>

          {/* Contact Action Buttons (High-Contrast Guaranteed Visibility) */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[#24314A]">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-black font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <Mail className="w-4 h-4 text-black" />
              <span>Email Me</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-xl bg-[#1A2335] hover:bg-white/10 border border-[#24314A] text-white font-mono text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4 text-accent" />
              <span>Copy Email</span>
            </button>
            <a
              href={portfolioData.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#1A2335] hover:bg-white/10 border border-[#24314A] text-white font-mono text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Linkedin className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioData.profile.cv}
              download="Afaq_Mehmood_Resume.pdf"
              className="px-4 py-2 rounded-xl bg-[#1A2335] hover:bg-white/10 border border-[#24314A] text-white font-mono text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-accent" />
              <span>Resume PDF (152 KB)</span>
            </a>
          </div>
        </section>

        {/* Section: Featured Mobile Apps */}
        <section aria-labelledby="featured-apps-heading" className="space-y-6">
          <div className="border-b border-[#24314A] pb-3 flex items-center justify-between">
            <div>
              <h2 id="featured-apps-heading" className="text-2xl font-display font-bold text-white flex items-center gap-2">
                <Rocket className="w-6 h-6 text-accent" />
                <span>Production Mobile Applications</span>
              </h2>
              <p className="font-mono text-xs text-[#94A3B8] mt-1">
                8 published mobile apps built from architecture through App Store & Google Play release.
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              4 Live on Stores
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-2xl bg-[#141B28] border border-[#24314A] shadow-md hover:border-accent transition-all flex flex-col justify-between space-y-4 text-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-accent uppercase font-bold tracking-wider">
                      {project.subtitle}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.platforms?.map((plat) => (
                        <span
                          key={plat}
                          className="px-2 py-0.5 rounded-full bg-[#1A2335] border border-[#24314A] text-[10px] font-mono text-white/80 font-medium"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[11px] text-accent uppercase font-bold">Engineering Highlights</span>
                    <ul className="space-y-1.5">
                      {project.whatIDid.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                          <span className="text-accent mt-0.5 select-none font-bold">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#24314A]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-accent/15 border border-accent/25 text-[11px] font-mono font-medium text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Official Direct Store Links */}
                  {(project.appStoreUrl || project.playStoreUrl || project.webUrl) && (
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-white/10">
                      {project.appStoreUrl && (
                        <a
                          href={project.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/20 hover:border-accent text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <span> App Store</span>
                          <ExternalLink className="w-3 h-3 text-accent" />
                        </a>
                      )}
                      {project.playStoreUrl && (
                        <a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/20 hover:border-emerald-400 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                          <span>Google Play</span>
                          <ExternalLink className="w-3 h-3 text-emerald-400" />
                        </a>
                      )}
                      {project.webUrl && (
                        <a
                          href={project.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black border border-white/20 hover:border-sky-400 text-sky-400 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Globe className="w-3 h-3" />
                          <span>outdoorshare.app</span>
                          <ExternalLink className="w-3 h-3 text-sky-400" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section: Internal Tools & Enterprise Automation */}
        <section aria-labelledby="internal-tools-heading" className="space-y-6">
          <div className="border-b border-[#24314A] pb-3">
            <h2 id="internal-tools-heading" className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <Code2 className="w-6 h-6 text-accent" />
              <span>Internal Tools & Workflow Automation</span>
            </h2>
            <p className="font-mono text-xs text-[#94A3B8] mt-1">
              Custom operations platforms, CRM architectures, and automated real estate workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...internalTools, ...automationProjects].map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-2xl bg-[#141B28] border border-[#24314A] shadow-md space-y-3 text-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#64748B] uppercase font-semibold">
                    {project.category}
                  </span>
                  <span className="font-mono text-[11px] text-accent font-bold">
                    {project.subtitle}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-white">
                  {project.title}
                </h3>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-[#1A2335] border border-[#24314A] text-[11px] font-mono text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section: Comprehensive Technical Tools Arsenal */}
        <section aria-labelledby="tools-heading" className="space-y-6">
          <div className="border-b border-[#24314A] pb-3">
            <h2 id="tools-heading" className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>Technical Arsenal & Tools ({portfolioData.tools.length} Tools)</span>
            </h2>
            <p className="font-mono text-xs text-[#94A3B8] mt-1">
              Production tools, QA test runners, BaaS backends, and low-code enterprise automation platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {portfolioData.tools.map((tool) => (
              <div
                key={tool.name}
                className="p-3.5 rounded-xl bg-[#141B28] border border-[#24314A] shadow-xs space-y-1.5 text-white"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{tool.icon}</span>
                    <span className="text-xs font-mono font-bold text-white">{tool.name}</span>
                  </div>
                  {tool.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-accent bg-accent/20 font-bold border border-accent/30">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-[#64748B] uppercase">{tool.category}</div>
                <div className="text-xs text-[#94A3B8] leading-snug">{tool.context}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Technical Skills */}
        <section aria-labelledby="skills-heading" className="space-y-6">
          <div className="border-b border-[#24314A] pb-3">
            <h2 id="skills-heading" className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              <span>Technical Skills & Competencies</span>
            </h2>
            <p className="font-mono text-xs text-[#94A3B8] mt-1">
              Core technologies and practical production context for each domain.
            </p>
          </div>

          <div className="space-y-6">
            {portfolioData.skills.map((group) => (
              <div key={group.name} className="space-y-3">
                <h3 className="text-xs font-mono text-accent font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
                  <span>{group.name}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-xl bg-[#141B28] border border-[#24314A] space-y-1 text-white"
                    >
                      <div className="text-xs font-mono font-bold text-white">
                        {skill.name}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] leading-snug">
                        {skill.context}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Experience & Education */}
        <section aria-labelledby="trajectory-heading" className="space-y-8">
          <div className="border-b border-[#24314A] pb-3">
            <h2 id="trajectory-heading" className="text-2xl font-display font-bold text-white">
              Experience & Education
            </h2>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-accent uppercase font-bold tracking-wider">Experience</h3>
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#141B28] border border-[#24314A] shadow-md space-y-4 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-xl font-display font-bold text-white">
                      {exp.role} · {exp.company}
                    </h4>
                    <span className="font-mono text-xs text-[#94A3B8]">{exp.location}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 font-mono text-xs text-accent font-bold w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                      <span className="text-accent font-bold">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-accent uppercase font-bold tracking-wider">Education</h3>
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#141B28] border border-[#24314A] shadow-md space-y-2 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-lg font-display font-bold text-white">
                      {edu.degree}
                    </h4>
                    <span className="text-sm text-accent font-bold">{edu.institution}</span>
                  </div>
                  <span className="font-mono text-xs text-[#94A3B8]">{edu.period}</span>
                </div>
                {edu.details && (
                  <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section: Contact & Transmission */}
        <section aria-labelledby="contact-heading" className="p-8 rounded-3xl bg-[#141B28] border border-[#24314A] shadow-xl text-center space-y-6 text-white">
          <h2 id="contact-heading" className="text-3xl font-display font-bold text-white">
            Let's build something reliable.
          </h2>
          <p className="text-sm text-[#94A3B8] max-w-lg mx-auto">
            Available for mobile engineering and full-stack software development roles. Open to relocation in UAE / GCC (available within 1 month) and on-site roles in Lahore.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-black font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              Send Email ({portfolioData.profile.email})
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 rounded-xl bg-[#1A2335] hover:bg-white/10 border border-[#24314A] text-xs font-mono font-bold text-white transition-colors cursor-pointer"
            >
              Copy Email 📋
            </button>
            <a
              href={portfolioData.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1A2335] hover:bg-white/10 border border-[#24314A] text-xs font-mono font-bold text-white transition-colors cursor-pointer"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#24314A] bg-[#0E1524] px-6 py-8 text-center text-xs font-mono text-[#64748B]">
        AFAQ MEHMOOD · MOBILE APP DEVELOPER · SOFTWARE ENGINEER · SQA ENGINEER · {new Date().getFullYear()}
      </footer>
    </div>
  );
};
