import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import VoiceControl from './VoiceControl';
import { Volume2, VolumeX, Youtube, FileText, Link as LinkIcon, ExternalLink } from 'lucide-react';

type Message = {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
  resources?: Resource[];
};

type Resource = {
  type: 'youtube' | 'course' | 'book' | 'article' | 'notes';
  title: string;
  url: string;
  description?: string;
};

interface AIChatbotProps {
  initialInput?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your Academic Assistant specializing in higher education, research, and professional advancement. How can I help you today? Feel free to ask about GATE, CAT, research methodology, or any academic topic.",
    isUser: false,
    timestamp: new Date(),
  },
];

// Enhanced academic topics focused on higher education
const academicTopics = {
  engineering: [
    "Engineering disciplines include Civil, Mechanical, Electrical, Electronics, Computer, Chemical, and many more specialized fields. Each requires strong foundations in mathematics and sciences.",
    "The GATE (Graduate Aptitude Test in Engineering) is crucial for engineering graduates seeking postgraduate education or PSU recruitment in India.",
    "Modern engineering education emphasizes interdisciplinary learning, combining traditional disciplines with emerging fields like AI, sustainability, and bioengineering.",
    "Engineering research methodology typically follows the scientific method with emphasis on applied problem-solving and prototype development.",
    "Engineering graduates can pursue careers in industry, research, consulting, entrepreneurship, or further specialization through higher education."
  ],
  computerScience: [
    "Computer Science education covers algorithms, data structures, programming languages, software engineering, artificial intelligence, machine learning, and more.",
    "For advanced studies, specializing in areas like AI/ML, cybersecurity, cloud computing, or data science provides focused expertise.",
    "Research in Computer Science requires understanding of theoretical foundations, experimental design, implementation, and empirical evaluation.",
    "Computer Science professionals need to continuously update their skills as technologies evolve rapidly in this field.",
    "Career paths include software development, data science, IT management, research, teaching, and entrepreneurship."
  ],
  management: [
    "Management education focuses on business administration, finance, marketing, human resources, operations, strategy, and organizational behavior.",
    "The CAT (Common Admission Test) is the primary entrance examination for prestigious management institutions like IIMs in India.",
    "MBA programs typically offer specializations in finance, marketing, HR, operations, IT, and increasingly in emerging areas like sustainable business and digital transformation.",
    "Executive MBA programs cater to working professionals seeking to advance their careers without leaving their jobs.",
    "Management research methods include case studies, surveys, statistical analysis, and qualitative approaches like interviews and focus groups."
  ],
  humanities: [
    "Humanities disciplines include literature, history, philosophy, linguistics, cultural studies, and more, focusing on human culture and experience.",
    "Research in humanities typically employs qualitative methodologies like textual analysis, ethnography, historiography, and critical theory.",
    "Advanced degrees in humanities prepare students for careers in academia, publishing, media, cultural institutions, and increasingly in corporate settings valuing critical thinking.",
    "Digital humanities is an emerging field combining traditional humanities scholarship with computational methods and digital tools.",
    "Humanities education develops critical thinking, communication skills, cultural awareness, and ethical reasoning applicable across diverse careers."
  ],
  research: [
    "Research methodology varies across disciplines but generally includes problem formulation, literature review, hypothesis development, data collection and analysis, and publication.",
    "Academic publishing requires understanding of peer review processes, journal selection, impact factors, citation practices, and increasingly open access options.",
    "Research funding can be secured through university grants, government agencies like UGC or DST in India, corporate sponsorships, or international collaborations.",
    "Interdisciplinary research combining insights and methods from multiple fields is increasingly valued in addressing complex societal challenges.",
    "Research ethics encompasses issues of informed consent, data privacy, plagiarism prevention, conflicts of interest, and responsible reporting of results."
  ]
};

