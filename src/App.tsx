import React, { useEffect } from 'react';
import { useNav } from './store/useNav';
import { World } from './scene/World';
import { Hud } from './ui/Hud';
import { StationOverlay } from './ui/StationOverlay';
import { CommandPalette } from './ui/CommandPalette';
import { LoadingScreen } from './ui/LoadingScreen';
import { ClassicView } from './ui/ClassicView';
import { ToastContainer } from './ui/Toast';
import { portfolioData } from './data/portfolio';

export const App: React.FC = () => {
  const isClassicView = useNav((state) => state.isClassicView);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      useNav.setState({ prefersReducedMotion: e.matches });
    };
    updateMotion(mediaQuery);
    mediaQuery.addEventListener('change', updateMotion);
    return () => mediaQuery.removeEventListener('change', updateMotion);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#07080A]">
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
        <h2>Skills</h2>
        {portfolioData.skills.map((group) => (
          <section key={group.name}>
            <h3>{group.name}</h3>
            <ul>
              {group.skills.map((s) => (
                <li key={s.name}>{s.name}: {s.context}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {isClassicView ? (
        <ClassicView />
      ) : (
        <>
          <World />
          <StationOverlay />
          <Hud />
          <CommandPalette />
          <LoadingScreen />
        </>
      )}

      {/* Persistent Toasts */}
      <ToastContainer />
    </div>
  );
};

export default App;
