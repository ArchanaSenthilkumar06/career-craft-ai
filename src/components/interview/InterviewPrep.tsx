import React, { useState } from 'react';
import { UserProfile, InterviewQuestion, ResumeData } from '../../types';
import { DEMO_INTERVIEW_QUESTIONS } from '../../data/demoData';
import { evaluateInterviewAnswer } from '../../services/aiService';
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  Send,
  RotateCcw,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InterviewPrepProps {
  user: UserProfile;
  resume: ResumeData;
  onAwardXp: (xp: number) => void;
}

export const InterviewPrep: React.FC<InterviewPrepProps> = ({ user, resume, onAwardXp }) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>(DEMO_INTERVIEW_QUESTIONS);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswerInput, setUserAnswerInput] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'behavioral' | 'technical' | 'project'>('all');

  const currentQ = questions[activeQuestionIndex];

  const filteredQuestions = questions.filter(q =>
    activeFilter === 'all' ? true : q.type === activeFilter
  );

  const handleEvaluate = () => {
    if (!userAnswerInput.trim()) return;

    const feedback = evaluateInterviewAnswer(currentQ, userAnswerInput);

    const updated = [...questions];
    updated[activeQuestionIndex] = {
      ...currentQ,
      userAnswer: userAnswerInput,
      feedback
    };
    setQuestions(updated);
    onAwardXp(120);

    if (feedback && feedback.score >= 80) {
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            Interview Preparation & STAR Practice
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Grounded behavioral & technical mock interview practice evaluated against the STAR framework.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {(['all', 'behavioral', 'technical', 'project'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ${
                activeFilter === filter
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* STAR Framework Guide Banner */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 border border-indigo-200/80 rounded-2xl p-4">
        <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          The STAR Behavioral Response Blueprint
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/80 p-2.5 rounded-xl border border-indigo-100">
            <strong className="text-indigo-700 block">S - Situation (15%)</strong>
            <span className="text-slate-600 text-[11px]">Set context: project, team, constraints.</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-indigo-100">
            <strong className="text-indigo-700 block">T - Task (15%)</strong>
            <span className="text-slate-600 text-[11px]">Define your direct objective or obstacle.</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-indigo-100">
            <strong className="text-indigo-700 block">A - Action (50%)</strong>
            <span className="text-slate-600 text-[11px]">What YOU personally did, tools and rationale.</span>
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-indigo-100">
            <strong className="text-indigo-700 block">R - Result (20%)</strong>
            <span className="text-slate-600 text-[11px]">Quantifiable outcome, speedup %, lessons learned.</span>
          </div>
        </div>
      </div>

      {/* Main Practice Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Questions List (1 col) */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Practice Drills ({filteredQuestions.length})
          </h3>
          <div className="space-y-2">
            {filteredQuestions.map((q, idx) => {
              const originalIndex = questions.findIndex(item => item.id === q.id);
              const isActive = originalIndex === activeQuestionIndex;
              const hasAnswered = !!q.feedback;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuestionIndex(originalIndex);
                    setUserAnswerInput(q.userAnswer || '');
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-medium'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1 opacity-80">
                    <span className="font-bold uppercase tracking-wider">{q.type}</span>
                    {hasAnswered && (
                      <span className="font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {q.feedback?.score} pts
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-2 text-[11px] leading-snug">{q.question}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Question Answer & Feedback Area (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          {currentQ && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
              {/* Question Banner */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-700 uppercase tracking-wider text-[10px] bg-indigo-50 px-2 py-0.5 rounded">
                    {currentQ.category}
                  </span>
                  <span className="text-slate-500 text-[11px]">Role: {currentQ.targetRole}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Sample Structure Blueprint */}
              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs space-y-1">
                <span className="font-bold text-indigo-900 flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Recommended Structure Guide:
                </span>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  {currentQ.sampleStructure}
                </p>
              </div>

              {/* Answer Input */}
              <div className="space-y-2 text-xs">
                <label className="block font-semibold text-slate-700">
                  Your Answer (Draft using your real project experience):
                </label>
                <textarea
                  rows={6}
                  value={userAnswerInput}
                  onChange={(e) => setUserAnswerInput(e.target.value)}
                  placeholder="Structure your answer: Situation, Task, Action, and Result with quantifiable metrics..."
                  className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xs leading-relaxed"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{userAnswerInput.trim().split(/\s+/).filter(Boolean).length} words</span>
                  <button
                    onClick={handleEvaluate}
                    disabled={!userAnswerInput.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Evaluate Answer (+120 XP)
                  </button>
                </div>
              </div>

              {/* Automated Feedback (if evaluated) */}
              {currentQ.feedback && (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Evaluation Breakdown
                    </span>
                    <span className="text-sm font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg">
                      Score: {currentQ.feedback.score} / 100
                    </span>
                  </div>

                  {/* STAR Checklist */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {Object.entries(currentQ.feedback.starCoverage).map(([stage, covered]) => (
                      <div
                        key={stage}
                        className={`p-2 rounded-lg border font-semibold capitalize text-[11px] ${
                          covered
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        {stage}: {covered ? '✓ Addressed' : '✗ Missing'}
                      </div>
                    ))}
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {currentQ.feedback.strengths.length > 0 && (
                      <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                        <strong className="text-emerald-800 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Key Strengths:
                        </strong>
                        <ul className="list-disc pl-4 text-slate-700 text-[11px] space-y-0.5">
                          {currentQ.feedback.strengths.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {currentQ.feedback.improvements.length > 0 && (
                      <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100 space-y-1">
                        <strong className="text-amber-800 flex items-center gap-1 text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          Recommended Polish:
                        </strong>
                        <ul className="list-disc pl-4 text-slate-700 text-[11px] space-y-0.5">
                          {currentQ.feedback.improvements.map((imp, i) => (
                            <li key={i}>{imp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
