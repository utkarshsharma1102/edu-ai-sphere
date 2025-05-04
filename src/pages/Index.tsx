import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Book, Lightbulb, Headphones, LayoutDashboard, MessageSquare } from 'lucide-react';
import AIAssistantWidget from '@/components/AIAssistantWidget';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section with AI Assistant */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-3xl">
              <h1 className="heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">
                Transform Your Learning with AI
              </h1>
              <p className="text-xl text-white/90 mb-8">
                University AI combines personalized AI tutoring, voice clone technology,
                and structured courses to create an immersive educational experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/courses">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/ai-tutor">
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                    Try AI Tutor
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <AIAssistantWidget />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl md:text-4xl font-bold mb-4">
              How University AI Enhances Learning
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with expert teaching methodologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Personalized Learning</h3>
                <p className="text-muted-foreground">
                  Our AI tutor adapts to your learning style, pace, and knowledge gaps
                  to create a truly personalized educational experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Headphones className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Voice Clone Technology</h3>
                <p className="text-muted-foreground">
                  Engage in natural conversations with our voice clone agent that remembers
                  your interactions and provides detailed explanations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert-Curated Courses</h3>
                <p className="text-muted-foreground">
                  Access courses designed specifically for the Indian education system,
                  covering various subjects with comprehensive learning materials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="heading text-3xl font-bold mb-4">
                Track Your Learning Progress
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our comprehensive dashboard allows you to monitor your learning journey,
                track progress across courses, and view personalized recommendations.
              </p>
              <Link to="/dashboard">
                <Button className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Access Dashboard
                </Button>
              </Link>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="bg-slate-100 h-64 rounded-lg flex items-center justify-center">
                <p className="text-slate-400 text-center">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl md:text-4xl font-bold mb-4">
              Affordable Plans for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your learning needs and budget.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">₹0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Limited AI tutoring</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Access to basic courses</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Free learning resources</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Get Started</Button>
              </CardContent>
            </Card>
            
            {/* Basic Plan */}
            <Card className="bg-card border-primary hover:shadow-lg transition-all duration-300 scale-105">
              <CardContent className="p-6">
                <div className="bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full inline-block mb-4">POPULAR</div>
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">₹499</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Unlimited AI tutoring</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Voice clone assistant</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>All standard courses</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Progress tracking</span>
                  </li>
                </ul>
                <Button className="w-full">Subscribe Now</Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">₹999</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>All Basic features</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Advanced courses</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Personalized study plan</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Live tutoring sessions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Certification</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Subscribe Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-accent to-accent/70 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using University AI
            to enhance their education and achieve their goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/sign-up">
              <Button size="lg" className="bg-white text-accent hover:bg-white/90">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
