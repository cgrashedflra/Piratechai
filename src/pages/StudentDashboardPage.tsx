import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Video,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
  Compass,
  FileText
} from 'lucide-react';

export const StudentDashboardPage: React.FC = () => {
  const { user, enrollments, bookings, educators, classes, navigate } = useApp();

  const studentName = user.name || 'Nafisa Ahmed';

  // Get mentors student has booked or enrolled with
  const bookedEducatorIds = Array.from(new Set(bookings.map((b) => b.educatorId)));
  const myMentors = educators.filter((e) => bookedEducatorIds.includes(e.id));

  // Recommended mentors (different from booked)
  const recommendedMentors = educators
    .filter((e) => !bookedEducatorIds.includes(e.id))
    .slice(0, 3);

  return (
    <div id="student-dashboard-root" className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Student Portal
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Good morning, {studentName.split(' ')[0]}.
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              What are you learning today? You have 1 live session scheduled this evening.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => navigate('/mentors')}
              className="py-2 px-3.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer"
            >
              Find More Mentors
            </button>
            <button
              onClick={() => navigate('/classes')}
              className="py-2 px-3.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
            >
              Explore Batches
            </button>
          </div>
        </div>

        {/* 40. UPCOMING SESSIONS HIGHLIGHT */}
        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xs border border-slate-800 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider border border-indigo-400/30">
                <Video className="w-3.5 h-3.5 text-indigo-400" />
                <span>Upcoming Live Session</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Physics with Ahsan Rahman
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Rotational Dynamics & Moment of Inertia — 1-on-1 personalized problem clinic and derivations.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  Today · 8:00 PM (GMT+6)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  60 minutes duration
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Session Confirmed</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="join-video-classroom-btn"
                onClick={() => navigate('/classroom/session-live-hsc-physics')}
                className="py-2.5 px-5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Join Video Classroom</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left: Classes & Mentors */}
          <div className="lg:col-span-8 space-y-6">
            {/* My Classes */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  My Enrolled Classes ({enrollments.length})
                </h3>
                <button
                  onClick={() => navigate('/classes')}
                  className="text-xs text-indigo-600 hover:underline font-semibold"
                >
                  Browse all classes
                </button>
              </div>

              {enrollments.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-100">
                  You have not enrolled in any batch classes yet.{' '}
                  <button onClick={() => navigate('/classes')} className="text-indigo-600 underline font-semibold">
                    Explore active batches
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrollments.map((enr) => (
                    <div
                      key={enr.id}
                      className="p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
                          Active Batch
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{enr.classTitle}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>with {enr.educatorName}</span>
                          <span>•</span>
                          <span>{enr.schedule}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/classes/${enr.classId}`)}
                          className="py-1.5 px-3 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Syllabus
                        </button>
                        <button
                          onClick={() => navigate('/classroom/session-batch-hsc')}
                          className="py-1.5 px-3 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5 text-indigo-400" />
                          Enter Room
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Mentors */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  My Mentors ({myMentors.length})
                </h3>
                <button
                  onClick={() => navigate('/mentors')}
                  className="text-xs text-indigo-600 hover:underline font-semibold"
                >
                  Find new mentor
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {myMentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-11 h-11 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{mentor.name}</h4>
                        <p className="text-[11px] text-slate-500">{mentor.subjects.slice(0, 2).join(' · ')}</p>
                        <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
                          ★ {mentor.rating} ({mentor.reviewCount})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/mentors/${mentor.id}`)}
                      className="py-1 px-2.5 rounded-md bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex-shrink-0"
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3 text-xs">
                {[
                  { title: 'Enrolled in HSC Physics — Mechanics Intensive', date: '3 days ago', type: 'class' },
                  { title: 'Session confirmed with Ahsan Rahman for Today 8:00 PM', date: 'Yesterday', type: 'booking' },
                  { title: 'Completed session: Human Physiology with Dr. Nafisa Kamal', date: '1 week ago', type: 'session' },
                  { title: 'Reviewed Ahsan Rahman: "5.0 ★ Ahsan bhai explains difficult concepts..."', date: '2 weeks ago', type: 'review' }
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-700 font-medium">{act.title}</span>
                    </div>
                    <span className="text-slate-400 text-[11px] flex-shrink-0">{act.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Progress & Recommendations */}
          <div className="lg:col-span-4 space-y-6">
            {/* Learning Progress Widget */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Learning Progress
              </h3>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-xl font-bold text-slate-900">14</span>
                  <span className="text-[11px] text-slate-500 block">Sessions Done</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-xl font-bold text-emerald-600">95%</span>
                  <span className="text-[11px] text-slate-500 block">Attendance Rate</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">HSC Syllabus Milestone</span>
                  <span className="font-bold text-indigo-600">68%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </div>

            {/* Recommended Mentors */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recommended For You
              </h3>

              <div className="space-y-2.5">
                {recommendedMentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    onClick={() => navigate(`/mentors/${mentor.id}`)}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{mentor.name}</h4>
                        <p className="text-[10px] text-slate-500">{mentor.subjects[0]} · ৳{mentor.priceMin}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
