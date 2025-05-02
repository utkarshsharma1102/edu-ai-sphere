
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, User, Book, Settings } from 'lucide-react';

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'AI Tutor', href: '/ai-tutor' },
  { label: 'Voice Clone Agent', href: '/voice-clone-agent' },
  { label: 'About', href: '/about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
              <Book className="h-5 w-5 text-white" />
            </div>
            <span className="heading text-xl md:text-2xl bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              University AI
            </span>
          </Link>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="flex items-center">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 py-4 animate-fade-in">
          <nav className="container flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5"
              >
                {link.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="flex flex-col space-y-2 pt-2 border-t border-border/40">
                <Link to="/sign-in" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
