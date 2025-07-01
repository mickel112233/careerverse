
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { allQuests, Quest } from '@/lib/quest-data';
import { CheckSquare, Coins, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const QuestCard = ({ quest, isCompleted, onClaim }: { quest: Quest, isCompleted: boolean, onClaim: (quest: Quest) => void }) => {
    const Icon = quest.icon;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // This ensures the random number is only generated on the client after hydration
        if (isCompleted) {
            setProgress(100);
        } else {
            setProgress(Math.floor(Math.random() * 80) + 10);
        }
    }, [isCompleted]);

    return (
        <Card className={cn("flex flex-col", isCompleted && "opacity-60 bg-muted/30")}>
            <CardHeader>
                <div className="flex items-start gap-4">
                    <Icon className="h-8 w-8 text-primary mt-1 shrink-0"/>
                    <div>
                        <CardTitle className="text-lg font-headline">{quest.title}</CardTitle>
                        <CardDescription className="text-xs">{quest.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
                <div className="flex items-center gap-4 text-sm font-bold">
                    <span className="flex items-center text-yellow-400"><Zap className="h-4 w-4 mr-1" /> {quest.xp} XP</span>
                    <span className="flex items-center text-amber-500"><Coins className="h-4 w-4 mr-1" /> {quest.coins}</span>
                </div>
                <div>
                    <Progress value={progress} />
                    <p className="text-xs text-muted-foreground text-right mt-1">
                        {progress > 0 ? `${progress}% Complete` : `...`}
                    </p>
                </div>
            </CardContent>
            <div className="p-4 pt-0">
                <Button className="w-full" disabled={isCompleted} onClick={() => onClaim(quest)}>
                    {isCompleted ? "Claimed" : "Claim Reward"}
                </Button>
            </div>
        </Card>
    );
};


export default function QuestsClient() {
    const { toast } = useToast();
    // In a real app, completed quests would be stored in localStorage or fetched from a server
    const [completedQuests, setCompletedQuests] = useState<Set<string>>(new Set());

    const claimReward = (quest: Quest) => {
        if(completedQuests.has(quest.id)) return;

        // Add to completed set
        setCompletedQuests(prev => new Set(prev).add(quest.id));

        // In a real app, you would add these to the user's total in localStorage
        console.log(`Claimed ${quest.xp} XP and ${quest.coins} Coins`);
        toast({
            title: "Quest Complete!",
            description: `You earned ${quest.xp} XP and ${quest.coins} Coins.`,
            className: "bg-green-500 text-white"
        });
    };

    const renderQuestCategory = (category: 'Daily' | 'Weekly' | 'Milestone') => {
        return allQuests
            .filter(q => q.category === category)
            .map(quest => (
                <QuestCard 
                    key={quest.id} 
                    quest={quest} 
                    isCompleted={completedQuests.has(quest.id)} 
                    onClaim={claimReward} 
                />
            ));
    }

  return (
    <>
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary text-glow">Quests</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
            Complete tasks to earn valuable rewards and accelerate your progress.
            </p>
        </div>
        <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="milestone">Milestone</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {renderQuestCategory('Daily')}
            </TabsContent>
            <TabsContent value="weekly" className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {renderQuestCategory('Weekly')}
            </TabsContent>
            <TabsContent value="milestone" className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {renderQuestCategory('Milestone')}
            </TabsContent>
        </Tabs>
    </>
  );
}
