import React from 'react';
import { Bot } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 p-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Personal Assistant</h1>
            <p className="text-sm text-gray-400">Your AI-powered helper</p>
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}; 