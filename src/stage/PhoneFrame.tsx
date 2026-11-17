import React, { useRef, useState, useEffect } from 'react';
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

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

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
      className="phone-perspective relative flex items-center justify-center p-0 sm:p-4 w-full h-full sm:h-auto"
    >
      {/* 3D Animated Floating Phone */}
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative sm:w-[390px] sm:h-[810px] w-full h-[100dvh] rounded-none sm:rounded-[50px] p-0 sm:p-3 bg-gradient-to-b from-[#D5D9DF] via-[#E2E6EC] to-[#C3C8D0] sm:shadow-phone border-0 sm:border sm:border-white/80"
      >
        {/* Hardware Side Buttons (Desktop only) */}
        <div className="hidden sm:block absolute -left-[4px] top-28 w-[3px] h-8 bg-[#A8B0BC] rounded-l-md shadow-xs" />
        <div className="hidden sm:block absolute -left-[4px] top-40 w-[3px] h-12 bg-[#A8B0BC] rounded-l-md shadow-xs" />
        <div className="hidden sm:block absolute -left-[4px] top-56 w-[3px] h-12 bg-[#A8B0BC] rounded-l-md shadow-xs" />
        <div className="hidden sm:block absolute -right-[4px] top-36 w-[3px] h-16 bg-[#A8B0BC] rounded-r-md shadow-xs" />

        {/* Screen Bezel (Outer black frame) */}
        <div className="relative w-full h-full rounded-none sm:rounded-[42px] bg-[#0B0F17] p-0 sm:p-2.5 overflow-hidden flex flex-col justify-between shadow-inner">
          {/* Internal Display Surface */}
          <div className="relative w-full h-full rounded-none sm:rounded-[34px] bg-screen overflow-hidden flex flex-col justify-between">
            {/* Status Bar */}
            <StatusBar />

            {/* Screen Content Router */}
            <div className="relative flex-1 w-full h-full overflow-hidden">
              {/* Lock Screen */}
              {isLocked ? (
                <LockScreen />
              ) : (
                <>
                  {/* Home Screen (Background or Active) */}
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

            {/* Dynamic Light Reflection Across Glass */}
            {!reduceMotion && (
              <motion.div
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)',
                }}
                className="hidden sm:block absolute inset-0 pointer-events-none rounded-[34px]"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
