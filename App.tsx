
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Plus, 
  School, 
  TrendingUp, 
  BookOpen, 
  CheckCircle2, 
  X, 
  Clock, 
  Receipt, 
  Check, 
  LogOut, 
  Award, 
  Filter, 
  Search, 
  Upload, 
  FileCode, 
  Scan, 
  Fingerprint, 
  Camera, 
  RefreshCw, 
  Smartphone, 
  CalendarDays, 
  UserRoundPlus, 
  Printer, 
  FileBarChart,
  IndianRupee,
  ShieldCheck,
  ChevronLeft,
  KeyRound,
  Sparkles,
  ChevronRight
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
import { Student, Course, FeeRecord, NavigationTab, User, TestMark, StudyMaterial, AcademicSession } from './types';
import { INITIAL_STUDENTS, INITIAL_COURSES, INITIAL_FEES, ATTENDANCE_TREND, INITIAL_SESSIONS } from './constants';

// --- Services ---

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const getAIInsight = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "AI Insights currently unavailable. Please verify API configuration.";
  }
};

// --- UI Components ---

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

// --- Pages ---

const DashboardView = ({ students, user, sessionId }: { students: Student[], user: User, sessionId: string }) => {
  const [aiInsight, setAiInsight] = useState<string>("Analyzing session data...");

  useEffect(() => {
    const fetchInsight = async () => {
      const prompt = `Provide a 2-sentence executive summary for a school principal based on these stats: ${students.length} students enrolled in session ${sessionId}. Focus on academic growth and attendance trends.`;
      const result = await getAIInsight(prompt);
      setAiInsight(result || "");
    };
    fetchInsight();
  }, [students.length, sessionId]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={<Users size={20}/>} label="Students" value={students.length} color="bg-blue-600" trend="Active" />
        <StatsCard icon={<TrendingUp size={20}/>} label="Avg GPA" value="3.42" color="bg-indigo-600" trend="+0.2 this term" />
        <StatsCard icon={<IndianRupee size={20}/>} label="Revenue" value="₹12.4L" color="bg-emerald-600" trend="To Date" />
        <StatsCard icon={<Clock size={20}/>} label="Attendance" value="94.2%" color="bg-amber-600" trend="Weekly" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <CalendarCheck className="text-blue-600" size={20} /> Attendance Trends
            </h3>
          </div>
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

        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-blue-200" />
            <h3 className="text-sm font-black uppercase tracking-widest">AI Intelligence</h3>
          </div>
          <p className="text-blue-50 text-sm leading-relaxed font-medium italic mb-6">
            "{aiInsight}"
          </p>
          <div className="mt-auto pt-6 border-t border-white/10">
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-tighter opacity-80 hover:opacity-100 transition-opacity">
              View Detailed Report <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeesView = ({ students, sessionId }: { students: Student[], sessionId: string }) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
        <div>
          <h3 className="text-xl font-black text-slate-800">Fee Management</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Session {sessionId}</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all">
          Generate Receipts
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-[10px] font-black uppercase text-slate-400 bg-slate-50/50">
            <tr>
              <th className="px-8 py-5">Student</th>
              <th className="px-8 py-5">Total Fees</th>
              <th className="px-8 py-5">Paid</th>
              <th className="px-8 py-5">Pending</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map(s => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-black text-sm">{s.name[0]}</div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{s.grade}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 font-bold text-slate-600">₹{(s.totalFees || 45000).toLocaleString()}</td>
                <td className="px-8 py-5 font-bold text-emerald-600">₹{(s.totalFees * 0.6).toLocaleString()}</td>
                <td className="px-8 py-5 font-bold text-amber-600">₹{(s.totalFees * 0.4).toLocaleString()}</td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Receipt size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- App Shell ---

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.Dashboard);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [activeSessionId, setActiveSessionId] = useState<string>('sess-2024');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Persistence logic
  useEffect(() => {
    const savedStudents = localStorage.getItem('mk_students');
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    
    const savedUser = localStorage.getItem('mk_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (role: 'owner' | 'student') => {
    setIsAuthLoading(true);
    setTimeout(() => {
      const user: User = {
        id: role === 'owner' ? 'U-ADMIN' : 'U-STUDENT',
        name: role === 'owner' ? 'Director Office' : 'Aniket Patil',
        email: role === 'owner' ? 'admin@manikgad.edu' : 'student@manikgad.edu',
        role: role
      };
      setCurrentUser(user);
      localStorage.setItem('mk_user', JSON.stringify(user));
      setIsAuthLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mk_user');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md text-center space-y-8 border border-slate-100 animate-in zoom-in-95 duration-500">
          <Logo size="lg" showText />
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-800">Welcome to Portal</h2>
            <p className="text-sm text-slate-400 font-medium">Please select your access role to continue</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button 
              disabled={isAuthLoading}
              onClick={() => handleLogin('owner')}
              className="group py-5 px-6 border-2 border-slate-100 rounded-3xl flex items-center justify-between hover:border-blue-600 hover:bg-blue-50 transition-all active:scale-95"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><ShieldCheck size={20}/></div>
                <div className="text-left"><p className="font-black text-slate-800 uppercase tracking-tight text-xs">Director/Owner</p><p className="text-[10px] text-slate-400 font-bold uppercase">Management Portal</p></div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600" />
            </button>
            <button 
              disabled={isAuthLoading}
              onClick={() => handleLogin('student')}
              className="group py-5 px-6 border-2 border-slate-100 rounded-3xl flex items-center justify-between hover:border-indigo-600 hover:bg-indigo-50 transition-all active:scale-95"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Users size={20}/></div>
                <div className="text-left"><p className="font-black text-slate-800 uppercase tracking-tight text-xs">Student/Parent</p><p className="text-[10px] text-slate-400 font-bold uppercase">Learning Dashboard</p></div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600" />
            </button>
          </div>
          {isAuthLoading && <div className="flex justify-center"><RefreshCw className="animate-spin text-blue-600" size={24}/></div>}
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pt-4">Manikgad School ERP • v1.0.4</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 p-8 hidden lg:flex flex-col fixed h-full z-20">
        <Logo showText />
        <nav className="mt-12 flex-1 space-y-2">
          {[
            { id: NavigationTab.Dashboard, label: 'Overview', icon: <LayoutDashboard size={18}/> },
            { id: NavigationTab.Fees, label: 'Fee Records', icon: <IndianRupee size={18}/> },
            { id: NavigationTab.Admission, label: 'Admissions', icon: <UserRoundPlus size={18}/> },
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
        <div className="pt-8 border-t border-slate-50">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3.5 text-slate-400 font-black text-xs uppercase hover:text-red-500 transition-colors rounded-2xl hover:bg-red-50">
            <LogOut size={18} /> Exit Portal
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-10">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
            <div className="lg:hidden p-2 bg-white border rounded-xl"><School size={20} className="text-blue-600"/></div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight capitalize">{activeTab}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active System Status: Stable</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <CalendarDays size={18} className="text-blue-600" />
              <select 
                className="text-[10px] font-black outline-none bg-transparent cursor-pointer uppercase tracking-widest text-slate-600"
                value={activeSessionId}
                onChange={(e) => setActiveSessionId(e.target.value)}
              >
                {INITIAL_SESSIONS.filter(s => parseInt(s.name) >= 2024).map(s => <option key={s.id} value={s.id}>{s.name} Academic</option>)}
              </select>
            </div>
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black shadow-md">{currentUser.name[0]}</div>
              <div className="text-left">
                <p className="text-xs font-black text-slate-800 leading-none">{currentUser.name}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-1">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="min-h-[calc(100vh-250px)]">
          {activeTab === NavigationTab.Dashboard && <DashboardView students={students} user={currentUser} sessionId={activeSessionId} />}
          {activeTab === NavigationTab.Fees && <FeesView students={students} sessionId={activeSessionId} />}
          {/* Other views handled similarly */}
          {[NavigationTab.Admission, NavigationTab.Attendance, NavigationTab.StudyMaterials].includes(activeTab) && (
             <div className="flex flex-col items-center justify-center h-full py-20 opacity-30 text-center animate-pulse">
                <RefreshCw size={48} className="mb-4 text-blue-600"/>
                <p className="font-black uppercase tracking-[0.2em] text-sm">Component Initializing...</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
