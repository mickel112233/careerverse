'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { generateLearningContent, GenerateLearningContentOutput } from '@/ai/flows/learning-content-generator';
import { Loader2, ArrowRight, BookOpen, CheckCircle, XCircle, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

type LearningState = 'loading' | 'studying' | 'quizzing';
type UserAnswers = { [key: number]: string };
type RoadmapNode = {
    title: string;
    slug: string;
    status: 'completed' | 'unlocked' | 'locked';
};

export default function LearningFlowClient({ topic, slug }: { topic: string, slug: string }) {
    const [state, setState] = useState<LearningState>('loading');
    const [learningData, setLearningData] = useState<GenerateLearningContentOutput | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const fetchContent = async () => {
            setState('loading');
            try {
                const streamName = localStorage.getItem('careerClashStream') || 'general knowledge';
                const data = await generateLearningContent({ topicTitle: topic, streamName });
                setLearningData(data);
                setState('studying');
            } catch (error) {
                console.error("Failed to generate learning content:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Could not load the lesson. Please try again later.",
                });
                router.push('/dashboard');
            }
        };
        fetchContent();
    }, [topic, router, toast]);

    const handleQuizComplete = (finalScore: number, totalQuestions: number) => {
        const percentage = (finalScore / totalQuestions) * 100;
        if (percentage >= 60) {
            const storedRoadmap = localStorage.getItem('careerClashRoadmap');
            if (storedRoadmap) {
                const roadmap: RoadmapNode[] = JSON.parse(storedRoadmap);
                const currentIndex = roadmap.findIndex(node => node.slug === slug);
                if (currentIndex !== -1) {
                    roadmap[currentIndex].status = 'completed';
                    if (currentIndex + 1 < roadmap.length) {
                        roadmap[currentIndex + 1].status = 'unlocked';
                    }
                    localStorage.setItem('careerClashRoadmap', JSON.stringify(roadmap));
                }
            }
            toast({
                title: "Level Complete!",
                description: "You've unlocked the next level.",
                className: "bg-green-500 text-white border-green-600",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Challenge Failed",
                description: `You scored ${percentage.toFixed(0)}%. You need at least 60% to pass. Review the material and try again.`,
            });
        }
    }

    if (state === 'loading' || !learningData) {
        return (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg text-muted-foreground">Crafting your lesson on "{topic}"...</p>
            </div>
        );
    }
    
    if (state === 'studying') {
        return <StudyView content={learningData.learningContent} onStartQuiz={() => setState('quizzing')} />;
    }

    if (state === 'quizzing') {
        return <QuizView quizData={learningData.quiz} onQuizComplete={handleQuizComplete} />;
    }

    return null;
}

const StudyView = ({ content, onStartQuiz }: { content: string, onStartQuiz: () => void }) => (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <BookOpen />
                Learning Material
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
        <CardFooter>
            <Button size="lg" onClick={onStartQuiz}>
                I'm Ready, Start the Challenge
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </CardFooter>
    </Card>
);

const QuizView = ({ quizData, onQuizComplete }: { quizData: GenerateLearningContentOutput['quiz'], onQuizComplete: (score: number, total: number) => void }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);

    const question = quizData.questions[currentQuestionIndex];
    const totalQuestions = quizData.questions.length;

    const handleNext = () => {
        setShowExplanation(false);
        setSelectedOption(null);
        
        const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

        if (isLastQuestion) {
            let finalScore = 0;
            // Recalculate score based on the final state of userAnswers
            const finalAnswers = {...userAnswers, [currentQuestionIndex]: selectedOption};
             quizData.questions.forEach((q, index) => {
                if (finalAnswers[index] === q.correctAnswer) {
                    finalScore++;
                }
            });
            setScore(finalScore);
            setIsFinished(true);
            onQuizComplete(finalScore, totalQuestions);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handleAnswer = (answer: string) => {
        if(showExplanation) return;
        setSelectedOption(answer);
        setUserAnswers(prev => ({...prev, [currentQuestionIndex]: answer}));
        setShowExplanation(true);
    };

    if (isFinished) {
        const percentage = (score / totalQuestions) * 100;
        const passed = percentage >= 60;

        return (
            <Card className="text-center">
                 <CardHeader>
                    <CardTitle className="font-headline text-2xl">Challenge Complete!</CardTitle>
                    <CardDescription>{passed ? "Congratulations, you passed!" : "You can do better. Try again!"}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                     <p className="text-lg">Your score:</p>
                    <p className={cn("text-6xl font-bold my-4", passed ? "text-green-400" : "text-destructive")}>
                        {score} <span className="text-2xl text-muted-foreground">/ {totalQuestions}</span>
                    </p>
                    <div className="w-full bg-muted rounded-full h-4 my-4">
                        <div className={cn("h-4 rounded-full", passed ? "bg-green-400" : "bg-destructive")} style={{ width: `${percentage}%` }}></div>
                    </div>
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button asChild>
                        <Link href="/dashboard">
                            Back to Roadmap
                        </Link>
                    </Button>
                    {!passed && (
                         <Button variant="outline" onClick={() => window.location.reload()}>
                             <Repeat className="mr-2 h-4 w-4" />
                            Try Again
                         </Button>
                    )}
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">{quizData.title}</CardTitle>
                <CardDescription>
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </CardDescription>
                <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="w-full" />
            </CardHeader>
            <CardContent>
                <p className="font-semibold mb-4 text-lg">{question.question}</p>
                <div className="space-y-3">
                    {question.options.map((option, index) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = question.correctAnswer === option;

                        return (
                            <div key={index} 
                                 className={cn(
                                     "flex items-center space-x-3 p-3 rounded-md border transition-all",
                                     showExplanation ? "cursor-not-allowed" : "cursor-pointer hover:bg-muted/50",
                                     showExplanation && isCorrect && "bg-green-900/50 border-green-500",
                                     showExplanation && isSelected && !isCorrect && "bg-red-900/50 border-red-500",
                                 )}
                                 onClick={() => handleAnswer(option)}
                            >
                                {showExplanation && isCorrect && <CheckCircle className="h-5 w-5 text-green-400" />}
                                {showExplanation && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400" />}
                                {!showExplanation && <div className="h-5 w-5 shrink-0"></div>}
                                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                            </div>
                        )
                    })}
                </div>
                {showExplanation && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold text-primary">Explanation</h4>
                        <p className="text-muted-foreground text-sm">{question.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button onClick={handleNext} disabled={!showExplanation}>
                   {currentQuestionIndex === totalQuestions - 1 ? 'Finish Challenge' : 'Next Question'}
                </Button>
            </CardFooter>
        </Card>
    );
};
