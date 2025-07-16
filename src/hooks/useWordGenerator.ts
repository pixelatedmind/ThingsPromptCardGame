import { useState, useCallback, useEffect } from 'react';
import { AppState, GeneratedCombination } from '../types';
import { wordCategories } from '../data/wordCategories';

const STORAGE_KEY = 'word-generator-history';
const MAX_HISTORY_ITEMS = 50;

export const useWordGenerator = () => {
  const [state, setState] = useState<AppState>({
    currentWords: {
      future: '[FUTURE WORD]',
      thing: '[THING WORD]',
      theme: '[THEME WORD]'
    },
    history: [],
    isGenerating: false
  });

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setState(prev => ({ ...prev, history: parsedHistory }));
      }
    } catch (error) {
      console.warn('Failed to load history from localStorage:', error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history));
    } catch (error) {
      console.warn('Failed to save history to localStorage:', error);
    }
  }, [state.history]);

  const getRandomWord = useCallback((category: keyof typeof wordCategories): string => {
    const words = wordCategories[category].words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }, []);

  const generateWord = useCallback(async (category: keyof typeof wordCategories) => {
    setState(prev => ({ ...prev, isGenerating: true }));
    
    // Add slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const newWord = getRandomWord(category);
    setState(prev => ({
      ...prev,
      currentWords: {
        ...prev.currentWords,
        [category]: newWord
      },
      isGenerating: false
    }));
  }, [getRandomWord]);

  const generateAllWords = useCallback(async () => {
    setState(prev => ({ ...prev, isGenerating: true }));
    
    // Add slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newWords = {
      future: getRandomWord('future'),
      thing: getRandomWord('thing'),
      theme: getRandomWord('theme')
    };

    const newCombination: GeneratedCombination = {
      id: Date.now().toString(),
      ...newWords,
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      currentWords: newWords,
      history: [newCombination, ...prev.history].slice(0, MAX_HISTORY_ITEMS),
      isGenerating: false
    }));
  }, [getRandomWord]);

  const clearHistory = useCallback(() => {
    setState(prev => ({ ...prev, history: [] }));
  }, []);

  const exportCombination = useCallback((combination?: GeneratedCombination) => {
    const combo = combination || {
      id: 'current',
      ...state.currentWords,
      timestamp: new Date()
    };
    
    const text = `In a ${combo.future} future, there is a ${combo.thing} related to ${combo.theme}.`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Creative Writing Prompt',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        // Could show a toast notification here
        console.log('Copied to clipboard');
      });
    }
  }, [state.currentWords]);

  return {
    ...state,
    generateWord,
    generateAllWords,
    clearHistory,
    exportCombination
  };
};