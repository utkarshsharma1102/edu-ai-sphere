
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const AcademicDetails = () => {
  // Sample academic data
  const academicData = {
    currentSemester: 'Spring 2025',
    cgpa: 8.7,
    attendance: 92,
    examResults: [
      { subject: 'Artificial Intelligence', marks: 89, grade: 'A' },
      { subject: 'Data Structures', marks: 92, grade: 'A+' },
      { subject: 'Machine Learning', marks: 85, grade: 'A' },
      { subject: 'Computer Networks', marks: 78, grade: 'B+' },
    ],
    assignments: {
      completed: 15,
      pending: 3,
      total: 18
    },
    upcomingExams: [
      { subject: 'Natural Language Processing', date: 'May 15, 2025', time: '10:00 AM' },
      { subject: 'Cloud Computing', date: 'May 18, 2025', time: '2:00 PM' }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Overview</CardTitle>
          <CardDescription>Current semester: {academicData.currentSemester}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">CGPA</span>
              <span className="text-sm font-medium">{academicData.cgpa}/10</span>
            </div>
            <Progress value={academicData.cgpa * 10} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Attendance</span>
              <span className="text-sm font-medium">{academicData.attendance}%</span>
            </div>
            <Progress value={academicData.attendance} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Assignments</span>
              <span className="text-sm font-medium">{academicData.assignments.completed}/{academicData.assignments.total}</span>
            </div>
            <Progress 
              value={(academicData.assignments.completed / academicData.assignments.total) * 100} 
              className="h-2" 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Exam Results</CardTitle>
          <CardDescription>Recent performance in examinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {academicData.examResults.map((exam, index) => (
              <div key={index} className="flex justify-between items-center py-1 border-b last:border-0">
                <div>
                  <p className="font-medium text-sm">{exam.subject}</p>
                  <p className="text-xs text-muted-foreground">Marks: {exam.marks}/100</p>
                </div>
                <div className="bg-primary/10 px-2 py-1 rounded-full">
                  <span className="text-primary font-semibold">{exam.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
          <CardDescription>Prepare ahead of time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {academicData.upcomingExams.map((exam, index) => (
              <div key={index} className="border border-border/40 rounded-lg p-4">
                <h4 className="font-semibold">{exam.subject}</h4>
                <div className="mt-2 space-y-1">
                  <p className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{exam.date}</span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{exam.time}</span>
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="w-full">Study Notes</Button>
                  <Button size="sm" className="w-full">Practice Test</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicDetails;
