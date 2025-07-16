import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="relative">
          <Lightbulb className="w-8 h-8 text-yellow-500" />
          <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Things Prompt Card Game
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Generate unique science fiction writing prompts to spark your creativity. 
        Perfect for writers, game masters, and creative minds looking for inspiration.
      </p>
    </header>
  );
};