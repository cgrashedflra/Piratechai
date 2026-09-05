import { PlatformUser, ReportItem, AdminAuditLog, UserSession } from '../types';

export const defaultAdminUser: UserSession = {
  isAuthenticated: true,
  role: 'admin',
  id: 'admin-zubair',
  name: 'Zubair Al-Mamun',
  email: 'admin@piratechai.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  phone: '+880 1700 000001',
  location: 'Platform HQ, Dhaka',
  status: 'active'
};

export const initialPlatformUsers: PlatformUser[] = [
  {
    id: 'admin-zubair',
    name: 'Zubair Al-Mamun',
    email: 'admin@piratechai.com',
    phone: '+880 1700 000001',
    role: 'admin',
    status: 'active',
    joinedAt: 'Jan 15, 2025',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    location: 'Dhaka HQ',
    totalBookings: 0
  },
  {
    id: 'student-nafisa',
    name: 'Nafisa Ahmed',
    email: 'nafisa.ahmed@example.com',
    phone: '+880 1712 345678',
    role: 'student',
    status: 'active',
    joinedAt: 'Aug 10, 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    location: 'Dhaka (Dhanmondi)',
    totalBookings: 3
  },
  {
    id: 'student-tanveer',
    name: 'Tanveer Islam',
    email: 'tanveer.islam@example.com',
    phone: '+880 1911 223344',
    role: 'student',
    status: 'active',
    joinedAt: 'Sep 01, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    location: 'Chittagong',
    totalBookings: 1
  },
  {
    id: 'student-sabbir',
    name: 'Sabbir Hossain',
    email: 'sabbir.hossain@test.com',
    phone: '+880 1822 556677',
    role: 'student',
    status: 'suspended',
    joinedAt: 'Jul 22, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    location: 'Sylhet',
    totalBookings: 1,
    suspendedReason: 'Repeated classroom disruption and disrespectful behavior reported by educators.'
  },
  {
    id: 'ahsan-rahman',
    name: 'Ahsan Rahman',
    email: 'ahsan.rahman@piratechai.com',
    phone: '+880 1819 876543',
    role: 'educator',
    status: 'active',
    joinedAt: 'Mar 12, 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'Dhanmondi, Dhaka',
    totalBookings: 24
  },
  {
    id: 'nafisa-kamal',
    name: 'Dr. Nafisa Kamal',
    email: 'dr.nafisa@piratechai.com',
    phone: '+880 1711 998877',
    role: 'educator',
    status: 'active',
    joinedAt: 'Feb 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    location: 'Gulshan, Dhaka',
    totalBookings: 38
  },
  {
    id: 'tanvir-hassan',
    name: 'Tanvir Hassan',
    email: 'tanvir.eee@buet.ac.bd',
    phone: '+880 1755 112233',
    role: 'educator',
    status: 'active',
    joinedAt: 'Sep 03, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    location: 'Palashi, Dhaka',
    totalBookings: 0
  },
  {
    id: 'tutor-farhan',
    name: 'Farhan Tariq',
    email: 'farhan.tariq@gmail.com',
    phone: '+880 1633 445566',
    role: 'educator',
    status: 'suspended',
    joinedAt: 'May 14, 2026',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    location: 'Uttara, Dhaka',
    totalBookings: 5,
    suspendedReason: 'Off-platform payment solicitation and harassment report under review.'
  }
];

export const initialReports: ReportItem[] = [
  {
    id: 'rep-101',
    reporterName: 'Nafisa Ahmed',
    reporterEmail: 'nafisa.ahmed@example.com',
    reporterRole: 'student',
    targetType: 'tutor',
    targetId: 'tutor-farhan',
    targetName: 'Farhan Tariq',
    category: 'Payment Issue',
    description: 'During the introductory trial call, the tutor requested that I pay direct bKash transfers rather than using the Pirate Chai booking escrow.',
    status: 'pending',
    createdAt: 'Today, 10:15 AM'
  },
  {
    id: 'rep-102',
    reporterName: 'Dr. Nafisa Kamal',
    reporterEmail: 'dr.nafisa@piratechai.com',
    reporterRole: 'educator',
    targetType: 'user',
    targetId: 'student-sabbir',
    targetName: 'Sabbir Hossain',
    category: 'Inappropriate Conduct',
    description: 'Student unmuted with abrasive audio during live lecture and posted non-academic disruptive comments in the classroom chat.',
    status: 'pending',
    createdAt: 'Yesterday, 3:45 PM'
  },
  {
    id: 'rep-103',
    reporterName: 'Tanveer Islam',
    reporterEmail: 'tanveer.islam@example.com',
    reporterRole: 'student',
    targetType: 'gig',
    targetId: 'class-sat-digital',
    targetName: 'SAT Digital Math Mastery & Secret Hacks',
    category: 'Misleading Content',
    description: 'Listing promised 12 real College Board practice exams with score predictions, but only gave 2 unverified scanned PDFs.',
    status: 'pending',
    createdAt: '2 days ago'
  },
  {
    id: 'rep-104',
    reporterName: 'Ahsan Rahman',
    reporterEmail: 'ahsan.rahman@piratechai.com',
    reporterRole: 'educator',
    targetType: 'user',
    targetId: 'student-spammer',
    targetName: 'Automated Bot Account',
    category: 'Spam / Plagiarism',
    description: 'Received repeated fake booking requests containing external Telegram link invitations.',
    status: 'resolved',
    createdAt: 'Sep 01, 2026',
    resolvedAt: 'Sep 02, 2026',
    resolutionNote: 'IP address blocked and user record terminated from database.'
  }
];

export const initialAuditLogs: AdminAuditLog[] = [
  {
    id: 'log-1',
    adminName: 'Zubair Al-Mamun',
    action: 'TUTOR_VERIFIED',
    targetType: 'tutor',
    targetId: 'ahsan-rahman',
    targetTitle: 'Ahsan Rahman',
    details: 'Verified BUET EEE Degree certificate and National NID. Approved badge issued.',
    timestamp: 'Aug 14, 2026 · 11:20 AM'
  },
  {
    id: 'log-2',
    adminName: 'Zubair Al-Mamun',
    action: 'GIG_APPROVED',
    targetType: 'gig',
    targetId: 'hsc-physics-mechanics',
    targetTitle: 'HSC Physics — Mechanics Intensive',
    details: 'Class syllabus verified against National HSC Curriculum standards.',
    timestamp: 'Aug 20, 2026 · 04:45 PM'
  },
  {
    id: 'log-3',
    adminName: 'Zubair Al-Mamun',
    action: 'USER_SUSPENDED',
    targetType: 'user',
    targetId: 'student-sabbir',
    targetTitle: 'Sabbir Hossain',
    details: 'Account suspended following report #rep-102 for disruptive conduct in video classroom.',
    timestamp: 'Yesterday · 04:10 PM'
  },
  {
    id: 'log-4',
    adminName: 'Zubair Al-Mamun',
    action: 'TUTOR_SUSPENDED',
    targetType: 'tutor',
    targetId: 'tutor-farhan',
    targetTitle: 'Farhan Tariq',
    details: 'Temporary suspension issued pending investigation of off-platform fee solicitation.',
    timestamp: 'Today · 11:00 AM'
  }
];
