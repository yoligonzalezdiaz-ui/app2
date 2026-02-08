
import React, { useState } from 'react';
import { Timer, Plus, CheckCircle2, History, XCircle } from 'lucide-react';

const WorkoutView: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  return (
    <div className="max-w-4xl mx-auto">
      {!sessionActive ? (
        <div className="text-center py-20 animate-in zoom-in duration-300">
          <div className="bg-emerald-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
            <Timer className="w-12 h-12 text-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4">¿Listo para la acción?</h2>
          <p className="text-slate-400 mb-10 max-w-sm mx-auto">Inicia una sesión para registrar tus pesos y repeticiones en tiempo real.</p>
          <button 
            onClick={() => setSessionActive(true)}
            className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[2rem] font-bold text-lg shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105"
          >
            Comenzar Entrenamiento
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
          <div className="flex items-center justify-between glass p-6 rounded-[2rem]">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <div>
                <div className="text-xs uppercase font-black tracking-widest text-slate-500">Entrenamiento Activo</div>
                <div className="text-2xl font-mono font-bold">00:24:15</div>
              </div>
            </div>
            <button 
              onClick={() => setSessionActive(false)}
              className="px-6 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
            >
              Finalizar
            </button>
          </div>

          <div className="space-y-6">
             <div className="glass p-8 rounded-[2.5rem]">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-bold flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-xs">1</span>
                    Press de Banca
                 </h3>
                 <button className="text-slate-500 hover:text-white"><XCircle className="w-5 h-5"/></button>
               </div>

               <div className="space-y-3 mb-6">
                 {[1, 2].map(set => (
                   <div key={set} className="grid grid-cols-4 gap-4 items-center bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50">
                      <div className="text-center font-bold text-slate-500 text-sm">SET {set}</div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-500 font-bold mb-1 uppercase">KG</span>
                        <input type="number" placeholder="0" className="bg-transparent text-center font-bold text-lg w-full focus:outline-none focus:text-emerald-400" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-500 font-bold mb-1 uppercase">REPS</span>
                        <input type="number" placeholder="0" className="bg-transparent text-center font-bold text-lg w-full focus:outline-none focus:text-emerald-400" />
                      </div>
                      <div className="flex justify-center">
                        <button className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                   </div>
                 ))}
               </div>

               <button className="w-full py-4 border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/50 transition-all font-bold">
                 <Plus className="w-4 h-4" /> Añadir Serie
               </button>
             </div>

             <button className="w-full py-6 bg-slate-800 rounded-[2rem] flex items-center justify-center gap-3 text-white hover:bg-slate-700 transition-all font-bold border border-slate-700 shadow-xl">
               <Plus /> Añadir Ejercicio
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutView;
