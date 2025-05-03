
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/sonner';
import VoiceControl from '@/components/VoiceControl';
import TextToSpeech from '@/components/TextToSpeech';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SendHorizonal, Save, Mic, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SAMPLE_RESPONSES = [
  "I can help explain that concept in more detail. The key is to understand how the underlying principles work together.",
  "That's a good question. In this subject area, we need to consider multiple perspectives to fully understand it.",
  "Based on your question, I think we should approach this step-by-step to ensure a solid understanding.",
  "The answer involves several interconnected concepts. Let me break it down for you in manageable parts.",
  "I'd be happy to explain this. First, let's establish the fundamental principles before moving to more complex ideas."
];

const VoiceCloneAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI voice assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [lastAssistantMessage, setLastAssistantMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Find the last assistant message whenever messages change
    const assistantMessages = messages.filter(msg => msg.role === 'assistant');
    if (assistantMessages.length > 0) {
      setLastAssistantMessage(assistantMessages[assistantMessages.length - 1].content);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const responseIndex = Math.floor(Math.random() * SAMPLE_RESPONSES.length);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: SAMPLE_RESPONSES[responseIndex],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsProcessing(false);
      
      toast('New response received', {
        description: 'The AI assistant has responded to your message',
      });
    }, 1500);
  };

  const handleVoiceInput = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Voice Clone Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Voice Profile</h3>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <span>Default Assistant</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Create New Voice Clone</h3>
                    <Button variant="outline" className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Record Voice Sample
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Saved Conversations</h3>
                    <div className="text-sm text-muted-foreground">
                      No saved conversations yet
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="voice">Voice Lab</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-4">
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="border rounded-lg mb-4">
                      <ScrollArea className="h-[500px] p-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground'
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  {message.role === 'user' ? (
                                    <User className="h-4 w-4" />
                                  ) : (
                                    <Bot className="h-4 w-4" />
                                  )}
                                  <span className="text-xs">
                                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                                  </span>
                                </div>
                                <p>{message.content}</p>
                                <div className="text-right mt-1">
                                  <span className="text-xs">
                                    {message.timestamp.toLocaleTimeString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>
                      
                      <div className="p-4 border-t flex items-center gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Type a message..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage();
                            }
                          }}
                          disabled={isProcessing}
                          className="flex-1"
                        />
                        <VoiceControl onVoiceInput={handleVoiceInput} />
                        <Button 
                          onClick={handleSendMessage} 
                          disabled={isProcessing || !input.trim()}
                        >
                          <SendHorizonal className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                    </div>
                    
                    {lastAssistantMessage && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Last response
                        </p>
                        <TextToSpeech text={lastAssistantMessage} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="voice" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Voice Laboratory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Voice Recording</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Record samples of your voice to create a custom voice clone.
                        </p>
                        <Button className="w-full h-20 flex flex-col items-center justify-center">
                          <Mic className="h-8 w-8 mb-1" />
                          <span>Press to Record</span>
                        </Button>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Custom Prompts</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Read these phrases to help create a better voice clone:
                        </p>
                        <div className="border rounded-lg p-2 space-y-2">
                          <p className="text-sm">1. Artificial intelligence is transforming education.</p>
                          <p className="text-sm">2. Voice cloning technology enables personalized learning experiences.</p>
                          <p className="text-sm">3. The future of education combines human teaching with AI assistance.</p>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => navigate('/dashboard')}
                        className="w-full"
                      >
                        Go to Dashboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VoiceCloneAgent;
