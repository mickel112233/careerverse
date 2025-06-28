
"use client";

import { useState, useEffect, useRef } from "react";
import { generateAiCompetitionQuiz, GenerateAiCompetitionQuizOutput } from "@/ai/flows/ai-competition-generator";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap, RotateCw, ArrowLeft, BrainCircuit, Code, Megaphone, Briefcase, Palette, Bot, Gamepad2, PenSquare, Swords, Timer, Target, Coins, Shield, X, LogOut, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { AiAvatar } from "@/components/ui/ai-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from 'framer-motion';

// --- Data ---
const streams = [
    { name: 'Software Development', icon: Code },
    { name: 'Data Science & AI', icon: BrainCircuit },
    { name: 'Digital Marketing', icon: Megaphone },
    { name: 'Business & Finance', icon: Briefcase },
    { name: 'Graphic Design', icon: Palette },
    { name: 'AI Prompt Engineering', icon: Bot },
    { name: 'Game Development', icon: Gamepad2 },
    { name: 'Content Creation', icon: PenSquare },
];
const questionCounts = [5, 10, 15, 20];
const timeLimits = [ { value: 60, label: '1 min' }, { value: 120, label: '2 min' }, { value: 300, label: '5 min' }, { value: 600, label: '10 min' }, { value: 1200, label: '20 min' }];
const betAmounts = [100, 200, 500, 1000, 2000, 5000, 10000];

// --- Types ---
type BattleStep = "select_stream" | "select_mode" | "matching" | "active" | "finished";
type BattleMode = "fixed" | "rush";
type BattleConfig = {
  mode: BattleMode;
  questions: number; // For fixed mode
  timeLimit: number; // in seconds for rush mode
  betAmount: number; // for rush mode
};
type Scores = { player: number; opponent: number };
type Player = { name: string; prompt: string; type: 'human' | 'bot' };

