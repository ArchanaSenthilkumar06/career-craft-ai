import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Coffee, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FUN_FOCUS_MESSAGES } from '../../data/demoData';

interface FocusTimerModalProps {
  onClose?: () => void;
  onAwardXp: (xp: number) => void;
}

export const FocusTimerModal: React.FC<FocusTimerModalProps> = ({ onClose, onAwardXp }) => {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(1);

  const [message, setMessage] = useState(
    FUN_FOCUS_MESSAGES[Math.floor(Math.random() * FUN_FOCUS_MESSAGES.length)]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        setCompletedSessions(c => c + 1);
        onAwardXp(80);
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, onAwardXp]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    setMessage(FUN_FOCUS_MESSAGES[Math.floor(Math.random() * FUN_FOCUS_MESSAGES.length)]);
  };

  const setTimerMode = (newMode: 'focus' | 'break') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = mode === 'focus'
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <Timer className="w-5 h-5 text-indigo-600" />
          Deep Focus Pomodoro Sprint
        </h2>
        <p className="text-xs text-slate-500">
          Uninterrupted 25-minute sprints eliminate multitasking and build verifiable mastery.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm text-center space-y-6">
        {/* Preset Mode Buttons */}
        <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setTimerMode('focus')}
            className={`px-5 py-2 rounded-xl transition-all ${
              mode === 'focus'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            25m Focus Sprint
          </button>
          <button
            onClick={() => setTimerMode('break')}
            className={`px-5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              mode === 'break'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" /> 5m Rest Break
          </button>
        </div>

        {/* Big Circular / Bold Digital Display */}
        <div className="py-6">
          <div className="text-7xl font-black font-mono tracking-tighter text-slate-900 select-none">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="w-48 bg-slate-100 h-2 rounded-full mx-auto mt-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                mode === 'focus' ? 'bg-indigo-600' : 'bg-emerald-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Focus Message */}
        <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-900 font-medium italic max-w-md mx-auto">
          "{message}"
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={resetTimer}
            className="p-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-600 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={`px-8 py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Pause Session
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Start {mode === 'focus' ? 'Focus Sprint' : 'Break'}
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span>Completed Today: <strong className="text-slate-900">{completedSessions} sprints</strong></span>
          <span>Earned XP: <strong className="text-indigo-600">+{completedSessions * 80} XP</strong></span>
        </div>
      </div>
    </div>
  );
};
