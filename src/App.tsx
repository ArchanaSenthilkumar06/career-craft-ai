import React, { useState, useMemo, useEffect } from 'react';
import {
  UserProfile,
  SubjectRecord,
  ResumeData,
  CareerQuest,
  PersonalityMode
} from './types';
import {
  DEMO_PROFILES,
  DEMO_SUBJECT_RECORDS,
  DEMO_RESUMES,
  DEMO_CAREER_QUESTS
} from './data/demoData';
import { calculatePerformanceMetrics } from './utils/performanceCalculations';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { PerformanceAnalyzer } from './components/performance/PerformanceAnalyzer';
import { LearningMentor } from './components/learning/LearningMentor';
import { ResumeBuilder } from './components/resume/ResumeBuilder';
import { ResumeStudio } from './components/resume/ResumeStudio';
import { InterviewPrep } from './components/interview/InterviewPrep';
import { QuestBoard } from './components/quests/QuestBoard';
import { FocusTimerModal } from './components/focus/FocusTimerModal';
import { LoginPage } from './components/auth/LoginPage';

interface PersistedAppState {
  version: 1;
  currentPathway: string;
  user: UserProfile;
  activeTab: string;
  isDarkMode: boolean;
  records: SubjectRecord[];
  resume: ResumeData;
  quests: CareerQuest[];
}

const WORKSPACE_ID_KEY = 'careercraftai.workspaceId';

