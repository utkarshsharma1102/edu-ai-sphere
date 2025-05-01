
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CourseCard, { CourseProps } from '@/components/CourseCard';
import AIChatbot from '@/components/AIChatbot';
import { Link } from 'react-router-dom';

// Sample course data
const featuredCourses: CourseProps[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning algorithms and applications',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWklMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D',
    category: 'Computer Science',
    level: 'beginner',
    duration: '6 weeks',
    instructor: 'Dr. Alex Wilson',
    rating: 4.8,
    enrolled: 3254,
  },
  {
    id: '2',
    title: 'Advanced Data Science with Python',
    description: 'Master data analysis, visualization, and machine learning with Python',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D',
    category: 'Data Science',
    level: 'advanced',
    duration: '8 weeks',
    instructor: 'Prof. Sarah Chen',
    rating: 4.9,
    enrolled: 2187,
  },
  {
    id: '3',
    title: 'Physics for Everyday Life',
    description: 'Understanding the physics principles that govern our daily experiences',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBoeXNpY3N8ZW58MHx8MHx8fDA%3D',
    category: 'Physics',
    level: 'intermediate',
    duration: '4 weeks',
    instructor: 'Dr. Michael Rivera',
    rating: 4.7,
    enrolled: 1856,
  },
];

const categories = [
  { name: 'Computer Science', icon: '💻', count: 42 },
  { name: 'Mathematics', icon: '🧮', count: 28 },
  { name: 'Physics', icon: '⚛️', count: 15 },
  { name: 'Chemistry', icon: '🧪', count: 19 },
  { name: 'Biology', icon: '🧬', count: 23 },
  { name: 'History', icon: '📜', count: 31 },
  { name: 'Literature', icon: '📚', count: 25 },
  { name: 'Art & Design', icon: '🎨', count: 18 },
];

const stats = [
  { value: '10K+', label: 'Students' },
  { value: '500+', label: 'Courses' },
  { value: '95%', label: 'Satisfaction' },
  { value: '24/7', label: 'AI Support' },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/30 blur-3xl"></div>
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h1 className="heading text-4xl md:text-6xl font-bold leading-tight">
                  Learn Anything with <span className="text-primary">AI-Powered</span> Education
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-xl">
                  University AI delivers personalized learning experiences for students of all ages powered by the latest advances in artificial intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="text-base">
                    <Link to="/courses">Explore Courses</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-base">
                    <Link to="/ai-tutor">Try AI Tutor</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl blur-xl"></div>
                <div className="relative bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-slate-700">
                    <h3 className="text-lg font-medium">AI Learning Assistant</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">AI</span>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3 text-sm">
                        Hello! I'm your AI learning assistant. What would you like to learn about today?
                      </div>
                    </div>
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-primary rounded-lg p-3 text-sm">
                        I'd like to understand quantum computing!
                      </div>
                      <div className="h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">You</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">AI</span>
                      </div>
                      <div className="bg-slate-700 rounded-lg p-3 text-sm">
                        Great choice! Quantum computing combines physics, mathematics, and computer science. Let's start with the basic concepts of qubits and superposition...
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-700 flex gap-2">
                    <Input placeholder="Ask anything..." className="bg-slate-700 border-slate-600" />
                    <Button size="sm">Send</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading text-3xl md:text-4xl mb-4">
                Reimagine Education with AI
              </h2>
              <p className="text-lg text-muted-foreground">
                Our platform combines cutting-edge AI technology with expert-designed curriculum to create a truly personalized learning experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Learning",
                  description: "Personalized learning paths adapted to your pace, style, and goals, powered by advanced machine learning.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary">
                      <path d="M12 2a8 8 0 0 0-8 8m8-8a8 8 0 0 1 8 8m-8-8v8h8"></path>
                      <rect width="8" height="8" x="4" y="12" rx="2"></rect>
                      <path d="M9 22h5"></path>
                      <path d="M12 16v6"></path>
                    </svg>
                  )
                },
                {
                  title: "Intelligent Tutoring",
                  description: "Get instant help from our AI tutors that understand your questions and provide clear, helpful explanations.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  )
                },
                {
                  title: "Voice Interaction",
                  description: "Learn hands-free with our voice assistant. Ask questions, get answers, and navigate content using just your voice.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-xl border border-border/40 shadow-sm flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-heading font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Courses */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="heading text-3xl md:text-4xl mb-2">
                  Featured Courses
                </h2>
                <p className="text-lg text-muted-foreground">
                  Explore our most popular and highly-rated courses
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link to="/courses">View All Courses</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading text-3xl md:text-4xl mb-4">
                Explore Categories
              </h2>
              <p className="text-lg text-muted-foreground">
                Browse our extensive collection of courses across various subjects
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={index} className="group">
                  <div className="bg-white border border-border/40 rounded-xl p-6 text-center transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-md">
                    <div className="text-4xl mb-3 group-hover:animate-bounce-small">{category.icon}</div>
                    <h3 className="font-heading font-medium text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} courses</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* AI Tutor Showcase */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="heading text-3xl md:text-4xl mb-4">
                  Your Personal AI Tutor
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Get instant answers to your questions, personalized explanations, and step-by-step guidance on any subject. Our AI tutor is available 24/7 to help you learn at your own pace.
                </p>
                <ul className="space-y-3">
                  {[
                    "Ask questions in natural language",
                    "Receive detailed, step-by-step explanations",
                    "Get personalized learning recommendations",
                    "Practice with AI-generated quizzes",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-3 text-primary">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button asChild size="lg">
                    <Link to="/ai-tutor">Try AI Tutor Now</Link>
                  </Button>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="bg-slate-50 rounded-xl p-6 border border-border/40 shadow-md">
                  <AIChatbot />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="heading text-3xl md:text-4xl mb-4">
                What Our Students Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from students who have transformed their learning experience with University AI
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "The AI tutor helped me understand calculus concepts that I had been struggling with for months. It's like having a personal teacher available 24/7.",
                  name: "Emma J.",
                  role: "Computer Science Student",
                  image: "https://i.pravatar.cc/100?img=1"
                },
                {
                  quote: "University AI's personalized learning system adapted perfectly to my learning style. I've improved my grades significantly since I started using the platform.",
                  name: "David R.",
                  role: "High School Student",
                  image: "https://i.pravatar.cc/100?img=3"
                },
                {
                  quote: "As a working professional, I needed flexible learning options. The voice assistant feature lets me learn during my commute, maximizing my time efficiency.",
                  name: "Michelle T.",
                  role: "Data Scientist",
                  image: "https://i.pravatar.cc/100?img=5"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-xl border border-border/40 shadow-sm">
                  <div className="flex items-center gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-lg mb-6">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="font-heading font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Learning Experience?
              </h2>
              <p className="text-xl mb-8 text-slate-100 max-w-2xl mx-auto">
                Join thousands of students who are learning faster and more effectively with our AI-powered educational platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="text-base">
                  <Link to="/sign-up">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-base bg-transparent border-white text-white hover:bg-white/10">
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
