
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

// Dummy course data
const allCourses = [
  {
    id: "1",
    title: "Mathematics for JEE Advanced",
    description: "Comprehensive mathematics course covering all topics for JEE Advanced examination.",
    instructor: "Prof. Ravi Kumar",
    rating: 4.8,
    students: 3240,
    level: "Advanced",
    duration: "60 hours",
    category: "Mathematics",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&h=300&auto=format&fit=crop",
    price: 2999,
    tags: ["JEE", "Mathematics", "Advanced"]
  },
  {
    id: "2",
    title: "Physics for NEET",
    description: "Complete physics preparation for NEET with practice questions and video lectures.",
    instructor: "Dr. Anjali Patel",
    rating: 4.7,
    students: 2850,
    level: "Intermediate",
    duration: "48 hours",
    category: "Physics",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=400&h=300&auto=format&fit=crop",
    price: 2499,
    tags: ["NEET", "Physics", "Medical"]
  },
  {
    id: "3",
    title: "Complete UPSC CSE Preparation",
    description: "Structured curriculum covering all subjects for UPSC Civil Services Examination.",
    instructor: "Rajesh Sharma, IAS",
    rating: 4.9,
    students: 5200,
    level: "Advanced",
    duration: "120 hours",
    category: "UPSC",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&h=300&auto=format&fit=crop",
    price: 8999,
    tags: ["UPSC", "IAS", "Civil Services"]
  },
  {
    id: "4",
    title: "Computer Science for Class 12 CBSE",
    description: "Complete course covering CBSE Class 12 Computer Science syllabus with Python programming.",
    instructor: "Priya Verma",
    rating: 4.6,
    students: 1850,
    level: "Intermediate",
    duration: "35 hours",
    category: "Computer Science",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400&h=300&auto=format&fit=crop",
    price: 1499,
    tags: ["CBSE", "Class 12", "Programming"]
  },
  {
    id: "5",
    title: "Organic Chemistry for IIT-JEE",
    description: "In-depth organic chemistry course with focus on JEE Advanced problems.",
    instructor: "Dr. Suresh Menon",
    rating: 4.7,
    students: 2100,
    level: "Advanced",
    duration: "42 hours",
    category: "Chemistry",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=400&h=300&auto=format&fit=crop",
    price: 2799,
    tags: ["JEE", "Chemistry", "Organic"]
  },
  {
    id: "6",
    title: "Biology for NEET and Medical Entrance",
    description: "Comprehensive biology preparation covering botany and zoology for medical entrance exams.",
    instructor: "Dr. Meera Krishnan",
    rating: 4.8,
    students: 3100,
    level: "Intermediate",
    duration: "55 hours",
    category: "Biology",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=400&h=300&auto=format&fit=crop",
    price: 2699,
    tags: ["NEET", "Biology", "Medical"]
  },
  {
    id: "7",
    title: "English Literature for CBSE Class 10",
    description: "Detailed analysis of all prose and poetry in CBSE Class 10 English Literature syllabus.",
    instructor: "Aisha Khan",
    rating: 4.5,
    students: 1200,
    level: "Beginner",
    duration: "28 hours",
    category: "English",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&h=300&auto=format&fit=crop",
    price: 999,
    tags: ["CBSE", "Class 10", "English"]
  },
  {
    id: "8",
    title: "CAT Quantitative Aptitude",
    description: "Comprehensive course for Quantitative Aptitude section of CAT examination.",
    instructor: "Vikram Mehta, IIM-A",
    rating: 4.9,
    students: 4500,
    level: "Advanced",
    duration: "50 hours",
    category: "Management",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&h=300&auto=format&fit=crop",
    price: 3999,
    tags: ["CAT", "MBA", "Aptitude"]
  }
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [activeTab, setActiveTab] = useState('all');

  // Filter courses based on search term and active tab
  React.useEffect(() => {
    let result = allCourses;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by category tab
    if (activeTab !== 'all') {
      result = result.filter(course => course.category.toLowerCase() === activeTab.toLowerCase());
    }
    
    setFilteredCourses(result);
  }, [searchTerm, activeTab]);

  // Get unique categories for tabs
  const categories = ['all', ...Array.from(new Set(allCourses.map(course => course.category.toLowerCase())))];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="heading text-4xl font-bold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Discover courses tailored for the Indian education system, from school subjects to entrance exam preparation.
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for courses, topics, or exams..."
                className="pl-10 bg-white/90 text-slate-800 border-0 focus-visible:ring-2 focus-visible:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Courses Content */}
      <section className="py-12 bg-slate-50 flex-grow">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="bg-white shadow-sm">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {/* Results Statistics */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">
              Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border rounded px-2 py-1">
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {course.category}
                      </Badge>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="ml-1 text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{course.description}</p>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <span className="mr-3">{course.instructor}</span>
                      <span>{course.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-lg">₹{course.price.toLocaleString()}</div>
                      <Link to={`/course/${course.id}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 text-4xl">🔍</div>
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any courses matching your search criteria.
              </p>
              <Button onClick={() => {setSearchTerm(''); setActiveTab('all');}}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Courses;
