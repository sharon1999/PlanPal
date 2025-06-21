import { ChatInterface } from './components/ChatInterface';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { usePersonalAssistant } from './hooks/usePersonalAssistant';

function App() {
  const { messages, isTyping, sendMessage } = usePersonalAssistant();
  
  const handleSpeakResponse = (text: string) => {
    // This is called when the assistant speaks a response
    console.log('Assistant speaking:', text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Pattern */}
   
      
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex-1 flex min-h-0">
          <div className="flex-1 max-w-4xl mx-auto flex flex-col min-h-0">
            {/* Chat Area */}
            <div className="flex-1 backdrop-blur-sm bg-white/5 border-x border-white/10 min-h-0">
              <ChatInterface
                messages={messages}
                onSendMessage={sendMessage}
                isTyping={isTyping}
              />
            </div>
          </div>
        </div>

        {/* Voice Control Footer */}
        <Footer
          onTranscript={sendMessage}
          onSpeakResponse={handleSpeakResponse}
        />
      </div>
    </div>
  );
}

export default App;