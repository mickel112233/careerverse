
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { generateBossRaid, GenerateBossRaidOutput } from "@/ai/flows/boss-raid-generator";
import { Loader2, Swords, Skull, CheckCircle, XCircle, Zap, Coins, Trophy, Shield, Bot } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AiAvatar } from '@/components/ui/ai-avatar';
import { AiImage } from '@/components/ui/ai-image';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

type RaidState = 'idle' | 'generating' | 'active' | 'finished';
type Player = { name: string; avatarHint: string; type: 'human' | 'bot' };
type EventLogMessage = { id: number; message: string; type: 'player' | 'boss' | 'system' };
type QuizQuestion = GenerateBossRaidOutput['quizBank'][0];

const player: Player = { name: 'QuantumLeap', avatarHint: 'cyberpunk woman portrait', type: 'human' };
const teammates: Player[] = [
    { name: 'AI-Bot-Alpha', avatarHint: 'sleek friendly robot', type: 'bot' },
    { name: 'AI-Bot-Beta', avatarHint: 'wise old android', type: 'bot' },
];

const LoadingSkeleton = () => (
     <div className="space-y-6">
        <Card className="text-center">
            <CardHeader>
                <Skeleton className="h-10 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-2" />
            </CardHeader>
            <CardContent>
                 <Skeleton className="h-40 w-40 rounded-full mx-auto" />
                 <Skeleton className="h-8 w-full max-w-sm mx-auto mt-4" />
            </CardContent>
            <CardFooter className="justify-center">
                <Skeleton className="h-12 w-48" />
            </CardFooter>
        </Card>
    </div>
);

