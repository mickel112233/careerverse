"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Swords, Trophy, BookOpen, Users, UserCircle, Settings, LogOut, ShoppingCart } from "lucide-react";
import Logo from "@/components/icons/logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Do not render the main layout on the landing page
  if (pathname === '/') {
    return <>{children}</>;
  }

  const menuItems = [
    { href: "/competition", label: "Dashboard", icon: Home },
    { href: "/competition", label: "Competition", icon: Swords },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/learning", label: "Learning", icon: BookOpen },
    { href: "/guilds", label: "Guilds", icon: Users },
    { href: "/shop", label: "Shop", icon: ShoppingCart },
    { href: "/profile", label: "Profile", icon: UserCircle },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/competition" className="flex items-center gap-2">
             <Logo className="h-8 w-8"/>
             <h1 className="text-xl font-semibold font-headline">Career Clash</h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-sidebar-accent">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="@username" data-ai-hint="woman face" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold truncate">Username</span>
                    <span className="text-xs text-muted-foreground truncate">user@email.com</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b md:p-2 md:border-none">
          <div className="md:hidden">
            <Link href="/competition" className="flex items-center gap-2">
                <Logo className="h-8 w-8"/>
            </Link>
          </div>
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
