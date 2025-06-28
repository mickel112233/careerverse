
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generateBossRaid, GenerateBossRaidOutput } from "@/ai/flows/boss-raid-generator";
import { Loader2, Swords, Skull, CheckCircle, XCircle, Zap, Coins, Trophy, Shield, Bot, HeartCrack, Users, PlusCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AiAvatar } from '@/components/ui/ai-avatar';
import { AiImage } from '@/components/ui/ai-image';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

type RaidState = 'idle' | 'generating' | 'active' | 'finished';
type Player = { name: string; avatarHint: string; type: 'human' | 'bot' };
type EventLogMessage = { id: number; message: string; type: 'player' | 'boss' | 'system' };
type QuizQuestion = GenerateBossRaidOutput['quizBank'][0];
type GuildData = { id: string, guildName: string, members: Player[] };

const player: Player = { name: 'QuantumLeap', avatarHint: 'cyberpunk woman portrait', type: 'human' };

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
    const [partyHealth, setPartyHealth] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [eventLog, setEventLog] = useState<EventLogMessage[]>([]);
    const [isBossShaking, setIsBossShaking] = useState(false);
    const [isPartyHit, setIsPartyHit] = useState(false);
    
    const [bossLevel, setBossLevel] = useState(10);
    const [maxPlayers, setMaxPlayers] = useState(3);
    const [userGuild, setUserGuild] = useState<GuildData | null>(null);
    const [guildTeammates, setGuildTeammates] = useState<Player[]>([]);
    const [isLoadingGuild, setIsLoadingGuild] = useState(true);
    
    const eventLogRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        const guildData = localStorage.getItem('userGuild');
        if (guildData) {
            const parsedGuild = JSON.parse(guildData);
            setUserGuild(parsedGuild);
            const members: Player[] = parsedGuild.members
                .filter((m: any) => m.name !== player.name)
                .map((m: any) => ({ name: m.name, avatarHint: m.avatarHint, type: 'bot' }));
            setGuildTeammates(members);
        }
        setIsLoadingGuild(false);
    }, []);

    const teammates = useMemo(() => {
        // Shuffle teammates to get a random group for each raid
        const shuffled = [...guildTeammates].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, maxPlayers - 1);
    }, [maxPlayers, guildTeammates]);

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
            addEventLog(`A powerful threat (Lvl ${bossLevel}) emerges from the ${stream} sector...`, 'system');
            const data = await generateBossRaid({ streamName: stream, bossLevel: bossLevel });
            
            setBossData(data);
            setBossCurrentHealth(data.bossHealth);
            setPartyHealth(data.partyHealth);
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
            setIsBossShaking(true);
            setTimeout(() => setIsBossShaking(false), 350);
        } else {
            const bossDamage = currentQuestion!.bossAttackDamage;
            addEventLog(`${bossData?.bossName} retaliates! Your party takes ${bossDamage} damage.`, 'boss');
            setPartyHealth(prev => Math.max(0, prev - bossDamage));
            setIsPartyHit(true);
            setTimeout(() => setIsPartyHit(false), 350);
        }

        setTimeout(() => {
            // Check for victory or defeat
            const newBossHealth = bossCurrentHealth - (isCorrect ? (currentQuestion?.damage ?? 0) : 0);
            const newPartyHealth = partyHealth - (!isCorrect ? (currentQuestion?.bossAttackDamage ?? 0) : 0);
            if (newBossHealth <= 0 || newPartyHealth <= 0) {
                if (newBossHealth <= 0) setBossCurrentHealth(0);
                if (newPartyHealth <= 0) setPartyHealth(0);
                setRaidState('finished');
                return;
            }

            // Move to next question
            const nextQuestionIndex = bossData!.quizBank.findIndex(q => q.question === currentQuestion!.question) + 1;
            if (nextQuestionIndex < bossData!.quizBank.length) {
                setCurrentQuestion(bossData!.quizBank[nextQuestionIndex]);
                setSelectedAnswer(null);
            } else {
                 addEventLog(`You've exhausted your attack patterns! The boss is weakened but still stands.`, 'system');
                 setRaidState('finished');
            }
        }, 1500);
    };
    
    // Simulate teammates' attacks
    useEffect(() => {
        if (raidState !== 'active' || !bossData || partyHealth <= 0 || bossCurrentHealth <= 0 || teammates.length === 0) return;

        const interval = setInterval(() => {
            const teammate = teammates[Math.floor(Math.random() * teammates.length)];
            const damage = Math.floor(Math.random() * 50) + 25; // 25-75 damage
            
            setBossCurrentHealth(prev => {
                const newHealth = Math.max(0, prev - damage);
                if (newHealth > 0) {
                    addEventLog(`${teammate.name} lands a blow for ${damage} damage!`, 'system');
                }
                return newHealth;
            });

        }, 5000);

        return () => clearInterval(interval);
    }, [raidState, bossData, partyHealth, bossCurrentHealth, addEventLog, teammates]);
    
    // Check for raid end conditions from passive events
    useEffect(() => {
        if (raidState === 'active' && (bossCurrentHealth <= 0 || partyHealth <= 0)) {
            setTimeout(() => setRaidState('finished'), 500);
        }
    }, [bossCurrentHealth, partyHealth, raidState]);

    const bossHealthPercentage = useMemo(() => {
        if (!bossData) return 0;
        return (bossCurrentHealth / bossData.bossHealth) * 100;
    }, [bossCurrentHealth, bossData]);
    
    const partyHealthPercentage = useMemo(() => {
        if (!bossData) return 0;
        return (partyHealth / bossData.partyHealth) * 100;
    }, [partyHealth, bossData]);
    
    if (raidState === 'generating' || isLoadingGuild) {
        return <LoadingSkeleton />;
    }
    
    if (raidState === 'idle') {
        if (!userGuild) {
            return (
                <Card className="text-center bg-gradient-to-br from-card to-muted/30 border-primary/20">
                    <CardHeader>
                        <Shield className="h-16 w-16 mx-auto text-primary" />
                        <CardTitle className="font-headline text-3xl">Guild Membership Required</CardTitle>
                        <CardDescription>You must be a member of a guild to summon a boss. Join a guild or create your own to face these challenges.</CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center gap-4">
                        <Button asChild>
                           <Link href="/guilds"><Users className="mr-2 h-5 w-5"/> Explore Guilds</Link>
                        </Button>
                        <Button asChild variant="outline">
                           <Link href="/guilds/create"><PlusCircle className="mr-2 h-5 w-5"/> Create a Guild</Link>
                        </Button>
                    </CardFooter>
                </Card>
            );
        }
        
        return (
            <Card className="text-center bg-gradient-to-br from-card to-muted/30 border-primary/20">
                <CardHeader>
                    <motion.div initial={{ scale: 0.8, opacity: 0}} animate={{ scale: 1, opacity: 1}} transition={{ delay: 0.2, type: 'spring' }}>
                        <Skull className="h-16 w-16 mx-auto text-primary animate-pulse" />
                    </motion.div>
                    <CardTitle className="font-headline text-3xl">Configure Your Raid</CardTitle>
                    <CardDescription>Adjust the settings below and prepare for battle.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 max-w-md mx-auto px-4">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="boss-level" className="text-lg font-semibold">Boss Level</Label>
                            <span className="w-12 text-center text-xl font-bold font-headline text-primary p-2 bg-background/50 rounded-md">{bossLevel}</span>
                        </div>
                        <Slider
                            id="boss-level"
                            min={1}
                            max={35}
                            step={1}
                            value={[bossLevel]}
                            onValueChange={(value) => setBossLevel(value[0])}
                        />
                    </div>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="max-players" className="text-lg font-semibold">Max Players</Label>
                             <span className="w-12 text-center text-xl font-bold font-headline text-primary p-2 bg-background/50 rounded-md">{maxPlayers}</span>
                        </div>
                        <Slider
                            id="max-players"
                            min={1}
                            max={5}
                            step={1}
                            value={[maxPlayers]}
                            onValueChange={(value) => setMaxPlayers(value[0])}
                        />
                    </div>
                </CardContent>
                <CardFooter className="justify-center pt-6">
                    <Button size="lg" onClick={startRaid}>
                        <Swords className="mr-2 h-5 w-5"/> Summon the Boss
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    
    if (raidState === 'finished' && bossData) {
        const playerWon = bossCurrentHealth <= 0 && partyHealth > 0;
        return (
             <Card className="text-center">
                <CardHeader>
                    <motion.div initial={{ scale: 0.5, opacity: 0}} animate={{ scale: 1, opacity: 1}} transition={{type: 'spring', delay: 0.2}}>
                        {playerWon ? (
                            <Trophy className="h-20 w-20 mx-auto text-yellow-400" />
                        ) : (
                            <HeartCrack className="h-20 w-20 mx-auto text-destructive" />
                        )}
                    </motion.div>
                    <CardTitle className={cn("font-headline text-5xl mt-4", playerWon ? "text-green-400" : "text-destructive")}>
                        {playerWon ? "Victory!" : "Raid Failed"}
                    </CardTitle>
                    <CardDescription>{playerWon ? `You have vanquished ${bossData.bossName}!` : `Your party has been defeated. Regroup and try again.`}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                     {playerWon && (
                        <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.4 }}
                             className="text-center space-y-4"
                        >
                            <h3 className="text-xl font-semibold font-headline">Rewards Gained</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-yellow-400/10 rounded-md text-yellow-400 font-bold"><Zap className="inline h-5 w-5 mr-1" /> +{bossData.rewards.xp.toLocaleString()} XP</motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-amber-500/10 rounded-md text-amber-500 font-bold"><Coins className="inline h-5 w-5 mr-1" /> +{bossData.rewards.coins.toLocaleString()} Coins</motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-purple-400/10 rounded-md text-purple-400 font-bold"><Trophy className="inline h-5 w-5 mr-1" /> Title: "{bossData.rewards.title}"</motion.div>
                            </div>
                        </motion.div>
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
                    <Card className={cn("overflow-hidden transition-all", isBossShaking && "animate-shake")}>
                        <CardHeader className="flex-col sm:flex-row items-center gap-4">
                            <AiImage prompt={bossData.bossAvatarHint} alt={bossData.bossName} width={80} height={80} className="rounded-lg shrink-0"/>
                            <div className="flex-1 text-center sm:text-left">
                                <CardTitle className="font-headline text-3xl">{bossData.bossName}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">{bossData.bossDescription}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between font-mono text-sm">
                                    <span>BOSS HEALTH</span>
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
                    <Card className={cn("transition-all duration-300", isPartyHit && "bg-destructive/20 border-destructive animate-shake")}>
                        <CardHeader><CardTitle className="font-headline">Your Raid Party</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between font-mono text-sm text-green-400">
                                    <span>PARTY HEALTH</span>
                                    <span>{partyHealth.toLocaleString()} / {bossData.partyHealth.toLocaleString()}</span>
                                </div>
                                <Progress value={partyHealthPercentage} className="h-3" progressColor="bg-green-500" />
                            </div>
                            <div className="space-y-3">
                                {[player, ...teammates].map(p => (
                                    <div key={p.name} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                                        <AiAvatar prompt={p.avatarHint} alt={p.name} fallback={p.name.substring(0,2)} />
                                        <div>
                                            <p className="font-semibold">{p.name}</p>
                                            <p className="text-xs text-muted-foreground">{p.type === 'human' ? 'You' : 'AI Teammate'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    {/* Event Log */}
                     <Card>
                        <CardHeader><CardTitle className="font-headline">Battle Log</CardTitle></CardHeader>
                        <CardContent>
                            <div ref={eventLogRef} className="h-64 overflow-y-auto space-y-2 p-2 bg-muted/50 rounded-md text-sm">
                                <AnimatePresence>
                                {eventLog.map(e => (
                                    <motion.p 
                                        key={e.id} 
                                        className={cn(
                                            'transition-all',
                                            e.type === 'player' && 'text-cyan-400',
                                            e.type === 'boss' && 'text-red-400 font-medium',
                                            e.type === 'system' && 'text-muted-foreground italic',
                                        )}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >{e.message}</motion.p>
                                ))}
                                </AnimatePresence>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return null; // Should not be reached
}
