import React, { useState } from 'react';
import { Shuffle, Download, Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { WordCard } from './components/WordCard';
import { HistoryPanel } from './components/HistoryPanel';
import { IntegratedPromptPreview } from './components/IntegratedPromptPreview';
import { useWordGenerator } from './hooks/useWordGenerator';
import { wordCategories } from './data/wordCategories';

function App() {
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  
  const {
    currentWords,
    history,
    isGenerating,
    generateWord,
    generateAllWords,
    clearHistory,
    exportCombination
  } = useWordGenerator();

  const handleGenerateAllWords = () => {
    generateAllWords();
    setShowPromptPreview(true);
  };

  const handleCopyWord = (word: string) => {
    navigator.clipboard.writeText(word).then(() => {
      console.log('Word copied to clipboard');
    });
  };

  const handleCopyPrompt = () => {
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleTogglePreviewVisibility = () => {
    setShowPromptPreview(!showPromptPreview);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Subtle geometric background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
        <Header />
        
        {/* Integrated Prompt Preview - Top Position */}
        <IntegratedPromptPreview
          currentWords={currentWords}
          isVisible={showPromptPreview}
          isGenerating={isGenerating}
          onCopy={handleCopyPrompt}
          onRegenerate={handleGenerateAllWords}
          onToggleVisibility={handleTogglePreviewVisibility}
        />
        
        <main className="space-y-12">
          {/* Word Cards Section */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3">
                Build Your Prompt
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Generate individual words or create a complete prompt combination
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          </section>

          {/* Action Controls */}
          <section className="flex flex-col items-center space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-md">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Ready to Create?
                  </h3>
                  <p className="text-sm text-slate-600">
                    Generate a complete prompt or export your current combination
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleGenerateAllWords}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <Shuffle className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                    Generate Complete Prompt
                  </button>
                  
                  <button
                    onClick={() => exportCombination()}
                    disabled={currentWords.future.includes('[') || isGenerating}
                    className="w-full bg-white hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 text-slate-700 border border-slate-300 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    <Download className="w-4 h-4" />
                    Export Current
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* History Panel */}
        <HistoryPanel
          history={history}
          onClearHistory={clearHistory}
          onExport={exportCombination}
        />
      </div>
    </div>
  );
}

export default App;