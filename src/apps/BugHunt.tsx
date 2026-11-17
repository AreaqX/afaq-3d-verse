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
      <div className="h-full flex flex-col justify-between pb-6 text-white">
        {/* Score & Time Status Bar */}
        <div className="grid grid-cols-2 gap-3 pb-3">
          <div className="p-3 rounded-2xl bg-surface border border-border shadow-sm text-center">
            <span className="text-[10px] font-mono text-accent font-bold uppercase">DEFECTS SQUASHED</span>
            <div className="text-xl font-display font-black text-white mt-0.5">{score}</div>
          </div>
          <div className="p-3 rounded-2xl bg-surface border border-border shadow-sm text-center">
            <span className="text-[10px] font-mono text-ink-muted uppercase">TIME REMAINING</span>
            <div className={`text-xl font-display font-black mt-0.5 ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Game Arena */}
        <div className="relative flex-1 bg-surface-alt/70 border border-border rounded-2xl min-h-[300px] overflow-hidden">
          {!isPlaying ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-surface/85 backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center text-accent shadow-sm">
                <Bug className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">SQA Release Verification</h3>
                <p className="text-xs text-ink-muted max-w-xs mt-1">
                  Tap production defects as they appear before release cut-off. 30 seconds on the clock!
                </p>
              </div>
              <button
                onClick={handleStart}
                className="px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-black text-xs font-mono font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start QA Sprint</span>
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {bugs.map((bug) => (
                <motion.button
                  key={bug.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => handleSquash(bug.id)}
                  style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                  className="absolute p-2.5 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/40 cursor-pointer shadow-md transition-transform hover:scale-110"
                >
                  <Bug className="w-5 h-5 animate-bounce" />
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold text-red-300">
                    {bug.type}
                  </span>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Controls footer */}
        {isPlaying && (
          <div className="pt-3 flex justify-center">
            <button
              onClick={handleStart}
              className="px-4 py-2 rounded-xl bg-surface border border-border text-xs font-mono text-ink-muted hover:text-white flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Sprint</span>
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
};
