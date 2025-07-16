import React, { useEffect, useState } from 'react';
import { X, Copy, Sparkles } from 'lucide-react';

interface FullscreenPromptDisplayProps {
  currentWords: {
    future: string;
    thing: string;
    theme: string;
  };
  onClose: () => void;
}

export const FullscreenPromptDisplay: React.FC<FullscreenPromptDisplayProps> = ({
  currentWords,
  onClose
}) => {
  const [showContent, setShowContent] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Trigger content animation after component mounts
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    // Stagger the animation phases
    const phaseTimers = [
      setTimeout(() => setAnimationPhase(1), 300),
      setTimeout(() => setAnimationPhase(2), 600),
      setTimeout(() => setAnimationPhase(3), 900),
      setTimeout(() => setAnimationPhase(4), 1200),
    ];

    return () => {
      clearTimeout(timer);
      phaseTimers.forEach(clearTimeout);
    };
  }, []);

  const handleCopy = () => {
    const text = `In a ${currentWords.future} future, there is a ${currentWords.thing} related to ${currentWords.theme}.`;
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard');
    });
  };

  const handleShare = () => {
    const text = `In a ${currentWords.future} future, there is a ${currentWords.thing} related to ${currentWords.theme}.`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Creative Writing Prompt',
        text: text
      });
    } else {
      handleCopy();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-title"
    >
      {/* Animated glowing blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large moving blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Additional floating blobs */}
        <div className="absolute top-1/2 left-1/6 w-48 h-48 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/6 w-56 h-56 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/6 right-1/3 w-40 h-40 bg-violet-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Small accent blobs */}
        <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/6 left-2/3 w-36 h-36 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse-slow" style={{ animationDelay: '3.5s' }}></div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className={`absolute top-6 right-6 text-white hover:text-gray-300 p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
          showContent ? 'animate-fade-in' : 'opacity-0'
        }`}
        aria-label="Close prompt display"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Main content */}
      <div className="text-center max-w-4xl mx-auto relative">
        {/* Sparkles decoration */}
        <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${animationPhase >= 1 ? 'animate-scale-in' : 'opacity-0'}`}>
          <Sparkles className="w-12 h-12 text-yellow-400" />
        </div>

        {/* Title */}
        <h1 
          id="prompt-title"
          className={`text-4xl md:text-6xl font-bold text-white mb-12 ${
            animationPhase >= 1 ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          Your Writing Prompt
        </h1>

        {/* Prompt text with staggered animations */}
        <div className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed mb-16 space-y-4">
          <div className={`${animationPhase >= 2 ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <span className="text-white drop-shadow-lg">In a </span>
            <span className="font-bold text-blue-100 bg-blue-600 bg-opacity-80 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-blue-400 border-opacity-30">
              {currentWords.future}
            </span>
            <span className="text-white drop-shadow-lg"> future,</span>
          </div>
          
          <div className={`${animationPhase >= 3 ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <span className="text-white drop-shadow-lg">there is a </span>
            <span className="font-bold text-green-100 bg-green-600 bg-opacity-80 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-green-400 border-opacity-30">
              {currentWords.thing}
            </span>
          </div>
          
          <div className={`${animationPhase >= 4 ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <span className="text-white drop-shadow-lg">related to </span>
            <span className="font-bold text-purple-100 bg-purple-600 bg-opacity-80 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-purple-400 border-opacity-30">
              {currentWords.theme}
            </span>
            <span className="text-white drop-shadow-lg">.</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${
          animationPhase >= 4 ? 'animate-fade-in-up' : 'opacity-0'
        }`} style={{ animationDelay: '0.6s' }}>
          <button
            onClick={handleCopy}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-10 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 backdrop-blur-sm border border-white border-opacity-30 hover:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Copy className="w-5 h-5" />
            Copy Prompt
          </button>
          
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 px-10 py-4 rounded-lg font-medium transition-all duration-300 border border-white border-opacity-40 hover:border-opacity-60 hover:bg-white hover:bg-opacity-15 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Continue Writing
          </button>
        </div>

        {/* Subtle instruction text */}
        <p className={`text-white text-opacity-70 text-sm mt-8 drop-shadow ${
          animationPhase >= 4 ? 'animate-fade-in' : 'opacity-0'
        }`} style={{ animationDelay: '1s' }}>
          Press ESC to close or click Continue Writing to return to the generator
        </p>
      </div>
    </div>
  );
};