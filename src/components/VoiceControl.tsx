
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export interface VoiceControlProps {
  speechRate?: number;
  onSpeechRateChange?: (newRate: number) => void;
  onVoiceInput?: (text: string) => void;
  variant?: string;
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
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
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
