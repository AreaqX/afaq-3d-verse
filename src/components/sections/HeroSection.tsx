import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Download, Mail, Linkedin } from 'lucide-react';
import portrait from '@/assets/me.png.asset.json';

const roles = [
  'Full Stack Developer',
  'Mobile App Specialist',
  'Firebase & Supabase Security Expert',
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Portrait background */}
      <img
        src={portrait.url}
        alt="Afaq Mehmood portrait"
        className="absolute inset-0 z-0 h-full w-full object-cover object-[50%_18%] md:object-[75%_20%] opacity-70 md:opacity-80"
      />
      {/* Readability scrim */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to right, hsl(var(--background) / 0.94) 0%, hsl(var(--background) / 0.86) 45%, hsl(var(--background) / 0.6) 100%)',
        }}
      />
      <div className="absolute inset-0 z-10 bg-background/55 md:bg-background/35" />

      {/* Subtle grid + glow backdrop */}
      <div
        className="absolute inset-0 z-10 opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.35) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black, transparent 70%)',
        }}
      />

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-5">
            <p className="tech-tag text-accent uppercase tracking-[0.2em]">
              Available for new opportunities
            </p>

            <h1 className="text-5xl md:text-7xl font-bold hero-text tracking-tight">
              Afaq Mehmood
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base md:text-lg text-muted-foreground">
              {roles.map((role, i) => (
                <span key={role} className="flex items-center gap-3">
                  {i > 0 && <span className="text-accent">·</span>}
                  {role}
                </span>
              ))}
            </div>
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            3+ years shipping production SaaS — cross-platform mobile apps in FlutterFlow,
            React web dashboards, and hardened Firebase / Supabase backends with
            fine-grained RLS and role-based access control.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            <span>Sialkot, Pakistan — open to relocation (UAE / GCC)</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-7 rounded-xl hover-lift transition-all duration-300"
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
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent px-7 rounded-xl transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent px-7 rounded-xl transition-all duration-300"
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
      </div>
    </section>
  );
};
