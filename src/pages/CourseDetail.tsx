import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Book, CheckCircle, Clock, Globe, PlayCircle, User } from 'lucide-react';

// Dummy course data (would typically come from an API)
const courses = [
  {
    id: "1",
    title: "Mathematics for JEE Advanced",
    description: "Comprehensive mathematics course covering all topics for JEE Advanced examination. This course is designed by expert IIT professors and includes thousands of practice problems, mock tests, and detailed video explanations for each concept. The course follows the latest JEE Advanced syllabus and focuses on building strong problem-solving skills needed for the examination.",
    instructor: {
      name: "Prof. Ravi Kumar",
      bio: "PhD in Mathematics from IIT Delhi with 15+ years of teaching experience. Has mentored over 500 students who successfully cleared JEE Advanced.",
      image: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    rating: 4.8,
    reviews: 324,
    students: 3240,
    level: "Advanced",
    duration: "60 hours",
    language: "Hindi, English",
    category: "Mathematics",
    lastUpdated: "April 2024",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    price: 2999,
    tags: ["JEE", "Mathematics", "Advanced"],
    includes: [
      "60 hours on-demand video",
      "150 downloadable resources",
      "30 practice tests",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion"
    ],
    modules: [
      {
        title: "Algebra Fundamentals",
        lessons: [
          { title: "Complex Numbers", duration: "45 min" },
          { title: "Quadratic Equations", duration: "50 min" },
          { title: "Progressions and Series", duration: "60 min" },
          { title: "Binomial Theorem", duration: "55 min" },
          { title: "Permutations and Combinations", duration: "70 min" }
        ]
      },
      {
        title: "Calculus",
        lessons: [
          { title: "Functions and Limits", duration: "65 min" },
          { title: "Differentiation Techniques", duration: "80 min" },
          { title: "Applications of Derivatives", duration: "75 min" },
          { title: "Integration Methods", duration: "90 min" },
          { title: "Definite Integrals", duration: "60 min" }
        ]
      },
      {
        title: "Coordinate Geometry",
        lessons: [
          { title: "Straight Lines", duration: "45 min" },
          { title: "Circles", duration: "50 min" },
          { title: "Parabola", duration: "55 min" },
          { title: "Ellipse", duration: "60 min" },
          { title: "Hyperbola", duration: "50 min" }
        ]
      },
      {
        title: "Vectors and 3D Geometry",
        lessons: [
          { title: "Vectors Basics", duration: "40 min" },
          { title: "Dot and Cross Products", duration: "55 min" },
          { title: "Planes in 3D Space", duration: "60 min" },
          { title: "Lines in 3D Space", duration: "50 min" },
          { title: "Shortest Distance Problems", duration: "65 min" }
        ]
      }
    ],
    features: [
      "Step-by-step video lectures",
      "Detailed PDF notes for each topic",
      "10,000+ practice problems with solutions",
      "20 full-length mock tests",
      "Doubt clearing sessions",
      "Performance analytics dashboard",
      "Mobile app access"
    ]
  },
  {
    id: "2",
    title: "Physics for NEET",
    description: "Complete physics preparation for NEET with practice questions and video lectures.",
    instructor: {
      name: "Dr. Anjali Patel",
      bio: "PhD in Physics from AIIMS Delhi with 12+ years of teaching experience. Specializes in making complex physics concepts easy to understand.",
      image: "https://randomuser.me/api/portraits/women/55.jpg"
    },
    rating: 4.7,
    reviews: 285,
    students: 2850,
    level: "Intermediate",
    duration: "48 hours",
    language: "Hindi, English",
    category: "Physics",
    lastUpdated: "March 2024",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=800&auto=format&fit=crop",
    price: 2499,
    tags: ["NEET", "Physics", "Medical"],
    includes: [
      "48 hours on-demand video",
      "120 downloadable resources",
      "25 practice tests",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion"
    ],
    modules: [
      {
        title: "Mechanics",
        lessons: [
          { title: "Kinematics", duration: "40 min" },
          { title: "Laws of Motion", duration: "45 min" },
          { title: "Work, Energy, and Power", duration: "50 min" },
          { title: "Rotational Motion", duration: "55 min" },
          { title: "Gravitation", duration: "60 min" }
        ]
      },
      {
        title: "Thermodynamics",
        lessons: [
          { title: "Heat and Temperature", duration: "45 min" },
          { title: "Thermodynamic Processes", duration: "50 min" },
          { title: "Heat Engines and Refrigerators", duration: "55 min" },
          { title: "Kinetic Theory of Gases", duration: "60 min" }
        ]
      },
      {
        title: "Optics",
        lessons: [
          { title: "Reflection and Refraction", duration: "40 min" },
          { title: "Lenses and Optical Instruments", duration: "45 min" },
          { title: "Wave Optics", duration: "50 min" },
          { title: "Interference and Diffraction", duration: "55 min" }
        ]
      },
      {
        title: "Electromagnetism",
        lessons: [
          { title: "Electric Charges and Fields", duration: "45 min" },
          { title: "Electric Potential and Capacitance", duration: "50 min" },
          { title: "Current Electricity", duration: "55 min" },
          { title: "Magnetic Effects of Current", duration: "60 min" },
          { title: "Electromagnetic Induction", duration: "55 min" }
        ]
      }
    ],
    features: [
      "Step-by-step video lectures",
      "Detailed PDF notes for each topic",
      "8,000+ practice problems with solutions",
      "15 full-length mock tests",
      "Doubt clearing sessions",
      "Performance analytics dashboard",
      "Mobile app access"
    ]
  },
  {
    id: "3",
    title: "Complete UPSC CSE Preparation",
    description: "Structured curriculum covering all subjects for UPSC Civil Services Examination.",
    instructor: {
      name: "Rajesh Sharma, IAS",
      bio: "Retired IAS officer with 25+ years of experience in civil services. Expert in guiding students for UPSC CSE.",
      image: "https://randomuser.me/api/portraits/men/68.jpg"
    },
    rating: 4.9,
    reviews: 520,
    students: 5200,
    level: "Advanced",
    duration: "120 hours",
    language: "Hindi, English",
    category: "UPSC",
    lastUpdated: "May 2024",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    price: 8999,
    tags: ["UPSC", "IAS", "Civil Services"],
    includes: [
      "120 hours on-demand video",
      "300 downloadable resources",
      "50 practice tests",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion"
    ],
    modules: [
      {
        title: "Indian Polity",
        lessons: [
          { title: "Constitutional Framework", duration: "60 min" },
          { title: "Parliamentary System", duration: "70 min" },
          { title: "Fundamental Rights", duration: "65 min" },
          { title: "Directive Principles", duration: "55 min" },
          { title: "Union and State Governments", duration: "75 min" }
        ]
      },
      {
        title: "Indian Economy",
        lessons: [
          { title: "Economic Planning", duration: "65 min" },
          { title: "Fiscal Policy", duration: "70 min" },
          { title: "Monetary Policy", duration: "60 min" },
          { title: "Inflation and Unemployment", duration: "55 min" },
          { title: "External Sector", duration: "75 min" }
        ]
      },
      {
        title: "History",
        lessons: [
          { title: "Ancient History", duration: "60 min" },
          { title: "Medieval History", duration: "70 min" },
          { title: "Modern History", duration: "65 min" },
          { title: "Indian National Movement", duration: "55 min" },
          { title: "Post-Independence India", duration: "75 min" }
        ]
      },
      {
        title: "Geography",
        lessons: [
          { title: "Physical Geography", duration: "65 min" },
          { title: "Indian Geography", duration: "70 min" },
          { title: "Economic Geography", duration: "60 min" },
          { title: "Human Geography", duration: "55 min" },
          { title: "Environmental Geography", duration: "75 min" }
        ]
      }
    ],
    features: [
      "Step-by-step video lectures",
      "Detailed PDF notes for each topic",
      "20,000+ practice problems with solutions",
      "30 full-length mock tests",
      "Doubt clearing sessions",
      "Performance analytics dashboard",
      "Mobile app access"
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the course by ID
  const course = courses.find(c => c.id === id);
  
  // If course not found, show error
  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/courses">
              <Button>Browse All Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Calculate total lessons and duration
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const totalDuration = course.modules.reduce((acc, module) => {
    return acc + module.lessons.reduce((lessonAcc, lesson) => {
      const minutes = parseInt(lesson.duration.split(' ')[0]);
      return lessonAcc + minutes;
    }, 0);
  }, 0);
  
  // Format total duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Course Header */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
              <Badge className="mb-4 bg-white/20 text-white border-white/10">{course.category}</Badge>
              <h1 className="heading text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-white/90 mb-6 max-w-2xl">
                {course.description.split('.')[0] + '.'}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span>{course.rating} ({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  <span>{course.language}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">Created by</p>
                  <p className="text-white/90">{course.instructor.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <p className="text-white/80 text-sm">Last updated: {course.lastUpdated}</p>
              </div>
            </div>
            
            {/* Course Card (Desktop) */}
            <div className="hidden md:block w-80 lg:w-96">
              <Card className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold">₹{course.price.toLocaleString()}</span>
                  </div>
                  
                  <Button className="w-full mb-4">Enroll Now</Button>
                  <Button variant="outline" className="w-full mb-6">Add to Cart</Button>
                  
                  <div className="space-y-4">
                    <p className="font-medium">This course includes:</p>
                    <ul className="space-y-2">
                      {course.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile Course Card */}
      <div className="md:hidden bg-background p-4 sticky top-0 z-20 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">₹{course.price.toLocaleString()}</span>
          </div>
          <Button>Enroll Now</Button>
        </div>
      </div>
      
      {/* Course Content */}
      <section className="py-12 bg-background flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow lg:max-w-[65%]">
              {/* Course Tabs */}
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="pt-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                      <p className="text-muted-foreground whitespace-pre-line mb-4">
                        {course.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4 flex items-center">
                            <div className="bg-primary/10 rounded-full p-2 mr-4">
                              <Book className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total Lessons</p>
                              <p className="font-medium">{totalLessons} lessons</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4 flex items-center">
                            <div className="bg-primary/10 rounded-full p-2 mr-4">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total Duration</p>
                              <p className="font-medium">{formatDuration(totalDuration)}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-xl font-bold mb-4">Required For This Course</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="bg-primary/10 w-1.5 h-1.5 rounded-full mr-2"></div>
                          <span>Basic understanding of mathematics</span>
                        </li>
                        <li className="flex items-center">
                          <div className="bg-primary/10 w-1.5 h-1.5 rounded-full mr-2"></div>
                          <span>Class 11 mathematics knowledge</span>
                        </li>
                        <li className="flex items-center">
                          <div className="bg-primary/10 w-1.5 h-1.5 rounded-full mr-2"></div>
                          <span>Commitment to regular practice</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-xl font-bold mb-4">Who This Course Is For</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <div className="bg-primary/10 w-1.5 h-1.5 rounded-full mr-2"></div>
                          <span>Students preparing for JEE Advanced examination</span>
                        </li>
                        <li className="flex items-center">
                          <div className="bg-primary/10 w-1.5 h-1.5 rounded-full mr-2"></div>
                          <span>Class 11 and 12 students focusing on competitive exams</span>
                        </li>
                        <li className="flex items-center">
                          <div className="bg-primary/10 w-1.5 h-1.5 rounded-full mr-2"></div>
                          <span>Anyone looking to strengthen their advanced mathematics skills</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Curriculum Tab */}
                <TabsContent value="curriculum" className="pt-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Course Curriculum</h2>
                    <p className="text-muted-foreground">
                      {totalLessons} lessons • {formatDuration(totalDuration)} total duration
                    </p>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {course.modules.map((module, index) => (
                      <AccordionItem key={index} value={`module-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div>
                            <h3 className="text-left font-medium">{module.title}</h3>
                            <p className="text-sm text-muted-foreground text-left">
                              {module.lessons.length} lessons • 
                              {formatDuration(module.lessons.reduce((acc, lesson) => acc + parseInt(lesson.duration), 0))}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-4">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-start justify-between">
                                <div className="flex items-start">
                                  <PlayCircle className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-muted-foreground text-sm">{lesson.duration}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                {/* Instructor Tab */}
                <TabsContent value="instructor" className="pt-6">
                  <div className="flex items-start gap-6 mb-8">
                    <img
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      className="w-20 h-20 rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{course.instructor.name}</h2>
                      <p className="text-primary mb-4">Course Instructor</p>
                      <p className="text-muted-foreground">{course.instructor.bio}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-3xl font-bold text-primary">15+</p>
                        <p className="text-muted-foreground">Years Teaching</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-3xl font-bold text-primary">500+</p>
                        <p className="text-muted-foreground">Students Mentored</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-3xl font-bold text-primary">8</p>
                        <p className="text-muted-foreground">Courses Created</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="pt-6">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2">{course.rating}</div>
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <svg key={star} className={`w-5 h-5 ${star <= Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <p className="text-muted-foreground text-sm">{course.reviews} reviews</p>
                      </div>
                      
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map(star => {
                          // Dummy percentages
                          const percentage = star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : star === 2 ? 1 : 1;
                          
                          return (
                            <div key={star} className="flex items-center mb-1">
                              <div className="flex items-center w-16">
                                <span>{star}</span>
                                <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              </div>
                              <div className="flex-1 h-2 mx-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{width: `${percentage}%`}}></div>
                              </div>
                              <span className="text-muted-foreground text-sm w-12">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Individual Reviews - This would typically be dynamically generated */}
                  <div className="space-y-6">
                    {[1, 2, 3].map(review => (
                      <div key={review} className="border-b pb-6">
                        <div className="flex items-center mb-4">
                          <img
                            src={`https://randomuser.me/api/portraits/${review % 2 === 0 ? 'women' : 'men'}/${review + 30}.jpg`}
                            alt="Reviewer"
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-medium">Student {review}</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map(star => (
                                <svg key={star} className={`w-4 h-4 ${star <= 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98
