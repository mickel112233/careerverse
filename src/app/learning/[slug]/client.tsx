
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
import { Loader2, ArrowRight, BookOpen, CheckCircle, XCircle, Repeat, FileQuestion, HelpCircle, Zap, Coins, ArrowLeft, Info, Sparkles, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { updateQuestProgress } from '@/lib/quest-data';
import { categoryToSkillMapping } from '@/lib/skill-mapping';
import { factions } from '../../welcome/page';

type QuizQuestion = {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
};

type Lesson = {
    title: string;
    content: string; 
    task: string;
};

type Module = {
    title: string;
    lessons: Lesson[];
    quiz: {
        title: string;
        questions: QuizQuestion[];
    };
};

type CourseContent = {
    courseTitle: string;
    summary: string;
    estimatedTime: string;
    modules: Module[];
};

type LearningState = 'loading' | 'studying' | 'quizzing' | 'results';
type UserAnswers = { [key: number]: string };

type Level = {
    title: string;
    slug: string;
    status: 'completed' | 'unlocked' | 'locked';
    xp: number;
    coins: number;
};

type Stage = {
  stageName: string;
  status: 'completed' | 'unlocked' | 'locked';
  levels: Level[];
};

type Roadmap = Stage[];

type QuizResult = {
    question: string;
    yourAnswer: string;
    correctAnswer: string;
    explanation: string;
    isCorrect: boolean;
};

const LearningContentSkeleton = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-8 w-1/2 mt-6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
        </CardContent>
        <CardFooter>
            <Skeleton className="h-12 w-72" />
        </CardFooter>
    </Card>
);

const MissingContentCard = ({ topic, onBack }: { topic: string, onBack: () => void }) => (
    <Card className="mt-8 border-primary/20 bg-primary/5">
        <CardHeader className="text-center">
            <Info className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="font-headline text-2xl">Content Not Yet Generated</CardTitle>
            <CardDescription>The learning material for "{topic}" is ready to be created.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="max-w-prose mx-auto">
                This is part of the app's scalable design. To add the lesson and quiz for this topic, you can simply ask the AI in a new prompt. Once created and saved to the project, it will appear here instantly for all users.
            </p>
        </CardContent>
        <CardFooter className="justify-center">
            <Button onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Roadmap
            </Button>
        </CardFooter>
    </Card>
);


