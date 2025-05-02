
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VoiceControl from '@/components/VoiceControl';
import { Headphones, History, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

type VoiceMessage = {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const VoiceCloneAgent = () => {
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: 1,
      content: "Hello! I'm your 3D voice clone agent. I can remember our conversation and provide detailed answers. Just speak to me or click the microphone button to start.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversationMemory, setConversationMemory] = useState<string[]>([]);
  const { toast } = useToast();
  const speechSynthesis = window.speechSynthesis;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sceneContainerRef = useRef<HTMLDivElement>(null);

  // For 3D visualization
  useEffect(() => {
    // Here would be the code to initialize a 3D scene,
    // but we'll use CSS animations for this example
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesis) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle voice input from VoiceControl component
  const handleVoiceInput = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    addUserMessage(text);
    
    // Generate and speak response
    setTimeout(() => {
      const aiResponse = generateIntelligentResponse(text);
      addAIMessage(aiResponse);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const userMessage: VoiceMessage = {
      id: messages.length + 1,
      content,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Update conversation memory
    setConversationMemory(prev => [...prev, content]);
  };

  const addAIMessage = (content: string) => {
    const aiMessage: VoiceMessage = {
      id: messages.length + 1,
      content,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    
    // Update conversation memory
    setConversationMemory(prev => [...prev, `AI: ${content}`]);
    
    // Speak response if not muted
    if (!isMuted) {
      speakText(content);
    }
  };

  // Enhanced response generator with memory
  const generateIntelligentResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check if this is a follow-up question using memory
    const isFollowUp = conversationMemory.length > 0 && 
      (lowerQuery.includes("what about") || lowerQuery.includes("and") || 
       lowerQuery.includes("also") || lowerQuery.includes("tell me more") ||
       lowerQuery.includes("what else"));
       
    // Handle follow-up questions with context
    if (isFollowUp && conversationMemory.length > 0) {
      const prevMessage = conversationMemory[conversationMemory.length - 1];
      
      if (prevMessage.includes("weather")) {
        return "Based on our previous conversation about the weather, I should mention that climate patterns have been changing globally. The difference between weather and climate is that weather refers to short-term atmospheric conditions while climate describes weather patterns over a longer period. Would you like me to explain how climate change affects weather patterns?";
      }
      
      if (prevMessage.includes("book") || prevMessage.includes("read")) {
        return "Regarding our discussion about books, I'd recommend exploring different genres to broaden your perspective. Some classics are timeless for a reason, but contemporary literature offers fresh insights into modern issues. I can recommend specific titles if you tell me your preferred genres.";
      }
    }
    
    // Respond to specific topics with detailed information
    if (lowerQuery.includes("who are you") || lowerQuery.includes("what can you do")) {
      return "I'm your 3D voice clone assistant with memory capabilities. I can remember our conversation history, answer questions on various topics, and provide detailed explanations. I can speak responses out loud and understand your voice commands. What would you like to know about?";
    }
    
    if (lowerQuery.includes("weather")) {
      return "I don't have access to real-time weather data, but I can explain weather patterns and phenomena. Weather is the state of the atmosphere at a particular place and time, characterized by temperature, air pressure, humidity, precipitation, and wind. Different regions experience different weather based on factors like latitude, altitude, and proximity to bodies of water. What aspect of weather interests you?";
    }
    
    if (lowerQuery.includes("book") || lowerQuery.includes("read")) {
      return "Reading books offers numerous benefits including knowledge acquisition, vocabulary expansion, improved focus, and stress reduction. Fiction develops empathy by letting us experience different perspectives, while non-fiction provides factual information and insights. What types of books do you enjoy reading?";
    }
    
    if (lowerQuery.includes("remember")) {
      if (conversationMemory.length > 1) {
        return `Yes, I remember our conversation. We've been discussing ${conversationMemory.slice(-3, -1).join(", ")}. I maintain memory of our interactions to provide more contextual responses.`;
      } else {
        return "I'll remember everything we discuss. My memory capability helps me maintain context throughout our conversation, allowing for more natural and relevant responses. What else would you like to talk about?";
      }
    }
    
    // General knowledge responses for common educational topics
    if (lowerQuery.includes("universe") || lowerQuery.includes("space")) {
      return "The universe is estimated to be about 13.8 billion years old, containing billions of galaxies, each with billions of stars. Our solar system is located in the Milky Way galaxy, which is about 100,000 light-years across. The observable universe extends about 46.5 billion light-years in all directions from Earth. Would you like to know more about specific celestial objects or cosmic phenomena?";
    }
    
    if (lowerQuery.includes("artificial intelligence") || lowerQuery.includes("ai")) {
      return "Artificial Intelligence refers to systems that can perform tasks typically requiring human intelligence, such as visual perception, speech recognition, and decision-making. AI encompasses various approaches including machine learning, deep learning, and natural language processing. It's increasingly integrated into everyday technologies from voice assistants to recommendation systems. Modern AI development focuses on both narrow AI (designed for specific tasks) and the more complex goal of general AI. What specific aspect of AI interests you?";
    }
    
    // Default intelligent responses
    const intelligentResponses = [
      `I understand your question about "${query}". This is a multifaceted topic with several important aspects to consider. Would you like me to focus on a particular dimension?`,
      `Your question about "${query}" touches on an interesting area. Based on our conversation, I think you might be interested in understanding both the theoretical foundations and practical applications. Which would you prefer to explore first?`,
      `I've analyzed "${query}" and can provide insights from multiple perspectives. Given our previous discussion, I believe you're looking for a comprehensive understanding rather than just basic information. Is that correct?`,
      `"${query}" is a fascinating subject that connects to several key concepts we've discussed. I can elaborate on how these connections work and why they're significant. Would that be helpful?`,
      `Based on our conversation history and your question about "${query}", I can offer both fundamental principles and advanced insights. Which would be more valuable to you right now?`
    ];
    
    return intelligentResponses[Math.floor(Math.random() * intelligentResponses.length)];
  };

  // Function to handle speech synthesis
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
    utterance.pitch = 1.1; // Slightly higher pitch for the clone voice
    utterance.volume = 1.0;

    // Get available voices and select one
    const voices = speechSynthesis.getVoices();
    const englishVoices = voices.filter(voice => voice.lang.includes('en-'));
    
    if (englishVoices.length > 0) {
      // Try to find a clear, natural-sounding voice
      const preferredVoice = englishVoices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Premium')
      );
      utterance.voice = preferredVoice || englishVoices[0];
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
      description: isMuted ? "The agent will now speak responses." : "The agent will not speak responses.",
    });
  };

  const clearHistory = () => {
    setMessages([{
      id: 1,
      content: "History cleared. What would you like to talk about?",
      isUser: false,
      timestamp: new Date()
    }]);
    setConversationMemory([]);
    toast({
      title: "Conversation History Cleared",
      description: "All previous messages have been cleared.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="heading text-3xl md:text-4xl font-bold mb-4">
                3D Voice Clone Agent
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Talk naturally with our advanced AI agent that remembers your conversation history and responds with voice.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="secondary" className="bg-white text-purple-700 hover:bg-white/90">
                  <Headphones className="mr-2 h-5 w-5" />
                  Voice Interaction
                </Button>
                <Button 
                  variant={isMuted ? "outline" : "secondary"}
                  className={isMuted ? "bg-transparent text-white border-white" : "bg-white text-purple-700"}
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="mr-2 h-5 w-5" /> : <Volume2 className="mr-2 h-5 w-5" />}
                  {isMuted ? "Unmute" : "Mute"}
                </Button>
                <Button 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10"
                  onClick={clearHistory}
                >
                  <History className="mr-2 h-5 w-5" />
                  Clear History
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 3D Agent Visualization */}
              <div className="bg-gradient-to-b from-violet-50 to-indigo-100 rounded-xl overflow-hidden shadow-lg border border-indigo-200">
                <div ref={sceneContainerRef} className="relative h-96 flex items-center justify-center overflow-hidden">
                  <div className={`w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 shadow-xl flex items-center justify-center ${isSpeaking ? 'animate-pulse' : ''}`}>
                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
                      {isListening ? (
                        <Mic className="h-16 w-16 text-indigo-600 animate-pulse" />
                      ) : isSpeaking ? (
                        <Volume2 className="h-16 w-16 text-indigo-600 animate-pulse" />
                      ) : (
                        <Headphones className="h-16 w-16 text-indigo-600" />
                      )}
                    </div>
                  </div>
                  
                  {/* Sound visualization rings */}
                  <div className={`absolute w-60 h-60 rounded-full border-2 border-indigo-300 opacity-0 ${isSpeaking ? 'animate-ping' : ''}`}></div>
                  <div className={`absolute w-80 h-80 rounded-full border-2 border-purple-300 opacity-0 ${isSpeaking ? 'animate-ping animation-delay-200' : ''}`}></div>
                  <div className={`absolute w-100 h-100 rounded-full border-2 border-violet-300 opacity-0 ${isSpeaking ? 'animate-ping animation-delay-400' : ''}`}></div>
                </div>
                
                <div className="p-6 bg-white">
                  <h3 className="font-bold text-xl mb-2 text-center">Voice Clone Agent</h3>
                  <p className="text-gray-600 text-center">
                    {isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Ready for voice interaction"}
                  </p>
                  
                  <div className="mt-6 flex justify-center">
                    <VoiceControl onVoiceInput={handleVoiceInput} />
                  </div>
                </div>
              </div>
              
              {/* Conversation History */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-[600px]">
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <h3 className="font-bold text-lg">Conversation History</h3>
                  <p className="text-sm text-gray-500">Your agent remembers your entire conversation</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <Card 
                        className={`max-w-[80%] ${message.isUser ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-100'}`}
                        onClick={() => !message.isUser && !isMuted && speakText(message.content)}
                      >
                        <CardContent className="p-3">
                          <p className={`text-sm ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                            {message.content}
                          </p>
                          <span className={`text-xs ${message.isUser ? 'text-indigo-100' : 'text-gray-500'} mt-1 block`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-500">
                    {isListening ? (
                      <span className="flex items-center justify-center">
                        <Mic className="h-4 w-4 text-red-500 mr-2 animate-pulse" />
                        Listening... Speak now
                      </span>
                    ) : (
                      <span>Click the microphone button to start speaking</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features section */}
            <div className="mt-16 max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Advanced Voice Agent Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Conversation Memory</h3>
                  <p className="text-gray-600">The agent remembers your entire conversation history, providing context-aware responses.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Voice Interaction</h3>
                  <p className="text-gray-600">Speak naturally to the agent and receive spoken responses for a hands-free experience.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                  <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Detailed Responses</h3>
                  <p className="text-gray-600">Get comprehensive, educational answers to your questions across various topics.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VoiceCloneAgent;
