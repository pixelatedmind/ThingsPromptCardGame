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

const categoryColors = {
  future: {
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700'
  },
  thing: {
    gradient: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    button: 'bg-green-600 hover:bg-green-700'
  },
  theme: {
    gradient: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    button: 'bg-purple-600 hover:bg-purple-700'
  }
};

export const WordCard: React.FC<WordCardProps> = ({
  category,
  currentWord,
  onRefresh,
  onCopy,
  isGenerating
}) => {
  const isPlaceholder = currentWord.includes('[') && currentWord.includes(']');
  const colors = categoryColors[category.id as keyof typeof categoryColors] || categoryColors.future;

  return (
    <div className="group">
      <div className={`bg-white rounded-2xl shadow-sm border-2 ${colors.border} p-6 h-80 flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-opacity-60`}>
        {/* Category Header */}
        <div className="text-center mb-6">
          <div className={`inline-flex px-4 py-2 rounded-full ${colors.bg} mb-3`}>
            <span className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>
              {category.label}
            </span>
          </div>
        </div>
        
        {/* Word Display */}
        <div className="flex-1 flex flex-col justify-center text-center space-y-4">
          <div className="space-y-2">
            <p className="text-slate-600 text-sm">
              {category.description.split('[WORD]')[0]}
            </p>
            
            <div className={`min-h-[80px] flex items-center justify-center transition-all duration-300 ${
              isPlaceholder 
                ? 'text-slate-400 italic' 
                : `bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent font-bold`
            } ${isGenerating ? 'animate-pulse' : ''}`}>
              <span className="text-2xl lg:text-3xl text-center leading-tight">
                {currentWord}
              </span>
            </div>
            
            <p className="text-slate-600 text-sm">
              {category.description.split('[WORD]')[1]}
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onRefresh}
            disabled={isGenerating}
            className={`flex-1 ${colors.button} disabled:bg-slate-400 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2`}
            style={{ focusRingColor: colors.button.split(' ')[0].replace('bg-', '') }}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            onClick={onCopy}
            disabled={isPlaceholder}
            className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            title="Copy word"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};