import { ArrowLeft, BookOpen, Languages } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const McqHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Current Affairs MCQ</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Choose your preferred language and start practicing
            </p>
          </div>

          {/* Language Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Tamil */}
            <button
              onClick={() => navigate('/mcq/quiz?lang=tamil')}
              className="glass-card-hover p-8 text-left group relative overflow-hidden animate-fade-in"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
              <div className="p-4 rounded-2xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300 w-fit mb-6">
                <Languages className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                தமிழ் (Tamil)
              </h3>
              <p className="text-muted-foreground text-sm">
                Practice current affairs MCQ questions in Tamil language
              </p>
            </button>

            {/* English */}
            <button
              onClick={() => navigate('/mcq/quiz?lang=english')}
              className="glass-card-hover p-8 text-left group relative overflow-hidden animate-fade-in"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
              <div className="p-4 rounded-2xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300 w-fit mb-6">
                <Languages className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                English
              </h3>
              <p className="text-muted-foreground text-sm">
                Practice current affairs MCQ questions in English language
              </p>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default McqHome;
