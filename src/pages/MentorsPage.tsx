import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MentorCard } from '../components/MentorCard';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Check,
  Star,
  ShieldCheck
} from 'lucide-react';

export const MentorsPage: React.FC = () => {
  const { educators, queryParams, navigate } = useApp();

  // Search state initialized from query param if provided
  const [searchTerm, setSearchTerm] = useState(queryParams.subject || '');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    queryParams.subject ? [queryParams.subject] : []
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [format, setFormat] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [availableThisWeekOnly, setAvailableThisWeekOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync if query parameter changes
  useEffect(() => {
    if (queryParams.subject) {
      setSearchTerm(queryParams.subject);
      setSelectedSubjects([queryParams.subject]);
    }
  }, [queryParams.subject]);

  const allSubjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'ICT',
    'Programming',
    'Economics',
    'Accounting',
    'IELTS',
    'SAT',
    'Admission Preparation'
  ];

  const allLevels = [
    'School',
    'SSC',
    'HSC Preparation',
    'University Admission',
    'University',
    'Professional',
    'Exam Preparation'
  ];

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSubjects([]);
    setSelectedLevels([]);
    setMinRating(0);
    setMinExperience(0);
    setFormat('all');
    setMaxPrice(3000);
    setAvailableThisWeekOnly(false);
    setVerifiedOnly(false);
    setSortBy('recommended');
  };

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleLevel = (lvl: string) => {
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]
    );
  };

  // Filter & Sort computation
  const filteredEducators = useMemo(() => {
    return educators
      .filter((edu) => {
        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = edu.name.toLowerCase().includes(q);
          const matchSub = edu.subjects.some((s) => s.toLowerCase().includes(q));
          const matchDesc = edu.description.toLowerCase().includes(q);
          const matchQual = edu.qualifications.some((ql) => ql.toLowerCase().includes(q));
          if (!matchName && !matchSub && !matchDesc && !matchQual) return false;
        }

        // Subjects
        if (selectedSubjects.length > 0) {
          const hasSubject = selectedSubjects.some((sel) =>
            edu.subjects.some((s) => s.toLowerCase().includes(sel.toLowerCase()))
          );
          if (!hasSubject) return false;
        }

        // Level
        if (selectedLevels.length > 0) {
          const hasLevel = selectedLevels.some((lvl) =>
            edu.subjects.some((s) => s.toLowerCase().includes(lvl.toLowerCase()))
          );
          if (!hasLevel) return false;
        }

        // Rating
        if (minRating > 0 && edu.rating < minRating) return false;

        // Experience
        if (minExperience > 0 && edu.experience < minExperience) return false;

        // Price
        if (edu.priceMin > maxPrice) return false;

        // Availability
        if (availableThisWeekOnly && !edu.availableThisWeek) return false;

        // Verified
        if (verifiedOnly && !edu.verified) return false;

        // Format
        if (format === '1-on-1' && !edu.teachingFormats.includes('1-on-1')) return false;
        if (format === 'Batch classes' && !edu.teachingFormats.includes('Batch classes')) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'highest-rated') return b.rating - a.rating;
        if (sortBy === 'lowest-price') return a.priceMin - b.priceMin;
        if (sortBy === 'most-experienced') return b.experience - a.experience;
        if (sortBy === 'most-reviewed') return b.reviewCount - a.reviewCount;
        // recommended
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
      });
  }, [
    educators,
    searchTerm,
    selectedSubjects,
    selectedLevels,
    minRating,
    minExperience,
    format,
    maxPrice,
    availableThisWeekOnly,
    verifiedOnly,
    sortBy
  ]);

  const activeFilterCount =
    (selectedSubjects.length > 0 ? 1 : 0) +
    (selectedLevels.length > 0 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (minExperience > 0 ? 1 : 0) +
    (format !== 'all' ? 1 : 0) +
    (maxPrice < 3000 ? 1 : 0) +
    (availableThisWeekOnly ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  return (
    <div id="mentors-page-root" className="min-h-screen py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Find Mentors</span>
        </nav>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
            Find a mentor who fits the way you learn.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Browse verified educators by subject, experience, rating, price, and availability. Connect for 1-on-1
            personalized academic guidance.
          </p>
        </div>

        {/* Search and Filter bar */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
          <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              id="mentor-search-bar"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subject, topic, qualifications, or mentor name..."
              className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile filter button */}
            <button
              id="mobile-filter-open-btn"
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex-1 py-1.5 px-3 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sorting */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 hidden sm:inline font-medium">Sort:</span>
              <select
                id="mentor-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 px-3 border border-slate-300 rounded-md bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="most-experienced">Most Experienced</option>
                <option value="most-reviewed">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* 19. Two-Column Layout: Filter Sidebar + Results */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 space-y-5 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Availability & Verified switches */}
            <div className="space-y-2 pb-3.5 border-b border-slate-100">
              <label className="flex items-center justify-between cursor-pointer text-xs font-medium text-slate-700">
                <span>Available this week</span>
                <input
                  type="checkbox"
                  checked={availableThisWeekOnly}
                  onChange={(e) => setAvailableThisWeekOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer accent-indigo-600"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer text-xs font-medium text-slate-700">
                <span>Verified educators only</span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer accent-indigo-600"
                />
              </label>
            </div>

            {/* Price range */}
            <div className="pb-3.5 border-b border-slate-100">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Max Session Fee</span>
                <span className="font-bold text-slate-900">৳{maxPrice}</span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>৳500</span>
                <span>৳3,000+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pb-3.5 border-b border-slate-100">
              <h4 className="text-xs font-semibold text-slate-700 mb-1.5">Minimum Rating</h4>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[0, 4.5, 4.8].map((rt) => (
                  <button
                    key={rt}
                    onClick={() => setMinRating(rt)}
                    className={`py-1.5 px-2 rounded-md font-semibold text-center transition cursor-pointer text-xs ${
                      minRating === rt
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {rt === 0 ? 'Any' : `${rt}+ ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div className="pb-3.5 border-b border-slate-100">
              <h4 className="text-xs font-semibold text-slate-700 mb-1.5">Experience</h4>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { label: 'Any', value: 0 },
                  { label: '5+ yrs', value: 5 },
                  { label: '8+ yrs', value: 8 }
                ].map((exp) => (
                  <button
                    key={exp.label}
                    onClick={() => setMinExperience(exp.value)}
                    className={`py-1.5 px-2 rounded-md font-semibold text-center transition cursor-pointer text-xs ${
                      minExperience === exp.value
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Teaching format */}
            <div className="pb-3.5 border-b border-slate-100">
              <h4 className="text-xs font-semibold text-slate-700 mb-1.5">Teaching Format</h4>
              <div className="space-y-1.5 text-xs">
                {['all', '1-on-1', 'Batch classes'].map((fmt) => (
                  <label
                    key={fmt}
                    className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900"
                  >
                    <input
                      type="radio"
                      name="teachingFormat"
                      checked={format === fmt}
                      onChange={() => setFormat(fmt)}
                      className="accent-indigo-600 cursor-pointer"
                    />
                    <span className="capitalize">{fmt === 'all' ? 'All Formats' : fmt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subjects checklist */}
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-1.5">Subjects</h4>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {allSubjects.map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(sub)}
                      onChange={() => toggleSubject(sub)}
                      className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer accent-indigo-600"
                    />
                    <span>{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="md:col-span-8 lg:col-span-9">
            {/* Header info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-slate-600">
                Showing{' '}
                <span className="text-slate-900 font-bold">{filteredEducators.length}</span> mentors
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* 23. EMPTY STATE */}
            {filteredEducators.length === 0 ? (
              <div
                id="mentors-empty-state"
                className="bg-white rounded-xl border border-slate-200 p-10 text-center my-4"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">No mentors found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
                  Try adjusting your filters or searching for another subject, topic, or mentor name.
                </p>
                <button
                  id="clear-filters-btn"
                  onClick={clearAllFilters}
                  className="py-2 px-4 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filteredEducators.map((educator) => (
                  <MentorCard key={educator.id} educator={educator} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-5 overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick check buttons */}
            <div className="space-y-2.5">
              <label className="flex items-center justify-between text-xs font-medium text-slate-700">
                <span>Available this week</span>
                <input
                  type="checkbox"
                  checked={availableThisWeekOnly}
                  onChange={(e) => setAvailableThisWeekOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
                />
              </label>
              <label className="flex items-center justify-between text-xs font-medium text-slate-700">
                <span>Verified educators</span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
                />
              </label>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Max Price</span>
                <span className="font-bold text-slate-900">৳{maxPrice}</span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Subjects */}
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-1.5">Subjects</h4>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {allSubjects.map((sub) => (
                  <label key={sub} className="flex items-center gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(sub)}
                      onChange={() => toggleSubject(sub)}
                      className="w-3.5 h-3.5 rounded text-indigo-600 accent-indigo-600"
                    />
                    <span>{sub}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2 px-3 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 px-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                Apply ({filteredEducators.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
