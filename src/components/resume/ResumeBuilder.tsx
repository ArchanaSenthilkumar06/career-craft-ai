import React, { useState } from 'react';
import { ResumeData, UserProfile } from '../../types';
import {
  FileText,
  Printer,
  Download,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Layers,
  LayoutTemplate
} from 'lucide-react';

interface ResumeBuilderProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  user: UserProfile;
  onNavigateToStudio: () => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  resume,
  onUpdateResume,
  user,
  onNavigateToStudio
}) => {
  const [activeEditorTab, setActiveEditorTab] = useState<'contact' | 'summary' | 'education' | 'experience' | 'projects' | 'skills' | 'certifications'>('contact');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'executive' | 'minimal' | 'academic'>(resume.template || 'modern');

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.contact.fullName.replace(/\s+/g, '_')}_Resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Mutators
  const updateContact = (field: keyof ResumeData['contact'], val: string) => {
    onUpdateResume({
      ...resume,
      contact: { ...resume.contact, [field]: val }
    });
  };

  const updateSummary = (summary: string) => {
    onUpdateResume({ ...resume, summary });
  };

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: 'New Project Title',
      description: 'Describe the problem solved and technical architecture.',
      technologies: ['TypeScript', 'React'],
      bullets: ['Implemented core functionality with high test coverage.']
    };
    onUpdateResume({
      ...resume,
      projects: [...resume.projects, newProj]
    });
  };

  const handleRemoveProject = (id: string) => {
    onUpdateResume({
      ...resume,
      projects: resume.projects.filter(p => p.id !== id)
    });
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: 'Company Name',
      role: 'Software Engineer',
      location: 'Remote / City',
      startDate: '2026-01',
      endDate: 'Present',
      current: true,
      bullets: ['Contributed to key initiatives delivering measurable improvements.']
    };
    onUpdateResume({
      ...resume,
      experience: [...resume.experience, newExp]
    });
  };

  const handleRemoveExperience = (id: string) => {
    onUpdateResume({
      ...resume,
      experience: resume.experience.filter(e => e.id !== id)
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Resume Builder & Preview Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Build clean, ATS-compliant resumes grounded strictly in verified coursework, projects, and employment history.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Template Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <LayoutTemplate className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
            <select
              aria-label="Resume Template"
              value={selectedTemplate}
              onChange={(e) => {
                const t = e.target.value as any;
                setSelectedTemplate(t);
                onUpdateResume({ ...resume, template: t });
              }}
              className="bg-transparent font-semibold text-slate-700 py-1 px-2 focus:outline-none cursor-pointer"
            >
              <option value="modern">Modern Tech</option>
              <option value="executive">Executive Classic</option>
              <option value="minimal">Minimal ATS</option>
              <option value="academic">Academic & Honors</option>
            </select>
          </div>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            JSON
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-xs font-semibold text-white shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / PDF
          </button>

          <button
            onClick={onNavigateToStudio}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Audit in AI Studio
          </button>
        </div>
      </div>

      {/* Main 2-Column: Left Editor, Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Structured Form Editor (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              Section Editor
            </h3>
            <span className="text-[11px] text-slate-400">Live preview updates instantly</span>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl">
            {(['contact', 'summary', 'education', 'experience', 'projects', 'skills'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveEditorTab(tab)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-colors ${
                  activeEditorTab === tab
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab 1: Contact Details */}
          {activeEditorTab === 'contact' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.contact.fullName}
                  onChange={(e) => updateContact('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={resume.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={resume.contact.phone}
                    onChange={(e) => updateContact('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Location (City, State/Country)</label>
                <input
                  type="text"
                  value={resume.contact.location}
                  onChange={(e) => updateContact('location', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={resume.contact.linkedinUrl || ''}
                    onChange={(e) => updateContact('linkedinUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={resume.contact.githubUrl || ''}
                    onChange={(e) => updateContact('githubUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Summary */}
          {activeEditorTab === 'summary' && (
            <div className="space-y-3 text-xs">
              <label className="block font-semibold text-slate-700">
                Professional / Candidate Summary
              </label>
              <textarea
                rows={7}
                value={resume.summary}
                onChange={(e) => updateSummary(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed text-xs"
                placeholder="Highlight your verifiable background, core specialties, and career objectives without embellishment..."
              />
              <p className="text-[11px] text-slate-400">
                Tip: Keep summary under 4-5 sentences emphasizing proven technical fundamentals.
              </p>
            </div>
          )}

          {/* Tab 3: Projects */}
          {activeEditorTab === 'projects' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Verified Projects ({resume.projects.length})</span>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1 text-xs text-indigo-600 font-bold hover:text-indigo-800"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              {resume.projects.map((proj, pIdx) => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[pIdx].name = e.target.value;
                        onUpdateResume({ ...resume, projects: updated });
                      }}
                      className="font-bold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-indigo-500 w-3/4"
                    />
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Description</label>
                    <input
                      type="text"
                      value={proj.description}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[pIdx].description = e.target.value;
                        onUpdateResume({ ...resume, projects: updated });
                      }}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={proj.technologies.join(', ')}
                      onChange={(e) => {
                        const updated = [...resume.projects];
                        updated[pIdx].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        onUpdateResume({ ...resume, projects: updated });
                      }}
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Experience */}
          {activeEditorTab === 'experience' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Work & Internships ({resume.experience.length})</span>
                <button
                  onClick={handleAddExperience}
                  className="flex items-center gap-1 text-xs text-indigo-600 font-bold hover:text-indigo-800"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Role
                </button>
              </div>

              {resume.experience.map((exp, eIdx) => (
                <div key={exp.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...resume.experience];
                        updated[eIdx].role = e.target.value;
                        onUpdateResume({ ...resume, experience: updated });
                      }}
                      className="font-bold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-indigo-500 w-1/2"
                      placeholder="Role title"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...resume.experience];
                        updated[eIdx].company = e.target.value;
                        onUpdateResume({ ...resume, experience: updated });
                      }}
                      className="text-slate-600 bg-transparent border-b border-slate-300 focus:outline-none focus:border-indigo-500 w-1/3"
                      placeholder="Company"
                    />
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 5: Skills */}
          {activeEditorTab === 'skills' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Technical Skills (comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={resume.skills.technical.join(', ')}
                  onChange={(e) => {
                    const skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    onUpdateResume({
                      ...resume,
                      skills: { ...resume.skills, technical: skills }
                    });
                  }}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tools & Platforms (comma-separated)
                </label>
                <textarea
                  rows={2}
                  value={resume.skills.tools.join(', ')}
                  onChange={(e) => {
                    const tools = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    onUpdateResume({
                      ...resume,
                      skills: { ...resume.skills, tools }
                    });
                  }}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Live Resume Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div
            id="printable-resume"
            className={`bg-white rounded-2xl border border-slate-300 p-8 shadow-md min-h-[750px] text-slate-800 ${
              selectedTemplate === 'executive'
                ? 'font-serif text-[13px]'
                : selectedTemplate === 'minimal'
                ? 'font-mono text-xs'
                : 'font-sans text-xs'
            }`}
          >
            {/* Header / Contact Section */}
            <div className="border-b-2 border-slate-800 pb-4 mb-4 text-center sm:text-left">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                {resume.contact.fullName || 'Candidate Name'}
              </h1>
              <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                {resume.targetRole}
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 justify-center sm:justify-start">
                {resume.contact.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {resume.contact.email}
                  </span>
                )}
                {resume.contact.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {resume.contact.phone}
                  </span>
                )}
                {resume.contact.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {resume.contact.location}
                  </span>
                )}
                {resume.contact.githubUrl && (
                  <span className="flex items-center gap-1 text-indigo-600">
                    <Github className="w-3 h-3" />
                    {resume.contact.githubUrl.replace(/^https?:\/\//, '')}
                  </span>
                )}
              </div>
            </div>

            {/* Summary Section */}
            {resume.summary && (
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                  Professional Summary
                </h3>
                <p className="text-[11px] leading-relaxed text-slate-700">
                  {resume.summary}
                </p>
              </div>
            )}

            {/* Education Section */}
            {resume.education && resume.education.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Education
                </h3>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{edu.institution}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <div className="text-[11px] text-slate-700">
                      {edu.degree} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                    </div>
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="list-disc pl-4 text-[10px] text-slate-600 mt-1 space-y-0.5">
                        {edu.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Experience / Internships */}
            {resume.experience && resume.experience.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Experience & Internships
                </h3>
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{exp.role} <span className="font-normal text-slate-600">at {exp.company}</span></span>
                      <span className="text-[10px] text-slate-500 font-normal">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="list-disc pl-4 text-[11px] text-slate-700 mt-1 space-y-1">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Verified Technical Projects
                </h3>
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="mb-3">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <span>{proj.name}</span>
                      <span className="text-[10px] text-indigo-700 font-mono">
                        {proj.technologies.join(' • ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{proj.description}</p>
                    <ul className="list-disc pl-4 text-[11px] text-slate-700 mt-1 space-y-0.5">
                      {proj.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resume.skills && (
              <div className="mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1.5">
                  Core Competencies & Skills
                </h3>
                <div className="text-[11px] space-y-1 text-slate-700">
                  <p><strong className="text-slate-900">Technical Languages & DB:</strong> {resume.skills.technical.join(', ')}</p>
                  {resume.skills.tools && resume.skills.tools.length > 0 && (
                    <p><strong className="text-slate-900">Tools & Infrastructure:</strong> {resume.skills.tools.join(', ')}</p>
                  )}
                  {resume.skills.soft && resume.skills.soft.length > 0 && (
                    <p><strong className="text-slate-900">Professional Collaboration:</strong> {resume.skills.soft.join(', ')}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