// Higher education system specific information
const higherEducationSystem = {
  degrees: [
    "Bachelor's degrees (BA, BSc, BTech) typically require 3-4 years of full-time study and serve as the foundation for higher education.",
    "Master's degrees (MA, MSc, MTech, MBA) usually require 1-2 years beyond bachelor's and provide specialized knowledge in specific fields.",
    "Doctoral degrees (PhD) focus on original research contributions to a field, typically requiring 3-5+ years beyond a master's degree.",
    "Professional degrees like MBBS (medicine), LLB (law), and B.Arch (architecture) prepare students for specific licensed professions."
  ],
  admissions: [
    "Entrance examinations are common for admission to prestigious institutions and programs in India.",
    "Statement of purpose (SOP), letters of recommendation, academic transcripts, and interviews are typical components of graduate admissions.",
    "International education often requires standardized tests like GRE, GMAT, TOEFL or IELTS for language proficiency.",
    "Research-based admissions may require research proposals and potential supervisor approval before formal application."
  ],
  institutions: [
    "Universities are degree-granting institutions offering a wide range of academic programs across disciplines.",
    "Specialized institutions like IITs, IIMs, AIIMS, and NITs focus on specific fields like engineering, management, medicine, and technology.",
    "Research institutes often focus on advanced research rather than teaching, though many offer doctoral and post-doctoral opportunities.",
    "Autonomous colleges have greater academic freedom while being affiliated with universities for degree-granting purposes."
  ]
};

