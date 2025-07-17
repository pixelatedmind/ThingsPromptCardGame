import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Sparkles, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface IntegratedPromptPreviewProps {
  currentWords: {
    future: string;
    thing: string;
    theme: string;
  };
  isVisible: boolean;
  isGenerating: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onToggleVisibility: () => void;
}

export const IntegratedPromptPreview: React.FC<IntegratedPromptPreviewProps> = ({
  currentWords,
  isVisible,
  isGenerating,
  onCopy,
  onRegenerate,
  onToggleVisibility
}) => {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const [wordAnimations, setWordAnimations] = useState({
    future: false,
    thing: false,
    theme: false
  });

  const hasValidWords = !currentWords.future.includes('[') && 
                       !currentWords.thing.includes('[') && 
                       !currentWords.theme.includes('[');

  useEffect(() => {
    if (hasValidWords && isVisible) {
      setWordAnimations({ future: false, thing: false, theme: false });
      
      const timers = [
        setTimeout(() => setWordAnimations(prev => ({ ...prev, future: true })), 100),
        setTimeout(() => setWordAnimations(prev => ({ ...prev, thing: true })), 300),
        setTimeout(() => setWordAnimations(prev => ({ ...prev, theme: true })), 500),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [currentWords, hasValidWords, isVisible]);

  const handleCopy = async () => {
    const text = `In a ${currentWords.future} future, there is a ${currentWords.thing} related to ${currentWords.theme}.`;
    
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
      onCopy();
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  if (!hasValidWords) {
    return (
      <div className="mb-12">
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-slate-100 p-4 rounded-2xl">
                <Sparkles className="w-8 h-8 text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-700">
                Ready to Generate Your Prompt?
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Click "Generate Complete Prompt" below to create your unique writing prompt
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {/* Visibility Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onToggleVisibility}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {isVisible ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {/* Main Preview Container */}
      <div className={`transition-all duration-500 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>
          
          {/* Content */}
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3 rounded-2xl mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-indigo-800 font-semibold">Your Writing Prompt</span>
              </div>
            </div>

            {/* Prompt Content */}
            <div className="text-center mb-10">
              <div className="text-xl lg:text-2xl xl:text-3xl leading-relaxed space-y-4 max-w-4xl mx-auto">
                {/* Future Word */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-slate-700">In a</span>
                  <span className={`inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-500 transform ${
                    wordAnimations.future ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-8 scale-95'
                  } hover:shadow-xl hover:scale-105`}>
                    {currentWords.future}
                  </span>
                  <span className="text-slate-700">future,</span>
                </div>
                
                {/* Thing Word */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-slate-700">there is a</span>
                  <span className={`inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-500 transform ${
                    wordAnimations.thing ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  } hover:shadow-xl hover:scale-105`}>
                    {currentWords.thing}
                  </span>
                </div>
                
                {/* Theme Word */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-slate-700">related to</span>
                  <span className={`inline-flex items-center bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-500 transform ${
                    wordAnimations.theme ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
                  } hover:shadow-xl hover:scale-105`}>
                    {currentWords.theme}
                  </span>
                  <span className="text-slate-700">.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleCopy}
                className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  showCopyFeedback 
                    ? 'bg-green-600 text-white focus:ring-green-500' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white focus:ring-indigo-500'
                }`}
              >
                {showCopyFeedback ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Prompt
                  </>
                )}
                
                {showCopyFeedback && (
                  <div className="absolute inset-0 bg-green-400 rounded-xl animate-ping opacity-75"></div>
                )}
              </button>
              
              <button
                onClick={onRegenerate}
                disabled={isGenerating}
                className="bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-700 border-2 border-slate-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:transform-none disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                Generate New
              </button>
            </div>

            {/* Usage Hint */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                <span className="text-2xl">💡</span>
                <p className="text-sm text-slate-600">
                  Use this prompt as inspiration for your next creative writing project
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};