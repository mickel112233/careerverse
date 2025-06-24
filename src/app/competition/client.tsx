
"use client";

import { useState, useEffect } from "react";
import { generateAiCompetitionQuiz, GenerateAiCompetitionQuizOutput } from "@/ai/flows/ai-competition-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap, RotateCw, ArrowLeft, BrainCircuit, Code, Megaphone, Briefcase, Palette, Bot, Gamepad2, PenSquare, Swords, Timer, Target, Coins, User, Shield, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { AiAvatar } from "@/components/ui/ai-avatar";
import { Skeleton } from "@/components/ui/skeleton";

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

// --- Types ---
type BattleStep = "select_stream" | "select_mode" | "matching" | "active" | "finished";
type BattleMode = "fixed" | "rush";
type BattleConfig = {
  mode: BattleMode;
  questions: number;
};
type Scores = { player: number; opponent: number };
type Player = { name: string; avatarHint: string; type: 'human' | 'bot' };

// --- Main Component ---
export default function CompetitionClient() {
  const [step, setStep] = useState<BattleStep>("select_stream");
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [battleConfig, setBattleConfig] = useState<BattleConfig>({ mode: "fixed", questions: 5 });
  
  const [quizData, setQuizData] = useState<GenerateAiCompetitionQuizOutput | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ player: 0, opponent: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isOpponentAnswering, setIsOpponentAnswering] = useState(false);
  const [opponentFound, setOpponentFound] = useState(false);

  const { toast } = useToast();

  const player: Player = { name: 'QuantumLeap', avatarHint: 'cyberpunk woman portrait', type: 'human' };
  const opponent: Player = { name: 'AI Bot', avatarHint: 'cyberpunk robot face', type: 'bot' };

  const handleStreamSelect = (streamName: string) => {
    setSelectedStream(streamName);
    setStep("select_mode");
  };

  const handleStartBattle = async () => {
    if (!selectedStream) return;
    setStep("matching");
    setOpponentFound(false);
    try {
      const quiz = await generateAiCompetitionQuiz({ jobRole: selectedStream, numQuestions: battleConfig.questions });
      setQuizData(quiz);
      setCurrentQuestionIndex(0);
      setScores({ player: 0, opponent: 0 });
      setSelectedAnswer(null);
      // Simulate matching time
      setTimeout(() => setOpponentFound(true), 1500);
      setTimeout(() => {
        setStep("active");
      }, 2500);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate the battle. Please try again.",
      });
      setStep("select_mode");
    }
  };

  // Simulate opponent's turn
  useEffect(() => {
    if (step === 'active' && quizData && !selectedAnswer && !isOpponentAnswering) {
      setIsOpponentAnswering(true);
      const opponentAnswerTime = Math.random() * 3000 + 1000; // 1-4 seconds
      setTimeout(() => {
        const question = quizData.questions[currentQuestionIndex];
        // 75% chance for bot to be correct
        const isCorrect = Math.random() < 0.75;
        if (isCorrect) {
            setScores(s => ({...s, opponent: s.opponent + 1}));
        }
        setIsOpponentAnswering(false);
      }, opponentAnswerTime);
    }
  }, [step, quizData, currentQuestionIndex, selectedAnswer, isOpponentAnswering]);

  const handleAnswerSelect = (answer: string) => {
    if(selectedAnswer) return; // Prevent changing answer
    setSelectedAnswer(answer);

    const question = quizData!.questions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
      setScores(s => ({...s, player: s.player + 1}));
    }
    
    // Auto-advance to next question or finish
    setTimeout(() => {
        if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
          } else {
            setStep("finished");
          }
    }, 1500);
  };

  const handleRestart = () => {
    setStep("select_stream");
    setSelectedStream(null);
    setQuizData(null);
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
              <button
                key={stream.name}
                onClick={() => handleStreamSelect(stream.name)}
                className="p-4 border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary transition-colors text-center"
              >
                <Icon className="h-10 w-10 text-primary" />
                <span className="font-semibold">{stream.name}</span>
              </button>
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
                <Button variant="ghost" size="sm" className="absolute top-4 left-4" onClick={() => setStep("select_stream")}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back
                </Button>
                <CardTitle className="font-headline text-center pt-8">Step 2: Select Your Challenge</CardTitle>
                <CardDescription className="text-center">How do you want to battle?</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div 
                    className={cn(
                        "p-6 border-2 rounded-lg cursor-pointer transition-all",
                        battleConfig.mode === 'fixed' ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-border'
                    )}
                    onClick={() => setBattleConfig(prev => ({...prev, mode: 'fixed'}))}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Target className="h-8 w-8 text-primary"/>
                        <h3 className="text-xl font-bold font-headline">Quick Clash</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">A standard quiz with a fixed number of questions. Accuracy is key.</p>
                    <Label className="font-semibold">Number of Questions</Label>
                     <ToggleGroup 
                        type="single"
                        value={String(battleConfig.questions)}
                        onValueChange={(value) => {
                            if (value) {
                                setBattleConfig({ mode: 'fixed', questions: Number(value) });
                            }
                        }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-1 mt-2"
                        disabled={battleConfig.mode !== 'fixed'}
                    >
                        {questionCounts.map(count => (
                            <ToggleGroupItem key={count} value={String(count)}>{count}</ToggleGroupItem>
))}
                    </ToggleGroup>
                </div>
                <div 
                     className={cn(
                        "p-6 border-2 rounded-lg cursor-pointer transition-all",
                        battleConfig.mode === 'rush' ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' : 'border-border/50'
                    )}
                    onClick={() => setBattleConfig(prev => ({...prev, mode: 'rush', questions: 50}))}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <Timer className="h-8 w-8 text-primary"/>
                        <h3 className="text-xl font-bold font-headline">Time Rush (PvP)</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Answer as many questions as you can before the timer runs out. Speed and correctness win.</p>
                     <div className="mt-4 space-y-2 p-4 bg-muted/50 rounded-md">
                        <Label htmlFor="coin-bet" className="font-semibold flex items-center gap-2"><Coins className="h-4 w-4 text-yellow-400" /> Place Your Bet</Label>
                        <Input id="coin-bet" type="number" placeholder="Enter coin amount..." className="bg-background" disabled/>
                        <p className="text-xs text-center text-muted-foreground pt-2">Winner-takes-all coin betting is coming soon!</p>
                    </div>
                </div>
            </CardContent>
             <CardFooter className="justify-center">
                <Button size="lg" onClick={handleStartBattle} disabled={battleConfig.mode === 'rush'}>
                    <Swords className="mr-2 h-5 w-5" />
                    Start Battle
                </Button>
            </CardFooter>
        </Card>
    )
  }

  if (step === "matching") {
    return (
      <Card className="flex flex-col items-center justify-center p-20 gap-6">
        <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
                <AiAvatar prompt={player.avatarHint} alt={player.name} fallback={player.name.charAt(0)} className="w-24 h-24 ring-4 ring-primary" />
                <p className="font-bold text-lg">{player.name}</p>
            </div>
            <Swords className="h-12 w-12 text-muted-foreground animate-pulse"/>
             <div className="flex flex-col items-center gap-2">
                {opponentFound ? (
                    <AiAvatar prompt={opponent.avatarHint} alt={opponent.name} fallback={opponent.name.charAt(0)} className="w-24 h-24" />
                ) : (
                    <Skeleton className="w-24 h-24 rounded-full" />
                )}
                <p className="font-bold text-lg">{opponentFound ? opponent.name : 'Finding Opponent...'}</p>
            </div>
        </div>
        <div className="flex items-center gap-4 mt-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h2 className="text-2xl font-headline">{opponentFound ? "Opponent Found! Starting..." : "Matching..."}</h2>
        </div>
      </Card>
    );
  }
  
  if (step === "active" && quizData) {
    const question = quizData.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    return (
        <div className="space-y-4">
            {/* Scoreboard */}
            <Card>
                <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <AiAvatar prompt={player.avatarHint} alt={player.name} fallback={player.name.charAt(0)} />
                        <div>
                            <p className="font-bold">{player.name}</p>
                            <p className="text-2xl font-bold text-primary">{scores.player}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="font-mono text-sm text-muted-foreground">Question</p>
                        <p className="font-bold text-2xl">{currentQuestionIndex + 1}/{quizData.questions.length}</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="font-bold">{opponent.name}</p>
                            <p className="text-2xl font-bold text-primary">{scores.opponent}</p>
                        </div>
                        <AiAvatar prompt={opponent.avatarHint} alt={opponent.name} fallback={opponent.name.charAt(0)} />
                    </div>
                </CardContent>
                <Progress value={((currentQuestionIndex + 1) / quizData.questions.length) * 100} />
            </Card>

            {/* Question Card */}
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

             {/* Power-ups Section */}
            <Card>
                <CardHeader className="p-3">
                    <CardTitle className="text-sm font-semibold">Power-ups</CardTitle>
                </CardHeader>
                <CardContent className="p-3 flex justify-center gap-4">
                    <Button variant="outline" size="icon" disabled><Timer className="h-5 w-5" /></Button>
                    <Button variant="outline" size="icon" disabled><Zap className="h-5 w-5" /></Button>
                    <Button variant="outline" size="icon" disabled><Shield className="h-5 w-5" /></Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  if (step === "finished" && quizData) {
    const playerWon = scores.player > scores.opponent;
    const isDraw = scores.player === scores.opponent;
    const resultText = isDraw ? "It's a Draw!" : playerWon ? "Victory!" : "Defeat!";
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle className={cn("font-headline text-5xl", playerWon && "text-green-400", !playerWon && !isDraw && "text-destructive")}>
                    {resultText}
                </CardTitle>
                <CardDescription>You competed in the "{quizData.quizTitle}" challenge.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                 <div className="flex items-end gap-8">
                    <div className="flex flex-col items-center gap-2">
                        <AiAvatar prompt={player.avatarHint} alt={player.name} fallback={player.name.charAt(0)} className="w-20 h-20" />
                        <p className="font-bold text-lg">{scores.player}</p>
                    </div>
                    <p className="text-4xl font-bold text-muted-foreground pb-6">vs</p>
                     <div className="flex flex-col items-center gap-2">
                         <AiAvatar prompt={opponent.avatarHint} alt={opponent.name} fallback={opponent.name.charAt(0)} className="w-20 h-20" />
                        <p className="font-bold text-lg">{scores.opponent}</p>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-lg">You earned:</p>
                    <p className="text-4xl font-bold text-yellow-400 my-2">+150 XP</p>
                </div>
            </CardContent>
            <CardFooter className="justify-center gap-4">
                <Button variant="outline" disabled>
                    <Heart className="mr-2 h-4 w-4" />
                    Rematch
                </Button>
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
