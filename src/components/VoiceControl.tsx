
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff } from 'lucide-react';

// Add type declarations for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onstart: () => void;
}

// Declare WebkitSpeechRecognition globally
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

type VoiceControlProps = {
  onVoiceInput?: (text: string) => void;
  size?: 'default' | 'sm' | 'lg'; // Allow customizing button size
  variant?: 'default' | 'outline' | 'secondary'; // Allow customizing button variant
};

const VoiceControl: React.FC<VoiceControlProps> = ({ 
  onVoiceInput,
  size = 'default',
  variant = 'outline'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          if (onVoiceInput) {
            onVoiceInput(finalTranscript);
          }
          stopListening();
        } else {
          setInterimTranscript(interimTranscript);
        }
      };
      
      recognitionInstance.onerror = (event: SpeechRecognitionEvent) => {
        console.error('Speech recognition error', event.error);
        
        let errorMessage = "Recognition error. Please try again.";
        if (event.error === 'not-allowed') {
          errorMessage = "Microphone access denied. Please allow microphone access in your browser settings.";
        } else if (event.error === 'network') {
          errorMessage = "Network error. Please check your connection.";
        } else if (event.error === 'no-speech') {
          errorMessage = "No speech detected. Please try again.";
        }
        
        toast({
          title: "Recognition Error",
          description: errorMessage,
          variant: "destructive",
        });
        stopListening();
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };
      
      setRecognition(recognitionInstance);
    } else {
      console.log("Speech recognition not supported in this browser");
    }
    
    // Cleanup
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser. Please try Chrome.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
        toast({
          title: "Listening",
          description: "Speak now. I'm listening...",
        });
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast({
          title: "Error",
          description: "Could not start speech recognition. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  let buttonSize = 'size="icon"';
  if (size === 'sm') buttonSize = 'size="sm"';
  if (size === 'lg') buttonSize = 'size="lg"';

  return (
    <>
      <Button
        onClick={toggleListening}
        variant={isListening ? "secondary" : variant}
        size="icon"
        className={`${isListening ? "animate-pulse" : ""} relative`}
        aria-label={isListening ? "Stop listening" : "Start voice recognition"}
      >
        {isListening ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
        
        {/* Animation for active recording */}
        {isListening && (
          <span className="absolute w-full h-full rounded-full bg-primary opacity-20 animate-ping"></span>
        )}
      </Button>
      
      {/* Display interim transcript if available */}
      {interimTranscript && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-50 max-w-xs text-center">
          {interimTranscript}
        </div>
      )}
    </>
  );
};

export default VoiceControl;
