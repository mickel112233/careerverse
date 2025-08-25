
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
import { Progress } from '@/components/ui/progress';

type RoadmapLevel = BaseRoadmapLevel & { status: 'completed' | 'unlocked' | 'locked' };

const LoadingSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
             <Skeleton key={i} className="h-20 w-full" />
        ))}
    </div>
);

const LevelRow = ({ level, isClickable }: { level: RoadmapLevel, isClickable: boolean }) => {
    const Icon = level.status === 'completed' ? Check : level.status === 'unlocked' ? ArrowRight : Lock;
    
    const cardContent = (
         <motion.div 
            whileHover={isClickable ? { scale: 1.02, x: 5 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className={cn("flex items-center gap-4 p-4 rounded-lg transition-colors border",
                level.status === 'completed' ? "bg-green-500/10 border-green-500/20" : 
                level.status === 'unlocked' ? "bg-card hover:bg-muted/50 border-border" : 
                "bg-muted/30 border-muted/50 opacity-60 cursor-not-allowed"
            )}
        >
            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0 text-white",
                level.status === 'completed' ? 'bg-green-500' :
                level.status === 'unlocked' ? 'bg-primary' : 'bg-muted-foreground'
            )}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex-grow">
                <p className="font-semibold">{level.title}</p>
                <p className="text-xs text-muted-foreground">{level.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 text-sm font-semibold shrink-0">
                <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-400/10 text-yellow-400 border-yellow-400/20">
                    <Zap className="h-3 w-3" />{level.xp} XP
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 bg-amber-500/10 text-amber-500 border-amber-500/20">
                    <Coins className="h-3 w-3" />{level.coins}
                </Badge>
            </div>
        </motion.div>
    );

    if (isClickable) {
        return <Link href={`/learning/${level.id}`} key={level.id} className="block">{cardContent}</Link>;
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
            if (status !== 'completed') {
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
                        <CardDescription>Your {roadmap.levels.length}-level path to mastering {selectedStream}.</CardDescription>
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
                 <Accordion type="multiple" className="w-full space-y-4" defaultValue={stageNames}>
                    {stageNames.map((stageName) => {
                        const levelsInStage = groupedLevels[stageName];
                        const completedInStage = levelsInStage.filter(l => l.status === 'completed').length;
                        const progress = (completedInStage / levelsInStage.length) * 100;
                        
                        return (
                            <AccordionItem value={stageName} key={stageName} className="border-b-0">
                                <AccordionTrigger className="text-lg font-headline p-4 bg-muted/50 rounded-lg hover:bg-muted data-[state=open]:rounded-b-none">
                                    <div className="flex-1 text-left space-y-2">
                                        <span>{stageName}</span>
                                        <div className="flex items-center gap-2">
                                            <Progress value={progress} className="h-2 w-full max-w-xs"/>
                                            <span className="text-sm font-mono text-muted-foreground">{completedInStage}/{levelsInStage.length}</span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 bg-card border border-t-0 rounded-b-lg">
                                    <div className="w-full space-y-3">
                                        <AnimatePresence>
                                            {levelsInStage.map((level, levelIndex) => {
                                                const isClickable = level.status !== 'locked';
                                                return (
                                                    <motion.div
                                                        key={level.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 20 }}
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
