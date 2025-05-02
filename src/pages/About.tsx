
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Founder & AI Research Lead',
      bio: 'PhD in Machine Learning with 10+ years of experience in education technology.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Vikram Mehta',
      role: 'Educational Content Director',
      bio: 'Former professor with expertise in curriculum development for the Indian education system.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Aisha Patel',
      role: 'Voice Technology Specialist',
      bio: 'Speech recognition expert with a passion for making learning accessible to all.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Learning Experience Designer',
      bio: 'UX specialist focused on creating intuitive and engaging educational interfaces.',
      image: 'https://randomuser.me/api/portraits/men/62.jpg'
    }
  ];

  // Timeline data
  const timeline = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'University AI was founded with the vision to transform education in India through technology.'
    },
    {
      year: '2021',
      title: 'First AI Tutor',
      description: 'Launched our first version of the AI tutoring system specifically designed for Indian curricula.'
    },
    {
      year: '2022',
      title: 'Voice Technology',
      description: 'Integrated voice clone technology to create more natural and engaging learning experiences.'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded our course offerings to cover all major subjects in the Indian education system.'
    },
    {
      year: '2024',
      title: 'Recognition',
      description: 'Recognized as one of the top EdTech innovations in India by the Ministry of Education.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About University AI
            </h1>
            <p className="text-xl mb-6">
              We're on a mission to transform education in India by making quality learning accessible to everyone through artificial intelligence.
            </p>
            <p className="text-lg text-white/80">
              Founded in 2020, University AI combines cutting-edge technology with deep educational expertise to create personalized learning experiences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                At University AI, we believe that every student in India deserves access to high-quality education regardless of their location or economic background.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our platform is designed to bridge educational gaps by providing personalized AI tutoring, voice-based learning, and comprehensive courses aligned with Indian educational standards.
              </p>
              <p className="text-lg text-muted-foreground">
                We're committed to continuously improving our technology to make learning more engaging, effective, and accessible for students across India.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-8 rounded-xl">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/20 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Accessible Education</h3>
                    <p className="text-muted-foreground">Making quality education available to everyone regardless of geographical or financial constraints.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Personalized Learning</h3>
                    <p className="text-muted-foreground">Using AI to adapt to each student's unique learning style and pace.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/20 rounded-full p-2 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Indian Education Focus</h3>
                    <p className="text-muted-foreground">Content specifically designed for the Indian curriculum and examination patterns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Journey Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small startup to becoming a leading EdTech platform in India
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex mb-8 relative">
                <div className="mr-8 text-right min-w-[100px]">
                  <div className="text-2xl font-bold text-primary">{item.year}</div>
                </div>
                
                <div className="relative">
                  <div className="absolute top-2 -left-[41px] w-6 h-6 rounded-full border-4 border-primary bg-background"></div>
                  {index < timeline.length - 1 && (
                    <div className="absolute top-8 -left-[38px] w-0.5 h-[calc(100%+20px)] bg-primary/30"></div>
                  )}
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate experts behind University AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading text-3xl font-bold mb-4">
            Join Us in Transforming Education in India
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of our mission to make quality education accessible to every student in India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/sign-up">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
