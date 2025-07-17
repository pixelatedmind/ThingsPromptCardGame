import React, { useState, useCallback } from 'react';
import { Shuffle, RefreshCw, Copy, Lightbulb, Sparkles } from 'lucide-react';

// Types
interface WordCategory {
  id: string;
  label: string;
  description: string;
  words: string[];
}

// Word data
const wordCategories: Record<string, WordCategory> = {
  future: {
    id: 'future',
    label: 'Future',
    description: 'In a [WORD] future',
    words: [
      'Tomorrow', 'Robotics', 'Evolution', 'Innovation', 'Time-travel', 
      'Singularity', 'Quantum', 'Utopia', 'Nano-tech', 'Intergalactic', 
      'Virtuality', 'Cybernetic', 'Terraform', 'Dystopian', 'Post-apocalyptic',
      'Bioengineered', 'Neural', 'Holographic', 'Synthetic', 'Augmented',
      'Digital', 'Cosmic', 'Transcendent', 'Automated', 'Sustainable'
    ]
  },
  thing: {
    id: 'thing',
    label: 'Thing',
    description: 'There is a [WORD]',
    words: [
      'Object', 'Instrument', 'Gadget', 'Relic', 'Utensil', 'Apparatus', 
      'Device', 'Tool', 'Implement', 'Artifact', 'Commodity', 'Contraption', 
      'Mechanism', 'Interface', 'Portal', 'Beacon', 'Catalyst', 'Vessel',
      'Engine', 'Generator', 'Scanner', 'Transmitter', 'Processor', 'Core',
      'Matrix', 'Network', 'System', 'Protocol', 'Algorithm'
    ]
  },
  theme: {
    id: 'theme',
    label: 'Theme',
    description: 'Related to [WORD]',
    words: [
      'Harmony', 'Chaos', 'Exploration', 'Redemption', 'Survival', 
      'Transformation', 'Adventure', 'Mystery', 'Rebellion', 'Creation', 
      'Conflict', 'Discovery', 'Enlightenment', 'Identity', 'Freedom',
      'Connection', 'Isolation', 'Progress', 'Tradition', 'Balance',
      'Power', 'Sacrifice', 'Hope', 'Fear', 'Unity', 'Diversity'
    ]
  }
};

function App() {
  const [currentWords, setCurrentWords] = useState({
    future: '[FUTURE WORD]',
    thing: '[THING WORD]',
    theme: '[THEME WORD]'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const getRandomWord = useCallback((category: keyof typeof wordCategories): string => {
    const words = wordCategories[category].words;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }, []);

  const generateWord = useCallback(async (category: keyof typeof wordCategories) => {
    setIsGenerating(true);
    
    // Add slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const newWord = getRandomWord(category);
    setCurrentWords(prev => ({
      ...prev,
      [category]: newWord
    }));
    setIsGenerating(false);
  }, [getRandomWord]);

  const generateAllWords = useCallback(async () => {
    setIsGenerating(true);
    
    // Add slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newWords = {
      future: getRandomWord('future'),
      thing: getRandomWord('thing'),
      theme: getRandomWord('theme')
    };

    setCurrentWords(newWords);
    setIsGenerating(false);
  }, [getRandomWord]);

  const hasValidWords = !currentWords.future.includes('[') && 
                       !currentWords.thing.includes('[') && 
                       !currentWords.theme.includes('[');

  const handleCopyWord = (word: string) => {
    navigator.clipboard.writeText(word).then(() => {
      console.log('Word copied to clipboard');
    });
  };

  const handleCopyPrompt = async () => {
    const text = `In a ${currentWords.future} future, there is a ${currentWords.thing} related to ${currentWords.theme}.`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  // Category colors for consistent theming
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 lg:p-8">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Things Prompt
              </h1>
              <p className="text-xl lg:text-2xl font-medium text-slate-600">
                Card Game
              </p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-3 mb-6">
            <p className="text-lg text-slate-700 font-medium">
              Generate unique science fiction writing prompts to spark your creativity
            </p>
            <p className="text-slate-600">
              Perfect for writers, game masters, and creative minds looking for inspiration
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-min">
          
          {/* Prompt Preview - Large Feature Box */}
          <div className="lg:col-span-8 lg:row-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden h-full">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>
              
              <div className="p-8 lg:p-12 h-full flex flex-col">
                {hasValidWords ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3 rounded-2xl mb-4">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        <span className="text-indigo-800 font-semibold">Your Writing Prompt</span>
                      </div>
                    </div>

                    {/* Prompt Content */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center text-xl lg:text-2xl xl:text-3xl leading-relaxed space-y-4 max-w-4xl">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">In a</span>
                          <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            {currentWords.future}
                          </span>
                          <span className="text-slate-700">future,</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">there is a</span>
                          <span className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            {currentWords.thing}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">related to</span>
                          <span className="inline-flex items-center bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                            {currentWords.theme}
                          </span>
                          <span className="text-slate-700">.</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                      <button
                        onClick={handleCopyPrompt}
                        className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          copyFeedback 
                            ? 'bg-green-600 text-white focus:ring-green-500' 
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white focus:ring-indigo-500'
                        }`}
                      >
                        <Copy className="w-5 h-5" />
                        {copyFeedback ? 'Copied!' : 'Copy Prompt'}
                      </button>
                      
                      <button
                        onClick={generateAllWords}
                        disabled={isGenerating}
                        className="bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-700 border-2 border-slate-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                      >
                        <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                        Generate New
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="bg-slate-100 p-6 rounded-3xl">
                          <Sparkles className="w-12 h-12 text-slate-400" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-slate-700">
                          Ready to Create?
                        </h3>
                        <p className="text-slate-600 max-w-md mx-auto text-lg">
                          Generate individual words or create a complete prompt combination
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Generate All Button - Tall Side Panel */}
          <div className="lg:col-span-4 lg:row-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
              <div className="h-full flex flex-col justify-center text-center space-y-6">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                    <Shuffle className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-800">
                    Generate Complete
                  </h3>
                  <p className="text-sm text-slate-600">
                    Create a full prompt with all three elements
                  </p>
                </div>
                
                <button
                  onClick={generateAllWords}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-6 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <Shuffle className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                  Generate All
                </button>
              </div>
            </div>
          </div>

          {/* Word Cards - Three Equal Columns */}
          {Object.entries(wordCategories).map(([key, category]) => {
            const isPlaceholder = currentWords[key as keyof typeof currentWords].includes('[');
            const colors = categoryColors[category.id as keyof typeof categoryColors];
            
            return (
              <div key={key} className="lg:col-span-4">
                <div className="space-y-4">
                  {/* External Category Title */}
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold ${colors.text} uppercase tracking-wide`}>
                      {category.label}
                    </h3>
                  </div>
                  
                  {/* Card */}
                  <div className={`${colors.bg} rounded-2xl shadow-sm border-2 ${colors.border} p-6 h-80 flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-opacity-60`}>
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
                            {currentWords[key as keyof typeof currentWords]}
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
                        onClick={() => generateWord(key as keyof typeof wordCategories)}
                        disabled={isGenerating}
                        className={`flex-1 ${colors.button} disabled:bg-slate-400 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2`}
                      >
                        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                        Refresh
                      </button>
                      
                      <button
                        onClick={() => handleCopyWord(currentWords[key as keyof typeof currentWords])}
                        disabled={isPlaceholder}
                        className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                        title="Copy word"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;