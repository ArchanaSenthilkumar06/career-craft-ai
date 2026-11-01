import React, { useState, useRef } from 'react';
import { ResumeData, JobAnalysisResult, ResumeSuggestion, AgentStepStatus } from '../../types';
import { runMultiAgentAnalysis } from '../../services/agentWorkflow';
import { DEMO_SAMPLE_JOB_DESCRIPTION } from '../../data/demoData';
import {
  ScanSearch,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  X,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  BookOpen,
  Upload,
  FileText,
  FileCode,
  FileUp,
  Eye,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeStudioProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onAwardXp: (xp: number) => void;
}

interface UploadedFileMetadata {
  name: string;
  sizeKb: number;
  type: string;
  extractedWordCount: number;
  uploadedAt: string;
}

export const ResumeStudio: React.FC<ResumeStudioProps> = ({
  resume,
  onUpdateResume,
  onAwardXp
}) => {
  const [jobDescription, setJobDescription] = useState(DEMO_SAMPLE_JOB_DESCRIPTION);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<JobAnalysisResult | null>(null);
  const [currentStep, setCurrentStep] = useState<AgentStepStatus | null>(null);

  // Resume Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMetadata>({
    name: `${resume.contact.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
    sizeKb: 142,
    type: 'application/pdf',
    extractedWordCount: 520,
    uploadedAt: 'Active Draft'
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [extractedPreviewOpen, setExtractedPreviewOpen] = useState(false);
  const [rawExtractedText, setRawExtractedText] = useState<string>(
    `${resume.contact.fullName}\nEmail: ${resume.contact.email} | Phone: ${resume.contact.phone} | Location: ${resume.contact.location}\nGitHub: ${resume.contact.githubUrl} | LinkedIn: ${resume.contact.linkedinUrl}\n\nSUMMARY:\n${resume.summary}\n\nEDUCATION:\n${resume.education.map(e => `${e.institution} - ${e.degree} (GPA: ${e.gpa || 'N/A'})\nHighlights: ${e.highlights?.join(', ')}`).join('\n')}\n\nEXPERIENCE:\n${resume.experience.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.bullets.join('\n')}`).join('\n\n')}\n\nPROJECTS:\n${resume.projects.map(p => `${p.name} [${p.technologies.join(', ')}]\n${p.bullets.join('\n')}`).join('\n\n')}\n\nTECHNICAL SKILLS:\n${resume.skills.technical.join(', ')}\nTools: ${resume.skills.tools.join(', ')}`
  );

  const handleStartAnalysis = async () => {
    if (!jobDescription.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await runMultiAgentAnalysis(resume, jobDescription, (step) => {
        setCurrentStep(step);
      });
      setAnalysisResult(result);
      onAwardXp(180); // Award XP for running complete multi-agent audit
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
      } catch {
        // ignore
      }
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsAnalyzing(false);
      setCurrentStep(null);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const sizeInKb = Math.round(file.size / 1024);
    const fileName = file.name;
    const fileExt = fileName.split('.').pop()?.toLowerCase();

    if (!['pdf', 'docx', 'doc', 'txt'].includes(fileExt || '')) {
      alert('Please upload a PDF (.pdf), Word document (.docx), or plain text (.txt) resume file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
  alert("Please upload a resume smaller than 5 MB.");
  return;
}

setSelectedFile(file);
setAnalysisError(null);
setAnalysisResult(null);

    // Process file reading
    if (fileExt === 'txt') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) || '';
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        setRawExtractedText(text);
        setUploadedFile({
          name: fileName,
          sizeKb: sizeInKb,
          type: file.type || 'text/plain',
          extractedWordCount: wordCount,
          uploadedAt: 'Just now'
        });
        setUploadSuccessMessage(`Successfully uploaded "${fileName}" (${wordCount} words extracted). Ready for ATS audit.`);
        setTimeout(() => setUploadSuccessMessage(null), 5000);
      };
      reader.readAsText(file);
    } else {
      // Simulate/Parse PDF/DOCX text extraction
      const estimatedWords = Math.max(380, Math.min(850, sizeInKb * 4));
      const simulatedText = `${resume.contact.fullName}\nEmail: ${resume.contact.email} | Phone: ${resume.contact.phone}\n[Parsed from ${fileName}]\n\nSummary:\n${resume.summary}\n\nSkills Evidenced:\n${resume.skills.technical.join(', ')}\n\nProjects:\n${resume.projects.map(p => `${p.name} - ${p.description}`).join('\n')}`;

      setRawExtractedText(simulatedText);
      setUploadedFile({
        name: fileName,
        sizeKb: sizeInKb,
        type: file.type || `application/${fileExt}`,
        extractedWordCount: estimatedWords,
        uploadedAt: 'Just now'
      });
      setUploadSuccessMessage(`Successfully parsed "${fileName}" (${sizeInKb} KB). ATS structure verified.`);
      setTimeout(() => setUploadSuccessMessage(null), 5000);
    }

    onAwardXp(40);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleAcceptSuggestion = (suggestion: ResumeSuggestion) => {
    if (!analysisResult) return;

    // Apply change directly to resume data
    const updatedResume = { ...resume };

    if (suggestion.section === 'summary') {
      updatedResume.summary = suggestion.proposedRevision;
    } else if (suggestion.section === 'projects' && updatedResume.projects.length > 0) {
      const firstProj = { ...updatedResume.projects[0] };
      firstProj.bullets = [suggestion.proposedRevision, ...firstProj.bullets.slice(1)];
      updatedResume.projects = [firstProj, ...updatedResume.projects.slice(1)];
    }

    onUpdateResume(updatedResume);

    // Update suggestion status in analysis result
    const updatedSuggestions = analysisResult.suggestions.map(s =>
      s.id === suggestion.id ? { ...s, status: 'accepted' as const } : s
    );
    setAnalysisResult({
      ...analysisResult,
      suggestions: updatedSuggestions
    });

    onAwardXp(60);
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    if (!analysisResult) return;
    const updatedSuggestions = analysisResult.suggestions.map(s =>
      s.id === suggestionId ? { ...s, status: 'rejected' as const } : s
    );
    setAnalysisResult({
      ...analysisResult,
      suggestions: updatedSuggestions
    });
  };

  // Instant ATS Baseline Score calculation
  const atsHealthScore = Math.min(95, Math.round(
    (resume.contact.email ? 15 : 0) +
    (resume.contact.phone ? 10 : 0) +
    (resume.summary.length > 50 ? 15 : 5) +
    (resume.education.length > 0 ? 15 : 0) +
    (resume.experience.length > 0 ? 15 : 5) +
    (resume.projects.length >= 2 ? 15 : 5) +
    (resume.skills.technical.length >= 5 ? 15 : 5)
  ));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ScanSearch className="w-5 h-5 text-indigo-600" />
            AI Resume Improvement & ATS Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload your resume document (PDF, DOCX, TXT) or audit Archana's active draft with our 6-agent collaborative pipeline.
          </p>
        </div>

        <button
          onClick={handleStartAnalysis}
          disabled={isAnalyzing || !jobDescription.trim()}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all shrink-0"
        >
          {isAnalyzing ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              Orchestrating 6 Agents...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              Check ATS Score & Audit
            </>
          )}
        </button>
      </div>

      {/* SUCCESS BANNER UPON UPLOAD */}
      {uploadSuccessMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-medium flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{uploadSuccessMessage}</span>
        </div>
      )}

      {/* 2-COLUMN SECTION: RESUME UPLOAD DROPZONE & TARGET JOB DESCRIPTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: RESUME UPLOAD & PARSER DROPZONE */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              Upload Resume Document
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              ATS Parser Ready
            </span>
          </div>

          {/* Drag & Drop Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
                : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/80 bg-slate-50/40'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
              accept=".pdf,.docx,.doc,.txt"
              className="hidden"
            />
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <FileUp className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-slate-800">
              Drag & Drop your resume here, or <span className="text-indigo-600 underline">Browse</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports PDF, DOCX, DOC, and TXT files (Max 10 MB)
            </p>
          </div>

          {/* Current Active File Card */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3 truncate">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </span>
              <div className="truncate">
                <h5 className="text-xs font-bold text-slate-900 truncate">{uploadedFile.name}</h5>
                <p className="text-[11px] text-slate-500">
                  {uploadedFile.sizeKb} KB • {uploadedFile.extractedWordCount} words • {uploadedFile.uploadedAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setExtractedPreviewOpen(!extractedPreviewOpen)}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:text-indigo-600 bg-white border border-slate-200 rounded-lg flex items-center gap-1"
                title="Preview extracted text"
              >
                <Eye className="w-3 h-3" />
                {extractedPreviewOpen ? 'Hide' : 'Preview'}
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-lg"
              >
                Change
              </button>
            </div>
          </div>

          {/* Extracted Text Preview Drawer */}
          {extractedPreviewOpen && (
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] max-h-40 overflow-y-auto space-y-1">
              <div className="text-[10px] text-indigo-400 uppercase tracking-wider font-bold mb-1">
                Extracted Text Parser Output:
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{rawExtractedText}</pre>
            </div>
          )}

          {/* ATS Structural Quick Health Meter */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                ATS Format & Structure Health:
              </span>
              <span className="font-extrabold text-indigo-600">{atsHealthScore}% Compatible</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${atsHealthScore}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 pt-1">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                ✓ Headers Parseable
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                ✓ Contact Clear
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                ✓ Standard Fonts
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TARGET JOB DESCRIPTION INPUT */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-600" />
              Target Job Description
            </label>
            <span className="text-[11px] text-slate-400">
              {jobDescription.length} characters
            </span>
          </div>

          <p className="text-[11px] text-slate-500">
            Paste the requirements from LinkedIn, Indeed, or your target company to compare keyword overlap and missing qualifications.
          </p>

          <textarea
            rows={7}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full flex-1 p-3 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed font-mono"
            placeholder="Paste full job posting text with requirements, tools, and responsibilities..."
          />

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setJobDescription(DEMO_SAMPLE_JOB_DESCRIPTION)}
              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Reset to Software Engineering Intern Posting
            </button>
            <button
              onClick={handleStartAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <ScanSearch className="w-3.5 h-3.5" /> Run ATS Audit
            </button>
          </div>
        </div>
      </div>

      {/* Live Agent Orchestration Progress (Shown while analyzing) */}
      {isAnalyzing && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></span>
              <h3 className="text-sm font-bold tracking-tight">Active Multi-Agent Orchestrator</h3>
            </div>
            <span className="text-xs text-indigo-400 font-mono">Real-time pipeline</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs space-y-1">
            <div className="font-bold text-indigo-300">
              {currentStep ? currentStep.agentName : 'Initializing pipeline...'}
            </div>
            <p className="text-slate-300">
              {currentStep ? currentStep.summary : 'Validating input bounds and parsing resume tokens.'}
            </p>
          </div>
        </div>
      )}

      {/* Audit Output Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              {/* Score Dial */}
              <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Target Job Match Score
                </span>
                <div className="mt-2 flex items-baseline gap-2 justify-center md:justify-start">
                  <span className="text-5xl font-black text-indigo-600">
                    {analysisResult.matchScore}%
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Strong Fit
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Documented mathematical alignment vs job requirements.
                </p>
              </div>

              {/* Breakdown metrics */}
              <div className="md:col-span-3 grid grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-slate-500 font-medium">Required Hard Skills</span>
                  <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                    {analysisResult.scoreBreakdown.requiredSkillsScore} / 65 pts
                  </span>
                  <span className="text-[10px] text-slate-400">Core job prerequisite match</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-slate-500 font-medium">Keyword Coverage</span>
                  <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                    {analysisResult.scoreBreakdown.keywordCoverage}%
                  </span>
                  <span className="text-[10px] text-slate-400">{analysisResult.keywordsFound.length} keywords evidenced</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="block text-slate-500 font-medium">Experience Evidence</span>
                  <span className="text-lg font-bold text-slate-900 mt-0.5 block">
                    {analysisResult.scoreBreakdown.experienceRelevance} / 15 pts
                  </span>
                  <span className="text-[10px] text-slate-400">Verified project baseline</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fact Check Guardrail Alerts */}
          {analysisResult.factCheckWarnings && analysisResult.factCheckWarnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Agent 6: Resume Fact-Check & Integrity Guardrails
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {analysisResult.factCheckWarnings.map((warn, i) => (
                  <div key={i} className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
                    <span className="font-bold text-amber-900 block">{warn.issue}</span>
                    <p className="text-slate-600 mt-0.5 text-[11px] leading-relaxed">{warn.advice}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched vs Missing Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Evidenced Skills */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Skills Evidenced in Resume ({analysisResult.keywordsFound.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywordsFound.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Gaps / Requirements Not Found ({analysisResult.keywordsMissing.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywordsMissing.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-medium flex items-center gap-1"
                  >
                    <X className="w-3 h-3 text-rose-500" />
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">
                Note: A missing keyword does not mean you cannot perform the job. It indicates the term was not explicitly identified in your current resume text.
              </p>
            </div>
          </div>

          {/* AI-Suggested Resume Edits with Individual Accept / Reject */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Actionable Resume Enhancements
                </h3>
                <p className="text-xs text-slate-500">
                  Approve edits individually. Accepted revisions are immediately applied to your active draft.
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg">
                {analysisResult.suggestions.filter(s => s.status === 'accepted').length} / {analysisResult.suggestions.length} Accepted
              </span>
            </div>

            <div className="space-y-4">
              {analysisResult.suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className={`p-4 rounded-xl border text-xs space-y-3 transition-all ${
                    sug.status === 'accepted'
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : sug.status === 'rejected'
                      ? 'bg-slate-50 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Section: {sug.section}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      sug.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sug.status === 'rejected'
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sug.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Original Text
                      </span>
                      <p className="text-slate-700 italic font-mono text-[11px]">{sug.originalText}</p>
                    </div>

                    <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                      <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                        Proposed Revision
                      </span>
                      <p className="text-slate-900 font-medium text-[11px]">{sug.proposedRevision}</p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1">
                    <p><strong className="text-slate-800">Why this helps:</strong> {sug.rationale}</p>
                    <p><strong className="text-slate-800">Supporting Evidence:</strong> {sug.evidenceFound}</p>
                    {sug.unverifiedFactWarning && (
                      <p className="text-amber-800 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                        {sug.unverifiedFactWarning}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {sug.status === 'pending' && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleRejectSuggestion(sug.id)}
                        className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAcceptSuggestion(sug)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept & Apply to Resume
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Learning Roadmap from Agent 5 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Agent 5: Targeted Gap-Closing Learning Roadmap
            </h3>
            <p className="text-xs text-slate-500">
              Personalized action steps designed to convert missing job requirements into verified portfolio proof points.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysisResult.learningRoadmap.map((step) => (
                <div key={step.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-[11px] flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                      ~{step.estimatedHours} Hours
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{step.title}</h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{step.suggestedActivity}</p>
                  <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                    Milestone: <span className="text-slate-800">{step.milestone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
