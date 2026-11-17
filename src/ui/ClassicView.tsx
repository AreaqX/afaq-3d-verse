import React from 'react';
import { portfolioData } from '../data/portfolio';
import { useOS } from '../store/useOS';
import { Download, Linkedin, Mail, Copy, Smartphone, MapPin, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-stage text-ink font-sans antialiased overflow-y-auto selection:bg-accent-soft selection:text-accent">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-surface/90 border-b border-border backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="font-display font-black text-lg text-white tracking-tight">AFAQ MEHMOOD</span>
          <span className="hidden sm:inline font-mono text-xs text-ink-muted">/ CLASSIC ACCESSIBLE VIEW</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={portfolioData.profile.cv}
            download="Afaq_Mehmood_Resume.pdf"
            className="px-3.5 py-1.5 rounded-lg bg-surface hover:bg-surface-alt border border-border text-xs font-mono text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>
          <button
            onClick={toggleClassicView}
            className="px-4 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-black text-xs font-mono font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>3D Smartphone Experience</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Profile / Hero Section with Portrait */}
        <section aria-labelledby="profile-heading" className="bg-surface p-8 rounded-3xl border border-border shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-accent/20 shadow-md shrink-0 bg-surface-alt">
              <img
                src="/me.png"
                alt="Afaq Mehmood"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/afaq-mehmood.png';
                }}
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-success border-2 border-white" />
            </div>

            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span>OPEN TO RELOCATION: UAE / GCC (1 MO) & LAHORE</span>
              </div>
              <h1 id="profile-heading" className="text-3xl sm:text-4xl font-display font-black text-ink tracking-tight">
                Afaq Mehmood
              </h1>
              <p className="font-mono text-sm sm:text-base text-accent font-bold">
                {portfolioData.profile.title}
              </p>
            </div>
          </div>

          <p className="text-lg text-ink font-medium leading-relaxed italic border-l-2 border-accent pl-4">
            "{portfolioData.profile.tagline}"
          </p>

          <p className="text-sm text-ink-muted leading-relaxed">
            {portfolioData.profile.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/80">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Me</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded-xl bg-surface-alt hover:bg-white/10 border border-border text-white font-mono text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Email</span>
            </button>
            <a
              href={portfolioData.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-surface-alt hover:bg-white/10 border border-border text-white font-mono text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioData.profile.cv}
              download="Afaq_Mehmood_Resume.pdf"
              className="px-4 py-2 rounded-xl bg-surface-alt hover:bg-white/10 border border-border text-white font-mono text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF (152 KB)</span>
            </a>
          </div>
        </section>

        {/* Section: Featured Mobile Apps */}
        <section aria-labelledby="featured-apps-heading" className="space-y-6">
          <div className="border-b border-border pb-4">
            <h2 id="featured-apps-heading" className="text-2xl font-display font-bold text-ink">
              Production Mobile Applications
            </h2>
            <p className="font-mono text-xs text-ink-muted mt-1">
              8 published apps built from architecture through App Store & Google Play Store release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-2xl bg-surface border border-border shadow-xs hover:border-accent hover:shadow-card transition-all flex flex-col justify-between space-y-4"
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
                          className="px-2 py-0.5 rounded-full bg-surface-alt border border-border text-[10px] font-mono text-ink-muted font-medium"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-ink">
                    {project.title}
                  </h3>

                  <p className="text-sm text-ink-muted leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[11px] text-ink-faint uppercase font-bold">Engineering Highlights</span>
                    <ul className="space-y-1.5">
                      {project.whatIDid.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-ink-muted">
                          <span className="text-accent mt-0.5 select-none font-bold">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-accent-soft text-[11px] font-mono font-medium text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section: Internal Tools & Enterprise Automation */}
        <section aria-labelledby="internal-tools-heading" className="space-y-6">
          <div className="border-b border-border pb-4">
            <h2 id="internal-tools-heading" className="text-2xl font-display font-bold text-ink">
              Internal Tools & Workflow Automation
            </h2>
            <p className="font-mono text-xs text-ink-muted mt-1">
              Custom operations platforms, CRM architectures, and automated real estate workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...internalTools, ...automationProjects].map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-2xl bg-surface border border-border shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-ink-faint uppercase font-semibold">
                    {project.category}
                  </span>
                  <span className="font-mono text-[11px] text-accent font-bold">
                    {project.subtitle}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-ink">
                  {project.title}
                </h3>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-surface-alt border border-border text-[11px] font-mono text-ink-muted"
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
          <div className="border-b border-border pb-4">
            <h2 id="tools-heading" className="text-2xl font-display font-bold text-ink">
              Technical Arsenal & Tools ({portfolioData.tools.length} Tools)
            </h2>
            <p className="font-mono text-xs text-ink-muted mt-1">
              Production tools, QA test runners, BaaS backends, and low-code enterprise automation platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {portfolioData.tools.map((tool) => (
              <div
                key={tool.name}
                className="p-3.5 rounded-xl bg-surface border border-border shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{tool.icon}</span>
                    <span className="text-xs font-mono font-bold text-ink">{tool.name}</span>
                  </div>
                  {tool.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-accent bg-accent-soft font-semibold">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-ink-faint uppercase">{tool.category}</div>
                <div className="text-xs text-ink-muted leading-snug">{tool.context}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Technical Skills */}
        <section aria-labelledby="skills-heading" className="space-y-6">
          <div className="border-b border-border pb-4">
            <h2 id="skills-heading" className="text-2xl font-display font-bold text-ink">
              Technical Skills & Competencies
            </h2>
            <p className="font-mono text-xs text-ink-muted mt-1">
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
                      className="p-3.5 rounded-xl bg-surface border border-border space-y-1"
                    >
                      <div className="text-xs font-mono font-bold text-white">
                        {skill.name}
                      </div>
                      <div className="text-[11px] text-ink-muted leading-snug">
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
          <div className="border-b border-border pb-4">
            <h2 id="trajectory-heading" className="text-2xl font-display font-bold text-white">
              Experience & Education
            </h2>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-accent uppercase font-bold tracking-wider">Experience</h3>
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface border border-border shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-xl font-display font-bold text-white">
                      {exp.role} · {exp.company}
                    </h4>
                    <span className="font-mono text-xs text-ink-muted">{exp.location}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent-soft font-mono text-xs text-accent font-bold w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-ink-muted leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-ink-muted">
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
              <div key={idx} className="p-6 rounded-2xl bg-surface border border-border shadow-xs space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-lg font-display font-bold text-white">
                      {edu.degree}
                    </h4>
                    <span className="text-sm text-accent font-bold">{edu.institution}</span>
                  </div>
                  <span className="font-mono text-xs text-ink-muted">{edu.period}</span>
                </div>
                {edu.details && (
                  <p className="text-xs text-ink-muted leading-relaxed pt-1">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section: Contact & Transmission */}
        <section aria-labelledby="contact-heading" className="p-8 rounded-3xl bg-surface border border-border shadow-card text-center space-y-6">
          <h2 id="contact-heading" className="text-3xl font-display font-bold text-white">
            Let's build something reliable.
          </h2>
          <p className="text-sm text-ink-muted max-w-lg mx-auto">
            Available for mobile engineering and full-stack software development roles. Open to relocation in UAE / GCC (available within 1 month) and on-site roles in Lahore.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-black font-mono text-xs font-bold transition-all shadow-md"
            >
              Send Email ({portfolioData.profile.email})
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 rounded-xl bg-surface-alt hover:bg-white/10 border border-border text-xs font-mono text-white transition-colors cursor-pointer"
            >
              Copy Email 📋
            </button>
            <a
              href={portfolioData.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-surface-alt hover:bg-white/10 border border-border text-xs font-mono text-white transition-colors cursor-pointer"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-xs font-mono text-ink-faint">
        AFAQ MEHMOOD · MOBILE APP DEVELOPER · SOFTWARE ENGINEER · SQA ENGINEER · {new Date().getFullYear()}
      </footer>
    </div>
  );
};
