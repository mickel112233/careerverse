
'use client';

import React, { createContext, useState, useContext, useCallback } from 'react';
import { PlayerProfileDialog } from '@/components/player-profile-dialog';
import { mockLeaderboardData, PlayerData } from '@/lib/leaderboard-data';
import { GuildMember } from '@/lib/guild-data';

interface PlayerProfileContextType {
  showPlayerProfile: (playerName: string) => void;
}

const PlayerProfileContext = createContext<PlayerProfileContextType | undefined>(undefined);

export const PlayerProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const showPlayerProfile = useCallback((playerName: string) => {
    // In a real app, you might fetch this data from an API
    // For now, we find it in our mock leaderboard data
    const player = mockLeaderboardData.find(p => p.name === playerName);
    
    // Create a fallback profile if player is not on the leaderboard (e.g., new guild members)
    const fallbackProfile: PlayerData = {
        rank: 999,
        name: playerName,
        xp: 100, prestige: 0, wins: 1, losses: 1,
        prompt: 'mysterious stranger',
        badges: [],
        guild: null,
        bossFights: 0,
        showcase: [],
    }

    // A more robust search would be to find the player in local storage user profiles
    // but for mock purposes, leaderboard is fine.
    const profileToDisplay = player ? { ...player, rank: mockLeaderboardData.findIndex(p => p.name === playerName) + 1 } : fallbackProfile;
    
    // Update profile with real-time stats if it's the current user
    if (playerName === 'QuantumLeap') {
        const userXp = parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10);
        const userPrestige = parseInt(localStorage.getItem('careerClashPrestige') || '0', 10);
        const userProfile = JSON.parse(localStorage.getItem('careerClashUserProfile') || '{}');
        const userStats = userProfile.stats || { wins: 128, losses: 34, bossesDefeated: 3 };
        const userGuildData = JSON.parse(localStorage.getItem('userGuild') || 'null');
        const userShowcase = JSON.parse(localStorage.getItem('pinnedItems') || '[]');

        profileToDisplay.xp = userXp;
        profileToDisplay.prestige = userPrestige;
        profileToDisplay.wins = userStats.wins;
        profileToDisplay.losses = userStats.losses;
        profileToDisplay.bossFights = userStats.bossesDefeated;
        profileToDisplay.guild = userGuildData ? userGuildData.guildName : null;
        profileToDisplay.showcase = userShowcase;
    }

    setSelectedPlayer(profileToDisplay);
    setIsDialogOpen(true);
  }, []);

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedPlayer(null);
  };

  return (
    <PlayerProfileContext.Provider value={{ showPlayerProfile }}>
      {children}
      {selectedPlayer && (
        <PlayerProfileDialog
          player={selectedPlayer}
          isOpen={isDialogOpen}
          onOpenChange={handleClose}
        />
      )}
    </PlayerProfileContext.Provider>
  );
};

export const usePlayerProfile = () => {
  const context = useContext(PlayerProfileContext);
  if (context === undefined) {
    throw new Error('usePlayerProfile must be used within a PlayerProfileProvider');
  }
  return context;
};
