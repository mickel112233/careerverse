
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AiAvatar } from '@/components/ui/ai-avatar';
import { Swords, Shield as ShieldIcon, Skull, BarChart3, User, Package, Trophy, Zap } from "lucide-react";
import { PlayerData } from '@/lib/leaderboard-data';
import { Achievement, allAchievements } from '@/lib/achievement-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
        <Icon className="h-6 w-6 text-primary mt-1" />
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-bold font-headline">{value}</p>
        </div>
    </div>
);

interface PlayerProfileDialogProps {
  player: PlayerData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlayerProfileDialog({ player, isOpen, onOpenChange }: PlayerProfileDialogProps) {
  if (!player) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <AiAvatar prompt={player.prompt} alt={player.name} fallback={player.name.charAt(0)} className="w-16 h-16 ring-2 ring-primary" />
            <div>
              <DialogTitle className="text-2xl font-headline">{player.name}</DialogTitle>
              <DialogDescription>
                {player.guild ? (
                  <span className="flex items-center gap-1.5"><ShieldIcon className="h-4 w-4" /> Member of {player.guild}</span>
                ) : (
                  <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> Lone Wolf</span>
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <StatCard icon={Trophy} label="Rank" value={`#${player.rank}`} />
          <StatCard icon={Zap} label="XP" value={player.xp.toLocaleString()} />
          <StatCard icon={Swords} label="Wins" value={player.wins} />
          <StatCard icon={ShieldIcon} label="Losses" value={player.losses} />
          <StatCard icon={Skull} label="Bosses Defeated" value={player.bossFights} />
          <StatCard icon={BarChart3} label="Win Rate" value={`${((player.wins / (player.wins + player.losses || 1)) * 100).toFixed(0)}%`} />
        </div>
        {player.showcase && player.showcase.length > 0 && (
          <div className="pt-4 border-t">
            <h3 className="font-headline font-semibold mb-2 flex items-center gap-2"><Package /> Player Showcase</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {player.showcase.map(itemName => {
                const item = allAchievements.find(i => i.name === itemName);
                if (!item) return null;
                const Icon = item.icon;
                return (
                  <TooltipProvider key={item.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center text-center p-2 bg-muted/50 rounded-lg h-full">
                          <Icon className={cn("h-8 w-8 mb-1", item.color)} />
                          <p className="text-xs font-semibold truncate">{item.name}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

    