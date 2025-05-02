
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

// Topics for more accurate and contextual responses
const educationalTopics = {
  mathematics: [
    "Algebra is the study of mathematical symbols and the rules for manipulating these symbols. It's a fundamental branch of mathematics.",
    "Calculus is the mathematical study of continuous change. It's divided into differential calculus and integral calculus.",
    "Geometry is the branch of mathematics that deals with shapes, sizes, and properties of space.",
    "Quadratic equations can be solved using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a.",
    "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the other two sides."
  ],
  physics: [
    "Newton's laws of motion describe the relationship between an object and the forces acting upon it.",
    "Quantum entanglement is a physical phenomenon that occurs when a pair of particles interact in ways such that the quantum state of each particle cannot be described independently.",
    "The theory of relativity, proposed by Albert Einstein, describes the laws of physics as observed by different observers moving relative to each other.",
    "Thermodynamics is the branch of physics that deals with heat, work, and temperature, and their relation to energy and entropy.",
    "The uncertainty principle, formulated by Werner Heisenberg, states that the more precisely the position of a particle is determined, the less precisely its momentum can be predicted."
  ],
  biology: [
    "Photosynthesis is the process used by plants to convert light energy into chemical energy that can be released to fuel activities of the organism.",
    "The human circulatory system consists of the heart, blood vessels, and blood, which circulate oxygen and nutrients throughout the body.",
    "DNA (deoxyribonucleic acid) is a molecule that carries genetic information for the development and functioning of an organism.",
    "Cellular respiration is the process by which cells convert nutrients into energy in the form of ATP.",
    "Evolution is the change in heritable traits of biological populations over successive generations."
  ],
  history: [
    "The French Revolution was a period of radical social and political upheaval in France from 1789 to 1799.",
    "World War II was a global war that lasted from 1939 to 1945, involving many of the world's nations.",
    "The Industrial Revolution was the transition to new manufacturing processes in Europe and the United States in the period from about 1760 to 1840.",
    "The American Civil War was fought in the United States from 1861 to 1865 between the North and South, primarily over the issues of slavery and states' rights.",
    "Ancient Egypt was a civilization of ancient North Africa that flourished from around 3100 BC to 30 BC."
  ],
  computerScience: [
    "Data structures are specific ways of organizing and storing data in a computer so that it can be accessed and modified efficiently.",
    "Algorithms are step-by-step procedures or formulas for solving problems, often used in computation and data processing.",
    "Object-oriented programming is a programming paradigm based on the concept of 'objects', which can contain data and code.",
    "Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience.",
    "Databases are organized collections of data generally stored and accessed electronically from a computer system."
  ]
};

