
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Loader2, BookOpen, BrainCircuit, Code, Crown, Megaphone, Palette, PenSquare, Lock, Star, Swords, Users, Zap, CheckSquare, Trophy, Skull } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const PowerLevelMeter = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col items-center">
        <div className="relative h-24 w-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                    className="stroke-muted"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" strokeWidth="2"
                />
                <path
                    className="stroke-primary"
                    strokeDasharray={`${value}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" strokeWidth="2" strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">{value}</div>
        </div>
        <p className="mt-2 text-sm font-semibold">{label}</p>
    </div>
);

const FeatureCard = ({ title, icon: Icon, href }: { title: string, icon: React.ElementType, href: string }) => (
    <Link href={href}>
        <Card className="h-full bg-card/50 hover:bg-card/80 hover:border-primary/50 border-2 border-transparent transition-all transform hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <Icon className="h-10 w-10 text-primary mb-3" />
                <h3 className="font-bold text-lg font-headline">{title}</h3>
            </CardContent>
        </Card>
    </Link>
);


export default function DashboardClient() {
  const [userName, setUserName] = useState('Hero');
  const [userFaction, setUserFaction] = useState('Explorer');
  const [level, setLevel] = useState(1);
  const [xpProgress, setXpProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState(0);
  const [careersMastered, setCareersMastered] = useState(0);

  useEffect(() => {
    const updateUserStats = () => {
        const storedProfile = localStorage.getItem('careerClashUserProfile');
        if (storedProfile) {
            const profile = JSON.parse(storedProfile);
            setUserName(profile.name || 'Hero');
            setUserFaction(profile.faction || 'Explorer');
        }

        const storedXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
        const currentLevel = Math.floor(storedXp / 1000) + 1;
        setLevel(currentLevel);
        const xpBaseForCurrentLevel = (currentLevel - 1) * 1000;
        const xpInCurrentLevel = storedXp - xpBaseForCurrentLevel;
        setXpProgress((xpInCurrentLevel / 1000) * 100);
        
        const profileData = JSON.parse(localStorage.getItem('careerClashUserProfile') || '{}');
        setStreak(profileData?.stats?.streak || 0);

        const storedCompletedAchievements = JSON.parse(localStorage.getItem('careerClashCompletedAchievements') || '[]');
        setAchievementsUnlocked(storedCompletedAchievements.length);

        const storedRoadmap = JSON.parse(localStorage.getItem('careerClashRoadmap') || 'null');
        if(storedRoadmap) {
            const completedLevels = storedRoadmap.flatMap((stage: any) => stage.levels).filter((level: any) => level.status === 'completed').length;
            setCareersMastered(completedLevels);
        }
    };
    
    updateUserStats();
    window.addEventListener('currencyChange', updateUserStats);
    window.addEventListener('profileChange', updateUserStats);
    window.addEventListener('guildChange', updateUserStats);
    
    return () => {
        window.removeEventListener('currencyChange', updateUserStats);
        window.removeEventListener('profileChange', updateUserStats);
        window.removeEventListener('guildChange', updateUserStats);
    };
  }, []);
  
  return (
    <div className="space-y-8">
        <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Welcome back, {userName}!</h1>
            <p className="mt-2 text-muted-foreground text-lg">
                Your <span className="text-primary font-bold">{userFaction}</span> journey continues.
            </p>
        </header>

        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="col-span-2 bg-card/50">
                    <CardContent className="p-4">
                        <p className="text-sm font-semibold text-muted-foreground">XP to Level {level + 1}</p>
                        <Progress value={xpProgress} className="h-3 my-1"/>
                    </CardContent>
                </Card>
                <div className="p-4 bg-card/50 rounded-lg text-center">
                    <p className="text-sm font-semibold text-muted-foreground">Streak</p>
                    <p className="text-2xl font-bold font-headline text-primary">{streak} Days</p>
                </div>
                 <div className="p-4 bg-card/50 rounded-lg text-center">
                    <p className="text-sm font-semibold text-muted-foreground">Level</p>
                    <p className="text-2xl font-bold font-headline text-primary">{level}</p>
                </div>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold font-headline mb-4">Power Up Your Journey</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FeatureCard title="Master Skills" icon={Crown} href="/dashboard/learning-path" />
                <FeatureCard title="Unlock Careers" icon={BookOpen} href="/dashboard/learning-path" />
                <FeatureCard title="Epic Quests" icon={CheckSquare} href="/quests" />
                <FeatureCard title="Battle Arena" icon={Swords} href="/competition" />
            </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline">Legendary Achievements</CardTitle>
                    <CardDescription>Milestones on your path to greatness.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Career Pioneer</p>
                        <Badge variant="outline">{careersMastered} / 250 Levels</Badge>
                    </div>
                     <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Skill Master</p>
                        <Badge variant="outline">{achievementsUnlocked} / 100 Achievements</Badge>
                    </div>
                     <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Streak Warrior</p>
                        <Badge variant="outline">{streak} Day Streak</Badge>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button asChild variant="ghost" className="text-primary hover:text-primary">
                        <Link href="/achievements">View All Achievements →</Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="font-headline">Power Levels</CardTitle>
                    <CardDescription>Your core attributes, honed by your choices.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                    <PowerLevelMeter label="Logic" value={75} />
                    <PowerLevelMeter label="Creativity" value={60} />
                    <PowerLevelMeter label="Leadership" value={45} />
                    <PowerLevelMeter label="Technical" value={85} />
                    <PowerLevelMeter label="Social" value={55} />
                </CardContent>
            </Card>
        </section>
    </div>
  );
}
