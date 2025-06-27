
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, Swords, UserCircle, ShoppingCart, Trophy, Skull } from "lucide-react";
import Logo from "@/components/icons/logo";
import { cn } from "@/lib/utils";
import CurrencyHeader from "@/components/ui/currency-header";

const menuItems = [
  { href: "/dashboard", label: "Home", icon: LayoutGrid },
  { href: "/competition", label: "Battle", icon: Swords },
  { href: "/boss-raid", label: "Bosses", icon: Skull },
  { href: "/guilds", label: "Guilds", icon: Users },
  { href: "/leaderboard", label: "Ranks", icon: Trophy },
  { href: "/shop", label: "Shop", icon: ShoppingCart },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

const NavLink = ({ href, label, icon: Icon, pathname }: { href: string; label: string; icon: React.ElementType; pathname: string; }) => {
  const isActive = pathname.startsWith(href) && (href !== '/dashboard' || pathname === '/dashboard');
  return (
    <Link href={href} className={cn(
        "flex flex-col items-center justify-center gap-1 p-1 rounded-md text-sm font-medium transition-colors md:flex-row md:w-full md:justify-start md:px-4 md:py-3",
        isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    )}>
        <Icon className="h-5 w-5" />
        <span className="text-[10px] leading-tight md:hidden">{label}</span>
        <span className="hidden md:inline">{label}</span>
    </Link>
  );
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 bg-card border-r border-border">
        <div className="flex flex-col flex-grow p-4">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8 px-4">
            <Logo className="h-8 w-8" />
            <h1 className="text-xl font-semibold font-headline">Career Clash</h1>
          </Link>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <NavLink key={item.label} {...item} pathname={pathname} />
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 md:pl-60">
        <CurrencyHeader />
        <main className="pb-20 md:pb-0">
          {children}
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t border-border p-1.5 z-50">
        <div className="grid grid-cols-7 gap-1">
           {menuItems.map((item) => (
              <NavLink key={item.label} {...item} pathname={pathname} />
            ))}
        </div>
      </nav>
    </div>
  );
}
