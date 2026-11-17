import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOS } from '../store/useOS';

export const ToastContainer: React.FC = () => {
  const toasts = useOS((state) => state.toasts);
  const removeToast = useOS((state) => state.removeToast);

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 bg-ink text-white font-mono text-xs rounded-xl shadow-xl shadow-ink/20 border border-ink/40 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-ink-faint hover:text-white transition-colors cursor-pointer"
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
