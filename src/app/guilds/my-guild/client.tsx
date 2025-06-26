
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, Shield, Swords, MessageSquare, BarChart3, Star, PlusCircle, Crown, Settings, Trash2, UserCog, ArrowLeft, Send } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AiAvatar } from '@/components/ui/ai-avatar';
import { AiImage } from '@/components/ui/ai-image';
import { motion } from 'framer-motion';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

type GuildMember = {
    name: string;
    role: string;
    xp: number;
    avatarHint: string;
};

type GuildData = {
    id: string;
    guildName: string;
    description: string;
    requirements: string;
    type: 'public' | 'private';
    password?: string;
    capacity: number;
    bannerHint: string;
    crestHint: string;
    owner: string;
    members: GuildMember[];
};

const mockInitialMembers = [
    { name: 'SynthWave', role: 'Officer', xp: 9500, avatarHint: 'cyberpunk man portrait' },
    { name: 'CodeNinja', role: 'Member', xp: 9200, avatarHint: 'hacker with glasses' },
    { name: 'DataDynamo', role: 'Member', xp: 8900, avatarHint: 'data scientist smiling' },
    { name: 'PixelPerfect', role: 'Member', xp: 8750, avatarHint: 'designer serious' },
];

const mockAnnouncements = [
    { title: 'Guild War vs. The Backend Brigade!', content: 'This Friday at 8 PM EST. Sign-ups are open now in the #events channel. All levels welcome!', timestamp: '2 hours ago' },
    { title: 'Top Member of the Week: CodeNinja', content: 'Congrats to CodeNinja for earning over 10,000 XP this week! Your dedication is an inspiration to us all.', timestamp: '1 day ago' },
];

const mockBattleHistory = [
    { opponent: 'Backend Brigade', result: 'Victory', score: '3-1', date: 'Last week' },
    { opponent: 'Data Mavericks', result: 'Defeat', score: '2-3', date: '2 weeks ago' },
    { opponent: 'Cyber Sentinels', result: 'Victory', score: '4-1', date: '3 weeks ago' },
];

const roleIcons: { [key: string]: React.ElementType } = {
    Leader: Crown,
    Officer: Star,
    Don: Shield,
    Hacker: Shield,
    Ghost: Shield,
    Admin: Shield,
    Member: Shield,
};

const premiumRoles = ['Admin', 'Friend', 'Don', 'Ghost', 'Hacker'];

const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-muted/50 h-full">
            <CardContent className="p-4 flex items-center gap-4">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold font-headline">{value}</p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