export default function LearningFlowClient({ topic, slug }: { topic: string, slug: string }) {
    const [state, setState] = useState<LearningState>('loading');
    const [courseData, setCourseData] = useState<CourseContent | null>(null);
    const [contentExists, setContentExists] = useState<boolean | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const [levelXp, setLevelXp] = useState(0);
    const [levelCoins, setLevelCoins] = useState(0);
    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
    const [streamName, setStreamName] = useState('');
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);


    useEffect(() => {
        const fetchContent = async () => {
            setState('loading');
            try {
                const storedStreamName = localStorage.getItem('careerClashStream') || 'Software Development';
                setStreamName(storedStreamName);
                const streamSlug = storedStreamName.toLowerCase().replace(/ & /g, ' ').replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-');
                
                const response = await fetch(`/learning-content/${streamSlug}.json`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setContentExists(false);
                        setState('studying'); 
                        return;
                    }
                    throw new Error(`Failed to load content. Status: ${response.status}`);
                }

                const data: CourseContent = await response.json();
                
                setCourseData(data);
                setContentExists(true);
                
                const storedRoadmap = localStorage.getItem('careerClashRoadmap');
                if (storedRoadmap) {
                    const roadmap: Stage[] = JSON.parse(storedRoadmap);
                    let currentNode: Level | undefined;
                    let completedCount = 0;
                    let totalCount = 0;
                    
                    roadmap.forEach(stage => {
                        stage.levels.forEach(level => {
                            totalCount++;
                            if (level.status === 'completed') {
                                completedCount++;
                            }
                            if (level.slug === slug) {
                                currentNode = level;
                            }
                        })
                    });
                    
                    if (currentNode) {
                        setLevelXp(currentNode.xp || 0);
                        setLevelCoins(currentNode.coins || 0);
                    }
                    setProgress({ current: completedCount, total: totalCount });
                }
                
                setState('studying');
            } catch (error) {
                console.error("Failed to fetch learning content:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Could not load the lesson. Please try again later.",
                });
                router.push('/study');
            }
        };
        fetchContent();
    }, [topic, slug, router, toast]);

    const handleQuizComplete = (finalScore: number, totalQuestions: number, results: QuizResult[]) => {
        const percentage = (finalScore / totalQuestions) * 100;
        setQuizResults(results);
        setState('results');

        if (percentage >= 60) {
            updateQuestProgress('daily2', 1);
            updateQuestProgress('weekly2', 1);
            updateQuestProgress('milestone3', 1);
            updateQuestProgress('milestone6', 1);
            updateQuestProgress('milestone9', 1);
            updateQuestProgress('milestone14', 1);
            
            const storedRoadmap = localStorage.getItem('careerClashRoadmap');
            if (storedRoadmap) {
                let roadmap: Stage[] = JSON.parse(storedRoadmap);
                let currentStageIndex = -1;
                let currentLevelIndex = -1;

                roadmap.forEach((stage, sIndex) => {
                    const lIndex = stage.levels.findIndex(level => level.slug === slug);
                    if (lIndex !== -1) {
                        currentStageIndex = sIndex;
                        currentLevelIndex = lIndex;
                    }
                });

                if (currentStageIndex !== -1 && currentLevelIndex !== -1) {
                    if (roadmap[currentStageIndex].levels[currentLevelIndex].status !== 'completed') {
                         roadmap[currentStageIndex].levels[currentLevelIndex].status = 'completed';

                         const storedProfile = JSON.parse(localStorage.getItem('careerClashUserProfile') || '{}');
                         const userFactionName = storedProfile.faction;
                         const userFaction = factions.find(f => f.name === userFactionName);
                         const streamSkillCategory = categoryToSkillMapping[streamName];
                         
                         let xpGained = levelXp;
                         let toastMessage = `You earned ${levelXp} XP and ${levelCoins} Coins!`;

                         if (userFaction && userFaction.perkCategory === streamSkillCategory) {
                            const bonusXp = Math.floor(levelXp * 0.1);
                            xpGained += bonusXp;
                            toastMessage = `You earned ${levelXp} XP + ${bonusXp} (Faction Bonus!) and ${levelCoins} Coins!`;
                         }

                         const currentTotalXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
                         const newTotalXp = currentTotalXp + xpGained;
                         localStorage.setItem('careerClashTotalXp', newTotalXp.toString());
                         
                         const currentCoins = parseInt(localStorage.getItem('careerClashCoins') || '0', 10);
                         const newTotalCoins = currentCoins + levelCoins;
                         localStorage.setItem('careerClashCoins', newTotalCoins.toString());

                         window.dispatchEvent(new Event('currencyChange'));
                         
                         toast({
                            title: "Level Complete!",
                            description: toastMessage,
                            className: "bg-green-500 text-white border-green-600",
                        });
                    }

                    if (currentLevelIndex + 1 < roadmap[currentStageIndex].levels.length) {
                        roadmap[currentStageIndex].levels[currentLevelIndex + 1].status = 'unlocked';
                    } else {
                        const isStageComplete = roadmap[currentStageIndex].levels.every(l => l.status === 'completed');
                        if (isStageComplete) {
                            roadmap[currentStageIndex].status = 'completed';
                            if (currentStageIndex + 1 < roadmap.length) {
                                roadmap[currentStageIndex + 1].status = 'unlocked';
                                if (roadmap[currentStageIndex + 1].levels?.[0]) {
                                    roadmap[currentStageIndex + 1].levels[0].status = 'unlocked';
                                }
                                 toast({
                                    title: "Stage Complete!",
                                    description: `You've mastered ${roadmap[currentStageIndex].stageName}. The next stage is unlocked!`,
                                });
                            }
                        }
                    }

                    localStorage.setItem('careerClashRoadmap', JSON.stringify(roadmap));
                }
            }
        } else {
            toast({
                variant: "destructive",
                title: "Challenge Failed",
                description: `You scored ${percentage.toFixed(0)}%. You need at least 60% to pass. Review the material and try again.`,
            });
        }
    }
    
    const pageContent = () => {
        if (state === 'loading' || contentExists === null) {
            return <LearningContentSkeleton />;
        }
    
        if (contentExists === false) {
            return <MissingContentCard topic={topic} onBack={() => router.push('/study')} />;
        }
        
        if (courseData) {
            switch (state) {
                case 'studying':
                    return <StudyView courseData={courseData} onStartQuiz={(moduleIndex) => { setCurrentModuleIndex(moduleIndex); setState('quizzing');}} />;
                case 'quizzing':
                    const quizData = courseData.modules[currentModuleIndex].quiz;
                    return <QuizView quizData={quizData} levelXp={levelXp} levelCoins={levelCoins} onQuizComplete={handleQuizComplete} />;
                case 'results':
                    return <ResultsView results={quizResults} levelXp={levelXp} levelCoins={levelCoins} onRetry={() => setState('quizzing')} />;
                default:
                    return <LearningContentSkeleton />;
            }
        }

        return null;
    }

    const progressPercentage = progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

    return (
        <>
            <Button variant="ghost" onClick={() => router.push('/study')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Roadmap
            </Button>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary capitalize">{topic}</h1>
                <p className="mt-2 text-muted-foreground">
                    Study the material below, then prepare for the challenge.
                </p>
                <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm font-medium text-muted-foreground">
                        <span>Overall Roadmap Progress</span>
                        <span>{progress.current} / {progress.total} Levels</span>
                    </div>
                    <Progress value={progressPercentage} />
                </div>
            </motion.div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={state + (contentExists ? 'loaded' : 'missing')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {pageContent()}
                </motion.div>
            </AnimatePresence>
        </>
    );
}

const StudyView = ({ courseData, onStartQuiz }: { courseData: CourseContent, onStartQuiz: (moduleIndex: number) => void }) => (
    <div className="grid lg:grid-cols-1 gap-6">
        {courseData.modules.map((module, moduleIndex) => (
            <Card key={moduleIndex} className="lg:col-span-1">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <BookOpen />
                        {module.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                    {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="prose dark:prose-invert max-w-none">
                            <h3>{lesson.title}</h3>
                            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                            <div className="mt-4 p-4 border-l-4 border-accent bg-accent/10">
                                <p className="font-bold">Mini-Task:</p>
                                <p>{lesson.task}</p>
                            </div>
                        </div>
                    ))}
                    <Button size="lg" onClick={() => onStartQuiz(moduleIndex)} className="mt-6">
                        Start {module.quiz.title}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
);


const QuizView = ({ quizData, levelXp, levelCoins, onQuizComplete }: { quizData: Module['quiz'], levelXp: number, levelCoins: number, onQuizComplete: (score: number, total: number, results: QuizResult[]) => void }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const question = quizData.questions[currentQuestionIndex];
    const totalQuestions = quizData.questions.length;

    const handleNext = () => {
        const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

        if (isLastQuestion) {
            const finalAnswers = {...userAnswers, [currentQuestionIndex]: selectedOption!};
            const results: QuizResult[] = quizData.questions.map((q, index) => ({
                question: q.question,
                yourAnswer: finalAnswers[index] || "Not Answered",
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                isCorrect: finalAnswers[index] === q.correctAnswer,
            }));
            const finalScore = results.filter(r => r.isCorrect).length;
            onQuizComplete(finalScore, totalQuestions, results);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
        }
    };
    
    const handleAnswer = (answer: string) => {
        if(selectedOption) return;
        setSelectedOption(answer);
        setUserAnswers(prev => ({...prev, [currentQuestionIndex]: answer}));
    };
    
    useEffect(() => {
        if (selectedOption) {
            const timer = setTimeout(handleNext, 1200);
            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption]);

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
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="font-semibold mb-6 text-lg text-center">{question.question}</p>
                        <div className="space-y-3">
                            {question.options.map((option, index) => {
                                const isSelected = selectedOption === option;
                                const isCorrect = question.correctAnswer === option;

                                return (
                                    <motion.div key={index} whileHover={{ scale: selectedOption ? 1 : 1.02 }}>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className={cn(
                                                "h-auto py-4 justify-start text-left whitespace-normal transition-all duration-300 w-full",
                                                selectedOption ? "cursor-not-allowed" : "hover:bg-primary/10 hover:border-primary",
                                                selectedOption && isCorrect && "bg-green-500/20 border-green-500 text-foreground animate-pulse",
                                                selectedOption && !isCorrect && isSelected && "bg-destructive/20 border-destructive text-foreground"
                                            )}
                                            onClick={() => handleAnswer(option)}
                                            disabled={!!selectedOption}
                                        >
                                            <div className="flex items-center w-full">
                                                <div className="flex items-center mr-4">
                                                    {selectedOption && isCorrect && isSelected && <CheckCircle className="h-6 w-6 text-green-400 shrink-0" />}
                                                    {selectedOption && isCorrect && !isSelected && <div className="h-6 w-6 shrink-0"/>}
                                                    {selectedOption && !isCorrect && isSelected && <XCircle className="h-6 w-6 text-red-400 shrink-0" />}
                                                    {!selectedOption && <div className="h-6 w-6 shrink-0 border-2 border-muted rounded-full group-hover:border-primary"></div>}
                                                    {(selectedOption && !isSelected && !isCorrect) && <div className="h-6 w-6 shrink-0 border-2 border-muted rounded-full"></div>}
                                                </div>
                                                <Label className={cn("flex-1 text-base", selectedOption ? "cursor-not-allowed" : "cursor-pointer")}>{option}</Label>
                                            </div>
                                        </Button>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </CardContent>
             <CardFooter className="justify-end">
                <Button onClick={handleNext} disabled={!selectedOption}>
                   {currentQuestionIndex === totalQuestions - 1 ? 'Finish Challenge' : 'Next Question'}
                   <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </CardFooter>
        </Card>
    );
};

const ResultsView = ({ results, levelXp, levelCoins, onRetry }: { results: QuizResult[], levelXp: number, levelCoins: number, onRetry: () => void }) => {
    const score = results.filter(r => r.isCorrect).length;
    const totalQuestions = results.length;
    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 60;
    const incorrectAnswers = results.filter(r => !r.isCorrect);

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
                <CardTitle className="font-headline text-3xl text-center">Challenge Complete!</CardTitle>
                <CardDescription className="text-center">{passed ? "Congratulations, you passed!" : "You can do better. Review your answers and try again."}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                            <motion.p 
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={cn("text-7xl font-bold font-headline my-2", passed ? "text-green-400" : "text-destructive")}>
                            {score}<span className="text-3xl text-muted-foreground">/{totalQuestions}</span>
                        </motion.p>
                        <p className="text-2xl font-semibold text-muted-foreground">({percentage.toFixed(0)}%)</p>
                            {passed && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-2 mt-2"
                            >
                                <div className="flex items-center text-lg text-yellow-400 font-bold bg-yellow-400/10 px-4 py-2 rounded-md">
                                    <Zap className="h-5 w-5 mr-2" /> +{levelXp} XP Gained
                                </div>
                                <div className="flex items-center text-lg text-amber-500 font-bold bg-amber-500/10 px-4 py-2 rounded-md">
                                    <Coins className="h-5 w-5 mr-2" /> +{levelCoins} Gained
                                </div>
                            </motion.div>
                        )}
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
                                        <AccordionContent className="space-y-2 p-4">
                                            <p className="text-sm"><strong className="text-red-400">Your Answer:</strong> {result.yourAnswer}</p>
                                            <p className="text-sm"><strong className="text-green-400">Correct Answer:</strong> {result.correctAnswer}</p>
                                            <div className="p-3 bg-muted/50 rounded-md mt-2">
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
            <CardFooter className="justify-center gap-4 pt-6">
                <Button asChild>
                    <Link href="/study">
                        Back to Roadmap
                    </Link>
                </Button>
                    <Button variant="outline" onClick={onRetry}>
                        <Repeat className="mr-2 h-4 w-4" />
                    {passed ? 'Practice Again' : 'Try Again'}
                    </Button>
            </CardFooter>
        </Card>
    )
}
