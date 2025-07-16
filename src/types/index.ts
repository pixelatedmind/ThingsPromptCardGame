export interface WordCategory {
  id: string;
  label: string;
  description: string;
  words: string[];
}

export interface GeneratedCombination {
  id: string;
  future: string;
  thing: string;
  theme: string;
  timestamp: Date;
}

export interface AppState {
  currentWords: {
    future: string;
    thing: string;
    theme: string;
  };
  history: GeneratedCombination[];
  isGenerating: boolean;
}