export default function BossRaidClient() {
    const [raidState, setRaidState] = useState<RaidState>('idle');
    const [bossData, setBossData] = useState<GenerateBossRaidOutput | null>(null);
    const [bossCurrentHealth, setBossCurrentHealth] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [eventLog, setEventLog] = useState<EventLogMessage[]>([]);
    const [isShaking, setIsShaking] = useState(false);
    
    const eventLogRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const addEventLog = useCallback((message: string, type: EventLogMessage['type']) => {
        setEventLog(prev => [...prev, { id: prev.length, message, type }]);
    }, []);

    useEffect(() => {
        if(eventLogRef.current) {
            eventLogRef.current.scrollTop = eventLogRef.current.scrollHeight;
        }
    }, [eventLog]);

    const startRaid = async () => {
        setRaidState('generating');
        setBossData(null);
        setEventLog([]);

        try {
            const stream = localStorage.getItem('careerClashStream') || 'Software Development';
            addEventLog(`A new threat emerges from the ${stream} sector...`, 'system');
            const data = await generateBossRaid({ streamName: stream });
            
            setBossData(data);
            setBossCurrentHealth(data.bossHealth);
            setCurrentQuestion(data.quizBank[0]);
            addEventLog(`${data.bossName} has appeared!`, 'boss');
            
            setRaidState('active');

        } catch (error) {
            console.error("Failed to generate boss raid:", error);
            toast({ variant: 'destructive', title: 'Error', description: "Could not summon the boss. The dimensional rift is unstable. Please try again." });
            setRaidState('idle');
        }
    };

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return;

        setSelectedAnswer(answer);
        const isCorrect = answer === currentQuestion?.correctAnswer;
        
        if (isCorrect) {
            const damage = currentQuestion!.damage;
            addEventLog(`You strike a critical vulnerability! Dealt ${damage} damage.`, 'player');
            setBossCurrentHealth(prev => Math.max(0, prev - damage));
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        } else {
            addEventLog(`Your attack misses! The boss is unfazed.`, 'player');
        }

        setTimeout(() => {
            if (bossCurrentHealth - (currentQuestion?.damage || 0) <= 0 && isCorrect) {
                setRaidState('finished');
                return;
            }

            const nextQuestionIndex = bossData!.quizBank.findIndex(q => q.question === currentQuestion!.question) + 1;
            if (nextQuestionIndex < bossData!.quizBank.length) {
                setCurrentQuestion(bossData!.quizBank[nextQuestionIndex]);
                setSelectedAnswer(null);
            } else {
                // Out of questions, consider it a partial victory or special state
                 addEventLog(`You've exhausted your attack patterns! The boss is weakened but still stands.`, 'system');
                 setRaidState('finished'); // For now, end the raid.
            }
        }, 1500);
    };
    
    // Simulate teammates' attacks
    useEffect(() => {
        if (raidState !== 'active' || !bossData) return;

        const interval = setInterval(() => {
            const teammate = teammates[Math.floor(Math.random() * teammates.length)];
            const damage = Math.floor(Math.random() * 50) + 25; // 25-75 damage
            addEventLog(`${teammate.name} lands a blow for ${damage} damage!`, 'system');
            setBossCurrentHealth(prev => Math.max(0, prev - damage));
        }, 5000);

        return () => clearInterval(interval);
    }, [raidState, bossData, addEventLog]);
    
    // Check for boss defeat from teammate attacks
    useEffect(() => {
        if (bossCurrentHealth <= 0 && raidState === 'active') {
            setRaidState('finished');
        }
    }, [bossCurrentHealth, raidState]);

    const bossHealthPercentage = useMemo(() => {
        if (!bossData) return 0;
        return (bossCurrentHealth / bossData.bossHealth) * 100;
    }, [bossCurrentHealth, bossData]);
    
    if (raidState === 'generating') {
        return <LoadingSkeleton />;
    }
    
    if (raidState === 'idle') {
        return (
            <Card className="text-center bg-gradient-to-br from-card to-muted/30 border-primary/20">
                <CardHeader>
                    <Skull className="h-16 w-16 mx-auto text-primary animate-pulse" />
                    <CardTitle className="font-headline text-3xl">The Raid Altar is Silent</CardTitle>
                    <CardDescription>A powerful entity slumbers, waiting to be challenged. Gather your courage and prepare for battle.</CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Button size="lg" onClick={startRaid}>
                        <Swords className="mr-2 h-5 w-5"/> Summon the Boss
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    
    if (raidState === 'finished' && bossData) {
        const playerWon = bossCurrentHealth <= 0;
        return (
             <Card className="text-center">
                <CardHeader>
                    <CardTitle className={cn("font-headline text-5xl", playerWon ? "text-green-400" : "text-destructive")}>
                        {playerWon ? "Victory!" : "Challenged Failed"}
                    </CardTitle>
                    <CardDescription>{playerWon ? `You have vanquished ${bossData.bossName}!` : `The beast still stands. Regroup and try again.`}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <AiImage prompt={bossData.bossAvatarHint} alt={bossData.bossName} width={200} height={200} className="rounded-full border-4 border-card" />
                     {playerWon && (
                        <div className="text-center space-y-4">
                            <h3 className="text-xl font-semibold font-headline">Rewards Gained</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="p-3 bg-yellow-400/10 rounded-md text-yellow-400 font-bold"><Zap className="inline h-5 w-5 mr-1" /> +{bossData.rewards.xp.toLocaleString()} XP</div>
                                <div className="p-3 bg-amber-500/10 rounded-md text-amber-500 font-bold"><Coins className="inline h-5 w-5 mr-1" /> +{bossData.rewards.coins.toLocaleString()} Coins</div>
                                <div className="p-3 bg-purple-400/10 rounded-md text-purple-400 font-bold"><Trophy className="inline h-5 w-5 mr-1" /> Title: "{bossData.rewards.title}"</div>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-center">
                    <Button size="lg" onClick={() => setRaidState('idle')}>
                        Return to Altar
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    if (raidState === 'active' && bossData && currentQuestion) {
        return (
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Boss Info */}
                    <Card className={cn("overflow-hidden transition-all", isShaking && "animate-shake")}>
                        <CardHeader className="flex-row items-center gap-4">
                            <AiImage prompt={bossData.bossAvatarHint} alt={bossData.bossName} width={80} height={80} className="rounded-lg"/>
                            <div className="flex-1">
                                <CardTitle className="font-headline text-3xl">{bossData.bossName}</CardTitle>
                                <p className="text-sm text-muted-foreground">{bossData.bossDescription}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between font-mono text-sm">
                                    <span>HEALTH</span>
                                    <span>{bossCurrentHealth.toLocaleString()} / {bossData.bossHealth.toLocaleString()}</span>
                                </div>
                                <Progress value={bossHealthPercentage} className="h-4" />
                            </div>
                        </CardContent>
                    </Card>

                     {/* Question Area */}
                    <AnimatePresence mode="wait">
                        <motion.div
                             key={currentQuestion.question}
                             initial={{ opacity: 0, y: 30 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -30 }}
                             transition={{ duration: 0.4 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline text-center">Strike the Weak Point!</CardTitle>
                                    <CardDescription className="text-center">{currentQuestion.question}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {currentQuestion.options.map((option, index) => {
                                        const isSelected = selectedAnswer === option;
                                        const isCorrect = currentQuestion.correctAnswer === option;
                                        return (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="lg"
                                                className={cn("h-auto py-4 justify-start text-left whitespace-normal",
                                                    selectedAnswer && isCorrect && "bg-green-500/20 border-green-500 text-foreground",
                                                    selectedAnswer === option && !isCorrect && "bg-destructive/20 border-destructive text-foreground"
                                                )}
                                                onClick={() => handleAnswer(option)}
                                                disabled={!!selectedAnswer}
                                            >
                                                {selectedAnswer && isCorrect && isSelected && <CheckCircle className="h-5 w-5 mr-2 text-green-400" />}
                                                {selectedAnswer && !isCorrect && isSelected && <XCircle className="h-5 w-5 mr-2 text-red-400" />}
                                                {option}
                                            </Button>
                                        )
                                    })}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="space-y-4">
                     {/* Team Info */}
                    <Card>
                        <CardHeader><CardTitle className="font-headline">Your Raid Party</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {[player, ...teammates].map(p => (
                                <div key={p.name} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                                    <AiAvatar prompt={p.avatarHint} alt={p.name} fallback={p.name.substring(0,2)} />
                                    <div>
                                        <p className="font-semibold">{p.name}</p>
                                        <p className="text-xs text-muted-foreground">{p.type === 'human' ? 'You' : 'AI Teammate'}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    {/* Event Log */}
                     <Card>
                        <CardHeader><CardTitle className="font-headline">Battle Log</CardTitle></CardHeader>
                        <CardContent>
                            <div ref={eventLogRef} className="h-64 overflow-y-auto space-y-2 p-2 bg-muted/50 rounded-md text-sm">
                                {eventLog.map(e => (
                                    <p key={e.id} className={cn(
                                        e.type === 'player' && 'text-cyan-400',
                                        e.type === 'boss' && 'text-red-400',
                                        e.type === 'system' && 'text-muted-foreground italic',
                                    )}>{e.message}</p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return null; // Should not be reached
}
