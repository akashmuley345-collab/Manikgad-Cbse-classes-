import { Student, Teacher, Course, FeeRecord, AcademicSession } from './types';

export const INITIAL_SESSIONS: AcademicSession[] = [
  { id: 'sess-2023', name: '2023-24', startDate: '2023-06-01', endDate: '2024-05-31', isCurrent: false },
  { id: 'sess-2024', name: '2024-25', startDate: '2024-06-01', endDate: '2025-05-31', isCurrent: true },
  { id: 'sess-2025', name: '2025-26', startDate: '2025-06-01', endDate: '2026-05-31', isCurrent: false },
  { id: 'sess-2026', name: '2026-27', startDate: '2026-06-01', endDate: '2027-05-31', isCurrent: false },
  { id: 'sess-2027', name: '2027-28', startDate: '2027-06-01', endDate: '2028-05-31', isCurrent: false },
  { id: 'sess-2028', name: '2028-29', startDate: '2028-06-01', endDate: '2029-05-31', isCurrent: false },
  { id: 'sess-2029', name: '2029-30', startDate: '2029-06-01', endDate: '2030-05-31', isCurrent: false },
  { id: 'sess-2030', name: '2030-31', startDate: '2030-06-01', endDate: '2031-05-31', isCurrent: false },
  { id: 'sess-2031', name: '2031-32', startDate: '2031-06-01', endDate: '2032-05-31', isCurrent: false },
  { id: 'sess-2032', name: '2032-33', startDate: '2032-06-01', endDate: '2033-05-31', isCurrent: false },
  { id: 'sess-2033', name: '2033-34', startDate: '2033-06-01', endDate: '2034-05-31', isCurrent: false },
  { id: 'sess-2034', name: '2034-35', startDate: '2034-06-01', endDate: '2035-05-31', isCurrent: false },
  { id: 'sess-2035', name: '2035-36', startDate: '2035-06-01', endDate: '2036-05-31', isCurrent: false },
  { id: 'sess-2036', name: '2036-37', startDate: '2036-06-01', endDate: '2037-05-31', isCurrent: false },
  { id: 'sess-2037', name: '2037-38', startDate: '2037-06-01', endDate: '2038-05-31', isCurrent: false },
  { id: 'sess-2038', name: '2038-39', startDate: '2038-06-01', endDate: '2039-05-31', isCurrent: false },
  { id: 'sess-2039', name: '2039-40', startDate: '2039-06-01', endDate: '2040-05-31', isCurrent: false },
  { id: 'sess-2040', name: '2040-41', startDate: '2040-06-01', endDate: '2041-05-31', isCurrent: false },
  { id: 'sess-2041', name: '2041-42', startDate: '2041-06-01', endDate: '2042-05-31', isCurrent: false },
  { id: 'sess-2042', name: '2042-43', startDate: '2042-06-01', endDate: '2043-05-31', isCurrent: false },
  { id: 'sess-2043', name: '2043-44', startDate: '2043-06-01', endDate: '2044-05-31', isCurrent: false },
  { id: 'sess-2044', name: '2044-45', startDate: '2044-06-01', endDate: '2045-05-31', isCurrent: false },
  { id: 'sess-2045', name: '2045-46', startDate: '2045-06-01', endDate: '2046-05-31', isCurrent: false },
  { id: 'sess-2046', name: '2046-47', startDate: '2046-06-01', endDate: '2047-05-31', isCurrent: false },
  { id: 'sess-2047', name: '2047-48', startDate: '2047-06-01', endDate: '2048-05-31', isCurrent: false },
  { id: 'sess-2048', name: '2048-49', startDate: '2048-06-01', endDate: '2049-05-31', isCurrent: false },
  { id: 'sess-2049', name: '2049-50', startDate: '2049-06-01', endDate: '2050-05-31', isCurrent: false },
  { id: 'sess-2050', name: '2050-51', startDate: '2050-06-01', endDate: '2051-05-31', isCurrent: false },
  { id: 'sess-2051', name: '2051-52', startDate: '2051-06-01', endDate: '2052-05-31', isCurrent: false },
  { id: 'sess-2052', name: '2052-53', startDate: '2052-06-01', endDate: '2053-05-31', isCurrent: false },
  { id: 'sess-2053', name: '2053-54', startDate: '2053-06-01', endDate: '2054-05-31', isCurrent: false },
  { id: 'sess-2054', name: '2054-55', startDate: '2054-06-01', endDate: '2055-05-31', isCurrent: false },
  { id: 'sess-2055', name: '2055-56', startDate: '2055-06-01', endDate: '2056-05-31', isCurrent: false },
  { id: 'sess-2056', name: '2056-57', startDate: '2056-06-01', endDate: '2057-05-31', isCurrent: false },
  { id: 'sess-2057', name: '2057-58', startDate: '2057-06-01', endDate: '2058-05-31', isCurrent: false },
  { id: 'sess-2058', name: '2058-59', startDate: '2058-06-01', endDate: '2059-05-31', isCurrent: false },
  { id: 'sess-2059', name: '2059-60', startDate: '2059-06-01', endDate: '2060-05-31', isCurrent: false },
  { id: 'sess-2060', name: '2060-61', startDate: '2060-06-01', endDate: '2061-05-31', isCurrent: false },
  { id: 'sess-2061', name: '2061-62', startDate: '2061-06-01', endDate: '2062-05-31', isCurrent: false },
  { id: 'sess-2062', name: '2062-63', startDate: '2062-06-01', endDate: '2063-05-31', isCurrent: false },
  { id: 'sess-2063', name: '2063-64', startDate: '2063-06-01', endDate: '2064-05-31', isCurrent: false },
  { id: 'sess-2064', name: '2064-65', startDate: '2064-06-01', endDate: '2065-05-31', isCurrent: false },
  { id: 'sess-2065', name: '2065-66', startDate: '2065-06-01', endDate: '2066-05-31', isCurrent: false },
  { id: 'sess-2066', name: '2066-67', startDate: '2066-06-01', endDate: '2067-05-31', isCurrent: false },
  { id: 'sess-2067', name: '2067-68', startDate: '2067-06-01', endDate: '2068-05-31', isCurrent: false },
  { id: 'sess-2068', name: '2068-69', startDate: '2068-06-01', endDate: '2069-05-31', isCurrent: false },
  { id: 'sess-2069', name: '2069-70', startDate: '2069-06-01', endDate: '2070-05-31', isCurrent: false },
  { id: 'sess-2070', name: '2070-71', startDate: '2070-06-01', endDate: '2071-05-31', isCurrent: false },
  { id: 'sess-2071', name: '2071-72', startDate: '2071-06-01', endDate: '2072-05-31', isCurrent: false },
  { id: 'sess-2072', name: '2072-73', startDate: '2072-06-01', endDate: '2073-05-31', isCurrent: false },
  { id: 'sess-2073', name: '2073-74', startDate: '2073-06-01', endDate: '2074-05-31', isCurrent: false },
  { id: 'sess-2074', name: '2074-75', startDate: '2074-06-01', endDate: '2075-05-31', isCurrent: false },
];