function isPersistedAppState(value: unknown): value is PersistedAppState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const state = value as Record<string, unknown>;
  return (
    state.version === 1 &&
    typeof state.currentPathway === 'string' &&
    typeof state.user === 'object' &&
    state.user !== null &&
    typeof state.activeTab === 'string' &&
    typeof state.isDarkMode === 'boolean' &&
    Array.isArray(state.records) &&
    typeof state.resume === 'object' &&
    state.resume !== null &&
    Array.isArray(state.quests)
  );
}

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Both Theme Options state (Light / Dark)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Current active pathway & profile (Archana is the default)
  const [currentPathway, setCurrentPathway] = useState<string>('student');
  const [user, setUser] = useState<UserProfile>(DEMO_PROFILES['student']);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Academic Records state
  const [records, setRecords] = useState<SubjectRecord[]>(DEMO_SUBJECT_RECORDS);

  // Resume state (Default: Archana's full-stack software engineer resume)
  const [resume, setResume] = useState<ResumeData>(DEMO_RESUMES['student']);

  // Quests state
  const [quests, setQuests] = useState<CareerQuest[]>(DEMO_CAREER_QUESTS);

  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [persistenceStatus, setPersistenceStatus] = useState<'connecting' | 'saving' | 'saved' | 'error'>('connecting');
  const [persistenceError, setPersistenceError] = useState<string | null>(null);
  const saveQueue = React.useRef<Promise<void>>(Promise.resolve());

  // Load saved app data before syncing any changes back to MongoDB.
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const loadState = async () => {
      try {
        const id = localStorage.getItem(WORKSPACE_ID_KEY) || crypto.randomUUID();
        localStorage.setItem(WORKSPACE_ID_KEY, id);
        if (!isMounted) return;
        setWorkspaceId(id);

        const response = await fetch(`/api/v1/state/${id}`, { signal: controller.signal });
        const result = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(result?.error || `MongoDB load failed (${response.status})`);
        }
        if (result?.state !== null && !isPersistedAppState(result?.state)) {
          throw new Error('Saved app data has an unsupported format.');
        }

        if (result?.state) {
          const savedState = result.state;
          setCurrentPathway(savedState.currentPathway);
          setUser(savedState.user);
          setActiveTab(savedState.activeTab);
          setIsDarkMode(savedState.isDarkMode);
          setRecords(savedState.records);
          setResume(savedState.resume);
          setQuests(savedState.quests);
          setPersistenceStatus('saved');
        } else {
          setPersistenceStatus('saving');
        }
        setPersistenceError(null);
      } catch (error: unknown) {
        if (!isMounted || (error instanceof DOMException && error.name === 'AbortError')) return;
        const message = error instanceof Error ? error.message : String(error);
        setPersistenceError(message);
        setPersistenceStatus('error');
      } finally {
        if (isMounted) setIsHydrated(true);
      }
    };

    void loadState();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Debounce writes and serialize them so an older snapshot cannot overwrite a newer one.
  useEffect(() => {
    if (!isHydrated || !workspaceId) return;

    const snapshot: PersistedAppState = {
      version: 1,
      currentPathway,
      user,
      activeTab,
      isDarkMode,
      records,
      resume,
      quests,
    };

    const timeout = window.setTimeout(() => {
      setPersistenceStatus('saving');
      saveQueue.current = saveQueue.current.then(async () => {
        try {
          const response = await fetch(`/api/v1/state/${workspaceId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: snapshot }),
          });
          const result = await response.json().catch(() => null);
          if (!response.ok) {
            throw new Error(result?.error || `MongoDB save failed (${response.status})`);
          }
          setPersistenceError(null);
          setPersistenceStatus('saved');
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : String(error);
          setPersistenceError(message);
          setPersistenceStatus('error');
        }
      });
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [isHydrated, workspaceId, currentPathway, user, activeTab, isDarkMode, records, resume, quests]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle Theme Handler
  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Deterministic metrics calculation
  const metrics = useMemo(() => {
    return calculatePerformanceMetrics(records);
  }, [records]);

  // Pathway Switch Handler
  const handleSwitchPathway = (newPathway: string) => {
    setCurrentPathway(newPathway);
    if (DEMO_PROFILES[newPathway]) {
      setUser(DEMO_PROFILES[newPathway]);
    }
    if (DEMO_RESUMES[newPathway]) {
      setResume(DEMO_RESUMES[newPathway]);
    }
  };

  // XP Award Handler
  const handleAwardXp = (amount: number) => {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 250) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  // Personality Update
  const handleUpdatePersonality = (mode: PersonalityMode) => {
    setUser(prev => ({ ...prev, personality: mode }));
  };

  // Fun Mode Toggle
  const handleToggleFunMode = () => {
    setUser(prev => ({ ...prev, funModeEnabled: !prev.funModeEnabled }));
  };

  // User Goal Update
  const handleUpdateGoal = (newGoal: string) => {
    setUser(prev => ({ ...prev, goal: newGoal }));
  };

  // Record Handlers
  const handleAddRecord = (newRec: Omit<SubjectRecord, 'id' | 'percentage'>) => {
    const pct = Math.round((newRec.marksObtained / newRec.maxMarks) * 100);
    const fullRec: SubjectRecord = {
      ...newRec,
      id: `rec-${Date.now()}`,
      percentage: pct
    };
    setRecords(prev => [fullRec, ...prev]);
    handleAwardXp(50);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  // Quest Claim Handler
  const handleClaimQuest = (questId: string) => {
    setQuests(prev =>
      prev.map(q => {
        if (q.id === questId) {
          handleAwardXp(q.xpReward);
          return { ...q, completed: true };
        }
        return q;
      })
    );
  };

  // Render Login Page if not signed in
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
          if (loggedInUser.pathway && DEMO_RESUMES[loggedInUser.pathway]) {
            setResume({
              ...DEMO_RESUMES[loggedInUser.pathway],
              contact: {
                ...DEMO_RESUMES[loggedInUser.pathway].contact,
                fullName: loggedInUser.name,
                email: loggedInUser.email
              }
            });
          }
          setIsAuthenticated(true);
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors ${
      isDarkMode ? 'dark bg-[#0E1318] text-white' : 'bg-[#F3F4F7] text-slate-900'
    }`}>
      {/* Persistent Left Midnight-Navy Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          user={user}
          onUpdatePersonality={handleUpdatePersonality}
          onToggleFunMode={handleToggleFunMode}
          onSwitchPathway={handleSwitchPathway}
          activeTab={activeTab}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onLogout={() => setIsAuthenticated(false)}
        />

        {/* Viewport Content */}
        <main className={`flex-1 overflow-y-auto px-6 py-6 transition-colors ${
          isDarkMode ? 'bg-[#0E1318]' : 'bg-[#F3F4F7]'
        }`}>
          <div
            className={`mb-4 rounded-lg px-4 py-2 text-sm ${
              persistenceError
                ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
            }`}
            role={persistenceError ? 'alert' : 'status'}
          >
            {persistenceError
              ? `MongoDB sync failed: ${persistenceError}`
              : persistenceStatus === 'connecting'
                ? 'Connecting to MongoDB...'
                : persistenceStatus === 'saving'
                  ? 'Saving app data to MongoDB...'
                  : 'App data synced with MongoDB'}
          </div>

          {activeTab === 'dashboard' && (
            <OverviewDashboard
              user={user}
              metrics={metrics}
              resume={resume}
              quests={quests}
              onNavigate={setActiveTab}
              onUpdateGoal={handleUpdateGoal}
            />
          )}

          {activeTab === 'performance' && (
            <PerformanceAnalyzer
              records={records}
              metrics={metrics}
              onAddRecord={handleAddRecord}
              onDeleteRecord={handleDeleteRecord}
              user={user}
            />
          )}

          {activeTab === 'mentor' && (
            <LearningMentor
              user={user}
              onAwardXp={handleAwardXp}
            />
          )}

          {activeTab === 'resume-builder' && (
            <ResumeBuilder
              resume={resume}
              onUpdateResume={setResume}
              user={user}
              onNavigateToStudio={() => setActiveTab('resume-studio')}
            />
          )}

          {activeTab === 'resume-studio' && (
            <ResumeStudio
              resume={resume}
              onUpdateResume={setResume}
              onAwardXp={handleAwardXp}
            />
          )}

          {activeTab === 'interview' && (
            <InterviewPrep
              user={user}
              resume={resume}
              onAwardXp={handleAwardXp}
            />
          )}

          {activeTab === 'quests' && (
            <QuestBoard
              user={user}
              quests={quests}
              onClaimQuest={handleClaimQuest}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'focus' && (
            <FocusTimerModal
              onAwardXp={handleAwardXp}
            />
          )}
        </main>
      </div>
    </div>
  );
}
