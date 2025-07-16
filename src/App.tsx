import React, { useState } from 'react';
import { Shuffle, Download } from 'lucide-react';
import { Header } from './components/Header';
import { WordCard } from './components/WordCard';
import { HistoryPanel } from './components/HistoryPanel';
import { FullscreenPromptDisplay } from './components/FullscreenPromptDisplay';
import { useWordGenerator } from './hooks/useWordGenerator';
import { wordCategories } from './data/wordCategories';

function App() {
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
  
  const {
    currentWords,
    history,
    isGenerating,
    generateWord,
    generateAllWords,
    clearHistory,
    exportCombination
  } = useWordGenerator();

  const handleGenerateAllWords = async () => {
    await generateAllWords();
    // Show fullscreen display after generation is complete
    setTimeout(() => {
      setShowFullscreenPrompt(true);
    }, 100);
  };

  const handleCloseFullscreenPrompt = () => {
    setShowFullscreenPrompt(false);
  };

  const handleCopyWord = (word: string) => {
    navigator.clipboard.writeText(word).then(() => {
      // Could show a toast notification here
      console.log('Word copied to clipboard');
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated CSS Blobs Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Large moving blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Medium floating blobs */}
        <div className="absolute top-1/2 left-1/6 w-48 h-48 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/6 w-56 h-56 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/6 right-1/3 w-40 h-40 bg-violet-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Small accent blobs */}
        <div className="absolute top-2/3 left-1/3 w-32 h-32 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/6 left-2/3 w-36 h-36 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse-slow" style={{ animationDelay: '3.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <Header />
        
        <main>
          {/* Word Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {Object.entries(wordCategories).map(([key, category]) => (
              <WordCard
                key={key}
                category={category}
                currentWord={currentWords[key as keyof typeof currentWords]}
                onRefresh={() => generateWord(key as keyof typeof wordCategories)}
                onCopy={() => handleCopyWord(currentWords[key as keyof typeof currentWords])}
                isGenerating={isGenerating}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={handleGenerateAllWords}
              onKeyDown={(e) => handleKeyDown(e, handleGenerateAllWords)}
              disabled={isGenerating}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-400 disabled:to-purple-400 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Generate new random word combination"
            >
              <Shuffle className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              Generate & Present
            </button>
            
            <button
              onClick={() => exportCombination()}
              disabled={currentWords.future.includes('[') || isGenerating}
              className="bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Export current combination"
            >
              <Download className="w-4 h-4" />
              Export Current
            </button>
          </div>

          {/* Current Combination Display */}
          {!currentWords.future.includes('[') && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                Your Writing Prompt:
              </h2>
              <p className="text-xl text-gray-800 text-center leading-relaxed">
                In a <span className="font-bold text-indigo-600">{currentWords.future}</span> future, 
                there is a <span className="font-bold text-green-600">{currentWords.thing}</span> related 
                to <span className="font-bold text-purple-600">{currentWords.theme}</span>.
              </p>
            </div>
          )}
        </main>

        {/* History Panel */}
        <HistoryPanel
          history={history}
          onClearHistory={clearHistory}
          onExport={exportCombination}
        />

        {/* Fullscreen Prompt Display */}
        {showFullscreenPrompt && (
          <FullscreenPromptDisplay
            currentWords={currentWords}
            onClose={handleCloseFullscreenPrompt}
          />
        )}
        </div>
      )}
    </div>
  );
}

export default App;