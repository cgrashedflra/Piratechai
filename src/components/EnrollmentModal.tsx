import React, { useState } from 'react';
import { ClassItem } from '../types';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Calendar, Clock, DollarSign, Users, Sparkles } from 'lucide-react';

interface EnrollmentModalProps {
  classItem: ClassItem;
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ classItem, isOpen, onClose }) => {
  const { user, enrollInClass, navigate } = useApp();

  const [name, setName] = useState(user.name || 'Nafisa Ahmed');
  const [email, setEmail] = useState(user.email || 'nafisa.ahmed@example.com');
  const [phone, setPhone] = useState(user.phone || '+880 1712 345678');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEnrolled, setIsEnrolled] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please provide your full name';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please provide a valid email address';
    if (!phone.trim() || phone.length < 8) newErrors.phone = 'Please provide your active phone / WhatsApp number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    enrollInClass(classItem, name, email, phone);
    setIsEnrolled(true);
  };

  const resetAndClose = () => {
    setIsEnrolled(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      id="enrollment-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={resetAndClose}
    >
      <div
        id="enrollment-modal-card"
        className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-enrollment-modal"
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {isEnrolled ? (
          <div id="enrollment-success-state" className="py-4 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1.5">Enrollment Successful!</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-5">
              You are enrolled in <span className="font-semibold text-slate-900">{classItem.title}</span> with{' '}
              <strong>{classItem.educatorName}</strong>. Your seat is confirmed.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-left text-xs text-slate-600 space-y-2 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Class:</span>
                <span className="font-semibold text-slate-800">{classItem.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Instructor:</span>
                <span className="font-semibold text-slate-800">{classItem.educatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Live Schedule:</span>
                <span className="font-semibold text-slate-800">{classItem.schedule[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Live Sessions:</span>
                <span className="font-semibold text-slate-800">{classItem.sessions} sessions ({classItem.duration} min each)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Batch Fee:</span>
                <span className="font-bold text-emerald-700">৳{classItem.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                id="go-to-dashboard-btn"
                onClick={() => {
                  resetAndClose();
                  navigate('/dashboard/student');
                }}
                className="flex-1 py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition shadow-xs cursor-pointer"
              >
                Go to Dashboard
              </button>
              <button
                id="close-enrollment-dialog-btn"
                onClick={resetAndClose}
                className="flex-1 py-2 px-4 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                Browse More Classes
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded mb-2">
                Structured Batch Enrollment
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{classItem.title}</h3>
              <p className="text-xs text-slate-500 mt-1">with {classItem.educatorName} · {classItem.level} {classItem.subject}</p>
            </div>

            {/* Course summary badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-4 grid grid-cols-2 gap-2.5 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Schedule</span>
                <span className="font-semibold text-slate-800">{classItem.schedule[0]}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Course Fee</span>
                <span className="font-bold text-sm text-slate-900">৳{classItem.price.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Live Sessions</span>
                <span className="font-semibold text-slate-800">{classItem.sessions} live classes</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Available Seats</span>
                <span className="font-semibold text-emerald-700">
                  {classItem.maxStudents - classItem.enrolledStudents} seats left
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="enrollment-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  className={`w-full text-xs sm:text-sm border rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                  placeholder="e.g. Nafisa Ahmed"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="enrollment-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={`w-full text-xs sm:text-sm border rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                  placeholder="name@example.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone / WhatsApp (For session links) <span className="text-red-500">*</span>
                </label>
                <input
                  id="enrollment-phone-input"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  className={`w-full text-xs sm:text-sm border rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                  placeholder="+880 1712 345678"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="confirm-enrollment-btn"
                  className="w-full py-2.5 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Confirm Enrollment · ৳{classItem.price.toLocaleString()}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  Instant confirmation for the MVP. You will find class links in your Student Dashboard.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
