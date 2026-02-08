
import React, { useState } from 'react';
import { Volume2, Play, Pause, Loader2, Trash2, Headphones } from 'lucide-react';
import { generateSpeech, decodeBase64, decodeAudioData } from '../geminiService';
import { AudioEntry } from '../types';

const SpeechSection: React.FC = () => {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<AudioEntry[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!text.trim() || isGenerating) return;

    const id = Date.now().toString();
    const newEntry: AudioEntry = {
      id,
      text,
      timestamp: Date.now(),
      isLoading: true
    };

    setHistory(prev => [newEntry, ...prev]);
    setIsGenerating(true);
    setText('');

    try {
      const base64Audio = await generateSpeech(text);
      const audioUrl = `data:audio/pcm;base64,${base64Audio}`;
      
      setHistory(prev => prev.map(entry => 
        entry.id === id ? { ...entry, audioUrl, isLoading: false } : entry
      ));
    } catch (error) {
      console.error(error);
      setHistory(prev => prev.filter(entry => entry.id !== id));
      alert('Error al generar el audio. Verifica tu conexión.');
    } finally {
      setIsGenerating(false);
    }
  };

  const playAudio = async (entry: AudioEntry) => {
    if (!entry.audioUrl || currentlyPlaying === entry.id) return;

    try {
      setCurrentlyPlaying(entry.id);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const base64 = entry.audioUrl.split(',')[1];
      const bytes = decodeBase64(base64);
      const buffer = await decodeAudioData(bytes, audioCtx, 24000, 1);
      
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.onended = () => setCurrentlyPlaying(null);
      source.start();
    } catch (err) {
      console.error(err);
      setCurrentlyPlaying(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Volume2 className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Transforma texto en voz</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Tecnología Gemini 2.5 TTS</p>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Pega aquí el texto que quieras convertir en una voz natural y expresiva..."
            rows={4}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none"
          />
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400">
              {text.length} caracteres (máximo recomendado 500)
            </p>
            <button
              onClick={handleConvert}
              disabled={!text.trim() || isGenerating}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  Convertir a voz
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <Headphones className="w-4 h-4" />
          Historial de audio
        </h3>
        
        <div className="space-y-3">
          {history.map((entry) => (
            <div key={entry.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group animate-in slide-in-from-top-4 duration-300">
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm text-slate-800 truncate font-medium">{entry.text}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {entry.isLoading ? (
                  <div className="flex items-center gap-2 text-indigo-500 text-xs font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => playAudio(entry)}
                      className={`
                        p-3 rounded-full transition-all
                        ${currentlyPlaying === entry.id 
                          ? 'bg-indigo-600 text-white animate-pulse' 
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}
                      `}
                    >
                      {currentlyPlaying === entry.id ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>
                    <button 
                      onClick={() => setHistory(prev => prev.filter(e => e.id !== entry.id))}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-slate-300 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
              <Volume2 className="w-12 h-12 mb-2 opacity-10" />
              <p className="text-sm italic">Tu lista de reproducciones aparecerá aquí.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechSection;
