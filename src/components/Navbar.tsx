import { useState } from 'react';
import { Menu, X, BookOpen, Clock, CheckSquare, GraduationCap, Newspaper, Brain } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Exams', href: '#exams', icon: Clock, isRoute: false },
    { name: 'Syllabus', href: '#syllabus', icon: BookOpen, isRoute: false },
    { name: 'Current Affairs', href: '/current-affairs', icon: Newspaper, isRoute: true },
    { name: 'MCQ', href: '/mcq', icon: Brain, isRoute: true },
    { name: 'Planner', href: '#planner', icon: CheckSquare, isRoute: false },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.isRoute) {
      navigate(link.href);
    } else {
      // If we're not on the home page, navigate there first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.querySelector(link.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card mx-4 mt-4 md:mx-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20 backdrop-blur-sm">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">StudyPlan</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </button>
              ))}
              <button className="btn-gradient px-5 py-2 ml-2 text-sm text-primary-foreground">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-card mx-4 mt-2 animate-fade-in">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </button>
            ))}
            <button className="btn-gradient w-full px-5 py-3 mt-2 text-sm text-primary-foreground">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
