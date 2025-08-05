
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRoadmapByStream, RoadmapLevel } from '@/lib/roadmap-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Check, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateQuestProgress } from '@/lib/quest-data';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

type QuizQuestion = {
    question: string;
    options: string[];
    answer: string;
};

const mockQuiz: QuizQuestion[] = [
    {
        question: "What is Canva primarily used for?",
        options: ["Video Editing", "Graphic Design", "Coding", "Music Production"],
        "answer": "Graphic Design"
    },
    {
        question: "Which file type supports a transparent background?",
        options: ["JPG", "GIF", "PNG", "MP3"],
        "answer": "PNG"
    },
    {
        question: "What does the 'Elements' tab in Canva contain?",
        options: ["Only photos", "Text styles", "Shapes, icons, and illustrations", "Your uploaded files"],
        "answer": "Shapes, icons, and illustrations"
    },
];

const LoadingSkeleton = () => (
    <div className="space-y-8">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <div className="space-y-4 pt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
        </div>
    </div>
);

export default function LearningClient({ slug }: { slug: string }) {
    const router = useRouter();
    const { toast } = useToast();
    const [levelData, setLevelData] = useState<RoadmapLevel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'lesson' | 'quiz' | 'results'>('lesson');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const stream = localStorage.getItem('careerClashStream') || 'Canva Design';
        const roadmap = getRoadmapByStream(stream);
        const level = roadmap?.levels.find(l => l.id === slug);

        if (level) {
            setLevelData(level);
            const completedLevels = new Set(JSON.parse(localStorage.getItem('careerClashCompletedLevels') || '[]'));
            setIsCompleted(completedLevels.has(level.id));
        } else {
            toast({ variant: 'destructive', title: 'Level not found!' });
            router.push('/roadmap');
        }
        setIsLoading(false);
    }, [slug, router, toast]);

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return;
        setSelectedAnswer(answer);
        if (answer === mockQuiz[currentQuestionIndex].answer) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < mockQuiz.length - 1) {
                setCurrentQuestionIndex(i => i + 1);
                setSelectedAnswer(null);
            } else {
                setView('results');
            }
        }, 1200);
    };

    const handleCompleteLevel = () => {
        if (!levelData) return;

        const completedLevels = new Set(JSON.parse(localStorage.getItem('careerClashCompletedLevels') || '[]'));
        completedLevels.add(levelData.id);
        localStorage.setItem('careerClashCompletedLevels', JSON.stringify(Array.from(completedLevels)));

        const currentTotalXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
        const newTotalXp = currentTotalXp + levelData.xp;
        localStorage.setItem('careerClashTotalXp', newTotalXp.toString());
        
        const currentCoins = parseInt(localStorage.getItem('careerClashCoins') || '0', 10);
        const newTotalCoins = currentCoins + levelData.coins;
        localStorage.setItem('careerClashCoins', newTotalCoins.toString());
        
        // Update quest progress
        updateQuestProgress('daily2', 1);
        updateQuestProgress('weekly2', 1);
        updateQuestProgress('milestone3', 1);

        window.dispatchEvent(new Event('currencyChange'));

        toast({
            title: "Level Complete!",
            description: `You earned ${levelData.xp} XP and ${levelData.coins} Coins.`,
            className: "bg-green-500 text-white"
        });
        
        router.push('/roadmap');
    };

    const scorePercentage = (score / mockQuiz.length) * 100;
    const passed = scorePercentage >= 60;

    if (isLoading || !levelData) {
        return <LoadingSkeleton />;
    }

    return (
        <div>
            <Button variant="ghost" onClick={() => router.push('/roadmap')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Roadmap
            </Button>
            
            <AnimatePresence mode="wait">
                {view === 'lesson' && (
                    <motion.div key="lesson" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">{levelData.title}</CardTitle>
                                <CardDescription>{levelData.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: levelData.content || '<p>Lesson content coming soon!</p>' }} />
                            </CardContent>
                            <CardFooter>
                                {isCompleted ? (
                                    <Button disabled className="w-full"><Check className="mr-2 h-4 w-4" /> Already Completed</Button>
                                ) : (
                                    <Button onClick={() => setView('quiz')} className="w-full">Start Quiz</Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}

                {view === 'quiz' && (
                    <motion.div key="quiz" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                        <Card className="max-w-2xl mx-auto">
                            <CardHeader>
                                <CardTitle className="font-headline text-center">Quiz: {levelData.title}</CardTitle>
                                <CardDescription className="text-center">Question {currentQuestionIndex + 1} of {mockQuiz.length}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-lg font-semibold text-center">{mockQuiz[currentQuestionIndex].question}</p>
                                <div className="grid grid-cols-1 gap-3">
                                    {mockQuiz[currentQuestionIndex].options.map((option, index) => {
                                        const isSelected = selectedAnswer === option;
                                        const isCorrect = mockQuiz[currentQuestionIndex].answer === option;
                                        return (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="lg"
                                                className={cn("h-auto py-3 justify-center text-center",
                                                    selectedAnswer && isCorrect && isSelected && "bg-green-500/20 border-green-500",
                                                    selectedAnswer && !isCorrect && isSelected && "bg-destructive/20 border-destructive"
                                                )}
                                                onClick={() => handleAnswer(option)}
                                                disabled={!!selectedAnswer}
                                            >
                                                {option}
                                            </Button>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {view === 'results' && (
                    <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <Card className="text-center max-w-xl mx-auto">
                            <CardHeader>
                                <Award className={cn("h-16 w-16 mx-auto", passed ? "text-yellow-400" : "text-muted-foreground")} />
                                <CardTitle className="font-headline text-4xl">{passed ? "Level Complete!" : "Try Again"}</CardTitle>
                                <CardDescription>You scored {score} out of {mockQuiz.length} ({scorePercentage.toFixed(0)}%)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {passed ? (
                                    <div className="space-y-2">
                                        <p>Congratulations! You have mastered the material for this level.</p>
                                        <p className="font-bold">You earned {levelData.xp} XP and {levelData.coins} Coins!</p>
                                    </div>
                                ) : (
                                    <p>You need to score at least 60% to pass. Review the lesson and give it another shot!</p>
                                )}
                            </CardContent>
                            <CardFooter className="justify-center">
                                {passed ? (
                                    <Button onClick={handleCompleteLevel}>Claim Rewards & Continue</Button>
                                ) : (
                                    <Button onClick={() => {
                                        setView('lesson');
                                        setCurrentQuestionIndex(0);
                                        setScore(0);
                                        setSelectedAnswer(null);
                                    }}>Review Lesson</Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
