
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import VoiceControl from './VoiceControl';

type Message = {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your AI educational assistant. What would you like to learn about today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      const aiResponse: Message = {
        id: messages.length + 2,
        content: generateMockResponse(input),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
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

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-slate-50 rounded-lg border border-border/40">
      <div className="p-4 border-b border-border/40 bg-white rounded-t-lg">
        <h2 className="font-heading text-lg font-medium">AI Educational Assistant</h2>
        <p className="text-sm text-muted-foreground">Ask me anything about your studies!</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] ${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
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
