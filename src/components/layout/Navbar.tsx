import React from 'react';
import { UserProfile, PersonalityMode } from '../../types';
import { PERSONALITY_PROFILES } from '../../services/aiService';
import {
  Flame,
  Sparkles,
  Compass,
  Shield,
  Zap,
  Award,
  Smile,
  Moon,
  Sun,
  LogOut,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  onUpdatePersonality: (mode: PersonalityMode) => void;
  onToggleFunMode: () => void;
  onSwitchPathway: (pathway: string) => void;
  activeTab: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onUpdatePersonality,
  onToggleFunMode,
  onSwitchPathway,
  activeTab,
  isDarkMode,
  onToggleTheme,
  onLogout
}) => {
  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Overview Dashboard';
      case 'performance':
        return 'Academic & Skills Performance Analyzer';
      case 'mentor':
        return 'AI Learning Mentor & Quizzes';
      case 'resume-builder':
        return 'Resume Builder Studio';
      case 'resume-studio':
        return 'AI Resume Studio & ATS Audit';
      case 'interview':
        return 'Interview & Career Readiness';
      case 'quests':
        return 'Quests, XP & Achievements';
      case 'focus':
        return 'Deep Focus Sprint';
      default:
        return 'CareercraftAI';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/95 dark:bg-[#0E1318]/95 backdrop-blur-md border-b border-[#E2E6EF] dark:border-[#1F2633] transition-colors">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            {getPageTitle(activeTab)}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {user.name} • <span className="font-semibold text-[#7D2AE8] dark:text-[#00C4CC] capitalize">{user.pathway.replace('_', ' ')} Pathway</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2.5">
        {/* Pathway quick switcher */}
        <div className="relative hidden md:flex items-center">
          <label htmlFor="pathway-select" className="text-xs text-slate-500 dark:text-slate-400 mr-2 font-medium">Pathway:</label>
          <select
            id="pathway-select"
            value={user.pathway}
            onChange={(e) => onSwitchPathway(e.target.value)}
            className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="student">Student (Archana)</option>
            <option value="graduate">Graduate (Maya Patel)</option>
            <option value="professional">Professional (Marcus Vance)</option>
            <option value="career_changer">Career Changer (Elena)</option>
          </select>
        </div>

        {/* Personality Mode selector */}
        <div className="relative hidden lg:flex items-center">
          <div className="flex items-center bg-indigo-50/70 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 rounded-lg px-2.5 py-1">
            <span className="text-xs font-medium text-indigo-900 dark:text-indigo-300 mr-1.5 flex items-center gap-1">
              {user.personality === 'study_buddy' && <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              {user.personality === 'calm_mentor' && <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              {user.personality === 'strict_coach' && <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              {user.personality === 'playful_motivator' && <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
              AI:
            </span>
            <select
              aria-label="AI Personality Mode"
              value={user.personality}
              onChange={(e) => onUpdatePersonality(e.target.value as PersonalityMode)}
              className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="study_buddy" className="dark:bg-slate-900">Study Buddy</option>
              <option value="calm_mentor" className="dark:bg-slate-900">Calm Mentor</option>
              <option value="strict_coach" className="dark:bg-slate-900">Focus Coach</option>
              <option value="playful_motivator" className="dark:bg-slate-900">Playful</option>
            </select>
          </div>
        </div>

        {/* Both Themes Option: Canva Dark / Canva Light Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          aria-label={isDarkMode ? 'Switch to Canva Light Theme' : 'Switch to Canva Dark Theme'}
          title={isDarkMode ? 'Switch to Canva Light Theme' : 'Switch to Canva Dark Theme'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs ${
            isDarkMode
              ? 'bg-[#181E27] text-[#00C4CC] border-[#2A3446] hover:border-[#00C4CC]/50 hover:bg-[#1E2633]'
              : 'bg-white text-[#7D2AE8] border-[#E2E6EF] hover:border-[#7D2AE8]/40 hover:bg-[#FAF9FF]'
          }`}
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-[#00C4CC]" /> : <Moon className="w-3.5 h-3.5 text-[#7D2AE8]" />}
          <span className="hidden sm:inline">{isDarkMode ? 'Canva Light' : 'Canva Dark'}</span>
        </button>

        {/* Fun Mode Toggle */}
        <button
          onClick={onToggleFunMode}
          title={user.funModeEnabled ? 'Fun Mode Enabled (Gamified)' : 'Professional Mode (Quiet)'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
            user.funModeEnabled
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          <Smile className={`w-3.5 h-3.5 ${user.funModeEnabled ? 'text-amber-500' : 'text-slate-400'}`} />
          <span className="hidden sm:inline">{user.funModeEnabled ? 'Fun' : 'Pro'}</span>
        </button>

        {/* Streak & XP Badges */}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
          <div className="flex items-center text-amber-600 dark:text-amber-400 font-bold gap-1" title={`${user.streakDays} day activity streak`}>
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{user.streakDays}d</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <div className="flex items-center text-indigo-700 dark:text-indigo-400 font-semibold gap-1" title={`Level ${user.level} (${user.xp} Total XP)`}>
            <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Lvl {user.level}</span>
          </div>
        </div>

        {/* Sign out / Switch user button */}
        <button
          onClick={onLogout}
          title="Sign out or switch user account"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
