import { Button } from "@/components/ui/button";
import Logo from "@/components/icons/logo";
import Link from "next/link";
import { MoveRight, Target } from "lucide-react";

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
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-headline text-white">
      <GridBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <header className="mb-8">
          <Logo className="h-20 w-20 md:h-24 md:w-24"/>
        </header>

        <main className="flex flex-col items-center">
          <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">
            CAREER CLASH
          </h1>
          <p className="font-body mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">
            Enter the Ultimate Career Arena. <br className="hidden sm:block" /> Where Learning Meets Gaming • Forge Your Future
          </p>

          <Button asChild size="lg" className="mt-8 font-bold text-lg px-10 py-7 rounded-full bg-primary/10 border-2 border-primary text-primary shadow-[0_0_20px_theme(colors.primary)] hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_40px_theme(colors.primary)] transition-all duration-300">
            <Link href="/competition">
              BEGIN ADVENTURE
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <div className="mt-8 flex items-center gap-2 rounded-full border border-border bg-card/50 p-2 px-4 text-sm text-slate-300 backdrop-blur-sm">
            <Target className="h-5 w-5 text-lime-400 animate-pulse" />
            <span className="font-body">120M+ Teen Gamers Ready — Join India’s Next-Gen Learning Revolution</span>
          </div>
        </main>
        
        <footer className="absolute bottom-4 w-full px-4">
          <div className="relative flex justify-center items-center text-center text-xs text-slate-500 font-body">
            <p>Powered by Next-Gen EdTech · Built for Future Leaders</p>
            <div className="absolute bottom-0 right-4 text-xs hidden md:block">
              Edit with ❤️ Lovable
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