// --- Helpers ---
const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// --- Main Component ---
export default function CompetitionClient() {
  const [step, setStep] = useState<BattleStep>("select_stream");
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [battleConfig, setBattleConfig] = useState<BattleConfig>({ mode: "fixed", questions: 5, timeLimit: 60, betAmount: 100 });
  
  const [quizData, setQuizData] = useState<GenerateAiCompetitionQuizOutput | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ player: 0, opponent: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const [opponentFound, setOpponentFound] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [playerCoins, setPlayerCoins] = useState(0);
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);
  const [rewardsGiven, setRewardsGiven] = useState(false);

  const { toast } = useToast();
  const isCancelledRef = useRef(false);

  const player: Player = { name: 'QuantumLeap', prompt: 'cyberpunk woman portrait', type: 'human' };
  const opponent: Player = { name: 'AI Bot', prompt: 'cyberpunk robot face', type: 'bot' };
  
  useEffect(() => {
    const coins = parseInt(localStorage.getItem('careerClashCoins') || '100', 10);
    setPlayerCoins(coins);
  }, []);

  const handleStreamSelect = (streamName: string) => {
    setSelectedStream(streamName);
    setStep("select_mode");
  };

  const handleStartBattle = async () => {
    if (!selectedStream) return;
    
    setRewardsGiven(false);
    isCancelledRef.current = false;

    if (battleConfig.mode === 'rush') {
        if (playerCoins < battleConfig.betAmount) {
            toast({
                variant: 'destructive',
                title: 'Insufficient Coins',
                description: `You need ${battleConfig.betAmount} coins to enter this match.`,
            });
            return;
        }
        const newBalance = playerCoins - battleConfig.betAmount;
        localStorage.setItem('careerClashCoins', newBalance.toString());
        window.dispatchEvent(new Event('currencyChange'));
        setPlayerCoins(newBalance);
    }
    
    setStep("matching");
    setOpponentFound(false);
    try {
      const numQuestions = battleConfig.mode === 'rush' ? 50 : battleConfig.questions;
      const quiz = await generateAiCompetitionQuiz({ jobRole: selectedStream, numQuestions });

      if (isCancelledRef.current) return;

      setQuizData(quiz);
      setCurrentQuestionIndex(0);
      setScores({ player: 0, opponent: 0 });
      setSelectedAnswer(null);

      // Simulate matching time
      setTimeout(() => setOpponentFound(true), 1500);
      setTimeout(() => {
        setStep("active");
        if(battleConfig.mode === 'rush') {
            setTimer(battleConfig.timeLimit);
        }
      }, 2500);
    } catch (error) {
        if (isCancelledRef.current) return;
        console.error("Failed to generate quiz:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to generate the battle. Please try again.",
        });
        setStep("select_mode");
    }
  };

  // Rush Mode Timer
  useEffect(() => {
    if (step === 'active' && battleConfig.mode === 'rush' && timer !== null) {
      if (timer > 0) {
        const countdown = setInterval(() => {
          setTimer(t => (t !== null ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
      } else {
        setStep('finished');
      }
    }
  }, [step, timer, battleConfig.mode]);

  // Simulate opponent's turn
  useEffect(() => {
    let opponentInterval: NodeJS.Timeout | null = null;
    if (step === 'active' && quizData) {
        if (battleConfig.mode === 'fixed') {
             // Only run once per question for the opponent
            if (!selectedAnswer) {
                opponentInterval = setTimeout(() => {
                    const isCorrect = Math.random() < 0.75;
                    if (isCorrect) setScores(s => ({...s, opponent: s.opponent + 1}));
                }, Math.random() * 2000 + 1000); // 1-3 seconds
            }
        } else if (battleConfig.mode === 'rush') {
             // In rush mode, opponent scores periodically
             opponentInterval = setInterval(() => {
                if (Math.random() < 0.45) { 
                     setScores(s => ({ ...s, opponent: s.opponent + 1 }));
                }
            }, 3000); // Every 3 seconds
        }
    }
    return () => {
        if(opponentInterval) clearInterval(opponentInterval);
    }
  }, [step, currentQuestionIndex, selectedAnswer, battleConfig.mode, quizData]);

  useEffect(() => {
    if (step === 'finished' && quizData && !rewardsGiven) {
        const playerWon = scores.player > scores.opponent;
        const xpGained = playerWon ? 150 : (scores.player === scores.opponent ? 50 : 25);

        let coinReward = 0;
        if (battleConfig.mode === 'rush' && playerWon) {
            coinReward = battleConfig.betAmount * 2;
        }

        const currentTotalXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
        const newTotalXp = currentTotalXp + xpGained;
        localStorage.setItem('careerClashTotalXp', newTotalXp.toString());
        
        if (coinReward > 0) {
            const currentCoins = parseInt(localStorage.getItem('careerClashCoins') || '100', 10);
            const newTotalCoins = currentCoins + coinReward;
            localStorage.setItem('careerClashCoins', newTotalCoins.toString());
        }
        
        window.dispatchEvent(new Event('currencyChange'));
        setRewardsGiven(true);
    }
  }, [step, quizData, scores, battleConfig, rewardsGiven]);

  const handleAnswerSelect = (answer: string) => {
    if(selectedAnswer) return;

    setSelectedAnswer(answer);

    const question = quizData!.questions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
      setScores(s => ({...s, player: s.player + 1}));
    }
    
    const advanceNext = () => {
        if (battleConfig.mode === 'rush') {
            // In rush mode, we just move to the next question immediately
            if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
            } else {
                setStep("finished");
            }
        } else {
            // In fixed mode, we wait to show feedback
            setTimeout(() => {
                 if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null);
                } else {
                    setStep("finished");
                }
            }, 1500)
        }
    }
    
    if (battleConfig.mode === 'rush') {
        setTimeout(advanceNext, 300);
    } else {
        advanceNext();
    }
  };

  const handleRestart = () => {
    setStep("select_stream");
    setSelectedStream(null);
    setQuizData(null);
    setTimer(null);
    setRewardsGiven(false);
  };
  
  const handleCancelMatchmaking = () => {
    isCancelledRef.current = true;
    if (battleConfig.mode === 'rush') {
        const newBalance = playerCoins + battleConfig.betAmount;
        localStorage.setItem('careerClashCoins', newBalance.toString());
        window.dispatchEvent(new Event('currencyChange'));
        setPlayerCoins(newBalance);
    }
    setStep("select_mode");
  };

  const handleLeaveMatch = () => {
    if (battleConfig.mode === 'rush') {
        setTimer(0);
    } else {
        setStep('finished');
    }
    setIsLeaveConfirmOpen(false);
  };

  // -- RENDER LOGIC --

  if (step === "select_stream") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Step 1: Choose Your Arena</CardTitle>
          <CardDescription>Select a subject to prove your expertise.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {streams.map((stream) => {
            const Icon = stream.icon;
            return (
              <motion.button
                key={stream.name}
                onClick={() => handleStreamSelect(stream.name)}
                className="p-4 border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary transition-colors text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Icon className="h-10 w-10 text-primary" />
                <span className="font-semibold text-sm">{stream.name}</span>
              </motion.button>
            );
          })}
        </CardContent>
      </Card>
    );
  }
  
  if (step === "select_mode") {
    return (
        <Card>
            <CardHeader>
                <Button variant="ghost" size="sm" className="absolute top-4 left-4 h-auto" onClick={() => setStep("select_stream")}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back
                </Button>
                <CardTitle className="font-headline text-center pt-8">Step 2: Select Your Challenge</CardTitle>
                <CardDescription className="text-center">How do you want to battle?</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <motion.div 
                    className={cn(
                        "p-6 border-2 rounded-lg cursor-pointer transition-all",
                        battleConfig.mode === 'fixed' ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-border'
                    )}
                    onClick={() => setBattleConfig(prev => ({...prev, mode: 'fixed'}))}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Target className="h-8 w-8 text-primary"/>
                        <h3 className="text-xl font-bold font-headline">Quick Clash</h3>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">A standard quiz with a fixed number of questions. Accuracy is key.</p>
                    <Label className="font-semibold">Number of Questions</Label>
                     <ToggleGroup 
                        type="single"
                        value={String(battleConfig.questions)}
                        onValueChange={(value) => {
                            if (value) {
                                setBattleConfig(prev => ({ ...prev, mode: 'fixed', questions: Number(value) }));
                            }
                        }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-1 mt-2"
                        disabled={battleConfig.mode !== 'fixed'}
                    >
                        {questionCounts.map(count => (
                            <ToggleGroupItem key={count} value={String(count)}>{count}</ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </motion.div>
                <motion.div 
                     className={cn(
                        "p-6 border-2 rounded-lg cursor-pointer transition-all",
                        battleConfig.mode === 'rush' ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-border/50'
                    )}
                    onClick={() => setBattleConfig(prev => ({...prev, mode: 'rush'}))}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Timer className="h-8 w-8 text-primary"/>
                        <h3 className="text-xl font-bold font-headline">Time Rush (PvP)</h3>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm">Answer as many questions as you can before the timer runs out. Speed and correctness win.</p>
                    
                    <div className="space-y-4">
                         <div>
                            <Label className="font-semibold">Time Limit</Label>
                            <ToggleGroup 
                                type="single"
                                value={String(battleConfig.timeLimit)}
                                onValueChange={(value) => {
                                    if (value) setBattleConfig(prev => ({ ...prev, mode: 'rush', timeLimit: Number(value) }));
                                }}
                                className="grid grid-cols-3 lg:grid-cols-5 gap-1 mt-2"
                                disabled={battleConfig.mode !== 'rush'}
                            >
                                {timeLimits.map(limit => (
                                    <ToggleGroupItem key={limit.value} value={String(limit.value)}>{limit.label}</ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                        <div>
                             <Label className="font-semibold flex items-center gap-2"><Coins className="h-4 w-4 text-yellow-400" /> Bet Amount</Label>
                             <ToggleGroup 
                                type="single"
                                value={String(battleConfig.betAmount)}
                                onValueChange={(value) => {
                                    if (value) setBattleConfig(prev => ({ ...prev, mode: 'rush', betAmount: Number(value) }));
                                }}
                                className="grid grid-cols-3 lg:grid-cols-4 gap-1 mt-2"
                                disabled={battleConfig.mode !== 'rush'}
                            >
                                {betAmounts.map(amount => (
                                    <ToggleGroupItem key={amount} value={String(amount)}>{amount >= 1000 ? `${amount/1000}k`: amount}</ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>
                    </div>
                </motion.div>
            </CardContent>
             <CardFooter className="justify-center">
                <Button size="lg" onClick={handleStartBattle}>
                    <Swords className="mr-2 h-5 w-5" />
                    Start Battle
                </Button>
            </CardFooter>
        </Card>
    )
  }

  if (step === "matching") {
    return (
      <Card className="flex flex-col items-center justify-center p-6 sm:p-10 gap-6">
        <CardContent className="p-0 flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-4 sm:gap-8">
                <div className="flex flex-col items-center gap-2">
                    <AiAvatar prompt={player.prompt} alt={player.name} fallback={player.name.charAt(0)} className="w-20 h-20 sm:w-24 sm:h-24 ring-4 ring-primary" />
                    <p className="font-bold text-base sm:text-lg">{player.name}</p>
                </div>
                <motion.div
                    animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                >
                    <Swords className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground"/>
                </motion.div>
                <div className="flex flex-col items-center gap-2">
                    {opponentFound ? (
                         <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring"}}>
                            <AiAvatar prompt={opponent.prompt} alt={opponent.name} fallback={opponent.name.charAt(0)} className="w-20 h-20 sm:w-24 sm:h-24" />
                        </motion.div>
                    ) : (
                        <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
                    )}
                    <p className="font-bold text-base sm:text-lg">{opponentFound ? opponent.name : 'Searching...'}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <h2 className="text-xl sm:text-2xl font-headline">{opponentFound ? "Opponent Found! Starting..." : "Matching..."}</h2>
            </div>
        </CardContent>
        <CardFooter className="p-0 pt-6">
            <Button variant="outline" onClick={handleCancelMatchmaking} disabled={opponentFound}>
                <X className="mr-2 h-4 w-4" />
                Cancel Search
            </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (step === "active" && quizData) {
    const question = quizData.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const progressValue = battleConfig.mode === 'fixed' 
        ? ((currentQuestionIndex + 1) / quizData.questions.length) * 100
        : (timer! / battleConfig.timeLimit) * 100;
        
    return (
        <>
            <AlertDialog open={isLeaveConfirmOpen} onOpenChange={setIsLeaveConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to forfeit?</AlertDialogTitle>
                        <AlertDialogDescription>
                           You will lose the match and any coins you have bet. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Stay in Battle</AlertDialogCancel>
                        <AlertDialogAction className={cn(buttonVariants({ variant: "destructive" }))} onClick={handleLeaveMatch}>Forfeit Match</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="space-y-4">
                {/* Scoreboard */}
                <Card>
                    <CardContent className="p-2 sm:p-4 flex justify-between items-center relative">
                         <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 sm:top-2 sm:right-2 text-muted-foreground hover:text-destructive" onClick={() => setIsLeaveConfirmOpen(true)}>
                                        <LogOut className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Forfeit Match</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <AiAvatar prompt={player.prompt} alt={player.name} fallback={player.name.charAt(0)} className="w-10 h-10 sm:w-12 sm:h-12" />
                            <div className="text-center sm:text-left">
                                <p className="font-bold hidden sm:block">{player.name}</p>
                                <p className="text-2xl font-bold text-primary">{scores.player}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            {battleConfig.mode === 'fixed' ? (
                                <>
                                    <p className="font-mono text-xs sm:text-sm text-muted-foreground">Question</p>
                                    <p className="font-bold text-xl sm:text-2xl">{currentQuestionIndex + 1}/{quizData.questions.length}</p>
                                </>
                            ) : (
                                <>
                                    <p className="font-mono text-xs sm:text-sm text-muted-foreground">Time Left</p>
                                    <p className="font-bold text-xl sm:text-2xl font-mono">{formatTime(timer || 0)}</p>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="text-center sm:text-right">
                                <p className="font-bold hidden sm:block">{opponent.name}</p>
                                <p className="text-2xl font-bold text-primary">{scores.opponent}</p>
                            </div>
                            <AiAvatar prompt={opponent.prompt} alt={opponent.name} fallback={opponent.name.charAt(0)} className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                    </CardContent>
                    <Progress value={progressValue} />
                </Card>

                {/* Question Card */}
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-center">{quizData.quizTitle}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold mb-6 text-center text-lg">{question.question}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {question.options.map((option, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="lg"
                                        className={cn(
                                            "h-auto py-4 justify-start text-left whitespace-normal",
                                            selectedAnswer && option === question.correctAnswer && "bg-green-500/20 border-green-500 text-foreground",
                                            selectedAnswer === option && !isCorrect && "bg-destructive/20 border-destructive text-foreground"
                                        )}
                                        onClick={() => handleAnswerSelect(option)}
                                        disabled={!!selectedAnswer}
                                    >
                                        {option}
                                    </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
  }

  if (step === "finished" && quizData) {
    const playerWon = scores.player > scores.opponent;
    const isDraw = scores.player === scores.opponent;
    const resultText = isDraw ? "It's a Draw!" : playerWon ? "Victory!" : "Defeat!";
    const xpGained = playerWon ? 150 : isDraw ? 50 : 25;
    
    let coinReward = 0;
    if (battleConfig.mode === 'rush' && playerWon) {
        coinReward = battleConfig.betAmount * 2;
    }

    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle className={cn("font-headline text-4xl sm:text-5xl", playerWon && "text-green-400", !playerWon && !isDraw && "text-destructive")}>
                    {resultText}
                </CardTitle>
                <CardDescription>You competed in the "{quizData.quizTitle}" challenge.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                 <div className="flex items-end gap-4 sm:gap-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-2">
                        <AiAvatar prompt={player.prompt} alt={player.name} fallback={player.name.charAt(0)} className="w-16 h-16 sm:w-20 sm:h-20" />
                        <p className="font-bold text-lg">{scores.player}</p>
                    </motion.div>
                    <p className="text-3xl sm:text-4xl font-bold text-muted-foreground pb-6">vs</p>
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-center gap-2">
                         <AiAvatar prompt={opponent.prompt} alt={opponent.name} fallback={opponent.name.charAt(0)} className="w-16 h-16 sm:w-20 sm:h-20" />
                        <p className="font-bold text-lg">{scores.opponent}</p>
                    </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-center space-y-2">
                    <div>
                        <p className="text-lg">You earned:</p>
                        <p className="text-3xl sm:text-4xl font-bold text-yellow-400 my-2">+{xpGained} XP</p>
                    </div>
                    {coinReward > 0 && (
                        <div>
                            <p className="text-lg">You won:</p>
                             <p className="text-3xl sm:text-4xl font-bold text-primary my-2 flex items-center justify-center gap-2">
                                <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400"/>
                                {coinReward}
                            </p>
                        </div>
                    )}
                </motion.div>
            </CardContent>
            <CardFooter className="justify-center gap-4">
                <Button onClick={handleRestart}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    New Battle
                </Button>
                 <Button asChild variant="secondary">
                   <Link href="/dashboard">
                        Go to Dashboard
                   </Link>
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return null;
}
