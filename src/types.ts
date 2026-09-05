export interface Review {
  id: string;
  studentName: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  subject?: string;
}

export interface TimelineItem {
  period: string;
  role: string;
  institution: string;
  description: string;
}

export interface DaySchedule {
  day: string;
  status: 'Available' | 'Limited' | 'Unavailable';
  timeSlots: string[];
}

export interface Educator {
  id: string;
  name: string;
  professionalName: string;
  avatar: string;
  verified: boolean;
  verificationStatus?: 'pending' | 'approved' | 'rejected' | 'suspended';
  documents?: {
    idType: string;
    idNumber: string;
    certificateName: string;
    certificateUrl?: string;
    backgroundChecked: boolean;
    submittedAt: string;
    rejectionReason?: string;
  };
  rating: number;
  reviewCount: number;
  location: string;
  experience: number;
  subjects: string[];
  qualifications: string[];
  teachingFormats: ('1-on-1' | 'Batch classes')[];
  priceMin: number;
  priceMax: number;
  availableThisWeek: boolean;
  description: string;
  bio: string;
  teachingPhilosophy?: string;
  whoITeach?: string;
  timeline: TimelineItem[];
  portfolio: string[];
  schedule: DaySchedule[];
  reviews: Review[];
}

export interface ClassSession {
  sessionNumber: number;
  title: string;
  duration: string;
  topic: string;
}

export interface ClassItem {
  id: string;
  title: string;
  educatorId: string;
  educatorName: string;
  educatorAvatar: string;
  educatorVerified: boolean;
  subject: string;
  level: string; // e.g., 'HSC', 'SSC', 'University', 'Admission', 'Professional'
  description: string;
  outcomes: string[];
  sessions: number;
  duration: number; // minutes per session
  schedule: string[]; // e.g. ["Saturday & Tuesday · 8:00 PM"]
  timeSlot: string;
  startDate: string;
  maxStudents: number;
  enrolledStudents: number;
  price: number; // in BDT (৳)
  rating: number;
  image: string;
  status: 'Enrollment open' | 'Almost full' | 'Filling fast';
  moderationStatus?: 'approved' | 'pending' | 'hidden' | 'rejected';
  rejectionReason?: string;
  curriculum: ClassSession[];
}

export interface BookingRequest {
  id: string;
  educatorId: string;
  educatorName: string;
  educatorAvatar: string;
  studentName: string;
  studentPhone: string;
  studentEmail?: string;
  subject: string;
  goal: string;
  preferredDate: string;
  preferredTime: string;
  duration: string;
  format: string;
  budget: string;
  status: 'pending' | 'accepted' | 'declined';
  bookingState?: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  paymentStatus?: 'Escrowed' | 'Paid' | 'Pending' | 'Refunded';
  sessionStatus?: 'Scheduled' | 'In Progress' | 'Completed' | 'Disputed';
  createdAt: string;
}

export interface EnrollmentRecord {
  id: string;
  classId: string;
  classTitle: string;
  educatorName: string;
  educatorAvatar: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  price: number;
  schedule: string;
  enrolledAt: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'educator' | 'admin';
  status: 'active' | 'suspended';
  joinedAt: string;
  avatar: string;
  location?: string;
  totalBookings?: number;
  suspendedReason?: string;
}

export interface ReportItem {
  id: string;
  reporterName: string;
  reporterEmail: string;
  reporterRole: 'student' | 'educator';
  targetType: 'tutor' | 'gig' | 'user';
  targetId: string;
  targetName: string;
  category: 'Inappropriate Conduct' | 'Misleading Content' | 'Payment Issue' | 'Spam / Plagiarism' | 'Quality Concern' | 'Other';
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
  resolutionNote?: string;
}

export interface AdminAuditLog {
  id: string;
  adminName: string;
  action: string;
  targetType: 'tutor' | 'gig' | 'user' | 'report' | 'booking';
  targetId: string;
  targetTitle: string;
  details: string;
  timestamp: string;
}

export interface UserSession {
  isAuthenticated: boolean;
  role: 'student' | 'educator' | 'admin' | 'guest';
  id: string;
  name: string;
  email: string;
  avatar: string;
  status?: 'active' | 'suspended';
  suspendedReason?: string;
  phone?: string;
  location?: string;
  educationLevel?: string;
  subjects?: string[];
  // For educator
  professionalName?: string;
  experience?: number;
  startingPrice?: number;
  bio?: string;
}
