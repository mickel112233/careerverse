'use client';

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck, Code, BrainCircuit, Megaphone, Briefcase, Palette, Bot, Gamepad2, PenSquare } from 'lucide-react';
import { Check, Lock, Star, Swords, PenTool, Trophy } from 'lucide-react';

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

const initialRoadmapNodes = [
  { title: 'Web Development Basics', slug: 'web-development-basics', icon: Code, status: 'completed' },
  { title: 'HTML & CSS Challenge', slug: 'html-css-challenge', icon: Swords, status: 'completed' },
  { title: 'JavaScript Fundamentals', slug: 'javascript-fundamentals', icon: Code, status: 'unlocked' },
  { title: 'The DOM Arena', slug: 'the-dom-arena', icon: Swords, status: 'unlocked' },
  { title: 'API Guild Quest', slug: 'api-guild-quest', icon: PenTool, status: 'locked' },
  { title: 'React.js Mastery', slug: 'reactjs-mastery', icon: Star, status: 'locked' },
  { title: 'Final Project: The Grand Clash', slug: 'final-project-grand-clash', icon: Trophy, status: 'locked' },
];

const NodeIcon = ({ icon, status }: { icon: React.ElementType, status: string }) => {
  const Icon = icon;
  const colors = {
    completed: 'text-green-400 bg-green-400/10',
    unlocked: 'text-primary bg-primary/10',
    locked: 'text-muted-foreground bg-muted/20',
  }
  return <Icon className={`h-8 w-8 ${colors[status]}`} />
}

const NodeStatusIcon = ({ status }: { status: string }) => {
  if (status === 'completed') return <Check className="h-5 w-5 text-green-400" />;
  if (status === 'locked') return <Lock className="h-5 w-5 text-muted-foreground" />;
  return null;
}

export default function DashboardClient() {
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [roadmapNodes, setRoadmapNodes] = useState(initialRoadmapNodes);
  const [streamToConfirm, setStreamToConfirm] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStreamChange = (streamName: string) => {
    console.log(`Setting new learning path for: ${streamName}`);
    setSelectedStream(streamName);
    // TODO: Here you would call the AI to generate a new roadmap
    setRoadmapNodes(initialRoadmapNodes); 
    setIsDialogOpen(false); 
    setStreamToConfirm(null);
  };

  const openConfirmation = (streamName: string) => {
    setStreamToConfirm(streamName);
  };
  
  const cancelConfirmation = () => {
    setStreamToConfirm(null);
  };

  return (
    <>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <BookOpenCheck className="h-4 w-4" />
              <span className="sr-only">Choose Subject</span>
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
        
        <AlertDialog open={!!streamToConfirm} onOpenChange={(open) => !open && cancelConfirmation()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change Learning Path?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to switch to the "{streamToConfirm}" path? Your progress on the current path will be removed. This action cannot be undone.
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
      </div>

      {!selectedStream ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">Please select a subject to see your roadmap.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-1/2 top-12 bottom-12 w-1 -translate-x-1/2 bg-border/50 rounded-full" />

          <div className="space-y-16">
            {roadmapNodes.map((node, index) => (
              <div key={index} className="relative flex items-center">
                <div className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? 'text-right' : 'order-2 text-left'}`}>
                  <Card className={`inline-block text-left border-2 ${node.status === 'unlocked' ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent'}`}>
                    <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                      <NodeIcon icon={node.icon} status={node.status} />
                      <div>
                        <CardTitle className="text-base font-semibold">{node.title}</CardTitle>
                      </div>
                    </CardHeader>
                    {node.status !== 'locked' && (
                      <CardContent className="p-4 pt-0">
                         <Button asChild size="sm" className="w-full" disabled={node.status === 'completed'}>
                           <Link href={`/learning/${node.slug}`}>
                            {node.status === 'completed' ? 'Review' : 'Start Challenge'}
                           </Link>
                         </Button>
                      </CardContent>
                    )}
                  </Card>
                </div>

                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background ring-4 ring-background">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${node.status === 'completed' ? 'bg-green-400/20 ring-2 ring-green-400' : 'bg-muted ring-2 ring-border'}`}>
                     <NodeStatusIcon status={node.status} />
                  </div>
                </div>

                <div className={`w-[calc(50%-2rem)] ${index % 2 !== 0 && 'order-1'}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}