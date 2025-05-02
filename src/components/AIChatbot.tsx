
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import VoiceControl from './VoiceControl';
import { Volume2, VolumeX, Youtube } from 'lucide-react';

type Message = {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
  resources?: Resource[];
};

type Resource = {
  type: 'youtube' | 'course' | 'book';
  title: string;
  url: string;
};

interface AIChatbotProps {
  initialInput?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your AI educational assistant specialized in the Indian education system. What would you like to learn about today?",
    isUser: false,
    timestamp: new Date(),
  },
];

// Enhanced educational topics focused on Indian education system
const educationalTopics = {
  mathematics: [
    "In Indian education, mathematics is given significant emphasis from early classes. NCERT textbooks follow a progressive approach to mathematics learning.",
    "Vedic Mathematics is a collection of techniques to solve mathematical problems in a faster and easier way, developed by ancient Indian mathematicians.",
    "For competitive exams like JEE, mathematics topics such as calculus, coordinate geometry, and algebra are extensively tested with specific problem patterns.",
    "The Indian education system emphasizes mathematical derivations and theoretical concepts alongside numerical problem-solving.",
    "The CBSE and ICSE boards have slightly different approaches to mathematics education, with ICSE generally considered more comprehensive."
  ],
  physics: [
    "Physics in the Indian curriculum is divided into theoretical concepts and practical applications, with experiments forming a crucial part of evaluation.",
    "HC Verma's Concepts of Physics is a widely recommended textbook for JEE and NEET preparation in India.",
    "The NCERT Physics curriculum follows international standards while incorporating local contexts and applications relevant to India.",
    "In higher classes (11-12), physics is categorized into mechanics, thermodynamics, electricity and magnetism, optics, and modern physics.",
    "Practical examinations in physics focus on error analysis and experimental skills, which is a unique aspect of the Indian education system."
  ],
  chemistry: [
    "Chemistry in Indian education is divided into physical, organic and inorganic branches with equal emphasis on all three.",
    "NCERT Chemistry textbooks are considered the foundation for competitive exams like NEET and JEE.",
    "Structural formulas and reaction mechanisms are emphasized in organic chemistry sections of Indian syllabi.",
    "The periodic table and its trends form a core component of the inorganic chemistry curriculum in Indian education.",
    "Chemical equations and stoichiometry are given special focus in the Indian chemistry curriculum."
  ],
  biology: [
    "Biology in Indian education has a strong focus on taxonomic classification and detailed study of plant and animal physiology.",
    "NEET (National Eligibility cum Entrance Test) heavily tests biology concepts, making it a crucial subject for medical aspirants in India.",
    "The NCERT Biology curriculum includes chapters on biodiversity with special emphasis on Indian flora and fauna.",
    "Practical examinations in biology include microscopy skills, dissections (now mostly virtual), and herbarium preparation.",
    "Environmental science and ecology have gained importance in recent years in the Indian biology curriculum."
  ],
  history: [
    "Indian history curriculum is typically divided into Ancient, Medieval, and Modern periods with special emphasis on freedom struggle.",
    "Ancient Indian history covers the Indus Valley Civilization, Vedic period, and various dynasties like Maurya, Gupta, Chola, etc.",
    "Medieval Indian history focuses on Delhi Sultanate, Mughal Empire, and regional kingdoms like Vijayanagara and Maratha empires.",
    "Modern Indian history emphasizes the British colonial period, freedom movement, and post-independence developments.",
    "UPSC Civil Services examination extensively tests Indian history with focus on socio-economic and cultural aspects alongside political events."
  ],
  geography: [
    "Indian geography curriculum covers physical features, climate, natural resources, agriculture, and demographics of India.",
    "The diverse physiographic divisions of India (Himalayan region, Indo-Gangetic Plains, Peninsular Plateau, etc.) are studied in detail.",
    "Indian monsoon systems and their impact on agriculture and economy form a crucial part of geography education.",
    "Natural resources, conservation, and sustainable development with reference to India's policies are important topics.",
    "Human geography aspects like population distribution, migration patterns, and urbanization in the Indian context are extensively covered."
  ],
  computerScience: [
    "Computer Science education in India has evolved from basic programming to advanced topics like AI, ML and cybersecurity.",
    "The CBSE curriculum includes Python programming from Class 11, while some state boards offer C++ or Java.",
    "Computer Science olympiads like INOI provide platforms for talented students to represent India internationally.",
    "The National Education Policy 2020 emphasizes coding skills from the middle school level in Indian education.",
    "Indian technical institutions like IITs and NITs offer specialized computer science programs with focus on both theoretical foundations and practical applications."
  ]
};

