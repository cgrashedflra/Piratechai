import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Educator, 
  ClassItem, 
  BookingRequest, 
  EnrollmentRecord, 
  UserSession,
  PlatformUser,
  ReportItem,
  AdminAuditLog
} from '../types';
import { initialEducators } from '../data/educators';
import { initialClasses } from '../data/classes';
import { 
  initialPlatformUsers, 
  initialReports, 
  initialAuditLogs, 
  defaultAdminUser 
} from '../data/adminData';

interface AppContextType {
  educators: Educator[];
  classes: ClassItem[];
  user: UserSession;
  bookings: BookingRequest[];
  enrollments: EnrollmentRecord[];
  users: PlatformUser[];
  reports: ReportItem[];
  auditLogs: AdminAuditLog[];
  currentPath: string;
  currentRoute: string;
  queryParams: Record<string, string>;
  navigate: (path: string, params?: Record<string, string>) => void;
  login: (role: 'student' | 'educator' | 'admin', customName?: string, customEmail?: string) => void;
  logout: () => void;
  addBookingRequest: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => { success: boolean; error?: string };
  updateBookingStatus: (id: string, status: 'accepted' | 'declined') => void;
  enrollInClass: (classItem: ClassItem, studentName: string, studentEmail: string, studentPhone: string) => { success: boolean; error?: string };
  createClass: (newClass: Omit<ClassItem, 'id' | 'enrolledStudents' | 'rating'>) => string;
  updateEducatorProfile: (educatorId: string, updates: Partial<Educator>) => void;
  updateTutorVerification: (tutorId: string, status: 'pending' | 'approved' | 'rejected' | 'suspended', reason?: string) => void;
  updateUserStatus: (userId: string, status: 'active' | 'suspended', reason?: string) => void;
  moderateGig: (classId: string, status: 'approved' | 'hidden' | 'rejected', reason?: string) => void;
  submitReport: (report: Omit<ReportItem, 'id' | 'createdAt' | 'status'>) => void;
  resolveReport: (reportId: string, resolutionNote: string) => void;
  dismissReport: (reportId: string, note?: string) => void;
  logAdminAction: (action: string, targetType: 'tutor' | 'gig' | 'user' | 'report' | 'booking', targetId: string, targetTitle: string, details: string) => void;
}

function safeGetJSON<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
}

function safeSetJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignored in restricted environments
  }
}

const defaultStudentUser: UserSession = {
  isAuthenticated: true,
  role: 'student',
  id: 'student-nafisa',
  name: 'Nafisa Ahmed',
  email: 'nafisa.ahmed@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  phone: '+880 1712 345678',
  location: 'Dhaka, Bangladesh',
  educationLevel: 'HSC 2nd Year (Science)',
  subjects: ['Physics', 'Mathematics', 'Biology']
};

const defaultEducatorUser: UserSession = {
  isAuthenticated: true,
  role: 'educator',
  id: 'ahsan-rahman',
  name: 'Ahsan Rahman',
  professionalName: 'Ahsan Rahman (Concept Physics)',
  email: 'ahsan.rahman@piratechai.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  phone: '+880 1819 876543',
  location: 'Dhanmondi, Dhaka',
  experience: 7,
  startingPrice: 600,
  bio: 'Specializes in HSC physics and mathematics with a concept-first teaching approach. Over 700 students guided to public universities.'
};

