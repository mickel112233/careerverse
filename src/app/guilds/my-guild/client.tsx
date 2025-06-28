
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, Shield, Swords, MessageSquare, BarChart3, Star, PlusCircle, Crown, Settings, Trash2, UserCog, ArrowLeft, Send, Gem, Loader2, Pencil, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AiAvatar } from '@/components/ui/ai-avatar';
import { AiImage } from '@/components/ui/ai-image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { mockGuilds } from '@/lib/guild-data';


type GuildMember = {
    name: string;
    role: string;
    xp: number;
    coins: number;
    gems: number;
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
    slug: string;
    owner: string;
    members: GuildMember[];
};

type ChatMessage = {
    id: number;
    sender: string;
    avatarHint: string;
    message: string;
    timestamp: string;
};

type GuildChallenge = {
    id: string;
    opponentName: string;
    betAmount: number;
    status: 'Pending' | 'Active' | 'Victory' | 'Defeat';
    startTime: number;
}

const roleIcons: { [key: string]: React.ElementType } = { Leader: Crown, Officer: Star, Member: Shield, Admin: Shield, Friend: Shield, Don: Shield, Ghost: Shield, Hacker: Shield };
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

const ChatInterface = ({ guildId, members }: { guildId: string, members: GuildMember[] }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const chatLogRef = useRef<HTMLDivElement>(null);
    const currentUser = members.find(m => m.name === 'QuantumLeap');

    useEffect(() => {
        const storedMessages = localStorage.getItem(`chat_${guildId}`);
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, [guildId]);

    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '' || !currentUser) return;

        const newMessage: ChatMessage = {
            id: Date.now(),
            sender: currentUser.name,
            avatarHint: currentUser.avatarHint,
            message: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem(`chat_${guildId}`, JSON.stringify(updatedMessages));
        setInputValue('');
    };

    return (
        <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare /> Guild Chat</CardTitle><CardDescription>Coordinate with your guild members in real-time.</CardDescription></CardHeader>
            <CardContent>
                <div className="h-96 w-full bg-muted/50 rounded-lg flex flex-col p-4 border">
                    <div ref={chatLogRef} className="flex-grow space-y-4 overflow-y-auto pr-2">
                        <AnimatePresence>
                            {messages.map(msg => {
                                const isUser = msg.sender === currentUser?.name;
                                return (
                                    <motion.div key={msg.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={cn("flex items-end gap-3", isUser && "flex-row-reverse")}>
                                        <AiAvatar prompt={msg.avatarHint} alt={msg.sender} fallback={msg.sender.substring(0, 2)} className="w-8 h-8 shrink-0" />
                                        <div className="flex flex-col gap-1 max-w-[75%]">
                                            <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", isUser && "flex-row-reverse")}>
                                                <span>{msg.sender}</span>
                                                <span>{msg.timestamp}</span>
                                            </div>
                                            <div className={cn("p-3 rounded-lg text-sm", isUser ? "bg-primary text-primary-foreground rounded-br-none" : "bg-background rounded-bl-none")}>
                                                <p>{msg.message}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-4 border-t">
                        <Input placeholder="Send a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        <Button type="submit"><Send className="h-4 w-4" /></Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};

const editGuildSchema = z.object({
  guildName: z.string().min(3, "Must be at least 3 characters.").max(30),
  description: z.string().min(10, "Must be at least 10 characters.").max(200),
  requirements: z.string().max(200).optional(),
  crestHint: z.string().min(5, "Must be at least 5 characters.").max(100),
  bannerHint: z.string().min(5, "Must be at least 5 characters.").max(100),
});

const EditGuildDialog = ({ guild, isOpen, onOpenChange }: { guild: GuildData, isOpen: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof editGuildSchema>>({
        resolver: zodResolver(editGuildSchema),
        defaultValues: {
            guildName: guild.guildName,
            description: guild.description,
            requirements: guild.requirements,
            crestHint: guild.crestHint,
            bannerHint: guild.bannerHint,
        }
    });

    function onSubmit(values: z.infer<typeof editGuildSchema>) {
        const updatedGuild = {
            ...guild,
            ...values,
            slug: values.guildName.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-'),
        };
        localStorage.setItem('userGuild', JSON.stringify(updatedGuild));
        window.dispatchEvent(new Event('guildChange'));
        toast({ title: 'Guild Updated!', description: 'Your guild details have been saved.' });
        onOpenChange(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader><DialogTitle>Edit Guild</DialogTitle><DialogDescription>Modify your guild's public details and appearance.</DialogDescription></DialogHeader>
                <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
                    <FormField control={form.control} name="guildName" render={({ field }) => (<FormItem><FormLabel>Guild Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="requirements" render={({ field }) => (<FormItem><FormLabel>Requirements</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="crestHint" render={({ field }) => (<FormItem><FormLabel>Crest AI Prompt</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="bannerHint" render={({ field }) => (<FormItem><FormLabel>Banner AI Prompt</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save Changes</Button>
                </form></Form>
            </DialogContent>
        </Dialog>
    )
}

const declareWarSchema = z.object({
  opponentId: z.string().min(1, { message: "Please select an opponent." }),
  betAmount: z.coerce.number().min(50, { message: "Bet must be at least 50 gems." }),
});

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
    const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(targetDate - Date.now());
        }, 1000);

        if (timeLeft <= 0) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [targetDate, timeLeft]);

    if (timeLeft <= 0) {
        return (
            <div className="flex items-center gap-2 text-primary animate-pulse">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="font-mono">Starting...</span>
            </div>
        );
    }

    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
        <div className="flex items-center gap-2">
            <Clock className="h-4 w-4"/>
            <span className="font-mono">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
};


export default function MyGuildClient() {
    const router = useRouter();
    const [guild, setGuild] = useState<GuildData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);
    const [managingMember, setManagingMember] = useState<GuildMember | null>(null);
    const [selectedRole, setSelectedRole] = useState('');
    const { toast } = useToast();
    const [isManageMemberOpen, setIsManageMemberOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [challenges, setChallenges] = useState<GuildChallenge[]>([]);
    const [isDeclareWarOpen, setIsDeclareWarOpen] = useState(false);
    
    const declareWarForm = useForm<z.infer<typeof declareWarSchema>>({
        resolver: zodResolver(declareWarSchema),
        defaultValues: {
            opponentId: '',
            betAmount: 50,
        }
    });

    useEffect(() => {
        const membership = localStorage.getItem('careerClashMembership');
        if (membership && membership !== 'Free') setIsPremium(true);
        const storedChallenges = JSON.parse(localStorage.getItem('guildChallenges') || '[]');
        setChallenges(storedChallenges);
    }, []);

    const fetchGuild = () => {
        const storedGuild = localStorage.getItem('userGuild');
        setGuild(storedGuild ? JSON.parse(storedGuild) : null);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchGuild();
        window.addEventListener('guildChange', fetchGuild);
        return () => window.removeEventListener('guildChange', fetchGuild);
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            let challengesUpdated = false;
            const updatedChallenges = challenges.map(c => {
                if (c.status === 'Pending' && c.startTime && now >= c.startTime) {
                    challengesUpdated = true;
                    return { ...c, status: 'Active' as const };
                }
                return c;
            });

            if (challengesUpdated) {
                setChallenges(updatedChallenges);
                localStorage.setItem('guildChallenges', JSON.stringify(updatedChallenges));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [challenges]);


    const handleRoleChange = () => {
        if (!guild || !managingMember || !selectedRole) return;
        const updatedMembers = guild.members.map(member => member.name === managingMember.name ? { ...member, role: selectedRole } : member);
        const updatedGuild = { ...guild, members: updatedMembers };
        setGuild(updatedGuild);
        localStorage.setItem('userGuild', JSON.stringify(updatedGuild));
        setIsManageMemberOpen(false);
        setManagingMember(null);
        toast({ title: "Role Updated", description: `${managingMember.name} is now a ${selectedRole}.` });
    };

    const handleKickMember = () => {
        if (!guild || !managingMember) return;
        const updatedMembers = guild.members.filter(member => member.name !== managingMember.name);
        const updatedGuild = { ...guild, members: updatedMembers };
        setGuild(updatedGuild);
        localStorage.setItem('userGuild', JSON.stringify(updatedGuild));
        setIsManageMemberOpen(false);
        setManagingMember(null);
        toast({ title: "Member Removed", description: `${managingMember.name} has been removed from the guild.`, variant: 'destructive' });
    }

    const handleDisbandGuild = () => {
        localStorage.removeItem('userGuild');
        window.dispatchEvent(new Event('guildChange'));
        toast({ title: "Guild Disbanded", description: "You have successfully disbanded your guild." });
        router.push('/guilds');
    };

    const handleLeaveGuild = () => {
        if (!guild) return;
        const updatedMembers = guild.members.filter(member => member.name !== 'QuantumLeap');
        // This is a bit tricky. We are leaving a "mock" guild. The best we can do is remove ourselves from our local copy.
        // In a real app, this would be a backend call.
        const updatedGuild = { ...guild, members: updatedMembers };
        // We need to update the mock guild source if we want this to be "real" but that's beyond scope.
        // So we just remove ourselves locally.
        localStorage.removeItem('userGuild');
        window.dispatchEvent(new Event('guildChange'));
        toast({ title: "You have left the guild." });
        router.push('/guilds');
    }
    
    function onDeclareWarSubmit(values: z.infer<typeof declareWarSchema>) {
        if (!guild) return;
        const opponentGuild = mockGuilds.find(g => g.id === values.opponentId);
        if (!opponentGuild) {
            toast({ variant: 'destructive', title: 'Opponent not found.' });
            return;
        }
        
        const totalGems = guild.members.reduce((acc, member) => acc + member.gems, 0);
        if (totalGems < values.betAmount) {
            toast({ variant: 'destructive', title: 'Insufficient Gems', description: `Your guild does not have enough gems to place this bet.` });
            return;
        }

        const newChallenge: GuildChallenge = {
            id: `WAR-${Date.now()}`,
            opponentName: opponentGuild.name,
            betAmount: values.betAmount,
            status: 'Pending',
            startTime: Date.now() + 2 * 60 * 1000, // Starts in 2 minutes
        };
        const updatedChallenges = [...challenges, newChallenge];
        setChallenges(updatedChallenges);
        localStorage.setItem('guildChallenges', JSON.stringify(updatedChallenges));
        
        toast({ title: 'War Declared!', description: `You have challenged ${opponentGuild.name} to a Guild War!` });
        setIsDeclareWarOpen(false);
        declareWarForm.reset();
    }
    
    const handleSimulateWar = (challengeId: string) => {
        const winner = Math.random() > 0.5 ? 'player' : 'opponent';
        const updatedChallenges = challenges.map(c => 
            c.id === challengeId ? { ...c, status: winner === 'player' ? 'Victory' : 'Defeat' } : c
        );
        setChallenges(updatedChallenges);
        localStorage.setItem('guildChallenges', JSON.stringify(updatedChallenges));
        
        toast({ 
            title: `War with ${updatedChallenges.find(c => c.id === challengeId)?.opponentName} Complete!`,
            description: `Your guild was ${winner === 'player' ? 'victorious' : 'defeated'}.`,
            className: winner === 'player' ? 'bg-green-500 text-white' : 'bg-destructive text-white',
        });
    };


    if (isLoading) {
        return (
            <div className="space-y-8"><Skeleton className="h-32 sm:h-48 w-full rounded-lg" /><div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-20 ml-8"><Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg border-4 border-background flex-shrink-0" /><div className="pb-4 space-y-2"><Skeleton className="h-10 w-64" /><Skeleton className="h-6 w-96" /></div></div><Skeleton className="h-12 w-full max-w-md" /><Skeleton className="h-96 w-full rounded-lg" /></div>
        );
    }

    if (!guild) {
        return (
            <div className="text-center py-20"><Shield className="mx-auto h-16 w-16 text-muted-foreground" /><h2 className="mt-4 text-2xl font-bold font-headline">You are not in a guild</h2><p className="mt-2 text-lg text-muted-foreground">Join a guild to team up with other players or create your own!</p><div className="mt-6 flex justify-center gap-4"><Button asChild><Link href="/guilds"><Users className="mr-2 h-4 w-4" />Explore Guilds</Link></Button><Button asChild variant="outline"><Link href="/guilds/create"><PlusCircle className="mr-2 h-4 w-4" />Create a Guild</Link></Button></div></div>
        );
    }

    const isOwner = guild.owner === 'QuantumLeap';
    const totalXp = guild.members.reduce((acc, member) => acc + member.xp, 0);

    return (
        <div>
            <Button variant="ghost" onClick={() => router.push('/guilds')} className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" />Back to Guilds</Button>
            <Dialog open={isManageMemberOpen} onOpenChange={(isOpen) => { setIsManageMemberOpen(isOpen); if (!isOpen) setManagingMember(null); }}><DialogContent><DialogHeader><DialogTitle>Manage {managingMember?.name}</DialogTitle><DialogDescription>Assign a new role or remove this member from the guild.</DialogDescription></DialogHeader><div className="space-y-4 py-4"><div className="space-y-2"><Label htmlFor="role-select">Assign Role</Label><TooltipProvider><Tooltip><TooltipTrigger asChild><div className={cn(!isPremium && "cursor-not-allowed")}><Select onValueChange={setSelectedRole} defaultValue={managingMember?.role} disabled={!isPremium}><SelectTrigger id="role-select" className="w-full"><SelectValue placeholder="Select a role" /></SelectTrigger><SelectContent><SelectItem value="Member">Member</SelectItem><SelectItem value="Officer">Officer</SelectItem>{premiumRoles.map(role => (<SelectItem key={role} value={role}>{role}</SelectItem>))}</SelectContent></Select></div></TooltipTrigger>{!isPremium && <TooltipContent><p>Upgrade your membership to assign premium roles.</p></TooltipContent>}</Tooltip></TooltipProvider></div><Button onClick={handleRoleChange} disabled={!selectedRole || selectedRole === managingMember?.role}>Update Role</Button></div><div className="border-t pt-4"><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive" className="w-full" disabled={!managingMember}><Trash2 className="mr-2 h-4 w-4" /> Kick {managingMember?.name}</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently remove {managingMember?.name} from the guild.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleKickMember} className={cn(buttonVariants({ variant: "destructive" }))}>Kick Member</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div></DialogContent></Dialog>
            
            {isOwner && <EditGuildDialog guild={guild} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />}

            <Card className="mb-8 overflow-hidden"><div className="relative h-32 sm:h-48 bg-muted"><AiImage prompt={guild.bannerHint} alt="Guild Banner" layout="fill" objectFit="cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /></div><div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 sm:-mt-20 px-4 sm:px-6 pb-6 bg-gradient-to-t from-card to-transparent"><div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6"><AiImage prompt={guild.crestHint} width={128} height={128} alt={guild.guildName} className="bg-muted rounded-lg border-4 border-card w-24 h-24 sm:w-32 sm:h-32 shrink-0" /><div className="text-center sm:text-left"><h1 className="text-3xl sm:text-4xl font-bold font-headline">{guild.guildName}</h1><p className="text-muted-foreground text-sm sm:text-base max-w-xl mt-1">{guild.description}</p></div></div></div></Card>

            <Tabs defaultValue="dashboard" className="w-full"><TabsList className="grid w-full grid-cols-3 md:grid-cols-5"><TabsTrigger value="dashboard">Dashboard</TabsTrigger><TabsTrigger value="members">Members</TabsTrigger><TabsTrigger value="battles">Battles</TabsTrigger><TabsTrigger value="chat">Chat</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>
                <TabsContent value="dashboard" className="mt-6"><div className="grid md:grid-cols-3 gap-6 mb-6"><StatCard icon={Trophy} label="Guild Rank" value="#12" /><StatCard icon={BarChart3} label="Total XP" value={totalXp.toLocaleString()} /><StatCard icon={Users} label="Members" value={`${guild.members.length} / ${guild.capacity}`} /></div><Card><CardHeader><CardTitle>Announcements</CardTitle></CardHeader><CardContent className="space-y-4"><div className="p-4 bg-muted/50 rounded-lg"><h3 className="font-semibold">Guild Wars are now active!</h3><p className="text-sm text-muted-foreground">Challenge other guilds from the 'Battles' tab. Winner takes the pot!</p><p className="text-xs text-muted-foreground/70 mt-2">Just now</p></div></CardContent></Card></TabsContent>
                <TabsContent value="members" className="mt-6"><Card><CardHeader><CardTitle>Member Roster</CardTitle><CardDescription>The backbone of our guild.</CardDescription></CardHeader><CardContent><motion.ul className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05, }, }, }} >{guild.members.map((member) => { const RoleIcon = roleIcons[member.role] || Shield; return (<motion.li key={member.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, }}><div className="flex items-center gap-4"><AiAvatar prompt={member.avatarHint} alt={member.name} fallback={member.name.substring(0, 2)} /><div><p className="font-semibold">{member.name}</p><TooltipProvider><Tooltip><TooltipTrigger asChild><div className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer"><RoleIcon className="h-4 w-4" /> {member.role}</div></TooltipTrigger><TooltipContent><p>{member.role}</p></TooltipContent></Tooltip></TooltipProvider></div></div><div className="flex items-center gap-4"><p className="font-mono text-primary font-semibold text-sm sm:text-base">{member.xp.toLocaleString()} XP</p>{isOwner && member.name !== 'QuantumLeap' && (<Button variant="ghost" size="icon" onClick={() => { setManagingMember(member); setIsManageMemberOpen(true); setSelectedRole(member.role); }}><UserCog className="h-5 w-5" /></Button>)}</div></motion.li>)})}</motion.ul></CardContent></Card></TabsContent>
                <TabsContent value="battles" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                         <Dialog open={isDeclareWarOpen} onOpenChange={setIsDeclareWarOpen}>
                            <Card className="bg-gradient-to-br from-primary/10 to-transparent">
                                <CardHeader>
                                    <CardTitle>Start a Guild War</CardTitle>
                                    <CardDescription>Challenge a rival guild to a team-based battle for glory and gems.</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <DialogTrigger asChild>
                                        <Button size="lg"><Swords className="mr-2 h-5 w-5" />Declare War</Button>
                                    </DialogTrigger>
                                </CardFooter>
                            </Card>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Declare a Guild War</DialogTitle>
                                    <DialogDescription>Challenge another guild. The winner takes the entire gem pot.</DialogDescription>
                                </DialogHeader>
                                <Form {...declareWarForm}>
                                    <form onSubmit={declareWarForm.handleSubmit(onDeclareWarSubmit)} className="space-y-4">
                                        <FormField
                                            control={declareWarForm.control}
                                            name="opponentId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Opponent Guild</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a guild to challenge" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {mockGuilds.filter(g => g.id !== guild?.id).map(g => (
                                                                <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={declareWarForm.control}
                                            name="betAmount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gem Wager (Each Guild Bets)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" min="50" {...field} />
                                                    </FormControl>
                                                    <FormDescription>Your guild must have at least this many gems total.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full" disabled={declareWarForm.formState.isSubmitting}>
                                            {declareWarForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Send Challenge
                                        </Button>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                        <Card>
                            <CardHeader><CardTitle>War Room</CardTitle><CardDescription>Active and past war declarations.</CardDescription></CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {challenges.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No active wars. Time to start one!</p>}
                                    {challenges.map((c) => (
                                         <li key={c.id} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-lg">
                                            <div>
                                                <p>vs <span className="font-semibold">{c.opponentName}</span></p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1"><Gem className="h-3 w-3 text-primary" /> Bet: {c.betAmount} Gems</p>
                                            </div>
                                             {c.status === 'Pending' && c.startTime ? (
                                                <div className="text-sm text-muted-foreground">
                                                    <CountdownTimer targetDate={c.startTime} />
                                                </div>
                                            ) : c.status === 'Active' ? (
                                                <Button size="sm" onClick={() => handleSimulateWar(c.id)}>Simulate War</Button>
                                            ) : (
                                                <Badge variant={c.status === 'Victory' ? 'default' : 'destructive'} className={cn(c.status === 'Victory' && 'bg-green-500/80')}>{c.status}</Badge>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="chat" className="mt-6"><ChatInterface guildId={guild.id} members={guild.members} /></TabsContent>
                <TabsContent value="settings" className="mt-6"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Settings /> Guild Settings</CardTitle><CardDescription>Manage your guild's public information or leave the guild.</CardDescription></CardHeader><CardContent className="space-y-6">{isOwner && <Button onClick={() => setIsEditDialogOpen(true)}><Pencil className="mr-2 h-4 w-4" /> Edit Guild Details</Button>}<Card className="border-destructive/50"><CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><Trash2 /> Danger Zone</CardTitle><CardDescription>These actions are irreversible. Proceed with caution.</CardDescription></CardHeader><CardContent>{isOwner ? (<div><h3 className="font-semibold">Disband Guild</h3><p className="text-sm text-muted-foreground mb-4">Disbanding the guild will permanently delete all associated data and remove all members. This cannot be undone.</p><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive">Disband {guild.guildName}</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently disband your guild and remove all your members.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDisbandGuild} className={cn(buttonVariants({ variant: "destructive" }))}>Disband Guild</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div>) : (<div><h3 className="font-semibold">Leave Guild</h3><p className="text-sm text-muted-foreground mb-4">Leaving the guild will remove your access to its chat and events. You can rejoin later if it's public or you have an invite.</p><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive">Leave {guild.guildName}</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle><AlertDialogDescription>You will be removed from the guild. You can rejoin later.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Stay in Guild</AlertDialogCancel><AlertDialogAction onClick={handleLeaveGuild} className={cn(buttonVariants({ variant: "destructive" }))}>Leave Guild</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div>)}</CardContent></Card></CardContent></Card></TabsContent>
            </Tabs>
        </div>
    );
}

    