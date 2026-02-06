import { useState } from 'react';
import { ArrowLeft, FileText, Download, Eye, Newspaper, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CurrentAffairsCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  pdfUrl: string;
  showViewButton: boolean;
}

const CurrentAffairsCard = ({ title, description, icon: Icon, pdfUrl, showViewButton }: CurrentAffairsCardProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() || 'current-affairs.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-card-hover p-8 animate-fade-in group relative overflow-hidden">
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border/50">
        {showViewButton && pdfUrl && (
          <button 
            className="btn-glass flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm"
            onClick={() => setIsViewerOpen(true)}
          >
            <Eye className="w-4 h-4" />
            <span>View PDF</span>
          </button>
        )}
        <button 
          className={`btn-gradient flex items-center justify-center gap-2 px-4 py-3 text-sm text-primary-foreground ${showViewButton && pdfUrl ? 'flex-1' : 'w-full'}`}
          onClick={handleDownload}
          disabled={!pdfUrl}
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* PDF Viewer Modal */}
      {showViewButton && pdfUrl && (
        <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
          <DialogContent className="max-w-4xl h-[85vh] p-0 bg-background/95 backdrop-blur-xl border-border/50">
            <DialogHeader className="p-4 border-b border-border/50">
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 h-full min-h-0">
              <iframe
                src={pdfUrl}
                className="w-full h-[calc(85vh-80px)] border-0"
                title={`${title} PDF Viewer`}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const currentAffairsData = [
  {
    title: '2026 Central Budget – Current Affairs Questions',
    description: 'Comprehensive collection of important questions and answers based on the 2026 Union Budget. Essential for all competitive exams including TNPSC, SSC, and Banking.',
    icon: FileText,
    pdfUrl: '/pdfs/2026-central-budget-current-affairs.pdf',
    showViewButton: true,
  },
  {
    title: 'Monthly Current Affairs',
    description: 'Stay updated with the latest monthly current affairs compilation. Covers national, international, sports, awards, and important events. Updated regularly.',
    icon: Calendar,
    pdfUrl: '', // Placeholder - update with actual PDF path when available
    showViewButton: false,
  },
];

const CurrentAffairs = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 md:px-8">
        <div className="container mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Current Affairs
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Stay updated with the latest current affairs materials for competitive exams
            </p>
          </div>

          {/* Two-Column Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {currentAffairsData.map((item, index) => (
              <CurrentAffairsCard 
                key={item.title}
                {...item}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CurrentAffairs;