const ChatPlaceholder = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare /> Guild Chat</CardTitle>
            <CardDescription>This feature is coming soon! Here's a preview of what it will look like.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="h-96 w-full bg-muted/50 rounded-lg flex flex-col p-4 space-y-4">
                <div className="flex-grow space-y-4 overflow-y-auto">
                     <div className="flex items-start gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-48" />
                        </div>
                    </div>
                     <div className="flex items-start gap-3 justify-end">
                        <div className="space-y-1 text-right">
                            <Skeleton className="h-4 w-24 ml-auto" />
                            <Skeleton className="h-16 w-56 ml-auto" />
                        </div>
                        <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                     <div className="flex items-start gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-1">
                             <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-32" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t">
                    <Input placeholder="Chat is coming soon..." disabled/>
                    <Button disabled><Send className="h-4 w-4"/></Button>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default function MyGuildClient() {
    const router = useRouter();
    const [guild, setGuild] = useState<GuildData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);
    const [managingMember, setManagingMember] = useState<GuildMember | null>(null);
    const [selectedRole, setSelectedRole] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        const membership = localStorage.getItem('careerClashMembership');
        if (membership && membership !== 'Free') {
            setIsPremium(true);
        }
    }, []);

    const fetchGuild = () => {
        const storedGuild = localStorage.getItem('userGuild');
        if (storedGuild) {
            let guildData = JSON.parse(storedGuild);
            // Ensure mock members are added if the guild is newly created
            if (guildData.members.length === 1 && guildData.owner === 'QuantumLeap') {
                guildData.members.push(...mockInitialMembers);
                localStorage.setItem('userGuild', JSON.stringify(guildData));
            }
            setGuild(guildData);
        } else {
            setGuild(null);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchGuild();
        window.addEventListener('guildChange', fetchGuild);
        return () => window.removeEventListener('guildChange', fetchGuild);
    }, []);

    const handleRoleChange = () => {
        if (!guild || !managingMember || !selectedRole) return;

        const updatedMembers = guild.members.map(member =>
            member.name === managingMember.name ? { ...member, role: selectedRole } : member
        );

        const updatedGuild = { ...guild, members: updatedMembers };
        setGuild(updatedGuild);
        localStorage.setItem('userGuild', JSON.stringify(updatedGuild));
        setManagingMember(null);
        toast({ title: "Role Updated", description: `${managingMember.name} is now a ${selectedRole}.` });
    };

    const handleKickMember = () => {
        if (!guild || !managingMember) return;
        
        const updatedMembers = guild.members.filter(member => member.name !== managingMember.name);
        const updatedGuild = { ...guild, members: updatedMembers };
        setGuild(updatedGuild);
        localStorage.setItem('userGuild', JSON.stringify(updatedGuild));
        setManagingMember(null);
        toast({ title: "Member Removed", description: `${managingMember.name} has been removed from the guild.`, variant: 'destructive' });
    }

    const handleDisbandGuild = () => {
        localStorage.removeItem('userGuild');
        window.dispatchEvent(new Event('guildChange'));
        toast({ title: "Guild Disbanded", description: "You have successfully disbanded your guild."});
        router.push('/guilds');
    };

    const handleLeaveGuild = () => {
        localStorage.removeItem('userGuild');
        window.dispatchEvent(new Event('guildChange'));
        toast({ title: "You have left the guild."});
        router.push('/guilds');
    }

    if (isLoading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="flex items-end gap-4 -mt-20 ml-8">
                    <Skeleton className="h-32 w-32 rounded-lg border-4 border-background" />
                    <div className="pb-4 space-y-2">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-6 w-96" />
                    </div>
                </div>
                 <Skeleton className="h-12 w-full max-w-md" />
                 <Skeleton className="h-96 w-full rounded-lg" />
            </div>
        );
    }

    if (!guild) {
        return (
            <div className="text-center py-20">
                <Shield className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-bold font-headline">You are not in a guild</h2>
                <p className="mt-2 text-lg text-muted-foreground">Join a guild to team up with other players or create your own!</p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button asChild>
                        <Link href="/guilds">
                            <Users className="mr-2 h-4 w-4" />
                            Explore Guilds
                        </Link>
                    </Button>
                     <Button asChild variant="outline">
                        <Link href="/guilds/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create a Guild
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
    
    const isOwner = guild.owner === 'QuantumLeap';

    return (
        <div>
            <Button variant="ghost" onClick={() => router.push('/guilds')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Guilds
            </Button>
            <Dialog onOpenChange={(isOpen) => !isOpen && setManagingMember(null)}>
                <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Manage {managingMember?.name}</DialogTitle>
                        <DialogDescription>Assign a new role or remove this member from the guild.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="role-select">Assign Role</Label>
                             <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className={cn(!isPremium && "cursor-not-allowed")}>
                                            <Select
                                                onValueChange={setSelectedRole}
                                                defaultValue={managingMember?.role}
                                                disabled={!isPremium}
                                            >
                                                <SelectTrigger id="role-select" className="w-full">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Member">Member</SelectItem>
                                                    <SelectItem value="Officer">Officer</SelectItem>
                                                    {premiumRoles.map(role => (
                                                        <SelectItem key={role} value={role}>{role}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </TooltipTrigger>
                                    {!isPremium && <TooltipContent><p>Upgrade your membership to assign premium roles.</p></TooltipContent>}
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                         <Button onClick={handleRoleChange} disabled={!selectedRole || selectedRole === managingMember?.role}>Update Role</Button>
                    </div>
                     <div className="border-t pt-4">
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full" disabled={!managingMember}>
                                    <Trash2 className="mr-2 h-4 w-4"/> Kick {managingMember?.name}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently remove {managingMember?.name} from the guild.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleKickMember} className={cn(buttonVariants({ variant: "destructive" }))}>
                                    Kick Member
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </DialogContent>

                <Card className="mb-8 overflow-hidden">
                    <div className="relative h-48 bg-muted">
                        <AiImage prompt={guild.bannerHint} alt="Guild Banner" layout="fill" objectFit="cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-4 -mt-16 px-6 pb-6 bg-gradient-to-t from-card to-transparent">
                        <div className="flex items-end gap-6">
                            <AiImage prompt={guild.crestHint} width={128} height={128} alt={guild.guildName} className="bg-muted rounded-lg border-4 border-card" />
                            <div>
                                <h1 className="text-4xl font-bold font-headline">{guild.guildName}</h1>
                                <p className="text-muted-foreground max-w-xl">{guild.description}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </Dialog>

            <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="battles">Battles</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    {isOwner && <TabsTrigger value="settings">Settings</TabsTrigger>}
                </TabsList>
                <TabsContent value="dashboard" className="mt-6">
                   <div className="grid md:grid-cols-3 gap-6 mb-6">
                       <StatCard icon={Trophy} label="Guild Rank" value="#12" />
                       <StatCard icon={BarChart3} label="Total XP" value="1.2M" />
                       <StatCard icon={Users} label="Members" value={`${guild.members.length} / ${guild.capacity}`} />
                   </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Announcements</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockAnnouncements.map((ann, i) => (
                                <div key={i} className="p-4 bg-muted/50 rounded-lg">
                                    <h3 className="font-semibold">{ann.title}</h3>
                                    <p className="text-sm text-muted-foreground">{ann.content}</p>
                                    <p className="text-xs text-muted-foreground/70 mt-2">{ann.timestamp}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="members" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Member Roster</CardTitle>
                            <CardDescription>The backbone of our guild.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <motion.ul 
                                className="space-y-4"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                        },
                                    },
                                }}
                            >
                            {guild.members.map((member) => {
                                const RoleIcon = roleIcons[member.role] || Shield;
                                return (
                                    <motion.li 
                                        key={member.name} 
                                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <AiAvatar prompt={member.avatarHint} alt={member.name} fallback={member.name.substring(0,2)} />
                                            <div>
                                                <p className="font-semibold">{member.name}</p>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer">
                                                                <RoleIcon className="h-4 w-4" /> {member.role}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>{member.role}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <p className="font-mono text-primary font-semibold">{member.xp.toLocaleString()} XP</p>
                                            {isOwner && member.name !== 'QuantumLeap' && (
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setManagingMember(member)}>
                                                        <UserCog className="h-5 w-5"/>
                                                    </Button>
                                                </DialogTrigger>
                                            )}
                                        </div>
                                    </motion.li>
                                )
                            })}
                           </motion.ul>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="battles" className="mt-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-primary/10 to-transparent">
                            <CardHeader>
                                <CardTitle>Start a Guild War</CardTitle>
                                <CardDescription>Challenge a rival guild to a team-based battle. Requires 5 active members online.</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button size="lg" disabled>
                                    <Swords className="mr-2 h-5 w-5" />
                                    Find Opponent (Coming Soon)
                                </Button>
                            </CardFooter>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Battle History</CardTitle>
                                <CardDescription>Our guild's recent triumphs and lessons learned.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                {mockBattleHistory.map((battle, i) => (
                                    <li key={i} className="flex justify-between items-center text-sm">
                                        <p>vs <span className="font-semibold">{battle.opponent}</span></p>
                                        <Badge variant={battle.result === 'Victory' ? 'default' : 'destructive'} className={battle.result === 'Victory' ? 'bg-green-500/20 text-green-400 border-green-500' : ''}>
                                            {battle.result} ({battle.score})
                                        </Badge>
                                        <p className="text-muted-foreground">{battle.date}</p>
                                    </li>
                                ))}
                                </ul>
                            </CardContent>
                        </Card>
                     </div>
                </TabsContent>
                 <TabsContent value="chat" className="mt-6">
                     <ChatPlaceholder />
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Settings /> Guild Settings</CardTitle>
                            <CardDescription>Manage your guild's public information or leave the guild.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Card className="border-destructive/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-destructive"><Trash2 /> Danger Zone</CardTitle>
                                    <CardDescription>These actions are irreversible. Proceed with caution.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                     {isOwner ? (
                                        <div>
                                            <h3 className="font-semibold">Disband Guild</h3>
                                            <p className="text-sm text-muted-foreground mb-4">Disbanding the guild will permanently delete all associated data and remove all members. This cannot be undone.</p>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">Disband {guild.guildName}</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently disband your guild and remove all your members.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleDisbandGuild} className={cn(buttonVariants({ variant: "destructive" }))}>Disband Guild</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3 className="font-semibold">Leave Guild</h3>
                                            <p className="text-sm text-muted-foreground mb-4">Leaving the guild will remove your access to its chat and events. You can rejoin later if it's public or you have an invite.</p>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive">Leave {guild.guildName}</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            You will be removed from the guild. You can rejoin later.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Stay in Guild</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleLeaveGuild} className={cn(buttonVariants({ variant: "destructive" }))}>Leave Guild</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
