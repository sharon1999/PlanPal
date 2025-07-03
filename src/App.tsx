import { ChatInterface } from './components/ChatInterface';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { usePersonalAssistant, useReminders } from './hooks/usePersonalAssistant';
import { CalendarReminders } from './components/CalendarReminders';
import { useEffect } from 'react';
import { sendRemindersContextToGemini } from './services/geminiService';

function App() {
  const { messages, isTyping, sendMessage } = usePersonalAssistant();
  const {
    reminders,
    addReminder,
    completeReminder,
    uncompleteReminder,
    // removeReminder,
    // setReminders,
  } = useReminders();

  const handleSpeakResponse = (text: string) => {
    // This is called when the assistant speaks a response
    console.log('Assistant speaking:', text);
  };

  useEffect(() => {
    sendRemindersContextToGemini(reminders);
  }, [reminders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Pattern */}


      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <Header />
        <div className="flex-1 flex min-h-0">
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
              {/* Calendar Reminders Area */}
            </div>
          </div>
          <CalendarReminders
            reminders={reminders}
            onAddReminder={addReminder}
            onCompleteReminder={completeReminder}
            onUncompleteReminder={uncompleteReminder}
          />

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