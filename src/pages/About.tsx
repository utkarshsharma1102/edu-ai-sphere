
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="heading text-3xl md:text-4xl font-bold mb-4">
                About University AI
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Our mission is to revolutionize education through artificial intelligence and personalized learning experiences.
              </p>
            </div>
          </div>
        </section>
        
        {/* Vision & Mission */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading text-2xl md:text-3xl font-bold mb-8 text-center">Our Vision & Mission</h2>
              
              <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
                <h3 className="heading text-xl font-bold mb-4 text-primary">Vision</h3>
                <p className="text-gray-700 mb-6">
                  To create a world where quality education is accessible to everyone, regardless of their location, background, or circumstances. 
                  We envision a future where learning is personalized, engaging, and effective, empowering individuals to reach their full potential.
                </p>
                
                <h3 className="heading text-xl font-bold mb-4 text-primary">Mission</h3>
                <p className="text-gray-700">
                  University AI is committed to harnessing the power of artificial intelligence to deliver personalized learning experiences 
                  that adapt to each student's unique needs, learning style, and pace. We strive to make education more accessible, enjoyable, 
                  and effective through innovative technology solutions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading text-2xl md:text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-slate-200 flex items-center justify-center">
                  <svg className="w-24 h-24 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">Dr. Sarah Johnson</h3>
                  <p className="text-primary font-medium mb-3">Chief AI Officer</p>
                  <p className="text-gray-600">
                    With a PhD in Machine Learning, Sarah leads our AI research and development team, ensuring our platform delivers cutting-edge personalized learning experiences.
                  </p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-slate-200 flex items-center justify-center">
                  <svg className="w-24 h-24 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">Michael Chen</h3>
                  <p className="text-primary font-medium mb-3">Education Director</p>
                  <p className="text-gray-600">
                    With 15 years in educational technology, Michael ensures our platform meets the highest pedagogical standards and adapts to diverse learning needs.
                  </p>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-slate-200 flex items-center justify-center">
                  <svg className="w-24 h-24 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">Emily Rodriguez</h3>
                  <p className="text-primary font-medium mb-3">UX Design Lead</p>
                  <p className="text-gray-600">
                    Emily specializes in creating intuitive, accessible learning interfaces that make complex educational content engaging and easy to navigate for learners of all ages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Approach */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading text-2xl md:text-3xl font-bold mb-8 text-center">Our Approach to AI-Powered Education</h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow p-6 flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="heading text-lg font-bold mb-2">Personalized Learning Paths</h3>
                    <p className="text-gray-700">
                      Our AI analyzes learning patterns, strengths, and areas for improvement to create customized educational journeys for each student.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                      <path d="m9 16 2 2 4-4"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="heading text-lg font-bold mb-2">Real-Time Feedback</h3>
                    <p className="text-gray-700">
                      Students receive immediate, constructive feedback that helps them understand concepts better and correct misconceptions instantly.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <path d="M16 13H8"></path>
                      <path d="M16 17H8"></path>
                      <path d="M10 9H8"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="heading text-lg font-bold mb-2">Adaptive Content</h3>
                    <p className="text-gray-700">
                      Our platform dynamically adjusts content difficulty based on student performance, ensuring learners are always appropriately challenged.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="heading text-lg font-bold mb-2">24/7 AI Tutor Support</h3>
                    <p className="text-gray-700">
                      Our AI tutors are always available to answer questions, provide explanations, and guide students through difficult concepts at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to learn more about University AI?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              We're happy to answer any questions you have about our platform, approach, or the future of AI in education.
            </p>
            <button className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg font-medium">
              Contact Us
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