// Competitive exams information with detailed resources
const competitiveExams = {
  gate: {
    overview: [
      "GATE (Graduate Aptitude Test in Engineering) tests engineering fundamentals and is conducted for admission to postgraduate programs.",
      "GATE score is valid for 3 years and is also used for recruitment by public sector undertakings (PSUs).",
      "The exam includes General Aptitude (15%) and subject-specific questions (85%) in 29 different disciplines.",
      "Preparation typically requires strong fundamentals in the chosen engineering discipline and practice with previous years' papers."
    ],
    syllabus: {
      cse: "Data Structures, Algorithms, DBMS, OS, Computer Networks, TOC, Compiler Design, Digital Logic, Computer Organization",
      ece: "Signals & Systems, Analog Circuits, Digital Circuits, Control Systems, Communications, Electromagnetics",
      mechanical: "Engineering Mechanics, Strength of Materials, Fluid Mechanics, Thermodynamics, Heat Transfer, Manufacturing",
      civil: "Structural Engineering, Geotechnical Engineering, Water Resources, Transportation Engineering, Environmental Engineering"
    },
    preparation: [
      "Create a structured study plan covering the complete syllabus with emphasis on high-weightage topics",
      "Understand fundamental concepts thoroughly rather than memorizing formulas",
      "Practice previous years' papers and take regular mock tests",
      "Focus on time management and accuracy during practice sessions",
      "Join online forums or study groups for doubt resolution"
    ],
    resources: [
      {
        type: 'youtube' as const,
        title: "GATE CSE Complete Course by NPTEL",
        url: "https://www.youtube.com/nptel",
        description: "Comprehensive video lectures by IIT professors covering the entire GATE CSE syllabus"
      },
      {
        type: 'youtube' as const,
        title: "GATE ECE Lectures by GATE Academy",
        url: "https://www.youtube.com/gateacademy",
        description: "Detailed video explanations of core ECE concepts for GATE preparation"
      },
      {
        type: 'notes' as const,
        title: "Computer Science GATE Notes",
        url: "https://example.com/gate-cs-notes",
        description: "Comprehensive study material covering all CS topics with solved examples"
      },
      {
        type: 'article' as const,
        title: "GATE Preparation Strategy by Toppers",
        url: "https://example.com/gate-strategy",
        description: "Detailed approaches and study plans from students who scored 99+ percentile"
      }
    ]
  },
  cat: {
    overview: [
      "CAT (Common Admission Test) is the entrance exam for IIMs and many other prestigious business schools.",
      "The exam tests Verbal Ability and Reading Comprehension (VARC), Data Interpretation and Logical Reasoning (DILR), and Quantitative Ability (QA).",
      "Preparation requires strong mathematical skills, logical reasoning abilities, and excellent reading comprehension.",
      "Beyond CAT, business school admissions typically consider academic performance, work experience, and interview performance."
    ],
    syllabus: {
      varc: "Reading Comprehension, Para Jumbles, Para Summary, Sentence Completion, Verbal Reasoning",
      dilr: "Data Interpretation (Tables, Graphs, Charts), Logical Reasoning (Arrangements, Puzzles, Syllogisms)",
      qa: "Arithmetic, Algebra, Geometry, Number System, Modern Math, Mensuration, Trigonometry"
    },
    preparation: [
      "Develop strong reading habits across diverse genres to improve VARC",
      "Practice DILR sets daily to improve pattern recognition and analytical thinking",
      "Strengthen mathematical fundamentals for QA section",
      "Take regular sectional and full-length mock tests",
      "Analyze performance after each mock test to identify and work on weak areas"
    ],
    resources: [
      {
        type: 'youtube' as const,
        title: "CAT Quantitative Aptitude Masterclass",
        url: "https://www.youtube.com/catprep",
        description: "Complete mathematics preparation for CAT with shortcut techniques"
      },
      {
        type: 'youtube' as const,
        title: "VARC Strategies by IIM Alumni",
        url: "https://www.youtube.com/catvarc",
        description: "Reading comprehension and verbal ability techniques explained by experts"
      },
      {
        type: 'notes' as const,
        title: "DILR Framework and Practice Sets",
        url: "https://example.com/cat-dilr-notes",
        description: "Structured approach to solving complex DILR problems with 50+ practice sets"
      },
      {
        type: 'article' as const,
        title: "CAT Last Month Strategy",
        url: "https://example.com/cat-last-month",
        description: "Focus areas and revision plan for the final month before CAT exam"
      }
    ]
  },
  ugcnet: {
    overview: [
      "UGC NET (National Eligibility Test) qualifies candidates for assistant professor positions and Junior Research Fellowships.",
      "The exam consists of two papers: Paper I on general aptitude and teaching, and Paper II on the chosen subject.",
      "Preparation requires in-depth knowledge of the subject area and understanding of research methodology.",
      "Qualifying candidates become eligible to apply for teaching positions in Indian universities and colleges."
    ],
    resources: [
      {
        type: 'youtube' as const,
        title: "UGC NET Paper 1 Complete Course",
        url: "https://www.youtube.com/ugcnetpaper1",
        description: "Comprehensive coverage of all Paper 1 topics with practice questions"
      },
      {
        type: 'notes' as const,
        title: "UGC NET Computer Science Study Material",
        url: "https://example.com/ugcnet-cs-notes",
        description: "Complete notes covering all units of the CS syllabus with previous year solutions"
      }
    ]
  },
  upsc: {
    overview: [
      "UPSC Civil Services Examination has three stages: Preliminary, Mains, and Interview.",
      "The syllabus is vast, covering general studies, optional subjects, and current affairs.",
      "Preparation typically takes 1-3 years of dedicated study covering diverse subjects.",
      "Success requires not only knowledge but analytical abilities, ethical reasoning, and communication skills."
    ],
    resources: [
      {
        type: 'youtube' as const,
        title: "UPSC Complete Preparation Series",
        url: "https://www.youtube.com/upscprep",
        description: "Systematic coverage of entire UPSC syllabus by experienced faculty"
      },
      {
        type: 'notes' as const,
        title: "UPSC GS Notes and Mind Maps",
        url: "https://example.com/upsc-notes",
        description: "Concise notes on all General Studies topics with mind maps for better retention"
      }
    ]
  },
  gre: {
    overview: [
      "GRE (Graduate Record Examination) is required for admission to many graduate programs internationally.",
      "The exam tests verbal reasoning, quantitative reasoning, and analytical writing.",
      "Scores range from 130-170 for verbal and quantitative sections, and 0-6 for analytical writing.",
      "Preparation should focus on vocabulary, reading comprehension, basic mathematics, and essay writing skills."
    ],
    resources: [
      {
        type: 'youtube' as const,
        title: "GRE Verbal Reasoning Masterclass",
        url: "https://www.youtube.com/gre-verbal",
        description: "Strategies for tackling reading comprehension and vocabulary questions"
      },
      {
        type: 'notes' as const,
        title: "GRE Quantitative Practice Problems",
        url: "https://example.com/gre-quant",
        description: "500+ practice problems covering all quantitative reasoning topics"
      }
    ]
  },
  gmat: {
    overview: [
      "GMAT (Graduate Management Admission Test) is specifically designed for business school admissions.",
      "The exam includes sections on analytical writing, integrated reasoning, quantitative, and verbal skills.",
      "Scores range from 200-800, with top business schools typically expecting scores above 700.",
      "Preparation should emphasize data sufficiency questions, critical reasoning, and time management."
    ],
    resources: [
      {
        type: 'youtube' as const,
        title: "GMAT Critical Reasoning Techniques",
        url: "https://www.youtube.com/gmat-cr",
        description: "Step-by-step approach to master Critical Reasoning questions"
      },
      {
        type: 'notes' as const,
        title: "GMAT Integrated Reasoning Guide",
        url: "https://example.com/gmat-ir",
        description: "Complete coverage of all four question types in the IR section with strategies"
      }
    ]
  }
};

