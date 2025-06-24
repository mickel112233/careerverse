'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight } from 'lucide-react';

const sampleLearningContent = {
    introduction: "This is an introduction to the topic. It covers the basic concepts and provides a foundation for more advanced topics.",
    sections: [
        {
            title: "Core Concepts",
            content: "Here we dive into the core concepts. This section will explain the fundamental ideas and principles. We'll use examples to illustrate each point."
        },
        {
            title: "Advanced Techniques",
            content: "Building on the basics, this section introduces more advanced techniques and strategies. You'll learn how to apply your knowledge to complex problems."
        }
    ],
    summary: "To summarize, we've covered the basics and moved on to more advanced ideas. You should now have a good understanding of the topic."
}

const QuizView = ({ onBack, onSubmit }: { onBack: () => void, onSubmit: () => void }) => (
    <Card>
        <CardHeader>
            <CardTitle>Challenge Time!</CardTitle>
            <CardDescription>Test your knowledge on the topic.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Quiz questions will appear here.</p>
            <p className="mt-4 text-sm text-muted-foreground">For now, we'll assume you passed.</p>
        </CardContent>
        <CardFooter className="justify-between">
            <Button variant="outline" onClick={onBack}>Back to Lesson</Button>
            <Button onClick={onSubmit}>Submit Answers</Button>
        </CardFooter>
    </Card>
)

const ResultsView = () => (
     <Card>
        <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Here's how you did.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Your score, charts, and graphs will be displayed here.</p>
        </CardContent>
        <CardFooter>
            <Button>Next Level</Button>
        </CardFooter>
    </Card>
)

type LearningState = 'loading' | 'studying' | 'quizzing' | 'results';

export default function LearningFlowClient({ topic }: { topic: string }) {
    const [state, setState] = useState<LearningState>('loading');
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        setState('loading');
        const timer = setTimeout(() => {
            setContent(sampleLearningContent);
            setState('studying');
        }, 1500);

        return () => clearTimeout(timer);
    }, [topic]);

    if (state === 'loading') {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="ml-4 text-lg">Generating your lesson...</p>
            </div>
        );
    }
    
    if (state === 'studying' && content) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Learning Material</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none space-y-6">
                    <p className="text-lg">{content.introduction}</p>
                    {content.sections.map((section: any, index: number) => (
                        <div key={index}>
                            <h3 className="font-headline text-xl text-primary">{section.title}</h3>
                            <p className="text-muted-foreground">{section.content}</p>
                        </div>
                    ))}
                    <p>{content.summary}</p>
                </CardContent>
                <CardFooter>
                    <Button size="lg" onClick={() => setState('quizzing')}>
                        I'm Ready, Start the Challenge
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    if (state === 'quizzing') {
        return <QuizView onBack={() => setState('studying')} onSubmit={() => setState('results')} />;
    }
    
    if (state === 'results') {
        return <ResultsView />;
    }

    return null;
}
