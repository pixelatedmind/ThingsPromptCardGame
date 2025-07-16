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
  const [titleVisible, setTitleVisible] = useState(false);
  const [futureVisible, setFutureVisible] = useState(false);
  const [thingVisible, setThingVisible] = useState(false);
  const [themeVisible, setThemeVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    // Stagger the animations with proper timing
    const timers = [
      setTimeout(() => setShowContent(true), 100),
      setTimeout(() => setTitleVisible(true), 400),
      setTimeout(() => setFutureVisible(true), 800),
      setTimeout(() => setThingVisible(true), 1200),
      setTimeout(() => setThemeVisible(true), 1600),
      setTimeout(() => setButtonsVisible(true), 2000),
    ];

    return () => {
      timers.forEach(clearTimeout);
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
        <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <Sparkles className="w-12 h-12 text-yellow-400" />
        </div>

        {/* Title */}
        <h1 
          id="prompt-title"
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Your Writing Prompt
        </h1>

        {/* Prompt text with staggered animations */}
        <div className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed mb-20 space-y-6">
          <div className={`transition-all duration-1000 ${futureVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="text-white drop-shadow-lg">In a </span>
            <span className="font-bold text-blue-100 bg-blue-600 bg-opacity-90 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-sm border border-blue-400 border-opacity-40 transform hover:scale-105 transition-transform duration-300">
              {currentWords.future}
            </span>
            <span className="text-white drop-shadow-lg"> future,</span>
          </div>
          
          <div className={`transition-all duration-1000 delay-200 ${thingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-white drop-shadow-lg">there is a </span>
            <span className="font-bold text-green-100 bg-green-600 bg-opacity-90 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-sm border border-green-400 border-opacity-40 transform hover:scale-105 transition-transform duration-300">
              {currentWords.thing}
            </span>
          </div>
          
          <div className={`transition-all duration-1000 delay-400 ${themeVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <span className="text-white drop-shadow-lg">related to </span>
            <span className="font-bold text-purple-100 bg-purple-600 bg-opacity-90 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-sm border border-purple-400 border-opacity-40 transform hover:scale-105 transition-transform duration-300">
              {currentWords.theme}
            </span>
            <span className="text-white drop-shadow-lg">.</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-600 ${
          buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={handleCopy}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-12 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 backdrop-blur-sm border border-white border-opacity-30 hover:border-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <Copy className="w-5 h-5" />
            Copy Prompt
          </button>
          
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 px-12 py-4 rounded-xl font-semibold transition-all duration-300 border border-white border-opacity-40 hover:border-opacity-60 hover:bg-white hover:bg-opacity-15 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            Continue Writing
          </button>
        </div>

        {/* Subtle instruction text */}
        <p className={`text-white text-opacity-70 text-base mt-10 drop-shadow transition-all duration-1000 delay-1000 ${
          buttonsVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          Press ESC to close or click Continue Writing to return to the generator
        </p>
      </div>
    </div>
  );
};