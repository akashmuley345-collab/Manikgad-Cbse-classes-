
export type UserRole = 'owner' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string; // Links to student record if role is student
  teacherId?: string; // Links to teacher record if role is teacher
}

export interface AcademicSession {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface StudentNote {
  id: string;
  content: string;
  authorName: string;
  date: string;
  category: 'Academic' | 'Behavioral' | 'Achievement' | 'General';
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  courseId: string;
  sessionId: string;
}

export interface TestMark {
  id: string;
  testName: string;
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  date: string;
  sessionId: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  courseId: string;
  uploadDate: string;
  fileName: string;
  fileData?: string; // Base64 data for local simulation
  description: string;
  authorName: string;
  sessionId: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  email: string;
  attendance: number;
  gpa: number;
  status: 'active' | 'inactive';
  lastAssessment: string;
  enrollmentDate: string;
  photo?: string;
  address?: string;
  parentMobile?: string;
  whatsappNo?: string;
  courseIds?: string[];
  notes?: StudentNote[];
  attendanceHistory?: AttendanceRecord[];
  testMarks?: TestMark[];
  sessionId: string; // Associated session for the record
  totalFees: number; // Total fees applicable to the student
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  experience: number;
  status: 'active' | 'on-leave';
  image?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  studentsCount: number;
  credits: number;
  schedule: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  mode: 'Cash' | 'Online' | 'Cheque';
  category: 'Tuition' | 'Transport' | 'Exam' | 'Other';
  remarks?: string;
  sessionId: string;
}

export enum NavigationTab {
  Dashboard = 'dashboard',
  Students = 'students',
  Teachers = 'teachers',
  Courses = 'courses',
  Attendance = 'attendance',
  Admission = 'admission',
  Fees = 'fees',
  Exams = 'exams',
  Analytics = 'analytics',
  MyProfile = 'my-profile',
  MyFees = 'my-fees',
  StudyMaterials = 'study-materials'
}
