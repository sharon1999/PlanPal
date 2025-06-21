import { useState, useCallback } from 'react';
import { Message } from '../types';
import { callGeminiAPI } from '../services/geminiService';

// Fallback responses for when Gemini API fails
const getFallbackResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm your personal assistant. How can I help you today?";
  }
  
  if (message.includes('time')) {
    return `The current time is ${new Date().toLocaleTimeString()}.`;
  }
  
  if (message.includes('date')) {
    return `Today is ${new Date().toLocaleDateString()}.`;
  }
  
  if (message.includes('weather')) {
    return "I'd be happy to help with weather information, but I don't have access to live weather data right now. You can check your local weather app or website for current conditions.";
  }
  
  if (message.includes('help') || message.includes('what can you do')) {
    return "I can help you with various tasks! I can tell you the time and date, have conversations, answer questions, and assist with general inquiries. Just speak to me or type your message!";
  }
  
  if (message.includes('thank')) {
    return "You're very welcome! I'm here whenever you need assistance.";
  }
  
  if (message.includes('bye') || message.includes('goodbye')) {
    return "Goodbye! Feel free to come back anytime you need help. Have a great day!";
  }
  
  // Default responses
  const responses = [
    "That's interesting! Could you tell me more about that?",
    "I understand. How can I assist you with that?",
    "Thanks for sharing that with me. What would you like to know?",
    "I'm here to help! What specific information are you looking for?",
    "That's a great question! Let me think about how I can best help you with that.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const usePersonalAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your personal assistant powered by Gemini AI. You can speak to me using the microphone or type your messages. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call Gemini API
      const response = await callGeminiAPI(text);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      
      // Use fallback response if Gemini API fails
      const fallbackResponse = getFallbackResponse(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage
  };
};