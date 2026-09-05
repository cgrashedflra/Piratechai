import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Shield,
  Coffee,
  Sparkles,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  BookOpen
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { login, navigate } = useApp();
  const [selectedRole, setSelectedRole] = useState<'student' | 'educator' | null>(null);

  // Student Form State
  const [studentName, setStudentName] = useState('Nafisa Ahmed');
  const [studentEmail, setStudentEmail] = useState('nafisa.ahmed@example.com');
  const [studentPhone, setStudentPhone] = useState('+880 1712 345678');
  const [studentPassword, setStudentPassword] = useState('password123');
  const [studentLocation, setStudentLocation] = useState('Dhaka, Bangladesh');
  const [studentLevel, setStudentLevel] = useState('HSC 2nd Year (Science)');
  const [studentSubjects, setStudentSubjects] = useState('Physics, Mathematics, Biology');

  // Educator Form State
  const [eduName, setEduName] = useState('Ahsan Rahman');
  const [eduProfName, setEduProfName] = useState('Ahsan Rahman (Concept Physics)');
  const [eduEmail, setEduEmail] = useState('ahsan.rahman@piratechai.com');
  const [eduPhone, setEduPhone] = useState('+880 1819 876543');
  const [eduPassword, setEduPassword] = useState('password123');
  const [eduLocation, setEduLocation] = useState('Dhanmondi, Dhaka');
  const [eduExperience, setEduExperience] = useState('7');
  const [eduSubjects, setEduSubjects] = useState('Physics, Mathematics, Calculus');
  const [eduQualifications, setEduQualifications] = useState('BSc in EEE (BUET)');
  const [eduPrice, setEduPrice] = useState('600');
  const [eduBio, setEduBio] = useState('Specializes in concept-first learning for HSC Physics and engineering admission.');

  const [studentSuccess, setStudentSuccess] = useState(false);
  const [eduSuccess, setEduSuccess] = useState(false);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('student', studentName, studentEmail);
  };

  const handleEduSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('educator', eduName, eduEmail);
  };

  return (
    <div id="signup-page-root" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Brand header */}
        <div className="text-center mb-10">
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Join the Pirate Chai Community
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Direct-to-educator learning for high school and university scholars.
          </p>
        </div>

        {/* 36. ROLE SELECTOR */}
        {!selectedRole ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            <h2 className="text-center text-sm font-semibold text-slate-700">
              How do you want to use Pirate Chai?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Card */}
              <div
                id="role-select-student"
                onClick={() => setSelectedRole('student')}
                className="bg-white rounded-xl border border-slate-200 hover:border-indigo-500 p-8 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">I'm a Student</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Find mentors and classes that fit how I learn. Book 1-on-1 personalized sessions, join structured batches, and ace exams.
                  </p>
                </div>
                <button
                  type="button"
                  className="py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer w-full mt-4"
                >
                  <span>Continue as Student</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Educator Card */}
              <div
                id="role-select-educator"
                onClick={() => setSelectedRole('educator')}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-800 p-8 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">I'm an Educator</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Teach students, build your verified professional profile, launch structured batch classes, and grow your independent teaching practice.
                  </p>
                </div>
                <button
                  type="button"
                  className="py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer w-full mt-4"
                >
                  <span>Become an Educator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-center pt-4 text-xs text-slate-500">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-indigo-600 font-semibold hover:underline cursor-pointer"
              >
                Log In
              </button>
            </div>
          </div>
        ) : selectedRole === 'student' ? (
          /* 37. STUDENT SIGNUP FORM */
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Student Registration
                </span>
                <h2 className="text-xl font-bold text-slate-900">Create Student Account</h2>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Change Role
              </button>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={studentLocation}
                    onChange={(e) => setStudentLocation(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Education Level
                  </label>
                  <select
                    value={studentLevel}
                    onChange={(e) => setStudentLevel(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="HSC 1st Year (Science)">HSC 1st Year (Science)</option>
                    <option value="HSC 2nd Year (Science)">HSC 2nd Year (Science)</option>
                    <option value="HSC Commerce / Arts">HSC Commerce / Arts</option>
                    <option value="SSC Science / Commerce">SSC Science / Commerce</option>
                    <option value="University Admission Aspirant">University Admission Aspirant</option>
                    <option value="IELTS / Study Abroad Candidate">IELTS / Study Abroad Candidate</option>
                    <option value="University Undergraduate">University Undergraduate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Subjects you need guidance with
                </label>
                <input
                  type="text"
                  value={studentSubjects}
                  onChange={(e) => setStudentSubjects(e.target.value)}
                  placeholder="e.g. Physics, Higher Math, Biology"
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  id="create-student-account-btn"
                  className="w-full py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Create Student Account
                </button>
              </div>

              <div className="text-center pt-2 text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-indigo-600 font-semibold hover:underline cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* 38. EDUCATOR SIGNUP FORM */
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Educator Registration
                </span>
                <h2 className="text-xl font-bold text-slate-900">Create Professional Teaching Profile</h2>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Change Role
              </button>
            </div>

            <form onSubmit={handleEduSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eduName}
                    onChange={(e) => setEduName(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Professional / Display Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eduProfName}
                    onChange={(e) => setEduProfName(e.target.value)}
                    placeholder="e.g. Ahsan Rahman (Concept Physics)"
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={eduEmail}
                    onChange={(e) => setEduEmail(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={eduPhone}
                    onChange={(e) => setEduPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={eduExperience}
                    onChange={(e) => setEduExperience(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Starting Price (৳/session)
                  </label>
                  <input
                    type="number"
                    value={eduPrice}
                    onChange={(e) => setEduPrice(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location / Base
                  </label>
                  <input
                    type="text"
                    value={eduLocation}
                    onChange={(e) => setEduLocation(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subjects & Areas of Expertise
                </label>
                <input
                  type="text"
                  value={eduSubjects}
                  onChange={(e) => setEduSubjects(e.target.value)}
                  placeholder="e.g. Physics, Higher Math, Mechanics"
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Qualifications / Alma Mater
                </label>
                <input
                  type="text"
                  value={eduQualifications}
                  onChange={(e) => setEduQualifications(e.target.value)}
                  placeholder="e.g. BSc in EEE (BUET), MSc in Mathematics (DU)"
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Professional Biography
                </label>
                <textarea
                  rows={3}
                  value={eduBio}
                  onChange={(e) => setEduBio(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  id="create-educator-profile-btn"
                  className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  Create Educator Profile & Enter Dashboard
                </button>
              </div>

              <div className="text-center pt-2 text-xs text-slate-500">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-indigo-600 font-semibold hover:underline cursor-pointer"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
