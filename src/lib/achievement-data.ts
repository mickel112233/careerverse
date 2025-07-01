
import { Award, BarChart, Book, Bot, Briefcase, Calendar, CheckSquare, Code, Crown, Database, Flame, Gamepad2, GitBranch, Globe, Handshake, Megaphone, Palette, PenSquare, Shield, Skull, Star, Swords, Trophy, UserPlus, Users, Zap } from "lucide-react";

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
    { name: 'Beginner Graduate', description: 'Complete the "Beginning" stage of any roadmap.', icon: Book, color: 'text-blue-400', type: 'Achievement' },
    { name: 'Intermediate Scholar', description: 'Complete the "Intermediate" stage of any roadmap.', icon: Book, color: 'text-yellow-400', type: 'Achievement' },
    { name: 'Expert Virtuoso', description: 'Complete the "Advance" stage of any roadmap.', icon: Crown, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Jack of All Trades', description: 'Complete one level in 5 different subjects.', icon: Globe, color: 'text-teal-400', type: 'Achievement' },

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
    { name: 'Code Initiate', description: 'Complete the "Beginning" stage for Software Development.', icon: Code, color: 'text-blue-400', type: 'Achievement' },
    { name: 'AI Initiate', description: 'Complete the "Beginning" stage for Data Science & AI.', icon: Bot, color: 'text-sky-400', type: 'Achievement' },
    { name: 'Marketing Initiate', description: 'Complete the "Beginning" stage for Digital Marketing.', icon: Megaphone, color: 'text-pink-400', type: 'Achievement' },
    { name: 'Business Initiate', description: 'Complete the "Beginning" stage for Business & Finance.', icon: Briefcase, color: 'text-green-400', type: 'Achievement' },
    { name: 'Design Initiate', description: 'Complete the "Beginning" stage for Graphic Design.', icon: Palette, color: 'text-purple-400', type: 'Achievement' },
    { name: 'Prompt Initiate', description: 'Complete the "Beginning" stage for AI Prompt Engineering.', icon: PenSquare, color: 'text-teal-400', type: 'Achievement' },
    { name: 'GameDev Initiate', description: 'Complete the "Beginning" stage for Game Development.', icon: Gamepad2, color: 'text-red-400', type: 'Achievement' },
];