export const INITIAL_STUDENTS: Student[] = [
  { 
    id: 'S101', name: 'Alice Thompson', grade: '10th', email: 'alice.t@school.edu', attendance: 95, gpa: 3.8, status: 'active', lastAssessment: '2023-11-15', enrollmentDate: '2022-09-01', photo: 'https://i.pravatar.cc/150?u=alice', address: '123 Maple St, Springfield', parentMobile: '555-0199', whatsappNo: '555-0199', courseIds: ['C301', 'C302'],
    sessionId: 'sess-2024',
    totalFees: 55000,
    notes: [
      { id: 'N1', content: 'Outstanding performance in the mid-term exams.', authorName: 'Dr. Sarah Miller', date: '2023-11-20', category: 'Academic' },
      { id: 'N2', content: 'Led the debating team to victory in the inter-school competition.', authorName: 'Ms. Emily Brown', date: '2023-12-05', category: 'Achievement' }
    ],
    attendanceHistory: [
      { date: '2024-07-01', status: 'present', courseId: 'C301', sessionId: 'sess-2024' }, 
      { date: '2024-07-02', status: 'present', courseId: 'C301', sessionId: 'sess-2024' }
    ],
    testMarks: [
      { id: 'M1', testName: 'First Term', subject: 'Mathematics', maxMarks: 100, obtainedMarks: 92, date: '2023-10-15', sessionId: 'sess-2024' },
      { id: 'M2', testName: 'Unit Test I', subject: 'General Science', maxMarks: 50, obtainedMarks: 45, date: '2023-09-20', sessionId: 'sess-2024' }
    ]
  },
  { id: 'S102', name: 'Bob Roberts', grade: '9th', email: 'bob.r@school.edu', attendance: 82, gpa: 2.9, status: 'active', lastAssessment: '2023-11-12', enrollmentDate: '2022-09-01', photo: 'https://i.pravatar.cc/150?u=bob', address: '456 Oak Ave, Springfield', parentMobile: '555-0188', whatsappNo: '555-0188', courseIds: ['C302'], notes: [], attendanceHistory: [], testMarks: [], sessionId: 'sess-2024', totalFees: 45000 },
  { id: 'S103', name: 'Charlie Davis', grade: '8th', email: 'charlie.d@school.edu', attendance: 98, gpa: 4.0, status: 'active', lastAssessment: '2023-11-18', enrollmentDate: '2021-09-01', photo: 'https://i.pravatar.cc/150?u=charlie', address: '789 Pine Rd, Springfield', parentMobile: '555-0177', whatsappNo: '555-0177', courseIds: ['C301', 'C303'], notes: [], attendanceHistory: [], testMarks: [], sessionId: 'sess-2024', totalFees: 45000 },
  { id: 'S104', name: 'Diana Prince', grade: '7th', email: 'diana.p@school.edu', attendance: 88, gpa: 3.5, status: 'active', lastAssessment: '2023-11-10', enrollmentDate: '2023-09-01', photo: 'https://i.pravatar.cc/150?u=diana', address: '321 Elm Blvd, Springfield', parentMobile: '555-0166', whatsappNo: '555-0166', courseIds: ['C302', 'C303'], notes: [], attendanceHistory: [], testMarks: [], sessionId: 'sess-2024', totalFees: 40000 },
  { id: 'S105', name: 'Evan Wright', grade: '6th', email: 'evan.w@school.edu', attendance: 75, gpa: 2.4, status: 'active', lastAssessment: '2023-11-05', enrollmentDate: '2020-09-01', photo: 'https://i.pravatar.cc/150?u=evan', address: '654 Cedar Ln, Springfield', parentMobile: '555-0155', whatsappNo: '555-0155', courseIds: ['C301'], notes: [], attendanceHistory: [], testMarks: [], sessionId: 'sess-2023', totalFees: 35000 },
  { id: 'S106', name: 'Fiona Gallagher', grade: '5th', email: 'fiona.g@school.edu', attendance: 92, gpa: 3.2, status: 'active', lastAssessment: '2023-11-14', enrollmentDate: '2022-09-01', photo: 'https://i.pravatar.cc/150?u=fiona', address: '987 Birch Dr, Springfield', parentMobile: '555-0144', whatsappNo: '555-0144', courseIds: ['C303'], notes: [], attendanceHistory: [], testMarks: [], sessionId: 'sess-2023', totalFees: 35000 },
];

