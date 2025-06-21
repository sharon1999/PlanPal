import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { VoiceState } from '../types';

interface VoiceControlProps {
  onTranscript: (text: string) => void;
  onSpeakResponse: (text: string) => void;
}

export const VoiceControl: React.FC<VoiceControlProps> = ({ onTranscript, onSpeakResponse }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSupported: false,
    error: null
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setVoiceState(prev => ({ ...prev, isListening: true, error: null }));
      };

      recognitionRef.current.onresult = (event: { results: { transcript: any; }[][]; }) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        setVoiceState(prev => ({ ...prev, isListening: false }));
      };

      recognitionRef.current.onerror = () => {
        setVoiceState(prev => ({ 
          ...prev, 
          isListening: false, 
          error: 'Speech recognition error. Please try again.' 
        }));
      };

      setVoiceState(prev => ({ ...prev, isSupported: true }));
    }
  }, [onTranscript]);

  const startListening = () => {
    if (recognitionRef.current && !voiceState.isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && voiceState.isListening) {
      recognitionRef.current.stop();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
      onSpeakResponse(text);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {voiceState.isSupported ? (
        <button
          onClick={voiceState.isListening ? stopListening : startListening}
          disabled={isSpeaking}
          className={`relative p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 ${
            voiceState.isListening
              ? 'bg-red-500/30 text-red-300 shadow-lg shadow-red-500/25'
              : isSpeaking
              ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white hover:from-blue-500/40 hover:to-cyan-500/40 shadow-lg shadow-blue-500/25'
          }`}
        >
          {voiceState.isListening ? (
            <>
              <MicOff size={24} />
              <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse"></div>
            </>
          ) : (
            <Mic size={24} />
          )}
        </button>
      ) : (
        <div className="text-red-400 text-sm">Speech not supported</div>
      )}
      
      {isSpeaking && (
        <div className="flex items-center gap-2 text-blue-400">
          <Volume2 size={20} className="animate-pulse" />
          <span className="text-sm">Speaking...</span>
        </div>
      )}
      
      {voiceState.error && (
        <div className="text-red-400 text-sm">{voiceState.error}</div>
      )}
      
      <div className="text-xs text-gray-400 max-w-xs">
        {voiceState.isListening 
          ? 'Listening... Speak now' 
          : isSpeaking
          ? 'Assistant is speaking'
          : 'Click microphone to speak'
        }
      </div>
    </div>
  );
};