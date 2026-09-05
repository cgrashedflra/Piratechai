import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Coffee, GraduationCap, Briefcase, Lock, Mail, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, navigate } = useApp();
  const [role, setRole] = useState<'student' | 'educator'>('student');
  const [email, setEmail] = useState('nafisa.ahmed@example.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleChange = (newRole: 'student' | 'educator') => {
    setRole(newRole);
    if (newRole === 'student') {
      setEmail('nafisa.ahmed@example.com');
    } else {
      setEmail('ahsan.rahman@piratechai.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
  };

  return (
    <div id="login-page-root" className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
        <div className="text-center">
          <div
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 cursor-pointer mb-3"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Coffee className="w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Pirate<span className="text-indigo-600">Chai</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your student or teaching dashboard
          </p>
        </div>

        {/* Role Toggle */}
        <div className="bg-slate-100 p-1 rounded-lg flex border border-slate-200/80">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'student'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student Login
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('educator')}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              role === 'educator'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Educator Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                id="login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <span className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <input
                id="login-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            className="w-full py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Log In as {role === 'educator' ? 'Educator' : 'Student'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Login Shortcuts */}
        <div className="pt-3 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-2">
            Instant Demo Logins (1-Tap)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => login('student')}
              className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-left text-xs transition cursor-pointer"
            >
              <span className="font-semibold text-slate-900 block">Nafisa Ahmed</span>
              <span className="text-[10px] text-slate-500">Student Profile</span>
            </button>
            <button
              onClick={() => login('educator')}
              className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-left text-xs transition cursor-pointer"
            >
              <span className="font-semibold text-slate-900 block">Ahsan Rahman</span>
              <span className="text-[10px] text-slate-500">Educator Profile</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 pt-1">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