export const INITIAL_TEACHERS: Teacher[] = [
  { id: 'T201', name: 'Dr. Sarah Miller', subject: 'Mathematics', email: 's.miller@school.edu', phone: '555-0101', experience: 12, status: 'active', image: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 'T202', name: 'Mr. James Wilson', subject: 'Science', email: 'j.wilson@school.edu', phone: '555-0102', experience: 8, status: 'active', image: 'https://i.pravatar.cc/150?u=james' },
  { id: 'T203', name: 'Ms. Emily Brown', subject: 'English', email: 'e.brown@school.edu', phone: '555-0103', experience: 5, status: 'active', image: 'https://i.pravatar.cc/150?u=emily' },
  { id: 'T204', name: 'Prof. Alan Turing', subject: 'Computer Science', email: 'a.turing@school.edu', phone: '555-0104', experience: 20, status: 'active', image: 'https://i.pravatar.cc/150?u=alan' },
];

export const INITIAL_COURSES: Course[] = [
  { id: 'C301', name: 'Mathematics', code: 'MATH-101', teacherId: 'T201', studentsCount: 0, credits: 4, schedule: 'Mon/Wed 09:00 AM' },
  { id: 'C302', name: 'General Science', code: 'SCI-101', teacherId: 'T202', studentsCount: 0, credits: 4, schedule: 'Tue/Thu 11:00 AM' },
  { id: 'C303', name: 'English Language', code: 'ENG-101', teacherId: 'T203', studentsCount: 0, credits: 3, schedule: 'Fri 10:00 AM' },
];

export const INITIAL_FEES: FeeRecord[] = [
  { id: 'F001', studentId: 'S101', studentName: 'Alice Thompson', amount: 5000, date: '2023-12-01', mode: 'Online', category: 'Tuition', remarks: 'First Installment', sessionId: 'sess-2024' },
  { id: 'F002', studentId: 'S103', studentName: 'Charlie Davis', amount: 2000, date: '2023-12-05', mode: 'Cash', category: 'Transport', remarks: 'Dec Month', sessionId: 'sess-2024' },
  { id: 'F003', studentId: 'S106', studentName: 'Fiona Gallagher', amount: 1200, date: '2023-12-10', mode: 'Cheque', category: 'Exam', remarks: 'Mid-term fee', sessionId: 'sess-2023' },
];

export const GRADES_DISTRIBUTION = [
  { name: 'A', value: 35 },
  { name: 'B', value: 40 },
  { name: 'C', value: 15 },
  { name: 'D', value: 7 },
  { name: 'F', value: 3 },
];

export const ATTENDANCE_TREND = [
  { name: 'Mon', rate: 94 },
  { name: 'Tue', rate: 96 },
  { name: 'Wed', rate: 93 },
  { name: 'Thu', rate: 89 },
  { name: 'Fri', rate: 91 },
];