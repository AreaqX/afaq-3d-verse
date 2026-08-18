import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Download, Mail, Linkedin } from 'lucide-react';
import portrait from '@/assets/me.png';

const roles = [
  'Full Stack Developer',
  'Mobile App Specialist',
  'Firebase & Supabase Security Expert',
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-28 pb-20">
      {/* Subtle grid + glow backdrop */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.35) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black, transparent 70%)',
        }}
      />
      <div
        className="absolute -top-32 right-0 z-0 h-[520px] w-[520px] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-7 text-center lg:text-left"
          >
            <p className="tech-tag text-accent uppercase tracking-[0.2em]">
              Available for new opportunities
            </p>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold hero-text tracking-tight">
                Afaq Mehmood
              </h1>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-base md:text-lg text-muted-foreground">
                {roles.map((role, i) => (
                  <span key={role} className="flex items-center gap-3">
                    {i > 0 && <span className="text-accent">·</span>}
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              3+ years shipping production SaaS — cross-platform mobile apps in FlutterFlow,
              React web dashboards, and hardened Firebase / Supabase backends with
              fine-grained RLS and role-based access control.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Sialkot, Pakistan — open to relocation (UAE / GCC)</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto px-7 rounded-xl hover-lift transition-all duration-300"
                asChild
              >
                <a href="/Afaq_Mehmood_Resume.pdf" download="Afaq_Mehmood_Resume.pdf">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-7 rounded-xl transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-7 rounded-xl transition-all duration-300"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/afaqmehmood-500327259"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[400px]">
              {/* Decorative L-shape frames */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-accent/40 rounded-tl-[3rem]" aria-hidden />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b border-r border-accent/40 rounded-br-[3rem]" aria-hidden />

              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-card border border-border shadow-2xl">
                <img
                  src={portrait}
                  alt="Portrait of Afaq Mehmood, full stack developer"
                  className="w-full h-full object-cover object-[50%_18%]"
                  loading="eager"
                />
                <div
                  className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, hsl(var(--background) / 0.8), transparent 60%)',
                  }}
                  aria-hidden
                />
                {/* Vertical mono label */}
                <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-180 [writing-mode:vertical-lr]">
                  <span className="tech-tag text-[9px] uppercase tracking-[0.6em] text-foreground/30 whitespace-nowrap">
                    EST . 2022 // PORTFOLIO // AM
                  </span>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -right-4 sm:-right-6 top-14 backdrop-blur-xl bg-foreground/5 border border-border rounded-2xl p-4 shadow-2xl">
                <p className="tech-tag text-[9px] uppercase tracking-wider text-accent">Location</p>
                <p className="text-sm font-medium text-foreground">Sialkot, PK</p>
              </div>

              <div className="absolute -left-4 sm:-left-8 bottom-16 backdrop-blur-xl bg-background/60 border border-border rounded-2xl p-4 shadow-2xl flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </span>
                <div>
                  <p className="tech-tag text-[9px] uppercase tracking-wider text-accent">Status</p>
                  <p className="text-sm font-medium text-foreground">Open to work</p>
                </div>
              </div>

              {/* Dot grid texture */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-20 pointer-events-none" aria-hidden>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="hero-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="hsl(var(--accent))" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#hero-dots)" />
                </svg>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
