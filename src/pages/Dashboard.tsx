
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import VoiceControl from '@/components/VoiceControl';
import AcademicDetails from '@/components/AcademicDetails';

const Dashboard = () => {
  const courses = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      progress: 68,
      lastAccessed: '2 days ago',
      nextLesson: 'Neural Networks Fundamentals',
      quizAverage: 85,
    },
    {
      id: '2',
      title: 'Advanced Data Science with Python',
      progress: 42,
      lastAccessed: '1 week ago',
      nextLesson: 'Time Series Analysis',
      quizAverage: 78,
    },
    {
      id: '3',
      title: 'Physics for Everyday Life',
      progress: 12,
      lastAccessed: '3 weeks ago',
      nextLesson: 'Thermodynamics',
      quizAverage: 92,
    },
  ];

  const recentActivity = [
    {
      id: '1',
      activity: 'Completed Quiz',
      course: 'Introduction to Machine Learning',
      score: '85%',
      date: '1 day ago',
    },
    {
      id: '2',
      activity: 'Watched Lecture',
      course: 'Advanced Data Science with Python',
      duration: '45 mins',
      date: '2 days ago',
    },
    {
      id: '3',
      activity: 'Asked AI Tutor',
      question: 'How do neural networks work?',
      responses: 3,
      date: '3 days ago',
    },
    {
      id: '4',
      activity: 'Completed Assignment',
      course: 'Introduction to Machine Learning',
      score: '92%',
      date: '4 days ago',
    },
    {
      id: '5',
      activity: 'Started Course',
      course: 'Physics for Everyday Life',
      date: '1 week ago',
    },
  ];

  const studyTimeData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 2.0 },
    { day: 'Sun', hours: 1.5 },
  ];

  const quizScores = [
    { name: 'Quiz 1', score: 85 },
    { name: 'Quiz 2', score: 92 },
    { name: 'Quiz 3', score: 78 },
    { name: 'Quiz 4', score: 88 },
    { name: 'Quiz 5', score: 95 },
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      assignment: 'Neural Networks Project',
      course: 'Introduction to Machine Learning',
      due: 'Tomorrow, 11:59 PM',
      status: 'Not Started',
    },
    {
      id: '2',
      assignment: 'Data Visualization Assignment',
      course: 'Advanced Data Science with Python',
      due: 'May 5, 11:59 PM',
      status: 'In Progress',
    },
    {
      id: '3',
      assignment: 'Quiz: Forces and Motion',
      course: 'Physics for Everyday Life',
      due: 'May 7, 3:00 PM',
      status: 'Not Started',
    },
  ];

  // Handle voice commands for dashboard
  const handleVoiceInput = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Basic dashboard voice commands
    if (lowerText.includes("show courses") || lowerText.includes("view courses")) {
      window.location.href = "/courses";
    } else if (lowerText.includes("ai tutor") || lowerText.includes("open tutor")) {
      window.location.href = "/ai-tutor";
    } else if (lowerText.includes("voice agent") || lowerText.includes("clone agent")) {
      window.location.href = "/voice-clone-agent";
    } else if (lowerText.includes("show analytics") || lowerText.includes("analytics")) {
      // Could scroll to analytics section
      document.getElementById("analytics-section")?.scrollIntoView({ behavior: 'smooth' });
    } else if (lowerText.includes("show academic") || lowerText.includes("academics")) {
      document.getElementById("academic-section")?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-slate-50 py-8 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="heading text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Alex! Track your progress and manage your learning.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2 items-center">
              <Button>Resume Learning</Button>
              <Button variant="outline">My Schedule</Button>
              <div className="ml-2 relative group">
                <VoiceControl
                  onVoiceInput={handleVoiceInput}
                  variant="secondary"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-2 text-xs text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  Try: "Show courses" or "Open AI tutor"
                </div>
              </div>
            </div>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: 'Enrolled Courses',
                value: '5',
                description: '2 in progress',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                ),
              },
              {
                title: 'Quiz Score Average',
                value: '87%',
                description: '5% increase',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                    <path d="M2 20h20"></path>
                    <path d="M5 20v-4"></path>
                    <path d="M5 12v-2"></path>
                    <path d="M12 20v-8"></path>
                    <path d="M12 8V6"></path>
                    <path d="M19 20v-6"></path>
                    <path d="M19 10V4"></path>
                  </svg>
                ),
              },
              {
                title: 'Study Hours',
                value: '18.5',
                description: 'Last 7 days',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                ),
              },
              {
                title: 'AI Tutor Sessions',
                value: '12',
                description: 'This month',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                ),
              },
            ].map((card, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                      <p className="text-3xl font-bold mt-1 mb-1">{card.value}</p>
                      <p className="text-xs text-muted-foreground">{card.description}</p>
                    </div>
                    <div className="rounded-full bg-primary/10 p-2">
                      {card.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add Voice Assistant Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Voice Assistant</p>
                    <Link to="/voice-clone-agent">
                      <p className="text-3xl font-bold mt-1 mb-1 hover:text-primary transition-colors">Try Now</p>
                    </Link>
                    <p className="text-xs text-muted-foreground">Voice-first learning</p>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Academic Details Section */}
          <div className="mb-8" id="academic-section">
            <h2 className="heading text-2xl font-bold mb-4">Academic Details</h2>
            <AcademicDetails />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Progress */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Track your active courses and continue learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">Last accessed {course.lastAccessed}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{course.progress}%</div>
                          <p className="text-sm text-muted-foreground">Quiz Avg: {course.quizAverage}%</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span>Next: {course.nextLesson}</span>
                          <Button variant="link" className="p-0 h-auto">Continue</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Assignments and quizzes due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((item) => (
                    <div key={item.id} className="flex justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium text-sm">{item.assignment}</h4>
                        <p className="text-xs text-muted-foreground">{item.course}</p>
                        <div className="mt-1">
                          <span className="text-xs font-medium text-red-500">Due: {item.due}</span>
                        </div>
                      </div>
                      <div>
                        <Badge className={`${
                          item.status === 'In Progress' 
                            ? 'bg-secondary-light text-secondary' 
                            : 'bg-primary-light text-primary'
                        } text-xs px-2 py-0.5 rounded-full`}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8" id="analytics-section">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Your learning stats and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="study-time">
                  <TabsList>
                    <TabsTrigger value="study-time">Study Time</TabsTrigger>
                    <TabsTrigger value="quiz-scores">Quiz Scores</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="study-time" className="pt-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={studyTimeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="hours" stroke="#2563EB" fill="#DBEAFE" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="quiz-scores" className="pt-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={quizScores}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Area type="monotone" dataKey="score" stroke="#0EA5E9" fill="#E0F2FE" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Voice Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Voice Learning</CardTitle>
                <CardDescription>Track your voice interaction sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: '1',
                      activity: 'Voice Clone Session',
                      topic: 'Machine Learning Basics',
                      duration: '15 mins',
                      date: 'Yesterday'
                    },
                    {
                      id: '2',
                      activity: 'Voice Question',
                      topic: 'Neural Networks',
                      responses: 5,
                      date: '3 days ago'
                    },
                    {
                      id: '3',
                      activity: 'Voice Clone Training',
                      samples: 10,
                      date: '1 week ago'
                    }
                  ].map((activity) => (
                    <div key={activity.id} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm">{activity.activity}</h4>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                      {activity.topic && (
                        <p className="text-xs text-muted-foreground">{activity.topic}</p>
                      )}
                      {activity.duration && (
                        <p className="text-xs mt-1">Duration: {activity.duration}</p>
                      )}
                      {activity.responses && (
                        <p className="text-xs mt-1">Responses: {activity.responses}</p>
                      )}
                      {activity.samples && (
                        <p className="text-xs mt-1">Voice samples: {activity.samples}</p>
                      )}
                    </div>
                  ))}
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/voice-clone-agent">
                        Try Voice Clone Agent
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Plans - Updated to show prices in Rupees */}
          <div className="mt-8">
            <h2 className="heading text-2xl font-bold mb-4">Premium Learning Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Basic",
                  price: "₹499",
                  period: "/month",
                  description: "Perfect for beginners",
                  features: [
                    "Access to 10+ courses",
                    "Basic AI tutor support",
                    "Limited voice learning",
                    "Study materials",
                    "Community forum access"
                  ],
                  cta: "Start Basic"
                },
                {
                  title: "Pro",
                  price: "₹999",
                  period: "/month",
                  description: "Best value for money",
                  features: [
                    "Access to 50+ courses",
                    "Advanced AI tutor support",
                    "Full voice learning access",
                    "Study materials & notes",
                    "Community forum access",
                    "Practice tests with feedback"
                  ],
                  cta: "Upgrade to Pro",
                  popular: true
                },
                {
                  title: "Premium",
                  price: "₹1,999",
                  period: "/month",
                  description: "Ultimate learning experience",
                  features: [
                    "Access to all courses",
                    "Unlimited AI tutor support",
                    "Priority support",
                    "All study materials & notes",
                    "Community forum moderation",
                    "Practice tests with detailed feedback",
                    "Personalized learning path",
                    "1-on-1 mentoring sessions"
                  ],
                  cta: "Go Premium"
                }
              ].map((plan, index) => (
                <Card key={index} className={`relative overflow-hidden ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold transform translate-x-2 -translate-y-2 rotate-45 origin-bottom-left">
                      Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? '' : 'bg-secondary hover:bg-secondary/90'}`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const Badge = ({ className, children }: { className: string, children: React.ReactNode }) => {
  return (
    <span className={`inline-block text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Dashboard;
