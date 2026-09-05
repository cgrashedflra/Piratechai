import React, { createContext, useContext, useState, useEffect } from 'react';
import { Educator, ClassItem, BookingRequest, EnrollmentRecord, UserSession } from '../types';
import { initialEducators } from '../data/educators';
import { initialClasses } from '../data/classes';

interface AppContextType {
  educators: Educator[];
  classes: ClassItem[];
  user: UserSession;
  bookings: BookingRequest[];
  enrollments: EnrollmentRecord[];
  currentPath: string;
  currentRoute: string;
  queryParams: Record<string, string>;
  navigate: (path: string, params?: Record<string, string>) => void;
  login: (role: 'student' | 'educator', customName?: string, customEmail?: string) => void;
  logout: () => void;
  addBookingRequest: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateBookingStatus: (id: string, status: 'accepted' | 'declined') => void;
  enrollInClass: (classItem: ClassItem, studentName: string, studentEmail: string, studentPhone: string) => void;
  createClass: (newClass: Omit<ClassItem, 'id' | 'enrolledStudents' | 'rating'>) => string;
  updateEducatorProfile: (educatorId: string, updates: Partial<Educator>) => void;
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
    createdAt: '2 hours ago'
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
  const [educators, setEducators] = useState<Educator[]>(() =>
    safeGetJSON('pc_educators', initialEducators)
  );

  const [classes, setClasses] = useState<ClassItem[]>(() =>
    safeGetJSON('pc_classes', initialClasses)
  );

  const [user, setUser] = useState<UserSession>(() =>
    safeGetJSON('pc_user', defaultStudentUser)
  );

  const [bookings, setBookings] = useState<BookingRequest[]>(() =>
    safeGetJSON('pc_bookings', initialBookings)
  );

  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(() =>
    safeGetJSON('pc_enrollments', initialEnrollments)
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

  const login = (role: 'student' | 'educator', customName?: string, customEmail?: string) => {
    if (role === 'student') {
      const studentSession: UserSession = {
        ...defaultStudentUser,
        name: customName || defaultStudentUser.name,
        email: customEmail || defaultStudentUser.email,
        role: 'student'
      };
      setUser(studentSession);
      navigate('/dashboard/student');
    } else {
      const educatorSession: UserSession = {
        ...defaultEducatorUser,
        name: customName || defaultEducatorUser.name,
        email: customEmail || defaultEducatorUser.email,
        role: 'educator'
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

  const addBookingRequest = (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: BookingRequest = {
      ...booking,
      id: 'req-' + Date.now(),
      status: 'pending',
      createdAt: 'Just now'
    };
    setBookings(prev => [newReq, ...prev]);
  };

  const updateBookingStatus = (id: string, status: 'accepted' | 'declined') => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status } : b))
    );
  };

  const enrollInClass = (classItem: ClassItem, studentName: string, studentEmail: string, studentPhone: string) => {
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
  };

  const createClass = (newClass: Omit<ClassItem, 'id' | 'enrolledStudents' | 'rating'>): string => {
    const id = 'class-' + Date.now();
    const created: ClassItem = {
      ...newClass,
      id,
      enrolledStudents: 1,
      rating: 5.0
    };
    setClasses(prev => [created, ...prev]);
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

  return (
    <AppContext.Provider
      value={{
        educators,
        classes,
        user,
        bookings,
        enrollments,
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
        updateEducatorProfile
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
