
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, ArrowLeft, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiAvatar } from '@/components/ui/ai-avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const leaderboardData = [
  { rank: 1, name: 'QuantumLeap', xp: 0, prestige: 0, wins: 0, losses: 0, avatarHint: 'cyberpunk woman portrait', badges: ['Master Coder', 'AI Guru'] },
  { rank: 2, name: 'SynthWave', xp: 9500, prestige: 0, wins: 110, losses: 20, avatarHint: 'cyberpunk man portrait', badges: ['Design Sensei'] },
  { rank: 3, name: 'CodeNinja', xp: 9200, prestige: 0, wins: 105, losses: 18, avatarHint: 'hacker with glasses', badges: ['React Pro', 'TS Wizard'] },
  { rank: 4, name: 'DataDynamo', xp: 8900, prestige: 0, wins: 100, losses: 25, avatarHint: 'data scientist smiling', badges: ['Pythonista', 'Data Whisperer'] },
  { rank: 5, name: 'PixelPerfect', xp: 8750, prestige: 0, wins: 98, losses: 30, avatarHint: 'designer serious', badges: ['UI/UX Expert'] },
  { rank: 6, name: 'LogicLord', xp: 8500, prestige: 0, wins: 95, losses: 15, avatarHint: 'philosopher thinking', badges: ['Algorithm Ace'] },
  { rank: 7, name: 'CloudChaser', xp: 8300, prestige: 0, wins: 90, losses: 22, avatarHint: 'devops engineer female', badges: ['DevOps King'] },
  { rank: 8, name: 'ScriptKiddie', xp: 8100, prestige: 0, wins: 88, losses: 35, avatarHint: 'young male student', badges: ['JS Jedi'] },
  { rank: 9, name: 'SecureShell', xp: 7900, prestige: 0, wins: 85, losses: 12, avatarHint: 'female hacker hood', badges: ['Security Sentinel'] },
  { rank: 10, name: 'APIAdept', xp: 7700, prestige: 0, wins: 80, losses: 28, avatarHint: 'male backend developer', badges: ['Backend Baron'] },
];

const USER_NAME = 'QuantumLeap';

const calculateScore = (player: { xp: number, wins: number, losses: number }) => {
    return Math.pow(player.xp, 2) + Math.pow(player.wins, 2) - Math.pow(player.losses, 2);
};

export default function LeaderboardPage() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState(leaderboardData);

  useEffect(() => {
    const updateLeaderboard = () => {
      const userXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
      const userPrestige = parseInt(localStorage.getItem('careerClashPrestige') || '0', 10);
      const userProfile = JSON.parse(localStorage.getItem('careerClashUserProfile') || '{}');
      const userStats = userProfile.stats || { wins: 128, losses: 34 };
      
      const updatedLeaderboard = leaderboardData.map(player => 
          player.name === USER_NAME ? { ...player, xp: userXp, prestige: userPrestige, wins: userStats.wins, losses: userStats.losses } : player
      );
      
      updatedLeaderboard.sort((a, b) => {
        if (b.prestige !== a.prestige) {
          return b.prestige - a.prestige;
        }
        return calculateScore(b) - calculateScore(a);
      });
      
      const rankedLeaderboard = updatedLeaderboard.map((player, index) => ({ ...player, rank: index + 1 }));
      
      setLeaderboard(rankedLeaderboard);
    }
    
    updateLeaderboard();
    window.addEventListener('currencyChange', updateLeaderboard);
    window.addEventListener('profileChange', updateLeaderboard);
    return () => {
        window.removeEventListener('currencyChange', updateLeaderboard);
        window.removeEventListener('profileChange', updateLeaderboard);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Leaderboard</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          See who is at the top of their game. Climb the ranks by winning battles and earning XP.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Trophy className="text-yellow-400" />
            Top Players
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="hidden md:table-cell">Badges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((player) => (
                <TableRow key={player.rank} className={cn(
                    player.rank <= 3 && "bg-primary/5",
                    player.name === USER_NAME && "bg-accent/20 border-accent"
                )}>
                  <TableCell className="text-center">
                    <div className={cn(`flex items-center justify-center w-8 h-8 rounded-full font-bold`,
                      player.rank <= 3 ? 'bg-primary text-primary-foreground ring-2 ring-primary/50' : 'bg-muted'
                    )}>
                      {player.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <AiAvatar prompt={player.avatarHint} alt={player.name} fallback={player.name.charAt(0)} className={cn(
                          player.rank <= 3 && "ring-2 ring-primary",
                          player.name === USER_NAME && "ring-2 ring-accent"
                          )} />
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{player.name} {player.name === USER_NAME && '(You)'}</span>
                        {player.prestige > 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex items-center gap-1 text-yellow-400">
                                  <Star className="h-4 w-4" />
                                  <span className="font-bold text-sm">x{player.prestige}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Prestige Level: {player.prestige}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">{calculateScore(player).toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-2 flex-wrap">
                      {player.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary">{badge}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
