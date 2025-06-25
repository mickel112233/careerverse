
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Shield, ArrowLeft, BarChart3, Lock, PlusCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AiAvatar } from '@/components/ui/ai-avatar';
import { AiImage } from '@/components/ui/ai-image';
import { useToast } from '@/hooks/use-toast';
import { mockGuilds, Guild, GuildMember } from '@/lib/guild-data';

const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <Card className="bg-muted/50 h-full">
        <CardContent className="p-4 flex items-center gap-4">
            <Icon className="h-8 w-8 text-primary" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold font-headline">{value}</p>
            </div>
        </CardContent>
    </Card>
);

const LoadingSkeleton = () => (
     <div className="space-y-8">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="flex items-end gap-4 -mt-20 ml-8">
            <Skeleton className="h-32 w-32 rounded-lg border-4 border-background" />
            <div className="pb-4 space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-6 w-96" />
            </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-96 w-full rounded-lg" />
    </div>
)

export default function GuildDetailClient({ slug }: { slug: string }) {
    const router = useRouter();
    const { toast } = useToast();
    const [guild, setGuild] = useState<Guild | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userGuild, setUserGuild] = useState<any | null>(null);

    useEffect(() => {
        const foundGuild = mockGuilds.find(g => g.slug === slug);
        if (foundGuild) {
            setGuild(foundGuild as Guild);
        }

        const storedUserGuild = localStorage.getItem('userGuild');
        if (storedUserGuild) {
            setUserGuild(JSON.parse(storedUserGuild));
        }

        setIsLoading(false);
    }, [slug]);

    const handleJoinGuild = () => {
        if (userGuild) {
            toast({
                variant: 'destructive',
                title: 'Already in a Guild',
                description: 'You must leave your current guild before joining a new one.'
            });
            return;
        }

        if (!guild) return;
        
        const userAsNewMember = { 
            name: 'QuantumLeap', 
            role: 'Member', 
            xp: parseInt(localStorage.getItem('careerClashTotalXp') || '9850', 10), 
            avatarHint: 'cyberpunk woman portrait' 
        };

        const newGuildData = {
            ...guild,
            members: [...guild.members, userAsNewMember]
        };

        localStorage.setItem('userGuild', JSON.stringify(newGuildData));
        window.dispatchEvent(new Event('guildChange'));

        toast({
            title: `Welcome to ${guild.name}!`,
            description: "You have successfully joined the guild.",
            className: "bg-green-500 text-white"
        });

        router.push('/guilds/my-guild');
    }

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!guild) {
        return (
            <div className="text-center py-20">
                <Shield className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-bold font-headline">Guild Not Found</h2>
                <p className="mt-2 text-lg text-muted-foreground">The guild you are looking for does not exist.</p>
                <div className="mt-6">
                    <Button asChild>
                        <a href="/guilds">
                            <Users className="mr-2 h-4 w-4" />
                            Explore Other Guilds
                        </a>
                    </Button>
                </div>
            </div>
        );
    }

    const totalXp = guild.members.reduce((acc, member) => acc + member.xp, 0);

    return (
        <div>
            <Button variant="ghost" onClick={() => router.push('/guilds')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Guilds
            </Button>
             <Card className="mb-8 overflow-hidden">
                <div className="relative h-48 bg-muted">
                    <AiImage prompt={guild.imageHint} alt={`${guild.name} Banner`} layout="fill" objectFit="cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="flex flex-wrap items-end justify-between gap-4 -mt-16 px-6 pb-6 bg-gradient-to-t from-card to-transparent">
                    <div className="flex items-end gap-6">
                        <AiImage prompt={guild.slug} width={128} height={128} alt={guild.name} className="bg-muted rounded-lg border-4 border-card" />
                        <div>
                            <h1 className="text-4xl font-bold font-headline">{guild.name}</h1>
                            <p className="text-muted-foreground max-w-xl">{guild.description}</p>
                        </div>
                    </div>
                     <Button size="lg" onClick={handleJoinGuild} disabled={!!userGuild}>
                        <PlusCircle className="mr-2 h-5 w-5"/> Join Guild
                    </Button>
                </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <StatCard icon={Trophy} label="Total Guild XP" value={totalXp.toLocaleString()} />
                <StatCard icon={Users} label="Members" value={`${guild.members.length}`} />
                <StatCard icon={BarChart3} label="Guild Rank" value={`#${mockGuilds.findIndex(g => g.id === guild.id) + 1}`} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Recruitment</CardTitle>
                        <CardDescription>What this guild is looking for in new members.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm p-4 bg-muted/50 rounded-lg">{guild.requirements}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Member Roster</CardTitle>
                        <CardDescription>The players that form this guild.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 max-h-96 overflow-y-auto">
                        {guild.members.map((member) => {
                            return (
                                <li key={member.name} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <AiAvatar prompt={member.avatarHint} alt={member.name} fallback={member.name.substring(0,2)} />
                                        <div>
                                            <p className="font-semibold">{member.name}</p>
                                            <p className="text-xs text-muted-foreground">{member.role}</p>
                                        </div>
                                    </div>
                                    <p className="font-mono text-primary font-semibold">{member.xp.toLocaleString()} XP</p>
                                </li>
                            )
                        })}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