// Indian education system specific information
const indianEducationSystem = {
  boards: [
    "CBSE (Central Board of Secondary Education) is a national level board for public and private schools in India.",
    "ICSE/ISC (Indian Certificate of Secondary Education) is known for its comprehensive curriculum covering a wide range of subjects.",
    "State Boards operate under individual state governments with curriculum focused on regional languages and contexts.",
    "IB (International Baccalaureate) and IGCSE are international curricula available in select schools across India."
  ],
  exams: [
    "JEE (Joint Entrance Examination) is the entrance test for engineering programs at IITs, NITs, and other technical institutions.",
    "NEET (National Eligibility cum Entrance Test) is mandatory for admission to medical courses across India.",
    "UPSC conducts Civil Services Examination for recruitment to various administrative services like IAS, IPS, IFS etc.",
    "CAT (Common Admission Test) is the entrance exam for prestigious management institutions like IIMs.",
    "GATE (Graduate Aptitude Test in Engineering) is for admission to postgraduate engineering programs and PSU recruitment."
  ],
  institutions: [
    "IITs (Indian Institutes of Technology) are premier engineering institutions known for technical education and research.",
    "IIMs (Indian Institutes of Management) are the top business schools offering management education.",
    "AIIMS (All India Institute of Medical Sciences) is the leading medical education and research institution.",
    "Central Universities like JNU, DU, BHU offer diverse programs across disciplines.",
    "NITs (National Institutes of Technology) are important technical institutions spread across different states."
  ]
};

// YouTube resources for Indian education
const youtubeResources = [
  {
    subject: "Mathematics",
    channels: ["Khan Academy India", "Vedantu JEE", "Physics Wallah", "Unacademy"]
  },
  {
    subject: "Physics",
    channels: ["Physics Wallah", "Unacademy JEE", "Khan Academy India", "Pradeep Kshetrapal"]
  },
  {
    subject: "Chemistry",
    channels: ["Vedantu NEET Made Ejee", "Physics Wallah", "Unacademy NEET", "Khan Academy India"]
  },
  {
    subject: "Biology",
    channels: ["Aakash iTutor", "Khan Academy India", "Unacademy NEET", "Biology by PW"]
  },
  {
    subject: "History",
    channels: ["Study IAS", "Amit Sengupta", "Unacademy UPSC", "World of History"]
  }
];