// Research and academic writing resources
const researchResources = [
  {
    type: 'youtube' as const,
    title: "Research Methodology: Complete Process Explained",
    url: "https://www.youtube.com/watch?v=research-methodology",
    description: "Comprehensive overview of research process from hypothesis formulation to publication"
  },
  {
    type: 'youtube' as const,
    title: "Academic Writing for Journal Publications",
    url: "https://www.youtube.com/watch?v=academic-writing",
    description: "Techniques for effective academic writing with focus on journal article structure"
  },
  {
    type: 'notes' as const,
    title: "Literature Review Framework & Templates",
    url: "https://example.com/literature-review",
    description: "Structured approach to writing comprehensive literature reviews with examples"
  },
  {
    type: 'article' as const,
    title: "Statistical Analysis for Research Papers",
    url: "https://example.com/statistical-analysis",
    description: "Guide to choosing appropriate statistical methods for different research designs"
  },
  {
    type: 'notes' as const,
    title: "Research Paper Template with Examples",
    url: "https://example.com/research-paper-template",
    description: "Ready-to-use templates for different types of research papers with annotations"
  }
];

// Academic resources by subject
const academicResources = [
  {
    subject: "Engineering",
    resources: [
      {
        type: 'youtube' as const,
        title: "Advanced Engineering Mathematics",
        url: "https://www.youtube.com/watch?v=eng-math",
        description: "Comprehensive course covering all higher mathematics concepts for engineers"
      },
      {
        type: 'notes' as const,
        title: "Engineering Mechanics Complete Notes",
        url: "https://example.com/eng-mechanics",
        description: "Illustrated notes with solved examples and practice problems"
      }
    ]
  },
  {
    subject: "Computer Science",
    resources: [
      {
        type: 'youtube' as const,
        title: "Data Structures and Algorithms Masterclass",
        url: "https://www.youtube.com/watch?v=dsa",
        description: "In-depth coverage of all major data structures and algorithms with visualizations"
      },
      {
        type: 'notes' as const,
        title: "Operating Systems Complete Study Material",
        url: "https://example.com/os-notes",
        description: "Comprehensive notes covering process management, memory management, file systems and more"
      }
    ]
  },
  {
    subject: "Management",
    resources: [
      {
        type: 'youtube' as const,
        title: "Strategic Management Principles",
        url: "https://www.youtube.com/watch?v=strategy",
        description: "Course covering core strategic management concepts with case studies"
      },
      {
        type: 'notes' as const,
        title: "Financial Management Comprehensive Guide",
        url: "https://example.com/finance-management",
        description: "Detailed notes on financial ratios, capital budgeting, working capital management"
      }
    ]
  },
  {
    subject: "Economics",
    resources: [
      {
        type: 'youtube' as const,
        title: "Advanced Macroeconomics",
        url: "https://www.youtube.com/watch?v=macro",
        description: "In-depth coverage of advanced macroeconomic theories and policies"
      },
      {
        type: 'notes' as const,
        title: "Econometrics Study Material",
        url: "https://example.com/econometrics",
        description: "Comprehensive notes on regression analysis, time series, and panel data models"
      }
    ]
  }
];

