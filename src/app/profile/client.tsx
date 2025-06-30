
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Award, Linkedin, ShieldCheck, Star, Swords, Trophy, Zap, Repeat, Flame, Percent, Users, ArrowLeft, Pencil, Loader2, Github, Youtube, Instagram, MessageSquare, Shield, Skull, LineChart, Package, ToyBrick } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AiImage } from '@/components/ui/ai-image';
import { AiAvatar } from '@/components/ui/ai-avatar';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

const PRESTIGE_LEVEL_REQUIREMENT = 100;
const PRESTIGE_GEM_REWARD = 100;

type Achievement = {
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    type: 'Achievement'
};

const baseAchievements: Achievement[] = [
    { name: 'Master Coder', description: 'Achieved mastery in advanced coding challenges.', icon: Award, color: 'text-purple-400', type: 'Achievement' },
    { name: 'AI Guru', description: 'Demonstrated deep knowledge in AI and Machine Learning.', icon: Zap, color: 'text-sky-400', type: 'Achievement' },
    { name: 'TS Wizard', description: 'Mastered the art of TypeScript.', icon: ShieldCheck, color: 'text-green-400', type: 'Achievement' },
    { name: '5 Wins Streak', description: 'Achieved a winning streak of 5 consecutive battles.', icon: Flame, color: 'text-red-500', type: 'Achievement' },
    { name: 'Top 10 Player', description: 'Ranked among the top 10 players on the leaderboard.', icon: Trophy, color: 'text-orange-400', type: 'Achievement' },
    { name: 'React Pro', description: 'Showcased expert-level skills in React development.', icon: Star, color: 'text-yellow-400', type: 'Achievement' },
];

const mockSkillData = [
  { subject: 'Frontend', score: 95, fullMark: 100 },
  { subject: 'Backend', score: 80, fullMark: 100 },
  { subject: 'AI/ML', score: 88, fullMark: 100 },
  { subject: 'Databases', score: 75, fullMark: 100 },
  { subject: 'UI/UX', score: 60, fullMark: 100 },
  { subject: 'DevOps', score: 70, fullMark: 100 },
];

const profileFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters.").max(30, "Name must be at most 30 characters."),
  title: z.string().min(3, "Title must be at least 3 characters.").max(50, "Title must be at most 50 characters."),
  bio: z.string().max(160, "Bio cannot exceed 160 characters.").optional(),
  avatarPrompt: z.string().max(100, "Avatar prompt must be at most 100 characters."),
  bannerPrompt: z.string().max(100, "Banner prompt must be at most 100 characters."),
  github: z.string().url("Please enter a valid URL.").or(z.literal('')).optional(),
  youtube: z.string().url("Please enter a valid URL.").or(z.literal('')).optional(),
  instagram: z.string().url("Please enter a valid URL.").or(z.literal('')).optional(),
  discord: z.string().max(50, "Discord username is too long.").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type UserProfileData = {
    name: string;
    title: string;
    bio: string;
    avatarPrompt: string;
    bannerPrompt: string;
    links: { github: string; youtube: string; instagram: string; discord: string; };
    stats: { wins: number; losses: number; streak: number; longestStreak: number; bossesDefeated: number; };
    guild: { name: string; role: string; } | null;
    battleHistory: { id: number; challenge: string; opponent: { name: string; prompt: string; }; result: string; xp: string; }[];
};

type UnlockableItem = (Achievement);

const StatItem = ({ label, value, icon: Icon }: { label: string, value: string | number, icon: React.ElementType }) => (
    <motion.div 
        className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg text-center h-full"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <Icon className="h-8 w-8 text-primary mb-2" />
        <p className="text-2xl font-bold font-headline">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
);

