
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import VoiceControl from './VoiceControl';
import { Volume2, VolumeX } from 'lucide-react';

type Message = {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

interface AIChatbotProps {
  initialInput?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your AI educational assistant. What would you like to learn about today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const AIChatbot: React.FC<AIChatbotProps> = ({ initialInput = '' }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();
  const speechSynthesis = window.speechSynthesis;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect to handle initialInput changes
  useEffect(() => {
    if (initialInput && initialInput !== input) {
      setInput(initialInput);
    }
  }, [initialInput]);

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Effect to handle speech synthesis
  useEffect(() => {
    return () => {
      // Cleanup any ongoing speech when component unmounts
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response - in a real app, this would be an API call to OpenAI or similar
    setTimeout(() => {
      const aiResponse = generateMockResponse(input);
      const aiResponseMessage: Message = {
        id: messages.length + 2,
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponseMessage]);
      setIsLoading(false);

      // Speak the response if not muted
      if (!isMuted) {
        speakText(aiResponse);
      }
    }, 1500);
  };
  
  // Mock response generator - replace with actual API call in production
  const generateMockResponse = (query: string): string => {
    const responses = [
      `Based on your question about "${query}", I'd recommend starting with the fundamentals. Would you like to explore a specific aspect of this topic?`,
      `That's a great question about "${query}"! This is a fascinating subject. I can help you understand it step by step.`,
      `I found some information about "${query}". This topic connects to several key concepts in the curriculum. Shall we dive deeper?`,
      `Learning about "${query}" is valuable! I can recommend some courses and resources that cover this in detail.`,
      `"${query}" is actually something many students ask about. Let me explain it in a way that's easy to understand.`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const handleVoiceInput = (text: string) => {
    setInput(text);
    toast({
      title: "Voice Input Received",
      description: `Recognized: "${text}"`,
    });
  };

  const speakText = (text: string) => {
    if (!speechSynthesis) {
      toast({
        title: "Speech Synthesis Not Supported",
        description: "Your browser does not support text-to-speech functionality.",
        variant: "destructive",
      });
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Get available voices and select one
    const voices = speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => voice.lang.includes('en-'));
    
    if (englishVoices.length > 0) {
      // Prefer a female voice if available
      const femaleVoice = englishVoices.find(voice => voice.name.includes('Female') || voice.name.includes('female'));
      utterance.voice = femaleVoice || englishVoices[0];
    }

    // Set events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Speech Error",
        description: "An error occurred while speaking.",
        variant: "destructive",
      });
    };

    // Speak
    speechSynthesis.speak(utterance);
  };

  const toggleMute = () => {
    if (isSpeaking && !isMuted) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Voice Enabled" : "Voice Disabled",
      description: isMuted ? "The AI will now speak responses." : "The AI will not speak responses.",
    });
  };

  const replayLastMessage = () => {
    const lastAiMessage = messages.filter(m => !m.isUser).pop();
    if (lastAiMessage && !isMuted) {
      speakText(lastAiMessage.content);
    }
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-slate-50 rounded-lg border border-border/40">
      <div className="p-4 border-b border-border/40 bg-white rounded-t-lg flex justify-between items-center">
        <div>
          <h2 className="font-heading text-lg font-medium">AI Educational Assistant</h2>
          <p className="text-sm text-muted-foreground">Ask me anything about your studies!</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMute} 
          className="ml-auto"
          aria-label={isMuted ? "Enable voice" : "Disable voice"}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <Card 
              className={`max-w-[80%] ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
              onClick={() => !message.isUser && !isMuted && speakText(message.content)}
            >
              <CardContent className="p-3">
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] bg-background">
              <CardContent className="p-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-border/40 bg-white rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1"
          />
          <VoiceControl onVoiceInput={handleVoiceInput} />
          <Button type="submit" disabled={!input.trim() || isLoading}>Send</Button>
        </form>
      </div>
    </div>
  );
};

export default AIChatbot;