// API URL and key for OpenAI integration
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Interface for OpenAI API response structure
interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    }
  }[];
  error?: {
    message: string;
  }
}

const AIChatbot: React.FC<AIChatbotProps> = ({ initialInput = '' }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [speechRate, setSpeechRate] = useState(1);
  const [apiKey, setApiKey] = useState<string>('');
  const [useAI, setUseAI] = useState<boolean>(false);
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

  // Function to handle API key input
  const handleAPIKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setUseAI(true);
      localStorage.setItem('openai_key', apiKey);
      toast({
        title: "API Key Saved",
        description: "Your API key has been securely saved in your browser's local storage.",
      });
    }
  };

  // Function to get API key from local storage
  useEffect(() => {
    const storedKey = localStorage.getItem('openai_key');
    if (storedKey) {
      setApiKey(storedKey);
      setUseAI(true);
    }
  }, []);

  // Function to call OpenAI API
  const callOpenAI = async (prompt: string): Promise<string> => {
    try {
      // Check if API key is available
      if (!apiKey) {
        throw new Error("API key not provided");
      }

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: "system",
              content: `You are an Academic Assistant specializing in higher education, research, and professional advancement. 
              Your goal is to help students perform better in their academics and develop new skills they want to learn. 
              Provide detailed answers to academic questions, learning recommendations, and links to necessary materials and free resources.
              Focus on being helpful, informative, and providing actionable advice.
              Format your responses with clear sections, bullet points when appropriate, and highlight important information.
              When responding about a specific subject, try to recommend relevant YouTube videos, online courses, or other learning materials.
              Always maintain a supportive, encouraging tone.`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.5,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  };

  // Enhanced function to identify resource links in OpenAI responses
  const extractResources = (content: string): Resource[] => {
    const resources: Resource[] = [];
    
    // Check for YouTube links or mentions
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)(?:\S+)?/g;
    const youtubeMatches = content.matchAll(youtubeRegex);
    
    for (const match of youtubeMatches) {
      const url = match[0];
      const title = `YouTube Video: ${match[1]}`;
      
      resources.push({
        type: 'youtube',
        title: title,
        url: url.startsWith('http') ? url : `https://${url}`,
        description: 'Educational video resource'
      });
    }
    
    // Check for PDF/notes links
    const notesRegex = /(?:https?:\/\/\S+\.pdf|link to notes: (https?:\/\/\S+))/gi;
    const notesMatches = content.matchAll(notesRegex);
    
    for (const match of notesMatches) {
      const url = match[1] || match[0];
      
      resources.push({
        type: 'notes',
        title: 'Study Notes',
        url: url.startsWith('http') ? url : `https://${url}`,
        description: 'Educational notes or documentation'
      });
    }
    
    // Check for article mentions
    const articleRegex = /(?:article|blog post): (https?:\/\/\S+)/gi;
    const articleMatches = content.matchAll(articleRegex);
    
    for (const match of articleMatches) {
      const url = match[1];
      
      resources.push({
        type: 'article',
        title: 'Article Resource',
        url: url,
        description: 'Relevant article for further reading'
      });
    }
    
    return resources;
  };

  // Function for text-to-speech
  const speakText = (text: string) => {
    if (speechSynthesis) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      // Create a new utterance with the text
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set the speech rate
      utterance.rate = speechRate;
      
      // Start speaking
      setIsSpeaking(true);
      
      // Add an event listener for when speech ends
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      // Speak the text
      speechSynthesis.speak(utterance);
    }
  };

  // Toggle mute/unmute function
  const toggleMute = () => {
    if (isSpeaking && !isMuted) {
      speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

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
    
    try {
      let responseContent = '';
      let resourceLinks: Resource[] = [];
      
      // Use OpenAI if API key is provided, otherwise use local function
      if (useAI && apiKey) {
        try {
          responseContent = await callOpenAI(input);
          resourceLinks = extractResources(responseContent);
        } catch (error) {
          console.error("Error calling OpenAI:", error);
          toast({
            title: "API Error",
            description: "There was an error connecting to the AI service. Falling back to local responses.",
            variant: "destructive",
          });
          
          // Fallback to local response generator
          const localResponse = generateAdvancedResponse(input, updatedContext);
          responseContent = localResponse.content;
          resourceLinks = localResponse.resources || [];
        }
      } else {
        // Use local response generator if API key is not provided
        const localResponse = generateAdvancedResponse(input, updatedContext);
        responseContent = localResponse.content;
        resourceLinks = localResponse.resources || [];
      }
      
      // Create AI response message
      const aiResponseMessage: Message = {
        id: messages.length + 2,
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
        resources: resourceLinks
      };
      
      setMessages((prev) => [...prev, aiResponseMessage]);
      
      // Speak the response if not muted
      if (!isMuted) {
        speakText(responseContent);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Enhanced response generator with more detailed responses and better resources
  const generateAdvancedResponse = (query: string, context: string[]): { content: string, resources?: Resource[] } => {
    // Convert query to lowercase for easier matching
    const lowerQuery = query.toLowerCase();
    
    // Check for follow-up questions using context
    const isFollowUp = context.length > 1 && 
      (lowerQuery.includes("why") || lowerQuery.includes("how") || 
       lowerQuery.includes("what") || lowerQuery.includes("can you explain") ||
       lowerQuery.includes("tell me more"));
    
    // Define topics to search for in the query
    const topicMatches = {
      engineering: ["engineering", "gate", "tech", "mechanical", "electrical", "civil", "electronics"],
      computerScience: ["computer", "programming", "algorithm", "data structure", "python", "java", "coding", "software"],
      management: ["management", "mba", "cat", "marketing", "finance", "business", "operations", "hr"],
      humanities: ["literature", "history", "philosophy", "sociology", "psychology", "arts", "language"],
      research: ["research", "methodology", "thesis", "dissertation", "paper", "publication", "phd", "doctorate"],
      exams: ["gate", "cat", "gre", "gmat", "ugc", "net", "upsc", "civil services"]
    };
    
    // Try to determine the topic based on query content
    let detectedTopic = "";
    let examDetected = "";
    
    for (const [topic, keywords] of Object.entries(topicMatches)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        detectedTopic = topic;
        break;
      }
    }
    
    // Check for specific exams
    if (lowerQuery.includes("gate")) examDetected = "gate";
    else if (lowerQuery.includes("cat") && (lowerQuery.includes("exam") || lowerQuery.includes("mba") || lowerQuery.includes("management"))) examDetected = "cat";
    else if ((lowerQuery.includes("ugc") && lowerQuery.includes("net")) || lowerQuery.includes("jrf")) examDetected = "ugcnet";
    else if (lowerQuery.includes("upsc") || lowerQuery.includes("civil services") || lowerQuery.includes("ias")) examDetected = "upsc";
    else if (lowerQuery.includes("gre")) examDetected = "gre";
    else if (lowerQuery.includes("gmat")) examDetected = "gmat";
    
    // Handle GATE exam specific queries
    if (examDetected === "gate") {
      // Check for specific GATE related sub-topics
      if (lowerQuery.includes("syllabus") || lowerQuery.includes("curriculum") || lowerQuery.includes("topics")) {
        let branch = "";
        if (lowerQuery.includes("computer") || lowerQuery.includes("cse") || lowerQuery.includes("cs")) branch = "cse";
        else if (lowerQuery.includes("electronic") || lowerQuery.includes("electrical") || lowerQuery.includes("ece")) branch = "ece";
        else if (lowerQuery.includes("mechanical") || lowerQuery.includes("mech")) branch = "mechanical";
        else if (lowerQuery.includes("civil")) branch = "civil";
        
        const syllabus = branch ? competitiveExams.gate.syllabus[branch as keyof typeof competitiveExams.gate.syllabus] : "The GATE syllabus varies by branch. Please specify which engineering branch you're interested in (e.g., CSE, ECE, Mechanical, Civil)";
        
        return {
          content: `The GATE syllabus for ${branch || "engineering branches"} includes: ${syllabus}. The exam is divided into General Aptitude (15 marks) and subject-specific questions (85 marks). The General Aptitude section is common for all papers and tests verbal ability, numerical ability, and analytical skills. The subject-specific section tests the core concepts of the particular engineering discipline. The questions are primarily multiple-choice and numerical answer type questions. GATE is a computer-based test of 3 hours duration, with 65 questions worth 100 marks total.`,
          resources: competitiveExams.gate.resources
        };
      }
      
      if (lowerQuery.includes("preparation") || lowerQuery.includes("strategy") || lowerQuery.includes("how to prepare") || lowerQuery.includes("prepare")) {
        return {
          content: `For comprehensive GATE preparation, I recommend the following strategy:\n\n1) Understand the complete syllabus and exam pattern first\n2) Obtain standard textbooks and quality study materials\n3) Create a realistic study schedule allocating more time to high-weightage topics\n4) Master the fundamentals thoroughly before attempting advanced problems\n5) Solve previous years' question papers to understand the pattern and difficulty level\n6) Take regular mock tests under timed conditions\n7) Analyze your performance after each mock test to identify weak areas\n8) Join online forums or study groups for doubt resolution\n9) Focus on the General Aptitude section too, which accounts for 15% of the marks\n10) During the final month, focus on revision and practice rather than learning new concepts\n\nTime management is crucial both during preparation and the exam itself. For the exam, I suggest attempting easy questions first, then moving to moderate and difficult ones. Mark questions for review if you're unsure, and return to them if time permits.`,
          resources: competitiveExams.gate.resources
        };
      }
      
      if (lowerQuery.includes("books") || lowerQuery.includes("material") || lowerQuery.includes("resources") || lowerQuery.includes("study material")) {
        return {
          content: `For GATE preparation, I recommend these high-quality resources:\n\n**Reference Books:**\n1. For Computer Science: "Gate Engineering Mathematics" by Pearson, "Computer Networks" by Forouzan, "Operating System Concepts" by Galvin\n2. For Electronics: "Signals and Systems" by Oppenheim, "Digital Design" by Morris Mano, "Electronic Devices" by Floyd\n3. For Mechanical: "Thermodynamics" by P.K. Nag, "Strength of Materials" by R.K. Bansal, "Fluid Mechanics" by R.K. Bansal\n\n**Online Resources:**\n1. NPTEL video lectures by IIT professors\n2. Made Easy and Gate Academy study materials\n3. GateOverflow for computer science questions and discussions\n4. Previous years' papers with detailed solutions\n5. Subject-wise mock tests\n\nIt's important to not overwhelm yourself with too many books. Start with one standard textbook per subject, master it, and then refer to additional resources if needed. Practice is key - solve as many problems as possible, especially from previous years' papers.`,
          resources: competitiveExams.gate.resources
        };
      }
      
      // Default GATE response
