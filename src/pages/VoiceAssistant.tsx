
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VoiceControl from '@/components/VoiceControl';
import TextToSpeech from '@/components/TextToSpeech';
import { Mic, Volume2, Settings2, BookOpen, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [assistantResponse, setAssistantResponse] = useState("I'm your voice assistant. Try asking me a question or giving me a command.");
  const [speechRate, setSpeechRate] = useState(1.0);
  const navigate = useNavigate();

  const handleVoiceInput = (text: string) => {
    setCurrentCommand(text);
    
    // Process the command
    setTimeout(() => {
      processCommand(text);
    }, 500);
  };
  
  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('go to dashboard')) {
      setAssistantResponse("Navigating to dashboard...");
      setTimeout(() => navigate('/dashboard'), 1500);
    } 
    else if (lowerCommand.includes('courses') || lowerCommand.includes('show courses')) {
      setAssistantResponse("Navigating to courses...");
      setTimeout(() => navigate('/courses'), 1500);
    }
    else if (lowerCommand.includes('ai tutor') || lowerCommand.includes('tutor')) {
      setAssistantResponse("Opening AI Tutor...");
      setTimeout(() => navigate('/ai-tutor'), 1500);
    }
    else if (lowerCommand.includes('home')) {
      setAssistantResponse("Going to homepage...");
      setTimeout(() => navigate('/'), 1500);
    }
    else {
      setAssistantResponse("I understood your command: '" + command + "'. However, I'm not configured to respond to this request yet.");
    }
  };
  
  const handleSpeechRateChange = (newRate: number) => {
    setSpeechRate(newRate);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Voice Assistant</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main voice assistant card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Talk to Your Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 space-y-6">
                <div className="relative">
                  <div className={`w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center`}>
                    <Mic className="h-16 w-16 text-primary" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
                </div>
                
                <p className="text-center text-lg">
                  {currentCommand ? `"${currentCommand}"` : "Click the button below and speak a command"}
                </p>
                
                <div className="flex flex-col items-center space-y-4 w-full">
                  <VoiceControl onVoiceInput={handleVoiceInput} />
                  
                  <div className="bg-muted p-4 rounded-lg w-full">
                    <p className="font-medium mb-2">Assistant Response:</p>
                    <p>{assistantResponse}</p>
                    <div className="mt-4 flex justify-end">
                      <TextToSpeech text={assistantResponse} autoSpeak={true} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Voice commands and settings */}
          <Card>
            <CardHeader>
              <CardTitle>Voice Assistant Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="commands">
                <TabsList className="w-full">
                  <TabsTrigger value="commands">Commands</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="commands" className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Available Commands
                    </h3>
                    <ul className="space-y-2">
                      <li className="text-sm p-2 bg-muted rounded-md">"Go to dashboard"</li>
                      <li className="text-sm p-2 bg-muted rounded-md">"Show courses"</li>
                      <li className="text-sm p-2 bg-muted rounded-md">"Open AI tutor"</li>
                      <li className="text-sm p-2 bg-muted rounded-md">"Go to home"</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Tips
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Speak clearly and directly into the microphone. For best results,
                      use the exact commands listed above.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <Settings2 className="h-4 w-4 mr-2" />
                      Assistant Settings
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Speech Rate</label>
                        <div className="flex items-center gap-4">
                          <Volume2 className="h-4 w-4" />
                          <input 
                            type="range" 
                            min="0.5" 
                            max="2" 
                            step="0.1" 
                            value={speechRate}
                            onChange={(e) => handleSpeechRateChange(parseFloat(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">{speechRate}x</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Reset to Default Settings
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => navigate('/voice-clone-agent')}
                >
                  Try Voice Clone Agent
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VoiceAssistant;
