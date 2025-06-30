'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BookOpen, Swords, Users, MoveRight, Trophy, Skull } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const featureCards = [
    {
        icon: BookOpen,
        title: 'Learning Roadmap',
        description: 'Choose a career path and follow a structured roadmap from beginner to expert, one challenge at a time.',
    },
    {
        icon: Swords,
        title: 'Battle Arena',
        description: 'Test your knowledge against AI opponents in real-time quiz battles. Bet coins and win big!',
    },
    {
        icon: Skull,
        title: 'Boss Raids',
        description: 'Team up with your guild members to take down formidable AI bosses for legendary rewards.',
    },
    {
        icon: Users,
        title: 'Guilds',
        description: 'Join or create a guild to collaborate with peers, chat, and participate in team events.',
    },
    {
        icon: Trophy,
        title: 'Leaderboards',
        description: 'Climb the ranks by earning XP and proving your skills. Compete for the top spot!',
    },
];

export default function WelcomePage() {
    const router = useRouter();

    // This is a failsafe. If a non-guest somehow lands here,
    // or if a guest has already selected a learning path, send them to the dashboard.
    useEffect(() => {
        const hasRoadmap = localStorage.getItem('careerClashRoadmap');
        if (hasRoadmap) {
            router.replace('/dashboard');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Welcome to Career Clash!</h1>
                <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                    Your adventure begins now. Here’s a quick look at what you can do to forge your future.
                </p>
            </motion.div>

            <div className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {featureCards.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        >
                            <Card className="h-full bg-card/50 hover:bg-card/80 transition-colors">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <feature.icon className="h-8 w-8 text-primary shrink-0" />
                                        <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.8 }}
            >
                <Button asChild size="lg">
                    <Link href="/dashboard">
                        Let's Get Started <MoveRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </motion.div>
        </div>
    );
}
