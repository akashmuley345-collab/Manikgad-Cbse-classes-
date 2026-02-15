
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Plus, 
  School, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Receipt, 
  LogOut, 
  RefreshCw, 
  CalendarDays, 
  UserRoundPlus, 
  IndianRupee,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Trash2,
  UserPlus
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { Student, NavigationTab, User, AcademicSession, StudyMaterial } from './types';
import { INITIAL_STUDENTS, ATTENDANCE_TREND, INITIAL_SESSIONS } from './constants';

// --- Gemini AI Service ---
const getAIInsight = async (prompt: string) => {
  // Accessing process.env.API_KEY as per guidelines
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("Gemini API Key missing in process.env");
    return "AI Insights currently unavailable. Configuration required.";
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "AI Insights currently unavailable. Check Netlify system logs.";
  }
};

// --- Reusable UI Components ---

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg', showText?: boolean }> = ({ size = 'md', showText = false }) => {
  const iconSize = size === 'sm' ? 20 : size === 'md' ? 24 : 48;
  return (
    <div className="flex items-center gap-3">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-blue-200">
        <School size={iconSize} className="text-white" />
      </div>
      {showText && (
        <div className="flex flex-col text-left">
          <h1 className="text-xl font-black tracking-tighter text-slate-800 uppercase">
            MANIKGAD<span className="text-blue-600">.</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CBSE CLASSES</p>
        </div>
      )}
    </div>
  );
};

