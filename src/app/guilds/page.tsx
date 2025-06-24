
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code, PenTool, Database, BarChart2, Shield, PlusCircle } from "lucide-react";
import Link from "next/link";
import { AiImage } from '@/components/ui/ai-image';

const guilds = [
  { name: 'Frontend Forces', slug: 'frontend-forces', description: 'Masters of UI/UX, React, and modern web technologies.', members: 128, icon: Code, imageHint: 'abstract code' },
  { name: 'Backend Brigade', slug: 'backend-brigade', description: 'Architects of scalable APIs, databases, and server-side logic.', members: 92, icon: Database, imageHint: 'server room' },
  { name: 'Design Dynasty', slug: 'design-dynasty', description: 'Creators of stunning visuals and intuitive user experiences.', members: 74, icon: PenTool, imageHint: 'design sketch' },
  { name: 'Data Mavericks', slug: 'data-mavericks', description: 'Experts in data science, machine learning, and analytics.', members: 68, icon: BarChart2, imageHint: 'data visualization' },
  { name: 'Cyber Sentinels', slug: 'cyber-sentinels', description: 'Guardians of digital fortresses and cybersecurity experts.', members: 45, icon: Shield, imageHint: 'cyber security' },
];

export default function GuildsPage() {
  const [userHasGuild, setUserHasGuild] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userGuild')) {
      setUserHasGuild(true);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Explore Guilds</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Find your tribe. Join a guild to collaborate, compete in team battles, and grow with your peers.
          </p>
        </div>
        <div className="flex items-center gap-2">
            {userHasGuild && (
                 <Button asChild size="lg" variant="outline">
                    <Link href="/guilds/my-guild">
                        <Shield className="mr-2 h-5 w-5" />
                        My Guild
                    </Link>
                </Button>
            )}
            <Button asChild size="lg">
                <Link href="/guilds/create">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Guild
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guilds.map((guild) => {
            const GuildIcon = guild.icon;
            return (
                <Card key={guild.name} className="flex flex-col hover:shadow-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <CardHeader className="p-0">
                       <AiImage prompt={guild.imageHint} alt={guild.name} width={600} height={400} className="w-full h-40 object-cover" />
                    </CardHeader>
                    <CardContent className="p-6 flex-grow">
                        <div className="flex items-start gap-4">
                            <GuildIcon className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <CardTitle className="font-headline text-xl mb-2">{guild.name}</CardTitle>
                                <CardDescription>{guild.description}</CardDescription>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{guild.members} members</span>
                        </div>
                        <Button>Join Guild</Button>
                    </CardFooter>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
