
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateLearningRoadmap } from '@/ai/flows/learning-roadmap-generator';
import { Loader2, BookOpenCheck, Code, BrainCircuit, Megaphone, Briefcase, Palette, Bot, Gamepad2, PenSquare, Lock, Star, Swords, PenTool, Trophy, Zap, Coins, CheckCircle, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';


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

type Level = {
  title: string;
  slug: string;
  status: 'completed' | 'unlocked' | 'locked';
  description: string;
  xp: number;
  coins: number;
};

type Stage = {
  stageName: string;
  status: 'completed' | 'unlocked' | 'locked';
  levels: Level[];
};

const roadmapIcons = [Code, Swords, PenTool, Star, Trophy, BrainCircuit, Gamepad2];

const LevelCard = ({ level, isStageLocked }: { level: Level, isStageLocked: boolean }) => {
  const Icon = roadmapIcons[Math.floor(Math.random() * roadmapIcons.length)];
  const isPlayable = !isStageLocked && level.status !== 'locked';

  return (
    <Card className={cn('w-full transition-all', 
        !isPlayable && 'bg-muted/50 opacity-70',
        level.status === 'unlocked' && !isStageLocked && 'border-primary shadow-md shadow-primary/20', 
        level.status === 'completed' && 'border-green-500/30'
    )}>
        <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
            <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', 
                level.status === 'completed' ? 'bg-green-400/20' : 'bg-muted',
                level.status === 'unlocked' && !isStageLocked && 'ring-2 ring-primary animate-pulse-slow'
            )}>
                {level.status === 'completed' ? <CheckCircle className="h-6 w-6 text-green-400" /> : <Icon className="h-6 w-6 text-muted-foreground" />}
            </div>
            <div>
                <CardTitle className="text-base font-semibold leading-tight">{level.title}</CardTitle>
                <CardDescription className="text-xs mt-1">{level.description}</CardDescription>
                <div className="flex items-center gap-4 text-xs font-bold mt-2">
                    <span className="flex items-center text-yellow-400"><Zap className="h-4 w-4 mr-1" /> {level.xp} XP</span>
                    <span className="flex items-center text-amber-500"><Coins className="h-4 w-4 mr-1" /> {level.coins}</span>
                </div>
            </div>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
            <Button asChild size="sm" className="w-full" disabled={!isPlayable}>
            <Link href={isPlayable ? `/learning/${level.slug}` : '#'}>
                {level.status === 'completed' ? 'Review Challenge' : 'Start Challenge'}
            </Link>
            </Button>
        </CardFooter>
    </Card>
  )
}

const RoadmapSkeleton = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
        ))}
    </div>
);

