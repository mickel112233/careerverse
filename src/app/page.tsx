import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Shield, Swords, Trophy, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex flex-col items-center justify-center text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary">
          Welcome to CareerVerse
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
          Level up your career with AI-powered skill battles, personalized learning paths, and community guilds. Prove your expertise and climb the ranks.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="font-bold">
            <Link href="/competition">
              <Swords className="mr-2 h-5 w-5" /> Start a Battle
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="font-bold">
            <Link href="/learning">
              <BookOpen className="mr-2 h-5 w-5" /> Find Your Path
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium font-headline">AI Competitions</CardTitle>
            <Shield className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Challenge our AI in simulated skill battles tailored to your desired job role.
            </p>
            <Button variant="link" asChild className="p-0 h-auto mt-4 font-bold">
                <Link href="/competition">
                    Generate Quiz <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium font-headline">Leaderboards</CardTitle>
            <Trophy className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              See how you stack up against other professionals. Earn XP and climb the ranks.
            </p>
            <Button variant="link" asChild className="p-0 h-auto mt-4 font-bold">
                <Link href="/leaderboard">
                    View Rankings <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium font-headline">Join a Guild</CardTitle>
            <Users className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Team up with peers, participate in team battles, and collaborate on projects.
            </p>
             <Button variant="link" asChild className="p-0 h-auto mt-4 font-bold">
                <Link href="/guilds">
                    Explore Guilds <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="mt-16 md:mt-24 rounded-xl bg-card p-8 md:p-12 border flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
                <h2 className="text-3xl font-bold font-headline text-primary">Personalized Learning Paths</h2>
                <p className="mt-4 text-muted-foreground">
                    Don't just compete, grow. Our AI analyzes your goals and performance to recommend tailored learning modules and resources, helping you turn weaknesses into strengths.
                </p>
                 <Button asChild className="mt-6 font-bold">
                    <Link href="/learning">
                        Get my learning path
                    </Link>
                </Button>
            </div>
            <div className="flex-1 w-full h-64 md:h-auto">
                 <Image src="https://placehold.co/600x400.png" alt="Personalized Learning" width={600} height={400} className="rounded-lg object-cover w-full h-full" data-ai-hint="learning path" />
            </div>
       </div>

    </div>
  );
}
