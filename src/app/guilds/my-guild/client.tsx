
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, Shield, Swords, MessageSquare, BarChart3, Star, PlusCircle, Crown, Settings, Trash2, UserCog, ArrowLeft, Send, Gem, Loader2, Pencil, Clock, Coins } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AiAvatar } from '@/components/ui/ai-avatar';
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
import { usePlayerProfile } from '@/contexts/PlayerProfileProvider';
import type { Guild, GuildMember } from '@/lib/guild-data';


type ChatMessage = {
    id: number;
    sender: string;
    prompt: string;
    message: string;
    timestamp: string;
};

const roleIcons: { [key: string]: React.ElementType } = { Leader: Crown, Officer: Star, Member: Shield, Admin: Shield, Friend: Shield, Don: Shield, Ghost: Shield, Hacker: Shield };
const premiumRoles = ['Admin', 'Friend', 'Don', 'Ghost', 'Hacker'];

const StatCard = ({ icon: Icon, label, value, children }: { icon: React.ElementType, label: string, value: string | number, children?: React.ReactNode }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-muted/50 h-full relative">
            <CardContent className="p-4 flex items-center gap-4">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold font-headline">{value}</p>
                </div>
            </CardContent>
             {children}
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
            prompt: currentUser.prompt,
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
                                        <AiAvatar prompt={msg.prompt} alt={msg.sender} fallback={msg.sender.substring(0, 2)} className="w-8 h-8 shrink-0" />
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
  name: z.string().min(3, "Must be at least 3 characters.").max(30),
  description: z.string().min(10, "Must be at least 10 characters.").max(200),
  requirements: z.string().max(200).optional(),
});

