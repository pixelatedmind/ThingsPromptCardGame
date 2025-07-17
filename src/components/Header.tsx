import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-16">
      <div className="space-y-6">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-lg">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
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
        
        {/* Subtitle */}
        <div className="max-w-3xl mx-auto space-y-3">
          <p className="text-lg text-slate-700 font-medium">
            Generate unique science fiction writing prompts to spark your creativity
          </p>
          <p className="text-slate-600">
            Perfect for writers, game masters, and creative minds looking for inspiration
          </p>
        </div>
        
        {/* Visual separator */}
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};