export default function DashboardClient() {
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<Stage[]>([]);
  const [streamToConfirm, setStreamToConfirm] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const { toast } = useToast();

  const [isUnlockInfoOpen, setIsUnlockInfoOpen] = useState(false);
  const [stageForInfo, setStageForInfo] = useState<{ stageName: string; requiredStage: string | null; } | null>(null);

  useEffect(() => {
    const checkPremium = () => {
        const membership = localStorage.getItem('careerClashMembership');
        setIsPremium(membership !== null && membership !== 'Free' && membership !== 'Basic');
    }
    checkPremium();
    window.addEventListener('currencyChange', checkPremium);

    const storedStream = localStorage.getItem('careerClashStream');
    const storedRoadmap = localStorage.getItem('careerClashRoadmap');

    if (storedStream && storedRoadmap) {
        setSelectedStream(storedStream);
        try {
          const parsedRoadmap = JSON.parse(storedRoadmap);
          setRoadmap(parsedRoadmap);
        } catch (e) {
          console.error("Failed to parse roadmap from localStorage", e);
          // Handle corrupted data, e.g., by clearing it
          localStorage.removeItem('careerClashRoadmap');
          setIsDialogOpen(true);
        }
    } else {
        setIsDialogOpen(true); // Force selection on first visit
    }
    setIsLoadingRoadmap(false);

    return () => window.removeEventListener('currencyChange', checkPremium);
  }, []);

  const handleStreamChange = async (streamName: string) => {
    setStreamToConfirm(null);
    setIsDialogOpen(false); 
    setIsLoadingRoadmap(true);
    setSelectedStream(streamName);
    setRoadmap([]);

    try {
        const result = await generateLearningRoadmap({ streamName });

        if (!result || !result.roadmap) {
            throw new Error("Invalid roadmap data received from AI.");
        }

        const newRoadmap: Stage[] = result.roadmap.map((stage, stageIndex) => ({
            stageName: stage.stageName,
            status: stageIndex === 0 ? 'unlocked' : 'locked',
            levels: stage.levels.map((node, levelIndex) => ({
                title: node.title,
                slug: node.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-'),
                status: stageIndex === 0 && levelIndex === 0 ? 'unlocked' : 'locked',
                description: node.description,
                xp: node.xp,
                coins: Math.floor(node.xp / 5),
            }))
        }));
        
        setRoadmap(newRoadmap);
        
        localStorage.setItem('careerClashStream', streamName);
        localStorage.setItem('careerClashRoadmap', JSON.stringify(newRoadmap));
        localStorage.setItem('careerClashTotalXp', '0');
        localStorage.setItem('careerClashCoins', '100');
        localStorage.setItem('careerClashGems', '5');
        localStorage.setItem('careerClashPrestige', '0');
        window.dispatchEvent(new Event('currencyChange'));
    } catch (error) {
        console.error("Failed to generate roadmap:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to generate your learning path. Please try again.",
        });
        setSelectedStream(null);
    } finally {
        setIsLoadingRoadmap(false);
    }
};

  const openConfirmation = (streamName: string) => {
    setStreamToConfirm(streamName);
  };
  
  const cancelConfirmation = () => {
    setStreamToConfirm(null);
  };

  const activeStageIndex = roadmap.findLastIndex(stage => stage.status === 'unlocked' && stage.levels && !stage.levels.every(l => l.status === 'completed'))

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-between items-start mb-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Your Learning Roadmap</h1>
          <p className="mt-2 text-muted-foreground">
            {selectedStream ? `Your path to mastering ${selectedStream}.` : 'Choose a subject to begin.'}
          </p>
        </div>
        <div>
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                <BookOpenCheck className="mr-2 h-4 w-4" />
                {selectedStream ? 'Change Subject' : 'Choose Subject'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                <DialogTitle>Choose Your Subject</DialogTitle>
                <DialogDescription>
                    Select a learning path to begin your journey. This will reset your current progress.
                </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                {streams.map((stream) => {
                    const Icon = stream.icon;
                    return (
                        <Button
                        key={stream.name}
                        variant="outline"
                        className="h-28 flex flex-col items-center justify-center gap-2 text-center p-2"
                        onClick={() => openConfirmation(stream.name)}
                        >
                        <Icon className="h-8 w-8 text-primary" />
                        <span className="text-sm font-semibold">{stream.name}</span>
                        </Button>
                    );
                })}
                </div>
            </DialogContent>
            </Dialog>
        </div>
      </div>
        
        <AlertDialog open={!!streamToConfirm} onOpenChange={(open) => !open && cancelConfirmation()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change Learning Path?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to switch to the "{streamToConfirm}" path? Your progress on the current path will be removed and your XP will be reset. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={cancelConfirmation}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => streamToConfirm && handleStreamChange(streamToConfirm)}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={isUnlockInfoOpen} onOpenChange={setIsUnlockInfoOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Stage Locked: {stageForInfo?.stageName}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {stageForInfo?.requiredStage
                            ? `You need to complete all levels in the "${stageForInfo.requiredStage}" stage to unlock this.`
                            : "This is an advanced stage that requires completion of previous stages."}
                        <br /><br />
                        Want to skip ahead? <strong>Purchase any premium membership</strong> to unlock all stages instantly!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link href="/shop?tab=memberships">View Memberships</Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


      {!selectedStream ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold font-headline">Welcome to Career Clash!</h2>
          <p className="mt-2 text-lg text-muted-foreground">Choose your subject to generate a personalized learning roadmap.</p>
          <Button className="mt-6" onClick={() => setIsDialogOpen(true)}>Choose Your Path</Button>
        </div>
      ) : isLoadingRoadmap ? (
          <RoadmapSkeleton />
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={activeStageIndex !== -1 ? `stage-${activeStageIndex}` : undefined}>
            {roadmap.map((stage, index) => {
                const isStageLocked = stage.status === 'locked' && !isPremium;
                const completedLevels = stage.levels ? stage.levels.filter(l => l.status === 'completed').length : 0;
                const totalLevels = stage.levels ? stage.levels.length : 0;
                const isStageComplete = totalLevels > 0 && completedLevels === totalLevels;

                return (
                    <AccordionItem value={`stage-${index}`} key={index} className="border bg-card rounded-lg px-4" >
                        <AccordionTrigger
                            onClick={(e) => {
                                if (isStageLocked) {
                                    e.preventDefault();
                                    setStageForInfo({
                                        stageName: stage.stageName,
                                        requiredStage: index > 0 ? roadmap[index - 1].stageName : null,
                                    });
                                    setIsUnlockInfoOpen(true);
                                }
                            }}
                            className="hover:no-underline"
                        >
                           <div className="flex items-center gap-4">
                                {isStageLocked ? <Lock className="h-6 w-6 text-muted-foreground" /> : isStageComplete ? <CheckCircle className="h-6 w-6 text-green-400" /> : <CircleDot className="h-6 w-6 text-primary animate-pulse" />}
                                <h3 className="text-xl font-headline">{stage.stageName}</h3>
                                <Badge variant={isStageLocked ? 'secondary' : 'default'}>{completedLevels} / {totalLevels}</Badge>
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 space-y-4">
                            {stage.levels && stage.levels.length > 0 ? stage.levels.map((level, levelIndex) => (
                                <LevelCard key={levelIndex} level={level} isStageLocked={isStageLocked} />
                            )) : <p className="text-muted-foreground text-center py-4">Levels for this stage are being prepared.</p>}
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
      )}
    </>
  );
}
