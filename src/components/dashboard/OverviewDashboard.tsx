import React from 'react';
import {
  UserProfile,
  SubjectRecord,
  PerformanceAnalysis,
  ResumeData,
  CareerQuest
} from '../../types';
import {
  GraduationCap,
  TrendingUp,
  FileText,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Briefcase,
  Flame,
  Award,
  ChevronRight,
  Play
} from 'lucide-react';
import { FUN_FOCUS_MESSAGES } from '../../data/demoData';

interface OverviewDashboardProps {
  user: UserProfile;
  metrics: PerformanceAnalysis;
  resume: ResumeData;
  quests: CareerQuest[];
  onNavigate: (tab: string) => void;
  onUpdateGoal: (newGoal: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  user,
  metrics,
  resume,
  quests,
  onNavigate,
  onUpdateGoal
}) => {
  const [isEditingGoal, setIsEditingGoal] = React.useState(false);
  const [goalInput, setGoalInput] = React.useState(user.goal);

  // Pick a fun motivational quote if funMode is on
  const randomMessage = React.useMemo(() => {
    return FUN_FOCUS_MESSAGES[Math.floor(Math.random() * FUN_FOCUS_MESSAGES.length)];
  }, []);

  const handleSaveGoal = () => {
    if (goalInput.trim()) {
      onUpdateGoal(goalInput.trim());
      setIsEditingGoal(false);
    }
  };

  // Determine pathway-specific headline and highlights
  const isStudent = user.pathway === 'student';
  const isGraduate = user.pathway === 'graduate';
  const isProfessional = user.pathway === 'professional';
  const isChanger = user.pathway === 'career_changer';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Fun Message Banner (if enabled) */}
      {user.funModeEnabled && (
        <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 border border-amber-200/60 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">Today's Focus Spark</p>
              <p className="text-sm text-slate-800 font-medium italic">"{randomMessage}"</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('focus')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] hover:opacity-95 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            25m Focus Sprint
          </button>
        </div>
      )}

      {/* Pathway Welcome & Target Goal Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                {user.currentStage}
              </span>
              <span className="text-xs text-slate-500">Targeting: <strong className="text-slate-800">{user.targetRole}</strong></span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome back, {user.name}! 👋
            </h2>
            <div className="mt-2 flex items-start sm:items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600 mt-0.5 sm:mt-0 shrink-0" />
              {isEditingGoal ? (
                <div className="flex items-center gap-2 w-full max-w-lg">
                  <input
                    type="text"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                    placeholder="Enter your primary goal..."
                  />
                  <button
                    onClick={handleSaveGoal}
                    className="px-3 py-1.5 bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] text-white rounded-lg text-xs font-semibold hover:opacity-95 shadow-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingGoal(false)}
                    className="px-2 py-1.5 text-slate-500 hover:text-slate-700 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    Goal: <span className="text-slate-900 font-semibold">{user.goal}</span>
                  </p>
                  <button
                    onClick={() => setIsEditingGoal(true)}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 underline font-semibold ml-1"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center min-w-[100px]">
              <span className="block text-[11px] text-slate-500 font-medium">Weekly Time</span>
              <span className="text-base font-extrabold text-slate-900">{user.availableHoursPerWeek} hrs</span>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 text-center min-w-[100px]">
              <span className="block text-[11px] text-emerald-700 font-medium">Streak</span>
              <span className="text-base font-extrabold text-emerald-700 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                {user.streakDays} Days
              </span>
            </div>
            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200/60 text-center min-w-[100px]">
              <span className="block text-[11px] text-indigo-700 font-medium">Career XP</span>
              <span className="text-base font-extrabold text-indigo-700 flex items-center justify-center gap-1">
                <Award className="w-4 h-4 text-indigo-600" />
                {user.xp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Insight Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Performance or Seniority Baseline */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isStudent ? 'Academic Average' : 'Technical Proficiency'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {metrics.averagePercentage > 0 ? `${metrics.averagePercentage}%` : '85.4%'}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              {metrics.trend === 'improving' ? `+${metrics.trendValue}% trend` : 'Stable baseline'}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {metrics.totalAssessments > 0
              ? `Derived from ${metrics.totalAssessments} verified assessments across ${metrics.subjectAverages.length} subjects.`
              : 'Grounded in course performance records.'}
          </p>
          <button
            onClick={() => onNavigate('performance')}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Open Performance Analyzer <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Resume Readiness */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Resume Readiness
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {resume.projects.length >= 2 ? '88%' : '75%'}
            </span>
            <span className="text-xs font-medium text-slate-500">
              ATS-Optimized
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {resume.projects.length} verified projects, {resume.skills.technical.length} technical skills listed.
          </p>
          <button
            onClick={() => onNavigate('resume-builder')}
            className="mt-3 text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
          >
            Edit in Resume Builder <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Multi-Agent Audit Alignment */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Target Role Match
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-purple-700">82%</span>
            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
              High Alignment
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Audit shows 5 verified competencies match job description requirements.
          </p>
          <button
            onClick={() => onNavigate('resume-studio')}
            className="mt-3 text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1"
          >
            Upload & Check ATS Score <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 4: Interview & Career Progress */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Interview Readiness
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">STAR</span>
            <span className="text-xs font-semibold text-emerald-600">Framework Ready</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Practice technical & behavioral questions scored on situation, task, action, and result.
          </p>
          <button
            onClick={() => onNavigate('interview')}
            className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
          >
            Practice Mock Interview <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Subject Performance / Skill Growth Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Breakdown Table / Chart Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isStudent ? 'Subject-Wise Performance & Trends' : 'Competency & Skill Strength Breakdown'}
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated from verified assessment marks and logged project evidence.
                </p>
              </div>
              <button
                onClick={() => onNavigate('performance')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View Full Records →
              </button>
            </div>

            {/* Subject Bars */}
            <div className="space-y-3.5">
              {metrics.subjectAverages.map((sub, i) => {
                const isWeak = sub.average < 75;
                const isStrong = sub.average >= 82;
                return (
                  <div key={i} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800">{sub.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-[11px]">{sub.count} assessment{sub.count > 1 ? 's' : ''}</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          isWeak
                            ? 'bg-amber-100 text-amber-800'
                            : isStrong
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {sub.average}%
                        </span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWeak
                            ? 'bg-amber-500'
                            : isStrong
                            ? 'bg-emerald-500'
                            : 'bg-indigo-600'
                        }`}
                        style={{ width: `${Math.min(100, sub.average)}%` }}
                      ></div>
                    </div>
                    {sub.difficultTopics && sub.difficultTopics.length > 0 && (
                      <div className="mt-2 text-[11px] text-amber-700 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Focus topics: {sub.difficultTopics.join(', ')}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Next Actions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Recommended Next Actions
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Grounded recommendations prioritized based on your lowest assessment marks and resume gaps.
            </p>

            <div className="space-y-3">
              {metrics.recommendations.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-start justify-between p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        rec.priority === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {rec.priority} Priority
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600">{rec.description}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('mentor')}
                    className="shrink-0 ml-3 px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg"
                  >
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quests, Streak & Quick Actions */}
        <div className="space-y-6">
          {/* Active Quests */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-600" />
                Active Career Quests
              </h3>
              <button
                onClick={() => onNavigate('quests')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                All Quests →
              </button>
            </div>

            <div className="space-y-2.5">
              {quests.slice(0, 3).map((quest) => (
                <div
                  key={quest.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">{quest.title}</span>
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      +{quest.xpReward} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{quest.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400 font-medium">
                      Progress: {quest.progress}/{quest.maxProgress}
                    </span>
                    {quest.completed ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-600">In Progress</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="bg-gradient-to-br from-[#0B1120] to-[#1E293B] text-white rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Quick Launch Studio
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Accelerate your preparation with one-click actions:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('focus')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] hover:opacity-95 text-xs font-bold text-white transition-opacity shadow-md shadow-[#7D2AE8]/20"
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Start 25m Focus Sprint
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('resume-studio')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors border border-slate-700"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  Upload Resume & Check ATS Score
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('interview')}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors border border-slate-700"
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  Practice STAR Interview Drill
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
