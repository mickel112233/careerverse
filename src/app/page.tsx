
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/icons/logo';
import { ArrowRight, BookOpen, Crown, Shield, Star, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ value, label }: { value: string, label: string }) => (
    <div className="text-center">
        <p className="text-4xl font-bold text-primary text-glow">{value}</p>
        <p className="text-sm text-muted-foreground uppercase tracking-widest">{label}</p>
    </div>
);

const FeatureTile = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:-translate-y-1 transition-transform duration-300 h-full">
        <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold font-headline mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center z-10"
      >
        <header className="mb-4 flex flex-col items-center">
            <Logo className="h-20 w-20 md:h-24 md:w-24 text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.7)]" />
            <h1 className="font-headline text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl bg-gradient-to-b from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] mt-4">
                CAREER CLASH
            </h1>
            <p className="mt-2 text-lg text-slate-300 md:text-xl max-w-2xl">
                Embark on an epic RPG adventure to discover your perfect career path.
            </p>
        </header>

        <main className="flex flex-col items-center w-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                 <Button asChild size="lg" className="font-bold text-lg px-10 py-7 rounded-full shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105">
                    <Link href="/welcome">
                        Begin Your Journey
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </motion.div>
           
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="my-12 w-full max-w-4xl"
            >
                <Card className="bg-card/30 backdrop-blur-sm">
                    <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatCard value="500+" label="Career Paths" />
                        <StatCard value="50+" label="Hidden Jobs" />
                        <StatCard value="10K+" label="Players" />
                        <StatCard value="100+" label="Achievements" />
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ staggerChildren: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
            >
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <FeatureTile icon={Crown} title="Skill Mastery" description="Level up your real-world skills through interactive challenges." />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <FeatureTile icon={BookOpen} title="Unlock Careers" description="Discover and explore diverse career paths you never knew existed." />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <FeatureTile icon={Shield} title="Epic Quests" description="Complete quests to earn XP, rewards, and prove your capabilities." />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <FeatureTile icon={Zap} title="Diverse Paths" description="Whether you're a coder, artist, or leader, there's a path for you." />
                </motion.div>
                 <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <FeatureTile icon={Star} title="Achievements" description="Earn unique badges and titles to showcase on your profile." />
                </motion.div>
                 <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <FeatureTile icon={Users} title="Real Impact" description="Skills you gain here are applicable to real-world job opportunities." />
                </motion.div>
            </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
