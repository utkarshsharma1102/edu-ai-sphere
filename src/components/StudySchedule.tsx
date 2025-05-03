
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ScheduleSession {
  id: string;
  course: string;
  day: string;
  time: string;
  duration: string;
  status: string;
}

interface StudyScheduleProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudySchedule: React.FC<StudyScheduleProps> = ({ isOpen, onClose }) => {
  const scheduleSessions: ScheduleSession[] = [
    {
      id: '1',
      course: 'Introduction to Machine Learning',
      day: 'Monday',
      time: '10:00 AM',
      duration: '1 hour',
      status: 'Upcoming'
    },
    {
      id: '2',
      course: 'Advanced Data Science with Python',
      day: 'Wednesday',
      time: '2:00 PM',
      duration: '1.5 hours',
      status: 'Upcoming'
    },
    {
      id: '3',
      course: 'Physics for Everyday Life',
      day: 'Friday',
      time: '11:00 AM',
      duration: '1 hour',
      status: 'Upcoming'
    },
    {
      id: '4',
      course: 'Neural Networks Workshop',
      day: 'Saturday',
      time: '3:00 PM',
      duration: '2 hours',
      status: 'Upcoming'
    },
    {
      id: '5',
      course: 'AI Ethics Seminar',
      day: 'Thursday',
      time: '4:00 PM',
      duration: '1 hour',
      status: 'Optional'
    }
  ];

  const syncToCalendar = () => {
    toast({
      title: "Calendar Updated",
      description: "Your schedule has been synced with your calendar app",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>My Study Schedule</DialogTitle>
          <DialogDescription>
            Your upcoming classes and study sessions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleSessions.map(session => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.course}</TableCell>
                  <TableCell>{session.day}</TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell>{session.duration}</TableCell>
                  <TableCell>
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full 
                      ${session.status === 'Optional' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      }`}>
                      {session.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-between space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                toast({
                  title: "Adding new session",
                  description: "Feature coming soon!"
                });
              }}
            >
              Add Session
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button onClick={syncToCalendar}>
                Sync to Calendar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudySchedule;