const initialBookings: BookingRequest[] = [
  {
    id: 'req-1',
    educatorId: 'ahsan-rahman',
    educatorName: 'Ahsan Rahman',
    educatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    studentName: 'Nafisa Ahmed',
    studentPhone: '+880 1712 345678',
    subject: 'Physics',
    goal: 'Struggling with rotational motion & moment of inertia for upcoming test',
    preferredDate: 'Tomorrow, 8:00 PM',
    preferredTime: '8:00 PM',
    duration: '60 minutes',
    format: 'Online (Video Classroom)',
    budget: '৳600',
    status: 'accepted',
    bookingState: 'accepted',
    paymentStatus: 'Escrowed',
    sessionStatus: 'Scheduled',
    createdAt: 'Yesterday'
  },
  {
    id: 'req-2',
    educatorId: 'ahsan-rahman',
    educatorName: 'Ahsan Rahman',
    educatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    studentName: 'Tanveer Islam',
    studentPhone: '+880 1911 223344',
    subject: 'Calculus',
    goal: 'Need help with differential equation derivations and graphical slopes',
    preferredDate: 'Saturday, 4:00 PM',
    preferredTime: '4:00 PM',
    duration: '90 minutes',
    format: 'Online (Video Classroom)',
    budget: '৳900',
    status: 'pending',
    bookingState: 'pending',
    paymentStatus: 'Pending',
    sessionStatus: 'Scheduled',
    createdAt: '2 hours ago'
  },
  {
    id: 'req-3',
    educatorId: 'nafisa-kamal',
    educatorName: 'Dr. Nafisa Kamal',
    educatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    studentName: 'Nafisa Ahmed',
    studentPhone: '+880 1712 345678',
    subject: 'Human Physiology',
    goal: 'Cardiovascular cycle and ECG rhythm wave analysis for admission mock',
    preferredDate: 'Sep 02, 2026',
    preferredTime: '7:30 PM',
    duration: '60 minutes',
    format: 'Online (Video Classroom)',
    budget: '৳800',
    status: 'accepted',
    bookingState: 'completed',
    paymentStatus: 'Paid',
    sessionStatus: 'Completed',
    createdAt: '3 days ago'
  },
  {
    id: 'req-4',
    educatorId: 'tutor-farhan',
    educatorName: 'Farhan Tariq',
    educatorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    studentName: 'Sabbir Hossain',
    studentPhone: '+880 1822 556677',
    subject: 'Calculus',
    goal: 'Coordinate geometry shortcuts review',
    preferredDate: 'Aug 29, 2026',
    preferredTime: '5:00 PM',
    duration: '60 minutes',
    format: 'Online (Video Classroom)',
    budget: '৳450',
    status: 'declined',
    bookingState: 'cancelled',
    paymentStatus: 'Refunded',
    sessionStatus: 'Disputed',
    createdAt: '1 week ago'
  }
];

