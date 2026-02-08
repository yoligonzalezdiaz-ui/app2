
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Info } from 'lucide-react';
import { askFitnessCoach } from '../geminiService';

const CoachView: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'u'|'a', text: string}[]>([
    {role: 'a', text: 'Soy Titan, tu entrenador personal IA. ¿Qué quieres mejorar hoy? Puedo ayudarte con tu técnica de sentadilla o sugerirte una comida post-entreno.'}
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(p => [...p, {role: 'u', text: userText}]);
    setLoading(true);

    try {
      const res = await askFitnessCoach(userText);
      setMessages(p => [...p, {role: 'a', text: res}]);
    } catch (err) {
      setMessages(p => [...p, {role: 'a', text: 'Perdí la conexión con el servidor. Respira hondo e intenta de nuevo.'}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col bg-[#1e293b]/50 rounded-3xl border border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg">Titan Personal Coach</div>
            <div className="text-emerald-400 text-xs flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
            </div>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white"><Info className="w-5 h-5" /></button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'u' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
              ${m.role === 'u' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'}
            `}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center gap-3 border border-slate-700">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
              <span className="text-xs italic text-slate-400">Titan está analizando...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleAsk} className="p-6 bg-[#0f172a]/50 border-t border-slate-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ej: ¿Cómo mejorar mi técnica de Press Banca?"
            className="w-full pl-6 pr-14 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
          />
          <button
            disabled={!input.trim() || loading}
            className="absolute right-2 p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoachView;
