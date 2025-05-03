
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

// Add TypeScript declarations for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

// Declare the SpeechRecognition constructor
interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
  prototype: SpeechRecognition;
}

// Extend Window interface to include Speech Recognition
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export interface VoiceControlProps {
  speechRate?: number;
  onSpeechRateChange?: (newRate: number) => void;
  onVoiceInput?: (text: string) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const VoiceControl: React.FC<VoiceControlProps> = ({ 
  speechRate = 1.0, 
  onSpeechRateChange,
  onVoiceInput,
  variant
}) => {
  const [isListening, setIsListening] = useState(false);

  // Function to handle speech recognition
  const startListening = () => {
    if (!onVoiceInput) return;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        setIsListening(true);
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          if (onVoiceInput) {
            onVoiceInput(transcript);
          }
          setIsListening(false);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      }
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant={variant || "ghost"} 
          size="icon" 
          className={`${variant ? '' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} ${isListening ? 'animate-pulse bg-red-100' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            if (onVoiceInput) {
              startListening();
            }
          }}
        >
          <Mic className={`h-5 w-5 ${isListening ? 'text-red-500' : 'text-gray-500'}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">Voice Settings</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Speech Rate</span>
              <span className="text-sm font-medium">{speechRate.toFixed(1)}x</span>
            </div>
            <Slider
              value={[speechRate]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={(value) => onSpeechRateChange && onSpeechRateChange(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>
          {onVoiceInput && (
            <div className="pt-2">
              <Button 
                className="w-full" 
                onClick={startListening}
                variant="outline"
                disabled={isListening}
              >
                {isListening ? 'Listening...' : 'Start Voice Input'}
              </Button>
              <p className="text-xs text-center mt-2 text-gray-500">
                Click to speak and give voice commands
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VoiceControl;
