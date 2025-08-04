
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { BookOpen, Bot, Briefcase, Code, PenTool, ArrowRight, Lightbulb, Users, BarChart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PowerLevels } from '@/lib/skill-mapping';

export const factions = [
    {
        name: 'Tech Forgers',
        icon: Code,
        tagline: 'Masters of code and digital innovation.',
        skills: ['Backend Dev', 'AI/ML', 'Cybersecurity'],
        careers: ['Software Engineer', 'AI Specialist', 'Security Analyst'],
        color: 'hover:border-blue-400',
        perk: '+10% XP from Technical subjects.',
        perkCategory: 'technical' as keyof PowerLevels,
    },
    {
        name: 'Creative Artisans',
        icon: PenTool,
        tagline: 'Imaginative and artistic visionaries.',
        skills: ['UI/UX Design', 'Content Creation', 'Branding'],
        careers: ['Product Designer', 'YouTuber', 'Marketing Artist'],
        color: 'hover:border-pink-400',
        perk: '+10% XP from Creative subjects.',
        perkCategory: 'creativity' as keyof PowerLevels,
    },
    {
        name: 'Social Champions',
        icon: Users,
        tagline: 'Community leaders and communicators.',
        skills: ['Marketing', 'Sales', 'Project Management'],
        careers: ['Community Manager', 'Sales Director', 'Producer'],
        color: 'hover:border-green-400',
        perk: '+10% XP from Social subjects.',
        perkCategory: 'social' as keyof PowerLevels,
    },
    {
        name: 'Knowledge Seekers',
        icon: Lightbulb,
        tagline: 'Research and analysis-focused scholars.',
        skills: ['Data Science', 'Business Analysis', 'R&D'],
        careers: ['Data Scientist', 'Business Analyst', 'Research Scientist'],
        color: 'hover:border-yellow-400',
        perk: '+10% XP from Logic subjects.',
        perkCategory: 'logic' as keyof PowerLevels,
    },
    {
        name: 'Innovation Pioneers',
        icon: Briefcase,
        tagline: 'Entrepreneurs and startup founders.',
        skills: ['Leadership', 'Finance', 'Strategy'],
        careers: ['Startup CEO', 'Venture Capitalist', 'Product Manager'],
        color: 'hover:border-purple-400',
        perk: '+10% XP from Leadership subjects.',
        perkCategory: 'leadership' as keyof PowerLevels,
    },
];

export default function WelcomePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [heroName, setHeroName] = useState('');
    const [selectedFaction, setSelectedFaction] = useState('');

    const handleBeginJourney = () => {
        if (!heroName.trim()) {
            toast({ variant: 'destructive', title: 'A Hero Needs a Name', description: 'Please enter a name for your hero.' });
            return;
        }
        if (!selectedFaction) {
            toast({ variant: 'destructive', title: 'Choose Your Faction', description: 'Every hero must belong to a faction.' });
            return;
        }

        const profile = {
            name: heroName,
            title: `Aspiring ${selectedFaction}`,
            faction: selectedFaction,
            bio: `A new member of the ${selectedFaction}, ready to forge my destiny.`,
            avatarPrompt: 'mysterious shadow figure',
            bannerPrompt: 'abstract purple and blue nebula',
            links: { github: '', youtube: '', instagram: '', discord: '' },
            stats: { wins: 0, losses: 0, streak: 0, longestStreak: 0, bossesDefeated: 0 },
            battleHistory: [],
        };
        
        localStorage.setItem('careerClashUserProfile', JSON.stringify(profile));
        window.dispatchEvent(new Event('profileChange'));

        toast({
            title: `Welcome, ${heroName}!`,
            description: `Your journey as a ${selectedFaction} begins now.`,
            className: 'bg-primary text-primary-foreground'
        });

        router.push('/');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8 max-w-3xl"
            >
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Create Your Hero</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Your legend is about to be written. Who will you become?
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-5xl space-y-8"
            >
                <Card className="bg-card/50">
                    <CardContent className="p-6">
                        <Label htmlFor="hero-name" className="text-xl font-bold font-headline">Name Your Hero</Label>
                        <Input 
                            id="hero-name"
                            placeholder="e.g., QuantumLeap" 
                            className="mt-2 text-lg h-12" 
                            value={heroName}
                            onChange={(e) => setHeroName(e.target.value)}
                        />
                    </CardContent>
                </Card>

                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold font-headline">Choose Your Faction</CardTitle>
                        <CardDescription>Your faction determines your starting focus and grants a unique perk.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {factions.map((faction) => {
                            const Icon = faction.icon;
                            const isSelected = selectedFaction === faction.name;
                            return (
                                <motion.button
                                    key={faction.name}
                                    onClick={() => setSelectedFaction(faction.name)}
                                    className={cn(
                                        "p-4 border-2 rounded-lg text-left transition-all duration-300 relative overflow-hidden flex flex-col h-full",
                                        isSelected ? 'border-primary shadow-lg shadow-primary/20' : 'border-border bg-background/50',
                                        faction.color
                                    )}
                                    whileHover={{ y: -5 }}
                                >
                                    {isSelected && <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-primary" />}
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className="h-8 w-8 text-primary shrink-0" />
                                        <h3 className="text-lg font-bold font-headline">{faction.name}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3 flex-grow">{faction.tagline}</p>
                                    <div className="text-xs space-y-1 mt-auto">
                                        <div className="flex items-center gap-2 font-semibold text-primary p-2 bg-primary/10 rounded-md">
                                            <Zap className="h-4 w-4" />
                                            <span>{faction.perk}</span>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.4 }}
                 className="mt-8"
            >
                <Button size="lg" onClick={handleBeginJourney}>
                    Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </motion.div>
        </div>
    );
}
