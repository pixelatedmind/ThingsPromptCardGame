import React, { useState, useCallback } from 'react';
import { RefreshCw, Zap, Sun, History } from 'lucide-react';

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
  const [showPastPrompts, setShowPastPrompts] = useState(true);
  const [animatingWords, setAnimatingWords] = useState({
    future: false,
    thing: false,
    theme: false
  });
  const [pastPrompts, setPastPrompts] = useState<Array<{
    id: string;
    future: string;
    thing: string;
    theme: string;
    timestamp: Date;
  }>>([]);

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
    setAnimatingWords(prev => ({ ...prev, [category]: true }));
    
    // Slot machine animation - cycle through words quickly then slow down
    const words = wordCategories[category].words;
    const animationDuration = 2000; // 2 seconds total
    const fastCycles = 15; // Number of fast cycles
    const slowCycles = 8; // Number of slow cycles
    
    // Fast cycling phase
    for (let i = 0; i < fastCycles; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWords(prev => ({ ...prev, [category]: randomWord }));
      await new Promise(resolve => setTimeout(resolve, 50)); // Fast speed
    }
    
    // Slow down phase
    for (let i = 0; i < slowCycles; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWords(prev => ({ ...prev, [category]: randomWord }));
      const delay = 80 + (i * 30); // Gradually slow down
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Final selection
    const newWord = getRandomWord(category);
    setCurrentWords(prev => ({
      ...prev,
      [category]: newWord
    }));
    
    setAnimatingWords(prev => ({ ...prev, [category]: false }));
    setIsGenerating(false);
  }, [getRandomWord]);

  const generateAllWords = useCallback(async () => {
    setIsGenerating(true);
    setAnimatingWords({ future: true, thing: true, theme: true });
    
    // Stagger the start of each animation slightly for more dynamic effect
    const categories: (keyof typeof wordCategories)[] = ['future', 'thing', 'theme'];
    const animationPromises = categories.map(async (category, index) => {
      // Slight stagger
      await new Promise(resolve => setTimeout(resolve, index * 100));
      
      const words = wordCategories[category].words;
      const fastCycles = 15;
      const slowCycles = 8;
      
      // Fast cycling phase
      for (let i = 0; i < fastCycles; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWords(prev => ({ ...prev, [category]: randomWord }));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Slow down phase
      for (let i = 0; i < slowCycles; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWords(prev => ({ ...prev, [category]: randomWord }));
        const delay = 80 + (i * 30);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      // Final selection
      const finalWord = getRandomWord(category);
      setCurrentWords(prev => ({ ...prev, [category]: finalWord }));
      setAnimatingWords(prev => ({ ...prev, [category]: false }));
    });
    
    // Wait for all animations to complete
    await Promise.all(animationPromises);
    setIsGenerating(false);
    
    // Add to past prompts if all words are valid
    if (currentWords.future && currentWords.thing && currentWords.theme && 
        !currentWords.future.includes('[') && !currentWords.thing.includes('[') && !currentWords.theme.includes('[')) {
      const newPrompt = {
        id: Date.now().toString(),
        future: currentWords.future,
        thing: currentWords.thing,
        theme: currentWords.theme,
        timestamp: new Date()
      };
      setPastPrompts(prev => [newPrompt, ...prev.slice(0, 9)]); // Keep last 10
    }
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="relative">
          <div className="relative">
            <Sun className="w-16 h-16 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-8 h-8 text-yellow-600 animate-pulse" />
            </div>
          </div>
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-green-200 rounded-full animate-ping opacity-20"></div>
            <div className="absolute w-24 h-24 border-2 border-blue-200 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
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
                {hasValidWords ? (
                  <>
                    {/* Prompt Content */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center text-xl lg:text-2xl xl:text-3xl leading-relaxed space-y-4 max-w-4xl">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">In a</span>
                          <span className={`inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${animatingWords.future ? 'animate-pulse scale-110' : ''}`}>
                            {currentWords.future}
                          </span>
                          <span className="text-slate-700">energy future,</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">there is a</span>
                          <span className={`inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${animatingWords.thing ? 'animate-pulse scale-110' : ''}`}>
                            {currentWords.thing}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">related to</span>
                          <span className={`inline-flex items-center bg-gradient-to-r from-purple-500 to-violet-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${animatingWords.theme ? 'animate-pulse scale-110' : ''}`}>
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
                        onClick={() => setShowPastPrompts(!showPastPrompts)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                      >
                        <History className="w-5 h-5" />
                        {showPastPrompts ? 'Hide History' : 'Past Prompts'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Prompt Content with Empty Placeholders */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center text-xl lg:text-2xl xl:text-3xl leading-relaxed space-y-4 max-w-4xl">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">In a</span>
                          <span className="inline-flex items-center bg-slate-200 px-8 py-2 rounded-xl shadow-sm">
                            &nbsp;
                          </span>
                          <span className="text-slate-700">energy future,</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">there is a</span>
                          <span className="inline-flex items-center bg-slate-200 px-8 py-2 rounded-xl shadow-sm">
                            &nbsp;
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <span className="text-slate-700">related to</span>
                          <span className="inline-flex items-center bg-slate-200 px-8 py-2 rounded-xl shadow-sm">
                            &nbsp;
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
                        onClick={() => setShowPastPrompts(!showPastPrompts)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                      >
                        <History className="w-5 h-5" />
                        {showPastPrompts ? 'Hide History' : 'Past Prompts'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Past Prompts Box */}
          {showPastPrompts && (
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <History className="w-5 h-5 text-indigo-600" />
                    Past Prompts
                  </h2>
                </div>
                
                <div className="p-6">
                  {pastPrompts.length === 0 ? (
                    <div className="text-center py-8">
                      <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">No Past Prompts Yet</h3>
                      <p className="text-slate-500">Generate some prompts to see your history here!</p>
                    </div>
                  ) : (
                    <div className="grid gap-3 max-h-80 overflow-y-auto">
                      {pastPrompts.map((prompt) => (
                        <div 
                          key={prompt.id} 
                          className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100 hover:border-slate-200"
                          onClick={() => {
                            setCurrentWords({
                              future: prompt.future,
                              thing: prompt.thing,
                              theme: prompt.theme
                            });
                          }}
                        >
                          <div className="text-base leading-relaxed mb-2 flex flex-wrap items-center gap-1">
                            <span className="text-slate-700">In a </span>
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-lg font-semibold text-sm">
                              {prompt.future}
                            </span>
                            <span className="text-slate-700"> energy future, there is a </span>
                            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-lg font-semibold text-sm">
                              {prompt.thing}
                            </span>
                            <span className="text-slate-700"> related to </span>
                            <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-2 py-1 rounded-lg font-semibold text-sm">
                              {prompt.theme}
                            </span>
                            <span className="text-slate-700">.</span>
                          </div>
                          <div className="text-xs text-slate-500">
                            {prompt.timestamp.toLocaleDateString()} at {prompt.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;