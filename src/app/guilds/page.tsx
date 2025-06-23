import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code, PenTool, Database, BarChart2, Shield } from "lucide-react";
import Image from "next/image";

const guilds = [
  { name: 'Frontend Forces', description: 'Masters of UI/UX, React, and modern web technologies.', members: 128, icon: Code, image: 'https://placehold.co/600x400.png?t=1', dataAiHint: 'abstract code' },
  { name: 'Backend Brigade', description: 'Architects of scalable APIs, databases, and server-side logic.', members: 92, icon: Database, image: 'https://placehold.co/600x400.png?t=2', dataAiHint: 'server room' },
  { name: 'Design Dynasty', description: 'Creators of stunning visuals and intuitive user experiences.', members: 74, icon: PenTool, image: 'https://placehold.co/600x400.png?t=3', dataAiHint: 'design sketch' },
  { name: 'Data Mavericks', description: 'Experts in data science, machine learning, and analytics.', members: 68, icon: BarChart2, image: 'https://placehold.co/600x400.png?t=4', dataAiHint: 'data visualization' },
  { name: 'Cyber Sentinels', description: 'Guardians of digital fortresses and cybersecurity experts.', members: 45, icon: Shield, image: 'https://placehold.co/600x400.png?t=5', dataAiHint: 'cyber security' },
];

export default function GuildsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Explore Guilds</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Find your tribe. Join a guild to collaborate, compete in team battles, and grow with your peers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guilds.map((guild) => {
            const GuildIcon = guild.icon;
            return (
                <Card key={guild.name} className="flex flex-col overflow-hidden hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="p-0">
                       <Image src={guild.image} alt={guild.name} width={600} height={400} className="w-full h-40 object-cover" data-ai-hint={guild.dataAiHint}/>
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
