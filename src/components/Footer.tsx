import React from 'react';
import { VoiceControl } from './VoiceControl';

interface FooterProps {
  onTranscript: (text: string) => void;
  onSpeakResponse: (text: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onTranscript, onSpeakResponse }) => {
  return (
    <footer className="flex-shrink-0 p-6 border-t border-white/10 backdrop-blur-sm bg-white/5">
      <div className="max-w-4xl mx-auto">
        <VoiceControl
          onTranscript={onTranscript}
          onSpeakResponse={onSpeakResponse}
        />
      </div>
    </footer>
  );
}; 