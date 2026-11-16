import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '../store/useNav';
import { HubView } from './StationViews/HubView';
import { WorkView } from './StationViews/WorkView';
import { SkillsView } from './StationViews/SkillsView';
import { JourneyView } from './StationViews/JourneyView';
import { ContactView } from './StationViews/ContactView';

export const StationOverlay: React.FC = () => {
  const currentStation = useNav((state) => state.currentStation);
  const slideDirection = useNav((state) => state.slideDirection);
  const nextStation = useNav((state) => state.nextStation);
  const prevStation = useNav((state) => state.prevStation);

  // Horizontal scroll and swipe navigation
  useEffect(() => {
    let lastWheelTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // If user is inside an internal scroll container (e.g., project list), allow it to scroll
      const target = e.target as HTMLElement;
      const scrollable = target?.closest('.overflow-y-auto') as HTMLElement | null;
      if (scrollable) {
        const isScrollingVertically = Math.abs(e.deltaY) > Math.abs(e.deltaX);
        const atTop = scrollable.scrollTop <= 2 && e.deltaY < 0;
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 2 && e.deltaY > 0;
        if (isScrollingVertically && !atTop && !atBottom) {
          return;
        }
      }

      const now = Date.now();
      if (now - lastWheelTime < 650) return; // 650ms debounce cooldown for smooth flight

      // Read horizontal wheel or standard scroll
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta > 25) {
        lastWheelTime = now;
        nextStation();
      } else if (delta < -25) {
        lastWheelTime = now;
        prevStation();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      // Detect horizontal swipe
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          nextStation();
        } else {
          prevStation();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextStation, prevStation]);

  const offset = slideDirection > 0 ? 60 : -60;

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center pt-16 pb-24 px-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStation}
          initial={{ opacity: 0, x: offset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -offset }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          className="w-full h-full flex items-center justify-center pointer-events-none"
        >
          {currentStation === 0 && <HubView />}
          {currentStation === 1 && <WorkView />}
          {currentStation === 2 && <SkillsView />}
          {currentStation === 3 && <JourneyView />}
          {currentStation === 4 && <ContactView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
