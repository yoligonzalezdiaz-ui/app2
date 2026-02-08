
import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Ask the fitness coach a single question.
 * Uses gemini-3-flash-preview for fast and relevant fitness advice.
 */
export const askFitnessCoach = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
        systemInstruction: `Eres "Titan", un entrenador personal experto de élite. 
        Tu objetivo es dar consejos técnicos sobre ejercicios de gimnasio, nutrición deportiva y motivación. 
        Sé directo, profesional y motivador. Responde siempre en español. 
        Si te preguntan por técnicas peligrosas, advierte sobre la seguridad.`
    }
  });
  return response.text;
};

/**
 * General chat interaction with Gemini with history.
 * Uses gemini-3-flash-preview.
 */
export const chatWithGemini = async (prompt: string, history: {role: string, content: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Map history roles: 'assistant' to 'model', 'user' to 'user'
  const contents = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));
  contents.push({ role: 'user', parts: [{ text: prompt }] });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents,
  });
  return response.text;
};

/**
 * Generate an image using gemini-2.5-flash-image.
 * Returns a base64 data URL.
 */
export const generateImage = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }],
    },
  });
  
  // Iterate through parts to find the image part (inlineData)
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No se encontró información de imagen en la respuesta.");
};

/**
 * Generate speech from text using gemini-2.5-flash-preview-tts.
 * Returns raw base64 PCM data.
 */
export const generateSpeech = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
      },
    },
  });
  
  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("No se recibió audio de la IA.");
  return base64Audio;
};

/**
 * Decodes a base64 string into a Uint8Array.
 */
export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Decodes raw PCM audio bytes into an AudioBuffer for playback.
 */
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
