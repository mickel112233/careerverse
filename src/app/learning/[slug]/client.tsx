'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useToast } from '@/hooks/use-toast';
import { generateLearningContent, GenerateLearningContentOutput } from '@/ai/flows/learning-content-generator';
import { Loader2, ArrowRight, BookOpen, CheckCircle, XCircle, Repeat, BarChart, FileQuestion, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type LearningState = 'loading' | 'studying' | 'quizzing';
type UserAnswers = { [key: number]: string };
type RoadmapNode = {
    title: string;
    slug: string;
    status: 'completed' | 'unlocked' | 'locked';
    xp: number;
};
type QuizResult = {
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    explanation: string;
    isCorrect: boolean;
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
                if (currentIndex !== -1 && roadmap[currentIndex].status !== 'completed') {
                    roadmap[currentIndex].status = 'completed';
                    if (currentIndex + 1 < roadmap.length) {
                        roadmap[currentIndex + 1].status = 'unlocked';
                    }

                    const levelXp = roadmap[currentIndex].xp || 0;
                    const currentTotalXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
                    const newTotalXp = currentTotalXp + levelXp;
                    localStorage.setItem('careerClashTotalXp', newTotalXp.toString());

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
    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

    const question = quizData.questions[currentQuestionIndex];
    const totalQuestions = quizData.questions.length;

    const handleNext = () => {
        setSelectedOption(null);
        
        const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

        if (isLastQuestion) {
            const finalAnswers = {...userAnswers, [currentQuestionIndex]: selectedOption};
            const results: QuizResult[] = quizData.questions.map((q, index) => ({
                question: q.question,
                yourAnswer: finalAnswers[index] || "Not Answered",
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                isCorrect: finalAnswers[index] === q.correctAnswer,
            }));
            const finalScore = results.filter(r => r.isCorrect).length;
            setQuizResults(results);
            onQuizComplete(finalScore, totalQuestions);
            setIsFinished(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handleAnswer = (answer: string) => {
        if(selectedOption) return;
        setSelectedOption(answer);
        setUserAnswers(prev => ({...prev, [currentQuestionIndex]: answer}));
    };
    
    useEffect(() => {
        if (selectedOption) {
            const timer = setTimeout(handleNext, 1500);
            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption]);

    if (isFinished) {
        const score = quizResults.filter(r => r.isCorrect).length;
        const percentage = (score / totalQuestions) * 100;
        const passed = percentage >= 60;
        const incorrectAnswers = quizResults.filter(r => !r.isCorrect);

        const chartData = [
            { name: 'Correct', value: score, fill: 'hsl(var(--chart-1))' },
            { name: 'Incorrect', value: totalQuestions - score, fill: 'hsl(var(--destructive))' },
        ];
        const chartConfig = {
            correct: { label: 'Correct', color: 'hsl(var(--chart-1))' },
            incorrect: { label: 'Incorrect', color: 'hsl(var(--destructive))' },
        };

        return (
            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline text-2xl text-center">Challenge Complete!</CardTitle>
                    <CardDescription className="text-center">{passed ? "Congratulations, you passed!" : "You can do better. Review your answers and try again."}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="flex flex-col items-center">
                            <p className="text-lg font-medium">Your Score</p>
                             <p className={cn("text-7xl font-bold my-2", passed ? "text-green-400" : "text-destructive")}>
                                {score}<span className="text-3xl text-muted-foreground">/{totalQuestions}</span>
                            </p>
                            <p className="text-2xl font-semibold text-muted-foreground">({percentage.toFixed(0)}%)</p>
                        </div>
                        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-48">
                            <PieChart>
                                <Tooltip content={<ChartTooltipContent hideLabel />} />
                                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} strokeWidth={2}>
                                    {chartData.map((entry) => (
                                       <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </div>

                    {incorrectAnswers.length > 0 && (
                        <div>
                             <h3 className="text-xl font-semibold font-headline flex items-center mb-4"><FileQuestion className="mr-2 h-5 w-5 text-primary"/>Review Your Mistakes</h3>
                            <Accordion type="single" collapsible className="w-full">
                                {incorrectAnswers.map((result, index) => (
                                     <AccordionItem value={`item-${index}`} key={index}>
                                         <AccordionTrigger>
                                            <div className="flex items-start text-left gap-2">
                                                <HelpCircle className="h-5 w-5 text-destructive shrink-0 mt-1"/>
                                                <span>{result.question}</span>
                                            </div>
                                         </AccordionTrigger>
                                         <AccordionContent className="space-y-2">
                                             <p className="text-sm"><strong className="text-red-400">Your Answer:</strong> {result.yourAnswer}</p>
                                             <p className="text-sm"><strong className="text-green-400">Correct Answer:</strong> {result.correctAnswer}</p>
                                             <div className="p-3 bg-muted/50 rounded-md">
                                                <h4 className="font-semibold text-primary">Explanation</h4>
                                                <p className="text-muted-foreground text-sm">{result.explanation}</p>
                                             </div>
                                         </AccordionContent>
                                     </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button asChild>
                        <Link href="/dashboard">
                            Back to Roadmap
                        </Link>
                    </Button>
                     <Button variant="outline" onClick={() => window.location.reload()}>
                         <Repeat className="mr-2 h-4 w-4" />
                        {passed ? 'Practice Again' : 'Try Again'}
                     </Button>
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
                                     selectedOption ? "cursor-not-allowed" : "cursor-pointer hover:bg-muted/50",
                                     selectedOption && isCorrect && isSelected && "bg-green-900/50 border-green-500",
                                     selectedOption && !isCorrect && isSelected && "bg-red-900/50 border-red-500",
                                     selectedOption && isCorrect && !isSelected && "border-green-500",
                                 )}
                                 onClick={() => handleAnswer(option)}
                            >
                                {selectedOption && isCorrect && <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />}
                                {selectedOption && !isCorrect && isSelected && <XCircle className="h-5 w-5 text-red-400 shrink-0" />}
                                {!selectedOption && <div className="h-5 w-5 shrink-0 border-2 border-muted rounded-full"></div>}
                                {(selectedOption && !isSelected && !isCorrect) && <div className="h-5 w-5 shrink-0 border-2 border-muted rounded-full"></div>}

                                <Label htmlFor={`option-${index}`} className={cn("flex-1", selectedOption ? "cursor-not-allowed" : "cursor-pointer")}>{option}</Label>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleNext} disabled={!selectedOption || currentQuestionIndex === totalQuestions}>
                   {currentQuestionIndex === totalQuestions - 1 ? 'Finish Challenge' : 'Next Question'}
                </Button>
            </CardFooter>
        </Card>
    );
};
