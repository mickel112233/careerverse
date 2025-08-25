
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { allStreams, getRoadmapByStream, Roadmap, RoadmapLevel as BaseRoadmapLevel } from '@/lib/roadmap-data';
import { Check, Lock, ArrowRight, ArrowLeft, Bot, Coins, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type RoadmapLevel = BaseRoadmapLevel & { status: 'completed' | 'unlocked' | 'locked' };

const LoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
             <Skeleton key={i} className="h-16 w-full" />
        ))}
    </div>
);

const LevelRow = ({ level, isClickable }: { level: RoadmapLevel, isClickable: boolean }) => {
    const Icon = level.status === 'completed' ? Check : level.status === 'unlocked' ? ArrowRight : Lock;
    const cardContent = (
        <div
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
                <Badge variant="secondary" className="flex items-center gap-1"><Zap className="h-3 w-3" />{level.xp} XP</Badge>
                <Badge variant="secondary" className="flex items-center gap-1"><Coins className="h-3 w-3" />{level.coins}</Badge>
            </div>
        </div>
    );
    if (isClickable) {
        return <Link href={`/learning/${level.id}`} key={level.id}>{cardContent}</Link>;
    }
    return <div key={level.id}>{cardContent}</div>;
}

export default function RoadmapClient() {
    const [selectedStream, setSelectedStream] = useState<string | null>(null);
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set());
    const { toast } = useToast();

    useEffect(() => {
        const stream = localStorage.getItem('careerClashStream');
        if (stream) {
            setSelectedStream(stream);
            const staticRoadmap = getRoadmapByStream(stream);
            setRoadmap(staticRoadmap);
        }

        const storedCompleted = localStorage.getItem('careerClashCompletedLevels');
        if (storedCompleted) {
            setCompletedLevels(new Set(JSON.parse(storedCompleted)));
        }

        setIsLoading(false);
    }, []);

    const handleStreamSelect = (streamName: string) => {
        const newRoadmap = getRoadmapByStream(streamName);
        if (newRoadmap) {
            setSelectedStream(streamName);
            setRoadmap(newRoadmap);
            localStorage.setItem('careerClashStream', streamName);
            localStorage.removeItem('careerClashCompletedLevels');
            setCompletedLevels(new Set());
            
            toast({
                title: `Path Selected: ${streamName}`,
                description: 'Your learning journey has begun!',
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Roadmap Not Available',
                description: `The learning path for "${streamName}" is not yet available.`,
            });
        }
    };

    const groupedLevels = useMemo(() => {
        if (!roadmap) return [];
        let previousLevelCompleted = true;

        const enhancedLevels = roadmap.levels.map(level => {
            const isCompleted = completedLevels.has(level.id);
            let status: RoadmapLevel['status'] = 'locked';
            if (isCompleted) {
                status = 'completed';
            } else if (previousLevelCompleted) {
                status = 'unlocked';
            }
            if (status === 'unlocked' && !isCompleted) {
                previousLevelCompleted = false;
            }
            return { ...level, status };
        });

        return enhancedLevels.reduce((acc, level) => {
            const stage = level.stage || 'Stage 1';
            if (!acc[stage]) {
                acc[stage] = [];
            }
            acc[stage].push(level);
            return acc;
        }, {} as { [key: string]: RoadmapLevel[] });

    }, [roadmap, completedLevels]);

    const stageNames = useMemo(() => Object.keys(groupedLevels), [groupedLevels]);
    
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!selectedStream || !roadmap) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Choose Your Skill Path</CardTitle>
                    <CardDescription>Select a skill to begin your learning journey. This will become your primary focus.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allStreams.map((stream) => {
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

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="font-headline text-2xl">{selectedStream} Roadmap</CardTitle>
                        <CardDescription>Your path to mastering {selectedStream}.</CardDescription>
                    </div>
                     <Button variant="outline" onClick={() => {
                        setSelectedStream(null);
                        setRoadmap(null);
                        localStorage.removeItem('careerClashStream');
                     }}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Change Path
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full" defaultValue={stageNames[0]}>
                    {stageNames.map((stageName) => {
                        const levelsInStage = groupedLevels[stageName];
                        const isStageUnlocked = levelsInStage.some(l => l.status !== 'locked');
                        
                        return (
                            <AccordionItem value={stageName} key={stageName} disabled={!isStageUnlocked}>
                                <AccordionTrigger className="text-lg font-headline disabled:opacity-50">
                                    {stageName}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="w-full space-y-2">
                                        <AnimatePresence>
                                            {levelsInStage.map((level, levelIndex) => {
                                                const isClickable = level.status !== 'locked';
                                                return (
                                                    <motion.div
                                                        key={level.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: levelIndex * 0.05 }}
                                                    >
                                                        <LevelRow level={level} isClickable={isClickable} />
                                                    </motion.div>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                 </Accordion>
            </CardContent>
        </Card>
    );
}
