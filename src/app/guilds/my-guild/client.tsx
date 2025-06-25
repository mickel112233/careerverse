
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, Shield, Swords, MessageSquare, BarChart3, Star, PlusCircle, Crown, Settings, Trash2, UserCog } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AiAvatar } from '@/components/ui/ai-avatar';
import { AiImage } from '@/components/ui/ai-image';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

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

export default function MyGuildClient() {
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

    return (
        <div>
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
                        <Button variant="destructive" className="w-full" onClick={handleKickMember}>
                            <Trash2 className="mr-2 h-4 w-4"/> Kick {managingMember?.name}
                        </Button>
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
                        <DialogTrigger asChild>
                             <Button variant="secondary" size="sm"><Settings className="mr-2 h-4 w-4"/>Manage Guild</Button>
                        </DialogTrigger>
                    </div>
                </Card>
            </Dialog>

            <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="battles">Battles</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
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
                           <ul className="space-y-4">
                            {guild.members.map((member) => {
                                const RoleIcon = roleIcons[member.role] || Shield;
                                return (
                                    <li key={member.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
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
                                            {guild.owner === 'QuantumLeap' && member.name !== 'QuantumLeap' && (
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setManagingMember(member)}>
                                                        <UserCog className="h-5 w-5"/>
                                                    </Button>
                                                </DialogTrigger>
                                            )}
                                        </div>
                                    </li>
                                )
                            })}
                           </ul>
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
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquare /> Guild Chat</CardTitle>
                            <CardDescription>This feature is coming soon!</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="h-80 w-full bg-muted/50 rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground">Chat interface will be here.</p>
                           </div>
                        </CardContent>
                     </Card>
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Settings /> Guild Settings</CardTitle>
                            <CardDescription>Manage your guild's public information. (Feature coming soon)</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="h-80 w-full bg-muted/50 rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground">Settings management interface will be here.</p>
                           </div>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
