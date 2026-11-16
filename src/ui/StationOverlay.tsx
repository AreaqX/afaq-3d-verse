import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from '../store/useNav';
import { HubView } from './StationViews/HubView';
import { WorkView } from './StationViews/WorkView';
import { SkillsView } from './StationViews/SkillsView';
import { JourneyView } from './StationViews/JourneyView';
import { ContactView } from './StationViews/ContactView';

export const StationOverlay: React.FC = () => {
  const currentStation = useNav((state) => state.currentStation);
  const isFlying = useNav((state) => state.isFlying);

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center pt-16 pb-20 px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStation}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
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