const StatsCard = ({ icon, label, value, color, trend }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} text-white shadow-lg shadow-current/10`}>{icon}</div>
      <span className="text-[10px] font-black px-2 py-1 bg-slate-50 rounded-full text-slate-400 uppercase tracking-tight">{trend}</span>
    </div>
    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</div>
    <div className="text-2xl font-black text-slate-800">{value}</div>
  </div>
);

// --- Sub-Views ---

const DashboardView = ({ students, sessionId }: { students: Student[], sessionId: string }) => {
  const [aiInsight, setAiInsight] = useState<string>("Synthesizing academic data...");

  useEffect(() => {
    const fetchInsight = async () => {
      const prompt = `Give a 2-sentence summary of school performance: ${students.length} students, session ${sessionId}. Be encouraging and mention that the environment is fully synchronized.`;
      const result = await getAIInsight(prompt);
      setAiInsight(result || "");
    };
    fetchInsight();
  }, [students.length, sessionId]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={<Users size={20}/>} label="Enrolled" value={students.length} color="bg-blue-600" trend="Active" />
        <StatsCard icon={<TrendingUp size={20}/>} label="Avg GPA" value="3.42" color="bg-indigo-600" trend="+0.1% YoY" />
        <StatsCard icon={<IndianRupee size={20}/>} label="Revenue" value="₹14.2L" color="bg-emerald-600" trend="Term 1" />
        <StatsCard icon={<Clock size={20}/>} label="Attendance" value="96.8%" color="bg-amber-600" trend="On Track" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2 mb-8">
            <CalendarCheck className="text-blue-600" size={20} /> Weekly Attendance
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ATTENDANCE_TREND}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} domain={[0, 100]} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-blue-200" />
            <h3 className="text-sm font-black uppercase tracking-widest">Executive Insight</h3>
          </div>
          <p className="text-blue-50 text-sm leading-relaxed font-medium italic mb-6">
            "{aiInsight}"
          </p>
          <div className="mt-auto pt-6 border-t border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Powered by Gemini 3 Flash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdmissionView = ({ onAddStudent }: { onAddStudent: (s: Student) => void }) => {
  const [formData, setFormData] = useState({ name: '', grade: '10th', email: '', parentMobile: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    const newStudent: Student = {
      id: `S${Date.now()}`,
      ...formData,
      attendance: 100,
      gpa: 0,
      status: 'active',
      lastAssessment: new Date().toISOString().split('T')[0],
      enrollmentDate: new Date().toISOString().split('T')[0],
      sessionId: 'sess-2024',
      totalFees: 45000,
      notes: [],
      attendanceHistory: [],
      testMarks: []
    };
    onAddStudent(newStudent);
    setFormData({ name: '', grade: '10th', email: '', parentMobile: '' });
    alert("Student admitted successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <UserPlus className="text-blue-600" size={24} />
        <h3 className="text-xl font-black text-slate-800">New Admission Form</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Student Name</label>
            <input 
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 ring-blue-500/20 outline-none font-medium"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Rahul Sharma"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
            <input 
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 ring-blue-500/20 outline-none font-medium"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              placeholder="rahul@example.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class/Grade</label>
            <select 
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 outline-none font-medium"
              value={formData.grade}
              onChange={e => setFormData({...formData, grade: e.target.value})}
            >
              {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(g => (
                <option key={g} value={g}>{g} Grade</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Parent Mobile</label>
            <input 
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 ring-blue-500/20 outline-none font-medium"
              value={formData.parentMobile}
              onChange={e => setFormData({...formData, parentMobile: e.target.value})}
              placeholder="10-digit number"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all">
          Confirm Admission
        </button>
      </form>
    </div>
  );
};

const AttendanceView = ({ students, onToggle }: { students: Student[], onToggle: (id: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-black text-slate-800">Attendance Register</h3>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm font-medium"
            placeholder="Search students..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Student</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Class</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">{s.name[0]}</div>
                    <span className="font-bold text-slate-800">{s.name}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-bold text-slate-400 uppercase">{s.grade}</td>
                <td className="px-8 py-5">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => onToggle(s.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[10px] uppercase transition-all ${s.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}
                    >
                      {s.status === 'active' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {s.status === 'active' ? 'Present' : 'Absent'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StudyMaterialsView = () => {
  const materials = [
    { id: '1', title: 'Calculus Basics', subject: 'Math', date: '2024-03-10', type: 'PDF' },
    { id: '2', title: 'English Grammar Vol 1', subject: 'English', date: '2024-03-08', type: 'EPUB' },
    { id: '3', title: 'Laws of Motion', subject: 'Physics', date: '2024-03-05', type: 'PDF' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map(m => (
        <div key={m.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
              <FileText size={24} />
            </div>
            <button className="text-slate-300 hover:text-blue-600 transition-colors">
              <Download size={20} />
            </button>
          </div>
          <h4 className="font-black text-slate-800 mb-1">{m.title}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.subject} • {m.date}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="px-2 py-1 bg-slate-50 text-slate-400 rounded-md text-[9px] font-black uppercase">{m.type}</span>
            <button className="text-[10px] font-black uppercase text-blue-600 tracking-tighter hover:underline">View Material</button>
          </div>
        </div>
      ))}
      <div className="border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-8 text-slate-300 hover:border-blue-200 hover:bg-slate-50/50 transition-all cursor-pointer">
        <Plus size={32} className="mb-2" />
        <p className="text-xs font-black uppercase">Upload Resource</p>
      </div>
    </div>
  );
};

// --- App Shell ---

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.Dashboard);
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('mk_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  const [activeSessionId, setActiveSessionId] = useState<string>('sess-2024');

  useEffect(() => {
    localStorage.setItem('mk_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    const savedUser = localStorage.getItem('mk_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (role: 'owner' | 'student') => {
    const user: User = {
      id: role === 'owner' ? 'U-ADMIN' : 'U-STUDENT',
      name: role === 'owner' ? 'Principal Office' : 'Karan Deshmukh',
      email: role === 'owner' ? 'admin@manikgad.edu' : 'student@manikgad.edu',
      role: role
    };
    setCurrentUser(user);
    localStorage.setItem('mk_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mk_user');
  };

  const toggleStudentStatus = (id: string) => {
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ));
  };

  const addStudent = (s: Student) => setStudents(prev => [s, ...prev]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md text-center space-y-8 animate-in zoom-in-95 duration-500">
          <Logo size="lg" showText />
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800">School Portal</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Select Role to Access Dashboard</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button onClick={() => handleLogin('owner')} className="group p-6 border-2 border-slate-50 rounded-[2rem] flex items-center justify-between hover:border-blue-600 hover:bg-blue-50 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white"><ShieldCheck size={20}/></div>
                <div className="text-left font-black uppercase text-xs tracking-tight">Management</div>
              </div>
              <ChevronRight size={18} className="text-slate-200 group-hover:text-blue-600" />
            </button>
            <button onClick={() => handleLogin('student')} className="group p-6 border-2 border-slate-50 rounded-[2rem] flex items-center justify-between hover:border-indigo-600 hover:bg-indigo-50 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white"><Users size={20}/></div>
                <div className="text-left font-black uppercase text-xs tracking-tight">Student / Parent</div>
              </div>
              <ChevronRight size={18} className="text-slate-200 group-hover:text-indigo-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-72 bg-white border-r border-slate-100 p-8 hidden lg:flex flex-col fixed h-full z-20">
        <Logo showText />
        <nav className="mt-12 flex-1 space-y-2">
          {[
            { id: NavigationTab.Dashboard, label: 'Overview', icon: <LayoutDashboard size={18}/> },
            { id: NavigationTab.Admission, label: 'Admission', icon: <UserRoundPlus size={18}/> },
            { id: NavigationTab.Attendance, label: 'Attendance', icon: <CalendarCheck size={18}/> },
            { id: NavigationTab.StudyMaterials, label: 'Resources', icon: <BookOpen size={18}/> },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as NavigationTab)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-5 py-3 text-slate-300 font-black text-xs uppercase hover:text-red-500 transition-colors">
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      <main className="flex-1 lg:ml-72 p-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter capitalize">{activeTab}</h2>
            <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Live System</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-3">
              <CalendarDays size={18} className="text-blue-600" />
              <select 
                className="text-[10px] font-black outline-none bg-transparent uppercase tracking-widest text-slate-500"
                value={activeSessionId}
                onChange={(e) => setActiveSessionId(e.target.value)}
              >
                {INITIAL_SESSIONS.filter(s => parseInt(s.name) >= 2024).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center font-black text-slate-600 shadow-sm">{currentUser.name[0]}</div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {activeTab === NavigationTab.Dashboard && <DashboardView students={students} sessionId={activeSessionId} />}
          {activeTab === NavigationTab.Admission && <AdmissionView onAddStudent={addStudent} />}
          {activeTab === NavigationTab.Attendance && <AttendanceView students={students} onToggle={toggleStudentStatus} />}
          {activeTab === NavigationTab.StudyMaterials && <StudyMaterialsView />}
        </div>
      </main>
    </div>
  );
}