const EditGuildDialog = ({ guild, isOpen, onOpenChange, onUpdate }: { guild: Guild, isOpen: boolean, onOpenChange: (open: boolean) => void, onUpdate: (newGuild: Guild) => void }) => {
    const { toast } = useToast();
    const [crestImage, setCrestImage] = useState<string | null>(guild.crestImage ? (typeof guild.crestImage === 'string' ? guild.crestImage : guild.crestImage.src) : null);
    const [bannerImage, setBannerImage] = useState<string | null>(guild.bannerImage ? (typeof guild.bannerImage === 'string' ? guild.bannerImage : guild.bannerImage.src) : null);

    const form = useForm<z.infer<typeof editGuildSchema>>({
        resolver: zodResolver(editGuildSchema),
        defaultValues: {
            name: guild.name,
            description: guild.description,
            requirements: guild.requirements,
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'crest' | 'banner') => {
        const file = e.target.files?.[0];
        if (file) {
             if (file.size > 2 * 1024 * 1024) { // 2MB limit
              toast({ variant: 'destructive', title: 'File too large', description: 'Please upload an image smaller than 2MB.'});
              return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                if (type === 'crest') {
                    setCrestImage(base64String);
                } else {
                    setBannerImage(base64String);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    function onSubmit(values: z.infer<typeof editGuildSchema>) {
        const updatedGuild: Guild = {
            ...guild,
            ...values,
            slug: values.name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-'),
            crestImage: crestImage || guild.crestImage,
            bannerImage: bannerImage || guild.bannerImage,
            image: crestImage || guild.crestImage, // Update main image too
        };
        onUpdate(updatedGuild);
        toast({ title: 'Guild Updated!', description: 'Your guild details have been saved.' });
        onOpenChange(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader><DialogTitle>Edit Guild</DialogTitle><DialogDescription>Modify your guild's public details and appearance.</DialogDescription></DialogHeader>
                <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
                    <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Guild Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="requirements" render={({ field }) => (<FormItem><FormLabel>Requirements</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    
                    <div className="space-y-2">
                        <Label>Guild Crest</Label>
                        <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'crest')} />
                        {crestImage && <Image src={crestImage} alt="Crest preview" width={128} height={128} className="rounded-lg mt-2 border" />}
                    </div>
                     <div className="space-y-2">
                        <Label>Guild Banner</Label>
                        <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'banner')} />
                        {bannerImage && <Image src={bannerImage} alt="Banner preview" width={250} height={62.5} className="rounded-lg mt-2 border aspect-[4/1] object-cover" />}
                    </div>
                    
                    <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save Changes</Button>
                </form></Form>
            </DialogContent>
        </Dialog>
    )
}

export default function MyGuildClient() {
    const router = useRouter();
    const { showPlayerProfile } = usePlayerProfile();
    const [guild, setGuild] = useState<Guild | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);
    const [managingMember, setManagingMember] = useState<GuildMember | null>(null);
    const [selectedRole, setSelectedRole] = useState('');
    const { toast } = useToast();
    const [isManageMemberOpen, setIsManageMemberOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    useEffect(() => {
        const membership = localStorage.getItem('careerClashMembership');
        if (membership && membership !== 'Free' && membership !== 'Basic') setIsPremium(true);
    }, []);
    
    const updateGuildInStorage = (updatedGuild: Guild) => {
        localStorage.setItem('userGuild', JSON.stringify(updatedGuild));
        window.dispatchEvent(new Event('guildChange'));
    }

    const fetchGuild = () => {
        const storedGuildString = localStorage.getItem('userGuild');
        if (storedGuildString) {
            const guildData: Guild = JSON.parse(storedGuildString);
            
            const userIndex = guildData.members.findIndex(m => m.name === 'QuantumLeap');
            if (userIndex !== -1) {
                guildData.members[userIndex].xp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
                guildData.members[userIndex].coins = parseInt(localStorage.getItem('careerClashCoins') || '100', 10);
                guildData.members[userIndex].gems = parseInt(localStorage.getItem('careerClashGems') || '5', 10);
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
        const updatedMembers = guild.members.map(member => member.name === managingMember.name ? { ...member, role: selectedRole as GuildMember['role'] } : member);
        const updatedGuild = { ...guild, members: updatedMembers };
        setGuild(updatedGuild);
        updateGuildInStorage(updatedGuild);
        setIsManageMemberOpen(false);
        setManagingMember(null);
        toast({ title: "Role Updated", description: `${managingMember.name} is now a ${selectedRole}.` });
    };

    const handleKickMember = () => {
        if (!guild || !managingMember) return;
        const updatedMembers = guild.members.filter(member => member.name !== managingMember.name);
        const updatedGuild = { ...guild, members: updatedMembers };
        setGuild(updatedGuild);
        updateGuildInStorage(updatedGuild);
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
        localStorage.removeItem('userGuild');
        window.dispatchEvent(new Event('guildChange'));
        toast({ title: "You have left the guild." });
        router.push('/guilds');
    }

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
    const totalCoins = guild.members.reduce((acc, member) => acc + (member.coins || 0), 0);
    const totalGems = guild.members.reduce((acc, member) => acc + (member.gems || 0), 0);


    return (
        <div>
            <Button variant="ghost" onClick={() => router.push('/guilds')} className="mb-4"><ArrowLeft className="mr-2 h-4 w-4" />Back to Guilds</Button>
            <Dialog open={isManageMemberOpen} onOpenChange={(isOpen) => { setIsManageMemberOpen(isOpen); if (!isOpen) setManagingMember(null); }}><DialogContent><DialogHeader><DialogTitle>Manage {managingMember?.name}</DialogTitle><DialogDescription>Assign a new role or remove this member from the guild.</DialogDescription></DialogHeader><div className="space-y-4 py-4"><div className="space-y-2"><Label htmlFor="role-select">Assign Role</Label><TooltipProvider><Tooltip><TooltipTrigger asChild><div className={cn(!isPremium && "cursor-not-allowed")}><Select onValueChange={setSelectedRole} defaultValue={managingMember?.role} disabled={!isPremium}><SelectTrigger id="role-select" className="w-full"><SelectValue placeholder="Select a role" /></SelectTrigger><SelectContent><SelectItem value="Member">Member</SelectItem><SelectItem value="Officer">Officer</SelectItem>{premiumRoles.map(role => (<SelectItem key={role} value={role}>{role}</SelectItem>))}</SelectContent></Select></div></TooltipTrigger>{!isPremium && <TooltipContent><p>Upgrade your membership to assign premium roles.</p></TooltipContent>}</Tooltip></TooltipProvider></div><Button onClick={handleRoleChange} disabled={!selectedRole || selectedRole === managingMember?.role}>Update Role</Button></div><div className="border-t pt-4"><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive" className="w-full" disabled={!managingMember}><Trash2 className="mr-2 h-4 w-4" /> Kick {managingMember?.name}</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently remove {managingMember?.name} from the guild.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleKickMember} className={cn(buttonVariants({ variant: "destructive" }))}>Kick Member</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div></DialogContent></Dialog>
            
            {isOwner && guild && <EditGuildDialog guild={guild} isOpen={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} onUpdate={updateGuildInStorage} />}

            <Card className="mb-8 overflow-hidden"><div className="relative h-32 sm:h-48 bg-muted"><Image src={guild.bannerImage} alt="Guild Banner" layout="fill" objectFit="cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /></div><div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 sm:-mt-20 px-4 sm:px-6 pb-6 bg-gradient-to-t from-card to-transparent"><div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6"><Image src={guild.crestImage} width={128} height={128} alt={guild.name} className="bg-muted rounded-lg border-4 border-card w-24 h-24 sm:w-32 sm:h-32 shrink-0" /><div className="text-center sm:text-left"><h1 className="text-3xl sm:text-4xl font-bold font-headline">{guild.name}</h1><p className="text-muted-foreground text-sm sm:text-base max-w-xl mt-1">{guild.description}</p></div></div>
            {isOwner && <Button variant="outline" size="icon" className="absolute top-4 right-4 bg-black/50 hover:bg-black/80" onClick={() => setIsEditDialogOpen(true)}><Pencil className="h-4 w-4" /></Button>}
            </div></Card>

            <Tabs defaultValue="dashboard" className="w-full"><TabsList className="grid w-full grid-cols-3 md:grid-cols-5"><TabsTrigger value="dashboard">Dashboard</TabsTrigger><TabsTrigger value="members">Members</TabsTrigger><TabsTrigger value="battles">Battles</TabsTrigger><TabsTrigger value="chat">Chat</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>
                <TabsContent value="dashboard" className="mt-6"><div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                    <StatCard icon={BarChart3} label="Guild Rank" value="#12" />
                    <StatCard icon={Trophy} label="Total XP" value={totalXp.toLocaleString()} />
                     <StatCard icon={Users} label="Members" value={`${guild.members.length} / ${guild.capacity}`}>
                        {isOwner && (
                            <Button asChild variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                                <Link href="/shop?tab=perks">
                                    <PlusCircle className="h-4 w-4" />
                                    <span className="sr-only">Upgrade Capacity</span>
                                </Link>
                            </Button>
                        )}
                    </StatCard>
                    <StatCard icon={Coins} label="Total Coins" value={totalCoins.toLocaleString()} />
                    <StatCard icon={Gem} label="Total Gems" value={totalGems.toLocaleString()} />
                </div><Card><CardHeader><CardTitle>Announcements</CardTitle></CardHeader><CardContent className="space-y-4"><div className="p-4 bg-muted/50 rounded-lg"><h3 className="font-semibold">Guild Wars are now active!</h3><p className="text-sm text-muted-foreground">Challenge other guilds from the 'Battles' tab. Winner takes the pot!</p><p className="text-xs text-muted-foreground/70 mt-2">Just now</p></div></CardContent></Card></TabsContent>
                <TabsContent value="members" className="mt-6"><Card><CardHeader><CardTitle>Member Roster</CardTitle><CardDescription>The backbone of our guild.</CardDescription></CardHeader><CardContent><motion.ul className="space-y-4" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05, }, }, }} >{guild.members.map((member) => { const RoleIcon = roleIcons[member.role] || Shield; return (<motion.li key={member.name} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, }}><div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"><button className="flex items-center gap-4 text-left flex-grow min-w-0" onClick={() => showPlayerProfile(member.name)}><AiAvatar prompt={member.prompt} alt={member.name} fallback={member.name.substring(0, 2)} /><div><p className="font-semibold truncate">{member.name}</p><TooltipProvider><Tooltip><TooltipTrigger asChild><div className="flex items-center gap-1 text-sm text-muted-foreground cursor-pointer"><RoleIcon className="h-4 w-4" /> {member.role}</div></TooltipTrigger><TooltipContent><p>{member.role}</p></TooltipContent></Tooltip></TooltipProvider></div></button><div className="flex items-center gap-4 flex-shrink-0"><p className="font-mono text-primary font-semibold text-sm sm:text-base">{member.xp.toLocaleString()} XP</p>{isOwner && member.name !== 'QuantumLeap' && (<Button variant="ghost" size="icon" onClick={() => { setManagingMember(member); setIsManageMemberOpen(true); setSelectedRole(member.role); }}><UserCog className="h-5 w-5" /></Button>)}</div></div></motion.li>)})}</motion.ul></CardContent></Card></TabsContent>
                <TabsContent value="battles" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2">
                                <Swords /> Guild Wars
                            </CardTitle>
                            <CardDescription>Challenge other guilds to team-based battles for glory and gems.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center py-10">
                            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-xl font-bold">Coming Soon!</h3>
                            <p className="text-muted-foreground">The Guild Wars arena is under construction. Check back later!</p>
                        </CardContent>
                        <CardFooter>
                            <Button disabled className="w-full">Declare War</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="chat" className="mt-6"><ChatInterface guildId={guild.id} members={guild.members} /></TabsContent>
                <TabsContent value="settings" className="mt-6"><Card><CardHeader><CardTitle className="flex items-center gap-2"><Settings /> Guild Settings</CardTitle><CardDescription>Manage your guild's public information or leave the guild.</CardDescription></CardHeader><CardContent className="space-y-6">{isOwner && <Button onClick={() => setIsEditDialogOpen(true)}><Pencil className="mr-2 h-4 w-4" /> Edit Guild Details</Button>}<Card className="border-destructive/50"><CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><Trash2 /> Danger Zone</CardTitle><CardDescription>These actions are irreversible. Proceed with caution.</CardDescription></CardHeader><CardContent>{isOwner ? (<div><h3 className="font-semibold">Disband Guild</h3><p className="text-sm text-muted-foreground mb-4">Disbanding the guild will permanently delete all associated data and remove all members. This cannot be undone.</p><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive">Disband {guild.name}</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently disband your guild and remove all your members.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDisbandGuild} className={cn(buttonVariants({ variant: "destructive" }))}>Disband Guild</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div>) : (<div><h3 className="font-semibold">Leave Guild</h3><p className="text-sm text-muted-foreground mb-4">Leaving the guild will remove your access to its chat and events. You can rejoin later if it's public or you have an invite.</p><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive">Leave {guild.name}</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle><AlertDialogDescription>You will be removed from the guild. You can rejoin later.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Stay in Guild</AlertDialogCancel><AlertDialogAction onClick={handleLeaveGuild} className={cn(buttonVariants({ variant: "destructive" }))}>Leave Guild</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div>)}</CardContent></Card></CardContent></Card></TabsContent>
            </Tabs>
        </div>
    );
}
