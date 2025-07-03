export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface VoiceState {
  isListening: boolean;
  isSupported: boolean;
  error: string | null;
}

export interface Reminder {
  id: string;
  title: string;
  date: string; // ISO date string
  completed: boolean;
}
