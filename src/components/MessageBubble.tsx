import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
          : 'bg-gradient-to-r from-blue-500 to-teal-500'
      }`}>
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>
      
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl backdrop-blur-sm border border-white/10 ${
        isUser
          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white'
          : 'bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-white'
      }`}>
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p className="text-xs opacity-60 mt-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};