import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Sparkles, Eye, EyeOff } from 'lucide-react';

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

  // Trigger word animations when words change
  useEffect(() => {
    if (hasValidWords && isVisible) {
      // Reset animations
      setWordAnimations({ future: false, thing: false, theme: false });
      
      // Stagger the animations
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
      <div className="mb-8">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gray-200 p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Ready to Generate Your Prompt?
          </h3>
          <p className="text-gray-500">
            Click "Generate & Present" below to create your unique writing prompt
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Visibility Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onToggleVisibility}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 bg-white hover:bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {isVisible ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {/* Main Preview Container */}
      <div className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}>
        <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200 to-pink-200 rounded-full opacity-15 transform -translate-x-4 translate-y-4"></div>
          
          {/* Content */}
          <div className="relative p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              Your Writing Prompt
            </h2>

            {/* Prompt Content */}
            <div className="text-center mb-8">
              <div className="text-lg md:text-xl lg:text-2xl leading-relaxed space-y-3">
                {/* Future Word */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-gray-700">In a</span>
                  <span className={`inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition-all duration-500 transform ${
                    wordAnimations.future ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-8 scale-95'
                  } hover:shadow-lg hover:scale-105`}>
                    {currentWords.future}
                  </span>
                  <span className="text-gray-700">future,</span>
                </div>
                
                {/* Thing Word */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-gray-700">there is a</span>
                  <span className={`inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition-all duration-500 transform ${
                    wordAnimations.thing ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  } hover:shadow-lg hover:scale-105`}>
                    {currentWords.thing}
                  </span>
                </div>
                
                {/* Theme Word */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="text-gray-700">related to</span>
                  <span className={`inline-flex items-center bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition-all duration-500 transform ${
                    wordAnimations.theme ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
                  } hover:shadow-lg hover:scale-105`}>
                    {currentWords.theme}
                  </span>
                  <span className="text-gray-700">.</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={handleCopy}
                className={`relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  showCopyFeedback ? 'bg-green-600' : ''
                }`}
              >
                <Copy className="w-4 h-4" />
                {showCopyFeedback ? 'Copied!' : 'Copy Prompt'}
                
                {/* Copy feedback animation */}
                {showCopyFeedback && (
                  <div className="absolute inset-0 bg-green-500 rounded-xl animate-ping opacity-75"></div>
                )}
              </button>
              
              <button
                onClick={onRegenerate}
                disabled={isGenerating}
                className="bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:transform-none disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                Generate New
              </button>
            </div>

            {/* Usage Hint */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                💡 Use this prompt as inspiration for your next creative writing project
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};