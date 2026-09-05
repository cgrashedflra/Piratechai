import React, { useState } from 'react';
import { Educator } from '../types';
import { useApp } from '../context/AppContext';
import { VerifiedBadge } from './VerifiedBadge';
import { RatingStars } from './RatingStars';
import { BookingModal } from './BookingModal';
import { MapPin, Calendar, Clock, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';

interface MentorCardProps {
  educator: Educator;
}

export const MentorCard: React.FC<MentorCardProps> = ({ educator }) => {
  const { navigate } = useApp();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <div
        id={`mentor-card-${educator.id}`}
        className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow transition-all duration-200 flex flex-col p-5 justify-between relative overflow-hidden"
      >
        <div>
          {/* Top profile row */}
          <div className="flex items-start gap-3.5">
            <div className="relative flex-shrink-0">
              <img
                src={educator.avatar}
                alt={educator.name}
                className="w-14 h-14 rounded-lg object-cover border border-slate-200 shadow-2xs"
                loading="lazy"
              />
              {educator.availableThisWeek && (
                <span
                  title="Available for bookings this week"
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <h3
                  onClick={() => navigate(`/mentors/${educator.id}`)}
                  className="font-bold text-slate-900 text-base hover:text-indigo-600 cursor-pointer truncate transition-colors"
                >
                  {educator.name}
                </h3>
                {educator.verified && <VerifiedBadge size="sm" />}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <RatingStars rating={educator.rating} reviewCount={educator.reviewCount} size="sm" />
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {educator.experience} yrs
                </span>
              </div>

              {/* Qualifications */}
              <p className="text-xs text-slate-600 truncate flex items-center gap-1.5" title={educator.qualifications[0]}>
                <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{educator.qualifications[0]}</span>
              </p>
            </div>
          </div>

          {/* Subjects badges */}
          <div className="mt-3.5 flex flex-wrap gap-1">
            {educator.subjects.slice(0, 4).map((subject) => (
              <span
                key={subject}
                className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
              >
                {subject}
              </span>
            ))}
            {educator.subjects.length > 4 && (
              <span className="px-1.5 py-0.5 text-[11px] text-slate-400 font-medium">
                +{educator.subjects.length - 4}
              </span>
            )}
          </div>

          {/* Short bio/description */}
          <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {educator.description}
          </p>
        </div>

        {/* Card footer details & actions */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Rate</span>
              <span className="font-bold text-slate-900 text-sm">
                ৳{educator.priceMin}–৳{educator.priceMax}
                <span className="font-normal text-slate-500 text-xs">/session</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Format</span>
              <span className="font-medium text-slate-700 text-xs">
                {educator.teachingFormats.join(' · ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`view-profile-${educator.id}`}
              onClick={() => navigate(`/mentors/${educator.id}`)}
              className="flex-1 py-1.5 px-3 border border-slate-300 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer text-center"
            >
              View Profile
            </button>
            <button
              id={`book-session-${educator.id}`}
              onClick={() => setIsBookingOpen(true)}
              className="flex-1 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold transition cursor-pointer text-center shadow-xs"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        educator={educator}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};
