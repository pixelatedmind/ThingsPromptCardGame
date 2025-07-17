import React, { useState, useCallback } from 'react';
import { RefreshCw, History } from 'lucide-react';

// Types
interface WordCategory {
  id: string;
  label: string;
  description: string;
  words: string[];
}

interface LetterBoxProps {
  letter: string;
  isAnimating: boolean;
  animationDelay: number;
}

// Letter Box Component with split-flip animation
const LetterBox: React.FC<LetterBoxProps> = ({ letter, isAnimating, animationDelay }) => {
  const [currentLetter, setCurrentLetter] = useState(letter);
  const [isFlipping, setIsFlipping] = useState(false);

  React.useEffect(() => {
    if (isAnimating) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setCurrentLetter(letter);
        setIsFlipping(false);
      }, animationDelay);
      return () => clearTimeout(timer);
    } else {
      setCurrentLetter(letter);
      setIsFlipping(false);
    }
  }, [letter, isAnimating, animationDelay]);

  return (
    <div className="relative w-8 h-12 mx-0.5">
      <div className={`absolute inset-0 bg-white border-2 border-slate-300 rounded-lg shadow-sm transition-transform duration-200 ${isFlipping ? 'animate-pulse' : ''}`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className={`text-xl font-bold text-slate-700 transition-all duration-150 ${isFlipping ? 'blur-sm' : ''}`}>
            {currentLetter}
          </span>
        </div>
      </div>
      {isFlipping && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200 border-2 border-slate-400 rounded-lg shadow-md animate-ping opacity-50"></div>
      )}
    </div>
  );
};

