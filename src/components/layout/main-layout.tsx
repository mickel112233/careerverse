
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, Swords, UserCircle, ShoppingCart, Trophy, Skull, Star, CheckSquare, BookOpen } from "lucide-react";
import Logo from "@/components/icons/logo";
import { cn } from "@/lib/utils";
import CurrencyHeader from "@/components/ui/currency-header";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";

const menuItems = [
  { href: "/dashboard", label: "Home", icon: LayoutGrid },
  { href: "/study", label: "Study", icon: BookOpen },
  { href: "/competition", label: "Battle", icon: Swords },
  { href: "/boss-raid", label: "Bosses", icon: Skull },
  { href: "/quests", label: "Quests", icon: CheckSquare },
  { href: "/achievements", label: "Achievements", icon: Star },
  { href: "/guilds", label: "Guilds", icon: Users },
  { href: "/leaderboard", label: "Ranks", icon: Trophy },
  { href: "/shop", label: "Shop", icon: ShoppingCart },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

const NavLink = ({ href, label, icon: Icon, pathname, onClick }: { href: string; label: string; icon: React.ElementType; pathname: string; onClick?: () => void; }) => {
  const isActive = pathname.startsWith(href) && (href !== '/dashboard' || pathname === '/dashboard');
  return (
    <Link href={href} onClick={onClick} className={cn(
        "flex items-center justify-start gap-4 px-4 py-3 rounded-lg text-base font-medium transition-colors",
        isActive ? "text-background bg-primary hover:bg-primary/90" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}>
        <Icon className="h-5 w-5" />
        <span>{label}</span>
    </Link>
  );
};

const SidebarContent = ({ pathname, onLinkClick }: { pathname: string; onLinkClick?: () => void; }) => (
    <div className="flex flex-col h-full bg-card border-r border-border p-4">
        <Link href="/dashboard" className="flex items-center gap-2 mb-8 px-4">
            <Logo className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold font-headline text-glow">Career Clash</h1>
        </Link>
        <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
            <NavLink key={item.label} {...item} pathname={pathname} onClick={onLinkClick} />
        ))}
        </nav>
  </div>
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);

  const noLayoutPages = ['/', '/login', '/welcome'];
  if (noLayoutPages.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <SidebarContent pathname={pathname} />
        </aside>

        <div className="md:pl-64">
            <header className="fixed top-0 left-0 md:left-64 right-0 z-40 h-16 flex items-center justify-between px-4 bg-background/80 backdrop-blur-sm border-b border-border">
                <div className="md:hidden">
                    <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <LayoutGrid className="h-6 w-6"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <SheetHeader className="sr-only">
                                <SheetTitle>Menu</SheetTitle>
                                <SheetDescription>Main navigation menu for the application.</SheetDescription>
                            </SheetHeader>
                             <SidebarContent pathname={pathname} onLinkClick={() => setIsMobileSheetOpen(false)} />
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="flex-1" />
                <CurrencyHeader />
            </header>
            <main className="pt-16">
            {children}
            </main>
        </div>
    </div>
  );
}
