import React, { useState } from 'react';
import { History, X, Share2, Trash2 } from 'lucide-react';
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
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-10"
        aria-label="View history"
      >
        <History className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {history.length}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Generation History</h2>
              <div className="flex gap-2">
                <button
                  onClick={onClearHistory}
                  className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Clear all history"
                  title="Clear all history"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Close history"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[60vh] p-6">
              <div className="space-y-4">
                {history.map((combination) => (
                  <div
                    key={combination.id}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-900 mb-2">
                          In a <span className="font-semibold text-indigo-600">{combination.future}</span> future, 
                          there is a <span className="font-semibold text-green-600">{combination.thing}</span> related 
                          to <span className="font-semibold text-purple-600">{combination.theme}</span>.
                        </p>
                        <p className="text-xs text-gray-500">
                          {combination.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => onExport(combination)}
                        className="ml-4 text-gray-500 hover:text-indigo-600 p-1 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        aria-label="Share this combination"
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