import mongoose, { Schema, Document } from 'mongoose';

// User Schema
export interface IUser extends Document {
  email: string;
  name: string;
  pathway: 'student' | 'graduate' | 'professional' | 'career_changer';
  goal: string;
  targetRole: string;
  field: string;
  xp: number;
  level: number;
  streakDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    pathway: {
      type: String,
      enum: ['student', 'graduate', 'professional', 'career_changer'],
      default: 'student',
    },
    goal: { type: String, default: '' },
    targetRole: { type: String, default: '' },
    field: { type: String, default: '' },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streakDays: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

// Academic Performance Record Schema
export interface IAcademicRecord extends Document {
  userId: string;
  subject: string;
  assessmentName: string;
  date: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  attendancePercent?: number;
  difficultTopics: string[];
  confidence: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AcademicRecordSchema = new Schema<IAcademicRecord>(
  {
    userId: { type: String, required: true, index: true },
    subject: { type: String, required: true, index: true },
    assessmentName: { type: String, required: true },
    date: { type: String, required: true },
    marksObtained: { type: Number, required: true },
    maxMarks: { type: Number, required: true, default: 100 },
    percentage: { type: Number, required: true },
    attendancePercent: { type: Number },
    difficultTopics: [{ type: String }],
    confidence: { type: Number, min: 1, max: 5, default: 3 },
    notes: { type: String },
  },
  { timestamps: true }
);

export const AcademicRecordModel =
  mongoose.models.AcademicRecord ||
  mongoose.model<IAcademicRecord>('AcademicRecord', AcademicRecordSchema);

// Resume Schema
export interface IResume extends Document {
  userId: string;
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
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    highlights: string[];
  }>;
  experience: Array<{
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    bullets: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    credentialUrl?: string;
  }>;
  achievements: Array<{
    title: string;
    date?: string;
    description: string;
  }>;
  template: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    targetRole: { type: String, default: '' },
    contact: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      portfolioUrl: { type: String },
      linkedinUrl: { type: String },
      githubUrl: { type: String },
    },
    summary: { type: String, default: '' },
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
        gpa: String,
        highlights: [String],
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        bullets: [String],
      },
    ],
    projects: [
      {
        name: String,
        description: String,
        technologies: [String],
        link: String,
        bullets: [String],
      },
    ],
    skills: {
      technical: [String],
      soft: [String],
      tools: [String],
    },
    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: String,
        credentialUrl: String,
      },
    ],
    achievements: [
      {
        title: String,
        date: String,
        description: String,
      },
    ],
    template: { type: String, default: 'modern' },
  },
  { timestamps: true }
);

export const ResumeModel = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);

// Resume Analysis Report Schema
export interface IAnalysisReport extends Document {
  userId: string;
  resumeId: string;
  jobTitle: string;
  matchScore: number;
  keywordsFound: string[];
  keywordsMissing: string[];
  suggestions: Array<{
    section: string;
    originalText: string;
    proposedRevision: string;
    rationale: string;
    status: string;
  }>;
  createdAt: Date;
}

const AnalysisReportSchema = new Schema<IAnalysisReport>(
  {
    userId: { type: String, required: true, index: true },
    resumeId: { type: String, required: true, index: true },
    jobTitle: { type: String, required: true },
    matchScore: { type: Number, required: true },
    keywordsFound: [String],
    keywordsMissing: [String],
    suggestions: [
      {
        section: String,
        originalText: String,
        proposedRevision: String,
        rationale: String,
        status: { type: String, default: 'pending' },
      },
    ],
  },
  { timestamps: true }
);

export const AnalysisReportModel =
  mongoose.models.AnalysisReport ||
  mongoose.model<IAnalysisReport>('AnalysisReport', AnalysisReportSchema);

export interface IAppState extends Document {
  workspaceId: string;
  state: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const AppStateSchema = new Schema<IAppState>(
  {
    workspaceId: { type: String, required: true, unique: true, index: true },
    state: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const AppStateModel =
  mongoose.models.AppState || mongoose.model<IAppState>('AppState', AppStateSchema);
