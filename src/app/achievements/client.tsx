
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { allAchievements, Achievement } from '@/lib/achievement-data';
import { Lock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function AchievementsClient() {
    // For demonstration, we'll assume the user has unlocked the first 10 achievements.
    // In a real app, this would be based on the user's saved progress.
    const [unlockedCount] = useState(10);

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary text-glow">Achievements</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Milestones you've reached on your journey. Unlock them all to prove your mastery.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Progress</CardTitle>
                    <CardDescription>You have unlocked {unlockedCount} out of {allAchievements.length} achievements.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allAchievements.map((achievement, index) => {
                            const isUnlocked = index < unlockedCount;
                            const Icon = achievement.icon;
                            return (
                                <motion.div 
                                    key={achievement.name}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                >
                                    <Card className={cn("h-full", !isUnlocked && "bg-muted/30 opacity-70")}>
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="relative">
                                                <Icon className={cn("h-12 w-12 p-2 rounded-lg bg-muted", isUnlocked ? achievement.color : "text-muted-foreground")} />
                                                {!isUnlocked && <Lock className="absolute bottom-0 right-0 h-4 w-4 bg-background text-muted-foreground rounded-full p-0.5" />}
                                            </div>
                                            <div>
                                                <p className="font-bold">{achievement.name}</p>
                                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
