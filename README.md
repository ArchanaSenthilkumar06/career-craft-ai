# CareercraftAI

> **"Know your strengths. Grow your skills. Build your future."**

CareercraftAI is an integrated full-stack AI platform bridging student performance analysis, personalized learning, evidence-grounded resume craftsmanship, and career readiness.

---

## 🌟 Core Modules

1. **Pathway Personalization & Onboarding**
   - School & College Students
   - Fresh Graduates & Internship Applicants
   - Experienced Professionals
   - Career Changers & Transitioners
   - Includes full 1-click rich demo datasets for instant evaluation.
   - Profile, progress, academic records, resume drafts, and quest progress sync to MongoDB per browser workspace.

2. **Overview Dashboard**
   - Dynamic pathway-specific goals and metrics
   - Weighted academic/technical performance tracking
   - Real-time ATS resume readiness score
   - Active daily activity streak & XP level
   - Actionable data-backed recommendations

3. **Academic & Performance Analyzer**
   - Deterministic calculations for marks, percentages, and trend direction
   - Strongest disciplines vs flagged weakness analysis (<75%)
   - Statistical rigor alerts for single-assessment subjects
   - Adaptive study schedule generator based on student available hours

4. **AI Learning Mentor & Quizzes**
   - 4 Personality Modes: Friendly Study Buddy, Calm Mentor, Strict Focus Coach, Playful Motivator
   - Active recall knowledge drills with instant answer key checking and explanations
   - Grounded explanations without hallucinated claims or grades
   - Transparent academic limitations disclaimer

5. **Resume Builder & Preview Studio**
   - 4 ATS-optimized templates: Modern Tech, Executive Classic, Minimal ATS, and Academic
   - Interactive live preview with instant updates
   - Print-to-PDF with clean `@media print` CSS styling
   - JSON data backup and export

6. **AI Resume Studio (6-Agent Multi-Agent Workflow)**
   - **Agent 1:** Candidate Profile Analyst
   - **Agent 2:** Job Description Analyst
   - **Agent 3:** Resume Evidence Analyst
   - **Agent 4:** Skill-Gap & Keyword Matcher
   - **Agent 5:** Learning & Career Roadmap Planner
   - **Agent 6:** Resume Fact Checker & Integrity Guardrails
   - Individual **Accept** and **Reject** buttons directly applying verified revisions to the resume draft!

7. **Interview & STAR Readiness**
   - STAR (Situation, Task, Action, Result) behavioral drills
   - Technical and project architecture practice
   - Automated evaluation scoring answer depth, active action verbs, and quantifiable metrics

8. **Career Quests & Focus Sprint Suite**
   - Working Pomodoro timer (25m Focus, 5m Rest) with start/pause/resume/reset
   - Activity quests awarding verified XP
   - Milestone achievement badges
   - Optional Fun Mode toggle for lighthearted prompts or strictly professional interface

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (optional for persistent storage; local `mongodb://127.0.0.1:27017` or cloud MongoDB Atlas)
- Google Gemini API key (optional; configured via `.env`)

### Installation
```bash
# Clone the repository
git clone <repository_url>
cd careercraft-ai

# Install dependencies
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your variables in `.env`:
```env
# Google Gemini AI API Key
GEMINI_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY"

# Model name (default: gemini-2.5-flash)
GEMINI_MODEL="gemini-2.5-flash"

# MongoDB connection string
MONGODB_URI="mongodb://127.0.0.1:27017/careercraft_ai"

# Port (default: 3000)
PORT=3000
```

The app loads and saves its main workspace data through MongoDB. Each browser gets a workspace ID stored in its local storage; use the same browser to see its saved data. The workspace is not tied to an authenticated account, so this is intended for a local/demo deployment rather than shared multi-user access.

### Running the App
```bash
# Start development server (runs full-stack Express + Vite middlewares)
npm run dev
```

Open your browser at `http://localhost:3000`.

---

## 📡 Backend API Endpoints

Namespace: `/api/v1`

- `GET /api/v1/health` - Database & AI provider status
- `GET /api/v1/state/:workspaceId` - Load a browser workspace's app data
- `PUT /api/v1/state/:workspaceId` - Save a browser workspace's app data
- `POST /api/v1/performance/analyze` - Deterministic calculation of assessment records
- `POST /api/v1/learning/mentor` - Conversational academic concept explanations
- `POST /api/v1/learning/quiz` - Dynamic topic quiz generation
- `POST /api/v1/resumes/analyze` - Upload a PDF, DOCX, or TXT resume and analyze it against a job description
- `GET /api/v1/resumes/reports` - List recent resume analysis reports
- `POST /api/v1/resumes/suggestions/:id/decision` - Accept or reject resume recommendations

---

## 🛡️ Groundedness & Integrity Principles

- **No Hallucinated Experience:** CareercraftAI will never fabricate employers, dates, qualifications, or metrics.
- **Explainable Scores:** Match indicators are computed from documented skill matches, not arbitrary black-box hiring probabilities.
- **Honest Demo States:** Clear badges distinguish demo data from persisted records.
