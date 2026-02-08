
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  MessageSquareQuote, 
  Timer, 
  Menu, 
  X, 
  Flame, 
  Award,
  ChevronRight,
  Plus
} from 'lucide-react';
import { ViewType } from './types';
import CoachView from './components/CoachView';
import RoutinesView from './components/RoutinesView';
import WorkoutView from './components/WorkoutView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: ViewType.DASHBOARD, name: 'Panel Control', icon: LayoutDashboard },
    { id: ViewType.ROUTINES, name: 'Rutinas', icon: Dumbbell },
    { id: ViewType.WORKOUT, name: 'Entrenar Ahora', icon: Timer },
    { id: ViewType.COACH, name: 'Entrenador IA', icon: MessageSquareQuote },
  ];

  const renderView = () => {
    switch(activeView) {
      case ViewType.COACH: return <CoachView />;
      case ViewType.ROUTINES: return <RoutinesView />;
      case ViewType.WORKOUT: return <WorkoutView />;
      default: return <DashboardView onStartWorkout={() => setActiveView(ViewType.WORKOUT)} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-emerald-600 rounded-full shadow-lg"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#1e293b] border-r border-slate-800 transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Flame className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tighter italic">TITAN<span className="text-emerald-500">FIT</span></h1>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all
                  ${activeView === item.id 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <item.icon className={`w-5 h-5 ${activeView === item.id ? 'text-emerald-400' : ''}`} />
                <span className="font-semibold">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="p-6">
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-sm font-bold">Nivel 12</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[65%]" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

const DashboardView: React.FC<{onStartWorkout: () => void}> = ({onStartWorkout}) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <header className="mb-10">
      <h2 className="text-4xl font-extrabold mb-2">¡Hola de nuevo, <span className="text-emerald-500">Campeón</span>!</h2>
      <p className="text-slate-400">Es un buen día para superar tus límites.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="glass p-6 rounded-3xl">
        <div className="text-slate-400 text-sm font-bold uppercase mb-4 flex items-center gap-2">
          <Timer className="w-4 h-4 text-emerald-500" /> Tiempo de hoy
        </div>
        <div className="text-3xl font-bold italic">45:12 <span className="text-xs text-slate-500 not-italic">min</span></div>
      </div>
      <div className="glass p-6 rounded-3xl">
        <div className="text-slate-400 text-sm font-bold uppercase mb-4 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" /> Calorías
        </div>
        <div className="text-3xl font-bold italic">342 <span className="text-xs text-slate-500 not-italic">kcal</span></div>
      </div>
      <div className="glass p-6 rounded-3xl border-emerald-500/20">
        <button 
          onClick={onStartWorkout}
          className="w-full h-full flex flex-col items-center justify-center gap-2 group"
        >
          <div className="bg-emerald-500 p-3 rounded-full group-hover:scale-110 transition-transform">
            <Plus className="text-white" />
          </div>
          <span className="font-bold text-emerald-400 uppercase text-xs tracking-widest">Nueva Sesión</span>
        </button>
      </div>
    </div>

    <section className="mb-10">
      <h3 className="text-xl font-bold mb-6">Mi Progreso Reciente</h3>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass p-5 rounded-2xl flex items-center justify-between hover:border-slate-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-slate-800 p-3 rounded-xl">
                <Dumbbell className="text-emerald-500" />
              </div>
              <div>
                <div className="font-bold">Pecho & Tríceps</div>
                <div className="text-xs text-slate-500">Hace {i} días • 6 ejercicios</div>
              </div>
            </div>
            <ChevronRight className="text-slate-600" />
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default App;
