
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
import { mockLeaderboardData, calculateScore, PlayerData } from '@/lib/leaderboard-data';
import { usePlayerProfile } from '@/contexts/PlayerProfileProvider';

const USER_NAME = 'QuantumLeap';

export default function LeaderboardPage() {
  const router = useRouter();
  const { showPlayerProfile } = usePlayerProfile();
  const [leaderboard, setLeaderboard] = useState<PlayerData[]>([]);

  useEffect(() => {
    const updateLeaderboard = () => {
      const userXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
      const userPrestige = parseInt(localStorage.getItem('careerClashPrestige') || '0', 10);
      const userProfile = JSON.parse(localStorage.getItem('careerClashUserProfile') || '{}');
      const userStats = userProfile.stats || { wins: 128, losses: 34, bossesDefeated: 3 };
      const userGuildData = JSON.parse(localStorage.getItem('userGuild') || 'null');
      const userGuildName = userGuildData ? userGuildData.guildName : null;
      const userShowcase = JSON.parse(localStorage.getItem('pinnedItems') || '[]');
      
      const updatedLeaderboard = mockLeaderboardData.map(player => 
          player.name === USER_NAME ? { 
              ...player, 
              xp: userXp, 
              prestige: userPrestige, 
              wins: userStats.wins, 
              losses: userStats.losses,
              bossFights: userStats.bossesDefeated,
              guild: userGuildName,
              showcase: userShowcase,
            } : player
      );
      
      updatedLeaderboard.sort((a, b) => calculateScore(b) - calculateScore(a));
      
      const rankedLeaderboard = updatedLeaderboard.map((player, index) => ({ ...player, rank: index + 1 }));
      
      setLeaderboard(rankedLeaderboard);
    }
    
    updateLeaderboard();
    const eventListeners = ['currencyChange', 'profileChange', 'guildChange'];
    eventListeners.forEach(event => window.addEventListener(event, updateLeaderboard));
    
    return () => {
      eventListeners.forEach(event => window.removeEventListener(event, updateLeaderboard));
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
            See who is at the top of their game. Click on a player to view their stats.
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
                  <TableRow 
                    key={player.rank} 
                    className={cn(
                      "cursor-pointer",
                      player.rank <= 3 && "bg-primary/5",
                      player.name === USER_NAME && "bg-accent/20 border-accent"
                    )}
                    onClick={() => showPlayerProfile(player.name)}
                  >
                    <TableCell className="text-center">
                      <div className={cn(`flex items-center justify-center w-8 h-8 rounded-full font-bold`,
                        player.rank <= 3 ? 'bg-primary text-primary-foreground ring-2 ring-primary/50' : 'bg-muted'
                      )}>
                        {player.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <AiAvatar prompt={player.prompt} alt={player.name} fallback={player.name.charAt(0)} className={cn(
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
