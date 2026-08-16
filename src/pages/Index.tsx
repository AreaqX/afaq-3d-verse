import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Afaq Mehmood. Built with React, TypeScript, and Three.js
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
