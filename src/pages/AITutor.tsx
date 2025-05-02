
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
  
  // Indian education system specific subjects
  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'History',
    'Geography',
    'English',
    'Hindi',
    'Economics',
    'Political Science',
    'Sociology',
  ];
  
  // Indian educational context questions
  const sampleQuestions = [
    'Explain the Pythagorean theorem for class 10 CBSE',
    'How can I prepare for JEE Advanced physics section?',
    'What are the key topics for NEET Biology?',
    'Explain Panchayati Raj system for UPSC preparation',
    'How to solve integration problems for class 12?',
    'What is the difference between NCERT and State board curriculum?',
  ];

  // Course suggestions relevant to Indian education system
  const courseRecommendations = [
    {
      title: 'JEE Main & Advanced Full Preparation',
      level: 'Class 11-12',
      type: 'Engineering Entrance',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      description: 'Complete course covering Physics, Chemistry, Mathematics for JEE aspirants'
    },
    {
      title: 'NEET Complete Biology',
      level: 'Class 11-12',
      type: 'Medical Entrance',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      description: 'In-depth coverage of Botany and Zoology topics for NEET examination'
    },
    {
      title: 'UPSC Civil Services Foundation Course',
      level: 'Undergraduate+',
      type: 'Civil Services',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      description: 'Basic concepts and approach to civil services examination preparation'
    },
    {
      title: 'CBSE Class 10 Full Course',
      level: 'Class 10',
      type: 'School Board',
      videoUrl: 'https://www.youtube.com/watch?v=example4',
      description: 'Comprehensive coverage of all subjects for CBSE Class 10 board exams'
    },
  ];

  // Free learning video recommendations
  const youtubeVideos = [
    {
      title: 'Understanding Quantum Physics',
      channel: 'Physics Wallah',
      views: '1.2M',
      url: 'https://youtube.com/example1'
    },
    {
      title: 'Organic Chemistry Made Easy for NEET/JEE',
      channel: 'Unacademy JEE',
      views: '890K',
      url: 'https://youtube.com/example2'
    },
    {
      title: 'Ancient Indian History Complete Course',
      channel: 'Study IAS',
      views: '450K',
      url: 'https://youtube.com/example3'
    },
    {
      title: 'Mathematics Tricks for Competitive Exams',
      channel: 'Vedantu JEE',
      views: '2.1M',
      url: 'https://youtube.com/example4'
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
                  AI Educational Assistant
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-6">
                Your personal AI-powered learning companion for the Indian education system. Ask questions, get instant help, and access free resources.
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
                Try saying "Explain Vedic Mathematics" or "Help me prepare for NEET"
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
                          <span>Use keywords from your syllabus or textbook</span>
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
                        <CardDescription>Based on Indian education system and exam patterns</CardDescription>
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
                                <div className="mt-3 flex justify-end">
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
                        <CardDescription>Curated content from top Indian educators</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {youtubeVideos.map((video, index) => (
                            <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                              <div className="h-20 w-32 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
                                <Youtube className="h-8 w-8 text-muted-foreground" />
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
                    {/* Indian Education System Exams */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Popular Exams</CardTitle>
                        <CardDescription>Major competitive exams in India</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { name: 'JEE Main & Advanced', type: 'Engineering Entrance' },
                            { name: 'NEET', type: 'Medical Entrance' },
                            { name: 'UPSC Civil Services', type: 'Government Services' },
                            { name: 'CAT', type: 'Management Entrance' },
                            { name: 'GATE', type: 'Engineering PG Entrance' },
                            { name: 'CLAT', type: 'Law Entrance' },
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
                        <CardTitle>Education Trends</CardTitle>
                        <CardDescription>Updates in Indian education</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-2 border-l-2 border-primary">
                            <h5 className="font-medium">National Education Policy 2020</h5>
                            <p className="text-sm text-muted-foreground">Multi-disciplinary education with flexibility in course choices</p>
                          </div>
                          <div className="p-2 border-l-2 border-primary">
                            <h5 className="font-medium">Skill-Based Learning</h5>
                            <p className="text-sm text-muted-foreground">Focus on vocational courses and practical skills</p>
                          </div>
                          <div className="p-2 border-l-2 border-primary">
                            <h5 className="font-medium">Digital Education</h5>
                            <p className="text-sm text-muted-foreground">Online learning platforms and digital resources</p>
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
                        <p className="text-sm mb-4">Get custom assistance for your specific educational needs and exam preparation</p>
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
