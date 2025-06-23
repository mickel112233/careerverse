import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Linkedin, ShieldCheck, Star, Swords, Trophy, Zap } from "lucide-react";
import Image from "next/image";

const achievements = [
    { name: 'React Pro', icon: Star, color: 'text-yellow-400' },
    { name: 'AI Guru', icon: Zap, color: 'text-sky-400' },
    { name: 'TS Wizard', icon: ShieldCheck, color: 'text-green-400' },
    { name: 'Master Coder', icon: Award, color: 'text-purple-400' },
    { name: '5 Wins Streak', icon: Swords, color: 'text-red-500' },
    { name: 'Top 10 Player', icon: Trophy, color: 'text-orange-400' },
];

const battleHistory = [
    { challenge: 'React Hooks Quiz', result: 'Win', xp: '+150 XP' },
    { challenge: 'Node.js Performance Battle', result: 'Win', xp: '+200 XP' },
    { challenge: 'CSS Specificity Simulation', result: 'Loss', xp: '-50 XP' },
    { challenge: 'Python Algorithm Challenge', result: 'Win', xp: '+180 XP' },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
       <div className="relative mb-8 h-48 rounded-lg overflow-hidden">
            <Image src="https://placehold.co/1200x300.png" alt="Profile banner" layout="fill" objectFit="cover" data-ai-hint="abstract background"/>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
       </div>
       
       <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-1/3 space-y-8 -mt-24">
            <Card className="text-center p-6 pt-0">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-background ring-4 ring-primary">
                    <AvatarImage src="https://placehold.co/200x200.png" alt="QuantumLeap" data-ai-hint="woman face"/>
                    <AvatarFallback>QL</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold font-headline">QuantumLeap</h1>
                <p className="text-muted-foreground">Senior AI Engineer</p>
                <Button className="mt-4 w-full">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect to LinkedIn
                </Button>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1 text-sm">
                            <span className="font-medium">Rank</span>
                            <span className="font-bold text-primary">#1</span>
                        </div>
                        <Progress value={100} />
                    </div>
                     <div>
                        <div className="flex justify-between mb-1 text-sm">
                            <span className="font-medium">XP</span>
                            <span className="font-mono">9850 / 10000</span>
                        </div>
                        <Progress value={98.5} />
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column */}
        <div className="lg:w-2/3 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Achievements</CardTitle>
                    <CardDescription>Verified skills and milestones.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {achievements.map(ach => {
                            const Icon = ach.icon;
                            return (
                                <div key={ach.name} className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-all hover:scale-105">
                                    <Icon className={`h-10 w-10 mb-2 ${ach.color}`} />
                                    <p className="text-sm font-semibold">{ach.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Recent Battles</CardTitle>
                    <CardDescription>Latest competition history.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Challenge</TableHead>
                                <TableHead>Result</TableHead>
                                <TableHead className="text-right">XP Gained</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {battleHistory.map((battle, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{battle.challenge}</TableCell>
                                    <TableCell>
                                        <Badge variant={battle.result === 'Win' ? 'default' : 'destructive'}>{battle.result}</Badge>
                                    </TableCell>
                                    <TableCell className={`text-right font-mono ${battle.result === 'Win' ? 'text-lime-400' : 'text-red-500'}`}>{battle.xp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
       </div>
    </div>
  );
}
