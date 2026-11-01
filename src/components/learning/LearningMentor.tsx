import React, { useState } from 'react';
import { UserProfile, QuizQuestion, PersonalityMode } from '../../types';
import {
  askLearningMentor,
  generateTopicQuiz,
  MentorMessage,
  PERSONALITY_PROFILES
} from '../../services/aiService';
import { DEMO_QUIZ_QUESTIONS } from '../../data/demoData';
import {
  Sparkles,
  Send,
  HelpCircle,
  CheckCircle2,
  XCircle,
  BookOpen,
  Award,
  AlertCircle,
  RotateCcw,
  Zap,
  Compass,
  Shield,
  Lightbulb,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearningMentorProps {
  user: UserProfile;
  onAwardXp: (xp: number) => void;
}

export const LearningMentor: React.FC<LearningMentorProps> = ({ user, onAwardXp }) => {
  const [activeTab, setActiveTab] = useState<'mentor' | 'quiz'>('mentor');
  const [query, setQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Dynamic Programming & Optimization');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [availableTime, setAvailableTime] = useState(25);
  const [isLoading, setIsLoading] = useState(false);

  // Chat conversation
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: 'init-1',
      sender: 'mentor',
      content: PERSONALITY_PROFILES[user.personality].welcomeGreeting,
      timestamp: 'Just now',
      suggestedTopics: [
        'Dynamic Programming memoization vs tabulation',
        'Database B-Tree indexing rules',
        'STAR interview answer structure',
        'Cache miss types & mitigation'
      ],
      sourcesDisclaimer: true
    }
  ]);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(DEMO_QUIZ_QUESTIONS);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim() || isLoading) return;

    const userMsg: MentorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const mentorReply = await askLearningMentor(
        text,
        selectedTopic,
        difficulty,
        user.personality,
        availableTime
      );
      setMessages(prev => [...prev, mentorReply]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'mentor',
          content: 'Unable to reach AI mentor service. Please review your network or local Gemini API key configuration.',
          timestamp: 'Now',
          sourcesDisclaimer: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectQuizAnswer = (optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuizIndex]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    const xpEarned = score * 30 + 20;
    onAwardXp(xpEarned);

    if (score >= quizQuestions.length * 0.75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setCurrentQuizIndex(0);
    setQuizScore(0);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            AI Learning Mentor & Interactive Quizzes
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Personalized academic explanations, active recall knowledge drills, and validated answer explanations.
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('mentor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'mentor'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Concept Mentor
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Recall Quiz
          </button>
        </div>
      </div>

      {/* Academic Trust & Groundedness Disclaimer */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Academic Integrity & Model Limitations:</strong> AI explanations are designed to build intuition and structure revision. Always cross-check critical course theorems, exam requirements, and grading keys against your accredited course materials.
        </div>
      </div>

      {activeTab === 'mentor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3.5 text-xs">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-600" />
                Session Parameters
              </h3>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Dynamic Programming & Optimization">Dynamic Programming</option>
                  <option value="Database Indexing & Normalization">Database Indexing & B-Trees</option>
                  <option value="Computer Systems & Architecture">Computer Architecture & Caches</option>
                  <option value="STAR Behavioral Interview Framework">STAR Interview Framework</option>
                  <option value="TypeScript & Modern Web Systems">TypeScript & API Architecture</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Difficulty Level</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setDifficulty(lvl)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-bold capitalize transition-colors ${
                        difficulty === lvl
                          ? 'bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Available Session Time</label>
                <select
                  value={availableTime}
                  onChange={(e) => setAvailableTime(parseInt(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value={15}>15 Minutes (Rapid Concept)</option>
                  <option value={25}>25 Minutes (Standard Pomodoro)</option>
                  <option value={45}>45 Minutes (Deep Dive)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-indigo-900 font-bold mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  Quick Study Prompts
                </div>
                <div className="space-y-1.5">
                  {[
                    "Explain Dynamic Programming with 0/1 Knapsack",
                    "How does a B-Tree index work under the hood?",
                    "Give me a real STAR behavioral example"
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p)}
                      className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 text-[11px] text-slate-700 hover:text-indigo-900 font-medium transition-colors"
                    >
                      "{p}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[600px] overflow-hidden">
            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-2xl rounded-2xl p-4 text-xs space-y-2.5 ${
                        isUser
                          ? 'bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] text-white rounded-br-none shadow-sm'
                          : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 border-b pb-1.5 opacity-80 text-[10px]">
                        <span className="font-bold uppercase tracking-wider">
                          {isUser ? 'You' : `CareercraftAI (${PERSONALITY_PROFILES[user.personality].title})`}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div className="whitespace-pre-line leading-relaxed font-sans text-xs">
                        {msg.content}
                      </div>

                      {/* Action items from mentor */}
                      {msg.actionItems && msg.actionItems.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/60 mt-2">
                          <p className="font-bold text-[11px] text-indigo-900 mb-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                            Next Practical Action Steps:
                          </p>
                          <ul className="list-disc pl-5 space-y-0.5 text-slate-700">
                            {msg.actionItems.map((act, i) => (
                              <li key={i}>{act}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Suggested quick clicks */}
                      {msg.suggestedTopics && msg.suggestedTopics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {msg.suggestedTopics.map((top, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(`Tell me about: ${top}`)}
                              className="px-2 py-0.5 bg-white border border-slate-200 hover:border-indigo-400 text-indigo-700 rounded-md text-[10px] font-semibold transition-colors"
                            >
                              Explore: {top}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                    Synthesizing grounded explanation...
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about a tricky concept, request an analogy, or paste a practice problem..."
                className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !query.trim()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Ask Mentor
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Mode */
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Active Recall Knowledge Drill
              </h3>
              <p className="text-xs text-slate-500">
                Question {currentQuizIndex + 1} of {quizQuestions.length} • Grounded in computer science & system concepts
              </p>
            </div>
            {quizSubmitted && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg">
                  Score: {quizScore} / {quizQuestions.length} ({Math.round((quizScore / quizQuestions.length) * 100)}%)
                </span>
                <button
                  onClick={handleResetQuiz}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1 rounded-lg"
                >
                  <RotateCcw className="w-3 h-3" /> Retry
                </button>
              </div>
            )}
          </div>

          {/* Current Question */}
          {quizQuestions[currentQuizIndex] && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between text-[11px] font-bold text-indigo-700 mb-2">
                  <span>Topic: {quizQuestions[currentQuizIndex].topic}</span>
                  <span className="capitalize px-2 py-0.5 rounded bg-indigo-100/60 text-indigo-800">
                    {quizQuestions[currentQuizIndex].difficulty}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {quizQuestions[currentQuizIndex].question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {quizQuestions[currentQuizIndex].options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuizIndex] === optIdx;
                  const isCorrect = optIdx === quizQuestions[currentQuizIndex].correctAnswerIndex;

                  let optionStyle = 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20';
                  if (isSelected && !quizSubmitted) {
                    optionStyle = 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-semibold';
                  } else if (quizSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuizAnswer(optIdx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start gap-3 ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {quizSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {quizSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown when submitted or answering) */}
              {quizSubmitted && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    Conceptual Explanation:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {quizQuestions[currentQuizIndex].explanation}
                  </p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentQuizIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuizIndex === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-40"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {currentQuizIndex < quizQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuizIndex(prev => Math.min(quizQuestions.length - 1, prev + 1))}
                      className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700"
                    >
                      Next Question
                    </button>
                  ) : (
                    !quizSubmitted && (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm"
                      >
                        Submit & Check Answers
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
