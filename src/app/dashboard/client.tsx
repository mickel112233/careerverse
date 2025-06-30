
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
import { Loader2, BookOpenCheck, Code, BrainCircuit, Megaphone, Briefcase, Palette, Bot, Gamepad2, PenSquare, Check, Lock, Star, Swords, PenTool, Trophy, Zap, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';


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

type RoadmapNode = {
  title: string;
  slug: string;
  icon: React.ElementType;
  status: 'completed' | 'unlocked' | 'locked';
  description: string;
  xp: number;
  coins: number;
};

const roadmapIcons = [Code, Swords, PenTool, Star, Trophy, BrainCircuit, Gamepad2];

const NodeIcon = ({ icon, status }: { icon: React.ElementType, status: string }) => {
  const Icon = icon;
  const colors = {
    completed: 'text-green-400 bg-green-400/10',
    unlocked: 'text-primary bg-primary/10',
    locked: 'text-muted-foreground bg-muted/20',
  }
  return <Icon className={cn('h-8 w-8 p-1.5 rounded-md', colors[status])} />
}

const NodeStatusIcon = ({ status }: { status: string }) => {
  if (status === 'completed') return <Check className="h-5 w-5 text-green-400" />;
  if (status === 'locked') return <Lock className="h-5 w-5 text-muted-foreground" />;
  return null;
}

const RoadmapSkeleton = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div className="space-y-2">
                 <Skeleton className="h-10 w-64" />
                <Skeleton className="h-6 w-96" />
            </div>
             <Skeleton className="h-10 w-36" />
        </div>
        <div className="relative pl-6 max-w-2xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-border/50" />
            <div className="space-y-12">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="relative pl-16">
                        <div className="absolute top-0 -left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background"><Skeleton className="h-10 w-10 rounded-full" /></div>
                        <Skeleton className="h-36 w-full max-w-sm" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default function DashboardClient() {
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [roadmapNodes, setRoadmapNodes] = useState<RoadmapNode[]>([]);
  const [streamToConfirm, setStreamToConfirm] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedStream = localStorage.getItem('careerClashStream');
    const storedRoadmap = localStorage.getItem('careerClashRoadmap');

    if (storedStream && storedRoadmap) {
        setSelectedStream(storedStream);
        const parsedRoadmap = JSON.parse(storedRoadmap);
        // Re-hydrate the icon components after parsing from localStorage
        const hydratedNodes = parsedRoadmap.map((node: any, index: number) => ({
            ...node,
            icon: roadmapIcons[index % roadmapIcons.length] || roadmapIcons[0],
        }));
        setRoadmapNodes(hydratedNodes);
    } else {
        setIsDialogOpen(true); // Force selection on first visit
    }
    setIsLoadingRoadmap(false);
  }, []);

  const handleStreamChange = async (streamName: string) => {
    setStreamToConfirm(null);
    setIsDialogOpen(false); 
    setIsLoadingRoadmap(true);
    setSelectedStream(streamName);
    setRoadmapNodes([]);

    try {
        const result = await generateLearningRoadmap({ streamName });
        const newNodes: RoadmapNode[] = result.roadmap.map((node, index) => ({
            title: node.title,
            slug: node.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-'),
            icon: roadmapIcons[index % roadmapIcons.length],
            status: index === 0 ? 'unlocked' : 'locked',
            description: node.description,
            xp: node.xp,
            coins: Math.floor(node.xp / 5),
        }));
        
        setRoadmapNodes(newNodes);
        
        const serializableNodes = newNodes.map((node) => {
            const { icon, ...rest } = node;
            return {
                ...rest,
                iconIndex: roadmapIcons.indexOf(node.icon)
            };
        });

        localStorage.setItem('careerClashStream', streamName);
        localStorage.setItem('careerClashRoadmap', JSON.stringify(serializableNodes));
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

  if (isLoadingRoadmap && !selectedStream) {
    return (
        <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
        </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-between items-start mb-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Your Learning Roadmap</h1>
          <p className="mt-2 text-muted-foreground">
            {selectedStream ? `Your path to mastering ${selectedStream}.` : 'Choose a subject to begin. Complete challenges to unlock new skills and climb the ranks.'}
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Choose Your Subject</DialogTitle>
                <DialogDescription>
                    Select a learning path to begin your journey.
                </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
                {streams.map((stream) => {
                    const Icon = stream.icon;
                    return (
                        <Button
                        key={stream.name}
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2 text-center p-2"
                        onClick={() => openConfirmation(stream.name)}
                        >
                        <Icon className="h-8 w-8 text-primary" />
                        <span className="text-xs font-semibold">{stream.name}</span>
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

      {!selectedStream ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold font-headline">Welcome to Career Clash!</h2>
          <p className="mt-2 text-lg text-muted-foreground">Choose your subject to generate a personalized learning roadmap.</p>
          <Button className="mt-6" onClick={() => setIsDialogOpen(true)}>Choose Your Path</Button>
        </div>
      ) : isLoadingRoadmap ? (
          <RoadmapSkeleton />
      ) : (
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute left-5 top-5 bottom-5 w-1 -translate-x-1/2 bg-border/50 rounded-full" />

          <div className="space-y-12">
            {roadmapNodes.map((node, index) => (
              <div key={index} className="relative pl-16">
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.1, type: 'spring' }}
                    className="absolute top-0 -left-[2px] z-10 flex h-12 w-12 items-center justify-center"
                >
                    <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-full', 
                            node.status === 'completed' ? 'bg-green-400/20 ring-2 ring-green-400' : 'bg-muted ring-2 ring-border',
                            node.status === 'unlocked' && 'ring-primary animate-pulse-slow'
                        )}>
                            <NodeStatusIcon status={node.status} />
                        </div>
                    </div>
                </motion.div>
                
                 <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, amount: 0.5 }}
                     transition={{ duration: 0.5, delay: 0.1 }}
                     className="w-full"
                  >
                    <Card className={cn('w-full transition-all', 
                        node.status === 'unlocked' ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent', 
                        node.status === 'completed' && 'bg-muted/30 border-green-500/30'
                    )}>
                        <CardHeader className="flex-row items-start gap-4 space-y-0 p-4">
                        <NodeIcon icon={node.icon} status={node.status} />
                        <div>
                            <CardTitle className="text-base font-semibold">{node.title}</CardTitle>
                            <CardDescription className="text-xs mt-1">{node.description}</CardDescription>
                            <div className="flex items-center gap-4 text-sm font-bold mt-2">
                            <span className="flex items-center text-yellow-400"><Zap className="h-4 w-4 mr-1" /> {node.xp} XP</span>
                            <span className="flex items-center text-amber-500"><Coins className="h-4 w-4 mr-1" /> {node.coins}</span>
                            </div>
                        </div>
                        </CardHeader>
                        {node.status !== 'locked' && (
                        <CardFooter className="p-4 pt-0">
                            <Button asChild size="sm" className="w-full" disabled={node.status === 'completed'}>
                            <Link href={`/learning/${node.slug}`}>
                                {node.status === 'completed' ? 'Review Challenge' : 'Start Challenge'}
                            </Link>
                            </Button>
                        </CardFooter>
                        )}
                    </Card>
                  </motion.div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
