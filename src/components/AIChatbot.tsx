
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
    content: "Hello! I'm your Academic Assistant specializing in higher education, research, and professional advancement. How can I help you today?",
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

// Competitive exams information
const competitiveExams = {
  gate: [
    "GATE (Graduate Aptitude Test in Engineering) tests engineering fundamentals and is conducted for admission to postgraduate programs.",
    "GATE score is valid for 3 years and is also used for recruitment by public sector undertakings (PSUs).",
    "The exam includes General Aptitude (15%) and subject-specific questions (85%) in 29 different disciplines.",
    "Preparation typically requires strong fundamentals in the chosen engineering discipline and practice with previous years' papers."
  ],
  cat: [
    "CAT (Common Admission Test) is the entrance exam for IIMs and many other prestigious business schools.",
    "The exam tests Verbal Ability and Reading Comprehension (VARC), Data Interpretation and Logical Reasoning (DILR), and Quantitative Ability (QA).",
    "Preparation requires strong mathematical skills, logical reasoning abilities, and excellent reading comprehension.",
    "Beyond CAT, business school admissions typically consider academic performance, work experience, and interview performance."
  ],
  ugcnet: [
    "UGC NET (National Eligibility Test) qualifies candidates for assistant professor positions and Junior Research Fellowships.",
    "The exam consists of two papers: Paper I on general aptitude and teaching, and Paper II on the chosen subject.",
    "Preparation requires in-depth knowledge of the subject area and understanding of research methodology.",
    "Qualifying candidates become eligible to apply for teaching positions in Indian universities and colleges."
  ],
  upsc: [
    "UPSC Civil Services Examination has three stages: Preliminary, Mains, and Interview.",
    "The syllabus is vast, covering general studies, optional subjects, and current affairs.",
    "Preparation typically takes 1-3 years of dedicated study covering diverse subjects.",
    "Success requires not only knowledge but analytical abilities, ethical reasoning, and communication skills."
  ],
  gre: [
    "GRE (Graduate Record Examination) is required for admission to many graduate programs internationally.",
    "The exam tests verbal reasoning, quantitative reasoning, and analytical writing.",
    "Scores range from 130-170 for verbal and quantitative sections, and 0-6 for analytical writing.",
    "Preparation should focus on vocabulary, reading comprehension, basic mathematics, and essay writing skills."
  ],
  gmat: [
    "GMAT (Graduate Management Admission Test) is specifically designed for business school admissions.",
    "The exam includes sections on analytical writing, integrated reasoning, quantitative, and verbal skills.",
    "Scores range from 200-800, with top business schools typically expecting scores above 700.",
    "Preparation should emphasize data sufficiency questions, critical reasoning, and time management."
  ]
};

