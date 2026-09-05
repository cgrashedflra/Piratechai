import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  AlertOctagon, 
  FileText, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Clock, 
  Filter, 
  ArrowUpRight, 
  Lock, 
  ShieldAlert, 
  UserCheck, 
  UserX, 
  ChevronRight, 
  ExternalLink,
  Award,
  DollarSign,
  History,
  Check,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Educator, ClassItem, PlatformUser, ReportItem, BookingRequest } from '../types';

export const AdminPage: React.FC = () => {
  const { 
    user, 
    login, 
    logout, 
    navigate, 
    educators, 
    classes, 
    users, 
    bookings, 
    reports, 
    auditLogs,
    updateTutorVerification,
    updateUserStatus,
    moderateGig,
    resolveReport,
    dismissReport
  } = useApp();

  // Navigation tab state
  type AdminTab = 'overview' | 'tutors' | 'users' | 'gigs' | 'bookings' | 'reports' | 'logs';
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search & Filter states
  const [tutorFilter, setTutorFilter] = useState<'all' | 'pending' | 'approved' | 'suspended' | 'rejected'>('pending');
  const [tutorSearch, setTutorSearch] = useState('');

  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'student' | 'educator' | 'admin'>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [userSearch, setUserSearch] = useState('');

  const [gigStatusFilter, setGigStatusFilter] = useState<'all' | 'pending' | 'approved' | 'hidden' | 'rejected'>('all');
  const [gigSearch, setGigSearch] = useState('');

  const [bookingStateFilter, setBookingStateFilter] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'cancelled'>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'Escrowed' | 'Paid' | 'Pending' | 'Refunded'>('all');
  const [bookingSearch, setBookingSearch] = useState('');

  const [reportStatusFilter, setReportStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'dismissed'>('all');
  const [reportSearch, setReportSearch] = useState('');

  // Modals / Details inspection states
  const [selectedTutor, setSelectedTutor] = useState<Educator | null>(null);
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);
  const [selectedGig, setSelectedGig] = useState<ClassItem | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  // Action confirmation/reason states
  const [reasonModal, setReasonModal] = useState<{
    isOpen: boolean;
    type: 'reject_tutor' | 'suspend_tutor' | 'suspend_user' | 'reject_gig' | 'resolve_report' | 'dismiss_report';
    id: string;
    title: string;
    promptText: string;
    reasonText: string;
  }>({
    isOpen: false,
    type: 'reject_tutor',
    id: '',
    title: '',
    promptText: '',
    reasonText: ''
  });

  // Admin login form states for non-admins
  const [adminEmail, setAdminEmail] = useState('admin@piratechai.com');
  const [adminPassword, setAdminPassword] = useState('');

  // --------------------------------------------------------------------------
  // # 25. AUTHENTICATION & ROLE CHECK
  // --------------------------------------------------------------------------
  if (!user.isAuthenticated || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div 
          id="admin-forbidden-card"
          className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {user.isAuthenticated ? (
            // Forbidden Gate: Logged in, but NOT an admin
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-700 mb-2">
                403 Forbidden
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Administrative Access Denied
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                You are currently signed in as <strong className="text-slate-800">{user.name}</strong> ({user.role}). Non-admin users cannot view moderation queues, tutor verification dossiers, or audit logs.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs mb-6 space-y-2">
                <div className="flex justify-between text-slate-500">
                  <span>Current User ID:</span>
                  <span className="font-mono text-slate-700">{user.id}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Active Role:</span>
                  <span className="font-semibold text-rose-600 uppercase">{user.role}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Access Requirement:</span>
                  <span className="font-semibold text-slate-700">Role: admin</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => login('admin')}
                  id="switch-to-admin-role-btn"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  Switch to Admin Role (Lead Admin)
                </button>
                <button
                  onClick={() => navigate(user.role === 'educator' ? '/dashboard/educator' : '/dashboard/student')}
                  className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition cursor-pointer"
                >
                  Return to My Dashboard
                </button>
              </div>
            </div>
          ) : (
            // Authentication Gate: Not signed in
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-indigo-100">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Pirate Chai Admin Portal
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Authenticate with administrative credentials to access moderation tools
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  login('admin', 'Zubair Al-Mamun', adminEmail);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Administrator Email
                  </label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Security Key / Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  id="admin-login-submit-btn"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  Sign In to Admin Console
                </button>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative bg-white px-2 text-[11px] text-slate-400 uppercase tracking-wider">
                    Testing Shortcut
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => login('admin')}
                  id="admin-quick-demo-btn"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  1-Click Sign-In as Lead Admin
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // COUNTERS & FILTERED LISTS
  // --------------------------------------------------------------------------
  const pendingTutorsCount = educators.filter(e => e.verificationStatus === 'pending').length;
  const pendingGigsCount = classes.filter(c => c.moderationStatus === 'pending').length;
  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;
  const suspendedUsersCount = users.filter(u => u.status === 'suspended').length;

  // Filtered Tutors
  const filteredTutors = useMemo(() => {
    return educators.filter(tutor => {
      const matchesFilter = 
        tutorFilter === 'all' ? true :
        tutorFilter === 'pending' ? tutor.verificationStatus === 'pending' :
        tutorFilter === 'approved' ? tutor.verificationStatus === 'approved' :
        tutorFilter === 'suspended' ? tutor.verificationStatus === 'suspended' :
        tutor.verificationStatus === 'rejected';

      const matchesSearch = 
        tutor.name.toLowerCase().includes(tutorSearch.toLowerCase()) ||
        tutor.subjects.some(s => s.toLowerCase().includes(tutorSearch.toLowerCase())) ||
        (tutor.documents?.certificateName && tutor.documents.certificateName.toLowerCase().includes(tutorSearch.toLowerCase())) ||
        (tutor.documents?.idNumber && tutor.documents.idNumber.toLowerCase().includes(tutorSearch.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [educators, tutorFilter, tutorSearch]);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
      const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
      const matchesSearch = 
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        (u.phone && u.phone.includes(userSearch));
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, userRoleFilter, userStatusFilter, userSearch]);

  // Filtered Gigs
  const filteredGigs = useMemo(() => {
    return classes.filter(g => {
      const matchesStatus = gigStatusFilter === 'all' || g.moderationStatus === gigStatusFilter;
      const matchesSearch = 
        g.title.toLowerCase().includes(gigSearch.toLowerCase()) ||
        g.educatorName.toLowerCase().includes(gigSearch.toLowerCase()) ||
        g.subject.toLowerCase().includes(gigSearch.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [classes, gigStatusFilter, gigSearch]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesState = bookingStateFilter === 'all' || b.bookingState === bookingStateFilter || b.status === bookingStateFilter;
      const matchesPayment = paymentFilter === 'all' || b.paymentStatus === paymentFilter;
      const matchesSearch = 
        b.studentName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.educatorName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.subject.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.id.toLowerCase().includes(bookingSearch.toLowerCase());
      return matchesState && matchesPayment && matchesSearch;
    });
  }, [bookings, bookingStateFilter, paymentFilter, bookingSearch]);

  // Filtered Reports
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchesStatus = reportStatusFilter === 'all' || r.status === reportStatusFilter;
      const matchesSearch = 
        r.targetName.toLowerCase().includes(reportSearch.toLowerCase()) ||
        r.reporterName.toLowerCase().includes(reportSearch.toLowerCase()) ||
        r.category.toLowerCase().includes(reportSearch.toLowerCase()) ||
        r.description.toLowerCase().includes(reportSearch.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [reports, reportStatusFilter, reportSearch]);

  // --------------------------------------------------------------------------
  // ACTION HANDLERS WITH REASON PROMPT
  // --------------------------------------------------------------------------
  const openReasonModal = (
    type: 'reject_tutor' | 'suspend_tutor' | 'suspend_user' | 'reject_gig' | 'resolve_report' | 'dismiss_report',
    id: string,
    title: string,
    promptText: string
  ) => {
    setReasonModal({
      isOpen: true,
      type,
      id,
      title,
      promptText,
      reasonText: ''
    });
  };

  const handleConfirmAction = () => {
    const { type, id, reasonText } = reasonModal;
    if (type === 'reject_tutor') {
      updateTutorVerification(id, 'rejected', reasonText || 'Credentials rejected by platform admin.');
      if (selectedTutor?.id === id) {
        setSelectedTutor(prev => prev ? { ...prev, verificationStatus: 'rejected', verified: false } : null);
      }
    } else if (type === 'suspend_tutor') {
      updateTutorVerification(id, 'suspended', reasonText || 'Tutor suspended by platform admin.');
      if (selectedTutor?.id === id) {
        setSelectedTutor(prev => prev ? { ...prev, verificationStatus: 'suspended', verified: false } : null);
      }
    } else if (type === 'suspend_user') {
      updateUserStatus(id, 'suspended', reasonText || 'User suspended by platform admin.');
      if (selectedUser?.id === id) {
        setSelectedUser(prev => prev ? { ...prev, status: 'suspended', suspendedReason: reasonText } : null);
      }
    } else if (type === 'reject_gig') {
      moderateGig(id, 'rejected', reasonText || 'Content violated curriculum or trust guidelines.');
      if (selectedGig?.id === id) {
        setSelectedGig(prev => prev ? { ...prev, moderationStatus: 'rejected', rejectionReason: reasonText } : null);
      }
    } else if (type === 'resolve_report') {
      resolveReport(id, reasonText || 'Issue resolved by administration.');
      if (selectedReport?.id === id) {
        setSelectedReport(prev => prev ? { ...prev, status: 'resolved', resolutionNote: reasonText } : null);
      }
    } else if (type === 'dismiss_report') {
      dismissReport(id, reasonText || 'Dismissed after review.');
      if (selectedReport?.id === id) {
        setSelectedReport(prev => prev ? { ...prev, status: 'dismissed', resolutionNote: reasonText } : null);
      }
    }

    setReasonModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* ADMIN TOP BAR */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight">Pirate Chai</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Platform Trust, Moderation & Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>Logged in as <strong>{user.name}</strong></span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition px-2.5 py-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Public Site
            </button>

            <button
              onClick={logout}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition px-2.5 py-1.5 rounded-lg hover:bg-rose-950/40 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto space-x-1 border-t border-slate-800 text-xs font-medium scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'overview'
                ? 'border-indigo-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('tutors')}
            id="admin-tab-tutors"
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'tutors'
                ? 'border-indigo-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Tutor Verification</span>
            {pendingTutorsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-900">
                {pendingTutorsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            id="admin-tab-users"
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'users'
                ? 'border-indigo-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>User Management</span>
            <span className="text-[10px] text-slate-400">({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gigs')}
            id="admin-tab-gigs"
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'gigs'
                ? 'border-indigo-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Gig Moderation</span>
            {pendingGigsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-900">
                {pendingGigsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            id="admin-tab-bookings"
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'bookings'
                ? 'border-indigo-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Booking Overview</span>
            <span className="text-[10px] text-slate-400">({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            id="admin-tab-reports"
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'reports'
                ? 'border-indigo-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Reports & Safety</span>
            {pendingReportsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                {pendingReportsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            id="admin-tab-logs"
            className={`py-3 px-3.5 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition ${
              activeTab === 'logs'
                ? 'border-indigo-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit Logs</span>
          </button>
        </div>
      </header>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & SYSTEM HEALTH */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Action Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-400">Operations Control</span>
                <h1 className="text-2xl font-bold mt-0.5">Moderation & Platform Command</h1>
                <p className="text-slate-300 text-xs mt-1 max-w-2xl">
                  Inspect pending educator verifications, monitor live classroom bookings, moderate new batch gigs, and address user safety reports.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('tutors')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  Review Tutors ({pendingTutorsCount})
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  <AlertOctagon className="w-4 h-4" />
                  Investigate Reports ({pendingReportsCount})
                </button>
              </div>
            </div>

            {/* High-Level Metric Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                onClick={() => { setTutorFilter('pending'); setActiveTab('tutors'); }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Pending Tutors</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">{pendingTutorsCount}</div>
                <span className="text-[11px] text-amber-700 mt-1 block font-medium">Requires credential verification</span>
              </div>

              <div 
                onClick={() => { setGigStatusFilter('pending'); setActiveTab('gigs'); }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Gigs in Queue</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">{pendingGigsCount}</div>
                <span className="text-[11px] text-indigo-700 mt-1 block font-medium">Pending syllabus moderation</span>
              </div>

              <div 
                onClick={() => { setReportStatusFilter('pending'); setActiveTab('reports'); }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Open Reports</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">{pendingReportsCount}</div>
                <span className="text-[11px] text-rose-700 mt-1 block font-medium">Safety or payment issues</span>
              </div>

              <div 
                onClick={() => { setUserStatusFilter('suspended'); setActiveTab('users'); }}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">Suspended Users</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <UserX className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-900">{suspendedUsersCount}</div>
                <span className="text-[11px] text-slate-500 mt-1 block font-medium">Blocked from protected actions</span>
              </div>
            </div>

            {/* Two Column Section: Recent Moderation Actions & Safety Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Audit Logs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-indigo-600" />
                    Latest Admin Actions
                  </h3>
                  <button 
                    onClick={() => setActiveTab('logs')}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                  >
                    View All Logs &rarr;
                  </button>
                </div>
                <div className="space-y-3">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800">{log.action.replace('_', ' ')}</span>
                        <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                      </div>
                      <div className="text-slate-600 font-medium text-[11px] mb-0.5">
                        Target: <span className="text-slate-900 font-semibold">{log.targetTitle}</span> ({log.targetType})
                      </div>
                      <div className="text-[11px] text-slate-500">{log.details}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Immediate Attention: Open Reports */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Priority Safety Queue
                  </h3>
                  <button 
                    onClick={() => setActiveTab('reports')}
                    className="text-xs text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                  >
                    Manage Reports &rarr;
                  </button>
                </div>
                <div className="space-y-3">
                  {reports.filter(r => r.status === 'pending').length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      All reports are resolved. No active safety queue issues.
                    </div>
                  ) : (
                    reports.filter(r => r.status === 'pending').map(report => (
                      <div key={report.id} className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-rose-900">{report.category}</span>
                          <span className="text-[10px] text-rose-600 font-medium">{report.createdAt}</span>
                        </div>
                        <p className="text-slate-700 text-xs line-clamp-2 mb-2">{report.description}</p>
                        <div className="flex items-center justify-between pt-1 border-t border-rose-100/60">
                          <span className="text-[11px] text-slate-500">
                            Against: <strong className="text-slate-800">{report.targetName}</strong> ({report.targetType})
                          </span>
                          <button
                            onClick={() => { setSelectedReport(report); setActiveTab('reports'); }}
                            className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                          >
                            Investigate &rarr;
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: # 26. TUTOR VERIFICATION */}
        {/* ============================================================== */}
        {activeTab === 'tutors' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Tutor Verification Workflow</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review submitted government identification, academic degrees, background checks, and issue approval or suspension decisions.
                </p>
              </div>

              {/* Status Segmented Tabs */}
              <div className="flex bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
                {(['pending', 'all', 'approved', 'suspended', 'rejected'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setTutorFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                      tutorFilter === tab
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab} {tab === 'pending' && pendingTutorsCount > 0 && `(${pendingTutorsCount})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tutors by name, subjects, degree, or ID number..."
                value={tutorSearch}
                onChange={(e) => setTutorSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* Tutors Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="px-5 py-3.5">Tutor Profile</th>
                      <th className="px-4 py-3.5">Academic Credentials</th>
                      <th className="px-4 py-3.5">Document Submissions</th>
                      <th className="px-4 py-3.5">Verification Status</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTutors.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-slate-400">
                          No educators found matching current verification filter ({tutorFilter}).
                        </td>
                      </tr>
                    ) : (
                      filteredTutors.map(tutor => (
                        <tr key={tutor.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={tutor.avatar}
                                alt={tutor.name}
                                className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                              />
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm">{tutor.name}</h4>
                                <span className="text-[11px] text-slate-500 block">{tutor.location}</span>
                                <span className="text-[10px] text-indigo-600 font-medium">{tutor.subjects.slice(0, 3).join(', ')}</span>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4 max-w-xs">
                            <div className="font-semibold text-slate-800 truncate">
                              {tutor.documents?.certificateName || tutor.qualifications[0] || 'Degree Pending Review'}
                            </div>
                            <span className="text-[11px] text-slate-500">
                              {tutor.experience} years tutoring experience
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1 text-[11px] text-slate-700">
                                <Award className="w-3.5 h-3.5 text-indigo-600" />
                                <span>{tutor.documents?.idType || 'Smart NID'}:</span>
                                <span className="font-mono text-slate-500">{tutor.documents?.idNumber || 'NID-VERIFIED'}</span>
                              </div>
                              <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Background check passed
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              tutor.verificationStatus === 'approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : tutor.verificationStatus === 'pending'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : tutor.verificationStatus === 'suspended'
                                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                tutor.verificationStatus === 'approved' ? 'bg-emerald-500' :
                                tutor.verificationStatus === 'pending' ? 'bg-amber-500' :
                                tutor.verificationStatus === 'suspended' ? 'bg-slate-500' : 'bg-rose-500'
                              }`}></span>
                              {tutor.verificationStatus.toUpperCase()}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => setSelectedTutor(tutor)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition text-xs cursor-pointer inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Review Dossier
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TUTOR REVIEW DETAIL MODAL */}
            {selectedTutor && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedTutor.avatar}
                        alt={selectedTutor.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{selectedTutor.name}</h3>
                        <p className="text-xs text-slate-500">{selectedTutor.professionalName}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedTutor(null)}
                      className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-5 text-xs">
                    {/* Verification Status Banner */}
                    <div className={`p-4 rounded-xl border flex items-center justify-between ${
                      selectedTutor.verificationStatus === 'approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                      selectedTutor.verificationStatus === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                      selectedTutor.verificationStatus === 'suspended' ? 'bg-slate-100 border-slate-200 text-slate-800' :
                      'bg-rose-50 border-rose-200 text-rose-800'
                    }`}>
                      <div>
                        <span className="font-bold block text-sm">Status: {selectedTutor.verificationStatus.toUpperCase()}</span>
                        <span className="text-[11px] opacity-90">
                          {selectedTutor.verificationStatus === 'approved' ? 'Approved for public discovery, booking escrow, and class creation.' :
                           selectedTutor.verificationStatus === 'pending' ? 'Awaiting administrative verification of submitted credentials.' :
                           selectedTutor.verificationStatus === 'suspended' ? 'Tutor suspended. Hidden from mentor listings and cannot accept bookings.' :
                           'Application rejected.'}
                        </span>
                      </div>
                      {selectedTutor.documents?.rejectionReason && (
                        <div className="text-right text-[11px] font-medium text-rose-700 max-w-xs">
                          Reason: {selectedTutor.documents.rejectionReason}
                        </div>
                      )}
                    </div>

                    {/* Submitted Documents Dossier */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Submitted Credentials & Verification Proof</h4>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Government Identification</span>
                          <span className="font-bold text-slate-800 block text-xs">{selectedTutor.documents?.idType || 'National Smart NID'}</span>
                          <span className="font-mono text-slate-500 text-[11px]">{selectedTutor.documents?.idNumber || 'NID-8829-4401-2291'}</span>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-400 block mb-0.5">Degree / Certificate</span>
                          <span className="font-bold text-slate-800 block text-xs truncate">{selectedTutor.documents?.certificateName || selectedTutor.qualifications[0]}</span>
                          <span className="text-emerald-600 text-[10px] font-medium flex items-center gap-1 mt-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Academic registry checked
                          </span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 block mb-0.5">Teaching Bio & Philosophy</span>
                        <p className="text-slate-700 leading-relaxed">{selectedTutor.bio}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px]">
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-400 block text-[10px]">Rate Range</span>
                          <span className="font-semibold text-slate-800">৳{selectedTutor.priceMin} - ৳{selectedTutor.priceMax}/hr</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-400 block text-[10px]">Location</span>
                          <span className="font-semibold text-slate-800">{selectedTutor.location}</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="text-slate-400 block text-[10px]">Format</span>
                          <span className="font-semibold text-slate-800">{selectedTutor.teachingFormats.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Approve / Reject / Suspend */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                      <div className="flex gap-2">
                        {selectedTutor.verificationStatus !== 'approved' && (
                          <button
                            onClick={() => {
                              updateTutorVerification(selectedTutor.id, 'approved');
                              setSelectedTutor(prev => prev ? { ...prev, verificationStatus: 'approved', verified: true } : null);
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Check className="w-4 h-4" />
                            Approve Tutor
                          </button>
                        )}

                        {selectedTutor.verificationStatus !== 'rejected' && (
                          <button
                            onClick={() => openReasonModal('reject_tutor', selectedTutor.id, selectedTutor.name, 'Enter the reason for rejecting this tutor application (e.g. illegible certificate, unverified university degree):')}
                            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        )}

                        {selectedTutor.verificationStatus !== 'suspended' && (
                          <button
                            onClick={() => openReasonModal('suspend_tutor', selectedTutor.id, selectedTutor.name, 'Specify the reason for suspending this tutor (e.g. off-platform payments, misconduct):')}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <UserX className="w-4 h-4" />
                            Suspend
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedTutor(null)}
                        className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: # 27. USER MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">User Management</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inspect student, tutor, and administrator accounts. Enforce account suspensions to restrict protected platform actions.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value as any)}
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Students</option>
                  <option value="educator">Educators</option>
                  <option value="admin">Administrators</option>
                </select>

                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value as any)}
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active Only</option>
                  <option value="suspended">Suspended Only</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users by name, email, or phone number..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="px-5 py-3.5">User Identity</th>
                      <th className="px-4 py-3.5">Role</th>
                      <th className="px-4 py-3.5">Contact Details</th>
                      <th className="px-4 py-3.5">Account Status</th>
                      <th className="px-4 py-3.5">Joined</th>
                      <th className="px-4 py-3.5 text-right">Moderation Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map(platformUser => (
                      <tr key={platformUser.id} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={platformUser.avatar}
                              alt={platformUser.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <span className="font-bold text-slate-900 block text-sm">{platformUser.name}</span>
                              <span className="text-slate-400 text-[11px] font-mono">{platformUser.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            platformUser.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : platformUser.role === 'educator'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {platformUser.role}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-slate-600">
                          <div>{platformUser.phone || '—'}</div>
                          <span className="text-[10px] text-slate-400">{platformUser.location || 'Dhaka'}</span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            platformUser.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${platformUser.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                            {platformUser.status.toUpperCase()}
                          </span>
                          {platformUser.suspendedReason && (
                            <span className="block text-[10px] text-rose-600 mt-0.5 max-w-xs truncate" title={platformUser.suspendedReason}>
                              {platformUser.suspendedReason}
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3.5 text-slate-500">
                          {platformUser.joinedAt}
                        </td>

                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedUser(platformUser)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                            >
                              Detail
                            </button>

                            {platformUser.status === 'active' ? (
                              <button
                                onClick={() => openReasonModal('suspend_user', platformUser.id, platformUser.name, `Specify reason for suspending ${platformUser.name}:`)}
                                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg text-xs cursor-pointer border border-rose-200"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button
                                onClick={() => updateUserStatus(platformUser.id, 'active')}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs cursor-pointer shadow-xs"
                              >
                                Restore
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* USER DETAIL MODAL */}
            {selectedUser && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
                <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{selectedUser.name}</h3>
                        <span className="text-xs text-slate-500">{selectedUser.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Platform ID:</span>
                        <span className="font-mono text-slate-800 font-semibold">{selectedUser.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Role:</span>
                        <span className="font-bold uppercase text-slate-800">{selectedUser.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Phone:</span>
                        <span className="text-slate-800">{selectedUser.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Account Status:</span>
                        <span className={`font-bold ${selectedUser.status === 'active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {selectedUser.status.toUpperCase()}
                        </span>
                      </div>
                      {selectedUser.suspendedReason && (
                        <div className="pt-2 border-t border-slate-200 text-rose-700">
                          <strong className="block text-[10px] text-rose-800">Suspension Reason:</strong>
                          {selectedUser.suspendedReason}
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                      <strong>Policy Enforcement:</strong> When suspended, this user is blocked from making bookings, enrolling in courses, or publishing gigs across the platform.
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      {selectedUser.status === 'active' ? (
                        <button
                          onClick={() => {
                            const u = selectedUser;
                            setSelectedUser(null);
                            openReasonModal('suspend_user', u.id, u.name, `Enter reason for suspending ${u.name}:`);
                          }}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs cursor-pointer shadow-xs"
                        >
                          Suspend Account
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            updateUserStatus(selectedUser.id, 'active');
                            setSelectedUser(prev => prev ? { ...prev, status: 'active', suspendedReason: undefined } : null);
                          }}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs cursor-pointer shadow-xs"
                        >
                          Restore Account
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: # 28. GIG MODERATION */}
        {/* ============================================================== */}
        {activeTab === 'gigs' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Gig Moderation</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review submitted batch classes. Gigs marked as <strong>Hidden</strong> or <strong>Rejected</strong> are automatically excluded from public discovery.
                </p>
              </div>

              {/* Status Tabs */}
              <div className="flex bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
                {(['all', 'pending', 'approved', 'hidden', 'rejected'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setGigStatusFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                      gigStatusFilter === tab
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab} {tab === 'pending' && pendingGigsCount > 0 && `(${pendingGigsCount})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search gigs by title, subject, or educator..."
                value={gigSearch}
                onChange={(e) => setGigSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Gigs Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="px-5 py-3.5">Gig / Class Title</th>
                      <th className="px-4 py-3.5">Educator</th>
                      <th className="px-4 py-3.5">Pricing & Schedule</th>
                      <th className="px-4 py-3.5">Moderation Status</th>
                      <th className="px-4 py-3.5 text-right">Moderation Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredGigs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-slate-400">
                          No gigs found in this moderation state ({gigStatusFilter}).
                        </td>
                      </tr>
                    ) : (
                      filteredGigs.map(gig => (
                        <tr key={gig.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={gig.image}
                                alt={gig.title}
                                className="w-12 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm max-w-sm">{gig.title}</h4>
                                <span className="text-[10px] text-indigo-600 font-semibold">{gig.subject} · {gig.level}</span>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={gig.educatorAvatar}
                                alt={gig.educatorName}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <span className="font-semibold text-slate-800">{gig.educatorName}</span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span className="font-bold text-slate-900">৳{gig.price}</span>
                            <span className="text-[10px] text-slate-400 block">{gig.schedule[0] || 'Flexible'}</span>
                          </td>

                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                              gig.moderationStatus === 'approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : gig.moderationStatus === 'pending'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : gig.moderationStatus === 'hidden'
                                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                gig.moderationStatus === 'approved' ? 'bg-emerald-500' :
                                gig.moderationStatus === 'pending' ? 'bg-amber-500' :
                                gig.moderationStatus === 'hidden' ? 'bg-slate-500' : 'bg-rose-500'
                              }`}></span>
                              {gig.moderationStatus.toUpperCase()}
                            </span>
                            {gig.rejectionReason && (
                              <span className="block text-[10px] text-rose-600 mt-0.5 max-w-xs truncate" title={gig.rejectionReason}>
                                {gig.rejectionReason}
                              </span>
                            )}
                          </td>

                          <td className="px-4 py-4 text-right">
                            <button
                              onClick={() => setSelectedGig(gig)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs cursor-pointer inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Review Gig
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* REVIEW GIG MODAL */}
            {selectedGig && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
                  <div className="relative h-44 bg-slate-800">
                    <img
                      src={selectedGig.image}
                      alt={selectedGig.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <button
                      onClick={() => setSelectedGig(null)}
                      className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-1.5 rounded-full transition"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="px-2 py-0.5 bg-indigo-600 text-white rounded text-[10px] font-bold uppercase">
                        {selectedGig.subject} · {selectedGig.level}
                      </span>
                      <h3 className="text-lg font-bold mt-1 text-white shadow-xs">{selectedGig.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 text-xs">
                    {/* Status info */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Current Status</span>
                        <span className="font-bold text-sm text-slate-800 capitalize">{selectedGig.moderationStatus}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Tuition Fee</span>
                        <span className="font-bold text-base text-indigo-600">৳{selectedGig.price}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">Course Description & Outcomes</h4>
                      <p className="text-slate-600 leading-relaxed">{selectedGig.description}</p>
                      <ul className="mt-2 space-y-1 text-slate-700">
                        {selectedGig.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Curriculum */}
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1.5">Curriculum Breakdown ({selectedGig.curriculum.length} Sessions)</h4>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {selectedGig.curriculum.map(session => (
                          <div key={session.sessionNumber} className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
                            <div>
                              <span className="font-semibold text-slate-800">Session {session.sessionNumber}: {session.title}</span>
                              <span className="text-[11px] text-slate-500 block">{session.topic}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{session.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Moderation Controls: Approve / Hide / Reject */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex gap-2">
                        {selectedGig.moderationStatus !== 'approved' && (
                          <button
                            onClick={() => {
                              moderateGig(selectedGig.id, 'approved');
                              setSelectedGig(prev => prev ? { ...prev, moderationStatus: 'approved', rejectionReason: undefined } : null);
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Check className="w-4 h-4" />
                            Approve Gig
                          </button>
                        )}

                        {selectedGig.moderationStatus !== 'hidden' && (
                          <button
                            onClick={() => {
                              moderateGig(selectedGig.id, 'hidden');
                              setSelectedGig(prev => prev ? { ...prev, moderationStatus: 'hidden' } : null);
                            }}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <EyeOff className="w-4 h-4" />
                            Hide from Discovery
                          </button>
                        )}

                        {selectedGig.moderationStatus !== 'rejected' && (
                          <button
                            onClick={() => {
                              const g = selectedGig;
                              setSelectedGig(null);
                              openReasonModal('reject_gig', g.id, g.title, 'Enter rejection reason (e.g. false academic claims, inadequate syllabus):');
                            }}
                            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedGig(null)}
                        className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: # 29. BOOKING OVERVIEW */}
        {/* ============================================================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Booking Overview</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track 1-on-1 tutoring appointments, booking states, escrowed student payments, and video session delivery.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={bookingStateFilter}
                  onChange={(e) => setBookingStateFilter(e.target.value as any)}
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="all">All Booking States</option>
                  <option value="accepted">Accepted</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled / Declined</option>
                </select>

                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value as any)}
                  className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="all">All Payment States</option>
                  <option value="Escrowed">Escrowed</option>
                  <option value="Paid">Paid Out</option>
                  <option value="Pending">Pending Payment</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bookings by student name, tutor name, subject, or ID..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="px-5 py-3.5">Booking ID & Date</th>
                      <th className="px-4 py-3.5">Student</th>
                      <th className="px-4 py-3.5">Tutor & Subject</th>
                      <th className="px-4 py-3.5">Booking State</th>
                      <th className="px-4 py-3.5">Payment</th>
                      <th className="px-4 py-3.5">Session Status</th>
                      <th className="px-4 py-3.5 text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-4">
                          <span className="font-mono text-slate-800 font-bold text-[11px] block">{b.id}</span>
                          <span className="text-[10px] text-slate-400">{b.createdAt}</span>
                        </td>

                        <td className="px-4 py-4">
                          <span className="font-bold text-slate-900 block">{b.studentName}</span>
                          <span className="text-[11px] text-slate-500">{b.studentPhone}</span>
                        </td>

                        <td className="px-4 py-4">
                          <span className="font-semibold text-slate-800 block">{b.educatorName}</span>
                          <span className="text-[10px] text-indigo-600 font-medium">{b.subject} · {b.duration}</span>
                        </td>

                        <td className="px-4 py-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.bookingState === 'accepted' || b.status === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.bookingState === 'pending' || b.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : b.bookingState === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {b.bookingState || b.status}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            b.paymentStatus === 'Escrowed' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            b.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            b.paymentStatus === 'Refunded' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {b.paymentStatus || 'Escrowed'} ({b.budget})
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                            b.sessionStatus === 'Completed' ? 'text-emerald-600' :
                            b.sessionStatus === 'Disputed' ? 'text-rose-600 font-bold' :
                            'text-slate-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              b.sessionStatus === 'Completed' ? 'bg-emerald-500' :
                              b.sessionStatus === 'Disputed' ? 'bg-rose-500' : 'bg-blue-500'
                            }`}></span>
                            {b.sessionStatus || 'Scheduled'}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BOOKING DETAIL MODAL */}
            {selectedBooking && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">BOOKING RECORD</span>
                      <h3 className="font-bold text-slate-900 text-base">{selectedBooking.id}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 block">Student</span>
                        <strong className="text-slate-800 text-sm block">{selectedBooking.studentName}</strong>
                        <span className="text-slate-500">{selectedBooking.studentPhone}</span>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 block">Educator</span>
                        <strong className="text-slate-800 text-sm block">{selectedBooking.educatorName}</strong>
                        <span className="text-indigo-600 font-medium">{selectedBooking.subject}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Scheduled Time:</span>
                        <span className="font-semibold text-slate-800">{selectedBooking.preferredDate} ({selectedBooking.preferredTime})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Format & Duration:</span>
                        <span className="text-slate-800">{selectedBooking.format} · {selectedBooking.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Agreed Fee / Budget:</span>
                        <span className="font-bold text-slate-900">{selectedBooking.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Payment Escrow:</span>
                        <span className="font-semibold text-blue-700">{selectedBooking.paymentStatus || 'Escrowed'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Session Status:</span>
                        <span className="font-semibold text-slate-800">{selectedBooking.sessionStatus || 'Scheduled'}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-xl">
                      <span className="text-[10px] text-slate-400 block mb-0.5">Student's Learning Goal</span>
                      <p className="text-slate-700 italic">"{selectedBooking.goal}"</p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setSelectedBooking(null)}
                        className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl text-xs"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: # 30. REPORTS & SAFETY */}
        {/* ============================================================== */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Reports & Trust Enforcement</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Investigate user complaints regarding off-platform fee solicitation, misconduct, misleading curriculum, or copyright infringement.
                </p>
              </div>

              {/* Filter */}
              <div className="flex bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
                {(['all', 'pending', 'resolved', 'dismissed'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setReportStatusFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                      reportStatusFilter === tab
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab} {tab === 'pending' && pendingReportsCount > 0 && `(${pendingReportsCount})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search reports by target name, category, or reporter..."
                value={reportSearch}
                onChange={(e) => setReportSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Reports List */}
            <div className="space-y-3">
              {filteredReports.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400 text-xs">
                  No reports in this category.
                </div>
              ) : (
                filteredReports.map(report => (
                  <div
                    key={report.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-200 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          report.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : report.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {report.status}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{report.category}</span>
                        <span className="text-[11px] text-slate-400">· {report.id}</span>
                      </div>
                      <span className="text-xs text-slate-400">{report.createdAt}</span>
                    </div>

                    <div className="py-3 text-xs">
                      <p className="text-slate-700 leading-relaxed mb-3">{report.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl">
                        <div>
                          Reporter: <strong className="text-slate-800">{report.reporterName}</strong> ({report.reporterRole})
                        </div>
                        <div>
                          Target: <strong className="text-slate-900">{report.targetName}</strong> <span className="uppercase text-[10px] font-semibold text-indigo-600">({report.targetType})</span>
                        </div>
                        {report.resolutionNote && (
                          <div className="text-emerald-700 font-medium">
                            Resolution: {report.resolutionNote}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      {report.status === 'pending' && (
                        <>
                          <button
                            onClick={() => openReasonModal('resolve_report', report.id, report.targetName, 'Enter resolution note (e.g. Warning issued, User suspended, Issue mediated):')}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs cursor-pointer shadow-xs"
                          >
                            Resolve Report
                          </button>
                          <button
                            onClick={() => openReasonModal('dismiss_report', report.id, report.targetName, 'Enter reason for dismissing this report:')}
                            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                          >
                            Dismiss
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: AUDIT LOGS */}
        {/* ============================================================== */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Administrative Audit Logs</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Immutable chronological log of all administrator actions: approvals, suspensions, report adjudications, and gig moderation.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold text-[10px]">
                    <tr>
                      <th className="px-5 py-3.5">Timestamp</th>
                      <th className="px-4 py-3.5">Administrator</th>
                      <th className="px-4 py-3.5">Action</th>
                      <th className="px-4 py-3.5">Target</th>
                      <th className="px-4 py-3.5">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-slate-800">
                          {log.adminName}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-bold text-slate-900">{log.targetTitle}</span>
                          <span className="text-[10px] text-slate-400 block capitalize">Type: {log.targetType}</span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-600 max-w-md">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* UNIVERSAL REASON PROMPT MODAL */}
      {reasonModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">
                Confirm Action: {reasonModal.title}
              </h3>
              <button
                onClick={() => setReasonModal(prev => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <label className="block font-semibold text-slate-700">
                {reasonModal.promptText}
              </label>
              <textarea
                rows={3}
                required
                value={reasonModal.reasonText}
                onChange={(e) => setReasonModal(prev => ({ ...prev, reasonText: e.target.value }))}
                placeholder="Enter justification or audit log note..."
                className="w-full text-xs border border-slate-200 rounded-xl p-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReasonModal(prev => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="confirm-admin-action-btn"
                  onClick={handleConfirmAction}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition cursor-pointer shadow-xs"
                >
                  Confirm & Log Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
