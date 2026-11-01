import React, { useState } from 'react';
import { SubjectRecord, PerformanceAnalysis, StudySession, UserProfile } from '../../types';
import {
  GraduationCap,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Clock,
  Sparkles,
  BarChart2,
  Sliders,
  CheckSquare,
  Square
} from 'lucide-react';

interface PerformanceAnalyzerProps {
  records: SubjectRecord[];
  metrics: PerformanceAnalysis;
  onAddRecord: (record: Omit<SubjectRecord, 'id' | 'percentage'>) => void;
  onDeleteRecord: (id: string) => void;
  user: UserProfile;
}

export const PerformanceAnalyzer: React.FC<PerformanceAnalyzerProps> = ({
  records,
  metrics,
  onAddRecord,
  onDeleteRecord,
  user
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [subject, setSubject] = useState('Data Structures & Algorithms');
  const [assessmentName, setAssessmentName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [marksObtained, setMarksObtained] = useState('85');
  const [maxMarks, setMaxMarks] = useState('100');
  const [attendancePercent, setAttendancePercent] = useState('95');
  const [difficultTopicsStr, setDifficultTopicsStr] = useState('');
  const [confidence, setConfidence] = useState(4);
  const [notes, setNotes] = useState('');

  // Generated study schedule state
  const [studySessions, setStudySessions] = useState<StudySession[]>([
    {
      id: 'session-1',
      subject: 'Data Structures & Algorithms',
      topic: 'Dynamic Programming (Knapsack & Space Optimization)',
      date: 'Tomorrow, 4:00 PM',
      startTime: '16:00',
      durationMinutes: 45,
      completed: false,
      priority: 'high'
    },
    {
      id: 'session-2',
      subject: 'Computer Systems & Architecture',
      topic: 'Cache Miss Analysis & 2-Way Set Associative Indexing',
      date: 'Thursday, 6:00 PM',
      startTime: '18:00',
      durationMinutes: 45,
      completed: false,
      priority: 'high'
    },
    {
      id: 'session-3',
      subject: 'Discrete Mathematics',
      topic: 'Permutations with Repetitions & Generating Functions',
      date: 'Saturday, 10:00 AM',
      startTime: '10:00',
      durationMinutes: 60,
      completed: true,
      priority: 'medium'
    }
  ]);

  const handleToggleSession = (id: string) => {
    setStudySessions(prev =>
      prev.map(s => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleSubmitNewRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !assessmentName.trim()) return;

    const obtainedNum = parseFloat(marksObtained) || 0;
    const maxNum = parseFloat(maxMarks) || 100;
    const attendanceNum = attendancePercent ? parseFloat(attendancePercent) : undefined;
    const diffTopics = difficultTopicsStr
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onAddRecord({
      subject: subject.trim(),
      assessmentName: assessmentName.trim(),
      date,
      marksObtained: obtainedNum,
      maxMarks: maxNum,
      attendancePercent: attendanceNum,
      difficultTopics: diffTopics,
      confidence,
      notes: notes.trim() || undefined
    });

    // Reset and close
    setAssessmentName('');
    setDifficultTopicsStr('');
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            Academic & Performance Analyzer
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Deterministic mathematics engine tracking percentages, historical trajectories, and data-backed study priorities.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-md shadow-[#7D2AE8]/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Log Assessment Marks
        </button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Overall Weighted Average
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {metrics.averagePercentage}%
            </span>
            <span className={`text-xs font-bold flex items-center ${
              metrics.trend === 'improving' ? 'text-emerald-600' : metrics.trend === 'declining' ? 'text-rose-600' : 'text-slate-500'
            }`}>
              {metrics.trend === 'improving' && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
              {metrics.trend === 'declining' && <TrendingDown className="w-3.5 h-3.5 mr-1" />}
              {metrics.trend === 'improving' ? `+${metrics.trendValue}% Trajectory` : metrics.trend === 'declining' ? `${metrics.trendValue}% Trajectory` : 'Stable Trend'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Calculated across {metrics.totalAssessments} submitted assessment records.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Strongest Disciplines (≥82%)
          </span>
          <div className="mt-2 space-y-1">
            {metrics.strongSubjects.length > 0 ? (
              metrics.strongSubjects.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{s.subject}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {s.average}%
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">Add more assessments to identify strong areas.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Flagged Focus Areas (&lt;75%)
          </span>
          <div className="mt-2 space-y-1">
            {metrics.weakSubjects.length > 0 ? (
              metrics.weakSubjects.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{s.subject}</span>
                  <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {s.average}%
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-emerald-600 font-medium">All logged subjects currently above 75% baseline.</p>
            )}
          </div>
        </div>
      </div>

      {/* Warnings & Insufficient Data notices */}
      {metrics.warnings.length > 0 && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Statistical Rigor & Data Quality Notes:
          </div>
          <ul className="text-xs text-sky-900 space-y-1 pl-6 list-disc">
            {metrics.warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Logged Academic Records</h3>
            <p className="text-xs text-slate-500">Every score is deterministically audited against maximum marks.</p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
            {records.length} Total Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Assessment</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Difficult Topics</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {records.map((rec) => {
                const pct = Math.round((rec.marksObtained / rec.maxMarks) * 100);
                return (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{rec.subject}</td>
                    <td className="py-3.5 px-4">{rec.assessmentName}</td>
                    <td className="py-3.5 px-4 text-slate-500">{rec.date}</td>
                    <td className="py-3.5 px-4 font-medium">
                      {rec.marksObtained} / {rec.maxMarks}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                        pct >= 85 ? 'bg-emerald-50 text-emerald-700' : pct >= 70 ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {pct}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {rec.difficultTopics && rec.difficultTopics.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {rec.difficultTopics.map((topic, ti) => (
                            <span key={ti} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">
                              {topic}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">{rec.confidence}/5</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onDeleteRecord(rec.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Study Timetable & Schedule Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Tailored Adaptive Study Schedule
            </h3>
            <p className="text-xs text-slate-500">
              Constructed according to your {user.availableHoursPerWeek} available weekly study hours and priority weak concepts.
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
            {studySessions.filter(s => s.completed).length} / {studySessions.length} Sessions Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {studySessions.map((session) => (
            <div
              key={session.id}
              onClick={() => handleToggleSession(session.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                session.completed
                  ? 'bg-emerald-50/50 border-emerald-200 text-slate-600'
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  session.priority === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                }`}>
                  {session.priority} Priority
                </span>
                {session.completed ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </div>
              <h4 className={`text-xs font-bold mt-2 ${session.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                {session.subject}
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                {session.topic}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {session.durationMinutes} mins
                </span>
                <span>{session.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Log Assessment Marks */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Log New Assessment Record</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitNewRecord} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Name *</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. Data Structures & Algorithms"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assessment Name *</label>
                <input
                  type="text"
                  required
                  value={assessmentName}
                  onChange={(e) => setAssessmentName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. Midterm 1 - Dynamic Programming"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Marks Obtained *</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={marksObtained}
                    onChange={(e) => setMarksObtained(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Marks *</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Difficult Concepts / Topics (comma-separated)</label>
                <input
                  type="text"
                  value={difficultTopicsStr}
                  onChange={(e) => setDifficultTopicsStr(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="e.g. Memoization table, space complexity"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Confidence Level: {confidence}/5</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={confidence}
                  onChange={(e) => setConfidence(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] hover:opacity-95 text-white rounded-lg font-bold shadow-sm"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
