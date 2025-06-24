"use client";

import { useState } from "react";
import { generateAiCompetitionQuiz, GenerateAiCompetitionQuizOutput } from "@/ai/flows/ai-competition-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap, RotateCw, ArrowLeft, BrainCircuit, Code, Megaphone, Briefcase, Palette, Bot, Gamepad2, PenSquare, Swords, Timer, Target } from "lucide-react";
import { cn } from "@/lib/utils";

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
const questionCounts = [10, 20, 25, 30, 35, 40];

// --- Types ---
type BattleStep = "select_stream" | "select_mode" | "generating" | "active" | "finished";
type BattleMode = "fixed" | "rush";
type BattleConfig = {
  mode: BattleMode;
  questions: number;
};
type UserAnswers = { [key: number]: string };

// --- Main Component ---
export default function CompetitionClient() {
  const [step, setStep] = useState<BattleStep>("select_stream");
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [battleConfig, setBattleConfig] = useState<BattleConfig>({ mode: "fixed", questions: 10 });
  
  const [quizData, setQuizData] = useState<GenerateAiCompetitionQuizOutput | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [score, setScore] = useState(0);

  const { toast } = useToast();

  const handleStreamSelect = (streamName: string) => {
    setSelectedStream(streamName);
    setStep("select_mode");
  };

  const handleStartBattle = async () => {
    if (!selectedStream) return;
    setStep("generating");
    try {
      const quiz = await generateAiCompetitionQuiz({ jobRole: selectedStream, numQuestions: battleConfig.questions });
      setQuizData(quiz);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setScore(0);
      setStep("active");
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

  const handleAnswerChange = (value: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      let finalScore = 0;
      quizData?.questions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
          finalScore++;
        }
      });
      setScore(finalScore);
      setStep("finished");
    }
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
                        className="grid grid-cols-3 sm:grid-cols-6 gap-1 mt-2"
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
                    <div className="mt-4 text-center p-4 bg-muted rounded-md">
                        <p className="font-bold text-lg">Coming Soon!</p>
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

  if (step === "generating") {
    return (
      <Card className="flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-headline">Generating Your Battle...</h2>
        <p className="text-muted-foreground">The AI is crafting your challenge.</p>
      </Card>
    );
  }
  
  if (step === "active" && quizData) {
    const question = quizData.questions[currentQuestionIndex];
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{quizData.quizTitle}</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold mb-4 text-lg">{question.question}</p>
          <RadioGroup onValueChange={handleAnswerChange} value={userAnswers[currentQuestionIndex]}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNextQuestion} disabled={!userAnswers[currentQuestionIndex]}>
            {currentQuestionIndex === quizData.questions.length - 1 ? "Finish Battle" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (step === "finished" && quizData) {
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Battle Complete!</CardTitle>
                <CardDescription>You competed in the {quizData.quizTitle} challenge.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <p className="text-lg">Your score:</p>
                <p className="text-6xl font-bold text-primary my-4">
                    {score} <span className="text-2xl text-muted-foreground">/ {quizData.questions.length}</span>
                </p>
                <div className="w-full bg-muted rounded-full h-2.5 my-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(score / quizData.questions.length) * 100}%` }}></div>
                </div>
            </CardContent>
            <CardFooter className="justify-center">
                <Button onClick={handleRestart}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Start Another Battle
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return null;
}
