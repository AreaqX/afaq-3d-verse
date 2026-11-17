import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Play, RotateCcw, Award } from 'lucide-react';
import { AppShell } from '../os/AppShell';
import { useOS } from '../store/useOS';

interface BugEntity {
  id: number;
  x: number;
  y: number;
  type: string;
}

export const BugHuntApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bugs, setBugs] = useState<BugEntity[]>([]);
  const squashBug = useOS((state) => state.squashBug);
  const addToast = useOS((state) => state.addToast);

  // Countdown timer
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      addToast(`Game over! You squashed ${score} defects!`, 'success');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, addToast]);

  // Bug spawner
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBugs((prev) => {
        if (prev.length >= 6) return prev;
        const newBug: BugEntity = {
          id: Math.random(),
          x: Math.floor(Math.random() * 80) + 5,
          y: Math.floor(Math.random() * 70) + 10,
          type: ['Critical', 'Major', 'Minor'][Math.floor(Math.random() * 3)],
        };
        return [...prev, newBug];
      });
    }, 900);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStart = () => {
    setScore(0);
    setTimeLeft(30);
    setBugs([]);
    setIsPlaying(true);
  };

  const handleSquash = (id: number) => {
    setScore((prev) => prev + 1);
    squashBug();
    setBugs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <AppShell title="Bug Hunt" subtitle="SQA QA SIMULATOR">
      <div className="h-full flex flex-col justify-between pb-6">
        {/* Score & Time Status Bar */}
        <div className="grid grid-cols-2 gap-3 pb-3">
          <div className="p-3 rounded-2xl bg-white border border-border shadow-sm text-center">
            <span className="text-[10px] font-mono text-ink-faint uppercase">DEFECTS SQUASHED</span>
            <div className="text-xl font-display font-black text-accent mt-0.5">{score}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-border shadow-sm text-center">
            <span className="text-[10px] font-mono text-ink-faint uppercase">TIME REMAINING</span>
            <div className={`text-xl font-display font-black mt-0.5 ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-ink'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Game Arena */}
        <div className="relative flex-1 bg-surface-alt/70 border border-border rounded-2xl min-h-[300px] overflow-hidden">
          {!isPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-white/60 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-accent-soft flex items-center justify-center text-accent shadow-sm">
                <Bug className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink">SQA Release Verification</h3>
                <p className="text-xs text-ink-muted max-w-xs mt-1">
                  Tap production defects as they appear before release cut-off. 30 seconds on the clock!
                </p>
              </div>
              <button
                onClick={handleStart}
                className="px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>Start QA Sweep</span>
              </button>
            </div>
          ) : (
            <AnimatePresence>
              {bugs.map((bug) => (
                <motion.button
                  key={bug.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleSquash(bug.id)}
                  style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                  className="absolute p-2.5 rounded-full bg-white border border-border shadow-md hover:bg-red-50 transition-colors cursor-pointer group"
                  aria-label="Squash bug"
                >
                  <Bug className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform animate-spin-slow" />
                </motion.button>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Controls */}
        {isPlaying && (
          <div className="pt-3 text-center">
            <button
              onClick={() => setIsPlaying(false)}
              className="text-xs font-mono text-ink-muted hover:text-ink cursor-pointer"
            >
              Abort Test Run
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
};
