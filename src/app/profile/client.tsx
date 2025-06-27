
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Award, Linkedin, ShieldCheck, Star, Swords, Trophy, Zap, Repeat, Flame, Percent, Users, ArrowLeft, Pencil, Loader2, Github, Youtube, Instagram, MessageSquare, Shield } from "lucide-react";
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AiImage } from '@/components/ui/ai-image';
import { AiAvatar } from '@/components/ui/ai-avatar';
import { motion } from 'framer-motion';

const baseUserData = {
    name: 'QuantumLeap',
    title: 'Senior AI Engineer',
    bio: 'Aspiring to bridge the gap between human creativity and artificial intelligence through gamified learning. Let\'s connect and build the future!',
    avatarHint: 'cyberpunk woman portrait',
    bannerHint: 'abstract purple and blue nebula',
    links: {
        github: 'https://github.com/QuantumLeap',
        youtube: 'https://youtube.com/@QuantumLeap',
        instagram: 'https://instagram.com/QuantumLeap',
        discord: 'quantumleap#1234'
    },
    stats: {
        wins: 128,
        losses: 34,
        streak: 5,
    },
    achievements: [
        { name: 'Master Coder', description: 'Achieved mastery in advanced coding challenges.', icon: Award, color: 'text-purple-400' },
        { name: 'AI Guru', description: 'Demonstrated deep knowledge in AI and Machine Learning.', icon: Zap, color: 'text-sky-400' },
        { name: 'TS Wizard', description: 'Mastered the art of TypeScript.', icon: ShieldCheck, color: 'text-green-400' },
        { name: '5 Wins Streak', description: 'Achieved a winning streak of 5 consecutive battles.', icon: Flame, color: 'text-red-500' },
        { name: 'Top 10 Player', description: 'Ranked among the top 10 players on the leaderboard.', icon: Trophy, color: 'text-orange-400' },
        { name: 'React Pro', description: 'Showcased expert-level skills in React development.', icon: Star, color: 'text-yellow-400' },
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
  bio: z.string().max(160, "Bio cannot exceed 160 characters.").optional(),
  avatarHint: z.string().max(100, "Avatar hint must be at most 100 characters."),
  bannerHint: z.string().max(100, "Banner hint must be at most 100 characters."),
  github: z.string().url("Please enter a valid URL.").or(z.literal('')).optional(),
  youtube: z.string().url("Please enter a valid URL.").or(z.literal('')).optional(),
  instagram: z.string().url("Please enter a valid URL.").or(z.literal('')).optional(),
  discord: z.string().max(50, "Discord username is too long.").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type UserData = typeof baseUserData & {
    guild: { name: string; role: string; } | null;
    achievements: { name: string; description: string; icon: React.ElementType, color: string }[];
};

const StatItem = ({ label, value, icon: Icon }: { label: string, value: string | number, icon: React.ElementType }) => (
    <motion.div 
        className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg text-center"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <Icon className="h-8 w-8 text-primary mb-2" />
        <p className="text-2xl font-bold font-headline">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
);

const Socials = ({ links }: { links: UserData['links']}) => {
    const hasLinks = Object.values(links).some(link => !!link);

    if (!hasLinks) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Socials</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {links.github && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button asChild variant="outline" size="icon">
                                        <a href={links.github} target="_blank" rel="noopener noreferrer"><Github className="h-5 w-5" /></a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>GitHub</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                     {links.youtube && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button asChild variant="outline" size="icon">
                                        <a href={links.youtube} target="_blank" rel="noopener noreferrer"><Youtube className="h-5 w-5" /></a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>YouTube</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                     {links.instagram && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button asChild variant="outline" size="icon">
                                        <a href={links.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Instagram</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                      {links.discord && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <MessageSquare className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Discord: {links.discord}</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

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
            bio: '',
            avatarHint: '',
            bannerHint: '',
            github: '',
            youtube: '',
            instagram: '',
            discord: '',
        },
    });

    useEffect(() => {
        const updateAllStats = () => {
            const storedProfile = localStorage.getItem('careerClashUserProfile');
            let profileData: Omit<UserData, 'guild' | 'links'> & { links?: UserData['links'] };
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
            
            setUserData({ ...baseUserData, ...profileData, guild });
            form.reset({
                name: profileData.name,
                title: profileData.title,
                bio: profileData.bio || '',
                avatarHint: profileData.avatarHint,
                bannerHint: profileData.bannerHint,
                github: profileData.links?.github || '',
                youtube: profileData.links?.youtube || '',
                instagram: profileData.links?.instagram || '',
                discord: profileData.links?.discord || '',
            });

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
                .map((name: string) => ({ 
                    name, 
                    icon: Award, 
                    color: 'text-cyan-400',
                    description: `A title purchased from the shop to showcase your status.`
                }));
        
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
        const { github, youtube, instagram, discord, ...restOfValues } = values;

        const updatedProfileData = {
            ...userData,
            ...restOfValues,
            links: {
                github: github || '',
                youtube: youtube || '',
                instagram: instagram || '',
                discord: discord || '',
            }
        };

        // Remove properties that shouldn't be in the persisted user profile object
        const { guild, ...profileToSave } = updatedProfileData;

        localStorage.setItem('careerClashUserProfile', JSON.stringify(profileToSave));
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
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
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="A short description about yourself" {...field} />
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
                        <h3 className="text-md font-semibold pt-2 border-b pb-2">Social Links</h3>
                        <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>GitHub URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://github.com/your-username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtube"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>YouTube URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://youtube.com/@your-channel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://instagram.com/your-username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discord"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discord Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="your_username#1234" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-4 sticky bottom-0 bg-background">
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
                {userData.bio && <p className="text-sm text-muted-foreground mt-4 text-center">{userData.bio}</p>}
                
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
                
                <Button className="mt-4 w-full" onClick={() => window.open('https://www.linkedin.com/in/', '_blank')}>
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect with LinkedIn
                </Button>
            </Card>

            <Socials links={userData.links} />

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
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Battle Statistics</CardTitle>
                    <CardDescription>Your performance across all competitions.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <StatItem label="Total Battles" value={userData.stats.wins + userData.stats.losses} icon={Swords} />
                    <StatItem label="Wins" value={userData.stats.wins} icon={Trophy} />
                    <StatItem label="Losses" value={userData.stats.losses} icon={Shield} />
                    <StatItem label="Win Rate" value={winRate} icon={Percent} />
                    <StatItem label="Win Streak" value={userData.stats.streak} icon={Flame} />
                </CardContent>
            </Card>

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
                                <TooltipProvider key={i}>
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
                                            <p className="font-bold">{ach.name}</p>
                                            {ach.description && <p className="text-xs text-muted-foreground">{ach.description}</p>}
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
                    <div className="space-y-4">
                        {userData.battleHistory.map((battle, i) => (
                            <motion.div
                                key={battle.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                            >
                                <div className="flex-1 space-y-1">
                                    <p className="font-semibold">{battle.challenge}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>vs</span>
                                        <AiAvatar prompt={battle.opponent.avatarHint} alt={battle.opponent.name} fallback={battle.opponent.name.substring(0,1)} className="w-5 h-5" />
                                        <span>{battle.opponent.name}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <Badge variant={battle.result === 'Win' ? 'default' : 'destructive'} className={cn(battle.result === 'Win' ? 'bg-green-500/20 text-green-400 border-green-500' : '')}>{battle.result}</Badge>
                                    <span className={cn("text-sm font-mono mt-1", battle.result === 'Win' ? 'text-lime-400' : 'text-red-500')}>{battle.xp}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
       </div>
    </>
  );
}

    