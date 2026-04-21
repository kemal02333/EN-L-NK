import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Home, 
  Users, 
  ClipboardList, 
  Settings, 
  Bell, 
  Search, 
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Plus,
  Lock,
  Unlock,
  PlusCircle,
  MapPin,
  BookOpen,
  PieChart,
  Zap,
  Youtube,
  MessageCircle,
  Gamepad2,
  Download,
  Layout as LayoutIcon,
  X,
  UserPlus,
  Globe,
  Video
} from 'lucide-react';
import { Student, Task, Activity, Permission, Notification } from './types';
import { STUDENTS, TASKS, ACTIVITIES, CATEGORIES } from './constants';

type View = 'home' | 'students' | 'tasks' | 'rules' | 'student-detail' | 'task-detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  // App State
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Caner Yıldız ödevi teslim etti.', time: '5 dk önce', read: false },
    { id: '2', title: 'Sınıf gelişim oranı %84\'e ulaştı.', time: '1 sa önce', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [classTimeLimit, setClassTimeLimit] = useState(2.5);
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 'p1', title: 'Eğitim Uygulamaları', desc: 'Duolingo, Khan Academy...', enabled: true, color: 'bg-secondary-container text-secondary', icon: 'book' },
    { id: 'p2', title: 'Sosyal Medya', desc: 'Instagram, TikTok...', enabled: false, color: 'bg-error-container text-error', icon: 'social' },
    { id: 'p3', title: 'Eğlence & Oyun', desc: 'YouTube, Roblox...', enabled: false, color: 'bg-primary-container/20 text-primary', icon: 'game' },
  ]);

  const selectedStudent = useMemo(() => 
    students.find(s => s.id === selectedStudentId) || null, 
    [students, selectedStudentId]
  );

  const selectedTask = useMemo(() => 
    tasks.find(t => t.id === selectedTaskId) || null, 
    [tasks, selectedTaskId]
  );

  const addNotification = (title: string) => {
    const newNotif: Notification = { id: Date.now().toString(), title, time: 'Şimdi', read: false };
    setNotifications([newNotif, ...notifications]);
  };

  const toggleLock = (studentId: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const newState = !s.isLocked;
        addNotification(`${s.name} cihazı ${newState ? 'kilitlendi' : 'açıldı'}.`);
        return { ...s, isLocked: newState };
      }
      return s;
    }));
  };

  const addExtraTime = (studentId: string, minutes: number = 30) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        addNotification(`${s.name} için ${minutes} dk ek süre eklendi.`);
        return s;
      }
      return s;
    }));
  };

  const handleAddTask = (task: Omit<Task, 'id' | 'submissions' | 'progress'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      submissions: 0,
      progress: 0,
    };
    setTasks([newTask, ...tasks]);
    addNotification(`Yeni görev oluşturuldu: ${task.title}`);
  };

  const handleAddStudent = (student: Omit<Student, 'id' | 'lastSeen' | 'status'>) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      lastSeen: 'Şimdi katıldı',
      status: 'active',
      isLocked: false,
      visitedSites: [
        { url: 'eba.gov.tr', time: 'Şimdi', icon: 'school' }
      ]
    };
    setStudents([...students, newStudent]);
    addNotification(`Yeni öğrenci eklendi: ${student.name}`);
  };

  const navigateToStudent = (student: Student) => {
    setSelectedStudentId(student.id);
    setCurrentView('student-detail');
  };

  const navigateToTask = (task: Task) => {
    setSelectedTaskId(task.id);
    setCurrentView('task-detail');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans selection:bg-primary/10 transition-colors">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-surface-container-high shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp38_uXwUqmcIhI6tSto5bUJOboaU-AdZILJ2FC5uePqtP9IFwKyHQQhmpoN47-I-1pUiV3NXOPOfDZAe7IjEpwqj3XI-fDX0magJkXtAXNViTGh6oV56gmp3in4kMBPMi9sysauo-4OOMXJRPQhwh6GNx9kS3kX90sP26ShEg1Q_LTpZxEyDuk12ocSoB9Zp7A2YHiLhRTcClK8FkwZ2pOL5YEj9L97ya7BcR6RaHMdGYuoD1wpgAKuqhdowJnq7gGVS1_0sEPUg9" alt="Teacher" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-headline font-extrabold text-xl tracking-tight text-primary">Eğitmen Kontrol</h1>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant relative active:scale-90"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 bg-white border border-surface-container shadow-2xl rounded-3xl overflow-hidden z-[60]"
                >
                  <div className="p-5 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                    <span className="font-black text-sm text-primary uppercase tracking-widest font-headline">Bildirimler</span>
                    <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-[10px] font-bold text-on-surface-variant hover:text-primary underline">Hepsini oku</button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center text-xs text-on-surface-variant italic">Bildirim yok</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-4 border-b border-surface-container hover:bg-surface-container-low transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                          <p className="text-sm font-bold text-on-surface">{n.title}</p>
                          <p className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-tight">{n.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomeView key="home" students={students} tasks={tasks} onStudentClick={navigateToStudent} onAddTask={handleAddTask} onTaskClick={navigateToTask} />
          )}
          {currentView === 'tasks' && (
            <TasksView key="tasks" tasks={tasks} onAddTask={handleAddTask} onTaskClick={navigateToTask} />
          )}
          {currentView === 'student-detail' && selectedStudent && (
            <StudentDetailView 
              key="detail" 
              student={selectedStudent} 
              onBack={() => setCurrentView('students')} 
              onLock={() => toggleLock(selectedStudent.id)}
              onAddTime={() => addExtraTime(selectedStudent.id)}
            />
          )}
          {currentView === 'task-detail' && selectedTask && (
            <TaskDetailView 
              key="task-detail" 
              task={selectedTask} 
              students={students}
              onBack={() => setCurrentView('tasks')} 
            />
          )}
          {currentView === 'rules' && (
            <RulesView 
              key="rules" 
              timeLimit={classTimeLimit} 
              setTimeLimit={setClassTimeLimit} 
              permissions={permissions} 
              setPermissions={setPermissions} 
            />
          )}
          {currentView === 'students' && (
            <StudentsListView key="students" students={students} onAddStudent={handleAddStudent} onStudentClick={navigateToStudent} />
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-surface-container-high px-4 py-3 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <NavItem active={currentView === 'home'} icon={<Home size={22} />} label="Anasayfa" onClick={() => setCurrentView('home')} />
        <NavItem active={currentView === 'students' || currentView === 'student-detail'} icon={<Users size={22} />} label="Öğrenciler" onClick={() => setCurrentView('students')} />
        <NavItem active={currentView === 'tasks'} icon={<LayoutIcon size={22} />} label="Görevler" onClick={() => setCurrentView('tasks')} />
        <NavItem active={currentView === 'rules'} icon={<Settings size={22} />} label="Kurallar" onClick={() => setCurrentView('rules')} />
      </nav>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all duration-300 relative ${active ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-tight">{label}</span>
      {active && <motion.div layoutId="nav-pill" className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />}
    </button>
  );
}

// --- HOME VIEW ---
function HomeView({ students, tasks, onStudentClick, onAddTask, onTaskClick }: { key?: string; students: Student[]; tasks: Task[]; onStudentClick: (s: Student) => void; onAddTask: (t: any) => void; onTaskClick: (t: Task) => void }) {
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = () => {
    if (!taskName.trim()) return;
    onAddTask({
      title: taskName,
      category,
      class: '10-A Sınıfı',
      status: 'normal',
      dueDate: '7 gün kaldı'
    });
    setTaskName('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
      <section className="relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-white shadow-2xl shadow-primary/30">
        <div className="relative z-10 space-y-3">
          <h2 className="text-4xl font-headline font-black tracking-tight">Hoş geldiniz, Ahmet Bey</h2>
          <p className="text-on-primary-container font-bold opacity-80 max-w-sm leading-relaxed">Sınıf gelişimini takip etmek ve görevleri yönetmek için paneliniz hazır.</p>
        </div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute -left-10 -bottom-20 w-60 h-60 bg-secondary/10 rounded-full blur-[80px]" />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-white p-8 rounded-[2.5rem] shadow-sm border border-surface-container flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-on-surface-variant font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={14} /> Sınıf Gelişimi
              </span>
              <span className="text-secondary font-black text-xs bg-secondary-container px-3 py-1 rounded-full">+12% ARTIŞ</span>
            </div>
            <h3 className="text-6xl font-headline font-black text-primary mt-4 tracking-tighter">%84</h3>
          </div>
          <div className="mt-10 space-y-3">
            <div className="w-full h-4 bg-surface-container-low rounded-full overflow-hidden p-1">
              <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-secondary rounded-full shadow-lg shadow-secondary/20" />
            </div>
            <p className="text-xs text-on-surface-variant font-bold opacity-60">Son değerlere göre ortalama başarı oranı.</p>
          </div>
        </div>

        <div className="md:col-span-4 grid grid-cols-1 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-surface-container flex flex-col justify-between group hover:border-secondary/20 transition-all">
            <Users size={32} className="text-secondary" />
            <div>
              <h3 className="text-4xl font-headline font-black text-on-surface">{students.length}</h3>
              <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest mt-1">Öğrenci</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-surface-container flex flex-col justify-between group hover:border-primary/20 transition-all">
            <CheckCircle2 size={32} className="text-primary" />
            <div>
              <h3 className="text-4xl font-headline font-black text-on-surface">{tasks.length}</h3>
              <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest mt-1">Görev</p>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-headline font-black text-on-surface">Aktif Öğrenciler</h2>
          <button className="text-primary text-xs font-black hover:underline uppercase tracking-widest">Tümünü Gör</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.slice(0, 3).map((st) => (
            <motion.div 
              key={st.id} 
              whileHover={{ y: -5 }} 
              onClick={() => onStudentClick(st)}
              className="p-6 bg-white rounded-[2rem] border border-surface-container shadow-sm cursor-pointer hover:shadow-xl hover:shadow-primary/5 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <img src={st.avatar} alt={st.name} className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white ${st.status === 'active' ? 'bg-secondary' : 'bg-surface-container-highest'}`} />
                </div>
                <div>
                  <h4 className="font-headline font-black text-on-surface">{st.name}</h4>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight line-clamp-1">{st.currentTask || 'Boşta'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-low p-1.5 rounded-[3rem]">
        <div className="bg-white p-10 rounded-[2.8rem] shadow-sm border border-surface-container/50">
          <div className="flex items-center gap-3 mb-8">
            <Zap size={28} className="text-primary fill-primary" />
            <h3 className="text-2xl font-headline font-black">Hızlı Görev Atama</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-2">GÖREV ADI</label>
              <input value={taskName} onChange={(e) => setTaskName(e.target.value)} type="text" placeholder="Örn: Deneme Sınavı" className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold placeholder:opacity-30 focus:ring-2 focus:ring-primary/10" />
            </div>
            <div className="lg:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-2">KATEGORİ</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-primary/10">
                {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="lg:col-span-3 flex items-end">
              <button 
                onClick={handleSubmit} 
                disabled={!taskName.trim()}
                className="w-full bg-primary text-white py-4 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 transition-all hover:bg-primary-container"
              >
                GÖREV OLUŞTUR
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// --- TASKS VIEW ---
function TasksView({ tasks, onAddTask, onTaskClick }: { key?: string; tasks: Task[]; onAddTask: (t: any) => void; onTaskClick: (t: Task) => void }) {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: CATEGORIES[0], class: '10-A Sınıfı' });

  const filteredTasks = useMemo(() => {
    if (filter === 'ongoing') return tasks.filter(t => t.status !== 'completed');
    if (filter === 'completed') return tasks.filter(t => t.status === 'completed');
    return tasks;
  }, [tasks, filter]);

  const handleAdd = () => {
    if (!formData.title.trim()) return;
    onAddTask({ ...formData, status: 'normal', dueDate: '7 gün kaldı' });
    setFormData({ title: '', category: CATEGORIES[0], class: '10-A Sınıfı' });
    setShowAddModal(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-headline font-black text-on-surface tracking-tight">Görevler</h2>
          <p className="text-on-surface-variant font-bold text-xs uppercase tracking-widest mt-2 opacity-60">Sınıf ödev ve proje takibi</p>
        </div>
        <div className="flex gap-2 bg-surface-container-low p-1.5 rounded-2xl w-fit">
          <FilterBtn active={filter === 'all'} label="Hepsi" onClick={() => setFilter('all')} />
          <FilterBtn active={filter === 'ongoing'} label="Devam Eden" onClick={() => setFilter('ongoing')} />
          <FilterBtn active={filter === 'completed'} label="Tamamlanan" onClick={() => setFilter('completed')} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map(task => (
            <motion.div 
              layout 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              key={task.id} 
              className={`p-8 rounded-[2.5rem] bg-white border border-surface-container shadow-sm group hover:border-primary/20 transition-all ${task.status === 'completed' ? 'grayscale opacity-70' : ''}`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                    {task.category === 'Matematik' ? <Clock /> : <BookOpen />}
                   </div>
                   <div>
                      <h4 className="font-headline font-black text-lg text-on-surface">{task.title}</h4>
                      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{task.category} • {task.class}</p>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${task.status === 'critical' ? 'bg-error-container text-error' : task.status === 'completed' ? 'bg-secondary-container text-secondary' : 'bg-surface-container text-on-surface-variant'}`}>
                    {task.status === 'critical' ? 'Kritik' : task.status === 'completed' ? 'Bitti' : 'Sürüyor'}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase">{task.dueDate}</span>
                </div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black text-on-surface-variant opacity-60 uppercase tracking-widest">
                  <span>Tamamlanma</span>
                  <span>%{task.progress}</span>
                 </div>
                 <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden p-0.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} className={`h-full rounded-full ${task.status === 'completed' ? 'bg-secondary' : 'bg-primary shadow-lg shadow-primary/10'}`} />
                 </div>
              </div>
              <div className="mt-8 pt-6 border-t border-surface-container flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <Users size={14} className="text-on-surface-variant opacity-30" />
                    <span className="text-[10px] font-black text-on-surface-variant opacity-60 uppercase">{task.submissions} Teslim</span>
                 </div>
                 <button onClick={() => onTaskClick(task)} className="text-primary text-[10px] font-black uppercase flex items-center gap-1 group-hover:translate-x-1 transition-all">DETAYLAR <ChevronRight size={14}/></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button onClick={() => setShowAddModal(true)} className="fixed bottom-32 right-8 bg-primary text-white w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-2xl shadow-primary/40 active:scale-90 transition-all z-40 group hover:rounded-2xl">
        <Plus size={28} className="group-hover:rotate-90 transition-transform" />
      </button>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-on-surface/40 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl">
              <h3 className="text-3xl font-headline font-black mb-8">Yeni Görev</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-1">GÖREV ADI</label>
                  <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} type="text" className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-1">KATEGORİ</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 font-bold appearance-none">
                    {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                </div>
                <button onClick={handleAdd} className="w-full bg-primary text-white py-5 rounded-2xl font-black shadow-xl shadow-primary/20 active:scale-95 transition-all mt-4 tracking-widest uppercase text-xs">OLUŞTUR</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FilterBtn({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>{label}</button>
  );
}

// --- RULES VIEW ---
function RulesView({ timeLimit, setTimeLimit, permissions, setPermissions }: { key?: string; timeLimit: number; setTimeLimit: (v: number) => void; permissions: Permission[]; setPermissions: (p: Permission[]) => void }) {
  const togglePermission = (id: string) => {
    setPermissions(permissions.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-headline font-black text-primary tracking-tight">Sınıf Kuralları</h2>
        <p className="text-on-surface-variant font-bold mt-3 opacity-60 leading-relaxed">Öğrencilerin dijital gelişimini sınırlarla yönlendirin, güvenli ortamı koruyun.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 bg-white p-10 rounded-[3rem] shadow-sm border border-surface-container flex flex-col justify-between">
           <div className="space-y-6">
              <div className="flex justify-between items-start">
                 <Clock size={32} className="text-primary" />
                 <span className="bg-secondary-container text-secondary text-[10px] font-black px-3 py-1 rounded-full">AKTİF</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-headline font-black">Günlük Süre</h3>
                <p className="text-xs font-bold text-on-surface-variant opacity-50 uppercase tracking-widest leading-loose">Toplam ekran kullanımına izin verilen maksimum süre sınırı.</p>
              </div>
           </div>
           <div className="mt-12 space-y-8">
              <div className="text-center bg-surface-container-low py-10 rounded-[2rem]">
                 <span className="text-6xl font-headline font-black text-primary">0{Math.floor(timeLimit)}:{timeLimit % 1 === 0 ? '00' : '30'}</span>
              </div>
              <input type="range" min="0" max="6" step="0.5" value={timeLimit} onChange={(e) => setTimeLimit(parseFloat(e.target.value))} className="w-full h-3 bg-surface-container rounded-full appearance-none accent-primary cursor-pointer border-4 border-white shadow-inner" />
              <div className="flex justify-between text-[10px] font-black opacity-30 px-2 uppercase"><span>YASAK</span><span>3S</span><span>SINIRSIZ</span></div>
              <button className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black shadow-2xl shadow-primary/20 active:scale-95 transition-all">GÜNCELLE</button>
           </div>
        </div>

        <div className="md:col-span-7 bg-surface-container-low p-2 rounded-[3.5rem]">
           <div className="bg-white p-10 rounded-[3rem] shadow-sm h-full flex flex-col">
              <div className="flex items-center justify-between mb-10">
                <h4 className="text-2xl font-headline font-black">Uygulama İzinleri</h4>
                <div className="p-1 bg-surface-container-low rounded-xl flex gap-1">
                   <button className="text-[9px] font-black underline p-2">Sıfırla</button>
                </div>
              </div>
              <div className="space-y-4 flex-1">
                 {permissions.map(p => (
                   <div key={p.id} className="flex items-center justify-between p-6 bg-surface-container-low rounded-3xl border border-transparent hover:border-surface-container transition-all group">
                      <div className="flex items-center gap-5">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${p.color}`}>
                            {p.icon === 'book' ? <BookOpen /> : p.icon === 'social' ? <PieChart /> : <Zap />}
                         </div>
                         <div>
                            <h5 className="font-headline font-black text-sm">{p.title}</h5>
                            <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase mt-0.5">{p.desc}</p>
                         </div>
                      </div>
                      <div onClick={() => togglePermission(p.id)} className={`w-14 h-8 rounded-full cursor-pointer relative shadow-inner p-1 transition-colors duration-500 ${p.enabled ? 'bg-secondary' : 'bg-surface-container-highest'}`}>
                         <motion.div animate={{ x: p.enabled ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-lg" transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- STUDENT LIST VIEW ---
function StudentsListView({ students, onAddStudent, onStudentClick }: { key?: string; students: Student[]; onAddStudent: (s: any) => void; onStudentClick: (s: Student) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return;
    onAddStudent({
      name,
      avatar: 'https://picsum.photos/seed/' + Math.random() + '/200/200',
      class: '10-A Sınıfı',
      currentTask: 'Yeni katıldı'
    });
    setName('');
    setShowModal(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-headline font-black tracking-tight">Öğrenciler</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-on-surface text-white px-5 py-2.5 rounded-xl font-black text-xs active:scale-95 transition-all">
          <UserPlus size={18} /> ÖĞRENCİ EKLE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(st => (
          <motion.div key={st.id} layout onClick={() => onStudentClick(st)} className="p-6 bg-white rounded-[2rem] border border-surface-container shadow-sm flex items-center gap-5 cursor-pointer hover:shadow-xl transition-all group">
            <img src={st.avatar} alt={st.name} className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white group-hover:scale-105 transition-transform" />
            <div>
              <h4 className="font-headline font-black text-lg">{st.name}</h4>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{st.class}</p>
              {st.isLocked && <span className="inline-flex items-center gap-1 text-[9px] font-black text-error bg-error-container px-2 py-0.5 rounded-md mt-1 italic"><Lock size={10} /> KİLİTLİ</span>}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-on-surface/40 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="relative bg-white w-full max-w-sm rounded-[3rem] p-10">
               <h3 className="text-2xl font-headline font-black mb-6">Öğrenci Kaydı</h3>
               <div className="space-y-4">
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Ad Soyad" className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 font-bold" />
                  <button onClick={handleAdd} className="w-full bg-primary text-white py-4 rounded-xl font-black text-xs tracking-widest shadow-xl shadow-primary/20">KAYDET</button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- STUDENT DETAIL VIEW ---
// --- TASK DETAIL VIEW ---
function TaskDetailView({ task, students, onBack }: { key?: string; task: Task; students: Student[]; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 rounded-2xl bg-white shadow-sm border border-surface-container active:scale-95 transition-all">
             <ChevronRight className="rotate-180" size={24} />
          </button>
          <div className="w-20 h-20 rounded-[2.2rem] bg-primary-container/20 text-primary flex items-center justify-center shadow-lg">
            {task.category === 'Matematik' ? <Clock size={32} /> : <BookOpen size={32} />}
          </div>
          <div>
            <h2 className="text-4xl font-headline font-black tracking-tighter">{task.title}</h2>
            <p className="text-on-surface-variant font-black text-[10px] uppercase tracking-widest mt-1 opacity-60">{task.category} • {task.class}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 md:flex-none bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-2xl shadow-primary/20 active:scale-95 transition-all"><Plus size={18}/> ÖĞRENCİ ATA</button>
          <button className="flex-1 md:flex-none bg-white border border-surface-container px-8 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"><Download size={18}/> RAPOR AL</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-surface-container shadow-sm flex flex-col justify-between">
          <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">TAMAMLANMA ORANI</h4>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-headline font-black text-primary">%{task.progress}</span>
            <span className="text-xs font-bold text-secondary mb-1">+{Math.floor(Math.random() * 10)}% Bugün</span>
          </div>
          <div className="mt-6 w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${task.progress}%` }} className="h-full bg-primary" />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-surface-container shadow-sm flex flex-col justify-between">
          <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">TOPLAM TESLİM</h4>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl font-headline font-black text-on-surface">{task.submissions}</span>
            <span className="text-xs font-bold text-on-surface-variant opacity-40 mb-1">/ {students.length} Öğrenci</span>
          </div>
          <div className="mt-6 flex -space-x-3">
            {students.slice(0, 5).map((st, i) => (
              <img key={i} src={st.avatar} alt="avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[8px] font-black">+{students.length - 5}</div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-surface-container shadow-sm flex flex-col justify-between">
          <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40">KALAN SÜRE</h4>
          <div className="mt-4 flex items-end gap-3">
            <span className="text-4xl font-headline font-black text-error">{task.dueDate.split(' ')[0]}</span>
            <span className="text-xs font-bold text-on-surface-variant opacity-40 mb-1 uppercase">{task.dueDate.split(' ').slice(1).join(' ')}</span>
          </div>
          <p className="mt-6 text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-tight">Son teslim tarihi yaklaşıyor.</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-surface-container overflow-hidden shadow-sm">
        <div className="p-10 border-b border-surface-container flex justify-between items-center bg-surface-container-low/30">
          <h3 className="text-2xl font-headline font-black">Teslim Edenler</h3>
          <div className="flex gap-2">
            <button className="bg-white px-4 py-2 rounded-xl text-[10px] font-black border border-surface-container-high shadow-sm">PUANLA</button>
            <button className="bg-on-surface text-white px-4 py-2 rounded-xl text-[10px] font-black shadow-lg">TÜMÜNÜ İNDİR</button>
          </div>
        </div>
        <div className="divide-y divide-surface-container">
          {students.slice(0, 4).map((st, i) => (
            <div key={st.id} className="p-8 flex items-center justify-between hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-6">
                <img src={st.avatar} alt={st.name} className="w-14 h-14 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                <div>
                  <h5 className="font-headline font-black text-lg">{st.name}</h5>
                  <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest font-headline">{i % 2 === 0 ? 'Bugün, 14:30' : 'Dün, 18:15'} tarihinde teslim edildi</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-secondary">TAMAMLANDI</p>
                  <p className="text-[10px] font-bold text-on-surface-variant opacity-30 mt-0.5 uppercase tracking-tighter">İşlendi</p>
                </div>
                <button className="p-3 rounded-xl hover:bg-surface-container transition-colors"><MoreVertical size={20} className="text-on-surface-variant opacity-40"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StudentDetailView({ student, onBack, onLock, onAddTime }: { key?: string; student: Student; onBack: () => void; onLock: () => void; onAddTime: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 rounded-2xl bg-white shadow-sm border border-surface-container active:scale-95 transition-all">
             <ChevronRight className="rotate-180" size={24} />
          </button>
          <div className="relative">
            <img src={student.avatar} alt={student.name} className="w-24 h-24 rounded-[2.5rem] object-cover border-4 border-white shadow-2xl" />
            <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-4 border-white shadow-md ${student.isLocked ? 'bg-error' : 'bg-secondary'}`}></div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-headline font-black tracking-tighter">{student.name}</h2>
              {student.isLocked && <Lock size={20} className="text-error" />}
            </div>
            <p className="text-on-surface-variant font-black text-[10px] uppercase tracking-widest mt-1 opacity-60">{student.class} • ID: #8291</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onLock}
            className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 ${
              student.isLocked 
              ? 'bg-secondary text-white shadow-secondary/20' 
              : 'bg-primary text-white shadow-primary/20'
            }`}
          >
            {student.isLocked ? <Unlock size={18} /> : <Lock size={18} />}
            {student.isLocked ? 'KİLİDİ AÇ' : 'CİHAZI KİLİTLE'}
          </button>
          <button 
            onClick={onAddTime}
            className="flex-1 md:flex-none bg-white border border-surface-container px-8 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <PlusCircle size={18} /> SÜRE EKLE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
         <div className="md:col-span-8 bg-surface-container-low rounded-[3rem] p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-12">
               <div>
                  <h3 className="text-2xl font-headline font-black">Ekran Süresi</h3>
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-40 mt-1">Haftalık kullanım analizi</p>
               </div>
               <div className="bg-white px-6 py-3 rounded-2xl font-black text-primary shadow-sm text-lg">3sa 45dk</div>
            </div>
            <div className="flex items-end justify-between h-40 gap-4 mb-2">
              {[30, 80, 55, 100, 20].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} className={`w-full rounded-full transition-all cursor-pointer ${i === 3 ? 'bg-primary shadow-xl shadow-primary/20' : i === 1 ? 'bg-primary-container opacity-60' : 'bg-surface-container-highest opacity-40'} hover:opacity-100`} />
                  <span className={`text-[10px] font-black uppercase tracking-tight ${i === 3 ? 'text-primary' : 'text-on-surface-variant/40'}`}>{['Pzt', 'Sal', 'Çar', 'Bugün', 'Cum'][i]}</span>
                </div>
              ))}
            </div>
         </div>
         <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-secondary-container rounded-[3rem] p-8 flex-1 flex flex-col justify-between border-4 border-white shadow-xl shadow-secondary/5 group">
               <Zap size={40} className="text-secondary fill-secondary group-hover:scale-110 transition-transform" />
               <div className="mt-4">
                  <h4 className="font-headline font-black text-xl text-on-secondary-container">Odaklanma</h4>
                  <p className="text-on-secondary-container/80 font-bold text-xs mt-1">Verimli geçiyor.</p>
               </div>
            </div>
            <div className="bg-error-container rounded-[3rem] p-8 flex-1 flex flex-col justify-between border-4 border-white shadow-xl shadow-error/5 group">
              <AlertCircle size={40} className="text-error group-hover:rotate-12 transition-transform" />
              <div className="mt-4">
                  <h4 className="font-headline font-black text-xl text-on-error-container">Güvenlik</h4>
                  <p className="text-on-error-container/80 font-bold text-xs mt-1">İhlal yok.</p>
              </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-surface-container flex flex-col">
            <h3 className="text-2xl font-headline font-black mb-10">Girdiği Siteler</h3>
            <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
              {student.visitedSites?.map((site, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl group hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {site.icon === 'school' ? <BookOpen size={20} /> : site.icon === 'video' ? <Video size={20} /> : <Globe size={20} />}
                     </div>
                     <div>
                        <p className="font-black text-sm text-on-surface">{site.url}</p>
                        <p className="text-[10px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest">{site.time}</p>
                     </div>
                  </div>
                  <ChevronRight size={16} className="text-on-surface-variant opacity-20" />
                </div>
              ))}
              {(!student.visitedSites || student.visitedSites.length === 0) && (
                <p className="text-center text-xs text-on-surface-variant italic opacity-60 py-10">Henüz kayıt bulunamadı.</p>
              )}
            </div>
         </div>

         <div className="bg-white p-10 rounded-[3rem] border border-surface-container flex flex-col">
            <h3 className="text-2xl font-headline font-black mb-10">Son Aktiviteler</h3>
            <div className="flex-1 space-y-10 overflow-y-auto no-scrollbar">
              {ACTIVITIES.map((act, i) => (
                <div key={act.id} className="flex gap-8 items-start group">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-3 h-3 rounded-full mt-1.5 transition-all duration-500 ${i === 0 ? 'bg-primary scale-125' : 'bg-surface-container-highest'}`} />
                    {i < ACTIVITIES.length - 1 && <div className="w-0.5 flex-1 bg-surface-container-highest opacity-30 rounded-full" />}
                  </div>
                  <div className="space-y-1 group-hover:translate-x-1 transition-transform">
                     <h4 className="font-black text-base">{act.title}</h4>
                     <p className="text-[10px] text-on-surface-variant font-bold opacity-40 uppercase tracking-widest">{act.time} • {act.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </div>
    </motion.div>
  );
}
