import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Sparkles,
  FileText,
  ScanSearch,
  MessageSquare,
  Target,
  Timer,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Database
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  user: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, user }) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview Dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'Personalized pathway view'
    },
    {
      id: 'performance',
      label: 'Academic & Performance',
      icon: GraduationCap,
      badge: 'Math Engine',
      description: 'Marks, trends & study plan'
    },
    {
      id: 'mentor',
      label: 'AI Learning Mentor',
      icon: Sparkles,
      badge: null,
      description: 'Concept tutor & quizzes'
    },
    {
      id: 'resume-builder',
      label: 'Resume Builder',
      icon: FileText,
      badge: 'ATS Ready',
      description: 'Templates & live preview'
    },
    {
      id: 'resume-studio',
      label: 'AI Resume Studio',
      icon: ScanSearch,
      badge: 'Upload & ATS',
      description: 'Job match & fact-check'
    },
    {
      id: 'interview',
      label: 'Interview Preparation',
      icon: MessageSquare,
      badge: 'STAR Method',
      description: 'Mock drills & feedback'
    },
    {
      id: 'quests',
      label: 'Career Quests & XP',
      icon: Target,
      badge: `${user.xp} XP`,
      description: 'Missions & badges'
    },
    {
      id: 'focus',
      label: 'Focus Sprint Timer',
      icon: Timer,
      badge: '25m',
      description: 'Pomodoro focus sessions'
    }
  ];

  return (
    <aside className="w-64 bg-[#0E1318] text-slate-300 flex flex-col h-screen shrink-0 border-r border-[#1F2633] select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1F2633]">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00C4CC] via-[#5B33E8] to-[#7D2AE8] flex items-center justify-center text-white shadow-lg shadow-[#7D2AE8]/30 font-black text-lg">
            C
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Careercraft<span className="text-[#00C4CC]">AI</span>
            </h2>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">Know strengths. Build future.</p>
          </div>
        </div>

        {/* Current Active Pathway Tag */}
        <div className="mt-4 px-2.5 py-1.5 rounded-lg bg-[#141A23] border border-[#242D3D] text-[11px] flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-[#00C4CC] animate-pulse"></span>
            <span className="font-semibold text-slate-200 capitalize truncate">
              {user.pathway.replace('_', ' ')}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[#00C4CC] font-bold bg-[#00C4CC]/10 px-1.5 py-0.5 rounded border border-[#00C4CC]/30">
            Active
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Core Workflows
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] text-white font-bold shadow-md shadow-[#7D2AE8]/25'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-[#181E27]'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#00C4CC]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#181E27] text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Trust & Database status info */}
      <div className="p-3.5 m-3 rounded-xl bg-[#141A23] border border-[#242D3D] text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center justify-between text-slate-300 font-medium">
          <span className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#00C4CC]" />
            MongoDB Storage
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Ready
          </span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          Grounded factual evaluation. No fake claims or hallucinatory metrics.
        </p>
      </div>
    </aside>
  );
};
