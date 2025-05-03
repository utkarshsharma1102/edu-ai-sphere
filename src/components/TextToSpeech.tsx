
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { VolumeX, Volume2 } from 'lucide-react';
import VoiceControl from './VoiceControl';

interface TextToSpeechProps {
  text: string;
  autoSpeak?: boolean;
  showControls?: boolean;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ 
  text, 
  autoSpeak = false,
  showControls = true 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
    
    return () => {
      if (speechSynthesis && isSpeaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (speechSynthesis && text && autoSpeak) {
      speak();
    }
  }, [text, speechSynthesis, autoSpeak]);

  useEffect(() => {
    if (utterance) {
      utterance.rate = speechRate;
    }
  }, [speechRate, utterance]);

  const speak = () => {
    if (!speechSynthesis || !text.trim()) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = speechRate;
    
    newUtterance.onstart = () => setIsSpeaking(true);
    newUtterance.onend = () => setIsSpeaking(false);
    newUtterance.onerror = () => setIsSpeaking(false);
    
    setUtterance(newUtterance);
    speechSynthesis.speak(newUtterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis && isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSpeechRateChange = (newRate: number) => {
    setSpeechRate(newRate);
  };

  if (!speechSynthesis) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {showControls && (
        <Button
          variant="outline"
          size="sm"
          onClick={isSpeaking ? stopSpeaking : speak}
          className="flex items-center gap-2"
        >
          {isSpeaking ? (
            <>
              <VolumeX size={16} />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Volume2 size={16} />
              <span>Speak</span>
            </>
          )}
        </Button>
      )}
      
      {showControls && (
        <VoiceControl 
          speechRate={speechRate} 
          onSpeechRateChange={handleSpeechRateChange}
        />
      )}
    </div>
  );
};

export default TextToSpeech;
