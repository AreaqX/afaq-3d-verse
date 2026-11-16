import React from 'react';
import { portfolioData } from '../data/portfolio';
import { useNav } from '../store/useNav';

export const ClassicView: React.FC = () => {
  const toggleClassicView = useNav((state) => state.toggleClassicView);
  const addToast = useNav((state) => state.addToast);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    addToast('Email copied to clipboard (YOUR_EMAIL_HERE)', 'success');
  };

  const featuredProjects = portfolioData.projects.filter((p) => p.featured);
  const internalTools = portfolioData.projects.filter((p) => p.category === 'Internal Tools');
  const automationProjects = portfolioData.projects.filter((p) => p.category === 'Automation');

  return (
    <div className="min-h-screen bg-[#07080A] text-[#EDEDED] font-sans antialiased overflow-y-auto selection:bg-[#C6FF3D] selection:text-[#07080A]">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-[#07080A]/95 border-b border-[#202530] backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF3D]" />
          <span className="font-display font-bold text-lg text-[#FFFFFF]">AFAQ MEHMOOD</span>
          <span className="hidden sm:inline font-mono text-xs text-[#8E8E93]">/ CLASSIC ACCESSIBLE VIEW</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={portfolioData.profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded bg-[#121620] hover:bg-[#1A2130] border border-[#242D3C] text-xs font-mono text-[#EDEDED] transition-colors"
          >
            Download CV ↓
          </a>
          <button
            onClick={toggleClassicView}
            className="px-4 py-1.5 rounded bg-[#C6FF3D] hover:bg-[#B4F524] text-[#07080A] text-xs font-mono font-bold transition-all shadow-md shadow-[#C6FF3D]/10"
          >
            Launch 3D Experience 🚀
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Profile / Hero Section */}
        <section aria-labelledby="profile-heading" className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121720] border border-[#242C3A] text-xs font-mono text-[#A6ADB8]">
              <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-pulse" />
              <span>Sialkot, PK · Open to relocation (UAE / GCC) & Lahore</span>
            </div>
            <h1 id="profile-heading" className="text-4xl sm:text-5xl font-display font-bold text-[#FFFFFF] tracking-tight">
              Afaq Mehmood
            </h1>
            <p className="font-mono text-base sm:text-lg text-[#C6FF3D] font-medium">
              {portfolioData.profile.title}
            </p>
          </div>

          <p className="text-lg text-[#B0B6C2] font-medium leading-relaxed max-w-2xl">
            "{portfolioData.profile.tagline}"
          </p>

          <p className="text-base text-[#9299A6] leading-relaxed max-w-3xl">
            {portfolioData.profile.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="px-4 py-2 rounded bg-[#C6FF3D] hover:bg-[#B4F524] text-[#07080A] font-mono text-xs font-bold transition-colors"
            >
              Send Email ↗
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2 rounded bg-[#121620] hover:bg-[#1A2130] border border-[#242D3C] text-[#EDEDED] font-mono text-xs transition-colors"
            >
              Copy Email 📋
            </button>
            <a
              href={portfolioData.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-[#121620] hover:bg-[#1A2130] border border-[#242D3C] text-[#EDEDED] font-mono text-xs transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={portfolioData.profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-[#121620] hover:bg-[#1A2130] border border-[#242D3C] text-[#EDEDED] font-mono text-xs transition-colors"
            >
              Resume PDF ↓
            </a>
          </div>
        </section>

        {/* Section: Featured Mobile Apps */}
        <section aria-labelledby="featured-apps-heading" className="space-y-8">
          <div className="border-b border-[#202530] pb-4">
            <h2 id="featured-apps-heading" className="text-2xl font-display font-bold text-[#FFFFFF]">
              Featured Production Mobile Applications
            </h2>
            <p className="font-mono text-xs text-[#8E8E93] mt-1">
              8 published apps built from architecture through App Store & Google Play Store release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-xl bg-[#0D1117] border border-[#202530] hover:border-[#C6FF3D]/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#C6FF3D] uppercase tracking-wider">
                      {project.subtitle}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.platforms?.map((plat) => (
                        <span
                          key={plat}
                          className="px-2 py-0.5 rounded bg-[#161B24] border border-[#242B38] text-[10px] font-mono text-[#D1D5DB]"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#FFFFFF]">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-xs text-[#8E8E93] uppercase">Engineering Highlights</span>
                    <ul className="space-y-1.5">
                      {project.whatIDid.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#B0B6C2]">
                          <span className="text-[#C6FF3D] mt-0.5 select-none font-bold">›</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#1C222E]">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#121620] border border-[#1E2532] text-[11px] font-mono text-[#C6FF3D]"
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
        <section aria-labelledby="internal-tools-heading" className="space-y-8">
          <div className="border-b border-[#202530] pb-4">
            <h2 id="internal-tools-heading" className="text-2xl font-display font-bold text-[#FFFFFF]">
              Internal Tools & Workflow Automation
            </h2>
            <p className="font-mono text-xs text-[#8E8E93] mt-1">
              Custom operations platforms, CRM architectures, and financial modeling tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...internalTools, ...automationProjects].map((project) => (
              <article
                key={project.id}
                className="p-6 rounded-xl bg-[#0D1117] border border-[#202530] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#8E8E93] uppercase">
                    {project.category}
                  </span>
                  <span className="font-mono text-[11px] text-[#C6FF3D]">
                    {project.subtitle}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-[#FFFFFF]">
                  {project.title}
                </h3>

                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#121620] border border-[#1E2532] text-[11px] font-mono text-[#C6FF3D]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section: Research & Lab Explorations */}
        <section aria-labelledby="research-heading" className="space-y-6">
          <div className="border-b border-[#202530] pb-4">
            <h2 id="research-heading" className="text-2xl font-display font-bold text-[#FFFFFF]">
              Research & Lab Explorations
            </h2>
            <p className="font-mono text-xs text-[#8E8E93] mt-1">
              Active engineering experiments spanning AI copilots, Model Context Protocol, and declarative backend security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioData.research.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-lg bg-[#0C1016] border border-[#1E2532] space-y-2.5"
              >
                <h3 className="text-base font-display font-bold text-[#FFFFFF]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#141922] text-[10px] font-mono text-[#8E8E93]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Technical Skills */}
        <section aria-labelledby="skills-heading" className="space-y-6">
          <div className="border-b border-[#202530] pb-4">
            <h2 id="skills-heading" className="text-2xl font-display font-bold text-[#FFFFFF]">
              Technical Skills & Competencies
            </h2>
            <p className="font-mono text-xs text-[#8E8E93] mt-1">
              Core technologies and practical production context for each skill.
            </p>
          </div>

          <div className="space-y-6">
            {portfolioData.skills.map((group) => (
              <div key={group.name} className="space-y-3">
                <h3 className="text-sm font-mono text-[#C6FF3D] font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
                  <span>{group.name}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-lg bg-[#0D1117] border border-[#1E2532] space-y-1"
                    >
                      <div className="text-xs font-mono font-bold text-[#FFFFFF]">
                        {skill.name}
                      </div>
                      <div className="text-[11px] text-[#7A8394] leading-snug">
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
          <div className="border-b border-[#202530] pb-4">
            <h2 id="trajectory-heading" className="text-2xl font-display font-bold text-[#FFFFFF]">
              Experience & Education
            </h2>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-[#C6FF3D] uppercase tracking-wider">Experience</h3>
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#0D1117] border border-[#202530] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-xl font-display font-bold text-[#FFFFFF]">
                      {exp.role} · {exp.company}
                    </h4>
                    <span className="font-mono text-xs text-[#8E8E93]">{exp.location}</span>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#161C26] font-mono text-xs text-[#C6FF3D] w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs text-[#B0B6C2]">
                      <span className="text-[#C6FF3D] font-bold">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs text-[#C6FF3D] uppercase tracking-wider">Education</h3>
            {portfolioData.education.map((edu, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#0D1117] border border-[#202530] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-lg font-display font-bold text-[#FFFFFF]">
                      {edu.degree}
                    </h4>
                    <span className="text-sm text-[#C6FF3D]">{edu.institution}</span>
                  </div>
                  <span className="font-mono text-xs text-[#8E8E93]">{edu.period}</span>
                </div>
                {edu.details && (
                  <p className="text-xs text-[#9CA3AF] leading-relaxed pt-1">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section: Contact & Transmission */}
        <section aria-labelledby="contact-heading" className="p-8 rounded-2xl bg-[#0D1117] border border-[#202530] text-center space-y-6">
          <h2 id="contact-heading" className="text-3xl font-display font-bold text-[#FFFFFF]">
            Let's build something reliable.
          </h2>
          <p className="text-sm text-[#9CA3AF] max-w-lg mx-auto">
            Available for mobile engineering and full-stack software development roles. Open to relocation in UAE / GCC (available within 1 month) and on-site roles in Lahore.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="px-5 py-2.5 rounded bg-[#C6FF3D] hover:bg-[#B4F524] text-[#07080A] font-mono text-xs font-bold transition-all shadow-md shadow-[#C6FF3D]/10"
            >
              Send Email ({portfolioData.profile.email})
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-4 py-2.5 rounded bg-[#161C26] hover:bg-[#202838] border border-[#2A3445] text-xs font-mono text-[#EDEDED] transition-colors"
            >
              Copy Email 📋
            </button>
            <a
              href={portfolioData.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded bg-[#161C26] hover:bg-[#202838] border border-[#2A3445] text-xs font-mono text-[#EDEDED] transition-colors"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1C222E] px-6 py-8 text-center text-xs font-mono text-[#6E7687]">
        AFAQ MEHMOOD · MOBILE APP DEVELOPER · SOFTWARE ENGINEER · SQA ENGINEER · {new Date().getFullYear()}
      </footer>
    </div>
  );
};
