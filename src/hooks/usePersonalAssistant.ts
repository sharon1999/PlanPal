import { useState, useCallback } from 'react';
import { Message } from '../types';
import { callGeminiAPI } from '../services/geminiService';

// Fallback responses for when Gemini API fails - focused on planning and reminders
const getFallbackResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm PlanPal, your AI day planner and reminder assistant. How can I help you organize your day today?";
  }
  
  if (message.includes('plan') || message.includes('schedule') || message.includes('day')) {
    return "I'd love to help you plan your day! What tasks or activities do you have on your plate? I can help you create an optimal schedule.";
  }
  
  if (message.includes('remind') || message.includes('reminder')) {
    return "I can help you set reminders! What would you like me to remind you about and when?";
  }
  
  if (message.includes('task') || message.includes('todo') || message.includes('to do')) {
    return "Let's manage your tasks! Would you like to add a new task, see your current to-do list, or prioritize your existing tasks?";
  }
  
  if (message.includes('time') || message.includes('when')) {
    return `The current time is ${new Date().toLocaleTimeString()}. Would you like me to help you schedule something for a specific time?`;
  }
  
  if (message.includes('date') || message.includes('today')) {
    return `Today is ${new Date().toLocaleDateString()}. How would you like to plan your day?`;
  }
  
  if (message.includes('help') || message.includes('what can you do')) {
    return "I'm PlanPal, your personal day planner! I can help you plan your day, set reminders, manage tasks, create schedules, and provide productivity tips. Just tell me what you need help organizing!";
  }
  
  if (message.includes('thank')) {
    return "You're very welcome! I'm here to help you stay organized and productive. Is there anything else you'd like to plan or organize?";
  }
  
  if (message.includes('bye') || message.includes('goodbye')) {
    return "Goodbye! Have a productive day ahead. Don't forget to check your reminders and stick to your schedule!";
  }
  
  // Default planning-focused responses
  const responses = [
    "I'd be happy to help you plan that! Could you give me more details about what you'd like to organize?",
    "That sounds like something we can plan together! What's your timeline and what resources do you need?",
    "Let me help you break that down into manageable steps. What's the first thing you'd like to tackle?",
    "Great! I can help you create a schedule for that. When would you like to start?",
    "That's a good planning question! Let me help you organize your thoughts and create a structured approach.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const usePersonalAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm PlanPal, your AI-powered day planner and reminder assistant. I can help you plan your day, set reminders, manage tasks, and stay organized. How can I help you today?",
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
      // Call Gemini API with PlanPal system prompt
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
      
      // Use planning-focused fallback response if Gemini API fails
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