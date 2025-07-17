import React, { useState, useCallback } from 'react';
import { Shuffle, RefreshCw, Copy, Lightbulb, Sparkles, Zap, Sun, Home, Leaf } from 'lucide-react';

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
    label: 'Energy Future',
    description: 'In a [WORD] energy future',
    words: [
      'Sustainable', 'Carbon-neutral', 'Net-zero', 'Renewable', 'Clean', 
      'Green', 'Solar-powered', 'Wind-driven', 'Efficient', 'Smart', 
      'Decentralized', 'Community-owned', 'Grid-independent', 'Resilient', 'Innovative',
      'Electrified', 'Hydrogen-based', 'Battery-backed', 'Micro-grid', 'Self-sufficient',
      'Eco-friendly', 'Low-carbon', 'Energy-positive', 'Automated', 'Connected'
    ]
  },
  thing: {
    id: 'thing',
    label: 'Solution',
    description: 'There is a [WORD]',
    words: [
      'Solar panel system', 'Heat pump', 'Battery storage unit', 'Smart thermostat', 'Energy monitor', 
      'Wind turbine', 'Geothermal system', 'Insulation upgrade', 'LED lighting system', 'Smart home hub', 
      'Electric vehicle charger', 'Rainwater harvesting system', 'Green roof installation', 'Energy audit tool', 'Power optimizer',
      'Micro-inverter', 'Home energy management system', 'Weatherization kit', 'Solar water heater', 'Backup generator',
      'Smart grid connection', 'Energy-efficient appliance', 'Programmable controller', 'Monitoring dashboard', 'Efficiency retrofit'
    ]
  },
  theme: {
    id: 'theme',
    label: 'Focus Area',
    description: 'Related to [WORD]',
    words: [
      'Cost savings', 'Energy independence', 'Environmental impact', 'Home comfort', 'Property value', 
      'Grid resilience', 'Community benefits', 'Job creation', 'Innovation', 'Sustainability', 
      'Climate action', 'Energy security', 'Local economy', 'Health benefits', 'Future generations',
      'Carbon reduction', 'Energy efficiency', 'Smart technology', 'Renewable resources', 'Green jobs',
      'Energy equity', 'Grid modernization', 'Workforce development', 'Economic growth', 'Environmental justice'
    ]
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentWords, setCurrentWords] = useState({
    future: '[ENERGY FUTURE]',
    thing: '[SOLUTION]',
    theme: '[FOCUS AREA]'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Simulate loading time
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          {/* Animated Logo */}
          <div className="relative">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <Sun className="w-16 h-16 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-yellow-600 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Home className="w-12 h-12 text-green-600 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <Leaf className="w-10 h-10 text-emerald-500 animate-bounce" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Pulsing rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-green-200 rounded-full animate-ping opacity-20"></div>
              <div className="absolute w-24 h-24 border-2 border-blue-200 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Clean Energy Solutions
            </h1>
            <p className="text-lg text-slate-600">
              Powering sustainable innovation
            </p>
            
            {/* Loading bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            
            <p className="text-sm text-slate-500 animate-pulse">
              Initializing clean energy prompt generator...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 auto-rows-min">
          
          {/* Prompt Preview - Large Feature Box */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden h-full">
              
              <div className="p-8 lg:p-12 h-full flex flex-col">
                {/* Header moved here */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-center">
                      <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Things Prompt
                      </h1>
                      <p className="text-xl lg:text-2xl font-medium text-slate-600">
                        Card Game
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>

                {hasValidWords ? (
                  <>
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                            <Lightbulb className="w-6 h-6 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1">
                            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3 rounded-2xl">
                          <span className="text-indigo-800 font-semibold">Your Writing Prompt</span>
                        </div>
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
                          <span className="text-slate-700">energy future,</span>
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
                        onClick={generateAllWords}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                        Generate New
                      </button>
                      
                      <button
                        onClick={handleCopyPrompt}
                        className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          copyFeedback 
                            ? 'bg-green-600 text-white focus:ring-green-500' 
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300 focus:ring-slate-500'
                        }`}
                      >
                        <Copy className="w-5 h-5" />
                        {copyFeedback ? 'Copied!' : 'Copy Prompt'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
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
                          Generate clean energy solutions or create a complete project prompt
                        </p>
                      </div>
                      
                      <button
                        onClick={generateAllWords}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-auto"
                      >
                        <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                        Generate New
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Word Cards - Three Equal Columns */}
          <div className="col-span-1 md:col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {Object.entries(wordCategories).map(([key, category], index) => {
            const isPlaceholder = currentWords[key as keyof typeof currentWords].includes('[');
            const colors = categoryColors[category.id as keyof typeof categoryColors];
            
            return (
              <div key={key} className="flex-1">
                <div className="space-y-4">
                  {/* External Category Title */}
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold ${colors.text} uppercase tracking-wide`}>
                      {category.label}
                    </h3>
                  </div>
                  
                  {/* Card */}
                  <div className={`${colors.bg} rounded-2xl shadow-sm border-2 ${colors.border} p-4 md:p-6 h-72 md:h-80 flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-opacity-60`}>
                    {/* Word Display */}
                    <div className="flex-1 flex flex-col justify-center text-center space-y-4">
                      <div className="space-y-2">
                        <p className="text-slate-600 text-xs md:text-sm">
                          {category.description.split('[WORD]')[0]}
                        </p>
                        
                        <div className={`min-h-[80px] flex items-center justify-center transition-all duration-300 ${
                          isPlaceholder 
                            ? 'text-slate-400 italic' 
                            : `bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent font-bold`
                        } ${isGenerating ? 'animate-pulse' : ''}`}>
                          <span className="text-lg md:text-2xl lg:text-3xl text-center leading-tight px-2">
                            {currentWords[key as keyof typeof currentWords]}
                          </span>
                        </div>
                        
                        <p className="text-slate-600 text-xs md:text-sm">
                          {category.description.split('[WORD]')[1]}
                        </p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
                      <button
                        onClick={() => generateWord(key as keyof typeof wordCategories)}
                        disabled={isGenerating}
                        className={`flex-1 ${colors.button} disabled:bg-slate-400 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm md:text-base`}
                      >
                        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">Refresh</span>
                        <span className="sm:hidden">↻</span>
                      </button>
                      
                      <button
                        onClick={() => handleCopyWord(currentWords[key as keyof typeof currentWords])}
                        disabled={isPlaceholder}
                        className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
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
      </div>
    </div>
  );
}

export default App;