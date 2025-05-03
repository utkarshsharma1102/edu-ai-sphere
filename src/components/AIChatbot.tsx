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
    ],
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
      const responseData = generateAdvancedResponse(input, updatedContext);
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
      return {
        content: `The Graduate Aptitude Test in Engineering (GATE) is a prestigious national-level examination in India that tests comprehensive understanding of undergraduate engineering and science subjects. GATE scores are used for:\n\n1) Admissions to postgraduate programs (M.Tech/ME/Ph.D) in IITs, NITs, and other prestigious institutions\n2) Recruitment in several Public Sector Undertakings (PSUs)\n3) Scholarships for higher studies\n\nThe exam structure consists of a single paper of 3 hours duration with 65 questions worth 100 marks. It includes 15% General Aptitude questions and 85% subject-specific questions across 29 disciplines. The question types include Multiple Choice Questions (MCQs) and Numerical Answer Type (NAT) questions.\n\nPreparation typically requires 6-12 months of dedicated study, focusing on building strong conceptual understanding rather than memorization. Would you like more specific information about GATE syllabus, preparation strategy, or recommended study materials for a particular engineering branch?`,
        resources: competitiveExams.gate.resources
      };
    }
    
    // Handle CAT exam specific queries
    if (examDetected === "cat") {
      if (lowerQuery.includes("syllabus") || lowerQuery.includes("curriculum") || lowerQuery.includes("topics") || lowerQuery.includes("pattern")) {
        let section = "";
        if (lowerQuery.includes("verbal") || lowerQuery.includes("varc") || lowerQuery.includes("reading")) section = "varc";
        else if (lowerQuery.includes("quant") || lowerQuery.includes("qa") || lowerQuery.includes("math")) section = "qa";
        else if (lowerQuery.includes("dilr") || lowerQuery.includes("data interpretation") || lowerQuery.includes("logical reasoning")) section = "dilr";
        
        const sectionContent = section ? competitiveExams.cat.syllabus[section as keyof typeof competitiveExams.cat.syllabus] : "The CAT exam has three sections: VARC, DILR, and QA. Each section has sectional time limits.";
        
        return {
          content: `The CAT exam ${section ? section.toUpperCase() + " section" : "syllabus"} includes: ${sectionContent}.\n\nThe CAT (Common Admission Test) exam pattern consists of three sections:\n\n1) Verbal Ability and Reading Comprehension (VARC): Tests reading comprehension, vocabulary, grammar, and verbal reasoning\n\n2) Data Interpretation & Logical Reasoning (DILR): Assesses ability to interpret data presented in tables, graphs, charts and solve logical reasoning puzzles\n\n3) Quantitative Ability (QA): Tests mathematical skills covering arithmetic, algebra, geometry, and modern mathematics\n\nThe total duration is 2 hours with each section having a time limit of 40 minutes (sectional time limits). The exam is computer-based with approximately 66 questions in total. Most questions are MCQs, with some non-MCQs that don't have negative marking. Would you like specific preparation strategies for any of these sections?`,
          resources: competitiveExams.cat.resources
        };
      }
      
      if (lowerQuery.includes("preparation") || lowerQuery.includes("strategy") || lowerQuery.includes("how to prepare") || lowerQuery.includes("prepare")) {
        return {
          content: `For comprehensive CAT preparation, here's a detailed strategy:\n\n**General Approach:**\n1) Start preparation at least 6-8 months before the exam\n2) Understand the complete syllabus and exam pattern\n3) Create a balanced study plan covering all three sections\n4) Take regular mock tests (at least 20-30 before the actual exam)\n5) Analyze your performance after each mock test\n\n**Section-wise Strategy:**\n\n**For VARC:**\n- Develop a reading habit - newspapers, editorials, diverse genres of books\n- Practice 2-3 RC passages daily with timed conditions\n- Build vocabulary through contextual learning rather than rote memorization\n- Learn to identify tone, main idea, and inference in passages\n\n**For DILR:**\n- Start with basic sets and gradually move to complex puzzles\n- Practice various types of DI (tables, graphs, charts, etc.) daily\n- Learn to identify patterns and develop alternative approaches\n- Time management is crucial - learn to quickly assess difficulty\n\n**For QA:**\n- Strengthen fundamentals in arithmetic, algebra, geometry, and modern math\n- Learn shortcut techniques for calculation\n- Practice solving problems within time constraints\n- Maintain an error log to track and revisit mistakes\n\n**Last Month Strategy:**\n- Focus on taking full-length mock tests every alternate day\n- Revise formulas, concepts, and vocabulary\n- Work on your test-taking strategy - question selection, time management\n- Avoid learning new concepts; focus on strengthening existing knowledge\n\nConsistent practice, strategic approach, and continuous improvement are key to CAT success.`,
          resources: competitiveExams.cat.resources
        };
      }
      
      // Default CAT response
      return {
        content: `The Common Admission Test (CAT) is India's premier management entrance examination for admission to IIMs and over 1,200 business schools across the country. Key aspects include:\n\n1) Exam Structure: Three sections - Verbal Ability & Reading Comprehension (VARC), Data Interpretation & Logical Reasoning (DILR), and Quantitative Ability (QA)\n\n2) Format: Computer-based test lasting 2 hours with sectional time limits (40 minutes per section)\n\n3) Questions: Approximately 66 questions in total, with MCQs and non-MCQs\n\n4) Difficulty: Known for its challenging difficulty level and high competition\n\n5) Scoring: Scaled scores considering question difficulty and other factors\n\n6) Preparation Time: Typically 6-12 months depending on your background\n\nBeyond the CAT score, IIMs and other management institutes also consider academic performance, work experience, diversity factors, and performance in subsequent group discussions and personal interviews.\n\nWhat specific aspect of CAT preparation would you like to know more about?`,
        resources: competitiveExams.cat.resources
      };
    }
    
    // Handle research methodology queries
    if (detectedTopic === "research" && (lowerQuery.includes("methodology") || lowerQuery.includes("method") || lowerQuery.includes("how to") || lowerQuery.includes("process"))) {
      if (lowerQuery.includes("literature review") || lowerQuery.includes("review of literature")) {
        const literatureReviewResource = researchResources.find(r => r.title.includes("Literature Review"));
        return {
          content: `A literature review is a critical component of academic research that involves analyzing, evaluating, and synthesizing existing research relevant to your research question. Here's a comprehensive guide on conducting an effective literature review:\n\n**1. Purpose of Literature Review:**\n- Establish what is known about your topic\n- Identify theories, methods, and gaps in existing research\n- Position your research within the existing body of knowledge\n- Justify your research question and methodology\n\n**2. Step-by-Step Process:**\n\n**Define scope:** Determine parameters - time period, geographical regions, methodologies, key concepts\n\n**Search for literature:** Use academic databases (Google Scholar, JSTOR, ScienceDirect, PubMed), library catalogs, and citation tracking\n\n**Evaluate sources:** Assess credibility, authority, objectivity, methodology, and relevance\n\n**Organize information:** Create a system
