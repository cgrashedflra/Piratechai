import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { RatingStars } from '../components/RatingStars';
import { EnrollmentModal } from '../components/EnrollmentModal';
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Sparkles,
  ArrowLeft,
  Share2,
  ShieldCheck,
  Award
} from 'lucide-react';

interface ClassDetailPageProps {
  classId: string;
}

export const ClassDetailPage: React.FC<ClassDetailPageProps> = ({ classId }) => {
  const { classes, educators, navigate } = useApp();
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const classItem = useMemo(() => {
    return classes.find((c) => c.id === classId);
  }, [classes, classId]);

  const educator = useMemo(() => {
    if (!classItem) return null;
    return educators.find((e) => e.id === classItem.educatorId);
  }, [educators, classItem]);

  if (!classItem) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1.5">Class Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mb-5">
          The batch class you are looking for does not exist or may have been concluded.
        </p>
        <button
          onClick={() => navigate('/classes')}
          className="py-2 px-4 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
        >
          Explore All Classes
        </button>
      </div>
    );
  }

  const seatsRemaining = classItem.maxStudents - classItem.enrolledStudents;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div id="class-detail-root" className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('/')} className="hover:text-slate-900 cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => navigate('/classes')} className="hover:text-slate-900 cursor-pointer">
              Batch Classes
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-900 truncate">{classItem.title}</span>
          </nav>

          <button
            onClick={handleShare}
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Class'}</span>
          </button>
        </div>

        {/* 33. HERO SECTION */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded text-indigo-700 bg-indigo-50 border border-indigo-200/60">
                  {classItem.level} · {classItem.subject}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {classItem.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                {classItem.title}
              </h1>

              {/* Educator row */}
              <div
                onClick={() => navigate(`/mentors/${classItem.educatorId}`)}
                className="flex items-center gap-3 pt-1 cursor-pointer group inline-flex"
              >
                <img
                  src={classItem.educatorAvatar}
                  alt={classItem.educatorName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {classItem.educatorName}
                    </span>
                    {classItem.educatorVerified && <VerifiedBadge size="sm" />}
                  </div>
                  <p className="text-[11px] text-slate-500">Lead Course Instructor</p>
                </div>
              </div>

              {/* Quick Specs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Sessions</span>
                  <span className="font-semibold text-slate-900">{classItem.sessions} Live Sessions</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Duration</span>
                  <span className="font-semibold text-slate-900">{classItem.duration} min / session</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Enrolled</span>
                  <span className="font-semibold text-slate-900">{classItem.enrolledStudents}/{classItem.maxStudents} Students</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 block text-[11px]">Rating</span>
                  <span className="font-semibold text-amber-500 flex items-center gap-1">
                    ★ {classItem.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Booking Card */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5">
              <div>
                <span className="text-xs text-slate-400 block">Total Course Fee</span>
                <span className="text-2xl font-bold text-slate-900">
                  ৳{classItem.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">All {classItem.sessions} sessions included</span>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span className="font-medium">{classItem.schedule[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>Starts {classItem.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-medium">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>Only {seatsRemaining} seats left in this batch</span>
                </div>
              </div>

              <button
                id="enroll-now-main-btn"
                onClick={() => setIsEnrollOpen(true)}
                className="w-full py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Enroll Now · ৳{classItem.price.toLocaleString()}
              </button>

              <p className="text-[11px] text-slate-500 text-center">
                Instant confirmation for MVP · Live video room access included
              </p>
            </div>
          </div>
        </div>

        {/* 34. CLASS CONTENT SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            {/* About This Class */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2.5">About This Class</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {classItem.description}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3">What You'll Learn</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {classItem.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-relaxed font-medium">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Structure (Curriculum) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Course Structure & Syllabus</h3>
                  <p className="text-xs text-slate-500">
                    {classItem.sessions} comprehensive live interactive sessions with lecture notes and problem sheets.
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 rounded-md text-slate-700 border border-slate-200">
                  {classItem.sessions * classItem.duration} mins total
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                {classItem.curriculum.map((session) => (
                  <div
                    key={session.sessionNumber}
                    className="p-3.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      #{session.sessionNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{session.title}</h4>
                        <span className="text-[11px] text-slate-400 font-normal">
                          {session.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{session.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2">Live Batch Schedule</h3>
              <p className="text-xs text-slate-600 mb-4">
                Classes are conducted live online inside our integrated video classroom. Live recording links and concept slides are provided after every session.
              </p>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-600 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{classItem.schedule[0]}</h4>
                    <p className="text-xs text-slate-500">Batch kicks off on {classItem.startDate}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Active Batch
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Instructor Profile Card */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            {educator && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Meet Your Instructor
                </h4>

                <div className="flex items-center gap-3">
                  <img
                    src={educator.avatar}
                    alt={educator.name}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{educator.name}</h4>
                    <p className="text-xs text-slate-500">{educator.qualifications[0]}</p>
                    <div className="mt-1">
                      <RatingStars rating={educator.rating} reviewCount={educator.reviewCount} size="sm" />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {educator.bio}
                </p>

                <button
                  onClick={() => navigate(`/mentors/${educator.id}`)}
                  className="w-full py-2 px-3 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer text-center block"
                >
                  View Full Educator Profile
                </button>
              </div>
            )}

            {/* Support guarantee */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pirate Chai Learning Guarantee</span>
              </div>
              <p className="leading-relaxed text-slate-500 text-[11px]">
                If the first session does not meet your expectations, contact our student care team within 24 hours for a full batch transfer or resolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 35. ENROLLMENT MODAL */}
      <EnrollmentModal
        classItem={classItem}
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />
    </div>
  );
};
