import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { StatusBar } from '../os/StatusBar';
import { HomeScreen } from '../os/HomeScreen';
import { LockScreen } from '../os/LockScreen';
import { ControlCenter } from '../os/ControlCenter';
import { AppSwitcher } from '../os/AppSwitcher';
import { Spotlight } from '../os/Spotlight';
import { ProjectsApp } from '../apps/Projects';
import { AboutApp } from '../apps/About';
import { SkillsApp } from '../apps/Skills';
import { JourneyApp } from '../apps/Journey';
import { ResumeApp } from '../apps/Resume';
import { MessagesApp } from '../apps/Messages';
import { BugHuntApp } from '../apps/BugHunt';
import { SettingsApp } from '../apps/Settings';
import { useOS } from '../store/useOS';

export const PhoneFrame: React.FC = () => {
  const isLocked = useOS((state) => state.isLocked);
  const currentApp = useOS((state) => state.currentApp);
  const reduceMotion = useOS((state) => state.reduceMotion);

  // 3D Parallax Tilt state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 160 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="phone-perspective relative flex items-center justify-center p-0 sm:p-4 w-full h-full sm:h-auto select-none"
    >
      {/* 3D Animated Floating Titanium Phone */}
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative sm:w-[400px] sm:h-[830px] w-full h-[100dvh] rounded-none sm:rounded-[54px] p-0 sm:p-3 bg-gradient-to-b from-[#2E3544] via-[#1E232F] to-[#121620] sm:shadow-phone border-0 sm:border sm:border-[#4B5569]/60 opacity-100 transition-shadow duration-300"
      >
        {/* Hardware Side Buttons (Titanium Machined) - Desktop only */}
        {/* Action Button (Orange/Amber accent rim) */}
        <div className="hidden sm:block absolute -left-[4.5px] top-28 w-[4px] h-8 bg-gradient-to-r from-[#D97706] to-[#B45309] rounded-l-md shadow-xs border-y border-l border-white/20" />
        {/* Volume Up */}
        <div className="hidden sm:block absolute -left-[4.5px] top-40 w-[4px] h-12 bg-gradient-to-r from-[#3E4759] to-[#252C39] rounded-l-md shadow-xs border-y border-l border-white/20" />
        {/* Volume Down */}
        <div className="hidden sm:block absolute -left-[4.5px] top-56 w-[4px] h-12 bg-gradient-to-r from-[#3E4759] to-[#252C39] rounded-l-md shadow-xs border-y border-l border-white/20" />
        {/* Power / Lock Button (Right) */}
        <div className="hidden sm:block absolute -right-[4.5px] top-36 w-[4px] h-18 bg-gradient-to-l from-[#3E4759] to-[#252C39] rounded-r-md shadow-xs border-y border-r border-white/20" />

        {/* Outer Black Screen Bezel */}
        <div className="relative w-full h-full rounded-none sm:rounded-[46px] bg-[#07090E] p-0 sm:p-2.5 overflow-hidden flex flex-col justify-between ring-1 ring-white/10 shadow-inner">
          
          {/* Subtle Top Ear Speaker Grill (Desktop) */}
          <div className="hidden sm:block absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-[#151A24] z-40 border border-white/5" />

          {/* Internal Display Surface (OLED Midnight Glass) */}
          <div className="relative w-full h-full rounded-none sm:rounded-[38px] bg-screen overflow-hidden flex flex-col justify-between">
            {/* Status Bar & Dynamic Island */}
            <StatusBar />

            {/* Screen Content Router */}
            <div className="relative flex-1 w-full h-full overflow-hidden">
              {/* Lock Screen */}
              {isLocked ? (
                <LockScreen />
              ) : (
                <>
                  {/* Home Screen (Active OS Workspace) */}
                  <HomeScreen />

                  {/* Open App Layer */}
                  {currentApp === 'projects' && <ProjectsApp />}
                  {currentApp === 'about' && <AboutApp />}
                  {currentApp === 'skills' && <SkillsApp />}
                  {currentApp === 'journey' && <JourneyApp />}
                  {currentApp === 'resume' && <ResumeApp />}
                  {currentApp === 'messages' && <MessagesApp />}
                  {currentApp === 'bughunt' && <BugHuntApp />}
                  {currentApp === 'settings' && <SettingsApp />}
                </>
              )}

              {/* Overlays (Control Center, App Switcher, Spotlight) */}
              <ControlCenter />
              <AppSwitcher />
              <Spotlight />
            </div>

            {/* Subtle Specular Glass Sheen Across Display */}
            {!reduceMotion && (
              <div
                className="hidden sm:block absolute inset-0 pointer-events-none rounded-[38px] z-30"
                style={{
                  background:
                    'linear-gradient(130deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)',
                }}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
