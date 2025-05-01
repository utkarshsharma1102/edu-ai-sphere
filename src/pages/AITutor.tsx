
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import VoiceControl from '@/components/VoiceControl';

const AITutor = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  
  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'History',
    'Literature',
    'Economics',
  ];
  
  const sampleQuestions = [
    'Explain the concept of quantum entanglement',
    'How do I solve quadratic equations?',
    'What caused the French Revolution?',
    'Explain the process of photosynthesis',
    'What are data structures in programming?',
    'How does the human circulatory system work?',
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="heading text-3xl md:text-4xl font-bold mb-4">
                AI Educational Tutor
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Your personal AI-powered tutor that helps you understand any concept, solve problems, and excel in your studies.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                  Voice Mode
                </Button>
                <VoiceControl onVoiceInput={handleVoiceInput} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                      <Button key={index} variant="ghost" className="w-full justify-start text-left normal-case font-normal">
                        "{question}"
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Tips */}
                <div className="bg-slate-50 p-6 rounded-lg border border-border/40">
                  <h3 className="heading text-lg mb-4">Tips for Better Responses</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Be specific with your questions</span>
                    </li>
                    <li className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>If you need clarification, ask follow-up questions</span>
                    </li>
                    <li className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Request step-by-step explanations for complex problems</span>
                    </li>
                    <li className="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Tell the AI tutor about your knowledge level</span>
                    </li>
                  </ul>
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

export default AITutor;
