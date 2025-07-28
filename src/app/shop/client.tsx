
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gem, Star, Crown, Sparkles, Wand2, Check, ArrowLeft, Coins, Clock, Users, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { memberships, guildPerks, GuildPerk, currencyPacks } from '@/lib/shop-data';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CountdownTimer = ({ expiryTimestamp, onExpire }: { expiryTimestamp: number, onExpire: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(expiryTimestamp - Date.now());

    useEffect(() => {
        if (timeLeft <= 0) {
            onExpire();
            return;
        }

        const interval = setInterval(() => {
            const newTimeLeft = expiryTimestamp - Date.now();
            if (newTimeLeft <= 0) {
                clearInterval(interval);
                onExpire();
            }
            setTimeLeft(newTimeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiryTimestamp, onExpire, timeLeft]);

    if (timeLeft <= 0) return <span className="text-xs text-destructive">Expired</span>;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return <span className="text-xs text-muted-foreground">{days}d {hours}h {minutes}m left</span>;
};

const PerkCard = ({ item, onPurchase }: { item: GuildPerk, onPurchase: (perk: GuildPerk) => void }) => {
    const ItemIcon = item.icon;
    const rarityColors: { [key: string]: string } = {
        Common: 'border-gray-400',
        Rare: 'border-blue-400',
        Epic: 'border-purple-500',
        Legendary: 'border-orange-400 animate-pulse-slow',
    }
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="h-full"
        >
            <Card className={cn("flex flex-col h-full hover:shadow-primary/30 hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2", item.rarity && rarityColors[item.rarity])}>
                <CardHeader className="p-4 items-center text-center">
                    <ItemIcon className="h-10 w-10 mb-2 text-accent"/>
                    <CardTitle className="font-headline text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="bg-card-foreground/5 p-4 mt-auto">
                    <Button className="w-full" onClick={() => onPurchase(item)}>
                        <div className="flex items-center">
                            <Gem className="h-4 w-4 mr-2 text-cyan-400"/>
                            {item.price.toLocaleString()}
                        </div>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};


export default function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'memberships';
  const { toast } = useToast();

  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeSub, setActiveSub] = useState<{name: string, expires: number} | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isGuestWarningOpen, setIsGuestWarningOpen] = useState(false);
  const [purchaseAction, setPurchaseAction] = useState<(() => void) | null>(null);

  const checkActiveSubscription = () => {
    const subName = localStorage.getItem('careerClashMembership') || 'Basic';
    const subDate = localStorage.getItem('careerClashMembershipPurchaseDate');
    const subCycle = localStorage.getItem('careerClashMembershipCycle') || 'monthly';
    const profile = JSON.parse(localStorage.getItem('careerClashUserProfile') || '{}');
    if (profile.name && profile.name.startsWith('Guest-')) {
        setIsGuest(true);
    } else {
        setIsGuest(false);
    }
    
    if (subName && subName !== 'Free' && subName !== 'Basic' && subDate) {
        const purchaseTime = parseInt(subDate, 10);
        const duration = subCycle === 'yearly' ? 365 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
        const expires = purchaseTime + duration;

        if (Date.now() < expires) {
            setActiveSub({ name: subName, expires });
        } else {
            // Subscription expired, clear it
            localStorage.setItem('careerClashMembership', 'Basic');
            localStorage.removeItem('careerClashMembershipPurchaseDate');
            localStorage.removeItem('careerClashMembershipCycle');
            setActiveSub(null);
            window.dispatchEvent(new Event('currencyChange'));
        }
    } else {
        setActiveSub({ name: 'Basic', expires: 0 });
    }
  }

  useEffect(() => {
    checkActiveSubscription();
    window.addEventListener('currencyChange', checkActiveSubscription);
    window.addEventListener('profileChange', checkActiveSubscription);
    return () => {
        window.removeEventListener('currencyChange', checkActiveSubscription);
        window.removeEventListener('profileChange', checkActiveSubscription);
    }
  }, []);

  const executePurchase = (action: () => void) => {
    if (isGuest) {
      setPurchaseAction(() => action);
      setIsGuestWarningOpen(true);
    } else {
      action();
    }
  }

  const handlePerkPurchase = (perk: GuildPerk) => {
    executePurchase(() => {
        const userGems = parseInt(localStorage.getItem('careerClashGems') || '0', 10);
        const guildString = localStorage.getItem('userGuild');

        if (!guildString) {
            toast({ variant: 'destructive', title: 'No Guild Found', description: 'You must be in a guild to purchase this perk.' });
            return;
        }
        
        const guild = JSON.parse(guildString);
        if (guild.owner !== 'QuantumLeap') {
             toast({ variant: 'destructive', title: 'Permission Denied', description: 'Only the guild leader can purchase capacity upgrades.' });
            return;
        }

        if (userGems < perk.price) {
            toast({ variant: 'destructive', title: 'Insufficient Gems', description: 'You do not have enough gems for this perk.' });
            return;
        }

        const newGems = userGems - perk.price;
        localStorage.setItem('careerClashGems', newGems.toString());

        const newCapacity = guild.capacity + perk.value;
        const updatedGuild = { ...guild, capacity: newCapacity };
        localStorage.setItem('userGuild', JSON.stringify(updatedGuild));
        
        window.dispatchEvent(new Event('currencyChange'));
        window.dispatchEvent(new Event('guildChange'));

        toast({ title: 'Perk Purchased!', description: `Your guild capacity has increased by ${perk.value} slots!`, className: "bg-green-500 text-white" });
    });
  };

  const handleCurrencyPurchase = (amount: number, currency: 'coins' | 'gems') => {
     if (currency === 'coins') {
        const currentCoins = parseInt(localStorage.getItem('careerClashCoins') || '0', 10);
        localStorage.setItem('careerClashCoins', (currentCoins + amount).toString());
    } else {
        const currentGems = parseInt(localStorage.getItem('careerClashGems') || '0', 10);
        localStorage.setItem('careerClashGems', (currentGems + amount).toString());
    }
    window.dispatchEvent(new Event('currencyChange'));
    toast({ title: 'Purchase Successful!', description: `Added ${amount.toLocaleString()} ${currency} to your wallet.`, className: "bg-green-500 text-white" });
  }

  const handleMembershipPurchase = (planName: string, cycle: 'monthly' | 'yearly') => {
    executePurchase(() => {
        if (planName === 'Basic') return;
        
        const plan = memberships.find(p => p.name === planName);
        if (!plan) return;

        const purchaseTime = Date.now();
        localStorage.setItem('careerClashMembership', plan.name);
        localStorage.setItem('careerClashMembershipPurchaseDate', purchaseTime.toString());
        localStorage.setItem('careerClashMembershipCycle', cycle);
        
        let toastDescription = `You are now subscribed to the ${plan.name} plan.`;
        const rewards = [];
        
        if (plan.coinGrant && plan.coinGrant > 0) {
            const currentCoins = parseInt(localStorage.getItem('careerClashCoins') || '0', 10);
            localStorage.setItem('careerClashCoins', (currentCoins + plan.coinGrant).toString());
            rewards.push(`${plan.coinGrant.toLocaleString()} coins`);
        }
        
        if (plan.gemGrant && plan.gemGrant > 0) {
            const currentGems = parseInt(localStorage.getItem('careerClashGems') || '0', 10);
            localStorage.setItem('careerClashGems', (currentGems + plan.gemGrant).toString());
            rewards.push(`${plan.gemGrant.toLocaleString()} gems`);
        }

        const storedRoadmap = localStorage.getItem('careerClashRoadmap');
        if (storedRoadmap) {
            const roadmap = JSON.parse(storedRoadmap);
            const unlockedRoadmap = roadmap.map((stage: any) => ({
                ...stage,
                status: 'unlocked',
                levels: stage.levels.map((level: any) => ({
                    ...level,
                    // Unlock all levels except those already completed
                    status: level.status === 'completed' ? 'completed' : 'unlocked'
                }))
            }));
            localStorage.setItem('careerClashRoadmap', JSON.stringify(unlockedRoadmap));
        }

        window.dispatchEvent(new Event('currencyChange'));
        
        if (rewards.length > 0) {
            toastDescription += ` ${rewards.join(' and ')} have been added to your wallet.`;
        }

        toast({ 
            title: 'Subscription Activated!', 
            description: toastDescription,
            className: "bg-green-500 text-white" 
        });
    });
  };

  return (
    <>
    <AlertDialog open={isGuestWarningOpen} onOpenChange={setIsGuestWarningOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Guest Purchase Warning</AlertDialogTitle>
            <AlertDialogDescription>
                You are making this purchase as a Guest. All purchases, including memberships and perks, are tied to your browser's local data.
                <br/><br/>
                <span className="font-bold text-destructive">If you clear your browser cache or use a different device, this purchase will be permanently lost. There are no refunds for lost guest data.</span>
                <br/><br/>
                Are you sure you want to continue?
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPurchaseAction(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
                if (purchaseAction) {
                purchaseAction();
                }
                setIsGuestWarningOpen(false);
                setPurchaseAction(null);
            }}>
                I Understand, Continue
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    <div>
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="perks">Perks</TabsTrigger>
          <TabsTrigger value="currencies">Currencies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="memberships">
             <div className="flex justify-center mb-6">
                 <ToggleGroup type="single" value={billingCycle} onValueChange={(value) => value && setBillingCycle(value)} aria-label="Billing Cycle">
                    <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
                    <ToggleGroupItem value="yearly">Yearly <Badge variant="secondary" className="ml-2 bg-green-500/20 text-green-400">Save 16%</Badge></ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {memberships.map((plan) => {
                    const isCurrentPlan = activeSub?.name === plan.name;
                    const isDisabled = isCurrentPlan && plan.name !== 'Basic';

                    return (
                        <Card key={plan.name} className={cn("flex flex-col", plan.highlight && "border-primary ring-2 ring-primary shadow-lg shadow-primary/20", isCurrentPlan && plan.name !== 'Basic' && "border-green-500 ring-2 ring-green-500")}>
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <plan.icon className={cn("h-8 w-8", plan.color)} />
                                        <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                                    </div>
                                    {isCurrentPlan && plan.name !== 'Basic' && <Badge variant="secondary" className="bg-green-500 text-white">Active</Badge>}
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold">{billingCycle === 'monthly' ? plan.monthlyPrice.split('/')[0] : plan.yearlyPrice.split('/')[0]}</span>
                                    <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-2">
                                {plan.features.map(feature => (
                                    <div key={feature} className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                        <p className="text-muted-foreground text-sm">{feature}</p>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="flex-col items-stretch">
                                <Button className="w-full" variant={plan.highlight ? 'default' : 'outline'} onClick={() => handleMembershipPurchase(plan.name, billingCycle as 'monthly' | 'yearly')} disabled={isDisabled}>
                                    {isCurrentPlan ? "Current Plan" : "Subscribe"}
                                </Button>
                                {isCurrentPlan && activeSub && activeSub.expires > 0 && (
                                    <div className="flex items-center justify-center gap-2 pt-2">
                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                        <CountdownTimer expiryTimestamp={activeSub.expires} onExpire={checkActiveSubscription} />
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>

        <TabsContent value="perks" className="space-y-8">
            <div>
                 <h2 className="text-2xl font-bold font-headline text-center mb-4">Guild Perks</h2>
                 <p className="text-muted-foreground text-center mb-6">Purchase one-time upgrades for your guild.</p>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {guildPerks.map((item) => (
                        <PerkCard key={item.name} item={item} onPurchase={handlePerkPurchase} />
                    ))}
                </div>
            </div>
        </TabsContent>
        
        <TabsContent value="currencies">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-headline font-bold">Refill Your Wallet</h2>
                <p className="text-muted-foreground">Purchase Coins and Gems to spend in the shop.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currencyPacks.map((pack) => (
                     <Card key={pack.name}>
                        <CardHeader className="items-center text-center">
                            {pack.currency === 'coins' ? <Coins className="h-12 w-12 text-yellow-400"/> : <Gem className="h-12 w-12 text-primary"/>}
                            <CardTitle className="font-headline text-xl">{pack.name}</CardTitle>
                            <CardDescription>{pack.amount.toLocaleString()} {pack.currency}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleCurrencyPurchase(pack.amount, pack.currency as 'coins' | 'gems')}>
                               {pack.price}
                            </Button>
                        </CardFooter>
                     </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
}