const initialEnrollments: EnrollmentRecord[] = [
  {
    id: 'enr-1',
    classId: 'hsc-physics-mechanics',
    classTitle: 'HSC Physics — Mechanics Intensive',
    educatorName: 'Ahsan Rahman',
    educatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    studentName: 'Nafisa Ahmed',
    studentEmail: 'nafisa.ahmed@example.com',
    studentPhone: '+880 1712 345678',
    price: 2400,
    schedule: 'Saturday & Tuesday · 8:00 PM',
    enrolledAt: '3 days ago'
  },
  {
    id: 'enr-2',
    classId: 'medical-bio-physiology',
    classTitle: 'Medical Admission — Human Physiology & Genetics',
    educatorName: 'Dr. Nafisa Kamal',
    educatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    studentName: 'Nafisa Ahmed',
    studentEmail: 'nafisa.ahmed@example.com',
    studentPhone: '+880 1712 345678',
    price: 3200,
    schedule: 'Monday & Thursday · 7:30 PM',
    enrolledAt: '1 week ago'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [educators, setEducators] = useState<Educator[]>(() => {
    const loaded = safeGetJSON<Educator[]>('pc_educators', initialEducators);
    // Ensure all have verificationStatus
    return loaded.map(e => ({
      ...e,
      verificationStatus: e.verificationStatus || (e.verified ? 'approved' : 'pending')
    }));
  });

  const [classes, setClasses] = useState<ClassItem[]>(() => {
    const loaded = safeGetJSON<ClassItem[]>('pc_classes', initialClasses);
    return loaded.map(c => ({
      ...c,
      moderationStatus: c.moderationStatus || 'approved'
    }));
  });

  const [user, setUser] = useState<UserSession>(() =>
    safeGetJSON('pc_user', defaultStudentUser)
  );

  const [bookings, setBookings] = useState<BookingRequest[]>(() =>
    safeGetJSON('pc_bookings', initialBookings)
  );

  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(() =>
    safeGetJSON('pc_enrollments', initialEnrollments)
  );

  const [users, setUsers] = useState<PlatformUser[]>(() =>
    safeGetJSON('pc_users', initialPlatformUsers)
  );

  const [reports, setReports] = useState<ReportItem[]>(() =>
    safeGetJSON('pc_reports', initialReports)
  );

  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() =>
    safeGetJSON('pc_audit_logs', initialAuditLogs)
  );

  // Client side routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    try {
      return window.location.pathname || '/';
    } catch {
      return '/';
    }
  });

  const [queryParams, setQueryParams] = useState<Record<string, string>>(() => {
    try {
      const search = window.location.search;
      const params: Record<string, string> = {};
      if (search) {
        new URLSearchParams(search).forEach((v, k) => {
          params[k] = v;
        });
      }
      return params;
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const handlePopState = () => {
      try {
        setCurrentPath(window.location.pathname || '/');
        const params: Record<string, string> = {};
        new URLSearchParams(window.location.search).forEach((v, k) => {
          params[k] = v;
        });
        setQueryParams(params);
      } catch {
        // Fallback
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    safeSetJSON('pc_educators', educators);
  }, [educators]);

  useEffect(() => {
    safeSetJSON('pc_classes', classes);
  }, [classes]);

  useEffect(() => {
    safeSetJSON('pc_user', user);
  }, [user]);

  useEffect(() => {
    safeSetJSON('pc_bookings', bookings);
  }, [bookings]);

  useEffect(() => {
    safeSetJSON('pc_enrollments', enrollments);
  }, [enrollments]);

  useEffect(() => {
    safeSetJSON('pc_users', users);
  }, [users]);

  useEffect(() => {
    safeSetJSON('pc_reports', reports);
  }, [reports]);

  useEffect(() => {
    safeSetJSON('pc_audit_logs', auditLogs);
  }, [auditLogs]);

  const navigate = (path: string, params?: Record<string, string>) => {
    let target = path;
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v) searchParams.set(k, v);
      });
      const q = searchParams.toString();
      if (q) target += `?${q}`;
    }

    try {
      window.history.pushState({}, '', target);
    } catch {
      // Ignored for iframe sandbox restrictions
    }
    setCurrentPath(path);
    const parsed: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      parsed[k] = v;
    });
    setQueryParams(params || parsed);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Ignored
    }
  };

  const login = (role: 'student' | 'educator' | 'admin', customName?: string, customEmail?: string) => {
    if (role === 'admin') {
      const adminSession: UserSession = {
        ...defaultAdminUser,
        name: customName || defaultAdminUser.name,
        email: customEmail || defaultAdminUser.email,
        role: 'admin',
        status: 'active'
      };
      setUser(adminSession);
      navigate('/admin');
    } else if (role === 'student') {
      const studentSession: UserSession = {
        ...defaultStudentUser,
        name: customName || defaultStudentUser.name,
        email: customEmail || defaultStudentUser.email,
        role: 'student',
        status: 'active'
      };
      setUser(studentSession);
      navigate('/dashboard/student');
    } else {
      const educatorSession: UserSession = {
        ...defaultEducatorUser,
        name: customName || defaultEducatorUser.name,
        email: customEmail || defaultEducatorUser.email,
        role: 'educator',
        status: 'active'
      };
      setUser(educatorSession);
      navigate('/dashboard/educator');
    }
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      role: 'guest',
      id: '',
      name: '',
      email: '',
      avatar: ''
    });
    navigate('/');
  };

  const logAdminAction = (
    action: string, 
    targetType: 'tutor' | 'gig' | 'user' | 'report' | 'booking', 
    targetId: string, 
    targetTitle: string, 
    details: string
  ) => {
    const newLog: AdminAuditLog = {
      id: 'log-' + Date.now(),
      adminName: user.name || 'Zubair Al-Mamun',
      action,
      targetType,
      targetId,
      targetTitle,
      details,
      timestamp: 'Just now'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addBookingRequest = (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    if (user.status === 'suspended') {
      return { success: false, error: 'Your account is suspended. You cannot submit tutoring bookings.' };
    }

    const newReq: BookingRequest = {
      ...booking,
      id: 'req-' + Date.now(),
      status: 'pending',
      bookingState: 'pending',
      paymentStatus: 'Pending',
      sessionStatus: 'Scheduled',
      createdAt: 'Just now'
    };
    setBookings(prev => [newReq, ...prev]);
    return { success: true };
  };

  const updateBookingStatus = (id: string, status: 'accepted' | 'declined') => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { 
        ...b, 
        status, 
        bookingState: status,
        paymentStatus: status === 'accepted' ? 'Escrowed' : b.paymentStatus
      } : b))
    );
  };

  const enrollInClass = (classItem: ClassItem, studentName: string, studentEmail: string, studentPhone: string) => {
    if (user.status === 'suspended') {
      return { success: false, error: 'Your account is suspended. You cannot enroll in batch classes.' };
    }

    const newEnrollment: EnrollmentRecord = {
      id: 'enr-' + Date.now(),
      classId: classItem.id,
      classTitle: classItem.title,
      educatorName: classItem.educatorName,
      educatorAvatar: classItem.educatorAvatar,
      studentName,
      studentEmail,
      studentPhone,
      price: classItem.price,
      schedule: classItem.schedule[0] || 'Flexible',
      enrolledAt: 'Today'
    };
    setEnrollments(prev => [newEnrollment, ...prev]);
    // increment class count
    setClasses(prev =>
      prev.map(c =>
        c.id === classItem.id ? { ...c, enrolledStudents: Math.min(c.maxStudents, c.enrolledStudents + 1) } : c
      )
    );
    return { success: true };
  };

  const createClass = (newClass: Omit<ClassItem, 'id' | 'enrolledStudents' | 'rating'>): string => {
    if (user.status === 'suspended') {
      return '';
    }

    const id = 'class-' + Date.now();
    const created: ClassItem = {
      ...newClass,
      id,
      enrolledStudents: 1,
      rating: 5.0,
      moderationStatus: 'approved'
    };
    setClasses(prev => [created, ...prev]);
    logAdminAction('GIG_CREATED', 'gig', id, newClass.title, `Published by educator ${newClass.educatorName}`);
    return id;
  };

  const updateEducatorProfile = (educatorId: string, updates: Partial<Educator>) => {
    setEducators(prev =>
      prev.map(e => (e.id === educatorId ? { ...e, ...updates } : e))
    );
    if (user.role === 'educator' && user.id === educatorId) {
      setUser(prev => ({
        ...prev,
        name: updates.name || prev.name,
        professionalName: updates.professionalName || prev.professionalName,
        bio: updates.bio || prev.bio,
        startingPrice: updates.priceMin || prev.startingPrice
      }));
    }
  };

  const updateTutorVerification = (
    tutorId: string, 
    status: 'pending' | 'approved' | 'rejected' | 'suspended', 
    reason?: string
  ) => {
    let tutorName = tutorId;
    setEducators(prev =>
      prev.map(e => {
        if (e.id === tutorId) {
          tutorName = e.name;
          const currentDocs = e.documents || {
            idType: 'National ID',
            idNumber: 'NID-VERIFIED',
            certificateName: 'Verified Qualifications',
            backgroundChecked: true,
            submittedAt: 'Recent'
          };
          return {
            ...e,
            verificationStatus: status,
            verified: status === 'approved',
            documents: {
              ...currentDocs,
              rejectionReason: reason
            }
          };
        }
        return e;
      })
    );

    // Sync matching platform user
    setUsers(prev =>
      prev.map(u => {
        if (u.id === tutorId || u.name.toLowerCase() === tutorName.toLowerCase()) {
          return {
            ...u,
            status: status === 'suspended' ? 'suspended' : 'active',
            suspendedReason: status === 'suspended' ? (reason || 'Tutor suspended by platform admin') : undefined
          };
        }
        return u;
      })
    );

    logAdminAction(
      `TUTOR_${status.toUpperCase()}`,
      'tutor',
      tutorId,
      tutorName,
      reason ? `Tutor status set to ${status}: ${reason}` : `Tutor verification updated to ${status}`
    );
  };

  const updateUserStatus = (userId: string, status: 'active' | 'suspended', reason?: string) => {
    let userName = userId;
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          userName = u.name;
          return {
            ...u,
            status,
            suspendedReason: status === 'suspended' ? (reason || 'Account suspended by administrator') : undefined
          };
        }
        return u;
      })
    );

    // If target user is the currently logged in user, immediately update session
    if (user.id === userId) {
      setUser(prev => ({
        ...prev,
        status,
        suspendedReason: status === 'suspended' ? (reason || 'Account suspended by administrator') : undefined
      }));
    }

    // If educator, also sync verification status if suspended
    if (status === 'suspended') {
      setEducators(prev =>
        prev.map(e => (e.id === userId ? { ...e, verificationStatus: 'suspended', verified: false } : e))
      );
    } else {
      setEducators(prev =>
        prev.map(e => (e.id === userId && e.verificationStatus === 'suspended' ? { ...e, verificationStatus: 'approved', verified: true } : e))
      );
    }

    logAdminAction(
      `USER_${status.toUpperCase()}`,
      'user',
      userId,
      userName,
      reason ? `User set to ${status}: ${reason}` : `User status set to ${status}`
    );
  };

  const moderateGig = (classId: string, status: 'approved' | 'hidden' | 'rejected', reason?: string) => {
    let gigTitle = classId;
    setClasses(prev =>
      prev.map(c => {
        if (c.id === classId) {
          gigTitle = c.title;
          return {
            ...c,
            moderationStatus: status,
            rejectionReason: reason || undefined
          };
        }
        return c;
      })
    );

    logAdminAction(
      `GIG_${status.toUpperCase()}`,
      'gig',
      classId,
      gigTitle,
      reason ? `Gig ${status}. Reason: ${reason}` : `Gig status set to ${status}`
    );
  };

  const submitReport = (report: Omit<ReportItem, 'id' | 'createdAt' | 'status'>) => {
    const newReport: ReportItem = {
      ...report,
      id: 'rep-' + Date.now(),
      status: 'pending',
      createdAt: 'Just now'
    };
    setReports(prev => [newReport, ...prev]);
    logAdminAction(
      'REPORT_SUBMITTED',
      report.targetType,
      report.targetId,
      report.targetName,
      `Reported by ${report.reporterName} (${report.category})`
    );
  };

  const resolveReport = (reportId: string, resolutionNote: string) => {
    let reportTarget = reportId;
    setReports(prev =>
      prev.map(r => {
        if (r.id === reportId) {
          reportTarget = `${r.targetType.toUpperCase()}: ${r.targetName}`;
          return {
            ...r,
            status: 'resolved',
            resolvedAt: 'Just now',
            resolutionNote
          };
        }
        return r;
      })
    );

    logAdminAction('REPORT_RESOLVED', 'report', reportId, reportTarget, `Resolved: ${resolutionNote}`);
  };

  const dismissReport = (reportId: string, note?: string) => {
    let reportTarget = reportId;
    setReports(prev =>
      prev.map(r => {
        if (r.id === reportId) {
          reportTarget = `${r.targetType.toUpperCase()}: ${r.targetName}`;
          return {
            ...r,
            status: 'dismissed',
            resolutionNote: note || 'Dismissed: No policy violation identified upon administrative review.'
          };
        }
        return r;
      })
    );

    logAdminAction('REPORT_DISMISSED', 'report', reportId, reportTarget, note || 'Dismissed with no violation found');
  };

  return (
    <AppContext.Provider
      value={{
        educators,
        classes,
        user,
        bookings,
        enrollments,
        users,
        reports,
        auditLogs,
        currentPath,
        currentRoute: currentPath,
        queryParams,
        navigate,
        login,
        logout,
        addBookingRequest,
        updateBookingStatus,
        enrollInClass,
        createClass,
        updateEducatorProfile,
        updateTutorVerification,
        updateUserStatus,
        moderateGig,
        submitReport,
        resolveReport,
        dismissReport,
        logAdminAction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
