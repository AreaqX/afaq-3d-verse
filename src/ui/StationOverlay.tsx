import React, { useEffect } from 'react';
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

  // Vertical scroll gestures drive horizontal flight transition
  useEffect(() => {
    let lastScrollTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // If user is inside an internal scrollable container, check if it can scroll internally
      const target = e.target as HTMLElement;
      const scrollable = target?.closest('.overflow-y-auto') as HTMLElement | null;
      if (scrollable) {
        const isScrollingDown = e.deltaY > 0;
        const atTop = scrollable.scrollTop <= 2 && e.deltaY < 0;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 2 &&
          isScrollingDown;
        if (!atTop && !atBottom) {
          return; // Allow internal container to scroll
        }
      }

      const now = Date.now();
      if (now - lastScrollTime < 600) return; // 600ms debounce cooldown for smooth flight

      // Read vertical scroll (or horizontal trackpad scroll)
      const primaryDelta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      if (primaryDelta > 20) {
        // Vertical scroll down -> fly forward horizontally
        lastScrollTime = now;
        nextStation();
      } else if (primaryDelta < -20) {
        // Vertical scroll up -> fly backward horizontally
        lastScrollTime = now;
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

      // Swiping up or left -> advances forward horizontally
      // Swiping down or right -> goes backward horizontally
      if (Math.abs(dy) > 45 || Math.abs(dx) > 45) {
        if (dy < -45 || dx < -45) {
          nextStation();
        } else if (dy > 45 || dx > 45) {
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

  const offset = slideDirection > 0 ? 120 : -120;

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center pt-16 pb-20 px-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStation}
          initial={{ opacity: 0, x: offset, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -offset, scale: 0.98 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 220,
            mass: 0.8
          }}
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
