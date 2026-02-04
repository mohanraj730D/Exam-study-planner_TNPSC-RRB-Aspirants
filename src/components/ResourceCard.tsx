import { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ResourceCardProps {
  title: string;
  description: string;
  category: 'aptitude' | 'question-papers';
  pdfUrl: string;
  index: number;
}

const ResourceCard = ({ title, description, category, pdfUrl, index }: ResourceCardProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const categoryConfig = {
    aptitude: {
      color: 'primary',
      label: 'Aptitude',
      bgClass: 'bg-primary/20',
      textClass: 'text-primary',
    },
    'question-papers': {
      color: 'accent',
      label: 'Previous Papers',
      bgClass: 'bg-accent/20',
      textClass: 'text-accent',
    },
  };

  const config = categoryConfig[category];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() || 'resource.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="glass-card-hover p-6 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${config.bgClass} ${config.textClass}`}>
            {config.label}
          </span>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className={`p-3 rounded-xl ${config.bgClass}`}>
          <FileText className={`w-5 h-5 ${config.textClass}`} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border/50">
        <button 
          className="btn-glass flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm"
          onClick={() => setIsViewerOpen(true)}
        >
          <Eye className="w-4 h-4" />
          <span>View PDF</span>
        </button>
        <button 
          className="btn-gradient flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-primary-foreground"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>

      {/* PDF Viewer Modal */}
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
    </div>
  );
};

export default ResourceCard;
