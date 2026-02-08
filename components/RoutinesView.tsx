
import React from 'react';
import { Play, Flame, Target, Trophy } from 'lucide-react';
import { Routine } from '../types';

const PRESETS: Routine[] = [
  {
    id: '1',
    title: 'Hipertrofia de Empuje',
    difficulty: 'Intermedio',
    target: 'Pecho, Hombro, Tríceps',
    exercises: [
      { name: 'Press Banca con Barra', sets: 4, reps: '8-10' },
      { name: 'Press Militar', sets: 3, reps: '10-12' },
      { name: 'Aperturas en Polea', sets: 3, reps: '15' },
    ]
  },
  {
    id: '2',
    title: 'Full Body Explosivo',
    difficulty: 'Principiante',
    target: 'Cuerpo Completo',
    exercises: [
      { name: 'Sentadillas', sets: 3, reps: '12' },
      { name: 'Flexiones', sets: 3, reps: 'Al fallo' },
      { name: 'Plancha Abdominal', sets: 3, reps: '45 seg' },
    ]
  },
  {
    id: '3',
    title: 'Piernas de Acero',
    difficulty: 'Avanzado',
    target: 'Cuádriceps e Isquios',
    exercises: [
      { name: 'Prensa de Piernas', sets: 5, reps: '10' },
      { name: 'Zancadas con Mancuerna', sets: 3, reps: '12 por pierna' },
      { name: 'Peso Muerto Rumano', sets: 4, reps: '8-10' },
    ]
  }
];

const RoutinesView: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold mb-2">Planes de Entrenamiento</h2>
          <p className="text-slate-400 font-medium">Selecciona el desafío de hoy</p>
        </div>
        <div className="bg-slate-800 p-2 rounded-xl border border-slate-700 hidden sm:flex gap-4 px-4">
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> <span className="text-xs">Fuerza</span></div>
           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> <span className="text-xs">Cardio</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PRESETS.map((routine) => (
          <div key={routine.id} className="glass p-8 rounded-[32px] hover:border-emerald-500/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                    routine.difficulty === 'Principiante' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' :
                    routine.difficulty === 'Intermedio' ? 'text-blue-400 border-blue-500/20 bg-blue-500/5' :
                    'text-red-400 border-red-500/20 bg-red-500/5'
                  }`}>
                    {routine.difficulty}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{routine.title}</h3>
                <div className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                  <Target className="w-3 h-3 text-emerald-500" /> {routine.target}
                </div>
              </div>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20">
                <Play className="fill-current" />
              </button>
            </div>

            <div className="space-y-4">
              {routine.exercises.map((ex, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-t border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600 font-mono text-xs">{idx + 1}</span>
                    <span className="text-sm font-semibold">{ex.name}</span>
                  </div>
                  <div className="text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg text-emerald-400 font-bold">
                    {ex.sets} x {ex.reps}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutinesView;
