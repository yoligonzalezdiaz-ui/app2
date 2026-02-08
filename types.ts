
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  ROUTINES = 'ROUTINES',
  WORKOUT = 'WORKOUT',
  COACH = 'COACH'
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

export interface Routine {
  id: string;
  title: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  target: string;
  exercises: Exercise[];
}

export interface LoggedSet {
  reps: number;
  weight: number;
}

export interface LoggedExercise {
  exerciseName: string;
  sets: LoggedSet[];
}

/**
 * Interface for chat messages used in ChatSection.
 */
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

/**
 * Interface for generated images used in ImageSection.
 */
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

/**
 * Interface for audio playback entries used in SpeechSection.
 */
export interface AudioEntry {
  id: string;
  text: string;
  timestamp: number;
  audioUrl?: string;
  isLoading?: boolean;
}
