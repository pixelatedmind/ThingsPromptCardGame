import React, { useState } from 'react';
import { History, X, Share2, Trash2, Clock } from 'lucide-react';
import { GeneratedCombination } from '../types';

interface HistoryPanelProps {
  history: GeneratedCombination[];
  onClearHistory: () => void;
  onExport: (combination: GeneratedCombination) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onClearHistory,
  onExport
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-2xl shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-10 transform hover:scale-110"
      >
        <History className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
          {history.length}
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
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
                  onClick={onClearHistory}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  title="Clear all history"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
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
                        onClick={() => onExport(combination)}
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
    </>
  );
};