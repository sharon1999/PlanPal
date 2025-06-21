import React from 'react';
import { ChatInterface } from './components/ChatInterface';
import { VoiceControl } from './components/VoiceControl';
import { usePersonalAssistant } from './hooks/usePersonalAssistant';
import { Bot } from 'lucide-react';

function App() {
  const { messages, isTyping, sendMessage } = usePersonalAssistant();

  const handleSpeakResponse = (text: string) => {
    // This is called when the assistant speaks a response
    console.log('Assistant speaking:', text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
   
      
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="p-6 border-b border-white/10 backdrop-blur-sm bg-white/5">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
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

        {/* Main Content */}
        <div className="flex-1 flex">
          <div className="flex-1 max-w-4xl mx-auto flex flex-col">
            {/* Chat Area */}
            <div className="flex-1 backdrop-blur-sm bg-white/5 border-x border-white/10">
              <ChatInterface
                messages={messages}
                onSendMessage={sendMessage}
                isTyping={isTyping}
              />
            </div>
          </div>
        </div>

        {/* Voice Control Footer */}
        <footer className="p-6 border-t border-white/10 backdrop-blur-sm bg-white/5">
          <div className="max-w-4xl mx-auto">
            <VoiceControl
              onTranscript={sendMessage}
              onSpeakResponse={handleSpeakResponse}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;