
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type VoiceControlProps = {
  onVoiceInput?: (text: string) => void;
};

const VoiceControl: React.FC<VoiceControlProps> = ({ onVoiceInput }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if browser supports speech recognition
    const supported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSupported(supported);
    
    if (!supported) {
      console.log("Speech recognition not supported in this browser");
    }
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
    toast({
      title: "Voice Recognition",
      description: "Voice recognition feature coming soon! We're working on it.",
    });
    // For demonstration purposes, we're just toggling the state
    setIsListening(true);
    
    // In a real implementation, you would connect to SpeechRecognition API
    setTimeout(() => {
      // Simulate stopping after 3 seconds
      stopListening();
      
      // Send simulated result
      if (onVoiceInput) {
        onVoiceInput("What is the theory of relativity?");
      }
    }, 3000);
  };
  
  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <Button
      onClick={toggleListening}
      variant={isListening ? "secondary" : "outline"}
      size="icon"
      className={isListening ? "animate-pulse" : ""}
      aria-label={isListening ? "Stop listening" : "Start voice recognition"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" x2="12" y1="19" y2="22"></line>
      </svg>
    </Button>
  );
};

export default VoiceControl;
