
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Sample course data - in a real application, this would come from an API
const coursesData = [
  {
    id: 1,
    title: 'Introduction to Artificial Intelligence',
    description: 'Learn the fundamentals of AI, machine learning, and neural networks.',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Dr. Sarah Johnson',
    enrolledStudents: 1245,
    rating: 4.8,
    category: 'Computer Science',
    image: 'https://images.unsplash.com/photo-1677442135436-78bfa2a16f93?q=80&w=2232&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Advanced Calculus',
    description: 'Explore the depths of multivariable calculus, differentiation and integration.',
    level: 'Advanced',
    duration: '12 weeks',
    instructor: 'Prof. Michael Chen',
    enrolledStudents: 892,
    rating: 4.7,
    category: 'Mathematics',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Quantum Physics Principles',
    description: 'Understand the fundamental principles of quantum mechanics and their applications.',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Dr. Emily Brooks',
    enrolledStudents: 765,
    rating: 4.9,
    category: 'Physics',
    image: 'https://images.unsplash.com/photo-1636466497217-06a7767eadb7?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Modern World History',
    description: 'A comprehensive look at global events and developments from the 18th century to present day.',
    level: 'Beginner',
    duration: '6 weeks',
    instructor: 'Prof. David Williams',
    enrolledStudents: 1432,
    rating: 4.6,
    category: 'History',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Data Science Fundamentals',
    description: 'Learn to analyze, visualize, and interpret complex data sets using modern tools.',
    level: 'Intermediate',
    duration: '9 weeks',
    instructor: 'Dr. Alex Martinez',
    enrolledStudents: 1876,
    rating: 4.9,
    category: 'Computer Science',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Biochemistry Essentials',
    description: 'Understand the chemical processes within and related to living organisms.',
    level: 'Advanced',
    duration: '14 weeks',
    instructor: 'Prof. Lisa Thompson',
    enrolledStudents: 658,
    rating: 4.7,
    category: 'Biology',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1080&auto=format&fit=crop'
  }
];

const Courses = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleEnroll = (courseId: number) => {
    navigate(`/course/${courseId}`);
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
                Explore Our Courses
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Discover a wide range of courses taught by experts and powered by AI to enhance your learning experience.
              </p>
            </div>
          </div>
        </section>
        
        {/* Course Filters */}
        <section className="py-8 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
              <div className="flex-1 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">All Categories</Button>
                <Button variant="outline" size="sm">Computer Science</Button>
                <Button variant="outline" size="sm">Mathematics</Button>
                <Button variant="outline" size="sm">Physics</Button>
                <Button variant="outline" size="sm">More</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coursesData.map((course) => (
                <Card key={course.id} className="overflow-hidden h-full card-hover">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => navigate(`/course/${course.id}`)}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full">{course.category}</span>
                      <span className="flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-400">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {course.rating}
                      </span>
                    </div>
                    <h3 className="heading text-xl mb-2 cursor-pointer hover:text-primary" onClick={() => navigate(`/course/${course.id}`)}>
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">{course.description}</p>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm mb-4">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>{course.enrolledStudents.toLocaleString()} students</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Instructor:</span> <br />
                        <span className="font-medium">{course.instructor}</span>
                      </div>
                      <Button onClick={() => handleEnroll(course.id)}>View Course</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
