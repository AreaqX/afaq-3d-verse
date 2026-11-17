import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData, Project, ToolItem } from '../data/portfolio';
import { useNav } from '../store/useNav';
import { ProjectPanel } from './ProjectPanel';
import { CommandPalette } from './CommandPalette';

export const ProfessionalGlassPortfolio: React.FC = () => {
  const setActiveProject = useNav((state) => state.setActiveProject);
  const toggleCommandPalette = useNav((state) => state.toggleCommandPalette);
  const addToast = useNav((state) => state.addToast);
  const squashBug = useNav((state) => state.squashBug);
  const squashedBugsCount = useNav((state) => state.squashedBugsCount);

  // Active section tracker for navbar highlighting
  const [activeSection, setActiveSection] = useState<string>('about');

  // Tools filtering & search state (Defaults to Mobile & Web so height is neatly managed)
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>('Mobile & Web');
  const [toolSearchQuery, setToolSearchQuery] = useState<string>('');

  const toolCategories = [
    'All',
    'Mobile & Web',
    'SQA & Testing',
    'Backend & Cloud',
    'Low-Code & Automation',
    'PM & Tracking',
    'Office & Documentation',
    'Integrations & APIs'
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'tools', 'mobile-apps', 'internal-systems', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered tools list
  const filteredTools = useMemo(() => {
    return portfolioData.tools.filter((t) => {
      const matchesCat = selectedToolCategory === 'All' || t.category === selectedToolCategory;
      const matchesSearch =
        toolSearchQuery.trim() === '' ||
        t.name.toLowerCase().includes(toolSearchQuery.toLowerCase()) ||
        t.context.toLowerCase().includes(toolSearchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(toolSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedToolCategory, toolSearchQuery]);

  // Mobile apps (8 featured mobile apps)
  const mobileProjects = useMemo(() => {
    return portfolioData.projects.filter((p) => p.category === 'Mobile Apps');
  }, []);

  // Internal tools (Retool portals)
  const internalTools = useMemo(() => {
    return portfolioData.projects.filter((p) => p.category === 'Internal Tools');
  }, []);

  // Workflow automation (Podio & GoHighLevel)
  const automationProjects = useMemo(() => {
    return portfolioData.projects.filter((p) => p.category === 'Automation');
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.profile.email);
    addToast(`Email copied: ${portfolioData.profile.email}`, 'success');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: '01 About' },
    { id: 'tools', label: '02 Tools' },
    { id: 'mobile-apps', label: '03 Mobile Apps' },
    { id: 'internal-systems', label: '04 Enterprise' },
    { id: 'experience', label: '05 Experience' },
    { id: 'education', label: '06 Education' },
    { id: 'contact', label: '07 Contact' }
  ];

  return (
    <div className="relative min-h-screen bg-[#06080F] text-[#F1F5F9] font-sans selection:bg-[#00E5FF] selection:text-[#06080F]">
      {/* Dynamic Ambient Glowing Glass Orbs (Background) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#00E5FF]/10 via-[#3B82F6]/5 to-transparent blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#6366F1]/10 via-[#00E5FF]/5 to-transparent blur-[150px]" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#00E5FF]/8 via-[#0F172A]/20 to-transparent blur-[160px]" />
        {/* Geometric subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Sticky Frosted Glass Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#06080F]/85 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo / Monogram */}
          <button
            onClick={() => scrollToSection('about')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)] group-hover:scale-105 transition-transform">
              <span className="font-display font-black text-sm text-[#00E5FF]">AM</span>
            </div>
            <div>
              <div className="font-display font-bold text-sm sm:text-base text-[#FFFFFF] tracking-tight flex items-center gap-2">
                <span>AFAQ MEHMOOD</span>
                <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[10px] font-mono text-[#00E5FF] border border-[#00E5FF]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                  <span>RELOCATION: UAE / GCC & LAHORE</span>
                </span>
              </div>
              <p className="font-mono text-xs text-[#94A3B8] hidden sm:block">
                {portfolioData.profile.title}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full border-white/[0.08]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00E5FF] text-[#06080F] font-bold shadow-[0_0_12px_rgba(0,229,255,0.35)]'
                      : 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-white/[0.06]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={toggleCommandPalette}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl glass-pill text-xs font-mono text-[#94A3B8] hover:text-[#FFFFFF] hover:border-[#00E5FF]/40 transition-colors cursor-pointer"
              title="Search commands, projects, and tools (Ctrl+K or /)"
            >
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-[#00E5FF]">Ctrl+K</kbd>
            </button>

            {/* Direct CV Download */}
            <a
              href={portfolioData.profile.cv}
              download="Afaq_Mehmood_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#00C4DB] text-[#06080F] font-mono text-xs font-bold transition-all shadow-[0_0_18px_rgba(0,229,255,0.35)] flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>Download CV</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Managed Sections Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-28">
        
        {/* ===================== SECTION 01: EXECUTIVE PROFILE & ABOUT ===================== */}
        <section id="about" className="scroll-mt-28 space-y-6">
          {/* Section Header Pill */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 font-bold">
              SECTION 01 · EXECUTIVE PROFILE & OVERVIEW
            </span>
            <span className="font-mono text-xs text-[#64748B] hidden sm:block">
              FULL STACK · MOBILE APPS · SQA & SECURITY
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 sm:p-12 lg:p-14 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            {/* Top Cyan Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-80" />

            <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
              <div className="flex-1 space-y-6">
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/40 shadow-[0_0_12px_rgba(0,229,255,0.15)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                    <span>AVAILABLE WITHIN 1 MONTH · RELOCATION READY</span>
                  </span>
                  <span className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-mono text-[#94A3B8]">
                    📍 {portfolioData.profile.location}
                  </span>
                  <span className="glass-pill px-3.5 py-1.5 rounded-full text-xs font-mono text-[#CBD5E1]">
                    TARGET: UAE / GCC & LAHORE
                  </span>
                </div>

                {/* Main Hero Name */}
                <div>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-[#FFFFFF] tracking-tight">
                    {portfolioData.profile.name}
                  </h1>
                  <p className="text-lg sm:text-2xl font-mono text-[#00E5FF] font-bold mt-2 tracking-wide">
                    {portfolioData.profile.title}
                  </p>
                </div>

                {/* Tagline */}
                <p className="text-base sm:text-xl text-[#F1F5F9] font-medium leading-relaxed max-w-3xl border-l-2 border-[#00E5FF] pl-4">
                  "{portfolioData.profile.tagline}"
                </p>

                {/* Professional Summary */}
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-3xl">
                  {portfolioData.profile.summary}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => scrollToSection('tools')}
                    className="px-6 py-3.5 rounded-xl bg-[#00E5FF] hover:bg-[#00C4DB] text-[#06080F] font-mono text-xs sm:text-sm font-bold transition-all shadow-[0_0_22px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <span>EXPLORE ALL 45 TOOLS</span>
                    <span>↓</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('mobile-apps')}
                    className="glass-card-interactive px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm text-[#F1F5F9] hover:text-[#00E5FF] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>VIEW 8 MOBILE APPS</span>
                    <span>→</span>
                  </button>

                  <a
                    href={portfolioData.profile.cv}
                    download="Afaq_Mehmood_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card-interactive px-5 py-3.5 rounded-xl font-mono text-xs sm:text-sm text-[#CBD5E1] hover:text-[#00E5FF] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>DOWNLOAD RESUME PDF</span>
                    <span>📄</span>
                  </a>
                </div>
              </div>

              {/* Metric Highlights Sidebar */}
              <div className="w-full lg:w-80 grid grid-cols-2 lg:grid-cols-1 gap-3.5 pt-4 lg:pt-0">
                <div className="glass-card-interactive p-4 sm:p-5 rounded-2xl">
                  <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#00E5FF]">3+</div>
                  <div className="font-mono text-xs font-bold text-[#FFFFFF] mt-1">YEARS PRODUCTION EXP</div>
                  <div className="text-[11px] text-[#94A3B8] mt-0.5">FlutterFlow, Firebase, Supabase & React</div>
                </div>

                <div className="glass-card-interactive p-4 sm:p-5 rounded-2xl">
                  <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#00E5FF]">8+</div>
                  <div className="font-mono text-xs font-bold text-[#FFFFFF] mt-1">APPS PUBLISHED</div>
                  <div className="text-[11px] text-[#94A3B8] mt-0.5">Live on Apple App Store & Google Play</div>
                </div>

                <div className="glass-card-interactive p-4 sm:p-5 rounded-2xl">
                  <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#00E5FF]">100%</div>
                  <div className="font-mono text-xs font-bold text-[#FFFFFF] mt-1">QA RELEASE MATRIX</div>
                  <div className="text-[11px] text-[#94A3B8] mt-0.5">Manual, UAT, Postman API & regression</div>
                </div>

                <div className="glass-card-interactive p-4 sm:p-5 rounded-2xl">
                  <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#00E5FF]">5+</div>
                  <div className="font-mono text-xs font-bold text-[#FFFFFF] mt-1">MULTI-TENANT SAAS</div>
                  <div className="text-[11px] text-[#94A3B8] mt-0.5">Advanced RLS, RBAC & payment splits</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===================== SECTION 02: TECHNICAL ARSENAL & TOOLKIT ===================== */}
        <section id="tools" className="scroll-mt-28 space-y-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 font-bold inline-block mb-2">
                SECTION 02 · TECHNICAL ARSENAL & SKILLS MATRIX
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#FFFFFF] tracking-tight">
                All 45 Tools & Technical Competencies
              </h2>
              <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
                Every verified tool, framework, QA methodology, and enterprise platform used across client deliveries and production releases.
              </p>
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-72 relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">🔍</span>
              <input
                type="text"
                value={toolSearchQuery}
                onChange={(e) => setToolSearchQuery(e.target.value)}
                placeholder="Search tools (e.g. Jira, Postman, Excel)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-pill text-xs font-mono text-[#FFFFFF] placeholder-[#64748B] focus:outline-none focus:border-[#00E5FF]"
              />
              {toolSearchQuery && (
                <button
                  onClick={() => setToolSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#FFFFFF]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Managed Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            {toolCategories.map((cat) => {
              const isSelected = selectedToolCategory === cat;
              const count =
                cat === 'All'
                  ? portfolioData.tools.length
                  : portfolioData.tools.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedToolCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00E5FF] text-[#06080F] font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'glass-pill text-[#94A3B8] hover:text-[#FFFFFF] hover:border-[#00E5FF]/40'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Managed Compact High-Density Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredTools.map((tool, idx) => (
                <motion.div
                  key={tool.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.2) }}
                  className="glass-card-interactive p-4 sm:p-5 rounded-2xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl select-none">{tool.icon || '⚡'}</span>
                        <h3 className="font-display font-bold text-base text-[#FFFFFF] group-hover:text-[#00E5FF] transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      {tool.badge && (
                        <span className="px-2 py-0.5 rounded-md glass-pill text-[10px] font-mono text-[#00E5FF] border-[#00E5FF]/30">
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    <span className="inline-block text-[11px] font-mono text-[#64748B] mb-2 uppercase tracking-wider">
                      {tool.category}
                    </span>

                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      {tool.context}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>STATUS: VERIFIED</span>
                    <span className="text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity">
                      PRODUCTION READY ✓
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredTools.length === 0 && (
            <div className="glass-panel p-12 text-center rounded-2xl">
              <p className="font-mono text-sm text-[#94A3B8]">No tools matched your search "{toolSearchQuery}".</p>
              <button
                onClick={() => {
                  setSelectedToolCategory('All');
                  setToolSearchQuery('');
                }}
                className="mt-3 px-4 py-2 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] font-mono text-xs font-bold hover:bg-[#00E5FF]/30 cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </section>

        {/* ===================== SECTION 03: PRODUCTION MOBILE APPLICATIONS ===================== */}
        <section id="mobile-apps" className="scroll-mt-28 space-y-6">
          {/* Section Header */}
          <div className="border-b border-white/[0.08] pb-4">
            <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 font-bold inline-block mb-2">
              SECTION 03 · PRODUCTION MOBILE APPLICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#FFFFFF] tracking-tight">
              8 Shipped Mobile Apps (App Store & Google Play)
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
              Full lifecycle mobile app delivery: client requirements, state architecture, API integration, payment processing, and store release compliance.
            </p>
          </div>

          {/* 8 Mobile Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {mobileProjects.map((proj) => (
              <motion.article
                key={proj.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="glass-panel p-5 sm:p-6 rounded-3xl flex flex-col justify-between border border-white/[0.08] hover:border-[#00E5FF]/50 transition-all shadow-xl group"
              >
                <div className="space-y-3.5">
                  {/* Platforms & Category */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5">
                    <span className="font-mono text-[11px] text-[#00E5FF] font-bold uppercase tracking-wider">
                      MOBILE APP
                    </span>
                    <div className="flex items-center gap-1">
                      {proj.platforms?.map((plat) => (
                        <span
                          key={plat}
                          className="px-2 py-0.5 rounded-md glass-pill text-[10px] font-mono text-[#D1D5DB]"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-display font-black text-[#FFFFFF] group-hover:text-[#00E5FF] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="font-mono text-xs text-[#94A3B8] mt-0.5">
                      {proj.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#CBD5E1] leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Highlights */}
                  {proj.whatIDid && proj.whatIDid.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-mono text-[#94A3B8] font-bold uppercase">
                        QA & Architecture:
                      </div>
                      <ul className="space-y-1">
                        {proj.whatIDid.slice(0, 2).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#CBD5E1]">
                            <span className="text-[#00E5FF] font-bold">›</span>
                            <span className="leading-tight">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md glass-pill text-[10px] font-mono text-[#00E5FF] border-[#00E5FF]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inspect Specs Button */}
                <div className="pt-4 mt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => setActiveProject(proj)}
                    className="w-full py-2 px-3 rounded-xl glass-card-interactive text-xs font-mono text-[#F1F5F9] hover:text-[#00E5FF] flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                  >
                    <span>INSPECT FULL SPECS</span>
                    <span>↗</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ===================== SECTION 04: ENTERPRISE SYSTEMS & AUTOMATION ===================== */}
        <section id="internal-systems" className="scroll-mt-28 space-y-8">
          {/* Section Header */}
          <div className="border-b border-white/[0.08] pb-4">
            <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 font-bold inline-block mb-2">
              SECTION 04 · ENTERPRISE SYSTEMS & AUTOMATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#FFFFFF] tracking-tight">
              Internal Portals, Retool Dashboards & CRM Pipelines
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
              Custom enterprise operational consoles, real estate automation pipelines, and multi-tenant administrative systems.
            </p>
          </div>

          {/* Part A: Retool Administrative & Logistics Portals */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
              <h3 className="font-mono text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
                PART A: RETOOL OPERATIONAL PORTALS & SAAS BACKENDS
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {internalTools.map((tool) => (
                <div
                  key={tool.id}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-white/[0.08] space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                      <span>INTERNAL TOOL</span>
                      <span className="text-[#00E5FF]">ENTERPRISE</span>
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#FFFFFF]">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {tool.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded glass-pill text-[10px] font-mono text-[#D1D5DB]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveProject(tool)}
                    className="w-full py-2 px-3 rounded-lg glass-card-interactive text-xs font-mono text-[#F1F5F9] hover:text-[#00E5FF] font-bold text-center cursor-pointer"
                  >
                    View Architecture Specs ↗
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Part B: Workflow Automation & CRM Pipelines */}
          <div className="space-y-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <h3 className="font-mono text-xs font-bold text-[#3B82F6] uppercase tracking-wider">
                PART B: PODIO & GOHIGHLEVEL WORKFLOW AUTOMATIONS
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {automationProjects.map((auto) => (
                <div
                  key={auto.id}
                  className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-white/[0.08] space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                      <span>AUTOMATION PIPELINE</span>
                      <span className="text-[#3B82F6]">PRODUCTION</span>
                    </div>
                    <h4 className="text-lg font-display font-bold text-[#FFFFFF]">
                      {auto.title}
                    </h4>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      {auto.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {auto.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded glass-pill text-[10px] font-mono text-[#D1D5DB]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveProject(auto)}
                    className="w-full py-2 px-3 rounded-lg glass-card-interactive text-xs font-mono text-[#F1F5F9] hover:text-[#00E5FF] font-bold text-center cursor-pointer"
                  >
                    View Pipeline Specs ↗
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== SECTION 05: PROFESSIONAL WORK EXPERIENCE ===================== */}
        <section id="experience" className="scroll-mt-28 space-y-6">
          {/* Section Header */}
          <div className="border-b border-white/[0.08] pb-4">
            <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 font-bold inline-block mb-2">
              SECTION 05 · PROFESSIONAL WORK EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#FFFFFF] tracking-tight">
              Industry Experience & QA Leadership
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
              Senior engineering tenure, client requirement management, database security rules, and end-to-end release testing.
            </p>
          </div>

          <div className="space-y-6">
            {portfolioData.experience.map((exp, idx) => (
              <div
                key={idx}
                className="glass-panel p-7 sm:p-10 rounded-3xl space-y-6 border border-white/[0.08] shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
                  <div className="flex items-center gap-3">
                    <span className="glass-pill px-3.5 py-1.5 rounded-lg font-mono text-xs text-[#00E5FF] font-bold border-[#00E5FF]/30">
                      {exp.period}
                    </span>
                    <span className="glass-pill px-3.5 py-1.5 rounded-lg font-mono text-xs text-[#94A3B8]">
                      📍 {exp.location}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#00E5FF] font-semibold">
                    ROLE: SENIOR SOFTWARE DEVELOPER
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-display font-black text-[#FFFFFF]">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-base text-[#00E5FF] font-bold mt-1">
                    {exp.company}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-4xl">
                  {exp.description}
                </p>

                <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                  <h4 className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider font-bold">
                    Key Engineering Contributions & QA Milestones:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="glass-card-interactive p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-[#E2E8F0]"
                      >
                        <span className="text-[#00E5FF] font-bold text-sm leading-none">›</span>
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== SECTION 06: EDUCATION & RELOCATION ===================== */}
        <section id="education" className="scroll-mt-28 space-y-6">
          {/* Section Header */}
          <div className="border-b border-white/[0.08] pb-4">
            <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 font-bold inline-block mb-2">
              SECTION 06 · ACADEMIC CREDENTIALS & GLOBAL MOBILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#FFFFFF] tracking-tight">
              Education & Relocation Readiness
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
              Formal computer science foundations, degree credentials, and international availability for on-site roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Degree 1 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 border border-white/[0.08] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs font-mono text-[#00E5FF]">
                  <span>BACHELOR OF SCIENCE</span>
                  <span>2019 – 2023</span>
                </div>
                <h3 className="text-xl font-display font-bold text-[#FFFFFF]">
                  BS Software Engineering
                </h3>
                <p className="font-mono text-xs text-[#00E5FF] font-semibold">
                  University of Sialkot
                </p>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Rigorous focus on Software Testing & Quality Assurance, Advanced Data Structures, Cloud Architecture, and Relational Database Normalization.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#94A3B8]">
                LOCATION: Sialkot, Pakistan
              </div>
            </div>

            {/* Degree 2 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 border border-white/[0.08] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs font-mono text-[#94A3B8]">
                  <span>INTERMEDIATE (HSSC)</span>
                  <span>2017 – 2019</span>
                </div>
                <h3 className="text-xl font-display font-bold text-[#FFFFFF]">
                  Intermediate, Computer Science
                </h3>
                <p className="font-mono text-xs text-[#00E5FF] font-semibold">
                  Superior College, Sambrial
                </p>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Foundations of Computer Science, Object-Oriented Programming principles, Mathematics, and Database Systems.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#94A3B8]">
                LOCATION: Sambrial, Pakistan
              </div>
            </div>

            {/* Languages & Relocation Status */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 border border-white/[0.08] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs font-mono text-[#00E5FF]">
                  <span>GLOBAL DEPLOYMENT</span>
                  <span>IMMEDIATE</span>
                </div>
                <h3 className="text-xl font-display font-bold text-[#FFFFFF]">
                  Relocation & Languages
                </h3>
                <div className="space-y-2 text-xs font-mono text-[#CBD5E1]">
                  <div>
                    <span className="text-[#94A3B8] block text-[10px]">TARGET LOCATIONS:</span>
                    <span className="text-[#00E5FF] font-bold">UAE / GCC (Dubai, Abu Dhabi, etc.) & Lahore</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block text-[10px]">AVAILABILITY WINDOW:</span>
                    <span className="text-[#FFFFFF]">Within 1 month</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block text-[10px]">VISA STATUS:</span>
                    <span className="text-[#FFFFFF]">Sponsorship Required</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] block text-[10px]">LANGUAGES SPOKEN:</span>
                    <span className="text-[#FFFFFF]">English, Urdu, Punjabi</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#00E5FF]">
                STATUS: READY TO DEPLOY ✓
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SECTION 07: CONTACT & TRANSMISSION BEACON ===================== */}
        <section id="contact" className="scroll-mt-28 space-y-6">
          {/* Section Header */}
          <div className="border-b border-white/[0.08] pb-4">
            <span className="glass-pill px-3 py-1 rounded-full text-xs font-mono text-[#00E5FF] border-[#00E5FF]/30 font-bold inline-block mb-2">
              SECTION 07 · TRANSMISSION BEACON & DIRECT CONTACT
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#FFFFFF] tracking-tight">
              Get In Touch & Hire Afaq Mehmood
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-2xl">
              Open to full-time Mobile Application Developer, Software Engineer, and SQA Engineer roles.
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-12 lg:p-16 rounded-3xl text-center space-y-8 relative overflow-hidden shadow-2xl">
            {/* Luminous cyan glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E5FF]/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border-[#00E5FF]/40 text-xs font-mono text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
              <span>TRANSMISSION BEACON ONLINE</span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-5xl font-display font-black text-[#FFFFFF] tracking-tight">
                Let's build something reliable.
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed mt-3">
                Whether you need a FlutterFlow engineer to ship your mobile product, a full stack developer for multi-tenant backends, or an SQA engineer to guarantee zero defects on release.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="glass-card-interactive p-4 rounded-2xl space-y-1">
                <div className="text-xs font-mono text-[#64748B]">DIRECT EMAIL</div>
                <div className="font-mono text-xs sm:text-sm text-[#FFFFFF] font-bold truncate">
                  {portfolioData.profile.email}
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-[11px] font-mono text-[#00E5FF] hover:underline cursor-pointer pt-1 inline-block"
                >
                  Copy to clipboard 📋
                </button>
              </div>

              <div className="glass-card-interactive p-4 rounded-2xl space-y-1">
                <div className="text-xs font-mono text-[#64748B]">DIRECT PHONE / WHATSAPP</div>
                <div className="font-mono text-xs sm:text-sm text-[#FFFFFF] font-bold">
                  {portfolioData.profile.phone}
                </div>
                <a
                  href={`tel:${portfolioData.profile.phone?.replace(/\s+/g, '')}`}
                  className="text-[11px] font-mono text-[#00E5FF] hover:underline pt-1 inline-block"
                >
                  Call directly 📞
                </a>
              </div>

              <div className="glass-card-interactive p-4 rounded-2xl space-y-1">
                <div className="text-xs font-mono text-[#64748B]">LOCATION & RELOCATION</div>
                <div className="font-mono text-xs sm:text-sm text-[#FFFFFF] font-bold">
                  UAE / GCC & Lahore
                </div>
                <div className="text-[11px] font-mono text-[#00E5FF] pt-1">
                  Available in 1 month ✈
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`mailto:${portfolioData.profile.email}`}
                className="px-6 py-3.5 rounded-xl bg-[#00E5FF] hover:bg-[#00C4DB] text-[#06080F] font-mono text-xs sm:text-sm font-bold transition-all shadow-[0_0_24px_rgba(0,229,255,0.4)] flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>SEND DIRECT EMAIL</span>
                <span>↗</span>
              </a>

              <a
                href={portfolioData.profile.cv}
                download="Afaq_Mehmood_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-interactive px-6 py-3.5 rounded-xl text-[#F1F5F9] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:border-[#00E5FF]/50"
              >
                <span>DOWNLOAD RESUME PDF</span>
                <span className="text-[#00E5FF]">↓</span>
              </a>

              <a
                href={portfolioData.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-interactive px-6 py-3.5 rounded-xl text-[#F1F5F9] font-mono text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:border-[#00E5FF]/50"
              >
                <span>LINKEDIN PROFILE</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.08] py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} AFAQ MEHMOOD</span>
            <span>·</span>
            <span>MOBILE APP DEVELOPER · SOFTWARE ENGINEER · SQA ENGINEER</span>
          </div>

          <div className="flex items-center gap-4">
            {/* SQA Easter Egg Bug */}
            <button
              onClick={squashBug}
              className="glass-pill px-3 py-1 rounded-full text-xs text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all cursor-pointer flex items-center gap-1.5"
              title="Click to squash an SQA bug!"
            >
              <span>🐞</span>
              <span>Bugs Squashed: {squashedBugsCount}</span>
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </main>

      {/* Slide-out Project Specification Modal */}
      <ProjectPanel />

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
};
