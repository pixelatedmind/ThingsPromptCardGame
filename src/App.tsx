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
    promptImageUrl,
    isImageLoading,
    backgroundImageUrl,
    isBackgroundLoading,
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
      {/* Background Image */}
      {backgroundImageUrl && !isBackgroundLoading && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImageUrl}
            alt="Background inspiration"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log('Background image failed to load:', backgroundImageUrl);
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-indigo-50/85 to-purple-50/90"></div>
        </div>
      )}
      
      {/* Fallback gradient background */}
      {(!backgroundImageUrl || isBackgroundLoading) && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      )}
      
      {/* Loading indicator for background */}
      {isBackgroundLoading && (
        <div className="absolute top-4 right-4 z-10">
          <div className="text-gray-600 text-sm bg-white bg-opacity-80 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
            Loading background...
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Header />
        
        <main className="relative z-10">
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
            promptImageUrl={promptImageUrl}
            isImageLoading={isImageLoading}
            onClose={handleCloseFullscreenPrompt}
          />
        )}
      </div>
    </div>
  );
}

export default App;