import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, BookOpen } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface McqQuestion {
  Question: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  CorrectAnswer: string;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const McqQuiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'english';

  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const file = lang === 'tamil' ? '/assets/tamil_mcq.json' : '/assets/english_mcq.json';
    fetch(file)
      .then(r => r.json())
      .then((data: McqQuestion[]) => {
        setQuestions(shuffle(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lang]);

  const current = questions[currentIndex];
  const isCorrect = selected ? selected === current?.CorrectAnswer : null;

  const handleSelect = useCallback((option: string) => {
    if (selected) return;
    setSelected(option);
    setAnswered(a => a + 1);
    if (option === current.CorrectAnswer) {
      setScore(s => s + 1);
    }
  }, [selected, current]);

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffle(questions));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(0);
    setFinished(false);
  };

  const optionKeys = ['OptionA', 'OptionB', 'OptionC', 'OptionD'] as const;
  const optionLabels = ['A', 'B', 'C', 'D'];

  const getOptionClass = (key: string) => {
    if (!selected) return 'glass-card-hover border border-border/30 hover:border-primary/50';
    if (key === current.CorrectAnswer) return 'border-2 border-green-500 bg-green-500/15 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
    if (key === selected && key !== current.CorrectAnswer) return 'border-2 border-red-500 bg-red-500/15 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
    return 'glass-card opacity-50';
  };

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-muted-foreground animate-pulse text-lg">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/mcq')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to MCQ</span>
          </button>

          {/* Score Bar */}
          <div className="glass-card p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                Score: <span className="text-primary">{score}</span> / {answered}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {lang === 'tamil' ? 'தமிழ்' : 'English'} • Q {currentIndex + 1}/{questions.length}
            </span>
          </div>

          {finished ? (
            /* Results Screen */
            <div className="glass-card p-10 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Quiz Complete!</h2>
              <p className="text-xl text-muted-foreground mb-2">
                Your Score: <span className="text-primary font-bold">{score}</span> / {questions.length}
              </p>
              <p className="text-muted-foreground mb-8">
                {score / questions.length >= 0.8 ? '🎉 Excellent work!' : score / questions.length >= 0.5 ? '👍 Good effort!' : '📚 Keep practicing!'}
              </p>
              <div className="flex gap-4 justify-center">
                <button onClick={handleRestart} className="btn-glass flex items-center gap-2 px-6 py-3">
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </button>
                <button onClick={() => navigate('/mcq')} className="btn-gradient px-6 py-3 text-primary-foreground">
                  Back to MCQ
                </button>
              </div>
            </div>
          ) : current ? (
            /* Question Card */
            <div className="animate-fade-in" key={currentIndex}>
              <div className="glass-card p-8 mb-6">
                <div className="flex items-start gap-3 mb-2">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary text-sm font-bold">
                    {currentIndex + 1}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
                    {current.Question}
                  </h3>
                </div>
              </div>

              <div className="grid gap-3">
                {optionKeys.map((key, i) => (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    disabled={!!selected}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 ${getOptionClass(key)}`}
                  >
                    <span className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold bg-muted/50 text-foreground">
                      {optionLabels[i]}
                    </span>
                    <span className="flex-1 text-foreground">{current[key]}</span>
                    {selected && key === current.CorrectAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    )}
                    {selected && key === selected && key !== current.CorrectAnswer && (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Correct answer text */}
              {selected && (
                <div className={`mt-4 p-4 rounded-2xl border animate-fade-in ${isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                  <p className="text-sm font-medium">
                    {isCorrect ? '✅ Correct!' : `❌ Wrong! Correct answer: ${current[current.CorrectAnswer as keyof McqQuestion]}`}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {selected && (
                <button
                  onClick={handleNext}
                  className="btn-gradient w-full mt-6 py-4 text-primary-foreground flex items-center justify-center gap-2 text-lg font-semibold animate-fade-in"
                >
                  {currentIndex + 1 >= questions.length ? 'View Results' : 'Next Question'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default McqQuiz;
