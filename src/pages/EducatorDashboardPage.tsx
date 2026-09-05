import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Calendar,
  DollarSign,
  Eye,
  Star,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  Settings,
  Sparkles,
  Video,
  ChevronRight
} from 'lucide-react';

export const EducatorDashboardPage: React.FC = () => {
  const { bookings, updateBookingStatus, classes, addClass, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'requests' | 'classes' | 'schedule' | 'earnings'>('requests');
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);

  // New Class Form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newLevel, setNewLevel] = useState('HSC');
  const [newPrice, setNewPrice] = useState(3000);
  const [newMaxStudents, setNewMaxStudents] = useState(15);
  const [newSessions, setNewSessions] = useState(8);
  const [newSchedule, setNewSchedule] = useState('Sundays & Tuesdays · 7:30 PM');

  // Educator schedule state
  const [scheduleState, setScheduleState] = useState([
    { day: 'Monday', active: true, slots: '6:00 PM – 9:00 PM' },
    { day: 'Tuesday', active: true, slots: '6:00 PM – 9:00 PM' },
    { day: 'Wednesday', active: true, slots: '7:00 PM – 9:00 PM' },
    { day: 'Thursday', active: false, slots: 'Unavailable' },
    { day: 'Friday', active: true, slots: '3:00 PM – 8:00 PM' },
    { day: 'Saturday', active: true, slots: '10:00 AM – 2:00 PM' },
    { day: 'Sunday', active: true, slots: '6:00 PM – 9:00 PM' }
  ]);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addClass({
      title: newTitle,
      subject: newSubject,
      level: newLevel,
      price: Number(newPrice),
      maxStudents: Number(newMaxStudents),
      sessions: Number(newSessions),
      schedule: [newSchedule],
      description: `Comprehensive interactive live masterclass covering core ${newSubject} fundamentals, analytical derivations, and exam practice.`,
      outcomes: [
        `Master advanced problem sets in ${newSubject}`,
        'Thorough practice with past board and university admission questions',
        'Weekly live doubt clarification clinics'
      ],
      curriculum: [
        { sessionNumber: 1, title: 'Foundations & Concepts', duration: '90 min', topic: 'Core theoretical derivations' },
        { sessionNumber: 2, title: 'Applied Problem Solving', duration: '90 min', topic: 'Tricky edge cases' }
      ]
    });

    setIsCreateClassOpen(false);
    setNewTitle('');
  };

  return (
    <div id="educator-dashboard-root" className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Educator Control Center
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Welcome back, Ahsan.
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Here is your teaching summary, active bookings, and scheduled batch classes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/mentors/edu-1')}
              className="py-2 px-3.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>View Public Profile</span>
            </button>
            <button
              id="create-class-top-btn"
              onClick={() => setIsCreateClassOpen(true)}
              className="py-2 px-3.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Class</span>
            </button>
          </div>
        </div>

        {/* 41. METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Active Students</span>
              <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-xl font-bold text-slate-900">18</span>
            <span className="text-[11px] text-emerald-600 block mt-0.5 font-medium">
              +4 new this month
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Upcoming Sessions</span>
              <div className="w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-xl font-bold text-slate-900">5</span>
            <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
              Next: Today at 8:00 PM
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Monthly Revenue</span>
              <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-xl font-bold text-slate-900">৳42,500</span>
            <span className="text-[11px] text-emerald-600 block mt-0.5 font-medium">
              +18% from last month
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Profile Views</span>
              <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-xl font-bold text-slate-900">340</span>
            <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
              Past 30 days
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Rating</span>
              <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
            <span className="text-xl font-bold text-slate-900">4.9</span>
            <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
              From 42 verified reviews
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'requests', label: `Session Bookings (${bookings.length})` },
            { id: 'classes', label: `My Batch Classes (${classes.length})` },
            { id: 'schedule', label: 'Availability & Slots' },
            { id: 'earnings', label: 'Earnings & Payouts' }
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

        {/* TAB 1: 42. BOOKINGS / SESSION REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Incoming & Confirmed Bookings</h3>
              <span className="text-xs text-slate-500">Real-time requests from prospective students</span>
            </div>

            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{booking.studentName}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : booking.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                      <span className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
                        {booking.subject}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        {booking.date} · {booking.time}
                      </span>
                      <span>•</span>
                      <span>Phone: {booking.studentPhone}</span>
                      <span>•</span>
                      <span>Rate: ৳{booking.rate}</span>
                    </div>

                    {booking.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-md border border-slate-100 italic">
                        "{booking.notes}"
                      </p>
                    )}
                  </div>

                  {/* Booking Action Buttons */}
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    {booking.status === 'confirmed' ? (
                      <button
                        onClick={() => navigate('/classroom/session-live-hsc-physics')}
                        className="py-2 px-3.5 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Launch Room</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="py-1.5 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Confirm
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'declined')}
                          className="py-1.5 px-3 rounded-md border border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition cursor-pointer"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 43. MY CLASSES */}
        {activeTab === 'classes' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Batch Classes You Created</h3>
              <button
                onClick={() => setIsCreateClassOpen(true)}
                className="py-2 px-3.5 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Batch
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
                        {cls.level} · {cls.subject}
                      </span>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {cls.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{cls.title}</h4>

                    <div className="space-y-1 text-xs text-slate-500 pt-1">
                      <p>Schedule: {cls.schedule[0]}</p>
                      <p>
                        Enrolled:{' '}
                        <strong className="text-slate-850 font-semibold">
                          {cls.enrolledStudents}/{cls.maxStudents} students
                        </strong>
                      </p>
                      <p>
                        Fee: <strong className="text-slate-850 font-semibold">৳{cls.price}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => navigate(`/classes/${cls.id}`)}
                      className="flex-1 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-center cursor-pointer"
                    >
                      Class Page
                    </button>
                    <button
                      onClick={() => navigate('/classroom/session-batch-hsc')}
                      className="flex-1 py-1.5 rounded-md bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5 text-indigo-400" />
                      Launch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 44. SCHEDULE & AVAILABILITY EDITOR */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weekly Availability Settings</h3>
              <p className="text-xs text-slate-500">
                Control the days and hours students can book 1-on-1 tutoring sessions with you.
              </p>
            </div>

            <div className="space-y-2.5">
              {scheduleState.map((dayItem, index) => (
                <div
                  key={dayItem.day}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50 gap-3"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={dayItem.active}
                      onChange={(e) => {
                        const updated = [...scheduleState];
                        updated[index].active = e.target.checked;
                        if (!e.target.checked) updated[index].slots = 'Unavailable';
                        else updated[index].slots = '6:00 PM – 9:00 PM';
                        setScheduleState(updated);
                      }}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-800 w-24">{dayItem.day}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      disabled={!dayItem.active}
                      value={dayItem.slots}
                      onChange={(e) => {
                        const updated = [...scheduleState];
                        updated[index].slots = e.target.value;
                        setScheduleState(updated);
                      }}
                      className="text-xs border border-slate-300 rounded-md px-3 py-1.5 bg-white disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48"
                    />
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        dayItem.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {dayItem.active ? 'Open' : 'Off'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => alert('Schedule updated successfully!')}
                className="py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              >
                Save Availability
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: 45. EARNINGS & PAYOUTS */}
        {activeTab === 'earnings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block">Available Balance</span>
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 block mt-1">৳38,000</span>
                <button
                  onClick={() => alert('Payout request submitted to bKash/Nagad!')}
                  className="mt-4 w-full py-2 px-4 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition shadow-xs cursor-pointer"
                >
                  Request Payout
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block">Pending Clearance</span>
                <span className="text-2xl sm:text-3xl font-bold text-amber-600 block mt-1">৳4,500</span>
                <p className="text-[11px] text-slate-400 mt-2">
                  Cleared automatically 24h after session completion.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block">All-time Lifetime Earnings</span>
                <span className="text-2xl sm:text-3xl font-bold text-emerald-600 block mt-1">৳284,000</span>
                <p className="text-[11px] text-slate-400 mt-2">
                  52 completed 1-on-1 sessions + 8 batch cohorts.
                </p>
              </div>
            </div>

            {/* Transactions history */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">Recent Payouts & Bookings</h3>
              <div className="space-y-3 text-xs">
                {[
                  { desc: 'HSC Physics Mechanics — 3 New Student Enrollments', date: 'Yesterday', amount: '+৳9,000', status: 'Completed' },
                  { desc: '1-on-1 Tutoring Session with Nafisa Ahmed', date: '3 days ago', amount: '+৳800', status: 'Completed' },
                  { desc: 'Bank Transfer Payout to City Bank AC ****419', date: '1 week ago', amount: '-৳35,000', status: 'Paid' },
                  { desc: '1-on-1 Tutoring Session with Tanvir Hasan', date: '2 weeks ago', amount: '+৳600', status: 'Completed' }
                ].map((tx, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <div>
                      <h4 className="font-semibold text-slate-800">{tx.desc}</h4>
                      <span className="text-[11px] text-slate-400">{tx.date}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-semibold ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {tx.amount}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE NEW CLASS MODAL */}
      {isCreateClassOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl border border-slate-200 relative my-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Batch Class</h3>
              <button
                onClick={() => setIsCreateClassOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Class Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. HSC Physics — Thermodynamics & Waves Deep-Dive"
                  className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="ICT">ICT</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="HSC">HSC</option>
                    <option value="SSC">SSC</option>
                    <option value="University Admission">University Admission</option>
                    <option value="Exam Preparation">Exam Preparation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fee (৳)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Max Students</label>
                  <input
                    type="number"
                    value={newMaxStudents}
                    onChange={(e) => setNewMaxStudents(Number(e.target.value))}
                    className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sessions</label>
                  <input
                    type="number"
                    value={newSessions}
                    onChange={(e) => setNewSessions(Number(e.target.value))}
                    className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Schedule</label>
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  placeholder="e.g. Saturdays & Wednesdays · 8:00 PM"
                  className="w-full text-xs border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateClassOpen(false)}
                  className="flex-1 py-2 rounded-md border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-create-class-btn"
                  className="flex-1 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-xs cursor-pointer"
                >
                  Publish Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
