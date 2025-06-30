
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, PlusCircle, Loader2, Lock, Search } from "lucide-react";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { mockGuilds, Guild } from '@/lib/guild-data';


export default function GuildsPage() {
  const [userHasGuild, setUserHasGuild] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const guild = localStorage.getItem('userGuild');
    if (guild) {
      setUserHasGuild(true);
    }
    setIsLoading(false);

    const handleGuildChange = () => {
        const updatedGuild = localStorage.getItem('userGuild');
        setUserHasGuild(!!updatedGuild);
    }

    window.addEventListener('guildChange', handleGuildChange);
    return () => window.removeEventListener('guildChange', handleGuildChange);
  }, []);

  const handleJoinPrivateGuild = () => {
      if (!selectedGuild) return;
      
      if(selectedGuild.password === password) {
          toast({
              title: "Joined Guild!",
              description: `You are now a member of ${selectedGuild.name}.`,
              className: "bg-green-500 text-white"
          });
          // In a real app, this would update backend and local state
          localStorage.setItem('userGuild', JSON.stringify(selectedGuild));
          window.dispatchEvent(new Event('guildChange'));
          router.push('/guilds/my-guild');
          setSelectedGuild(null);
          setPassword('');
      } else {
          toast({
              variant: "destructive",
              title: "Incorrect Password",
              description: "The password you entered is incorrect. Please try again."
          })
      }
  }

  const filteredGuilds = mockGuilds.filter(guild => {
      if (searchQuery.startsWith('GUILD-')) {
          return guild.id.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return guild.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
      return (
          <div className="flex justify-center items-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      )
  }

  return (
    <Dialog onOpenChange={isOpen => !isOpen && setSelectedGuild(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Join Private Guild: {selectedGuild?.name}</DialogTitle>
                <DialogDescription>This guild is private. Please enter the password to request access.</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-2">
                 <Label htmlFor="password">Guild Password</Label>
                 <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button onClick={handleJoinPrivateGuild}>Request to Join</Button>
        </DialogContent>

        <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Explore Guilds</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
                Find your tribe. Join a guild to collaborate, compete in team battles, and grow with your peers.
            </p>
            </div>
            <div className="flex items-center gap-2">
                {userHasGuild ? (
                    <Button asChild size="lg">
                        <Link href="/guilds/my-guild">
                            <Shield className="mr-2 h-5 w-5" />
                            My Guild
                        </Link>
                    </Button>
                ) : (
                    <Button asChild size="lg">
                        <Link href="/guilds/create">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create Guild
                        </Link>
                    </Button>
                )}
            </div>
        </div>

        <div className="mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                <Input 
                    placeholder="Search for a guild by name or ID..." 
                    className="pl-10 text-lg py-6"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGuilds.map((guild, i) => {
                const GuildIcon = guild.icon;
                return (
                    <motion.div 
                        key={guild.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="h-full"
                    >
                        <Card className="flex flex-col h-full hover:shadow-primary/30 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="p-0 relative w-full h-40">
                                <Image src={guild.image || `https://placehold.co/600x400.png`} alt={guild.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
                            </CardHeader>
                            <CardContent className="p-6 flex-grow">
                                <div className="flex items-start gap-4">
                                    <GuildIcon className="h-8 w-8 text-primary mt-1 shrink-0" />
                                    <div>
                                        <CardTitle className="font-headline text-xl mb-2">{guild.name}</CardTitle>
                                        <CardDescription>{guild.description}</CardDescription>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/50 p-4 flex justify-between items-center mt-auto">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>{guild.members.length} members</span>
                                </div>
                                {guild.type === 'private' ? (
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedGuild(guild)}>
                                            <Lock className="mr-2 h-4 w-4"/> Join
                                        </Button>
                                    </DialogTrigger>
                                ) : (
                                    <Button asChild>
                                        <Link href={`/guilds/${guild.slug}`}>
                                            View Guild
                                        </Link>
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                )
            })}
        </div>
        </div>
    </Dialog>
  );
}
