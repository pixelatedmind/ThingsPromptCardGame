import React, { useState } from 'react';
import { Shuffle, RefreshCw, Copy, History, Clock, X, Share2, Trash2, Sparkles } from 'lucide-react';
import { useWordGenerator } from './hooks/useWordGenerator';
import { wordCategories } from './data/wordCategories';

function App() {
  const [showHistory, setShowHistory] = useState(false);
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
      mutedBg: 'bg-blue-25',
      border: 'border-blue-200',
      text: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    thing: {
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      mutedBg: 'bg-green-25',
      border: 'border-green-200',
      text: 'text-green-700',
      button: 'bg-green-600 hover:bg-green-700'
    },
    theme: {
      gradient: 'from-purple-500 to-violet-500',
      bg: 'bg-purple-50',
      mutedBg: 'bg-purple-25',
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
                <Sparkles className="w-8 h-8 text-white" />
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

          {/* Word Cards - Three Equal Columns with External Titles */}
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
                  
                  {/* Card with Muted Background */}
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

        {/* History FAB */}
        {history.length > 0 && (
          <button
            onClick={() => setShowHistory(true)}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-2xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-10 transform hover:scale-110"
          >
            <History className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
              {history.length}
            </span>
          </button>
        )}

        {/* History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Generation History</h2>
                    <p className="text-sm text-slate-600">{history.length} saved prompts</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearHistory}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    title="Clear all history"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[60vh] p-6">
                <div className="space-y-4">
                  {history.map((combination, index) => (
                    <div
                      key={combination.id}
                      className="group bg-slate-50 hover:bg-slate-100 rounded-2xl p-6 transition-all duration-200 border border-slate-200 hover:border-slate-300 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          {/* Prompt Text */}
                          <div className="text-slate-900 leading-relaxed">
                            In a{' '}
                            <span className="inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                              {combination.future}
                            </span>{' '}
                            future, there is a{' '}
                            <span className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                              {combination.thing}
                            </span>{' '}
                            related to{' '}
                            <span className="inline-flex items-center bg-gradient-to-r from-purple-500 to-violet-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                              {combination.theme}
                            </span>
                            .
                          </div>
                          
                          {/* Metadata */}
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {combination.timestamp.toLocaleString()}
                            </span>
                            <span className="bg-slate-200 px-2 py-1 rounded-full">
                              #{history.length - index}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <button
                          onClick={() => exportCombination(combination)}
                          className="ml-4 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          title="Share this combination"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;