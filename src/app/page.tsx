
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import Link from 'next/link';
import { MoveRight, Target, LogIn, User } from 'lucide-react';
import SplashScreen from '@/components/splash-screen';
import { motion } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const GridBackground = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-background">
    <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(139,92,246,0.15),rgba(255,255,255,0))]"></div>
    <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(59,130,246,0.15),rgba(255,255,255,0))]"></div>
    <svg
      className="absolute inset-0 -z-10 h-full w-full stroke-border/50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width="80"
          height="80"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 80V.5H80" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
    </svg>
  </div>
);

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true);
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user has any progress to determine if they are "new"
    const userProfile = localStorage.getItem('careerClashUserProfile');
    if (userProfile) {
      setIsNewUser(false);
    }
  }, []);

  const handleContinueAsGuest = () => {
    const guestId = Math.floor(1000 + Math.random() * 9000);
    const guestProfile = {
      name: `Guest-${guestId}`,
      title: 'Curious Explorer',
      bio: 'Playing as a guest.',
      avatarPrompt: 'mysterious shadow figure',
      bannerPrompt: 'abstract grey geometric pattern',
      links: {},
      stats: { wins: 0, losses: 0, streak: 0, longestStreak: 0, bossesDefeated: 0 },
      battleHistory: [],
    };
    localStorage.setItem('careerClashUserProfile', JSON.stringify(guestProfile));
    
    setIsGuestDialogOpen(false);
    router.push('/welcome');
  };
  
  if (showSplash) {
    return <SplashScreen onFinished={() => setShowSplash(false)} />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <GridBackground />
      <AlertDialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Continue as Guest?</AlertDialogTitle>
            <AlertDialogDescription>
              Your name will be displayed as a random guest (e.g., Guest-1234), and your progress will not be saved. For the full experience, please create an account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinueAsGuest}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog open={isTermsDialogOpen} onOpenChange={setIsTermsDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
                <AlertDialogDescription className="max-h-[60vh] overflow-y-auto pr-4 text-sm">
                    <p className="mb-2">Welcome to Career Clash. By using our service, you agree to these terms.</p>
                    <h3 className="font-bold mt-4 mb-2">1. Account Data</h3>
                    <p>Your game progress, currency, and items are stored locally in your browser. Clearing your browser data will result in permanent loss of this information. Guest accounts are temporary and data loss is expected.</p>
                    <h3 className="font-bold mt-4 mb-2">2. In-App Purchases</h3>
                    <p>All purchases of virtual currency (Coins, Gems), memberships, or other items are final and non-refundable. There are no exceptions.</p>
                    <h3 className="font-bold mt-4 mb-2">3. Data Reset and Deletion</h3>
                    <p>Using the "Reset Profile" or "Delete Account" feature is an irreversible action. It will permanently erase all your game data, including any purchased items and memberships, from your browser. This data cannot be recovered, and you will not be eligible for a refund.</p>
                     <h3 className="font-bold mt-4 mb-2">4. User Conduct</h3>
                    <p>You agree not to exploit bugs or use any unauthorized third-party software to gain an unfair advantage. We reserve the right to modify these terms at any time.</p>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => setIsTermsDialogOpen(false)}>Close</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <motion.div
          className="flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.header variants={itemVariants} className="mb-8">
            <Logo className="h-20 w-20 md:h-24 md:w-24" />
          </motion.header>

          <main className="flex flex-col items-center">
            <motion.h1 variants={itemVariants} className="font-headline text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
              CAREER CLASH
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">
              Enter the Ultimate Career Arena. <br className="hidden sm:block" /> Where Learning Meets Gaming • Forge Your Future
            </motion.p>
            {isNewUser ? (
                 <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mt-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" className="font-bold text-lg px-8 py-6 rounded-full bg-primary/10 border-2 border-primary text-primary shadow-primary hover:bg-primary hover:text-primary-foreground hover:shadow-primary-hover transition-all duration-300" disabled={!termsAccepted}>
                            <Link href="/login">
                                <LogIn className="mr-2 h-5 w-5" />
                                Sign In / Sign Up
                            </Link>
                        </Button>
                        <Button size="lg" variant="secondary" className="font-bold text-lg px-8 py-6 rounded-full" onClick={() => setIsGuestDialogOpen(true)} disabled={!termsAccepted}>
                            <User className="mr-2 h-5 w-5" />
                            Continue as Guest
                        </Button>
                    </div>
                     <div className="flex items-center space-x-2 mt-4">
                        <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} />
                        <Label htmlFor="terms" className="text-sm text-muted-foreground">
                            I agree to the{' '}
                            <button onClick={() => setIsTermsDialogOpen(true)} className="underline hover:text-primary transition-colors">
                            Terms and Conditions
                            </button>
                            .
                        </Label>
                    </div>
                </motion.div>
            ) : (
                <motion.div variants={itemVariants}>
                <Button asChild size="lg" className="mt-8 font-bold text-lg px-10 py-7 rounded-full bg-primary/10 border-2 border-primary text-primary shadow-primary hover:bg-primary hover:text-primary-foreground hover:shadow-primary-hover transition-all duration-300">
                    <Link href="/dashboard">
                    BEGIN ADVENTURE
                    <MoveRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
                </motion.div>
            )}

            <motion.div variants={itemVariants} className="mt-8 flex items-center gap-2 rounded-full border border-border bg-card/50 p-2 px-4 text-sm text-slate-300 backdrop-blur-sm">
              <Target className="h-5 w-5 text-lime-400 animate-pulse" />
              <span className="text-center">120M+ Teen Gamers Ready — Join India’s Next-Gen Learning Revolution</span>
            </motion.div>
          </main>
        </motion.div>

        <footer className="absolute bottom-4 w-full px-4">
          <div className="relative flex justify-center items-center text-center text-xs text-slate-500">
            <p>Powered by Next-Gen EdTech · Built for Future Leaders</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
