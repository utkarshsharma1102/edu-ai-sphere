
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Sample course data - would be fetched from an API in a real application
const coursesData = [
  {
    id: 1,
    title: 'Introduction to Artificial Intelligence',
    description: 'Learn the fundamentals of AI, machine learning, and neural networks.',
    detailedDescription: 'This comprehensive course covers the core concepts of modern artificial intelligence, from basic algorithms to neural networks and deep learning. You\'ll learn about supervised and unsupervised learning, reinforcement learning, and how to build your own AI models.',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Dr. Sarah Johnson',
    enrolledStudents: 1245,
    rating: 4.8,
    category: 'Computer Science',
    price: 49.99,
    language: 'English',
    lastUpdated: 'March 2025',
    image: 'https://images.unsplash.com/photo-1677442135436-78bfa2a16f93?q=80&w=2232&auto=format&fit=crop',
    topics: [
      'Introduction to AI Concepts',
      'Machine Learning Fundamentals',
      'Neural Networks Architecture',
      'Deep Learning Models',
      'Natural Language Processing',
      'Computer Vision',
      'Reinforcement Learning',
      'Ethics in AI',
    ],
    requirements: [
      'Basic programming knowledge (preferably Python)',
      'Understanding of algebra and statistics',
      'No prior AI knowledge required'
    ],
    whatYouWillLearn: [
      'Build and train machine learning models',
      'Implement neural networks from scratch',
      'Apply AI to solve real-world problems',
      'Understand key AI algorithms and their applications',
      'Evaluate and improve AI model performance'
    ]
  },
  {
    id: 2,
    title: 'Advanced Calculus',
    description: 'Explore the depths of multivariable calculus, differentiation and integration.',
    detailedDescription: 'Dive deep into the world of advanced calculus with this comprehensive course covering multivariable calculus, vector analysis, and differential equations. Master techniques for solving complex mathematical problems and understand the theoretical foundations of calculus.',
    level: 'Advanced',
    duration: '12 weeks',
    instructor: 'Prof. Michael Chen',
    enrolledStudents: 892,
    rating: 4.7,
    category: 'Mathematics',
    price: 59.99,
    language: 'English',
    lastUpdated: 'January 2025',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    topics: [
      'Limits and Continuity',
      'Differentiation Techniques',
      'Integration Methods',
      'Multivariable Calculus',
      'Vector Calculus',
      'Differential Equations',
      'Series and Convergence',
      'Applications in Physics'
    ],
    requirements: [
      'Strong foundation in basic calculus',
      'Knowledge of linear algebra',
      'Understanding of differential equations'
    ],
    whatYouWillLearn: [
      'Solve complex integration problems',
      'Apply vector calculus in physical scenarios',
      'Understand theoretical foundations of advanced calculus',
      'Master techniques for differential equations',
      'Apply calculus to real-world engineering problems'
    ]
  },
  {
    id: 3,
    title: 'Quantum Physics Principles',
    description: 'Understand the fundamental principles of quantum mechanics and their applications.',
    detailedDescription: 'Explore the fascinating world of quantum physics, from wave-particle duality to quantum entanglement. This course covers the mathematical formulation of quantum mechanics, its experimental foundations, and modern applications in computing and technology.',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Dr. Emily Brooks',
    enrolledStudents: 765,
    rating: 4.9,
    category: 'Physics',
    price: 69.99,
    language: 'English',
    lastUpdated: 'February 2025',
    image: 'https://images.unsplash.com/photo-1636466497217-06a7767eadb7?q=80&w=1974&auto=format&fit=crop',
    topics: [
      'Wave-Particle Duality',
      'Quantum Superposition',
      'Schrödinger Equation',
      'Quantum Entanglement',
      'Measurement Theory',
      'Quantum Computing Basics',
      'Quantum Field Theory Introduction',
      'Applications in Modern Technology'
    ],
    requirements: [
      'Understanding of classical physics',
      'Knowledge of differential equations',
      'Basic linear algebra concepts'
    ],
    whatYouWillLearn: [
      'Understand core quantum mechanical principles',
      'Solve basic quantum physics problems',
      'Explain quantum phenomena mathematically',
      'Connect quantum theory to modern applications',
      'Appreciate the philosophical implications of quantum mechanics'
    ]
  },
  {
    id: 4,
    title: 'Modern World History',
    description: 'A comprehensive look at global events and developments from the 18th century to present day.',
    detailedDescription: 'Journey through the major events that shaped our modern world, from the Industrial Revolution to the Digital Age. This course examines political movements, cultural transformations, technological advances, and the interconnected nature of global history.',
    level: 'Beginner',
    duration: '6 weeks',
    instructor: 'Prof. David Williams',
    enrolledStudents: 1432,
    rating: 4.6,
    category: 'History',
    price: 39.99,
    language: 'English',
    lastUpdated: 'April 2025',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2074&auto=format&fit=crop',
    topics: [
      'The Age of Revolution',
      'Imperialism and Colonialism',
      'World Wars and Global Conflict',
      'Cold War Era',
      'Decolonization and Independence Movements',
      'Globalization and Technology',
      'Contemporary Global Issues',
      'Cultural and Social Transformations'
    ],
    requirements: [
      'No prior knowledge required',
      'Interest in historical events and global politics',
      'Basic reading and analytical skills'
    ],
    whatYouWillLearn: [
      'Understand major historical movements of the modern era',
      'Analyze the causes and effects of pivotal world events',
      'Recognize patterns in global historical developments',
      'Connect historical events to contemporary issues',
      'Develop critical thinking about historical narratives'
    ]
  },
  {
    id: 5,
    title: 'Data Science Fundamentals',
    description: 'Learn to analyze, visualize, and interpret complex data sets using modern tools.',
    detailedDescription: 'Master the essential skills of data science, from data cleaning and visualization to statistical analysis and machine learning. This course provides hands-on experience with real-world datasets using popular tools like Python, Pandas, and scikit-learn.',
    level: 'Intermediate',
    duration: '9 weeks',
    instructor: 'Dr. Alex Martinez',
    enrolledStudents: 1876,
    rating: 4.9,
    category: 'Computer Science',
    price: 54.99,
    language: 'English',
    lastUpdated: 'March 2025',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
    topics: [
      'Data Collection and Preprocessing',
      'Exploratory Data Analysis',
      'Statistical Inference',
      'Machine Learning Basics',
      'Data Visualization Techniques',
      'Predictive Modeling',
      'Big Data Technologies',
      'Ethical Considerations in Data Science'
    ],
    requirements: [
      'Basic programming experience (preferably Python)',
      'Understanding of algebra and statistics',
      'Familiarity with databases'
    ],
    whatYouWillLearn: [
      'Clean and preprocess raw data for analysis',
      'Create informative data visualizations',
      'Build predictive models using machine learning',
      'Extract actionable insights from complex datasets',
      'Apply statistical methods to validate findings'
    ]
  },
  {
    id: 6,
    title: 'Biochemistry Essentials',
    description: 'Understand the chemical processes within and related to living organisms.',
    detailedDescription: 'Explore the fascinating intersection of biology and chemistry in this comprehensive biochemistry course. Learn about the structure and function of biomolecules, metabolic pathways, enzyme kinetics, and the molecular basis of genetic information transfer.',
    level: 'Advanced',
    duration: '14 weeks',
    instructor: 'Prof. Lisa Thompson',
    enrolledStudents: 658,
    rating: 4.7,
    category: 'Biology',
    price: 64.99,
    language: 'English',
    lastUpdated: 'February 2025',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1080&auto=format&fit=crop',
    topics: [
      'Protein Structure and Function',
      'Enzyme Kinetics and Regulation',
      'Carbohydrate Metabolism',
      'Lipid Biochemistry',
      'Nucleic Acid Structure',
      'Gene Expression and Regulation',
      'Metabolic Integration',
      'Molecular Techniques in Biochemistry'
    ],
    requirements: [
      'College-level biology and chemistry',
      'Understanding of organic chemistry principles',
      'Familiarity with cellular biology concepts'
    ],
    whatYouWillLearn: [
      'Explain the structure-function relationship of biomolecules',
      'Analyze metabolic pathways and their regulation',
      'Understand the molecular basis of genetic processes',
      'Apply biochemical principles to health and disease',
      'Interpret experimental data from biochemical techniques'
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const course = useMemo(() => {
    const courseId = parseInt(id || "0");
    return coursesData.find(c => c.id === courseId);
  }, [id]);
  
  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/courses')}>Return to Courses</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleEnroll = () => {
    toast({
      title: "Enrollment Successful",
      description: `You've enrolled in ${course.title}. Start learning now!`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative bg-cover bg-center py-24 text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${course.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-primary">{course.category}</Badge>
                <Badge variant="outline" className="border-white text-white">{course.level}</Badge>
                <div className="flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-400">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{course.rating} ({course.enrolledStudents.toLocaleString()} students)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Instructor: <strong>{course.instructor}</strong></span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  <span>Last updated: <strong>{course.lastUpdated}</strong></span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M12 20v-6M9 17l3-3 3 3M4 4v10M7 4l3 3 3-3M20 4v10M17 4l-3 3-3-3M4 14h16"></path>
                  </svg>
                  <span>Language: <strong>{course.language}</strong></span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="text-3xl font-bold">${course.price}</div>
                <Button onClick={handleEnroll} size="lg" className="bg-primary hover:bg-primary/90">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">About This Course</h3>
                      <p className="text-muted-foreground">{course.detailedDescription}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0 mt-1">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="16"></line>
                              <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold mb-4">Course Topics</h3>
                      <div className="space-y-4">
                        {course.topics.map((topic, index) => (
                          <Card key={index}>
                            <CardContent className="p-4 flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                                  {index + 1}
                                </div>
                                <div>{topic}</div>
                              </div>
                              <Button variant="ghost" size="sm">Preview</Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="instructor">
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className="h-32 w-32 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                          <p className="text-sm text-muted-foreground mb-3">Expert in {course.category}</p>
                          <p className="mb-4">
                            An experienced educator with a passion for teaching {course.category.toLowerCase()}. With years of experience in both academia and industry, {course.instructor.split(' ')[0]} brings practical insights and theoretical depth to this course.
                          </p>
                          <Button variant="outline" size="sm">View Profile</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div>
                <Card className="sticky top-6">
                  <CardContent className="p-6 space-y-6">
                    <h3 className="text-lg font-semibold">Course Includes</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M21 15V6m-4-3v18m-4-10v10M7 7v10M3 10v7"></path>
                        </svg>
                        <span>{course.duration} of on-demand video</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                        </svg>
                        <span>Comprehensive study materials</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" x2="16" y1="2" y2="6"></line>
                          <line x1="8" x2="8" y1="2" y2="6"></line>
                          <line x1="3" x2="21" y1="10" y2="10"></line>
                          <path d="m9 16 2 2 4-4"></path>
                        </svg>
                        <span>Self-paced learning schedule</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                        </svg>
                        <span>Interactive practice exercises</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8V3"></path>
                          <path d="M21 3v5h-5"></path>
                        </svg>
                        <span>Lifetime access</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                        </svg>
                        <span>Course completion certificate</span>
                      </li>
                    </ul>
                    
                    <div className="pt-4 border-t">
                      <Button onClick={handleEnroll} className="w-full">
                        Enroll Now - ${course.price}
                      </Button>
                      <div className="text-xs text-center mt-3 text-muted-foreground">
                        30-day money-back guarantee
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Courses - would normally be dynamically generated */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coursesData
                .filter(c => c.category === course.category && c.id !== course.id)
                .slice(0, 3)
                .map(relatedCourse => (
                  <Card key={relatedCourse.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedCourse.image} 
                        alt={relatedCourse.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{relatedCourse.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{relatedCourse.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-400">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span>{relatedCourse.rating}</span>
                        </div>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto font-normal"
                          onClick={() => navigate(`/course/${relatedCourse.id}`)}
                        >
                          View Course →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
