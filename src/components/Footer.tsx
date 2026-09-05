import React from 'react';
import { useApp } from '../context/AppContext';
import { Coffee, Heart, Shield, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, login } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-0 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer select-none group inline-flex"
            >
              <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center">
                <Coffee className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Pirate<span className="text-indigo-400">Chai</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Connect with qualified educators and academic mentors for personalized 1-on-1 tutoring,
              focused syllabus guidance, and structured cohort classes.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700/60 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-medium">
                <Shield className="w-3 h-3" /> Verified Faculty
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-800 border border-slate-700/60 text-indigo-300 px-2 py-0.5 rounded text-[11px] font-medium">
                <Award className="w-3 h-3" /> Direct Booking
              </span>
            </div>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-3">
              For Students
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('/mentors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Find Mentors
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/classes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explore Classes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    login('student');
                    navigate('/dashboard/student');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/classroom/session-live-demo')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-1 text-indigo-300 font-medium"
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Live Classroom Demo
                </button>
              </li>
            </ul>
          </div>

          {/* For Educators */}
          <div>
            <h4 className="text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-3">
              For Educators
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('/signup')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Become an Educator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    login('educator');
                    navigate('/dashboard/educator/profile');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Create / Edit Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    login('educator');
                    navigate('/dashboard/educator/classes/new');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Publish a Class
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    login('educator');
                    navigate('/dashboard/educator');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Educator Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Trust */}
          <div>
            <h4 className="text-slate-300 text-[11px] font-bold uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Pirate Chai
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQ & Support
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <button
                  id="footer-admin-portal-link"
                  onClick={() => navigate('/admin')}
                  className="hover:text-indigo-400 text-indigo-300 font-medium transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <Shield className="w-3 h-3 text-indigo-400" />
                  Admin Console
                </button>
              </li>
              <li>
                <span className="text-slate-500">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Polish bottom bar with operational status */}
      <div className="bg-slate-950 border-t border-slate-800/80 py-2.5 px-4 sm:px-8 text-[11px] text-slate-400 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span>System Status: Operational</span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-500">Direct Educator Marketplace v2.4</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span onClick={() => navigate('/how-it-works')} className="hover:text-white cursor-pointer transition-colors">Protocol</span>
            <span onClick={() => navigate('/faq')} className="hover:text-white cursor-pointer transition-colors">Support</span>
            <span className="text-slate-500">© {new Date().getFullYear()} Pirate Chai Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