// Academic resources
const academicResources = [
  {
    subject: "Engineering",
    channels: ["NPTEL", "MIT OpenCourseWare", "Coursera", "edX"]
  },
  {
    subject: "Computer Science",
    channels: ["freeCodeCamp", "CS50", "GeeksforGeeks", "Codecademy"]
  },
  {
    subject: "Management",
    channels: ["Harvard Business Review", "Wharton Online", "Stanford GSB", "IIM Digital"]
  },
  {
    subject: "Research Methods",
    channels: ["Research Methodology World", "Coursera Research Courses", "SAGE Research Methods", "Scribbr"]
  },
  {
    subject: "Academic Writing",
    channels: ["Academic Writing Pro", "Purdue OWL", "Write That PhD", "Academic English UK"]
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
      const responseData = generateAcademicResponse(input, updatedContext);
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
  
  // Enhanced response generator specialized for higher education
  const generateAcademicResponse = (query: string, context: string[]): { content: string, resources?: Resource[] } => {
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
      
      if (topic === "engineering") {
        resources = [
          { type: "youtube" as const, title: "NPTEL - Engineering Courses", url: "https://www.youtube.com/c/nptel" },
          { type: "youtube" as const, title: "GATE Academy", url: "https://www.youtube.com/c/GateAcademyOfficial" }
        ];
      } else if (topic === "computerScience") {
        resources = [
          { type: "youtube" as const, title: "freeCodeCamp", url: "https://www.youtube.com/c/freecodecamp" },
          { type: "youtube" as const, title: "CS Dojo", url: "https://www.youtube.com/c/CSDojo" }
        ];
      } else if (topic === "management") {
        resources = [
          { type: "youtube" as const, title: "MBA Crystal Ball", url: "https://www.youtube.com/c/MbaCrystalBall" },
          { type: "youtube" as const, title: "CAT Preparation by Unacademy", url: "https://www.youtube.com/c/UnacademyCAT" }
        ];
      } else if (topic === "humanities") {
        resources = [
          { type: "youtube" as const, title: "CrashCourse - Humanities", url: "https://www.youtube.com/user/crashcourse" },
          { type: "youtube" as const, title: "Yale Courses", url: "https://www.youtube.com/user/YaleCourses" }
        ];
      } else if (topic === "research") {
        resources = [
          { type: "youtube" as const, title: "Research Methodology", url: "https://www.youtube.com/results?search_query=research+methodology" },
          { type: "youtube" as const, title: "Academic Writing Tips", url: "https://www.youtube.com/results?search_query=academic+writing+tips" }
        ];
      } else if (examDetected) {
        if (lowerQuery.includes("gate")) {
          resources = [
            { type: "youtube" as const, title: "GATE Preparation - NPTEL", url: "https://www.youtube.com/c/nptel" },
            { type: "youtube" as const, title: "Made Easy GATE", url: "https://www.youtube.com/c/MadeEasyGroup" }
          ];
        } else if (lowerQuery.includes("cat")) {
          resources = [
            { type: "youtube" as const, title: "CAT Preparation by IIM Alumni", url: "https://www.youtube.com/results?search_query=cat+preparation+iim+alumni" },
            { type: "youtube" as const, title: "CAT Exam Strategies", url: "https://www.youtube.com/results?search_query=cat+exam+strategies" }
          ];
        } else if (lowerQuery.includes("upsc") || lowerQuery.includes("ias") || lowerQuery.includes("civil services")) {
          resources = [
            { type: "youtube" as const, title: "Study IAS", url: "https://www.youtube.com/c/StudyIAS" },
            { type: "youtube" as const, title: "Unacademy UPSC", url: "https://www.youtube.com/c/UnacademyUPSC" }
          ];
        } else if (lowerQuery.includes("gre")) {
          resources = [
            { type: "youtube" as const, title: "GRE Prep - Magoosh", url: "https://www.youtube.com/user/MagooshGRE" },
            { type: "youtube" as const, title: "GREgmat", url: "https://www.youtube.com/c/GREgmat" }
          ];
        } else if (lowerQuery.includes("gmat")) {
          resources = [
            { type: "youtube" as const, title: "GMAT Club", url: "https://www.youtube.com/c/GMATClub" },
            { type: "youtube" as const, title: "e-GMAT", url: "https://www.youtube.com/channel/UCF0wCZYj6NQDBkF3FlUshSQ" }
          ];
        }
      }
      
      return resources;
    };
    
    // Handle specific higher education queries
    if (lowerQuery.includes("gate") && !lowerQuery.includes("gateaway") && !lowerQuery.includes("delegate")) {
      const resources = getRelevantYouTubeResources("engineering");
      
      return {
        content: "The Graduate Aptitude Test in Engineering (GATE) is a national-level examination in India that tests the comprehensive understanding of undergraduate engineering and science subjects. GATE scores are used for admissions to postgraduate programs (M.Tech/ME/Ph.D) in IITs, NITs, and other prestigious institutions. It's also recognized by various Public Sector Undertakings (PSUs) for recruitment. The exam consists of a single paper of 3 hours, with 65 questions worth 100 marks. It includes 15% General Aptitude questions and 85% subject-specific questions in 29 disciplines including Computer Science, Mechanical Engineering, Electrical Engineering, etc. For effective preparation, I recommend mastering the fundamentals of your subject, understanding the exam pattern, practicing previous years' papers, and taking mock tests. Would you like more specific information about GATE preparation for a particular engineering branch?",
        resources
      };
    }
    
    if (lowerQuery.includes("cat") && lowerQuery.includes("exam")) {
      const resources = getRelevantYouTubeResources("management");
      
      return {
        content: "The Common Admission Test (CAT) is India's premier management entrance examination for admission to IIMs and over 1,200 business schools across the country. The exam evaluates candidates on three key areas: Verbal Ability and Reading Comprehension (VARC), Data Interpretation and Logical Reasoning (DILR), and Quantitative Ability (QA). The computer-based test lasts for 2 hours with sectional time limits. CAT is known for its challenging difficulty level and high competition. Effective preparation typically spans 6-12 months focusing on concept building, practice tests, and time management strategies. Beyond the CAT score, IIMs and other business schools also consider academic performance, work experience, diversity factors, and performance in subsequent group discussions and personal interviews. A structured approach covering all sections, regular mock tests, and analysis of your performance is essential for CAT success. Would you like specific strategies for any particular section of the CAT exam?",
        resources
      };
    }
    
    if (lowerQuery.includes("research") && (lowerQuery.includes("methodology") || lowerQuery.includes("method") || lowerQuery.includes("how to"))) {
      const resources = getRelevantYouTubeResources("research");
      
      return {
        content: "Research methodology refers to the systematic process by which researchers approach their work. In academic research, this typically follows several key steps: 1) Problem identification: Defining your research question or hypothesis, 2) Literature review: Surveying existing research to understand the current state of knowledge, 3) Research design: Selecting appropriate methods (quantitative, qualitative, or mixed), 4) Data collection: Gathering information through surveys, experiments, interviews, etc., 5) Data analysis: Applying statistical or qualitative techniques to interpret findings, 6) Conclusion and reporting: Synthesizing results and documenting the research process and outcomes. The methodology you choose should align with your research question and disciplinary norms. Quantitative research focuses on numerical data and statistical analysis, while qualitative research explores non-numerical data like interviews and observations. Mixed methods combine both approaches. Ethical considerations are essential throughout the process, including informed consent, data privacy, and proper citation. Would you like more specific information about methodology for a particular type of research or academic discipline?",
        resources
      };
    }
    
    if (lowerQuery.includes("phd") || lowerQuery.includes("doctorate") || (lowerQuery.includes("doctoral") && lowerQuery.includes("program"))) {
      const resources = getRelevantYouTubeResources("research");
      
      return {
        content: "A PhD (Doctor of Philosophy) is the highest academic degree awarded in most fields. The program typically requires 3-7 years of intensive research and culminates in a dissertation that makes an original contribution to knowledge in your field. The journey begins with coursework to build advanced knowledge, followed by a comprehensive examination or qualifying papers. The core of the program involves independent research under faculty supervision, leading to a dissertation that must be defended before a committee of experts. In India, PhD programs are offered by universities, IITs, IIMs, and specialized research institutes. Admission typically requires a master's degree with high academic standing, entrance examinations (like UGC NET), research proposals, and interviews. Funding options include university fellowships, UGC/CSIR fellowships, project assistantships, and teaching positions. The PhD journey is intellectually demanding but rewards you with specialized expertise, research skills, and credibility in your field. Are you considering applying to doctoral programs or currently pursuing a PhD?",
        resources
      };
    }
    
    if (lowerQuery.includes("gre")) {
      const resources = getRelevantYouTubeResources("exams");
      
      return {
        content: "The Graduate Record Examination (GRE) is a standardized test widely used for admissions to graduate and business programs worldwide. The GRE General Test measures verbal reasoning, quantitative reasoning, and analytical writing skills. The Verbal section tests reading comprehension, critical reasoning, and vocabulary. The Quantitative section covers basic math concepts including arithmetic, algebra, geometry, and data analysis. The Analytical Writing section includes two timed essays: analyzing an issue and analyzing an argument. Scores range from 130-170 for verbal and quantitative sections (in 1-point increments) and 0-6 for analytical writing (in half-point increments). Most test-takers score between 145-165 on verbal and quantitative sections. Preparation typically involves understanding the test format, learning test-taking strategies, building vocabulary, reviewing math concepts, and practicing with official materials. The ETS (test administrator) offers official prep materials including free practice tests. Your GRE score is valid for five years. Would you like specific preparation strategies for any section of the GRE?",
        resources
      };
    }
    
    // Handle queries about specific academic topics
    if (detectedTopic) {
      const resources = getRelevantYouTubeResources(detectedTopic);
      
      switch(detectedTopic) {
        case "engineering":
          return {
            content: academicTopics.engineering[Math.floor(Math.random() * academicTopics.engineering.length)],
            resources
          };
        case "computerScience":
          return {
            content: academicTopics.computerScience[Math.floor(Math.random() * academicTopics.computerScience.length)],
            resources
          };
        case "management":
          return {
            content: academicTopics.management[Math.floor(Math.random() * academicTopics.management.length)],
            resources
          };
        case "humanities":
          return {
            content: academicTopics.humanities[Math.floor(Math.random() * academicTopics.humanities.length)],
            resources
          };
        case "research":
          return {
            content: academicTopics.research[Math.floor(Math.random() * academicTopics.research.length)],
            resources
          };
        case "exams":
          if (lowerQuery.includes("gate")) {
            return {
              content: competitiveExams.gate[Math.floor(Math.random() * competitiveExams.gate.length)],
              resources
            };
          } else if (lowerQuery.includes("cat")) {
            return {
              content: competitiveExams.cat[Math.floor(Math.random() * competitiveExams.cat.length)],
              resources
            };
          } else if (lowerQuery.includes("ugc") || lowerQuery.includes("net")) {
            return {
              content: competitiveExams.ugcnet[Math.floor(Math.random() * competitiveExams.ugcnet.length)],
              resources
            };
          } else if (lowerQuery.includes("upsc") || lowerQuery.includes("civil service")) {
            return {
              content: competitiveExams.upsc[Math.floor(Math.random() * competitiveExams.upsc.length)],
              resources
            };
          } else if (lowerQuery.includes("gre")) {
            return {
              content: competitiveExams.gre[Math.floor(Math.random() * competitiveExams.gre.length)],
              resources
            };
          } else if (lowerQuery.includes("gmat")) {
            return {
              content: competitiveExams.gmat[Math.floor(Math.random() * competitiveExams.gmat.length)],
              resources
            };
          }
          break;
      }
    }
    
    // For follow-up questions, provide more context-aware responses
    if (isFollowUp) {
      const previousQuery = context[context.length - 2].toLowerCase();
      
      if (previousQuery.includes("gate") || previousQuery.includes("engineering")) {
        return {
          content: "Following up on GATE preparation, it's essential to develop a systematic approach. Start with understanding the detailed syllabus for your chosen engineering discipline. NPTEL courses are excellent free resources that cover most GATE topics in depth. Previous years' question papers reveal patterns and important topics - analyze them to identify high-yield areas. Conceptual clarity matters more than memorization, so focus on understanding fundamental principles thoroughly. Practice numerical problems regularly, particularly in core topics that have historically had higher weightage. Time management is crucial during preparation and the exam itself. Join study groups or online forums where you can discuss complex concepts with peers. Mock tests simulate the actual exam experience and help you identify weaknesses. Balance your preparation across all topics rather than focusing too intensively on favorites. Standard textbooks recommended by most coaching institutes provide comprehensive coverage of the syllabus. Would you like recommendations for specific resources or strategies for a particular engineering branch?",
          resources: getRelevantYouTubeResources("engineering")
        };
      }
      
      if (previousQuery.includes("cat") || previousQuery.includes("mba")) {
        return {
          content: "Regarding CAT preparation, a balanced approach is essential. For Verbal Ability and Reading Comprehension (VARC), develop a regular reading habit across diverse genres to improve comprehension speed and vocabulary. Practice RC passages daily, focusing on identifying main ideas and inferring unstated information. For Data Interpretation & Logical Reasoning (DILR), start with basic puzzles and progressively tackle more complex problems. Work on recognizing patterns quickly and developing alternative solution approaches when stuck. For Quantitative Ability (QA), ensure your fundamentals in arithmetic, algebra, geometry, and modern math are solid before attempting advanced problems. Maintain an error log to track and revisit mistakes. Mock tests are crucial - take at least 20-30 full-length mocks before the actual exam, analyzing each thoroughly. Time management strategies vary by section; for example, in VARC, read questions before passages for certain types of problems, while in DILR, spend the first 1-2 minutes evaluating which sets to attempt first. Would you like specific strategies for any particular section?",
          resources: getRelevantYouTubeResources("management")
        };
      }
      
      if (previousQuery.includes("research") || previousQuery.includes("phd")) {
        return {
          content: "Expanding on research methodology, the approach you take should align with your research question and disciplinary norms. Quantitative research uses numerical data and statistical analysis to test hypotheses and identify patterns. It's valuable when you need to generalize findings from a sample to a larger population. Qualitative research explores non-numerical data like interviews, focus groups, and observations to understand meanings, experiences, and perspectives. Mixed methods combine both approaches to provide a more comprehensive understanding. Data collection tools should be valid and reliable - piloting your instruments before full implementation is advisable. For data analysis, quantitative methods include descriptive statistics, inferential tests, and multivariate analyses, while qualitative approaches include thematic analysis, content analysis, and grounded theory. Ethical considerations are paramount throughout the research process, including obtaining proper approvals from ethics committees, ensuring informed consent from participants, maintaining confidentiality, and acknowledging all sources to avoid plagiarism. Would you like more specific guidance on developing your research design or methodology?",
          resources: getRelevantYouTubeResources("research")
        };
      }
    }
    
    // Default responses for general queries
    const generalResponses = [
      `I've analyzed your question about "${query}" in the context of higher education and academic advancement. This topic encompasses multiple aspects relevant to different disciplines and career paths. Would you like me to focus on undergraduate, postgraduate, or professional development perspectives?`,
      `"${query}" is an interesting topic in the academic context! I can provide information based on current educational practices or research perspectives. Which specific aspect interests you most?`,
      `Based on your question about "${query}", I see several academic angles that might be helpful. Would you like a general overview or a more focused explanation related to a specific field of study or career path?`,
      `I've researched "${query}" from an academic perspective. This topic connects to several key concepts across multiple disciplines. Which academic level or professional context would you like me to elaborate on?`,
      `Your question about "${query}" touches on important concepts for academic and professional advancement. I can provide detailed explanations based on educational research, career development perspectives, or specific academic disciplines. What would be most helpful?`
    ];
    
    return {
      content: generalResponses[Math.floor(Math.random() * generalResponses.length)],
      resources: [
        { type: "youtube" as const, title: "Academic Resources", url: "https://www.youtube.com/results?search_query=higher+education+resources" },
        { type: "youtube" as const, title: "Educational Research", url: "https://www.youtube.com/results?search_query=academic+research+methods" }
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
          <h2 className="font-heading text-lg font-medium">Academic AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Specialized in Higher Education & Research</p>
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
            placeholder="Ask about GATE preparation, research methods, etc..."
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
