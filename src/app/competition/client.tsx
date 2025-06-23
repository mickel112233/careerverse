"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateAiCompetitionQuiz, GenerateAiCompetitionQuizOutput } from "@/ai/flows/ai-competition-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Zap, RotateCw } from "lucide-react";

const formSchema = z.object({
  jobRole: z.string().min(2, "Job role must be at least 2 characters.").max(50, "Job role is too long."),
});

type QuizState = "idle" | "generating" | "active" | "finished";
type UserAnswers = { [key: number]: string };

export default function CompetitionClient() {
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [quizData, setQuizData] = useState<GenerateAiCompetitionQuizOutput | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [score, setScore] = useState(0);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRole: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuizState("generating");
    try {
      const quiz = await generateAiCompetitionQuiz({ jobRole: values.jobRole, numQuestions: 5 });
      setQuizData(quiz);
      setQuizState("active");
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setScore(0);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate the quiz. Please try again.",
      });
      setQuizState("idle");
    }
  }

  const handleAnswerChange = (value: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quizData?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finish quiz and calculate score
      let finalScore = 0;
      quizData?.questions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
          finalScore++;
        }
      });
      setScore(finalScore);
      setQuizState("finished");
    }
  };

  const handleRestart = () => {
    setQuizState("idle");
    setQuizData(null);
    form.reset();
  }

  if (quizState === "idle" || quizState === "generating") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate Your Challenge</CardTitle>
          <CardDescription>Enter a job role to create a custom quiz.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="jobRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Senior Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={quizState === "generating"}>
                {quizState === "generating" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Quiz
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    );
  }

  if (quizState === "active" && quizData) {
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
            {currentQuestionIndex === quizData.questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (quizState === "finished" && quizData) {
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
                    Take Another Quiz
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return null;
}
