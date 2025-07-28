
import { Award, BarChart, Book, Bot, BrainCircuit, Briefcase, Calendar, CheckSquare, Code, Crown, Database, Flame, Gamepad2, GitBranch, Globe, Handshake, Megaphone, Palette, PenSquare, Shield, Skull, Star, Swords, Trophy, UserPlus, Users, Zap, Rocket, Tv, Sparkles } from "lucide-react";

export type Achievement = {
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
    type: 'Achievement'
};

export const allAchievements: Achievement[] = [
    // Battle Achievements
    { name: 'First Victory', description: 'Win your first battle.', icon: Swords, color: 'text-green-400', type: 'Achievement' },
    { name: 'Battle Hardened', description: 'Fight in 10 battles.', icon: Swords, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Centurion', description: 'Fight in 100 battles.', icon: Swords, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Warmonger', description: 'Fight in 500 battles.', icon: Swords, color: 'text-red-500', type: 'Achievement' },
    { name: 'Winning Streak', description: 'Win 5 battles in a row.', icon: Flame, color: 'text-orange-400', type: 'Achievement' },
    { name: 'Unstoppable', description: 'Win 15 battles in a row.', icon: Flame, color: 'text-red-500', type: 'Achievement' },

    // Boss Raid Achievements
    { name: 'Giant Slayer', description: 'Defeat your first boss.', icon: Skull, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Boss Hunter', description: 'Defeat 10 bosses.', icon: Skull, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Legendary Hunter', description: 'Defeat 50 bosses.', icon: Skull, color: 'text-purple-400', type: 'Achievement' },

    // Learning & Roadmap Achievements
    { name: 'First Step', description: 'Complete your first learning level.', icon: Book, color: 'text-green-400', type: 'Achievement' },
    { name: 'Skill Dabbler', description: 'Complete the first stage of any skill roadmap.', icon: Book, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Skill Specialist', description: 'Complete an entire skill roadmap.', icon: Crown, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Jack of All Trades', description: 'Complete one level in 5 different skills.', icon: Globe, color: 'text-teal-400', type: 'Achievement' },

    // Guild Achievements
    { name: 'Welcome to the Fold', description: 'Join or create a guild.', icon: UserPlus, color: 'text-green-400', type: 'Achievement' },
    { name: 'Loyal Member', description: 'Be in a guild for 7 days.', icon: Shield, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Officer Material', description: 'Get promoted to Officer in a guild.', icon: Star, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Guild Leader', description: 'Become the leader of a guild.', icon: Crown, color: 'text-purple-400', type: 'Achievement' },
    
    // Profile & Progression Achievements
    { name: 'Level 10', description: 'Reach player level 10.', icon: Zap, color: 'text-gray-400', type: 'Achievement' },
    { name: 'Level 50', description: 'Reach player level 50.', icon: Zap, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Level 100', description: 'Reach player level 100.', icon: Zap, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Prestige', description: 'Achieve your first prestige level.', icon: Star, color: 'text-fuchsia-500', type: 'Achievement' },
    { name: 'Top 10 Player', description: 'Rank in the top 10 on the leaderboard.', icon: Trophy, color: 'text-orange-400', type: 'Achievement' },

    // Subject Specific Achievements
    { name: 'Canva Pro', description: 'Complete the Canva Design skill roadmap.', icon: Palette, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Prompt Whisperer', description: 'Complete the ChatGPT Prompt Engineering skill roadmap.', icon: Bot, color: 'text-sky-400', type: 'Achievement' },
    { name: 'Social Guru', description: 'Complete the Social Media Management skill roadmap.', icon: Megaphone, color: 'text-pink-400', type: 'Achievement' },
    { name: 'Reel Master', description: 'Complete the Reels & Shorts skill roadmap.', icon: Tv, color: 'text-red-400', type: 'Achievement' },
    { name: 'SEO Shark', description: 'Complete the Basic SEO skill roadmap.', icon: BrainCircuit, color: 'text-green-400', type: 'Achievement' },
    { name: 'Affiliate Ace', description: 'Complete the Affiliate Marketing skill roadmap.', icon: Handshake, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Copywriting King', description: 'Complete the Copywriting skill roadmap.', icon: PenSquare, color: 'text-teal-400', type: 'Achievement' },
    { name: 'Career Optimizer', description: 'Complete the Resume & LinkedIn skill roadmap.', icon: Briefcase, color: 'text-orange-400', type: 'Achievement' },
    { name: 'Product Pioneer', description: 'Complete the Digital Product Creation skill roadmap.', icon: Sparkles, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'AI Visionary', description: 'Complete the AI Literacy skill roadmap.', icon: Rocket, color: 'text-indigo-400', type: 'Achievement' },
];
