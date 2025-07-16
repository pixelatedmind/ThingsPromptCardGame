import React from 'react';
import { RefreshCw, Copy } from 'lucide-react';
import { WordCategory } from '../types';

interface WordCardProps {
  category: WordCategory;
  currentWord: string;
  onRefresh: () => void;
  onCopy: () => void;
  isGenerating: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
  category,
  currentWord,
  onRefresh,
  onCopy,
  isGenerating
}) => {
  const isPlaceholder = currentWord.includes('[') && currentWord.includes(']');

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 min-h-[280px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="text-center flex-1 flex flex-direction-column justify-center">
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-2">
            {category.description.split('[WORD]')[0]}
          </p>
          <div className={`text-2xl font-bold mb-2 min-h-[60px] flex items-center justify-center transition-all duration-300 ${
            isPlaceholder 
              ? 'text-gray-400 italic' 
              : 'text-indigo-600 hover:text-indigo-700'
          } ${isGenerating ? 'animate-pulse' : ''}`}>
            {currentWord}
          </div>
          <p className="text-gray-600 text-sm">
            {category.description.split('[WORD]')[1]}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button
          onClick={onRefresh}
          disabled={isGenerating}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label={`Refresh ${category.label} word`}
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          Refresh
        </button>
        
        <button
          onClick={onCopy}
          disabled={isPlaceholder}
          className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label={`Copy ${category.label} word`}
          title="Copy word"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};