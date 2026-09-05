import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { RatingStars } from '../components/RatingStars';
import { BookingModal } from '../components/BookingModal';
import { ClassCard } from '../components/ClassCard';
import {
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Users,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Heart
} from 'lucide-react';

interface MentorProfilePageProps {
  educatorId: string;
}

export const MentorProfilePage: React.FC<MentorProfilePageProps> = ({ educatorId }) => {
  const { educators, classes, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'about' | 'classes' | 'experience' | 'portfolio' | 'reviews'>('about');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const educator = useMemo(() => {
    return educators.find((e) => e.id === educatorId);
  }, [educators, educatorId]);

  const educatorClasses = useMemo(() => {
    return classes.filter((c) => c.educatorId === educatorId);
  }, [classes, educatorId]);

  if (!educator) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1.5">Educator Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm mb-5">
          The educator profile you are looking for does not exist or may have been updated.
        </p>
        <button
          onClick={() => navigate('/mentors')}
          className="py-2 px-4 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
        >
          Back to Find Mentors
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div id="mentor-profile-root" className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => navigate('/')} className="hover:text-slate-900 cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={() => navigate('/mentors')} className="hover:text-slate-900 cursor-pointer">
              Find Mentors
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-900 truncate">{educator.name}</span>
          </nav>

          <button
            onClick={handleShare}
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
          </button>
        </div>

        {/* 24. TOP HERO SECTION */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={educator.avatar}
                alt={educator.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border border-slate-200 shadow-xs"
              />
              {educator.availableThisWeek && (
                <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white border border-white shadow-xs">
                  Available
                </div>
              )}
            </div>

            {/* Profile Header Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {educator.name}
                </h1>
                {educator.verified && <VerifiedBadge size="md" />}
              </div>

              <p className="text-xs sm:text-sm font-normal text-slate-600 mb-3">{educator.professionalName}</p>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-3">
                <RatingStars rating={educator.rating} reviewCount={educator.reviewCount} size="sm" />
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {educator.experience} years teaching experience
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {educator.location}
                </span>
              </div>

              {/* Qualifications */}
              <div className="space-y-1 mb-4">
                {educator.qualifications.map((qual, idx) => (
                  <p key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{qual}</span>
                  </p>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  id="profile-primary-book-btn"
                  onClick={() => setIsBookingOpen(true)}
                  className="py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Book a Session (From ৳{educator.priceMin})
                </button>

                {educatorClasses.length > 0 && (
                  <button
                    onClick={() => setActiveTab('classes')}
                    className="py-2 px-4 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition cursor-pointer"
                  >
                    View Batch Classes ({educatorClasses.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'about', label: 'About & Philosophy' },
            { id: 'classes', label: `Batch Classes (${educatorClasses.length})` },
            { id: 'experience', label: 'Experience & Credentials' },
            { id: 'portfolio', label: 'Teaching Materials & Gallery' },
            { id: 'reviews', label: `Student Reviews (${educator.reviews.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Two-Column Body: Active Tab Content + Booking Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            {/* TAB 1: ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Biography */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 mb-2.5">About {educator.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {educator.bio}
                  </p>
                </div>

                {/* Teaching Philosophy & Who I Teach */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                    <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-600" />
                      Teaching Philosophy
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {educator.teachingPhilosophy ||
                        'Concept-first foundations before memorizing formulas. We explore problem spaces visually before diving into mathematical derivations.'}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                    <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      Who I Teach
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {educator.whoITeach ||
                        'HSC candidates, engineering & university admission aspirants, and ambitious students looking to achieve top grades.'}
                    </p>
                  </div>
                </div>

                {/* 25. SUBJECTS SECTION */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Subjects & Topics Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {educator.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 26. TEACHING SERVICES CARDS */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Available Learning Formats</h3>

                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">1-on-1 Personalized Tutoring</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Focused session tailored specifically to your syllabus questions, chapter doubts, or test prep.
                      </p>
                      <span className="text-xs font-semibold text-emerald-700 block mt-1">
                        From ৳{educator.priceMin}/session · Live in video classroom
                      </span>
                    </div>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="py-1.5 px-3.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition cursor-pointer flex-shrink-0 shadow-xs"
                    >
                      Book 1-on-1 Slot
                    </button>
                  </div>

                  {educatorClasses.length > 0 && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">Structured Batch Classes</h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Weekly scheduled interactive masterclasses with full topic syllabus, homework problem sets, and mocks.
                        </p>
                        <span className="text-xs font-semibold text-indigo-600 block mt-1">
                          {educatorClasses.length} active batch available for enrollment
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('classes')}
                        className="py-1.5 px-3.5 rounded-md border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer flex-shrink-0"
                      >
                        View Batches
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: BATCH CLASSES */}
            {activeTab === 'classes' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-base font-bold text-slate-900">
                  Active Batch Classes with {educator.name}
                </h3>
                {educatorClasses.length === 0 ? (
                  <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-xs">
                    <p className="text-xs text-slate-500">
                      No active batch classes open at this moment. You can still book 1-on-1 personalized sessions!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {educatorClasses.map((cls) => (
                      <ClassCard key={cls.id} classItem={cls} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: EXPERIENCE TIMELINE & QUALIFICATIONS */}
            {activeTab === 'experience' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    Teaching Experience Timeline ({educator.experience} Years)
                  </h3>

                  <div className="space-y-5 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {educator.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white shadow-xs" />
                        <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block">
                          {item.period}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{item.role}</h4>
                        <p className="text-xs text-slate-500 font-normal">{item.institution}</p>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                    Academic Credentials & Degrees
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {educator.qualifications.map((q, i) => (
                      <li key={i} className="flex items-center gap-2 p-2 rounded-md bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium text-slate-800">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 4: 27. PORTFOLIO / TEACHING MATERIAL */}
            {activeTab === 'portfolio' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Teaching Material & Classroom Visuals</h3>
                  <p className="text-xs text-slate-500">
                    A look into lecture notes, whiteboard derivations, and interactive learning setups.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {educator.portfolio.map((img, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden border border-slate-200 aspect-16/10 group bg-slate-100">
                      <img
                        src={img}
                        alt={`Teaching environment ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: 28. REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Student Feedback & Reviews</h3>
                    <p className="text-xs text-slate-500">
                      Genuine ratings from students who completed tutoring sessions or batches.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-slate-900">{educator.rating}</span>
                    <span className="text-[11px] text-slate-400 block">out of 5.0</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {educator.reviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">{rev.studentName}</span>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                      <RatingStars rating={rev.rating} size="sm" showCount={false} />
                      {rev.subject && (
                        <span className="inline-block text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-1.5 py-0.5 rounded">
                          {rev.subject}
                        </span>
                      )}
                      <p className="text-xs text-slate-600 leading-relaxed italic">
                        "{rev.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 29. AVAILABILITY & QUICK BOOKING SIDEBAR */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            {/* Quick Booking Action Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Tutoring Rate</span>
                  <span className="text-xl font-bold text-slate-900">
                    ৳{educator.priceMin}–৳{educator.priceMax}
                  </span>
                  <span className="text-xs text-slate-500"> / session</span>
                </div>
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Instant Request
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Connect directly for focused 1-on-1 learning. Sessions are conducted via the built-in video classroom.
              </p>

              <button
                id="sidebar-book-session-btn"
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Book a Session Now
              </button>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero upfront fee · Pay after confirmation</span>
              </div>
            </div>

            {/* 29. WEEKLY SCHEDULE TABLE */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Weekly Availability Schedule
              </h4>

              <div className="space-y-2 text-xs">
                {educator.schedule.map((slot) => (
                  <div
                    key={slot.day}
                    className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0"
                  >
                    <span className="font-medium text-slate-700">{slot.day}</span>
                    <div className="text-right">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          slot.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700'
                            : slot.status === 'Limited'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {slot.status}
                      </span>
                      {slot.timeSlots.length > 0 && (
                        <span className="block text-[10px] text-slate-400 mt-0.5">
                          {slot.timeSlots.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 30. BOOK SESSION MODAL */}
      <BookingModal
        educator={educator}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};
