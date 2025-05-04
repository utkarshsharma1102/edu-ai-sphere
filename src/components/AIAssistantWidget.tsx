
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare } from 'lucide-react';

const AIAssistantWidget = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  // Load the script when the component mounts
  useEffect(() => {
    // Check if the script is already loaded
    if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const toggleWidget = () => {
    setIsWidgetVisible(!isWidgetVisible);
  };

  return (
    <div className="relative">
      {/* Widget Button */}
      <Button 
        onClick={toggleWidget}
        className={`${isWidgetVisible ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} 
                 rounded-full p-4 h-16 w-16 shadow-lg fixed bottom-6 right-6 z-50 transition-all duration-300`}
        aria-label="AI Assistant"
      >
        <MessageSquare className="h-7 w-7" />
      </Button>
      
      {/* Widget Container */}
      {isWidgetVisible && (
        <div className="fixed bottom-24 right-6 z-40 transition-all duration-300 animate-fade-in 
                     rounded-xl shadow-xl w-[350px] h-[600px] max-h-[80vh]">
          <Card className="h-full w-full overflow-hidden border-2 border-primary/20">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white font-semibold flex justify-between items-center">
              <span>University AI Assistant</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-white hover:text-white/80 hover:bg-white/10"
                onClick={toggleWidget}
              >
                ✕
              </Button>
            </div>
            <div className="h-full dark:bg-slate-900">
              <div 
                className="elevenlabs-convai w-full h-full" 
                data-agent-id="fB4D7yBHx11wB1zghlqa"
              ></div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIAssistantWidget;
