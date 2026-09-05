import React, { useState } from 'react';
import { Flag, X, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'tutor' | 'gig' | 'user';
  targetId: string;
  targetName: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetName
}) => {
  const { user, submitReport } = useApp();
  const [category, setCategory] = useState<string>('Inappropriate Conduct');
  const [description, setDescription] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    submitReport({
      reporterName: user.isAuthenticated ? user.name : 'Anonymous Student',
      reporterEmail: user.isAuthenticated ? user.email : 'student@piratechai.com',
      reporterRole: user.role === 'educator' ? 'educator' : 'student',
      targetType,
      targetId,
      targetName,
      category,
      description: description.trim()
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div 
        id="report-modal-card"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-rose-600">
            <Flag className="w-5 h-5" />
            <h3 className="font-semibold text-slate-900 text-base">Report {targetType === 'gig' ? 'Class' : targetType === 'tutor' ? 'Tutor' : 'User'}</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">Report Submitted</h4>
            <p className="text-slate-600 text-sm max-w-sm mx-auto mb-6">
              Thank you for keeping Pirate Chai safe. Our trust & moderation team will investigate <span className="font-medium text-slate-800">{targetName}</span> within 24 hours.
            </p>
            <button
              onClick={handleClose}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 flex gap-3 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">Community Trust & Safety</span>
                Target: <strong className="text-amber-950 font-semibold">{targetName}</strong> ({targetType})
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Violation Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="report-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              >
                <option value="Inappropriate Conduct">Inappropriate or abusive conduct</option>
                <option value="Misleading Content">Misleading content or false curriculum claims</option>
                <option value="Payment Issue">Off-platform payment solicitation / Fee fraud</option>
                <option value="Spam / Plagiarism">Spam, bot account, or academic plagiarism</option>
                <option value="Harassment">Harassment or discriminatory remarks</option>
                <option value="Other Policy Violation">Other Terms of Service violation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Detailed Explanation & Evidence <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="report-description-textarea"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what occurred, including dates, chat context, or specific syllabus claims..."
                className="w-full text-sm border border-slate-200 rounded-xl p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Your report is confidential and visible only to platform administrators.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium rounded-xl hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-report-btn"
                disabled={!description.trim()}
                className="px-5 py-2 text-sm bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-medium rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <Shield className="w-4 h-4" />
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
