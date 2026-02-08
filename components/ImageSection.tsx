
import React, { useState } from 'react';
import { Sparkles, Download, Image as ImageIcon, Loader2, Search } from 'lucide-react';
import { generateImage } from '../geminiService';
import { GeneratedImage } from '../types';

const ImageSection: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const url = await generateImage(prompt);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url,
        prompt,
        timestamp: Date.now(),
      };
      setHistory(prev => [newImage, ...prev]);
      setPrompt('');
    } catch (error) {
      console.error(error);
      alert('Error al generar la imagen. Intenta con un prompt diferente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Crea arte con IA</h2>
        <p className="text-sm text-slate-500 mb-6">Describe lo que tienes en mente y Gemini lo hará realidad.</p>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Un astronauta cabalgando un unicornio en Marte, estilo digital..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isGenerating && (
          <div className="aspect-square bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center animate-pulse">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <ImageIcon className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-sm text-slate-500 font-medium">Renderizando tu creación...</p>
          </div>
        )}

        {history.map((img) => (
          <div key={img.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="aspect-square overflow-hidden bg-slate-100">
              <img src={img.url} alt={img.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-600 line-clamp-2 italic mb-3">"{img.prompt}"</p>
              <div className="flex justify-end">
                <a 
                  href={img.url} 
                  download={`gemini-gen-${img.id}.png`}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {!isGenerating && history.length === 0 && (
          <div className="col-span-full h-64 flex flex-col items-center justify-center text-slate-400 space-y-2">
            <ImageIcon className="w-12 h-12 opacity-20" />
            <p className="text-sm">Aún no hay imágenes generadas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
