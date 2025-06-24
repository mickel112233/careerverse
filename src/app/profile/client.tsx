
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Linkedin, ShieldCheck, Star, Swords, Trophy, Zap, Repeat, Flame, Percent, BarChartHorizontal, Users } from "lucide-react";
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AiImage } from '@/components/ui/ai-image';
import { AiAvatar } from '@/components/ui/ai-avatar';
import { motion } from 'framer-motion';

const baseUserData = {
    name: 'QuantumLeap',
    title: 'Senior AI Engineer',
    avatarHint: 'cyberpunk woman portrait',
    bannerHint: 'abstract purple and blue nebula',
    guild: {
        name: 'AI Vanguard',
        icon: Zap,
    },
    stats: {
        wins: 128,
        losses: 34,
        streak: 5,
    },
    achievements: [
        { name: 'Master Coder', icon: Award, color: 'text-purple-400' },
        { name: 'AI Guru', icon: Zap, color: 'text-sky-400' },
        { name: 'TS Wizard', icon: ShieldCheck, color: 'text-green-400' },
        { name: '5 Wins Streak', icon: Flame, color: 'text-red-500' },
        { name: 'Top 10 Player', icon: Trophy, color: 'text-orange-400' },
        { name: 'React Pro', icon: Star, color: 'text-yellow-400' },
    ],
    battleHistory: [
        { id: 1, challenge: 'React Hooks Quiz', opponent: { name: 'SynthWave', avatarHint: 'cyberpunk man portrait' }, result: 'Win', xp: '+150 XP' },
        { id: 2, challenge: 'Node.js Performance Battle', opponent: { name: 'CodeNinja', avatarHint: 'hacker with glasses' }, result: 'Win', xp: '+200 XP' },
        { id: 3, challenge: 'CSS Specificity Simulation', opponent: { name: 'PixelPerfect', avatarHint: 'designer serious' }, result: 'Loss', xp: '-50 XP' },
        { id: 4, challenge: 'Python Algorithm Challenge', opponent: { name: 'DataDynamo', avatarHint: 'data scientist smiling' }, result: 'Win', xp: '+180 XP' },
    ],
};


