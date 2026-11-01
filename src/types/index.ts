export type UserPathway = 'student' | 'graduate' | 'professional' | 'career_changer';

export type PersonalityMode = 'study_buddy' | 'calm_mentor' | 'strict_coach' | 'playful_motivator';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  pathway: UserPathway;
  goal: string;
  targetRole: string;
  field: string;
  currentStage: string;
  availableHoursPerWeek: number;
  learningStyle: 'visual' | 'practical' | 'reading' | 'interactive';
  demoMode: boolean;
  xp: number;
  level: number;
  streakDays: number;
  personality: PersonalityMode;
  funModeEnabled: boolean;
  theme: 'light' | 'dark';
}

export interface SubjectRecord {
  id: string;
  subject: string;
  assessmentName: string;
  date: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  attendancePercent?: number;
  difficultTopics?: string[];
  confidence: number; // 1 to 5
  notes?: string;
}

export interface PerformanceAnalysis {
  averagePercentage: number;
  totalAssessments: number;
  trend: 'improving' | 'declining' | 'stable' | 'insufficient_data';
  trendValue: number; // change in %
  strongSubjects: { subject: string; average: number; count: number }[];
  weakSubjects: { subject: string; average: number; count: number; difficultTopics: string[] }[];
  subjectAverages: { subject: string; average: number; count: number; latestDate: string; difficultTopics?: string[] }[];
  warnings: string[];
  recommendations: {
    id: string;
    type: 'revision' | 'practice' | 'reassess' | 'upcoming';
    title: string;
    description: string;
    subject: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

export interface StudySession {
  id: string;
  subject: string;
  topic: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights: string[];
}

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface ResumeProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  bullets: string[];
  verifiedDate?: string;
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface ResumeData {
  id: string;
  title: string;
  targetRole: string;
  contact: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    portfolioUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  };
  summary: string;
  education: ResumeEducation[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  certifications: ResumeCertification[];
  achievements: { id: string; title: string; date?: string; description: string }[];
  customSections?: { id: string; title: string; content: string[] }[];
  template: 'modern' | 'executive' | 'minimal' | 'academic';
  updatedAt: string;
}

export interface ResumeSuggestion {
  id: string;
  section: 'summary' | 'experience' | 'projects' | 'skills' | 'education';
  originalText: string;
  proposedRevision: string;
  rationale: string;
  evidenceFound: string;
  unverifiedFactWarning?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface AgentStepStatus {
  agentId: string;
  agentName: string;
  role: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  summary?: string;
  details?: string[];
  timestamp?: string;
}

export interface JobAnalysisResult {
  jobTitle: string;
  company?: string;
  requiredSkills: { skill: string; evidenceInResume: boolean; matchingDetails?: string }[];
  preferredSkills: { skill: string; evidenceInResume: boolean; matchingDetails?: string }[];
  keywordsFound: string[];
  keywordsMissing: string[];
  relevantExperienceFound: string[];
  matchScore: number; // 0-100 deterministic calculation
  scoreBreakdown: {
    requiredSkillsScore: number;
    preferredSkillsScore: number;
    keywordCoverage: number;
    experienceRelevance: number;
  };
  suggestions: ResumeSuggestion[];
  factCheckWarnings: {
    issue: string;
    severity: 'warning' | 'caution' | 'critical';
    advice: string;
  }[];
  learningRoadmap: {
    step: number;
    title: string;
    targetSkill: string;
    estimatedHours: number;
    suggestedActivity: string;
    milestone: string;
  }[];
  agentSteps: AgentStepStatus[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface InterviewQuestion {
  id: string;
  type: 'technical' | 'behavioral' | 'project';
  question: string;
  category: string;
  targetRole: string;
  sampleStructure: string; // e.g. STAR breakdown
  userAnswer?: string;
  feedback?: {
    score: number;
    strengths: string[];
    improvements: string[];
    starCoverage: {
      situation: boolean;
      task: boolean;
      action: boolean;
      result: boolean;
    };
  };
}

export interface CareerQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: 'academic' | 'resume' | 'learning' | 'interview';
  completed: boolean;
  progress: number;
  maxProgress: number;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
