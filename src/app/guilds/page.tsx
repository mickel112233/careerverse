
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code, PenTool, Database, BarChart2, Shield, PlusCircle, Loader2, Lock, Search } from "lucide-react";
import Link from "next/link";
import { AiImage } from '@/components/ui/ai-image';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const mockGuilds = [
  { id: 'GUILD-1', name: 'Frontend Forces', slug: 'frontend-forces', description: 'Masters of UI/UX, React, and modern web technologies.', members: 128, icon: Code, imageHint: 'abstract code interface', type: 'public' },
  { id: 'GUILD-2', name: 'Backend Brigade', slug: 'backend-brigade', description: 'Architects of scalable APIs, databases, and server-side logic.', members: 92, icon: Database, imageHint: 'futuristic server room', type: 'public' },
  { id: 'GUILD-3', name: 'Design Dynasty', slug: 'design-dynasty', description: 'Creators of stunning visuals and intuitive user experiences.', members: 74, icon: PenTool, imageHint: 'glowing design sketch', type: 'public' },
  { id: 'GUILD-4', name: 'Data Mavericks', slug: 'data-mavericks', description: 'Experts in data science, machine learning, and analytics.', members: 68, icon: BarChart2, imageHint: 'holographic data visualization', type: 'public' },
  { id: 'GUILD-5', name: 'Cyber Sentinels', slug: 'cyber-sentinels', description: 'Guardians of digital fortresses and cybersecurity experts.', members: 45, icon: Shield, imageHint: 'cyber security matrix', type: 'public' },
  { id: 'GUILD-6', name: 'The Void Runners', slug: 'void-runners', description: 'A secretive guild operating in the shadows.', members: 13, icon: Shield, imageHint: 'dark cosmic void', type: 'private', password: 'secret' },
];

export default function GuildsPage() {
  const [userHasGuild, setUserHasGuild] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGuild, setSelectedGuild] = useState<any | null>(null);
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
      if(selectedGuild.password === password) {
          toast({
              title: "Joined Guild!",
              description: `You are now a member of ${selectedGuild.name}.`,
              className: "bg-green-500 text-white"
          });
          // In a real app, this would update backend and local state
          setSelectedGuild(null);
          setPassword('');
          // For this demo, we won't fully implement joining another guild
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
      return guild.name.toLowerCase().includes(searchQuery.toLowerCase()) && guild.type === 'public';
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
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <Card className="flex flex-col h-full hover:shadow-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <CardHeader className="p-0">
                            <AiImage prompt={guild.imageHint} alt={guild.name} width={600} height={400} className="w-full h-40 object-cover" />
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
                                    <span>{guild.members} members</span>
                                </div>
                                {guild.type === 'private' ? (
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedGuild(guild)}>
                                            <Lock className="mr-2 h-4 w-4"/> Join Guild
                                        </Button>
                                    </DialogTrigger>
                                ) : (
                                    <Button>Join Guild</Button>
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
