
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export interface VoiceControlProps {
  speechRate: number;
  onSpeechRateChange: (newRate: number) => void;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ speechRate, onSpeechRateChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <Mic className="h-5 w-5 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">Voice Settings</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Speech Rate</span>
              <span className="text-sm font-medium">{speechRate.toFixed(1)}x</span>
            </div>
            <Slider
              value={[speechRate]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={(value) => onSpeechRateChange(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VoiceControl;
