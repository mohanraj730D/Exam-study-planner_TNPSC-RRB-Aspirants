import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExamCountdownCard from '@/components/ExamCountdownCard';
import SyllabusCard from '@/components/SyllabusCard';
import ResourceCard from '@/components/ResourceCard';
import StudyPlannerTodo from '@/components/StudyPlannerTodo';
import Footer from '@/components/Footer';
import { Clock, BookOpen, CheckSquare, FolderOpen } from 'lucide-react';

// Exam data with IST timezone target dates
const exams = [
  {
    examName: 'TNPSC Group 1',
    examDate: new Date('2026-09-06T00:00:00+05:30'),
    category: 'tnpsc' as const,
    description: 'Tamil Nadu Civil Services Exam - Prelims',
  },
  {
    examName: 'TNPSC Group 2',
    examDate: new Date('2026-10-25T00:00:00+05:30'),
    category: 'tnpsc' as const,
    description: 'Combined Civil Services Exam II',
  },
  {
    examName: 'TNPSC Group 2A',
    examDate: new Date('2026-10-25T00:00:00+05:30'),
    category: 'tnpsc' as const,
    description: 'Non-Interview Posts Exam',
  },
  {
    examName: 'TNPSC Group 4',
    examDate: new Date('2026-12-20T00:00:00+05:30'),
    category: 'tnpsc' as const,
    description: 'VAO & Other Posts Exam',
  },
];

// Syllabus data
const syllabusData = [
  {
    title: 'TNPSC Group 1 Syllabus',
    category: 'tnpsc' as const,
    subjects: ['General Studies', 'Aptitude & Mental Ability', 'Indian Polity', 'Indian Economy', 'History & Culture', 'Geography'],
    totalTopics: 156,
    pdfUrl: '/pdfs/tnpsc-group1-syllabus.pdf',
  },
  {
    title: 'TNPSC Group 2 Syllabus',
    category: 'tnpsc' as const,
    subjects: ['General Tamil/English', 'General Studies', 'Aptitude', 'Indian Constitution', 'Economics'],
    totalTopics: 98,
    pdfUrl: '/pdfs/tnpsc-group2-syllabus.pdf',
  },
  {
    title: 'TNPSC Group 2A Syllabus',
    category: 'tnpsc' as const,
    subjects: ['General Tamil/English', 'General Studies', 'Aptitude', 'Indian Constitution', 'Economics'],
    totalTopics: 98,
    pdfUrl: '/pdfs/tnpsc-group2a-syllabus.pdf',
  },
  {
    title: 'TNPSC Group 4 Syllabus',
    category: 'tnpsc' as const,
    subjects: ['General Studies', 'Aptitude', 'Tamil Language', 'Current Affairs'],
    totalTopics: 72,
    pdfUrl: '/pdfs/tnpsc-group4-syllabus.pdf',
  },
  {
    title: 'RRB NTPC Syllabus',
    category: 'rrb' as const,
    subjects: ['Mathematics', 'General Intelligence', 'General Awareness', 'General Science'],
    totalTopics: 85,
    pdfUrl: '/pdfs/rrb-ntpc-syllabus.pdf',
  },
  {
    title: 'RRB Group D Syllabus',
    category: 'rrb' as const,
    subjects: ['Mathematics', 'General Science', 'General Awareness', 'Reasoning'],
    totalTopics: 64,
    pdfUrl: '/pdfs/rrb-groupd-syllabus.pdf',
  },
];

// Study Resources data
const resourcesData = [
  {
    title: 'Group 4 Government Aptitude',
    description: 'Complete aptitude study material for TNPSC Group 4',
    category: 'aptitude' as const,
    pdfUrl: '/pdfs/group4-govt-aptitude.pdf',
  },
  {
    title: 'Group 1 Question Papers (2015-2025)',
    description: 'Last 10 years solved question papers for Group 1',
    category: 'question-papers' as const,
    pdfUrl: '/pdfs/group4-question-papers-2015-2025.pdf',
  },
  {
    title: 'Group 2 Question Papers (2015-2025)',
    description: 'Last 10 years solved question papers for Group 2',
    category: 'question-papers' as const,
    pdfUrl: '/pdfs/group4-question-papers-2015-2025.pdf',
  },
  {
    title: 'Group 4 Question Papers (2015-2025)',
    description: 'Last 10 years solved question papers for Group 4',
    category: 'question-papers' as const,
    pdfUrl: '/pdfs/group4-question-papers-2015-2025.pdf',
  },
];

const SectionHeader = ({ 
  icon: Icon, 
  title, 
  subtitle 
}: { 
  icon: React.ElementType; 
  title: string; 
  subtitle: string; 
}) => (
  <div className="text-center mb-12 animate-fade-in">
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 mb-4">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
    <p className="text-muted-foreground max-w-lg mx-auto">{subtitle}</p>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Exam Countdown Section */}
      <section id="exams" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <SectionHeader 
            icon={Clock}
            title="Upcoming Exams"
            subtitle="Stay prepared with live countdown timers for all major government exams"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam, index) => (
              <ExamCountdownCard 
                key={exam.examName}
                {...exam}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section id="syllabus" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <SectionHeader 
            icon={BookOpen}
            title="Exam Syllabus"
            subtitle="Access comprehensive syllabus for TNPSC and RRB exams with downloadable PDFs"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusData.map((syllabus, index) => (
              <SyllabusCard 
                key={syllabus.title}
                {...syllabus}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Study Resources Section */}
      <section id="resources" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <SectionHeader 
            icon={FolderOpen}
            title="Study Resources"
            subtitle="Access aptitude materials and previous years' question papers"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourcesData.map((resource, index) => (
              <ResourceCard 
                key={resource.title}
                {...resource}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Study Planner Section */}
      <section id="planner" className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <SectionHeader 
            icon={CheckSquare}
            title="Daily Study Planner"
            subtitle="Organize your preparation with a simple yet powerful to-do list"
          />
          
          <div className="max-w-2xl mx-auto">
            <StudyPlannerTodo />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
