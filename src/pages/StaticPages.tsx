import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Coffee,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  ChevronDown,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Briefcase
} from 'lucide-react';

/* ----------------- HOW IT WORKS PAGE ----------------- */
export const HowItWorksPage: React.FC = () => {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'student' | 'educator'>('student');

  return (
    <div id="how-it-works-page-root" className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
            The Direct-to-Educator Model
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            How Pirate Chai Works
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Eliminating predatory tuition coaching middlemen. Direct connections, transparent rates, and real academic growth.
          </p>

          {/* Toggle Tab */}
          <div className="inline-flex bg-slate-100 p-1 rounded-lg mt-6 border border-slate-200/80">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              For Students & Parents
            </button>
            <button
              onClick={() => setActiveTab('educator')}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeTab === 'educator'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              For Educators & Mentors
            </button>
          </div>
        </div>

        {activeTab === 'student' ? (
          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Search & Discover Verified Educators',
                desc: 'Browse mentors by subject (Physics, Math, Biology, English, IELTS), academic level (SSC, HSC, Admission), pricing, and real student reviews. Filter by availability this week.'
              },
              {
                step: '02',
                title: 'Review Authentic Portfolios & Schedules',
                desc: 'Inspect degrees, BUET/DU/Medical credentials, classroom notes, whiteboard derivations, and transparent hourly rates. No hidden brokerage fees.'
              },
              {
                step: '03',
                title: 'Book 1-on-1 Sessions or Join Batches',
                desc: 'Reserve a tailored 1-on-1 topic consultation or enroll in structured, comprehensive cohorts with set schedules, homework sets, and mock assessments.'
              },
              {
                step: '04',
                title: 'Learn in the Built-in Video Classroom',
                desc: 'Join high-definition interactive live classes with low-latency audio, video, collaborative whiteboards, and real-time doubt clearing.'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start gap-6 shadow-xs"
              >
                <span className="text-2xl font-bold text-indigo-600 font-mono">{item.step}</span>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button
                onClick={() => navigate('/mentors')}
                className="py-2.5 px-6 rounded-md bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-700 transition shadow-xs cursor-pointer"
              >
                Find Your Mentor Today
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Build Your Verified Teaching Brand',
                desc: 'Create an educator profile highlighting your university degrees, board exam records, teaching experience, and philosophy. Get verified by our academic team.'
              },
              {
                step: '02',
                title: 'Set Your Own Rates & Teaching Formats',
                desc: 'You maintain 100% control over your calendar. Choose 1-on-1 personalized mentoring, launch group masterclasses, or do both at fees you determine.'
              },
              {
                step: '03',
                title: 'Direct Student Relationships',
                desc: 'Review incoming session requests, chat directly with students, understand their syllabus needs, and confirm bookings with zero commission leakage.'
              },
              {
                step: '04',
                title: 'Reliable Mobile Payouts',
                desc: 'Track monthly revenue, manage upcoming cohorts, and withdraw funds seamlessly to bKash, Nagad, or direct bank transfer.'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start gap-6 shadow-xs"
              >
                <span className="text-2xl font-bold text-slate-900 font-mono">{item.step}</span>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button
                onClick={() => navigate('/signup')}
                className="py-2.5 px-6 rounded-md bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 transition shadow-xs cursor-pointer"
              >
                Become an Educator on Pirate Chai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ----------------- ABOUT US PAGE ----------------- */
export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div id="about-page-root" className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
            Our Mission & Story
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Reinventing Private Learning in Bangladesh
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Connecting ambitious learners directly with skilled, empathetic educators without predatory brokerage syndicates.
          </p>
        </div>

        {/* Why Pirate Chai */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Why "Pirate Chai"?</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            In Bangladeshi academic culture, the sweetest breakthroughs don't happen in crowded, impersonal coaching centers. They happen over a warm cup of <strong className="text-slate-900">chai (tea)</strong> at a local tea stall or a quiet study table, where a dedicated mentor sits down with you, sketches equations on a napkin, and patiently explains why a concept works until your eyes light up.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            The <strong className="text-indigo-600">"Pirate"</strong> ethos represents educational rebellion. For decades, commercial tuition middlemen and coaching conglomerates have taken 50%+ cuts from passionate teachers while locking parents into rigid, unverified arrangements. Pirate Chai liberates educators to teach on their own terms and empowers students with transparent, verified choice.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <ShieldCheck className="w-7 h-7 text-emerald-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">Verified Credentials</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every educator's academic background, BUET/DU degrees, and teaching records are rigorously verified.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <Award className="w-7 h-7 text-indigo-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">Direct Independence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Educators define their fees, create custom cohorts, and keep the fruits of their hard work.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <BookOpen className="w-7 h-7 text-blue-600 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">Concept-First Learning</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Move beyond rote memorization to foundational analytical mastery that excels on board and admission exams.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-8 sm:p-10 text-white text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Ready to experience Pirate Chai?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Join thousands of students and top educators shaping the future of decentralized education.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/mentors')}
              className="py-2.5 px-5 rounded-md bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition cursor-pointer shadow-xs"
            >
              Explore Mentors
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="py-2.5 px-5 rounded-md bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 transition cursor-pointer border border-slate-700"
            >
              Teach on Pirate Chai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------- FAQ PAGE ----------------- */
export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Pirate Chai verify educators?',
      a: 'Our verification team manually reviews university graduation certificates, student IDs (such as BUET, Medical College, or University of Dhaka), academic transcripts, and past student references before awarding the Verified Educator badge.'
    },
    {
      q: 'How do 1-on-1 tutoring sessions work?',
      a: 'You can choose any available mentor, browse their hourly rate and weekly schedule, and click "Book a Session". After submitting your preferred slot and topic questions, the educator confirms the booking. You meet directly inside our built-in video classroom with interactive whiteboards.'
    },
    {
      q: 'What are batch classes?',
      a: 'Batch classes are multi-week group masterclasses (usually 8 to 20 sessions) focusing on a complete syllabus, such as HSC Physics Mechanics, Medical Biology Intensive, or IELTS Academic Writing. They include live lectures, downloadable problem sets, and weekly doubt-solving.'
    },
    {
      q: 'How are payments handled?',
      a: 'Payments are handled seamlessly through bKash, Nagad, or credit/debit card. For 1-on-1 sessions, no upfront payment is charged until the session is confirmed. We also feature a student satisfaction guarantee for your peace of mind.'
    },
    {
      q: 'Can educators teach both 1-on-1 and batch classes?',
      a: 'Yes! Educators have complete freedom to offer 1-on-1 personalized private tutoring, launch structured cohorts, or offer both formats concurrently.'
    },
    {
      q: 'Can I reschedule or cancel a session?',
      a: 'Yes, students and educators can reschedule any upcoming session up to 6 hours before start time through their respective dashboards without penalty.'
    }
  ];

  return (
    <div id="faq-page-root" className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
            Got Questions?
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-500">
            Everything you need to know about learning and teaching on Pirate Chai.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
                    openIndex === idx ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
