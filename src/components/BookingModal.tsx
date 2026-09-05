import React, { useState } from 'react';
import { Educator } from '../types';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Calendar, Clock, DollarSign, BookOpen, Phone, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  educator: Educator;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ educator, isOpen, onClose }) => {
  const { user, addBookingRequest, navigate } = useApp();

  const [subject, setSubject] = useState(educator.subjects[0] || 'Physics');
  const [goal, setGoal] = useState('');
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [preferredTime, setPreferredTime] = useState(
    educator.schedule[0]?.timeSlots[0] || '6:00 PM'
  );
  const [duration, setDuration] = useState('60 minutes');
  const [format, setFormat] = useState('Online (Video Classroom)');
  const [budget, setBudget] = useState(`৳${educator.priceMin}`);
  const [phone, setPhone] = useState(user.phone || '+880 1712 345678');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!goal.trim()) {
      newErrors.goal = 'Please describe what you want to learn or review';
    }
    if (!phone.trim() || phone.length < 9) {
      newErrors.phone = 'Please provide a valid contact number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addBookingRequest({
      educatorId: educator.id,
      educatorName: educator.name,
      educatorAvatar: educator.avatar,
      studentName: user.name || 'Student',
      studentPhone: phone,
      subject,
      goal,
      preferredDate,
      preferredTime,
      duration,
      format,
      budget
    });

    setIsSubmitted(true);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setGoal('');
    setErrors({});
    onClose();
  };

  return (
    <div
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={resetAndClose}
    >
      <div
        id="booking-modal-card"
        className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-booking-modal"
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div id="booking-success-state" className="py-4 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1.5">Session Request Sent!</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-5">
              <strong>{educator.name}</strong> has been notified about your 1-on-1 tutoring request for{' '}
              <span className="text-indigo-600 font-semibold">{subject}</span>. You will receive session confirmation shortly.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-left text-xs text-slate-600 space-y-2 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Educator:</span>
                <span className="font-semibold text-slate-800">{educator.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Requested Time:</span>
                <span className="font-semibold text-slate-800">{preferredDate} · {preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-semibold text-slate-800">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Fee:</span>
                <span className="font-semibold text-emerald-700">{budget}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                id="view-in-dashboard-btn"
                onClick={() => {
                  resetAndClose();
                  navigate('/dashboard/student');
                }}
                className="flex-1 py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition shadow-xs cursor-pointer"
              >
                Go to Student Dashboard
              </button>
              <button
                id="continue-browsing-btn"
                onClick={resetAndClose}
                className="flex-1 py-2 px-4 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={educator.avatar}
                alt={educator.name}
                className="w-11 h-11 rounded-lg object-cover border border-slate-200"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">Book a Session with {educator.name}</h3>
                <p className="text-xs text-slate-500">
                  From ৳{educator.priceMin}/session · 1-on-1 personalized tutoring
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Subject / Topic
                </label>
                <select
                  id="booking-subject-select"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {educator.subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  What do you need help with? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="booking-goal-textarea"
                  rows={3}
                  value={goal}
                  onChange={(e) => {
                    setGoal(e.target.value);
                    if (errors.goal) setErrors((prev) => ({ ...prev, goal: '' }));
                  }}
                  placeholder="e.g. Struggling with rotational mechanics formulas and derivation of moment of inertia before my college midterm..."
                  className={`w-full text-xs sm:text-sm border rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.goal ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {errors.goal && <p className="text-xs text-red-500 mt-1">{errors.goal}</p>}
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <select
                    id="booking-date-select"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday">This Friday</option>
                    <option value="This Saturday">This Saturday</option>
                    <option value="Next Monday">Next Monday</option>
                    <option value="Next Wednesday">Next Wednesday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    id="booking-time-select"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Duration & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Session Duration
                  </label>
                  <select
                    id="booking-duration-select"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="45 minutes">45 minutes (Concept sprint)</option>
                    <option value="60 minutes">60 minutes (Standard)</option>
                    <option value="90 minutes">90 minutes (Deep dive)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Learning Format
                  </label>
                  <select
                    id="booking-format-select"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Online (Video Classroom)">Online (Video Classroom)</option>
                    <option value="In-person (Subject to location)">In-person (Dhanmondi / Studio)</option>
                  </select>
                </div>
              </div>

              {/* Budget & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Proposed Budget
                  </label>
                  <div className="relative">
                    <input
                      id="booking-budget-input"
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full text-xs sm:text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={`৳${educator.priceMin}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Student Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="booking-phone-input"
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    placeholder="+880 1712 000000"
                    className={`w-full text-xs sm:text-sm border rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-session-request-btn"
                  className="w-full py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Request Session
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  No payment charged now. Payment is confirmed only after the educator accepts your slot.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
