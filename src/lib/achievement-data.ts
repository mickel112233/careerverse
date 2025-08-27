
import { Award, BarChart, Book, Bot, BrainCircuit, Briefcase, Calendar, CheckSquare, Code, Coins, Crown, Database, Flame, Gamepad2, GitBranch, Globe, Handshake, Megaphone, Palette, PenSquare, Shield, Skull, Sparkles, Star, Swords, Trophy, Tv, UserPlus, Users, Zap, Rocket, Gem, Target, Timer, LineChart, Package } from "lucide-react";

export type Achievement = {
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    type: 'Achievement'
};

export const allAchievements: Achievement[] = [
    // --- Battle & PvP Achievements ---
    { name: 'First Victory', description: 'Win your first battle in any mode.', icon: Swords, color: 'text-green-400', type: 'Achievement' },
    { name: 'Battle Hardened', description: 'Compete in 10 battles.', icon: Swords, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Arena Contender', description: 'Compete in 50 battles.', icon: Swords, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Gladiator', description: 'Compete in 250 battles.', icon: Swords, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Warmonger', description: 'Compete in 1000 battles.', icon: Swords, color: 'text-red-500', type: 'Achievement' },
    { name: 'Winning Streak', description: 'Win 5 battles in a row.', icon: Flame, color: 'text-orange-400', type: 'Achievement' },
    { name: 'Unstoppable Force', description: 'Win 15 battles in a row.', icon: Flame, color: 'text-red-500', type: 'Achievement' },
    { name: 'Clash Novice', description: 'Win 10 Quick Clash matches.', icon: Target, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Clash Adept', description: 'Win 50 Quick Clash matches.', icon: Target, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Rush Enthusiast', description: 'Win 10 Time Rush matches.', icon: Timer, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Rush Champion', description: 'Win 50 Time Rush matches.', icon: Timer, color: 'text-purple-400', type: 'Achievement' },
    { name: 'High Roller', description: 'Win a Time Rush match with a bet of 1000+ coins.', icon: Coins, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'High Stakes Victor', description: 'Win a Time Rush match with a bet of 5000+ coins.', icon: Gem, color: 'text-cyan-400', type: 'Achievement' },

    // --- Boss Raid Achievements ---
    { name: 'Giant Slayer', description: 'Participate in and defeat your first boss.', icon: Skull, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Boss Hunter', description: 'Defeat 10 bosses.', icon: Skull, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Legendary Hunter', description: 'Defeat 50 bosses.', icon: Skull, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Mythic Vanquisher', description: 'Defeat 100 bosses.', icon: Skull, color: 'text-red-500', type: 'Achievement' },
    { name: 'Hard Mode', description: 'Defeat a boss of at least Level 15.', icon: Flame, color: 'text-orange-500', type: 'Achievement' },
    { name: 'Nightmare Mode', description: 'Defeat a boss of at least Level 30.', icon: Flame, color: 'text-red-600', type: 'Achievement' },
    
    // --- Learning & Roadmap Achievements ---
    { name: 'First Step', description: 'Complete your first learning level.', icon: Book, color: 'text-green-400', type: 'Achievement' },
    { name: 'Skill Dabbler', description: 'Complete the first stage of any skill roadmap.', icon: Book, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Skill Specialist', description: 'Complete an entire skill roadmap.', icon: Crown, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Jack of All Trades', description: 'Complete one level in 5 different skills.', icon: Globe, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Polymath', description: 'Complete one level in all 10 available skills.', icon: Globe, color: 'text-fuchsia-500', type: 'Achievement' },

    // --- Guild Achievements ---
    { name: 'Welcome to the Fold', description: 'Join or create a guild.', icon: UserPlus, color: 'text-green-400', type: 'Achievement' },
    { name: 'Loyal Member', description: 'Be in a guild for 7 consecutive days.', icon: Shield, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Officer Material', description: 'Get promoted to Officer in a guild.', icon: Star, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Guild Leader', description: 'Become the leader of a guild.', icon: Crown, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Community Pillar', description: 'Contribute over 100,000 XP to your guild.', icon: BarChart, color: 'text-orange-400', type: 'Achievement' },
    { name: 'Recruiter', description: 'Be in a guild that grows to over 10 members.', icon: Users, color: 'text-teal-400', type: 'Achievement' },

    // --- Profile & Progression Achievements ---
    { name: 'Level 10', description: 'Reach player level 10.', icon: Zap, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Level 25', description: 'Reach player level 25.', icon: Zap, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Level 50', description: 'Reach player level 50.', icon: Zap, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Level 100', description: 'Reach player level 100.', icon: Zap, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Prestige', description: 'Achieve your first prestige level.', icon: Star, color: 'text-fuchsia-500', type: 'Achievement' },
    { name: 'Top 100 Player', description: 'Rank in the top 100 on the leaderboard.', icon: Trophy, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Top 10 Player', description: 'Rank in the top 10 on the leaderboard.', icon: Trophy, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'The #1 Spot', description: 'Achieve the #1 rank on the leaderboard.', icon: Trophy, color: 'text-purple-500', type: 'Achievement' },
    { name: 'Showcase Artist', description: 'Customize your profile showcase for the first time.', icon: Palette, color: 'text-teal-400', type: 'Achievement' },

    // --- Economic Achievements ---
    { name: 'Coin Collector', description: 'Earn a total of 1,000 coins.', icon: Coins, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Coin Hoarder', description: 'Earn a total of 10,000 coins.', icon: Coins, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Coin Millionaire', description: 'Earn a total of 1,000,000 coins.', icon: Coins, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Gem Collector', description: 'Earn a total of 100 gems.', icon: Gem, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Gem Baron', description: 'Earn a total of 1,000 gems.', icon: Gem, color: 'text-cyan-400', type: 'Achievement' },
    { name: 'First Purchase', description: 'Make your first purchase in the shop.', icon: Star, color: 'text-green-400', type: 'Achievement' },
    
    // --- Quest Achievements ---
    { name: 'Daily Quester', description: 'Complete your first daily quest.', icon: CheckSquare, color: 'text-green-400', type: 'Achievement' },
    { name: 'Consistent Quester', description: 'Complete all daily quests for 7 days in a row.', icon: Calendar, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Weekly Champion', description: 'Complete all weekly quests in a single week.', icon: Trophy, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Milestone Achiever', description: 'Complete 10 milestone quests.', icon: BarChart, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Quest Legend', description: 'Complete 50 total quests.', icon: Crown, color: 'text-orange-500', type: 'Achievement' },

    // --- Subject Specific Achievements (Canva) ---
    { name: 'Canva Initiate', description: 'Complete Stage 1 of the Canva Design roadmap.', icon: Palette, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Canva Apprentice', description: 'Complete Stage 2 of the Canva Design roadmap.', icon: Palette, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Canva Journeyman', description: 'Complete Stage 3 of the Canva Design roadmap.', icon: Palette, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Canva Expert', description: 'Complete Stage 4 of the Canva Design roadmap.', icon: Palette, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Canva Pro', description: 'Complete the Canva Design skill roadmap.', icon: Palette, color: 'text-purple-400', type: 'Achievement' },

    // --- Subject Specific Achievements (ChatGPT) ---
    { name: 'Prompt Initiate', description: 'Complete Stage 1 of the ChatGPT Prompt Engineering roadmap.', icon: Bot, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Prompt Apprentice', description: 'Complete Stage 2 of the ChatGPT Prompt Engineering roadmap.', icon: Bot, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Prompt Journeyman', description: 'Complete Stage 3 of the ChatGPT Prompt Engineering roadmap.', icon: Bot, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Prompt Expert', description: 'Complete Stage 4 of the ChatGPT Prompt Engineering roadmap.', icon: Bot, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Prompt Whisperer', description: 'Complete the ChatGPT Prompt Engineering skill roadmap.', icon: Bot, color: 'text-sky-400', type: 'Achievement' },
    
    // --- Subject Specific Achievements (Social Media) ---
    { name: 'Social Initiate', description: 'Complete Stage 1 of the Social Media Management roadmap.', icon: Megaphone, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Social Apprentice', description: 'Complete Stage 2 of the Social Media Management roadmap.', icon: Megaphone, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Social Journeyman', description: 'Complete Stage 3 of the Social Media Management roadmap.', icon: Megaphone, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Social Expert', description: 'Complete Stage 4 of the Social Media Management roadmap.', icon: Megaphone, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Social Guru', description: 'Complete the Social Media Management skill roadmap.', icon: Megaphone, color: 'text-pink-400', type: 'Achievement' },

    // --- Subject Specific Achievements (Video Editing) ---
    { name: 'Reel Initiate', description: 'Complete Stage 1 of the Reels & Shorts roadmap.', icon: Tv, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Reel Apprentice', description: 'Complete Stage 2 of the Reels & Shorts roadmap.', icon: Tv, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Reel Journeyman', description: 'Complete Stage 3 of the Reels & Shorts roadmap.', icon: Tv, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Reel Expert', description: 'Complete Stage 4 of the Reels & Shorts roadmap.', icon: Tv, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Reel Master', description: 'Complete the Reels & Shorts skill roadmap.', icon: Tv, color: 'text-red-400', type: 'Achievement' },

    // --- Subject Specific Achievements (SEO) ---
    { name: 'SEO Initiate', description: 'Complete Stage 1 of the Basic SEO roadmap.', icon: BrainCircuit, color: 'text-gray-400', type: 'Achievement' },
    { name: 'SEO Apprentice', description: 'Complete Stage 2 of the Basic SEO roadmap.', icon: BrainCircuit, color: 'text-blue-400', type: 'Achievement' },
    { name: 'SEO Journeyman', description: 'Complete Stage 3 of the Basic SEO roadmap.', icon: BrainCircuit, color: 'text-teal-400', type: 'Achievement' },
    { name: 'SEO Expert', description: 'Complete Stage 4 of the Basic SEO roadmap.', icon: BrainCircuit, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'SEO Shark', description: 'Complete the Basic SEO skill roadmap.', icon: BrainCircuit, color: 'text-green-400', type: 'Achievement' },

    // --- Subject Specific Achievements (Affiliate Marketing) ---
    { name: 'Affiliate Initiate', description: 'Complete Stage 1 of the Affiliate Marketing roadmap.', icon: Handshake, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Affiliate Apprentice', description: 'Complete Stage 2 of the Affiliate Marketing roadmap.', icon: Handshake, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Affiliate Journeyman', description: 'Complete Stage 3 of the Affiliate Marketing roadmap.', icon: Handshake, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Affiliate Expert', description: 'Complete Stage 4 of the Affiliate Marketing roadmap.', icon: Handshake, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Affiliate Ace', description: 'Complete the Affiliate Marketing skill roadmap.', icon: Handshake, color: 'text-blue-400', type: 'Achievement' },

    // --- Subject Specific Achievements (Copywriting) ---
    { name: 'Copywriting Initiate', description: 'Complete Stage 1 of the Copywriting roadmap.', icon: PenSquare, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Copywriting Apprentice', description: 'Complete Stage 2 of the Copywriting roadmap.', icon: PenSquare, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Copywriting Journeyman', description: 'Complete Stage 3 of the Copywriting roadmap.', icon: PenSquare, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Copywriting Expert', description: 'Complete Stage 4 of the Copywriting roadmap.', icon: PenSquare, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Copywriting King', description: 'Complete the Copywriting skill roadmap.', icon: PenSquare, color: 'text-teal-400', type: 'Achievement' },

    // --- Subject Specific Achievements (Resume & LinkedIn) ---
    { name: 'Career Initiate', description: 'Complete Stage 1 of the Resume & LinkedIn roadmap.', icon: Briefcase, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Career Apprentice', description: 'Complete Stage 2 of the Resume & LinkedIn roadmap.', icon: Briefcase, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Career Journeyman', description: 'Complete Stage 3 of the Resume & LinkedIn roadmap.', icon: Briefcase, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Career Expert', description: 'Complete Stage 4 of the Resume & LinkedIn roadmap.', icon: Briefcase, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Career Optimizer', description: 'Complete the Resume & LinkedIn skill roadmap.', icon: Briefcase, color: 'text-orange-400', type: 'Achievement' },

    // --- Subject Specific Achievements (Digital Product Creation) ---
    { name: 'Product Initiate', description: 'Complete Stage 1 of the Digital Product Creation roadmap.', icon: Sparkles, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Product Apprentice', description: 'Complete Stage 2 of the Digital Product Creation roadmap.', icon: Sparkles, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Product Journeyman', description: 'Complete Stage 3 of the Digital Product Creation roadmap.', icon: Sparkles, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Product Expert', description: 'Complete Stage 4 of the Digital Product Creation roadmap.', icon: Sparkles, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Product Pioneer', description: 'Complete the Digital Product Creation skill roadmap.', icon: Sparkles, color: 'text-yellow-400', type: 'Achievement' },

    // --- Subject Specific Achievements (AI Literacy) ---
    { name: 'AI Initiate', description: 'Complete Stage 1 of the AI Literacy roadmap.', icon: Rocket, color: 'text-gray-400', type: 'Achievement' },
    { name: 'AI Apprentice', description: 'Complete Stage 2 of the AI Literacy roadmap.', icon: Rocket, color: 'text-blue-400', type: 'Achievement' },
    { name: 'AI Journeyman', description: 'Complete Stage 3 of the AI Literacy roadmap.', icon: Rocket, color: 'text-teal-400', type: 'Achievement' },
    { name: 'AI Expert', description: 'Complete Stage 4 of the AI Literacy roadmap.', icon: Rocket, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'AI Visionary', description: 'Complete the AI Literacy skill roadmap.', icon: Rocket, color: 'text-indigo-400', type: 'Achievement' },

    // --- Hidden / Fun Achievements ---
    { name: 'Button Masher', description: 'Select an answer in the last second of a Time Rush battle.', icon: Timer, color: 'text-red-400', type: 'Achievement' },
    { name: 'Overkill', description: 'Deal more than 500 damage to a boss in a single hit.', icon: Zap, color: 'text-yellow-500', type: 'Achievement' },
    { name: 'Lone Wolf', description: 'Win a boss raid with a party size of 1.', icon: UserPlus, color: 'text-gray-300', type: 'Achievement' },
    { name: 'Collector', description: 'Unlock 25% of all achievements.', icon: Package, color: 'text-blue-300', type: 'Achievement' },
    { name: 'Completionist', description: 'Unlock 50% of all achievements.', icon: Package, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Perfectionist', description: 'Get a perfect score on a quiz with 10 or more questions.', icon: CheckSquare, color: 'text-green-500', type: 'Achievement' },
    { name: 'The Philanthropist', description: 'Gift a premium membership to another player.', icon: Handshake, color: 'text-pink-400', type: 'Achievement' },
    { name: 'First Follower', description: 'Gain your first follower on your profile.', icon: UserPlus, color: 'text-green-400', type: 'Achievement' },
];
