'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Award, Linkedin, ShieldCheck, Star, Swords, Trophy, Zap, Repeat, Flame, Percent, BarChartHorizontal, Users, ArrowLeft, Pencil, Loader2 } from "lucide-react";
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

const profileFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters.").max(30, "Name must be at most 30 characters."),
  title: z.string().min(3, "Title must be at least 3 characters.").max(50, "Title must be at most 50 characters."),
  avatarHint: z.string().max(100, "Avatar hint must be at most 100 characters."),
  bannerHint: z.string().max(100, "Banner hint must be at most 100 characters."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type UserData = typeof baseUserData & {
    guild: { name: string; role: string; } | null;
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
    const router = useRouter();
    const { toast } = useToast();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [totalXp, setTotalXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [xpProgress, setXpProgress] = useState(0);
    const [xpForCurrentLevel, setXpForCurrentLevel] = useState(0);
    const [xpToNextLevel, setXpToNextLevel] = useState(1000);
    const [membership, setMembership] = useState('Free');
    const [achievements, setAchievements] = useState(baseUserData.achievements);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: '',
            title: '',
            avatarHint: '',
            bannerHint: '',
        },
    });

    useEffect(() => {
        const updateAllStats = () => {
            const storedProfile = localStorage.getItem('careerClashUserProfile');
            let profileData: Omit<UserData, 'guild'>;
            if (storedProfile) {
                profileData = JSON.parse(storedProfile);
            } else {
                profileData = baseUserData;
                localStorage.setItem('careerClashUserProfile', JSON.stringify(profileData));
            }

            const storedGuild = localStorage.getItem('userGuild');
            let guild = null;
            if (storedGuild) {
                const guildData = JSON.parse(storedGuild);
                const userMemberData = guildData.members.find((m: any) => m.name === profileData.name);
                guild = { name: guildData.guildName, role: userMemberData?.role || 'Member' };
            }
            
            setUserData({ ...profileData, guild });
            form.reset(profileData);

            const storedXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
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
        };

        updateAllStats();
        window.addEventListener('currencyChange', updateAllStats);
        window.addEventListener('guildChange', updateAllStats);
        window.addEventListener('profileChange', updateAllStats);

        return () => {
            window.removeEventListener('currencyChange', updateAllStats);
            window.removeEventListener('guildChange', updateAllStats);
            window.removeEventListener('profileChange', updateAllStats);
        };
    }, [form]);

    const { winRate, avatarRingClass, levelName, levelTooltip } = useMemo(() => {
        if (!userData) return { winRate: '0%', avatarRingClass: 'ring-primary/50', levelName: 'Bronze', levelTooltip: ''};
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
    }, [level, userData]);

    const onSubmitProfile = (values: ProfileFormValues) => {
        if (!userData) return;
        const updatedProfile = { ...userData, ...values };
        localStorage.setItem('careerClashUserProfile', JSON.stringify(updatedProfile));
        window.dispatchEvent(new Event('profileChange'));
        toast({ title: 'Profile Updated!', description: 'Your changes have been saved.' });
        setIsEditModalOpen(false);
    };
    
    if (!userData) {
        return <div className="flex justify-center items-center h-96"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }

  return (
    <>
       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your in-game name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title / Role</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Aspiring Developer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="avatarHint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar AI Prompt</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Describe your desired avatar" {...field} />
                                    </FormControl>
                                    <FormDescription>This will regenerate your avatar image.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="bannerHint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Banner AI Prompt</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Describe your desired banner" {...field} />
                                    </FormControl>
                                    <FormDescription>This will regenerate your profile banner.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

       <div className="mb-4">
            <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
       </div>
       <div className="relative mb-8 h-32 sm:h-48 rounded-lg overflow-hidden">
            <AiImage prompt={userData.bannerHint} alt="Profile banner" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
       </div>
       
       <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 space-y-8 -mt-20 sm:-mt-24 z-10">
            <Card className="text-center p-6 pt-0 border-2 border-transparent relative">
                 <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setIsEditModalOpen(true)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                 <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn("w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full border-4 border-background ring-4 transition-all", avatarRingClass)}>
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
                         <motion.div whileHover={{ scale: 1.05 }}>
                            <Badge variant="secondary" className="text-accent">
                                <Users className="h-3 w-3 mr-1" />
                                {userData.guild.name} ({userData.guild.role})
                            </Badge>
                        </motion.div>
                    )}
                    {membership !== 'Free' && (
                         <motion.div whileHover={{ scale: 1.05 }}>
                            <Badge className="bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500">
                                <Star className="h-3 w-3 mr-1" />
                                {membership} Member
                            </Badge>
                        </motion.div>
                    )}
                </div>
                
                <Button className="mt-4 w-full" onClick={() => window.open('https://www.linkedin.com/in/me/', '_blank')}>
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect with LinkedIn
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

        <div className="w-full lg:w-2/3 space-y-8">
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {achievements.map((ach, i) => {
                            const Icon = ach.icon;
                            return (
                                <TooltipProvider key={ach.name}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <motion.div 
                                                className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg transition-all cursor-pointer"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                                whileHover={{ scale: 1.05, y: -5, backgroundColor: 'hsl(var(--muted))' }}
                                            >
                                                <Icon className={cn("h-10 w-10 mb-2", ach.color)} />
                                                <p className="text-sm font-semibold">{ach.name}</p>
                                            </motion.div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{ach.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
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
                    <div className="w-full overflow-x-auto">
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
                    </div>
                </CardContent>
            </Card>
        </div>
       </div>
    </>
  );
}
