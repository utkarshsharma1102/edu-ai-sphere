
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SignUpForm from '@/components/auth/SignUpForm';
import { Card, CardContent } from '@/components/ui/card';

const SignUp = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="mb-4 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="heading text-xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                University AI
              </span>
            </Link>
          </div>
          <Card>
            <CardContent className="pt-6">
              <SignUpForm />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
