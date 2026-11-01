import React, { useState } from 'react';
import { UserProfile, UserPathway } from '../../types';
import { DEMO_PROFILES } from '../../data/demoData';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Moon,
  Sun,
  Eye,
  EyeOff
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, isDarkMode, onToggleTheme }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('Archana');
  const [email, setEmail] = useState('itsachu06@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [pathway, setPathway] = useState<UserPathway>('student');
  const [targetRole, setTargetRole] = useState('Software Engineering Intern');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Build or clone profile
    const baseProfile = DEMO_PROFILES[pathway] || DEMO_PROFILES['student'];
    const loggedInUser: UserProfile = {
      ...baseProfile,
      name: name.trim() || 'Archana',
      email: email.trim(),
      pathway,
      targetRole: targetRole.trim() || baseProfile.targetRole,
      demoMode: email === 'itsachu06@gmail.com',
      theme: isDarkMode ? 'dark' : 'light'
    };

    onLogin(loggedInUser);
  };

  const handleQuickLoginAsArchana = () => {
    const archanaProfile = {
      ...DEMO_PROFILES['student'],
      name: 'Archana',
      email: 'itsachu06@gmail.com',
      theme: (isDarkMode ? 'dark' : 'light') as 'light' | 'dark'
    };
    onLogin(archanaProfile);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 py-8 transition-colors ${
      isDarkMode ? 'bg-[#0E1318] text-slate-100' : 'bg-[#F3F4F7] text-slate-900'
    }`}>
      {/* Top right Theme Toggle (Canva Dark vs Canva Light) */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          aria-label={isDarkMode ? 'Switch to Canva Light Theme' : 'Switch to Canva Dark Theme'}
          className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
            isDarkMode
              ? 'bg-[#181E27] border-[#2A3446] text-[#00C4CC] hover:bg-[#1E2633]'
              : 'bg-white border-[#E2E6EF] text-[#7D2AE8] hover:bg-[#FAF9FF]'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-[#00C4CC]" /> : <Moon className="w-4 h-4 text-[#7D2AE8]" />}
          <span className="hidden sm:inline">{isDarkMode ? 'Canva Light' : 'Canva Dark'}</span>
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Brand Logo & Title with Canva Gradient */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#00C4CC] via-[#5B33E8] to-[#7D2AE8] flex items-center justify-center text-white shadow-xl shadow-[#7D2AE8]/30 font-black text-2xl mb-3">
            C
          </div>
          <h1 className="text-2xl font-black tracking-tight flex items-center justify-center gap-1.5 text-slate-900 dark:text-white">
            Careercraft<span className="text-[#00C4CC]">AI</span>
          </h1>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Know your strengths. Grow your skills. Build your future.
          </p>
        </div>

        {/* 1-Click Quick Demo Sign-in for Archana */}
        <div className={`mb-6 p-4 rounded-2xl border transition-all ${
          isDarkMode
            ? 'bg-[#141A23] border-[#262E3D]'
            : 'bg-gradient-to-r from-[#00C4CC]/10 via-[#7D2AE8]/10 to-purple-50 border-[#00C4CC]/30'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                A
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">Quick Login: Archana</h3>
                <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  itsachu06@gmail.com • Student Scholar
                </p>
              </div>
            </div>
            <button
              onClick={handleQuickLoginAsArchana}
              className="px-4 py-1.5 bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1"
            >
              Enter <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Auth Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
          isDarkMode
            ? 'bg-[#181E27] border-[#262E3D] text-slate-100 shadow-[#0E1318]/50'
            : 'bg-white border-[#E2E6EF] text-slate-800 shadow-slate-200/50'
        }`}>
          {/* Sign In vs Register Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-[#13171F] rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                !isRegister
                  ? 'bg-white dark:bg-[#202735] text-[#7D2AE8] dark:text-[#00C4CC] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                isRegister
                  ? 'bg-white dark:bg-[#202735] text-[#7D2AE8] dark:text-[#00C4CC] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Name (for register or editing) */}
            {(isRegister || name !== 'Archana') && (
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#7D2AE8] text-xs ${
                      isDarkMode
                        ? 'bg-[#13171F] border-[#262E3D] text-white'
                        : 'bg-slate-50 border-[#E2E6EF] text-slate-900'
                    }`}
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#7D2AE8] text-xs ${
                    isDarkMode
                      ? 'bg-[#13171F] border-[#262E3D] text-white'
                      : 'bg-slate-50 border-[#E2E6EF] text-slate-900'
                  }`}
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-9 pr-10 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#7D2AE8] text-xs ${
                    isDarkMode
                      ? 'bg-[#13171F] border-[#262E3D] text-white'
                      : 'bg-slate-50 border-[#E2E6EF] text-slate-900'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Pathway Select (for registration) */}
            {isRegister && (
              <div>
                <label className="block font-semibold mb-1">Your Primary Pathway</label>
                <select
                  value={pathway}
                  onChange={(e) => setPathway(e.target.value as UserPathway)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#7D2AE8] text-xs font-semibold ${
                    isDarkMode
                      ? 'bg-[#13171F] border-[#262E3D] text-white'
                      : 'bg-slate-50 border-[#E2E6EF] text-slate-900'
                  }`}
                >
                  <option value="student">School or College Student</option>
                  <option value="graduate">Graduate / Internship Applicant</option>
                  <option value="professional">Experienced Professional</option>
                  <option value="career_changer">Career Changer / Returning</option>
                </select>
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between text-[11px] pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#7D2AE8] rounded"
                />
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Remember session</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password is set to password123 or use Quick Login.'); }} className="text-[#00C4CC] hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit button with Canva Gradient */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-[#00C4CC] to-[#7D2AE8] hover:opacity-95 text-white font-bold rounded-xl shadow-md shadow-[#7D2AE8]/30 transition-all flex items-center justify-center gap-2 text-xs mt-2"
            >
              <span>{isRegister ? 'Complete Registration' : 'Sign In to CareercraftAI'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Trust footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#262E3D] text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Factual verification • Zero hallucinated metrics • Full privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
