"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPersonalizedLearningPath, PersonalizedLearningPathOutput } from "@/ai/flows/personalized-learning-path";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb, BookMarked, Clock, List, FileText, RotateCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  skillLevel: z.string().min(1, "Please select your skill level."),
  careerGoals: z.string().min(10, "Please describe your career goals in at least 10 characters."),
  preferredLearningStyle: z.string().optional(),
  availableTime: z.string().optional(),
});

type FormState = "idle" | "generating" | "finished";

export default function LearningClient() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [learningPath, setLearningPath] = useState<PersonalizedLearningPathOutput | null>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillLevel: "",
      careerGoals: "",
      preferredLearningStyle: "visual",
      availableTime: "5-10 hours/week",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormState("generating");
    setLearningPath(null);
    try {
      const result = await getPersonalizedLearningPath(values);
      setLearningPath(result);
      setFormState("finished");
    } catch (error) {
      console.error("Failed to generate learning path:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate the learning path. Please try again.",
      });
      setFormState("idle");
    }
  }
  
  if (formState === "idle" || formState === "generating") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Craft Your Learning Journey</CardTitle>
          <CardDescription>Tell us about yourself to generate a path.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="careerGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Career Goals</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Become a principal AI engineer at a top tech company, specializing in large language models." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Skill Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredLearningStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Learning Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="visual">Visual (videos, diagrams)</SelectItem>
                          <SelectItem value="auditory">Auditory (podcasts, lectures)</SelectItem>
                          <SelectItem value="kinesthetic">Kinesthetic (hands-on projects)</SelectItem>
                          <SelectItem value="reading">Reading/Writing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="availableTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Time per Week</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-5 hours/week">1-5 hours</SelectItem>
                          <SelectItem value="5-10 hours/week">5-10 hours</SelectItem>
                          <SelectItem value="10+ hours/week">10+ hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={formState === "generating"}>
                {formState === "generating" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Path...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate My Path
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    );
  }

  if (formState === "finished" && learningPath) {
    return (
        <div>
            <Card className="mb-8 bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-primary">Your AI-Generated Learning Path</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-semibold">Here is the "why":</p>
                    <p className="text-muted-foreground">{learningPath.reasoning}</p>
                </CardContent>
            </Card>

            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {learningPath.learningPath.map((module, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="bg-card border rounded-lg mb-4 px-4">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                        <div className="flex items-center gap-4">
                            <BookMarked className="h-6 w-6 text-primary"/>
                            <span>{module.moduleName}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                        <p className="text-muted-foreground mb-4">{module.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Clock className="h-4 w-4" />
                            <span>Estimated Duration: {module.estimatedDuration}</span>
                        </div>
                        
                        <div className="mb-4">
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><List className="h-5 w-5"/> Topics Covered:</h4>
                            <ul className="list-disc list-inside space-y-1 pl-2">
                                {module.topics.map((topic, i) => <li key={i}>{topic}</li>)}
                            </ul>
                        </div>
                        
                        {module.resources && module.resources.length > 0 && (
                             <div>
                                <h4 className="font-semibold flex items-center gap-2 mb-2"><FileText className="h-5 w-5"/> Suggested Resources:</h4>
                                <ul className="list-disc list-inside space-y-1 pl-2">
                                    {module.resources.map((resource, i) => <li key={i}><a href={resource} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">{resource}</a></li>)}
                                </ul>
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
             <div className="text-center mt-8">
                <Button onClick={() => setFormState('idle')}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Start Over
                </Button>
            </div>
        </div>
    );
  }

  return null;
}
