import React, { useState } from 'react';
import { ClassItem } from '../types';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from './VerifiedBadge';
import { RatingStars } from './RatingStars';
import { EnrollmentModal } from './EnrollmentModal';
import { Calendar, Clock, Users, BookOpen, ChevronRight, Sparkles } from 'lucide-react';

interface ClassCardProps {
  classItem: ClassItem;
}

export const ClassCard: React.FC<ClassCardProps> = ({ classItem }) => {
  const { navigate } = useApp();
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  const seatsLeft = classItem.maxStudents - classItem.enrolledStudents;

  return (
    <>
      <div
        id={`class-card-${classItem.id}`}
        className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow transition-all duration-200 flex flex-col overflow-hidden relative"
      >
        {/* Course image thumbnail with badges */}
        <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
          <img
            src={classItem.image}
            alt={classItem.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Level / Subject badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-indigo-700 rounded shadow-xs">
              {classItem.level} · {classItem.subject}
            </span>
          </div>

          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded shadow-xs ${
                classItem.status === 'Almost full'
                  ? 'bg-amber-500 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {classItem.status}
            </span>
          </div>

          {/* Schedule overlay on image */}
          <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium drop-shadow-sm truncate">
              <Calendar className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              {classItem.schedule[0]}
            </span>
            <span className="font-semibold bg-black/50 px-2 py-0.5 rounded text-[11px] backdrop-blur-xs flex-shrink-0">
              {classItem.sessions} live sessions
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3
              onClick={() => navigate(`/classes/${classItem.id}`)}
              className="font-bold text-slate-900 text-base leading-snug hover:text-indigo-600 cursor-pointer transition-colors mb-2 line-clamp-2"
            >
              {classItem.title}
            </h3>

            {/* Educator profile row */}
            <div
              onClick={() => navigate(`/mentors/${classItem.educatorId}`)}
              className="flex items-center gap-2 mb-3 cursor-pointer group/educator"
            >
              <img
                src={classItem.educatorAvatar}
                alt={classItem.educatorName}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
              />
              <span className="text-xs font-semibold text-slate-700 group-hover/educator:text-indigo-600 transition-colors truncate">
                with {classItem.educatorName}
              </span>
              {classItem.educatorVerified && <VerifiedBadge size="sm" label="✓" />}
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
              {classItem.description}
            </p>

            {/* Stats row: Seats, Rating */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-2.5 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {classItem.enrolledStudents}/{classItem.maxStudents} enrolled
                </span>
                <span className="text-emerald-600 font-semibold">({seatsLeft} seats left)</span>
              </div>
              <RatingStars rating={classItem.rating} size="sm" showCount={false} />
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Cohort Fee</span>
              <span className="font-bold text-slate-900 text-base">
                ৳{classItem.price.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id={`view-class-btn-${classItem.id}`}
                onClick={() => navigate(`/classes/${classItem.id}`)}
                className="py-1.5 px-3 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
              >
                Details
              </button>
              <button
                id={`enroll-class-btn-${classItem.id}`}
                onClick={() => setIsEnrollOpen(true)}
                className="py-1.5 px-3.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer flex items-center gap-1"
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      </div>

      <EnrollmentModal
        classItem={classItem}
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />
    </>
  );
};
