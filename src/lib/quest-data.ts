
import { Book, Bot, Briefcase, Calendar, CheckSquare, Code, Coins, Crown, Database, Flame, Gamepad2, GitBranch, Globe, Handshake, Megaphone, Palette, PenSquare, Shield, Skull, Star, Swords, Trophy, UserPlus, Users, Zap } from "lucide-react";

export interface Quest {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    xp: number;
    coins: number;
    category: 'Daily' | 'Weekly' | 'Milestone';
    goal: number;
}

export function updateQuestProgress(questId: string, amount: number) {
    if (typeof window === 'undefined') return;
    try {
        const progress = JSON.parse(localStorage.getItem('careerClashQuestProgress') || '{}');
        progress[questId] = (progress[questId] || 0) + amount;
        localStorage.setItem('careerClashQuestProgress', JSON.stringify(progress));
        // Dispatch a storage event to notify other components (like the quest page) of the change.
        window.dispatchEvent(new Event('storage'));
    } catch (e) {
        console.error("Failed to update quest progress in localStorage", e);
    }
}


export const allQuests: Quest[] = [
    // Daily Quests
    { id: 'daily1', title: 'Daily Login', description: 'Log in to the app.', icon: Calendar, xp: 50, coins: 10, category: 'Daily', goal: 1 },
    { id: 'daily2', title: 'Quick Learner', description: 'Complete 1 learning level.', icon: Book, xp: 100, coins: 20, category: 'Daily', goal: 1 },
    { id: 'daily3', title: 'Sparring Partner', description: 'Complete 3 battle arena matches.', icon: Swords, xp: 150, coins: 50, category: 'Daily', goal: 3 },
    { id: 'daily4', title: 'Message Sent', description: 'Send a message in your guild chat.', icon: Handshake, xp: 50, coins: 10, category: 'Daily', goal: 1 },
    { id: 'daily5', title: 'Quick Victory', description: 'Win 1 battle arena match.', icon: Trophy, xp: 100, coins: 30, category: 'Daily', goal: 1 },
    
    // Weekly Quests
    { id: 'weekly1', title: 'Weekly Warrior', description: 'Win 10 battle arena matches in a week.', icon: Swords, xp: 500, coins: 200, category: 'Weekly', goal: 10 },
    { id: 'weekly2', title: 'Dedicated Student', description: 'Complete 7 learning levels in a week.', icon: Book, xp: 700, coins: 250, category: 'Weekly', goal: 7 },
    { id: 'weekly3', title: 'Boss Challenger', description: 'Participate in 2 boss raids.', icon: Skull, xp: 600, coins: 200, category: 'Weekly', goal: 2 },
    { id: 'weekly4', title: 'Top Performer', description: 'Finish in the top 50 of the weekly leaderboard.', icon: Star, xp: 1000, coins: 500, category: 'Weekly', goal: 1 },
    { id: 'weekly5', title: 'Quest Master', description: 'Complete 15 quests in a week.', icon: CheckSquare, xp: 750, coins: 300, category: 'Weekly', goal: 15 },
    
    // Milestone Quests
    { id: 'milestone1', title: 'Level Up!', description: 'Reach player level 5.', icon: Zap, xp: 200, coins: 50, category: 'Milestone', goal: 5 },
    { id: 'milestone2', title: 'Battle Beginner', description: 'Play 10 battles.', icon: Swords, xp: 250, coins: 100, category: 'Milestone', goal: 10 },
    { id: 'milestone3', title: 'Getting Started', description: 'Complete 5 learning levels.', icon: Book, xp: 300, coins: 100, category: 'Milestone', goal: 5 },
    { id: 'milestone4', title: 'Boss Raider', description: 'Defeat a level 10+ boss.', icon: Skull, xp: 500, coins: 200, category: 'Milestone', goal: 1 },
    { id: 'milestone5', title: 'Guild Member', description: 'Join a guild.', icon: Users, xp: 100, coins: 50, category: 'Milestone', goal: 1 },
    { id: 'milestone6', title: 'Roadmap Explorer', description: 'Complete 10 levels of a learning roadmap.', icon: Globe, xp: 400, coins: 150, category: 'Milestone', goal: 10 },
    { id: 'milestone7', title: 'High Roller', description: 'Win a bet of 1000+ coins in a PvP match.', icon: Coins, xp: 300, coins: 100, category: 'Milestone', goal: 1 },
    { id: 'milestone8', title: 'Serious Competitor', description: 'Play 50 battles.', icon: Swords, xp: 500, coins: 200, category: 'Milestone', goal: 50 },
    { id: 'milestone9', title: 'Knowledge Seeker', description: 'Complete 25 learning levels.', icon: Book, xp: 600, coins: 200, category: 'Milestone', goal: 25 },
    { id: 'milestone10', title: 'Level 25 Reached', description: 'Reach player level 25.', icon: Zap, xp: 1000, coins: 500, category: 'Milestone', goal: 25 },
    { id: 'milestone11', title: 'Boss Vanquisher', description: 'Defeat 5 unique bosses.', icon: Skull, xp: 1200, coins: 600, category: 'Milestone', goal: 5 },
    { id: 'milestone12', title: 'Roadmap Master', description: 'Complete the "Beginning" stage of any roadmap.', icon: Crown, xp: 1500, coins: 750, category: 'Milestone', goal: 1 },
    { id: 'milestone13', title: 'Battle Veteran', description: 'Play 200 battles.', icon: Swords, xp: 1000, coins: 500, category: 'Milestone', goal: 200 },
    { id: 'milestone14', title: 'Lifelong Learner', description: 'Complete 100 learning levels.', icon: Book, xp: 2000, coins: 1000, category: 'Milestone', goal: 100 },
    { id: 'milestone15', title: 'The Collector', description: 'Unlock 10 achievements.', icon: Star, xp: 500, coins: 200, category: 'Milestone', goal: 10 },
    { id: 'milestone16', title: 'Level 50 Reached', description: 'Reach player level 50.', icon: Zap, xp: 2500, coins: 1250, category: 'Milestone', goal: 50 },
    { id: 'milestone17', title: 'Subject Specialist: Code', description: 'Complete 20 levels in the Software Development path.', icon: Code, xp: 750, coins: 300, category: 'Milestone', goal: 20 },
    { id: 'milestone18', title: 'Subject Specialist: AI', description: 'Complete 20 levels in the Data Science & AI path.', icon: Bot, xp: 750, coins: 300, category: 'Milestone', goal: 20 },
    { id: 'milestone19', title: 'Subject Specialist: Design', description: 'Complete 20 levels in the Graphic Design path.', icon: Palette, xp: 750, coins: 300, category: 'Milestone', goal: 20 },
    { id: 'milestone20', title: 'PVP Champion', description: 'Win 50 PvP battles.', icon: Trophy, xp: 1500, coins: 750, category: 'Milestone', goal: 50 },
    { id: 'milestone21', title: 'Guild Officer', description: 'Get promoted to Officer in a guild.', icon: Shield, xp: 500, coins: 250, category: 'Milestone', goal: 1 },
    { id: 'milestone22', title: 'Hard Boss Slayer', description: 'Defeat a level 25+ boss.', icon: Skull, xp: 2000, coins: 1000, category: 'Milestone', goal: 1 },
    { id: 'milestone23', title: 'Roadmap Virtuoso', description: 'Complete the "Intermediate" stage of any roadmap.', icon: Crown, xp: 3000, coins: 1500, category: 'Milestone', goal: 1 },
    { id: 'milestone24', title: 'Battle Legend', description: 'Play 1000 battles.', icon: Swords, xp: 5000, coins: 2500, category: 'Milestone', goal: 1000 },
    { id: 'milestone25', title: 'The Grandmaster', description: 'Complete an entire learning roadmap.', icon: Crown, xp: 10000, coins: 5000, category: 'Milestone', goal: 1 },
];

    