const AIChatbot: React.FC<AIChatbotProps> = ({ initialInput = '' }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
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
    
    // Update context with user message for continuity
    const updatedContext = [...conversationContext, input];
    setConversationContext(updatedContext);
    
    // Generate improved AI response with context awareness
    setTimeout(() => {
      const aiResponse = generateEnhancedResponse(input, updatedContext);
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
  
  // Enhanced response generator that uses context and more detailed responses
  const generateEnhancedResponse = (query: string, context: string[]): string => {
    // Convert query to lowercase for easier matching
    const lowerQuery = query.toLowerCase();
    
    // Check for follow-up questions using context
    const isFollowUp = context.length > 1 && 
      (lowerQuery.includes("why") || lowerQuery.includes("how") || 
       lowerQuery.includes("what") || lowerQuery.includes("can you explain") ||
       lowerQuery.includes("tell me more"));
    
    // Define topics to search for in the query
    const topicMatches = {
      math: ["math", "algebra", "calculus", "equation", "geometry", "trigonometry", "quadratic"],
      physics: ["physics", "quantum", "relativity", "newton", "energy", "force", "motion", "thermodynamics"],
      biology: ["biology", "cell", "dna", "evolution", "organism", "photosynthesis", "circulatory"],
      history: ["history", "revolution", "war", "empire", "civilization", "ancient", "medieval", "century"],
      computers: ["computer", "algorithm", "programming", "data structure", "database", "machine learning", "code"]
    };
    
    // Try to determine the topic based on query content
    let detectedTopic = "";
    
    for (const [topic, keywords] of Object.entries(topicMatches)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        detectedTopic = topic;
        break;
      }
    }

    // Handle specific educational queries with detailed responses
    if (lowerQuery.includes("quadratic equation") || lowerQuery.includes("solve quadratic")) {
      return "To solve a quadratic equation in the form ax² + bx + c = 0, you can use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a. For example, to solve 2x² + 3x - 5 = 0: a=2, b=3, c=-5, so x = (-3 ± √(9 + 40)) / 4 = (-3 ± √49) / 4 = (-3 ± 7) / 4, which gives us x = 1 or x = -2.5. Would you like me to explain another mathematical concept?";
    }
    
    if (lowerQuery.includes("quantum entanglement")) {
      return "Quantum entanglement is a fascinating phenomenon where two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently. Instead, a quantum state must be described for the system as a whole. This connection persists even when the particles are separated by large distances. Einstein famously referred to this as 'spooky action at a distance.' When measuring one entangled particle, you instantaneously determine the corresponding property of its partner, regardless of the distance separating them. This phenomenon is fundamental to quantum computing and quantum information theory. Would you like to know more about specific applications or the theoretical background?";
    }
    
    if (lowerQuery.includes("french revolution")) {
      return "The French Revolution (1789-1799) was a pivotal period in French and European history. It began with the Storming of the Bastille on July 14, 1789, driven by social inequality, financial crisis, and Enlightenment ideals. The revolution overthrew the monarchy, established a republic, and went through various phases including the Reign of Terror under Robespierre. It ended with Napoleon Bonaparte's rise to power. The revolution's legacy includes the Declaration of the Rights of Man and of the Citizen, which promoted liberty, equality, and fraternity. Would you like to explore specific aspects or consequences of the French Revolution?";
    }
    
    if (lowerQuery.includes("photosynthesis")) {
      return "Photosynthesis is the process used by plants, algae, and certain bacteria to convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars. This process takes place in chloroplasts, specifically using chlorophyll pigments that capture light energy. The basic equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. Photosynthesis has two main stages: light-dependent reactions and light-independent reactions (Calvin cycle). This process is fundamental for life on Earth as it produces oxygen and serves as the primary producer in most ecosystems. Would you like more details about a specific part of the photosynthesis process?";
    }
    
    if (lowerQuery.includes("data structure")) {
      return "Data structures are specialized formats for organizing, storing, and manipulating data in a computer system. Common data structures include arrays, linked lists, stacks, queues, trees, graphs, and hash tables. Each has specific use cases and performance characteristics. For example, arrays offer fast random access but slow insertions/deletions, while linked lists provide quick insertions/deletions but slower random access. The choice of data structure significantly impacts an algorithm's efficiency and performance. Understanding data structures is fundamental in computer science and software engineering. Would you like me to explain a specific data structure in more detail?";
    }
    
    // For follow-up questions, provide more context-aware responses
    if (isFollowUp) {
      const previousQuery = context[context.length - 2].toLowerCase();
      
      if (previousQuery.includes("quadratic")) {
        return "Building on our discussion about quadratic equations, there are several methods to solve them: 1) Factoring, 2) Completing the square, and 3) Using the quadratic formula. The discriminant (b² - 4ac) tells us about the nature of the solutions. If the discriminant is positive, there are two real solutions. If zero, there's exactly one real solution. If negative, there are two complex solutions. Would you like me to demonstrate a specific method with an example?";
      }
      
      if (previousQuery.includes("photosynthesis")) {
        return "To elaborate on photosynthesis, the light-dependent reactions occur in the thylakoid membrane of the chloroplast, where light energy is converted to chemical energy (ATP and NADPH). The light-independent reactions (Calvin cycle) use this chemical energy to produce glucose from CO₂ in the stroma. Factors affecting photosynthesis include light intensity, CO₂ concentration, temperature, and water availability. Plants have adaptations like different leaf structures to optimize photosynthesis in their environments. Is there a specific aspect of this process you'd like me to explain further?";
      }
    }
    
    // If we've detected a topic but haven't matched a specific query
    if (detectedTopic) {
      switch(detectedTopic) {
        case "math":
          return educationalTopics.mathematics[Math.floor(Math.random() * educationalTopics.mathematics.length)];
        case "physics":
          return educationalTopics.physics[Math.floor(Math.random() * educationalTopics.physics.length)];
        case "biology":
          return educationalTopics.biology[Math.floor(Math.random() * educationalTopics.biology.length)];
        case "history":
          return educationalTopics.history[Math.floor(Math.random() * educationalTopics.history.length)];
        case "computers":
          return educationalTopics.computerScience[Math.floor(Math.random() * educationalTopics.computerScience.length)];
      }
    }
    
    // Default responses for general queries
    const generalResponses = [
      `I've analyzed your question about "${query}" and found it's a complex topic with multiple aspects. Would you like me to focus on a specific area of this subject?`,
      `"${query}" is an interesting area to explore! I can provide information on different aspects of this topic. Which specific part interests you most?`,
      `Based on your question about "${query}", I can see several educational angles we could explore. Would you like a general overview or a deep dive into a particular aspect?`,
      `I've researched "${query}" extensively. This topic connects to several key concepts across multiple disciplines. Which perspective would you like me to elaborate on?`,
      `Your question about "${query}" touches on important educational concepts. I can provide detailed explanations, examples, or historical context. What would be most helpful?`
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
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
