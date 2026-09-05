import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ClassCard } from '../components/ClassCard';
import { Search, SlidersHorizontal, ChevronRight, BookOpen, X, Sparkles } from 'lucide-react';

export const ClassesPage: React.FC = () => {
  const { classes, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');

  const subjects = ['all', 'Physics', 'Biology', 'IELTS', 'Programming', 'Mathematics', 'Chemistry', 'SAT', 'Economics'];
  const levels = ['all', 'HSC', 'Admission', 'Professional', 'University', 'Exam Preparation'];

  const filteredClasses = useMemo(() => {
    return classes
      .filter((cls) => {
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchTitle = cls.title.toLowerCase().includes(q);
          const matchSub = cls.subject.toLowerCase().includes(q);
          const matchEdu = cls.educatorName.toLowerCase().includes(q);
          const matchDesc = cls.description.toLowerCase().includes(q);
          if (!matchTitle && !matchSub && !matchEdu && !matchDesc) return false;
        }

        if (selectedSubject !== 'all' && cls.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
          return false;
        }

        if (selectedLevel !== 'all' && cls.level.toLowerCase() !== selectedLevel.toLowerCase()) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest-price') return a.price - b.price;
        if (sortBy === 'most-popular') return b.enrolledStudents - a.enrolledStudents;
        if (sortBy === 'highest-rated') return b.rating - a.rating;
        // recommended
        return b.rating * b.enrolledStudents - a.rating * a.enrolledStudents;
      });
  }, [classes, searchTerm, selectedSubject, selectedLevel, sortBy]);

  return (
    <div id="classes-page-root" className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => navigate('/')} className="hover:text-slate-900 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900">Batch Classes</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
            Group Masterclasses
          </span>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Learn together. Go further.
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Join structured live classes led by experienced educators with set schedules, homework review, and interactive doubt clearing.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              id="classes-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search classes by title, topic, or instructor..."
              className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 font-normal"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="py-1.5 px-3 border border-slate-300 rounded-md bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Subjects</option>
              {subjects.filter(s => s !== 'all').map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Level Selector */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="py-1.5 px-3 border border-slate-300 rounded-md bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All Levels</option>
              {levels.filter(l => l !== 'all').map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1.5 px-3 border border-slate-300 rounded-md bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="recommended">Recommended</option>
              <option value="most-popular">Most Popular</option>
              <option value="highest-rated">Highest Rated</option>
              <option value="lowest-price">Lowest Price</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-medium text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredClasses.length}</span> live batch courses
          </p>
          {(selectedSubject !== 'all' || selectedLevel !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedLevel('all');
                setSearchTerm('');
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid of Class Cards */}
        {filteredClasses.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center my-6 shadow-xs">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No batch classes found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
              Try adjusting your subject or level filter to explore more available classes.
            </p>
            <button
              onClick={() => {
                setSelectedSubject('all');
                setSelectedLevel('all');
                setSearchTerm('');
              }}
              className="py-2 px-4 rounded-md bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((cls) => (
              <ClassCard key={cls.id} classItem={cls} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
