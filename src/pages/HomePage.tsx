import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MentorCard } from '../components/MentorCard';
import { ClassCard } from '../components/ClassCard';
import {
  Search,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Users,
  Award,
  Video,
  CheckCircle2,
  BookOpen,
  Coffee,
  GraduationCap,
  Calendar,
  Star
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { educators, classes, navigate } = useApp();
  const [searchTopic, setSearchTopic] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTopic.trim()) {
      navigate('/mentors', { subject: searchTopic.trim() });
    } else {
      navigate('/mentors');
    }
  };

  const popularSubjects = [
    { name: 'Mathematics', count: '18 Mentors' },
    { name: 'Physics', count: '14 Mentors' },
    { name: 'Chemistry', count: '12 Mentors' },
    { name: 'Biology', count: '11 Mentors' },
    { name: 'English', count: '15 Mentors' },
    { name: 'IELTS', count: '9 Mentors' },
    { name: 'Programming', count: '8 Mentors' },
    { name: 'Economics', count: '7 Mentors' },
    { name: 'Accounting', count: '6 Mentors' },
    { name: 'SAT', count: '5 Mentors' },
    { name: 'University Admission', count: '16 Mentors' },
    { name: 'ICT', count: '8 Mentors' }
  ];

  return (
    <div id="homepage-root" className="min-h-screen">
      {/* 8. HERO SECTION */}
      <section className="relative pt-8 pb-14 md:pt-12 md:pb-20 overflow-hidden border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold tracking-wide">
                <Coffee className="w-3.5 h-3.5 fill-current" />
                <span>Verified Direct-to-Educator Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Find the Right Mentor.{' '}
                <span className="text-indigo-600">
                  Learn Your Way.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect directly with verified educators for personalized 1-on-1 tutoring, focused
                academic syllabus guidance, and structured cohort classes.
              </p>

              {/* 9. HERO SEARCH */}
              <div className="pt-2">
                <form
                  onSubmit={handleHeroSearch}
                  className="bg-white p-1.5 rounded-xl border border-slate-300 shadow-sm flex flex-col sm:flex-row gap-2 max-w-xl"
                >
                  <div className="flex-1 flex items-center gap-2.5 px-3 py-1.5">
                    <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <input
                      id="hero-search-input"
                      type="text"
                      value={searchTopic}
                      onChange={(e) => setSearchTopic(e.target.value)}
                      placeholder="What do you want to learn? (e.g. Physics, IELTS, Math)"
                      className="w-full text-xs sm:text-sm text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    id="hero-search-submit-btn"
                    className="py-2.5 px-5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Find a Mentor</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>

                {/* Quick Subject Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-400 text-xs">Popular:</span>
                  {['Mathematics', 'Physics', 'IELTS', 'Programming', 'Chemistry'].map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => navigate('/mentors', { subject: topic })}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-medium cursor-pointer"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  id="hero-primary-cta"
                  onClick={() => navigate('/mentors')}
                  className="py-2.5 px-5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-xs cursor-pointer flex items-center gap-2"
                >
                  Find a Mentor
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-secondary-cta"
                  onClick={() => navigate('/classes')}
                  className="py-2.5 px-5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition cursor-pointer"
                >
                  Explore Classes
                </button>
              </div>
            </div>

            {/* Right Side Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 aspect-4/5 sm:aspect-square lg:aspect-4/5">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                    alt="Students collaborating with mentor in live session"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                        Live 1-on-1 Tutoring & Batches
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-200">
                      Real educators. Direct interaction. Zero recorded filler.
                    </p>
                  </div>
                </div>

                {/* Floating Mentor Card badge */}
                <div className="absolute -top-3 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-slate-200 flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Ahsan Rahman"
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-900">Ahsan Rahman</p>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                        ✓ BUET
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">HSC Physics · 4.9 ★ (86)</p>
                  </div>
                </div>

                {/* Floating stats badge */}
                <div className="absolute -bottom-3 -right-3 sm:-right-5 bg-slate-900 text-white p-3 rounded-xl shadow-md border border-slate-800 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">In-App Classroom</p>
                    <p className="text-[11px] text-slate-400">Interactive video & notes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TRUST / VALUE FEATURES */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Learn From Experts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover educators with real subject expertise, verified credentials, and proven track
                records in board exams and university admissions.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Personalized Learning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get focused 1-on-1 guidance based on your individual learning pace, specific syllabus
                weaknesses, and personal academic goals.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Flexible Classes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose between flexible 1-on-1 personalized tutoring slots and structured batch
                courses with scheduled curriculum and peer discussions.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Learn With Confidence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare genuine ratings, years of teaching experience, transparent pricing, and
                verified student reviews before booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1.5">
              Protocol & Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Learning Works on Pirate Chai
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We cut through the noise so you can connect directly with the mentor best suited to help
              you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Step 01</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Explore</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tell us what you want to learn. Search by subject, topic, exam target, or educator
                name.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Step 02</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Compare</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse verified mentors, qualifications, subjects, student ratings, and transparent
                session rates.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Step 03</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Choose</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pick the educator or structured batch class that matches your schedule, budget, and
                academic ambition.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Step 04</div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Learn</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join your live class or start your personalized 1-on-1 tutoring session right inside
                our video classroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FEATURED MENTORS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Verified Faculty
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Educators
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Concept-first mentors with proven track records guiding high school and university
                students.
              </p>
            </div>
            <button
              onClick={() => navigate('/mentors')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View All 12+ Mentors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educators
              .filter((e) => e.verificationStatus !== 'suspended' && e.verificationStatus !== 'rejected')
              .slice(0, 6)
              .map((educator) => (
                <MentorCard key={educator.id} educator={educator} />
              ))}
          </div>
        </div>
      </section>

      {/* 13. POPULAR SUBJECTS */}
      <section className="py-14 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
              Curriculum Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Subjects
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Explore educators categorized by academic subject and target exam track.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularSubjects.map((sub) => (
              <button
                key={sub.name}
                onClick={() => navigate('/mentors', { subject: sub.name })}
                className="p-3.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs text-left transition group cursor-pointer"
              >
                <p className="font-semibold text-xs text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {sub.name}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">{sub.count}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FEATURED CLASSES */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                Structured Batch Classes
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Live Batches
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Join live group classes with scheduled curriculums, mock exams, and peer learning.
              </p>
            </div>
            <button
              onClick={() => navigate('/classes')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All Batches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes
              .filter((c) => !c.moderationStatus || c.moderationStatus === 'approved')
              .slice(0, 3)
              .map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))}
          </div>
        </div>
      </section>

      {/* 15. FOR EDUCATORS SECTION */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Educator Network
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Teach What You Know.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Build your teaching profile, reach motivated students across the country, create
                structured batch classes, and grow your independent teaching practice on your own terms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {[
                  'Reach motivated students nationwide',
                  'Build your verified professional profile',
                  'Offer 1-on-1 personalized tutoring',
                  'Create structured batch classes',
                  'Manage requests and student rosters',
                  'Build your independent reputation'
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  id="become-educator-btn"
                  onClick={() => navigate('/signup')}
                  className="py-2.5 px-5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer inline-flex items-center gap-2"
                >
                  Become an Educator
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl relative">
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Ahsan Rahman"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-600"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">Ahsan Rahman</h4>
                    <p className="text-xs text-indigo-400">Senior Physics Educator · BUET</p>
                    <p className="text-[11px] text-slate-400">7 years teaching experience</p>
                  </div>
                </div>

                <blockquote className="text-xs text-slate-300 italic leading-relaxed mb-5">
                  "Pirate Chai allowed me to transition from an overworked coaching center instructor
                  into an independent mentor. I set my own session fees, create batches I care
                  deeply about, and work with students who are genuinely eager to learn."
                </blockquote>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/80 text-center">
                  <div>
                    <span className="block text-base font-bold text-white">700+</span>
                    <span className="text-[10px] text-slate-400">Students Taught</span>
                  </div>
                  <div>
                    <span className="block text-base font-bold text-amber-400">4.9 ★</span>
                    <span className="text-[10px] text-slate-400">Rating</span>
                  </div>
                  <div>
                    <span className="block text-base font-bold text-emerald-400">100%</span>
                    <span className="text-[10px] text-slate-400">Direct Earnings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16. FINAL CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Ready to learn something new?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6">
            Find a mentor who can help you get there — whether it is mastering calculus, acing your
            board exam, or cracking university admission.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/mentors')}
              className="py-2.5 px-5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer"
            >
              Find a Mentor
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="py-2.5 px-5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition shadow-xs cursor-pointer"
            >
              Become an Educator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