const Socials = ({ links }: { links: UserProfileData['links']}) => {
    if (!links) return null;
    const hasLinks = Object.values(links).some(link => !!link);
    if (!hasLinks) return null;
    return (
        <Card>
            <CardHeader><CardTitle className="font-headline text-lg">Socials</CardTitle></CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {links.github && <TooltipProvider><Tooltip><TooltipTrigger asChild><Button asChild variant="outline" size="icon"><a href={links.github} target="_blank" rel="noopener noreferrer"><Github className="h-5 w-5" /></a></Button></TooltipTrigger><TooltipContent><p>GitHub</p></TooltipContent></Tooltip></TooltipProvider>}
                    {links.youtube && <TooltipProvider><Tooltip><TooltipTrigger asChild><Button asChild variant="outline" size="icon"><a href={links.youtube} target="_blank" rel="noopener noreferrer"><Youtube className="h-5 w-5" /></a></Button></TooltipTrigger><TooltipContent><p>YouTube</p></TooltipContent></Tooltip></TooltipProvider>}
                    {links.instagram && <TooltipProvider><Tooltip><TooltipTrigger asChild><Button asChild variant="outline" size="icon"><a href={links.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></a></Button></TooltipTrigger><TooltipContent><p>Instagram</p></TooltipContent></Tooltip></TooltipProvider>}
                    {links.discord && <TooltipProvider><Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><MessageSquare className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>Discord: {links.discord}</p></TooltipContent></Tooltip></TooltipProvider>}
                </div>
            </CardContent>
        </Card>
    );
};

const SkillRadarChart = ({ data }: { data: typeof mockSkillData }) => (
    <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
        </RadarChart>
    </ResponsiveContainer>
);

const EditShowcaseDialog = ({ isOpen, onOpenChange, allItems, currentPinned, onSave }: { isOpen: boolean, onOpenChange: (open: boolean) => void, allItems: UnlockableItem[], currentPinned: string[], onSave: (newPinned: string[]) => void }) => {
    const [selected, setSelected] = useState(new Set(currentPinned));
    const MAX_PINNED = 4;

    const handleSelect = (itemName: string) => {
        setSelected(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(itemName)) {
                newSelection.delete(itemName);
            } else {
                if (newSelection.size < MAX_PINNED) {
                    newSelection.add(itemName);
                }
            }
            return newSelection;
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Customize Your Showcase</DialogTitle>
                    <DialogDescription>Select up to {MAX_PINNED} achievements and items to display on your profile.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {allItems.map((item) => {
                        const Icon = item.icon;
                        const isSelected = selected.has(item.name);
                        const isDisabled = !isSelected && selected.size >= MAX_PINNED;
                        return (
                            <div key={item.name} className={cn("flex items-center space-x-3 p-3 rounded-md border", isSelected && "border-primary bg-primary/10", isDisabled && "opacity-50")}>
                                <Checkbox id={item.name} checked={isSelected} onCheckedChange={() => handleSelect(item.name)} disabled={isDisabled} />
                                <label htmlFor={item.name} className={cn("flex items-center gap-3 w-full", isDisabled ? "cursor-not-allowed" : "cursor-pointer")}>
                                    <Icon className={cn("h-8 w-8 p-1 rounded-md", ('color' in item) ? item.color : 'text-primary', isSelected ? "bg-primary/20" : "bg-muted")} />
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                    </div>
                                </label>
                            </div>
                        );
                    })}
                </div>
                <DialogFooter>
                    <Button onClick={() => onSave(Array.from(selected))}>Save Showcase</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default function ProfileClient() {
    const router = useRouter();
    const { toast } = useToast();
    const [userData, setUserData] = useState<UserProfileData | null>(null);
    const [totalXp, setTotalXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [prestigeLevel, setPrestigeLevel] = useState(0);
    const [xpProgress, setXpProgress] = useState(0);
    const [xpForCurrentLevel, setXpForCurrentLevel] = useState(0);
    const [xpToNextLevel, setXpToNextLevel] = useState(1000);
    const [membership, setMembership] = useState('Free');
    const [unlockableItems, setUnlockableItems] = useState<UnlockableItem[]>([]);
    const [ownedItems, setOwnedItems] = useState<any[]>([]);
    const [pinnedItems, setPinnedItems] = useState<string[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShowcaseModalOpen, setIsShowcaseModalOpen] = useState(false);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { name: '', title: '', bio: '', avatarPrompt: '', bannerPrompt: '', github: '', youtube: '', instagram: '', discord: '' },
    });

    const updateAllStats = () => {
        const storedProfile = localStorage.getItem('careerClashUserProfile');
        let profileData;

        if (storedProfile) {
            profileData = JSON.parse(storedProfile);
        } else {
            profileData = {
                name: 'QuantumLeap', 
                title: 'Senior AI Engineer', 
                bio: 'Aspiring to bridge the gap between human creativity and artificial intelligence through gamified learning.',
                avatarPrompt: 'cyberpunk woman portrait', 
                bannerPrompt: 'abstract purple and blue nebula',
                links: { github: '', youtube: '', instagram: '', discord: '' },
                stats: { wins: 128, losses: 34, streak: 5, longestStreak: 12, bossesDefeated: 3 },
                battleHistory: [
                    { id: 1, challenge: "React Basics Quiz", opponent: { name: "AI Bot", prompt: "robot face" }, result: "Win", xp: "+50 XP" },
                    { id: 2, challenge: "CSS Fundamentals", opponent: { name: "CodeNinja", prompt: "hacker with glasses" }, result: "Loss", xp: "+10 XP" },
                    { id: 3, challenge: "JS Algorithms", opponent: { name: "LogicLord", prompt: "philosopher thinking" }, result: "Win", xp: "+75 XP" },
                    { id: 4, challenge: "Time Rush: Data Science", opponent: { name: "DataDynamo", prompt: "data scientist smiling" }, result: "Win", xp: "+120 XP" }
                ],
            };
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
        form.reset({
            name: profileData.name,
            title: profileData.title,
            bio: profileData.bio || '',
            avatarPrompt: profileData.avatarPrompt,
            bannerPrompt: profileData.bannerPrompt,
            github: profileData.links?.github || '',
            youtube: profileData.links?.youtube || '',
            instagram: profileData.links?.instagram || '',
            discord: profileData.links?.discord || '',
        });

        const storedXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
        const storedPrestige = parseInt(localStorage.getItem('careerClashPrestige') || '0', 10);

        setTotalXp(storedXp);
        setPrestigeLevel(storedPrestige);

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
        // Since cosmetic items are removed, this will be empty
        const currentOwnedItems: any[] = []; 
        setOwnedItems(currentOwnedItems);

        setUnlockableItems([...baseAchievements, ...currentOwnedItems]);

        const storedPinned = localStorage.getItem('pinnedItems');
        if (storedPinned) {
            setPinnedItems(JSON.parse(storedPinned));
        } else {
            setPinnedItems(baseAchievements.slice(0, 4).map(a => a.name));
        }
    };

    useEffect(() => {
        updateAllStats();
        window.addEventListener('currencyChange', updateAllStats);
        window.addEventListener('guildChange', updateAllStats);
        window.addEventListener('profileChange', updateAllStats);

        return () => {
            window.removeEventListener('currencyChange', updateAllStats);
            window.removeEventListener('guildChange', updateAllStats);
            window.removeEventListener('profileChange', updateAllStats);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        if (level >= PRESTIGE_LEVEL_REQUIREMENT) { ringClass = 'ring-fuchsia-500 animate-pulse'; lvlName = 'Max'; }
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
        const updatedProfileData = { ...userData, ...restOfValues, links: { github: github || '', youtube: youtube || '', instagram: instagram || '', discord: discord || '' } };
        const { guild, ...profileToSave } = updatedProfileData;
        localStorage.setItem('careerClashUserProfile', JSON.stringify(profileToSave));
        window.dispatchEvent(new Event('profileChange'));
        toast({ title: 'Profile Updated!', description: 'Your changes have been saved.' });
        setIsEditModalOpen(false);
    };

    const handlePrestige = () => {
        if (level < PRESTIGE_LEVEL_REQUIREMENT) return;
        const newPrestigeLevel = prestigeLevel + 1;
        const currentGems = parseInt(localStorage.getItem('careerClashGems') || '0', 10);
        
        localStorage.setItem('careerClashTotalXp', '0');
        localStorage.setItem('careerClashPrestige', newPrestigeLevel.toString());
        localStorage.setItem('careerClashGems', (currentGems + PRESTIGE_GEM_REWARD).toString());

        window.dispatchEvent(new Event('currencyChange'));

        toast({
            title: `Prestige Level ${newPrestigeLevel}!`,
            description: `You've ascended! Your level has been reset, and you've earned ${PRESTIGE_GEM_REWARD} Gems.`,
            className: 'bg-purple-500 text-white'
        });
    };
    
    if (!userData) {
        return <div className="flex justify-center items-center h-96"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }

    const displayedItems = unlockableItems.filter(item => pinnedItems.includes(item.name));

  return (
    <>
       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader><DialogTitle>Edit Your Profile</DialogTitle></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
                        <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Display Name</FormLabel><FormControl><Input placeholder="Your in-game name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title / Role</FormLabel><FormControl><Input placeholder="e.g. Aspiring Developer" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="bio" render={({ field }) => (<FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea placeholder="A short description about yourself" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="avatarPrompt" render={({ field }) => (<FormItem><FormLabel>Avatar AI Prompt</FormLabel><FormControl><Input placeholder="Describe your desired avatar" {...field} /></FormControl><FormDescription>This will regenerate your avatar image.</FormDescription><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="bannerPrompt" render={({ field }) => (<FormItem><FormLabel>Banner AI Prompt</FormLabel><FormControl><Input placeholder="Describe your desired banner" {...field} /></FormControl><FormDescription>This will regenerate your profile banner.</FormDescription><FormMessage /></FormItem>)} />
                        <h3 className="text-md font-semibold pt-2 border-b pb-2">Social Links</h3>
                        <FormField control={form.control} name="github" render={({ field }) => (<FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input placeholder="https://github.com/your-username" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="youtube" render={({ field }) => (<FormItem><FormLabel>YouTube URL</FormLabel><FormControl><Input placeholder="https://youtube.com/@your-channel" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="instagram" render={({ field }) => (<FormItem><FormLabel>Instagram URL</FormLabel><FormControl><Input placeholder="https://instagram.com/your-username" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="discord" render={({ field }) => (<FormItem><FormLabel>Discord Username</FormLabel><FormControl><Input placeholder="your_username#1234" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <DialogFooter className="pt-4 sticky bottom-0 bg-background/95 backdrop-blur-sm">
                            <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save Changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
        
        <EditShowcaseDialog 
            isOpen={isShowcaseModalOpen} 
            onOpenChange={setIsShowcaseModalOpen} 
            allItems={unlockableItems} 
            currentPinned={pinnedItems} 
            onSave={(newPinned) => {
                setPinnedItems(newPinned);
                localStorage.setItem('pinnedItems', JSON.stringify(newPinned));
                toast({ title: 'Showcase Updated!' });
                setIsShowcaseModalOpen(false);
            }} 
        />

       <div className="mb-4"><Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button></div>
       <div className="relative mb-8 h-32 sm:h-48 rounded-lg overflow-hidden">
            <AiImage prompt={userData.bannerPrompt} alt="Profile banner" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
       </div>
       
       <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 space-y-8 -mt-20 sm:-mt-24 z-10">
            <Card className="text-center p-6 pt-0 border-2 border-transparent relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setIsEditModalOpen(true)}><Pencil className="h-4 w-4" /></Button>
                <TooltipProvider><Tooltip><TooltipTrigger asChild><div className={cn("w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full border-4 border-background ring-4 transition-all", avatarRingClass)}><AiAvatar prompt={userData.avatarPrompt} alt={userData.name} fallback={userData.name.substring(0, 2)} className="w-full h-full" /></div></TooltipTrigger><TooltipContent><p>{levelTooltip}</p></TooltipContent></Tooltip></TooltipProvider>
                <div className="flex items-center justify-center gap-2">
                    <h1 className="text-2xl font-bold font-headline">{userData.name}</h1>
                    {prestigeLevel > 0 && (
                        <TooltipProvider><Tooltip><TooltipTrigger>
                             <div className="flex items-center text-yellow-400 gap-1">
                                <Star className="h-5 w-5"/>
                                <span className="font-bold text-lg">{prestigeLevel}</span>
                            </div>
                        </TooltipTrigger><TooltipContent>Prestige Level {prestigeLevel}</TooltipContent></Tooltip></TooltipProvider>
                    )}
                </div>
                <p className="text-muted-foreground">{userData.title}</p>
                {userData.bio && <p className="text-sm text-muted-foreground mt-4 text-center">{userData.bio}</p>}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    {userData.guild && <motion.div whileHover={{ scale: 1.05 }}><Badge variant="secondary" className="text-accent"><Users className="h-3 w-3 mr-1" />{userData.guild.name} ({userData.guild.role})</Badge></motion.div>}
                    {membership !== 'Free' && <motion.div whileHover={{ scale: 1.05 }}><Badge className="bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500"><Star className="h-3 w-3 mr-1" />{membership} Member</Badge></motion.div>}
                </div>
                <Button className="mt-4 w-full" asChild><a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" />Connect with LinkedIn</a></Button>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-lg">Level Progress</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1 text-sm font-medium"><span>Level {level} ({levelName})</span><span className="font-mono text-primary">{xpForCurrentLevel} / {xpToNextLevel}</span></div>
                        <Progress value={xpProgress} aria-label={`${xpProgress}% to next level`} />
                        <p className="text-xs text-muted-foreground mt-1 text-right">Total XP: {totalXp.toLocaleString()}</p>
                    </div>
                </CardContent>
            </Card>
            
            <Socials links={userData.links} />

             <Card className="bg-gradient-to-br from-muted/20 to-muted/40">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2 text-lg"><Repeat /> Prestige</CardTitle>
                    <CardDescription>Once you reach Level {PRESTIGE_LEVEL_REQUIREMENT}, you can reset your level to earn a prestige badge and valuable rewards.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-full" disabled={level < PRESTIGE_LEVEL_REQUIREMENT}>
                                <Star className="mr-2 h-4 w-4"/>Prestige Up
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you ready to ascend?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Prestiging will reset your Level and XP to zero. Your stats and achievements will remain. In return, you will earn a permanent Prestige Badge and <span className="font-bold text-primary">{PRESTIGE_GEM_REWARD} Gems</span>. This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Not yet</AlertDialogCancel>
                                <AlertDialogAction onClick={handlePrestige}>Ascend</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>

        <div className="w-full lg:w-2/3">
             <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="collection">Collection</TabsTrigger>
                    <TabsTrigger value="statistics">Statistics</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6 space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-headline">Showcase</CardTitle>
                                <CardDescription>Your collection of titles and achievements.</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setIsShowcaseModalOpen(true)}><Pencil className="mr-2 h-4 w-4"/>Edit</Button>
                        </CardHeader>
                        <CardContent>
                            {displayedItems.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {displayedItems.map((item, i) => {
                                        const Icon = item.icon;
                                        return (
                                            <TooltipProvider key={i}><Tooltip><TooltipTrigger asChild>
                                                <motion.div className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg transition-all cursor-pointer h-full"
                                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                                                    whileHover={{ scale: 1.05, y: -5, backgroundColor: 'hsl(var(--muted))' }}
                                                >
                                                    <Icon className={cn("h-10 w-10 mb-2", ('color' in item) ? item.color : 'text-primary' )} />
                                                    <p className="text-sm font-semibold">{item.name}</p>
                                                </motion.div>
                                            </TooltipTrigger><TooltipContent><p className="font-bold">{item.name}</p>{item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}</TooltipContent></Tooltip></TooltipProvider>
                                        )
                                    })}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-4">Your showcase is empty. Pin some items to show them off!</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="collection" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2"><Package /> Your Collection</CardTitle>
                            <CardDescription>All the cosmetic items you've purchased from the shop.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {ownedItems.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {ownedItems.map((item, i) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                                <Icon className={cn("h-10 w-10 p-2 rounded-md", 'text-primary', 'bg-background/50')} />
                                                <div>
                                                    <p className="font-bold">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                             ) : (
                                <div className="text-center py-10">
                                    <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                                    <p className="mt-4 text-muted-foreground">Your collection is empty.</p>
                                    <Button variant="link" asChild><Link href="/shop">Visit the Shop</Link></Button>
                                </div>
                             )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="statistics" className="mt-6 space-y-8">
                     <Card>
                        <CardHeader><CardTitle className="font-headline">Battle Statistics</CardTitle><CardDescription>Your performance across all competitions.</CardDescription></CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatItem label="Total Battles" value={userData.stats.wins + userData.stats.losses} icon={Swords} />
                            <StatItem label="Wins" value={userData.stats.wins} icon={Trophy} />
                            <StatItem label="Losses" value={userData.stats.losses} icon={Shield} />
                            <StatItem label="Win Rate" value={winRate} icon={Percent} />
                            <StatItem label="Current Streak" value={userData.stats.streak} icon={Flame} />
                            <StatItem label="Longest Streak" value={userData.stats.longestStreak} icon={Flame} />
                            <StatItem label="Bosses Defeated" value={userData.stats.bossesDefeated} icon={Skull} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="font-headline flex items-center gap-2"><LineChart/>Skill Analysis</CardTitle><CardDescription>Your strengths based on recent performance data.</CardDescription></CardHeader>
                        <CardContent className="pl-0 pr-4 -mt-4"><SkillRadarChart data={mockSkillData} /></CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="history" className="mt-6">
                    <Card>
                        <CardHeader><CardTitle className="font-headline">Recent Battles</CardTitle><CardDescription>Latest competition history.</CardDescription></CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {userData.battleHistory.map((battle, i) => (
                                    <motion.div key={battle.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.1 }}
                                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                    >
                                        <div className="flex-1 space-y-1">
                                            <p className="font-semibold">{battle.challenge}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>vs</span>
                                                <AiAvatar prompt={battle.opponent.prompt} alt={battle.opponent.name} fallback={battle.opponent.name.substring(0,1)} className="w-5 h-5" />
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
                </TabsContent>
             </Tabs>
        </div>
       </div>
    </>
  );
}
