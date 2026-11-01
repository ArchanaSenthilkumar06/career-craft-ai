import React from 'react';
import { UserProfile, CareerQuest, AchievementBadge } from '../../types';
import { DEMO_ACHIEVEMENT_BADGES } from '../../data/demoData';
import {
  Target,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuestBoardProps {
  user: UserProfile;
  quests: CareerQuest[];
  onClaimQuest: (questId: string) => void;
  onNavigate: (tab: string) => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({
  user,
  quests,
  onClaimQuest,
  onNavigate
}) => {
  const badges: AchievementBadge[] = DEMO_ACHIEVEMENT_BADGES;

  const handleClaim = (quest: CareerQuest) => {
    if (!quest.completed || quest.progress < quest.maxProgress) return;
    onClaimQuest(quest.id);
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Career Quests & Achievement Milestones
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Points are awarded strictly for verified completed actions: solving quizzes, auditing resumes, and focused study sprints.
          </p>
        </div>

        {/* XP Status Header Card */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm">
            Lvl {user.level}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">{user.xp} Total XP</span>
              <span className="text-[10px] text-slate-400">({(user.level + 1) * 250 - user.xp} XP to Level {user.level + 1})</span>
            </div>
            {/* Progress Bar */}
            <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (user.xp % 250) / 2.5)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map((quest) => {
          const isReadyToClaim = quest.progress >= quest.maxProgress && !quest.completed;
          return (
            <div
              key={quest.id}
              className={`p-5 rounded-2xl border transition-all ${
                quest.completed
                  ? 'bg-emerald-50/30 border-emerald-200/70'
                  : 'bg-white border-slate-200/80 shadow-xs hover:border-indigo-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {quest.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">{quest.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{quest.description}</p>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl shrink-0">
                  +{quest.xpReward} XP
                </span>
              </div>

              {/* Progress */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  Progress: {quest.progress} / {quest.maxProgress}
                </span>

                {quest.completed ? (
                  <span className="font-bold text-emerald-600 flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                  </span>
                ) : isReadyToClaim ? (
                  <button
                    onClick={() => handleClaim(quest)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs"
                  >
                    Claim Reward
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (quest.category === 'academic') onNavigate('mentor');
                      else if (quest.category === 'resume') onNavigate('resume-studio');
                      else if (quest.category === 'interview') onNavigate('interview');
                      else onNavigate('focus');
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Jump to Mission →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Badges Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          Verified Achievement Badges
        </h3>
        <p className="text-xs text-slate-500">
          Earned upon reaching factual milestones and completing verified drills.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                b.unlocked
                  ? 'bg-gradient-to-b from-indigo-50/50 to-white border-indigo-200 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 opacity-50'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white shadow-xs flex items-center justify-center">
                {b.unlocked ? (
                  b.id === 'badge-1' ? (
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  ) : b.id === 'badge-2' ? (
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Flame className="w-6 h-6 text-amber-500" />
                  )
                ) : (
                  <Lock className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900">{b.name}</h4>
              <p className="text-[10px] text-slate-500 leading-tight">{b.description}</p>
              {b.unlocked ? (
                <span className="inline-block text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Unlocked {b.unlockedAt}
                </span>
              ) : (
                <span className="inline-block text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  Locked
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