const StatCard = ({ icon: Icon, label, value, subValue }: { icon: React.ElementType, label: string, value: string | number, subValue?: string }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-muted/30 h-full">
            <CardContent className="p-4 flex items-center gap-4">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold font-headline">{value}</p>
                    {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default function ProfileClient() {
    const [totalXp, setTotalXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [xpProgress, setXpProgress] = useState(0);
    const [xpForCurrentLevel, setXpForCurrentLevel] = useState(0);
    const [xpToNextLevel, setXpToNextLevel] = useState(1000);
    const [membership, setMembership] = useState('Free');
    const [achievements, setAchievements] = useState(baseUserData.achievements);
    const [userData, setUserData] = useState(baseUserData);

    const { winRate, avatarRingClass, levelName, levelTooltip } = useMemo(() => {
        const { wins, losses } = userData.stats;
        const totalGames = wins + losses;
        const rate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

        let ringClass = 'ring-primary/50';
        let lvlName = 'Bronze';
        if (level >= 10) { ringClass = 'ring-accent'; lvlName = 'Silver'; }
        if (level >= 20) { ringClass = 'ring-yellow-400'; lvlName = 'Gold'; }
        if (level >= 50) { ringClass = 'ring-purple-500'; lvlName = 'Diamond'; }

        return {
            winRate: rate.toFixed(1) + '%',
            avatarRingClass: ringClass,
            levelName: lvlName,
            levelTooltip: `Your avatar's frame evolves as you level up. Current tier: ${lvlName}.`,
        };
    }, [level, userData.stats]);
    
    useEffect(() => {
        const updateAllStats = () => {
            const storedXp = parseInt(localStorage.getItem('careerClashTotalXp') || '9850', 10);
            setTotalXp(storedXp);

            const currentLevel = Math.floor(storedXp / 1000) + 1;
            setLevel(currentLevel);

            const xpBaseForCurrentLevel = (currentLevel - 1) * 1000;
            const xpInCurrentLevel = storedXp - xpBaseForCurrentLevel;
            setXpForCurrentLevel(xpInCurrentLevel);
            
            const xpNeededForNextLevel = 1000;
            setXpToNextLevel(xpNeededForNextLevel);
            setXpProgress((xpInCurrentLevel / xpNeededForNextLevel) * 100);

            const storedMembership = localStorage.getItem('careerClashMembership') || 'Free';
            setMembership(storedMembership);

            const inventory = JSON.parse(localStorage.getItem('careerClashInventory') || '[]');
            const purchasedTitles = inventory
                .filter((name: string) => name.toLowerCase().includes('title'))
                .map((name: string) => ({ name, icon: Award, color: 'text-cyan-400' }));
        
            const allAchievements = [...baseUserData.achievements];
            purchasedTitles.forEach((purchased: any) => {
                if (!allAchievements.some(existing => existing.name === purchased.name)) {
                    allAchievements.push(purchased);
                }
            });
            setAchievements(allAchievements);

            const storedGuild = localStorage.getItem('userGuild');
            if (storedGuild) {
                const guildData = JSON.parse(storedGuild);
                setUserData(prev => ({
                    ...prev,
                    guild: {
                        ...prev.guild,
                        name: guildData.guildName,
                    }
                }));
            }
        };

        updateAllStats();
        window.addEventListener('currencyChange', updateAllStats);
        window.addEventListener('guildChange', updateAllStats);

        return () => {
            window.removeEventListener('currencyChange', updateAllStats);
            window.removeEventListener('guildChange', updateAllStats);
        }
    }, []);

  return (
    <>
       <div className="relative mb-8 h-48 rounded-lg overflow-hidden">
            <AiImage prompt={userData.bannerHint} alt="Profile banner" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
       </div>
       
       <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-1/3 space-y-8 -mt-24 z-10">
            <Card className="text-center p-6 pt-0 border-2 border-transparent">
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn("w-32 h-32 mx-auto mb-4 rounded-full border-4 border-background ring-4 transition-all", avatarRingClass)}>
                                <AiAvatar prompt={userData.avatarHint} alt={userData.name} fallback={userData.name.substring(0, 2)} className="w-full h-full" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{levelTooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <h1 className="text-2xl font-bold font-headline">{userData.name}</h1>
                <p className="text-muted-foreground">{userData.title}</p>
                
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    {userData.guild && (
                        <Badge variant="secondary" className="text-accent">
                            <Users className="h-3 w-3 mr-1" />
                            {userData.guild.name}
                        </Badge>
                    )}
                    {membership !== 'Free' && (
                         <Badge className="bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500">
                            <Star className="h-3 w-3 mr-1" />
                            {membership} Member
                        </Badge>
                    )}
                </div>
                
                <Button className="mt-4 w-full" disabled>
                    <Linkedin className="mr-2 h-4 w-4" />
                    Share on LinkedIn
                </Button>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Level Progress</CardTitle>
                    <CardDescription>Your journey to mastery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <div className="flex justify-between mb-1 text-sm font-medium">
                            <span>Level {level} ({levelName})</span>
                            <span className="font-mono text-primary">{xpForCurrentLevel} / {xpToNextLevel}</span>
                        </div>
                        <Progress value={xpProgress} aria-label={`${xpProgress}% to next level`} />
                         <p className="text-xs text-muted-foreground mt-1 text-right">Total XP: {totalXp.toLocaleString()}</p>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-gradient-to-br from-muted/20 to-muted/40">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Repeat /> Prestige</CardTitle>
                    <CardDescription>Reset your level to earn unique rewards and climb again. (Coming Soon)</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" disabled>Prestige Up (Lvl 100 Req.)</Button>
                </CardContent>
            </Card>
        </div>

        {/* Right Column */}
        <div className="lg:w-2/3 space-y-8">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard icon={BarChartHorizontal} label="Win Rate" value={winRate} />
                <StatCard icon={Trophy} label="Total Wins" value={userData.stats.wins} />
                <StatCard icon={Flame} label="Win Streak" value={userData.stats.streak} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Showcase</CardTitle>
                    <CardDescription>Your collection of titles and achievements.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {achievements.map((ach, i) => {
                            const Icon = ach.icon;
                            return (
                                <motion.div 
                                    key={ach.name} 
                                    className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-all hover:scale-105 cursor-pointer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                >
                                    <Icon className={cn("h-10 w-10 mb-2", ach.color)} />
                                    <p className="text-sm font-semibold">{ach.name}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Recent Battles</CardTitle>
                    <CardDescription>Latest competition history.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Challenge</TableHead>
                                <TableHead>Opponent</TableHead>
                                <TableHead className="text-center">Result</TableHead>
                                <TableHead className="text-right">XP Gained</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userData.battleHistory.map((battle) => (
                                <TableRow key={battle.id}>
                                    <TableCell className="font-medium">{battle.challenge}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <AiAvatar prompt={battle.opponent.avatarHint} alt={battle.opponent.name} fallback={battle.opponent.name.substring(0,1)} className="w-6 h-6" />
                                            <span>{battle.opponent.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={battle.result === 'Win' ? 'default' : 'destructive'} className={cn(battle.result === 'Win' ? 'bg-green-500/20 text-green-400 border-green-500' : '')}>{battle.result}</Badge>
                                    </TableCell>
                                    <TableCell className={cn("text-right font-mono", battle.result === 'Win' ? 'text-lime-400' : 'text-red-500')}>{battle.xp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
       </div>
    </>
  );
}
