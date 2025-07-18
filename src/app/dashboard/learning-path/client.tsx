
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateLearningRoadmap, RoadmapNode } from '@/ai/flows/learning-roadmap-generator';
import { Loader2, BookOpen, BrainCircuit, Code, Megaphone, Briefcase, Palette, Bot, Gamepad2, PenSquare, Shield, Cloud, ClipboardList, Handshake, Lock, CheckCircle, PlayCircle, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type Level = RoadmapNode & {
    slug: string;
    status: 'completed' | 'unlocked' | 'locked';
    coins: number;
};

type Stage = {
  stageName: 'Beginning' | 'Intermediate' | 'Advance';
  status: 'completed' | 'unlocked' | 'locked';
  levels: Level[];
};

type Roadmap = Stage[];

const streams = [
    { name: 'Software Development', icon: Code },
    { name: 'Data Science & AI', icon: BrainCircuit },
    { name: 'Digital Marketing', icon: Megaphone },
    { name: 'Business & Finance', icon: Briefcase },
    { name: 'Graphic Design', icon: Palette },
    { name: 'AI Prompt Engineering', icon: Bot },
    { name: 'Game Development', icon: Gamepad2 },
    { name: 'Content Creation', icon: PenSquare },
    { name: 'Cybersecurity', icon: Shield },
    { name: 'Cloud Computing', icon: Cloud },
    { name: 'Project Management', icon: ClipboardList },
    { name: 'Sales & Business Development', icon: Handshake },
];

export default function LearningPathClient() {
    const [selectedStream, setSelectedStream] = useState<string | null>(null);
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const stream = localStorage.getItem('careerClashStream');
        const storedRoadmap = localStorage.getItem('careerClashRoadmap');
        if (stream) {
            setSelectedStream(stream);
            if (storedRoadmap) {
                setRoadmap(JSON.parse(storedRoadmap));
            } else {
                fetchRoadmap(stream);
            }
        }
    }, []);

    const fetchRoadmap = async (streamName: string) => {
        setIsLoading(true);
        try {
            const streamSlug = streamName.toLowerCase().replace(/ & /g, ' ').replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-');
            const response = await fetch(`/roadmaps/${streamSlug}.json`);
            if (!response.ok) {
                toast({
                    variant: 'destructive',
                    title: 'Roadmap Not Found',
                    description: `The learning roadmap for ${streamName} is not available yet.`,
                });
                throw new Error('Roadmap not found');
            }
            const data = await response.json();
            
            const processedRoadmap: Roadmap = data.roadmap.map((stage: any, stageIndex: number) => ({
                ...stage,
                status: stageIndex === 0 ? 'unlocked' : 'locked',
                levels: stage.levels.map((level: any, levelIndex: number) => ({
                    ...level,
                    slug: level.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-'),
                    status: (stageIndex === 0 && levelIndex === 0) ? 'unlocked' : 'locked',
                    coins: Math.floor(level.xp / 10),
                }))
            }));
            
            setRoadmap(processedRoadmap);
            localStorage.setItem('careerClashStream', streamName);
            localStorage.setItem('careerClashRoadmap', JSON.stringify(processedRoadmap));

        } catch (error) {
            console.error("Failed to fetch roadmap:", error);
            setRoadmap(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStreamSelect = (streamName: string) => {
        setSelectedStream(streamName);
        fetchRoadmap(streamName);
    };

    const handleLevelSelect = (level: Level) => {
        if (level.status === 'locked') {
            toast({
                variant: 'destructive',
                title: 'Level Locked',
                description: 'You must complete the previous level to unlock this one.',
            });
            return;
        }
        router.push(`/learning/${level.slug}`);
    };

    if (!selectedStream || !roadmap) {
        return (
            <div className="space-y-8">
                 <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Choose Your Path</h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Select a career stream to begin your learning journey.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {streams.map((stream) => {
                        const Icon = stream.icon;
                        return (
                            <motion.div key={stream.name} whileHover={{ scale: 1.05, y: -5 }}>
                                <button onClick={() => handleStreamSelect(stream.name)} className="w-full h-full">
                                    <Card className="h-full bg-card/50 hover:bg-card/80 hover:border-primary/50 border-2 border-transparent transition-all">
                                        <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center text-center gap-2">
                                            <Icon className="h-10 w-10 text-primary" />
                                            <h3 className="font-semibold text-sm sm:text-base">{stream.name}</h3>
                                        </CardContent>
                                    </Card>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    }
    
    if (isLoading) {
         return <div className="flex justify-center items-center h-64"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>;
    }

    return (
        <div className="space-y-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{selectedStream}</h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">Your personalized learning roadmap. Complete levels to earn rewards and unlock the next challenge.</p>
                </div>
                <Button variant="outline" onClick={() => { setSelectedStream(null); setRoadmap(null); localStorage.removeItem('careerClashStream'); localStorage.removeItem('careerClashRoadmap'); }}>Change Path</Button>
            </header>

            <Accordion type="multiple" defaultValue={roadmap.filter(s => s.status !== 'locked').map(s => s.stageName)} className="w-full space-y-4">
                {roadmap.map((stage) => (
                    <AccordionItem key={stage.stageName} value={stage.stageName} className="bg-card/50 border rounded-lg px-4 overflow-hidden">
                        <AccordionTrigger className="text-xl font-bold font-headline hover:no-underline" disabled={stage.status === 'locked'}>
                            <div className="flex items-center gap-4">
                                {stage.status === 'locked' ? <Lock className="h-6 w-6 text-muted-foreground" /> : <Star className="h-6 w-6 text-yellow-400"/>}
                                <span>{stage.stageName}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4">
                            <AnimatePresence>
                                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {stage.levels.map(level => (
                                        <motion.div key={level.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                            <Card
                                                className={cn(
                                                    "h-full flex flex-col transition-all",
                                                    level.status === 'locked' && 'bg-muted/30 opacity-70',
                                                    level.status === 'unlocked' && 'border-primary hover:border-primary/70 hover:shadow-lg hover:shadow-primary/20 cursor-pointer',
                                                    level.status === 'completed' && 'bg-green-500/10 border-green-500/30'
                                                )}
                                                onClick={() => handleLevelSelect(level)}
                                            >
                                                <CardHeader className="flex-grow">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <CardTitle className="text-base">{level.title}</CardTitle>
                                                        {level.status === 'completed' && <CheckCircle className="h-6 w-6 text-green-400 shrink-0" />}
                                                        {level.status === 'locked' && <Lock className="h-5 w-5 text-muted-foreground shrink-0" />}
                                                    </div>
                                                    <CardDescription className="text-xs">{level.description}</CardDescription>
                                                </CardHeader>
                                                <CardFooter className="flex justify-between items-center text-xs p-3 bg-background/50">
                                                    <span><strong className="text-yellow-400">{level.xp}</strong> XP</span>
                                                    <span><strong className="text-amber-500">{level.coins}</strong> Coins</span>
                                                     {level.status !== 'locked' && (
                                                        <Button variant="ghost" size="icon" className="h-7 w-7">
                                                          <PlayCircle className="h-5 w-5 text-primary" />
                                                        </Button>
                                                    )}
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
