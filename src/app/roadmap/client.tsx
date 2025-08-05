
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { generateLearningRoadmap, GenerateLearningRoadmapOutput } from '@/ai/flows/learning-roadmap-generator';
import { Check, Lock, Star, Code, Palette, Megaphone, BrainCircuit, Bot, Gamepad2, PenSquare, Briefcase, Handshake, Cloud, ClipboardList, Rocket, Tv, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Roadmap = GenerateLearningRoadmapOutput;
type RoadmapLevel = Roadmap['levels'][0] & { status: 'completed' | 'unlocked' | 'locked' };

const streams = [
    { name: 'Canva Design', icon: Palette, category: 'creativity' },
    { name: 'ChatGPT Prompt Engineering', icon: Bot, category: 'technical' },
    { name: 'Social Media Management', icon: Megaphone, category: 'social' },
    { name: 'Reels & Shorts Video Editing', icon: Tv, category: 'creativity' },
    { name: 'Basic SEO', icon: BrainCircuit, category: 'technical' },
    { name: 'Affiliate Marketing', icon: Handshake, category: 'social' },
    { name: 'Copywriting', icon: PenSquare, category: 'creativity' },
    { name: 'Resume & LinkedIn Optimization', icon: Briefcase, category: 'social' },
    { name: 'Digital Product Creation', icon: Sparkles, category: 'leadership' },
    { name: 'AI Literacy', icon: Rocket, category: 'logic' }
];

const LoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
             <Skeleton key={i} className="h-16 w-full" />
        ))}
    </div>
);

export default function RoadmapClient() {
    const [selectedStream, setSelectedStream] = useState<string | null>(null);
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set());
    const { toast } = useToast();

    useEffect(() => {
        const stream = localStorage.getItem('careerClashStream');
        const storedRoadmap = localStorage.getItem('careerClashRoadmap');
        const storedCompleted = localStorage.getItem('careerClashCompletedLevels');
        
        if (stream) {
            setSelectedStream(stream);
            if (storedRoadmap) {
                try {
                    const parsedRoadmap = JSON.parse(storedRoadmap);
                    // Check if the stored roadmap matches the selected stream
                    if (parsedRoadmap.streamName === stream) {
                        setRoadmap(parsedRoadmap);
                    } else {
                        // Mismatch, so fetch a new one
                        fetchRoadmap(stream);
                    }
                } catch {
                     fetchRoadmap(stream); //
                }
            } else {
                fetchRoadmap(stream);
            }
        }
        if (storedCompleted) {
            setCompletedLevels(new Set(JSON.parse(storedCompleted)));
        }
        setIsLoading(false);
    }, []);

    const fetchRoadmap = async (stream: string) => {
        setIsGenerating(true);
        try {
            const generatedRoadmap = await generateLearningRoadmap({ streamName: stream });
            setRoadmap(generatedRoadmap);
            localStorage.setItem('careerClashRoadmap', JSON.stringify(generatedRoadmap));
        } catch (error) {
            console.error("Failed to generate roadmap:", error);
            toast({
                variant: "destructive",
                title: "Failed to generate roadmap",
                description: "The AI failed to create a learning path. Please try again.",
            });
            setSelectedStream(null);
            localStorage.removeItem('careerClashStream');
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleStreamSelect = (streamName: string) => {
        setSelectedStream(streamName);
        localStorage.setItem('careerClashStream', streamName);
        
        // Reset progress when changing streams
        setRoadmap(null);
        localStorage.removeItem('careerClashRoadmap');
        localStorage.removeItem('careerClashCompletedLevels');
        setCompletedLevels(new Set());
        fetchRoadmap(streamName);
    };

    const enhancedLevels = useMemo(() => {
        if (!roadmap) return [];
        let previousLevelCompleted = true;

        return roadmap.levels.map(level => {
            const isCompleted = completedLevels.has(level.id);
            let status: RoadmapLevel['status'] = 'locked';
            if (isCompleted) {
                status = 'completed';
            } else if (previousLevelCompleted) {
                status = 'unlocked';
            }
            // After finding the first unlocked level, all subsequent non-completed levels are locked
            if (status === 'unlocked' && !isCompleted) {
                previousLevelCompleted = false;
            }
            return { ...level, status };
        });
    }, [roadmap, completedLevels]);

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!selectedStream) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Choose Your Skill Path</CardTitle>
                    <CardDescription>Select a skill to begin your learning journey. This will become your primary focus.</CardDescription>
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
    
    if (isGenerating || !roadmap) {
         return (
            <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-card/50">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                    <Bot className="h-16 w-16 text-primary mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold font-headline">Generating Your Learning Path...</h2>
                <p className="text-muted-foreground mt-2">Our AI is crafting a personalized 100-level roadmap for <span className="text-primary font-semibold">{selectedStream}</span>. This might take a moment.</p>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="font-headline text-2xl">{selectedStream} Roadmap</CardTitle>
                        <CardDescription>Your 100-level path to mastering {selectedStream}.</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedStream(null)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Change Path
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                 <div className="w-full space-y-2">
                    <AnimatePresence>
                        {enhancedLevels.map((level, levelIndex) => {
                            const Icon = level.status === 'completed' ? Check : level.status === 'unlocked' ? ArrowRight : Lock;
                            const isClickable = level.status !== 'locked';
                            const cardContent = (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: levelIndex * 0.02 }}
                                    className={cn("flex items-center gap-4 p-3 rounded-md transition-colors",
                                        isClickable && "hover:bg-muted/50",
                                        !isClickable && "cursor-not-allowed opacity-60"
                                    )}
                                >
                                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                                        level.status === 'completed' ? 'bg-green-500 text-white' :
                                        level.status === 'unlocked' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    )}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{level.title}</p>
                                        <p className="text-xs text-muted-foreground">{level.description}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm font-semibold shrink-0">
                                        <Badge variant="secondary">{level.xp} XP</Badge>
                                        <Badge variant="secondary">{level.coins} Coins</Badge>
                                    </div>
                                </motion.div>
                            );

                            if (isClickable) {
                                return (
                                    <Link href={`/learning/${level.id}`} key={level.id}>
                                        {cardContent}
                                    </Link>
                                );
                            }
                            return <div key={level.id}>{cardContent}</div>;
                        })}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    );
}
