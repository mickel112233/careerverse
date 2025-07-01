
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { allQuests, Quest } from '@/lib/quest-data';
import { Coins, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const QuestCard = ({ quest, progress, isCompleted, onClaim }: { quest: Quest, progress: number, isCompleted: boolean, onClaim: (quest: Quest) => void }) => {
    const Icon = quest.icon;
    
    const progressPercentage = quest.goal > 0 ? (Math.min(progress, quest.goal) / quest.goal) * 100 : 0;
    const canClaim = progress >= quest.goal;

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
                    <Progress value={progressPercentage} />
                    <p className="text-xs text-muted-foreground text-right mt-1">
                        {Math.min(progress, quest.goal)} / {quest.goal}
                    </p>
                </div>
            </CardContent>
            <div className="p-4 pt-0">
                <Button className="w-full" disabled={isCompleted || !canClaim} onClick={() => onClaim(quest)}>
                    {isCompleted ? "Claimed" : (canClaim ? "Claim Reward" : "In Progress")}
                </Button>
            </div>
        </Card>
    );
};


export default function QuestsClient() {
    const { toast } = useToast();
    const [completedQuests, setCompletedQuests] = useState<Set<string>>(new Set());
    const [questProgress, setQuestProgress] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const storedCompleted = localStorage.getItem('careerClashCompletedQuests');
        if (storedCompleted) {
            try {
                setCompletedQuests(new Set(JSON.parse(storedCompleted)));
            } catch (e) {
                console.error("Failed to parse completed quests:", e);
                setCompletedQuests(new Set());
            }
        }
        
        const storedProgress = localStorage.getItem('careerClashQuestProgress');
        if (storedProgress) {
             try {
                setQuestProgress(JSON.parse(storedProgress));
            } catch (e) {
                console.error("Failed to parse quest progress:", e);
                setQuestProgress({});
            }
        }
        
        // NOTE TO DEVELOPER: To update quest progress from other parts of the app (e.g., after a battle),
        // you would retrieve the current progress from localStorage, update the relevant quest count,
        // and save it back. Then, dispatch a 'storage' event to ensure the UI updates in real-time.
        // Example:
        // const progress = JSON.parse(localStorage.getItem('careerClashQuestProgress') || '{}');
        // progress['daily3'] = (progress['daily3'] || 0) + 1; // Increment battle quest
        // localStorage.setItem('careerClashQuestProgress', JSON.stringify(progress));
        // window.dispatchEvent(new Event('storage'));

    }, []);

    const claimReward = (quest: Quest) => {
        if(completedQuests.has(quest.id)) return;

        const currentTotalXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
        const newTotalXp = currentTotalXp + quest.xp;
        localStorage.setItem('careerClashTotalXp', newTotalXp.toString());
        
        const currentCoins = parseInt(localStorage.getItem('careerClashCoins') || '0', 10);
        const newTotalCoins = currentCoins + quest.coins;
        localStorage.setItem('careerClashCoins', newTotalCoins.toString());
        
        window.dispatchEvent(new Event('currencyChange'));

        const newCompletedQuests = new Set(completedQuests).add(quest.id);
        setCompletedQuests(newCompletedQuests);
        localStorage.setItem('careerClashCompletedQuests', JSON.stringify(Array.from(newCompletedQuests)));

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
                    progress={questProgress[quest.id] || 0}
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