const AIChatbot: React.FC<AIChatbotProps> = ({ initialInput = '' }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [speechRate, setSpeechRate] = useState(1);
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
      const responseData = generateIndianEducationResponse(input, updatedContext);
      const aiResponseMessage: Message = {
        id: messages.length + 2,
        content: responseData.content,
        isUser: false,
        timestamp: new Date(),
        resources: responseData.resources
      };
      
      setMessages((prev) => [...prev, aiResponseMessage]);
      setIsLoading(false);

      // Speak the response if not muted
      if (!isMuted) {
        speakText(responseData.content);
      }
    }, 1500);
  };
  
  // Enhanced response generator specialized for Indian education system
  const generateIndianEducationResponse = (query: string, context: string[]): { content: string, resources?: Resource[] } => {
    // Convert query to lowercase for easier matching
    const lowerQuery = query.toLowerCase();
    
    // Check for follow-up questions using context
    const isFollowUp = context.length > 1 && 
      (lowerQuery.includes("why") || lowerQuery.includes("how") || 
       lowerQuery.includes("what") || lowerQuery.includes("can you explain") ||
       lowerQuery.includes("tell me more"));
    
    // Define topics to search for in the query
    const topicMatches = {
      math: ["math", "algebra", "calculus", "equation", "geometry", "trigonometry", "quadratic", "vedic"],
      physics: ["physics", "mechanics", "optics", "electrostatics", "magnetism", "thermodynamics", "hc verma"],
      chemistry: ["chemistry", "organic", "inorganic", "physical", "periodic table", "reaction", "chemical"],
      biology: ["biology", "zoology", "botany", "anatomy", "physiology", "ecosystem", "cell", "dna"],
      history: ["history", "ancient", "medieval", "modern", "independence", "freedom struggle", "mughal", "british raj"],
      geography: ["geography", "climate", "resources", "mountain", "river", "plateau", "population", "monsoon"],
      computers: ["computer", "programming", "algorithm", "data structure", "python", "java", "c++", "coding"],
      education: ["cbse", "icse", "state board", "ncert", "syllabus", "curriculum", "textbook"],
      exams: ["jee", "neet", "upsc", "cat", "gate", "clat", "bank", "ssc", "ias", "civil services"]
    };
    
    // Try to determine the topic based on query content
    let detectedTopic = "";
    let examDetected = false;
    
    for (const [topic, keywords] of Object.entries(topicMatches)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        detectedTopic = topic;
        if (topic === "exams") examDetected = true;
        break;
      }
    }
    
    // YouTube resources to recommend based on the query
    const getRelevantYouTubeResources = (topic: string): Resource[] => {
      let resources: Resource[] = [];
      
      if (topic === "math") {
        resources = [
          { type: "youtube", title: "Khan Academy India - Algebra", url: "https://www.youtube.com/c/KhanAcademyIndia" },
          { type: "youtube", title: "Vedantu JEE - Mathematics", url: "https://www.youtube.com/c/VedantuJEE" }
        ];
      } else if (topic === "physics") {
        resources = [
          { type: "youtube", title: "Physics Wallah - Mechanics", url: "https://www.youtube.com/c/PhysicsWallah" },
          { type: "youtube", title: "Unacademy JEE - Physics", url: "https://www.youtube.com/c/UnacademyJEE" }
        ];
      } else if (topic === "chemistry") {
        resources = [
          { type: "youtube", title: "Vedantu NEET - Organic Chemistry", url: "https://www.youtube.com/c/VedantuNEET" },
          { type: "youtube", title: "Physics Wallah - Chemistry", url: "https://www.youtube.com/c/PhysicsWallah" }
        ];
      } else if (topic === "biology") {
        resources = [
          { type: "youtube", title: "Unacademy NEET - Biology", url: "https://www.youtube.com/c/unacademyneet" },
          { type: "youtube", title: "Aakash iTutor", url: "https://www.youtube.com/c/AakashiTutor" }
        ];
      } else if (topic === "history" || topic === "geography") {
        resources = [
          { type: "youtube", title: "Study IAS - History & Geography", url: "https://www.youtube.com/c/StudyIAS" },
          { type: "youtube", title: "Unacademy UPSC", url: "https://www.youtube.com/c/UnacademyUPSC" }
        ];
      } else if (topic === "computers") {
        resources = [
          { type: "youtube", title: "Code with Harry - Programming", url: "https://www.youtube.com/c/CodeWithHarry" },
          { type: "youtube", title: "Apni Kaksha - Computer Science", url: "https://www.youtube.com/c/ApniKaksha" }
        ];
      } else if (examDetected) {
        if (lowerQuery.includes("jee")) {
          resources = [
            { type: "youtube", title: "Physics Wallah - JEE Complete Course", url: "https://www.youtube.com/c/PhysicsWallah" },
            { type: "youtube", title: "Unacademy JEE", url: "https://www.youtube.com/c/UnacademyJEE" }
          ];
        } else if (lowerQuery.includes("neet")) {
          resources = [
            { type: "youtube", title: "Unacademy NEET", url: "https://www.youtube.com/c/unacademyneet" },
            { type: "youtube", title: "Aakash iTutor - NEET Preparation", url: "https://www.youtube.com/c/AakashiTutor" }
          ];
        } else if (lowerQuery.includes("upsc") || lowerQuery.includes("ias") || lowerQuery.includes("civil services")) {
          resources = [
            { type: "youtube", title: "Study IAS", url: "https://www.youtube.com/c/StudyIAS" },
            { type: "youtube", title: "Unacademy UPSC", url: "https://www.youtube.com/c/UnacademyUPSC" }
          ];
        }
      }
      
      return resources;
    };
    
    // Handle specific Indian education system queries
    if (lowerQuery.includes("cbse") || lowerQuery.includes("icse") || lowerQuery.includes("state board")) {
      const resources = [
        { type: "youtube", title: "CBSE Official Channel", url: "https://www.youtube.com/c/cbsechannel" },
        { type: "youtube", title: "NCERT Official", url: "https://www.youtube.com/c/ncertofficial" }
      ];
      
      return {
        content: "The Indian education system has multiple boards including CBSE (Central Board of Secondary Education), ICSE (Indian Certificate of Secondary Education), and various State Boards. CBSE is a national board that follows NCERT curriculum and is recognized throughout India. ICSE is known for its comprehensive curriculum with emphasis on language and practical knowledge. State Boards focus on regional contexts and often teach in local languages alongside English. The choice of board can impact a student's approach to competitive exams, though the major exams accept students from all recognized boards. Would you like more specific information about a particular board's curriculum or exam pattern?",
        resources
      };
    }
    
    if (lowerQuery.includes("jee") || lowerQuery.includes("engineering entrance")) {
      const resources = getRelevantYouTubeResources("exams");
      
      return {
        content: "The Joint Entrance Examination (JEE) is India's premier engineering entrance exam conducted in two stages: JEE Main and JEE Advanced. JEE Main is the qualifying exam for JEE Advanced and is also used for admission to NITs, IIITs and other technical institutions. JEE Advanced is specifically for admission to the prestigious IITs. The exam tests Physics, Chemistry, and Mathematics at a high difficulty level. Preparation typically takes 2 years of focused study during Classes 11-12. Key topics include Mechanics, Thermodynamics, and Optics in Physics; Organic, Inorganic, and Physical Chemistry; and Calculus, Algebra, and Coordinate Geometry in Mathematics. Would you like information about specific preparation strategies or important topics?",
        resources
      };
    }
    
    if (lowerQuery.includes("neet") || lowerQuery.includes("medical entrance")) {
      const resources = getRelevantYouTubeResources("exams");
      
      return {
        content: "The National Eligibility cum Entrance Test (NEET) is the unified medical entrance examination in India for admission to MBBS, BDS, AYUSH and other medical courses. It tests Physics, Chemistry, and Biology (Zoology and Botany) based on the NCERT curriculum of Classes 11-12. Biology carries the highest weightage (50%), followed by Chemistry (25%) and Physics (25%). Key topics include Human Physiology, Plant Physiology, Genetics, and Ecology in Biology; Organic Chemistry and Biomolecules in Chemistry; and Mechanics and Modern Physics in Physics. The competition is intense with over 15 lakh students competing annually for approximately 1 lakh seats. Would you like specific guidance on NEET preparation?",
        resources
      };
    }
    
    if (lowerQuery.includes("upsc") || lowerQuery.includes("ias") || lowerQuery.includes("civil services")) {
      const resources = getRelevantYouTubeResources("exams");
      
      return {
        content: "The UPSC Civil Services Examination is considered one of the toughest exams in India, conducted in three stages: Preliminary, Main, and Interview. It recruits officers for prestigious services like IAS, IPS, IFS, and others. The syllabus is vast, covering General Studies (History, Geography, Polity, Economy, Science & Technology, Environment), Current Affairs, and optional subjects. The preparation requires a multi-dimensional approach with focus on developing analytical skills alongside factual knowledge. The exam tests candidates' aptitude, intellectual abilities, and personality traits suitable for civil services. Standard preparation time ranges from 1-3 years depending on individual capabilities and background. Would you like advice on a specific aspect of UPSC preparation?",
        resources
      };
    }
    
    // Handle queries about specific subjects in Indian education context
    if (lowerQuery.includes("vedic math") || lowerQuery.includes("vedic mathematics")) {
      const resources = getRelevantYouTubeResources("math");
      
      return {
        content: "Vedic Mathematics is a system of mathematical techniques derived from the Vedas, specifically the Atharva Veda. It was reconstructed by Bharati Krishna Tirthaji in the early 20th century. Vedic Math provides shortcuts for various mathematical operations like multiplication, division, square roots, and more. These techniques can significantly reduce calculation time and are particularly useful for competitive exams where speed matters. Some key techniques include Nikhilam (for multiplication), Urdhva Tiryakbhyam (cross multiplication), and Dwandwa Yoga (for squaring numbers). In the Indian education system, Vedic Math is often taught as supplementary material to enhance calculation speed, though it's not typically part of the main curriculum. Many coaching centers for JEE, banking exams, and other competitive tests incorporate Vedic Math techniques. Would you like to learn about specific Vedic Math techniques?",
        resources
      };
    }
    
    if (lowerQuery.includes("ncert") || lowerQuery.includes("textbook")) {
      return {
        content: "NCERT (National Council of Educational Research and Training) textbooks form the foundation of education in CBSE schools and are highly recommended for competitive exam preparation in India. These textbooks are developed by subject experts and follow a systematic approach to building concepts from basics to advanced levels. For board exams, NCERT books are sufficient, but for competitive exams like JEE and NEET, students typically need additional reference materials. NCERT textbooks are particularly valued for their clear explanations and accuracy. The CBSE board exam questions are largely based on NCERT content, and even competitive exams like JEE and NEET draw their fundamental concepts from NCERT textbooks. The latest editions incorporate modern teaching methodologies and real-life applications. Would you like recommendations for specific subject NCERT textbooks or complementary study materials?",
        resources: [
          { type: "youtube", title: "NCERT Official Channel", url: "https://www.youtube.com/c/ncertofficial" },
          { type: "youtube", title: "CBSE Official", url: "https://www.youtube.com/c/cbsechannel" }
        ]
      };
    }
    
    // For follow-up questions, provide more context-aware responses
    if (isFollowUp) {
      const previousQuery = context[context.length - 2].toLowerCase();
      
      if (previousQuery.includes("jee") || previousQuery.includes("engineering")) {
        return {
          content: "Following up on JEE preparation, it's crucial to focus on building strong fundamentals before attempting advanced problems. The JEE syllabus follows NCERT curriculum but goes deeper in conceptual understanding and application. Most successful JEE candidates recommend starting preparation from Class 11 onwards with equal focus on all three subjects. For Physics, understanding concepts thoroughly is more important than memorizing formulas. For Chemistry, regular revision is key, especially for organic reactions. For Mathematics, practice is essential - solve as many problems as possible to develop problem-solving skills. Mock tests should be incorporated into your preparation strategy from the beginning to develop time management skills. Resources like previous years' papers, NCERT textbooks with supplementary reference books like HC Verma for Physics, and regular practice tests are highly recommended.",
          resources: getRelevantYouTubeResources("exams")
        };
      }
      
      if (previousQuery.includes("neet") || previousQuery.includes("medical")) {
        return {
          content: "Regarding NEET preparation, Biology requires systematic memorization along with conceptual clarity. Topics like Human Physiology, Genetics, and Ecology need special attention. For Biology, NCERT textbooks are considered the Bible - every line is important. For Chemistry, focus on organic reactions, mechanisms, and named reactions which are frequently tested. Physics for NEET is less calculation-intensive compared to JEE but still requires solid understanding of concepts. Creating short notes, diagrams, and flowcharts can help with quick revision, especially for Biology. Regular testing is crucial - solve previous years' papers and take mock tests to build stamina for the 3-hour exam. Most successful NEET aspirants dedicate specific time slots to each subject daily, with extra hours for their weaker areas. For Biology, supplement your study with visual aids and mnemonic techniques to remember complex processes and classifications.",
          resources: getRelevantYouTubeResources("exams")
        };
      }
    }
    
    // If we've detected a topic but haven't matched a specific query
    if (detectedTopic) {
      const resources = getRelevantYouTubeResources(detectedTopic);
      
      switch(detectedTopic) {
        case "math":
          return {
            content: educationalTopics.mathematics[Math.floor(Math.random() * educationalTopics.mathematics.length)],
            resources
          };
        case "physics":
          return {
            content: educationalTopics.physics[Math.floor(Math.random() * educationalTopics.physics.length)],
            resources
          };
        case "chemistry":
          return {
            content: educationalTopics.chemistry[Math.floor(Math.random() * educationalTopics.chemistry.length)],
            resources
          };
        case "biology":
          return {
            content: educationalTopics.biology[Math.floor(Math.random() * educationalTopics.biology.length)],
            resources
          };
        case "history":
          return {
            content: educationalTopics.history[Math.floor(Math.random() * educationalTopics.history.length)],
            resources
          };
        case "geography":
          return {
            content: educationalTopics.geography[Math.floor(Math.random() * educationalTopics.geography.length)],
            resources
          };
        case "computers":
          return {
            content: educationalTopics.computerScience[Math.floor(Math.random() * educationalTopics.computerScience.length)],
            resources
          };
        case "education":
          return {
            content: indianEducationSystem.boards[Math.floor(Math.random() * indianEducationSystem.boards.length)],
            resources: [
              { type: "youtube", title: "Indian Education System", url: "https://www.youtube.com/results?search_query=indian+education+system" },
              { type: "youtube", title: "NCERT Solutions", url: "https://www.youtube.com/results?search_query=ncert+solutions" }
            ]
          };
        case "exams":
          return {
            content: indianEducationSystem.exams[Math.floor(Math.random() * indianEducationSystem.exams.length)],
            resources
          };
      }
    }
    
    // Default responses for general queries
    const generalResponses = [
      `I've analyzed your question about "${query}" in the context of the Indian education system. This is a complex topic with multiple aspects relevant to different educational boards and standards. Would you like me to focus on CBSE, ICSE, or state board perspective?`,
      `"${query}" is an interesting topic in the Indian educational context! I can provide information based on NCERT guidelines or go beyond the curriculum. Which specific aspect interests you most?`,
      `Based on your question about "${query}", I can see several educational angles relevant to Indian students. Would you like a general overview according to CBSE/NCERT standards or a more competitive exam-oriented explanation?`,
      `I've researched "${query}" from an Indian education perspective. This topic connects to several key concepts across multiple disciplines in the Indian curriculum. Which standard or board's perspective would you like me to elaborate on?`,
      `Your question about "${query}" touches on important educational concepts for Indian students. I can provide detailed explanations based on NCERT textbooks, example problems from board exams, or approaches for competitive exams like JEE/NEET. What would be most helpful?`
    ];
    
    return {
      content: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      resources: [
        { type: "youtube", title: "Educational Resources", url: "https://www.youtube.com/results?search_query=indian+education" },
        { type: "youtube", title: "NCERT Solutions", url: "https://www.youtube.com/results?search_query=ncert+solutions" }
      ]
    };
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
    utterance.rate = speechRate;  // Apply current speech rate
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
          <p className="text-sm text-muted-foreground">Specialized in Indian Education System</p>
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
                
                {/* Resource links */}
                {message.resources && message.resources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/40">
                    <p className="text-xs font-medium mb-1">Helpful Resources:</p>
                    <div className="space-y-1">
                      {message.resources.map((resource, index) => (
                        <a 
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                        >
                          {resource.type === 'youtube' && <Youtube className="h-3 w-3" />}
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
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
            placeholder="Ask about NEET preparation, JEE syllabus, etc..."
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
