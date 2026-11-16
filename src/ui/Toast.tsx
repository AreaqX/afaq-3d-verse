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
            className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 bg-[#0C1017] border border-[#C6FF3D]/40 text-[#EDEDED] font-mono text-xs rounded shadow-lg shadow-black/60 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping" />
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
