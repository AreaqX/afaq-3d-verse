import React, { useEffect } from 'react';
import { useOS } from './store/useOS';
import { Stage } from './stage/Stage';
import { ClassicView } from './ui/ClassicView';
import { ToastContainer } from './ui/Toast';
import { portfolioData } from './data/portfolio';

export const App: React.FC = () => {
  const isClassicView = useOS((state) => state.isClassicView);
  const setReduceMotion = useOS((state) => state.setReduceMotion);
  const setSpotlight = useOS((state) => state.setSpotlight);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      setReduceMotion(e.matches);
    };
    updateMotion(mediaQuery);
    mediaQuery.addEventListener('change', updateMotion);
    return () => mediaQuery.removeEventListener('change', updateMotion);
  }, [setReduceMotion]);

  // Global Ctrl+K / Cmd+K listener for Spotlight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlight(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSpotlight]);

  return (
    <div className="min-h-screen bg-stage text-ink selection:bg-accent-soft selection:text-accent font-sans">
      {/* Screen Reader Accessible Mirror (Visually Hidden) */}
      <div className="sr-only" aria-live="polite">
        <h1>{portfolioData.profile.name} — {portfolioData.profile.title}</h1>
        <p>{portfolioData.profile.tagline}</p>
        <p>{portfolioData.profile.summary}</p>
        <h2>Experience</h2>
        {portfolioData.experience.map((exp, i) => (
          <article key={i}>
            <h3>{exp.role} at {exp.company} ({exp.period})</h3>
            <p>{exp.description}</p>
          </article>
        ))}
        <h2>Featured Projects</h2>
        {portfolioData.projects.map((proj) => (
          <article key={proj.id}>
            <h3>{proj.title} - {proj.subtitle}</h3>
            <p>{proj.description}</p>
            <p>Technologies: {proj.tech.join(', ')}</p>
          </article>
        ))}
        <h2>Tools & Skills</h2>
        {portfolioData.tools.map((tool) => (
          <div key={tool.name}>
            <span>{tool.name} ({tool.category}): {tool.context}</span>
          </div>
        ))}
      </div>

      {/* Primary Experience Router: 3D Smartphone Stage vs Classic 2D Recruiter View */}
      {isClassicView ? (
        <ClassicView />
      ) : (
        <Stage />
      )}

      {/* Persistent Toasts */}
      <ToastContainer />
    </div>
  );
};

export default App;