// Word Display Component
interface WordDisplayProps {
  word: string;
  maxLength: number;
  isAnimating: boolean;
  gradientClass: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, maxLength, isAnimating, gradientClass }) => {
  const letters = word.padEnd(maxLength, ' ').split('').slice(0, maxLength);
  
  return (
    <div className={`inline-flex items-center bg-gradient-to-r ${gradientClass} px-4 py-3 rounded-2xl shadow-lg`}>
      <div className="flex items-center">
        {letters.map((letter, index) => (
          <LetterBox
            key={index}
            letter={letter === ' ' ? '' : letter}
            isAnimating={isAnimating}
            animationDelay={index * 50 + 100}
          />
        ))}
      </div>
    </div>
  );
};

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
    future: '',
    thing: '',
    theme: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
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

  // Calculate max lengths for each category
  const maxLengths = {
    future: Math.max(...wordCategories.future.words.map(w => w.length)),
    thing: Math.max(...wordCategories.thing.words.map(w => w.length)),
    theme: Math.max(...wordCategories.theme.words.map(w => w.length))
  };

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

  const getRandomLetter = useCallback((): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  }, []);

  const generateWord = useCallback(async (category: keyof typeof wordCategories) => {
    setIsGenerating(true);
    setAnimatingWords(prev => ({ ...prev, [category]: true }));
    
    const finalWord = getRandomWord(category);
    const animationDuration = 2000;
    const letterAnimationSteps = 20;
    
    // Animate each letter position
    for (let step = 0; step < letterAnimationSteps; step++) {
      let animatedWord = '';
      for (let i = 0; i < maxLengths[category]; i++) {
        if (i < finalWord.length) {
          if (step < letterAnimationSteps - 3) {
            // Random letters during animation
            animatedWord += getRandomLetter();
          } else {
            // Gradually reveal final word
            animatedWord += finalWord[i];
          }
        } else {
          animatedWord += ' ';
        }
      }
      
      setCurrentWords(prev => ({ ...prev, [category]: animatedWord.trimEnd() }));
      
      const delay = 50 + (step * 10); // Gradually slow down
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Set final word
    setCurrentWords(prev => ({ ...prev, [category]: finalWord }));
    setAnimatingWords(prev => ({ ...prev, [category]: false }));
    setIsGenerating(false);
  }, [getRandomWord, getRandomLetter, maxLengths]);

  const generateAllWords = useCallback(async () => {
    setIsGenerating(true);
    setAnimatingWords({ future: true, thing: true, theme: true });
    
    const categories: (keyof typeof wordCategories)[] = ['future', 'thing', 'theme'];
    const animationPromises = categories.map(async (category, index) => {
      // Slight stagger
      await new Promise(resolve => setTimeout(resolve, index * 100));
      
      const finalWord = getRandomWord(category);
      const letterAnimationSteps = 25;
      
      // Animate each letter position with split-flip effect
      for (let step = 0; step < letterAnimationSteps; step++) {
        let animatedWord = '';
        for (let i = 0; i < maxLengths[category]; i++) {
          if (i < finalWord.length) {
            if (step < letterAnimationSteps - 4) {
              // Random letters during animation
              animatedWord += getRandomLetter();
            } else {
              // Gradually reveal final word
              animatedWord += finalWord[i];
            }
          } else {
            animatedWord += ' ';
          }
        }
        
        setCurrentWords(prev => ({ ...prev, [category]: animatedWord.trimEnd() }));
        
        const delay = 40 + (step * 8); // Gradually slow down
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      // Set final word
      setCurrentWords(prev => ({ ...prev, [category]: finalWord }));
      setAnimatingWords(prev => ({ ...prev, [category]: false }));
    });
    
    await Promise.all(animationPromises);
    setIsGenerating(false);
    
    // Add to past prompts
    if (currentWords.future && currentWords.thing && currentWords.theme) {
      const newPrompt = {
        id: Date.now().toString(),
        future: currentWords.future,
        thing: currentWords.thing,
        theme: currentWords.theme,
        timestamp: new Date()
      };
      setPastPrompts(prev => [newPrompt, ...prev.slice(0, 9)]);
    }
  }, [getRandomWord, getRandomLetter, maxLengths, currentWords]);

  const hasValidWords = currentWords.future && currentWords.thing && currentWords.theme;

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="relative">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-indigo-100 rounded-full animate-ping opacity-20"></div>
            <div className="absolute w-24 h-24 border-2 border-purple-100 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-8">
      {/* Casino-style background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ffd700 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #ff6b6b 2px, transparent 2px)`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 auto-rows-min">
          
          {/* Main Prompt Display - Casino Style */}
          <div className="lg:col-span-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border-2 border-yellow-400 overflow-hidden h-full">
              
              <div className="p-8 lg:p-12 h-full flex flex-col">
                {hasValidWords ? (
                  <>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center text-xl lg:text-2xl xl:text-3xl leading-relaxed space-y-6 max-w-6xl">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <span className="text-yellow-300 font-semibold">In a</span>
                          <WordDisplay
                            word={currentWords.future}
                            maxLength={maxLengths.future}
                            isAnimating={animatingWords.future}
                            gradientClass="from-blue-500 to-cyan-400"
                          />
                          <span className="text-yellow-300 font-semibold">energy future,</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <span className="text-yellow-300 font-semibold">there is a</span>
                          <WordDisplay
                            word={currentWords.thing}
                            maxLength={maxLengths.thing}
                            isAnimating={animatingWords.thing}
                            gradientClass="from-green-500 to-emerald-400"
                          />
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <span className="text-yellow-300 font-semibold">related to</span>
                          <WordDisplay
                            word={currentWords.theme}
                            maxLength={maxLengths.theme}
                            isAnimating={animatingWords.theme}
                            gradientClass="from-purple-500 to-violet-400"
                          />
                          <span className="text-yellow-300 font-semibold">.</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                      <button
                        onClick={generateAllWords}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-slate-500 disabled:to-slate-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 border-2 border-yellow-400"
                      >
                        <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                        SPIN THE REELS
                      </button>
                      
                      <button
                        onClick={() => setShowPastPrompts(!showPastPrompts)}
                        className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 border-2 border-slate-600"
                      >
                        <History className="w-5 h-5" />
                        {showPastPrompts ? 'HIDE HISTORY' : 'PAST SPINS'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center text-xl lg:text-2xl xl:text-3xl leading-relaxed space-y-6 max-w-6xl">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <span className="text-yellow-300 font-semibold">In a</span>
                          <div className="inline-flex items-center bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-3 rounded-2xl shadow-lg border-2 border-slate-500">
                            <div className="flex items-center">
                              {Array.from({ length: maxLengths.future }).map((_, index) => (
                                <div key={index} className="w-8 h-12 mx-0.5 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-sm"></div>
                              ))}
                            </div>
                          </div>
                          <span className="text-yellow-300 font-semibold">energy future,</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <span className="text-yellow-300 font-semibold">there is a</span>
                          <div className="inline-flex items-center bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-3 rounded-2xl shadow-lg border-2 border-slate-500">
                            <div className="flex items-center">
                              {Array.from({ length: maxLengths.thing }).map((_, index) => (
                                <div key={index} className="w-8 h-12 mx-0.5 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-sm"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          <span className="text-yellow-300 font-semibold">related to</span>
                          <div className="inline-flex items-center bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-3 rounded-2xl shadow-lg border-2 border-slate-500">
                            <div className="flex items-center">
                              {Array.from({ length: maxLengths.theme }).map((_, index) => (
                                <div key={index} className="w-8 h-12 mx-0.5 bg-slate-800 border-2 border-slate-600 rounded-lg shadow-sm"></div>
                              ))}
                            </div>
                          </div>
                          <span className="text-yellow-300 font-semibold">.</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                      <button
                        onClick={generateAllWords}
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-slate-500 disabled:to-slate-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 border-2 border-yellow-400"
                      >
                        <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                        SPIN THE REELS
                      </button>
                      
                      <button
                        onClick={() => setShowPastPrompts(!showPastPrompts)}
                        className="bg-slate-700 hover:bg-slate-600 text-yellow-300 px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 border-2 border-slate-600"
                      >
                        <History className="w-5 h-5" />
                        {showPastPrompts ? 'HIDE HISTORY' : 'PAST SPINS'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Past Prompts Box - Casino Style */}
          {showPastPrompts && (
            <div className="lg:col-span-8">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border-2 border-yellow-400 overflow-hidden">
                <div className="p-6 border-b border-yellow-400/30">
                  <h2 className="text-xl font-bold text-yellow-300 flex items-center gap-3">
                    <History className="w-5 h-5 text-yellow-400" />
                    PAST SPINS
                  </h2>
                </div>
                
                <div className="p-6">
                  {pastPrompts.length === 0 ? (
                    <div className="text-center py-8">
                      <History className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-slate-400 mb-2">No Past Spins Yet</h3>
                      <p className="text-slate-500">Spin the reels to see your history here!</p>
                    </div>
                  ) : (
                    <div className="grid gap-3 max-h-80 overflow-y-auto">
                      {pastPrompts.map((prompt) => (
                        <div 
                          key={prompt.id} 
                          className="bg-slate-700/50 rounded-xl p-4 hover:bg-slate-600/50 transition-colors cursor-pointer border border-slate-600 hover:border-yellow-400/50"
                          onClick={() => {
                            setCurrentWords({
                              future: prompt.future,
                              thing: prompt.thing,
                              theme: prompt.theme
                            });
                          }}
                        >
                          <div className="text-base leading-relaxed mb-2 flex flex-wrap items-center gap-1">
                            <span className="text-yellow-300">In a </span>
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-2 py-1 rounded-lg font-semibold text-sm">
                              {prompt.future}
                            </span>
                            <span className="text-yellow-300"> energy future, there is a </span>
                            <span className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-2 py-1 rounded-lg font-semibold text-sm">
                              {prompt.thing}
                            </span>
                            <span className="text-yellow-300"> related to </span>
                            <span className="bg-gradient-to-r from-purple-500 to-violet-400 text-white px-2 py-1 rounded-lg font-semibold text-sm">
                              {prompt.theme}
                            </span>
                            <span className="text-yellow-300">.</span>
                          </div>
                          <div className="text-xs text-slate-400">
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