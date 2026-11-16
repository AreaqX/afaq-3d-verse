import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNav } from '../store/useNav';

export const ToastContainer: React.FC = () => {
  const toasts = useNav((state) => state.toasts);
  const removeToast = useNav((state) => state.removeToast);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 bg-[#0C101A] border border-[#00E5FF]/40 text-[#F1F5F9] font-mono text-xs rounded-lg shadow-xl shadow-black/80 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping shadow-[0_0_8px_#00E5FF]" />
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-[#8E8E93] hover:text-[#FFFFFF] transition-colors"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
