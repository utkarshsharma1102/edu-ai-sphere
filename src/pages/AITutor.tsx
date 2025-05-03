
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import VoiceControl from '@/components/VoiceControl';
import { 
  Volume2, 
  Youtube,
  School,
  BookOpen,
  Layers,
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

const AITutor = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('tutor');
  
  // College and higher education focused subjects
  const subjects = [
    'Engineering',
    'Computer Science',
    'Business Administration',
    'Data Science',
    'Finance',
    'Economics',
    'Psychology',
    'Political Science',
    'Literature',
    'Law',
    'Medicine',
    'Architecture',
  ];
  
  // College and higher education context questions
  const sampleQuestions = [
    'How to prepare for GATE Computer Science?',
    'What are the best colleges for MBA in India?',
    'How to write a research paper for engineering journals?',
    'Explain CAT exam preparation strategy',
    'What are the career options after B.Tech in Electronics?',
    'How to apply for PhD programs in Indian universities?',
  ];

  // Course suggestions relevant to higher education
  const courseRecommendations = [
    {
      title: 'GATE Computer Science Complete Course',
      level: 'Undergraduate+',
      type: 'Engineering Entrance',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      description: 'Complete preparation covering all CS topics for GATE examination',
      price: 199
    },
    {
      title: 'CAT MBA Entrance Full Preparation',
      level: 'Graduate',
      type: 'Management Entrance',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      description: 'Comprehensive coverage of Quantitative Aptitude, Verbal Ability, Data Interpretation and Logical Reasoning',
      price: 189
    },
    {
      title: 'UGC NET Computer Science',
      level: 'Postgraduate',
      type: 'Academic Research',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      description: 'Complete preparation for UGC NET Computer Science for assistant professor and JRF positions',
      price: 149
    },
    {
      title: 'Data Science & Machine Learning Bootcamp',
      level: 'All Levels',
      type: 'Professional Skills',
      videoUrl: 'https://www.youtube.com/watch?v=example4',
      description: 'Learn industry-relevant skills in Python, Machine Learning, Deep Learning and Artificial Intelligence',
      price: 199
    },
  ];

  // Free learning video recommendations
  const youtubeVideos = [
    {
      title: 'Advanced Database Management Systems',
      channel: 'NPTEL',
      views: '1.2M',
      url: 'https://youtube.com/example1',
      thumbnail: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=200&auto=format&fit=crop'
    },
    {
      title: 'Machine Learning Specialization',
      channel: 'Stanford University',
      views: '890K',
      url: 'https://youtube.com/example2',
      thumbnail: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=200&auto=format&fit=crop'
    },
    {
      title: 'Digital Marketing Masterclass',
      channel: 'IIM Digital',
      views: '450K',
      url: 'https://youtube.com/example3',
      thumbnail: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=200&auto=format&fit=crop'
    },
    {
      title: 'Research Methodology and Academic Publishing',
      channel: 'Academic Guide',
      views: '380K',
      url: 'https://youtube.com/example4',
      thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=200&auto=format&fit=crop'
    },
  ];
  
  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    toast({
      title: "Subject Selected",
      description: `You've selected ${subject}. The AI tutor will focus on this subject.`,
    });
  };

  const handleVoiceInput = (text: string) => {
    setInputText(text);
    toast({
      title: "Voice Input Received",
      description: `You said: "${text}"`,
    });
  };
  
  const handleSampleQuestionClick = (question: string) => {
    setInputText(question);
    toast({
      title: "Sample Question Selected",
      description: `Question loaded: "${question}"`,
    });
  };

  const handleVoiceSpeedChange = (value: number[]) => {
    const newSpeed = value[0];
    setVoiceSpeed(newSpeed);
    
    // Update speech synthesis rate
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices().forEach(voice => {
        const utterance = new SpeechSynthesisUtterance();
        utterance.rate = newSpeed;
      });
    }
    
    toast({
      title: "Voice Speed Updated",
      description: `Voice speed set to ${newSpeed.toFixed(1)}x`,
    });
  };
  
  useEffect(() => {
    // Ensure voice speed is applied when voices are loaded
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          // Voices loaded, can apply speed
          const utterance = new SpeechSynthesisUtterance();
          utterance.rate = voiceSpeed;
        }
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, [voiceSpeed]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-2">
                <School className="h-8 w-8" />
                <h1 className="heading text-3xl md:text-4xl font-bold">
                  Academic AI Assistant
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-6">
                Your personal AI-powered learning companion for college, higher education, and competitive exams. Ask questions, get expert guidance, and access curated resources.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Volume2 className="mr-2 h-5 w-5" />
                  Voice Enabled
                </Button>
                <VoiceControl onVoiceInput={handleVoiceInput} />
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                  <span className="text-sm">Speed:</span>
                  <div className="w-32">
                    <Slider
                      value={[voiceSpeed]}
                      min={0.5}
                      max={2}
                      step={0.1}
                      onValueChange={handleVoiceSpeedChange}
                    />
                  </div>
                  <span className="text-sm font-medium">{voiceSpeed.toFixed(1)}x</span>
                </div>
              </div>
              <p className="text-sm text-white/80 mt-2">
                Try saying "How to prepare for GATE?" or "Explain research methodology"
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="tutor" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2">
                <TabsTrigger value="tutor" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>AI Tutor</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span>Learning Resources</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tutor" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <AIChatbot initialInput={inputText} />
                  </div>
                  
                  <div className="space-y-8">
                    {/* Subject Selection */}
                    <div className="bg-white p-6 rounded-lg border border-border/40">
                      <h3 className="heading text-lg mb-4">
                        Select Subject
                        {selectedSubject && <span className="ml-2 text-sm text-primary">(Current: {selectedSubject})</span>}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {subjects.map((subject, index) => (
                          <Button 
                            key={index} 
                            variant={selectedSubject === subject ? "default" : "outline"} 
                            className="justify-start"
                            onClick={() => handleSubjectSelect(subject)}
                          >
                            {subject}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sample Questions */}
                    <div className="bg-white p-6 rounded-lg border border-border/40">
                      <h3 className="heading text-lg mb-4">Try Asking</h3>
                      <div className="space-y-2">
                        {sampleQuestions.map((question, index) => (
                          <Button 
                            key={index} 
                            variant="ghost" 
                            className="w-full justify-start text-left normal-case font-normal"
                            onClick={() => handleSampleQuestionClick(question)}
                          >
                            "{question}"
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Voice Interaction Tips */}
                    <div className="bg-slate-50 p-6 rounded-lg border border-border/40">
                      <h3 className="heading text-lg mb-4">Voice Interaction Tips</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Click the microphone icon to start speaking</span>
                        </li>
                        <li className="flex gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Use academic terminology for better results</span>
                        </li>
                        <li className="flex gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Click any AI message to have it read aloud again</span>
                        </li>
                        <li className="flex gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Adjust voice speed for comfortable listening</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Course Recommendations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <School className="h-5 w-5" />
                          Recommended Courses
                        </CardTitle>
                        <CardDescription>Focused on higher education and professional advancement</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {courseRecommendations.map((course, index) => (
                            <Card key={index} className="overflow-hidden">
                              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
                                <h4 className="font-medium text-base">{course.title}</h4>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline">{course.level}</Badge>
                                  <Badge variant="secondary">{course.type}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                                <div className="mt-3 flex justify-between items-center">
                                  <span className="font-bold text-primary">₹{course.price}</span>
                                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Youtube className="h-4 w-4" />
                                    Free Preview
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* YouTube Videos */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Youtube className="h-5 w-5" />
                          Free Educational Videos
                        </CardTitle>
                        <CardDescription>Quality academic content from top institutions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {youtubeVideos.map((video, index) => (
                            <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                              <div className="h-20 w-32 bg-slate-200 rounded flex-shrink-0 overflow-hidden">
                                <img 
                                  src={video.thumbnail} 
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-base">{video.title}</h4>
                                <p className="text-sm text-muted-foreground">{video.channel}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs text-muted-foreground">{video.views} views</span>
                                  <Button variant="link" size="sm" className="p-0 h-auto flex items-center gap-1">
                                    Watch Now
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                                      <path d="M5 12h14"></path>
                                      <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Higher Education Exams */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Popular Exams</CardTitle>
                        <CardDescription>Major competitive exams for higher education</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { name: 'GATE', type: 'Engineering PG Entrance' },
                            { name: 'CAT', type: 'Management Entrance' },
                            { name: 'UGC NET', type: 'Research & Teaching' },
                            { name: 'UPSC Civil Services', type: 'Government Services' },
                            { name: 'GRE', type: 'International PG Entrance' },
                            { name: 'GMAT', type: 'Business School Entrance' },
                          ].map((exam, index) => (
                            <div key={index} className="flex justify-between items-center p-2 border-b border-border/40 last:border-0">
                              <div>
                                <h5 className="font-medium">{exam.name}</h5>
                                <p className="text-xs text-muted-foreground">{exam.type}</p>
                              </div>
                              <Button variant="ghost" size="sm">Learn More</Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Current Education Trends */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Higher Education Trends</CardTitle>
                        <CardDescription>Latest developments in academia</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-2 border-l-2 border-primary">
                            <h5 className="font-medium">National Education Policy 2020</h5>
                            <p className="text-sm text-muted-foreground">Multi-disciplinary education with flexibility in course choices</p>
                          </div>
                          <div className="p-2 border-l-2 border-primary">
                            <h5 className="font-medium">Digital Transformation</h5>
                            <p className="text-sm text-muted-foreground">Online degrees and digital certification platforms</p>
                          </div>
                          <div className="p-2 border-l-2 border-primary">
                            <h5 className="font-medium">Industry-Academia Collaboration</h5>
                            <p className="text-sm text-muted-foreground">Practical training and research partnerships</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Quick Help */}
                    <Card className="bg-primary/5">
                      <CardHeader>
                        <CardTitle>Need Personalized Help?</CardTitle>
                        <CardDescription>Ask our AI tutor for guidance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">Get expert assistance for your academic queries, research needs, and exam preparation</p>
                        <Button 
                          onClick={() => setActiveTab('tutor')}
                          className="w-full"
                        >
                          Switch to AI Tutor
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Simple Badge component for course tags
const Badge = ({ children, variant = 'default' }) => {
  const variantClasses = {
    default: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    outline: "border border-border text-muted-foreground",
  };
  
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default AITutor;
