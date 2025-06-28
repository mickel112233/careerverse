
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gem, Star, ShoppingCart, Crown, Sparkles, Wand2, Check, ArrowLeft, Coins, Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { AiImage } from '@/components/ui/ai-image';
import { motion } from 'framer-motion';
import { memberships, addOns, currencyPacks, limitedTimeOffers, ShopItem } from '@/lib/shop-data';
import { Badge } from '@/components/ui/badge';


const ItemCard = ({ item, onPurchase, isOwned }: { item: ShopItem, onPurchase: () => void, isOwned: boolean }) => {
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
                <CardHeader className="p-0 relative">
                    <AiImage prompt={item.prompt} alt={item.name} width={400} height={400} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-md"><ItemIcon className="h-5 w-5 text-accent"/></div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                    <CardTitle className="font-headline text-lg mb-2">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <CardFooter className="bg-card-foreground/5 p-4 mt-auto">
                <Button className="w-full" onClick={onPurchase} disabled={isOwned}>
                    {isOwned ? (
                        <>
                            <Check className="mr-2" /> Owned
                        </>
                    ) : (
                        <div className="flex items-center">
                            {item.currency === 'coins' ? <Coins className="h-4 w-4 mr-2 text-yellow-400" /> : <Gem className="h-4 w-4 mr-2 text-cyan-400"/>}
                            {item.price.toLocaleString()}
                        </div>
                    )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};


export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'memberships';
  const { toast } = useToast();

  const [inventory, setInventory] = useState<string[]>([]);
  const [membership, setMembership] = useState('Free');

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem('careerClashInventory') || '[]');
    setInventory(storedInventory);
    const storedMembership = localStorage.getItem('careerClashMembership') || 'Free';
    setMembership(storedMembership);
  }, []);
  
  useEffect(() => {
    const handleStorageChange = () => {
        const storedMembership = localStorage.getItem('careerClashMembership') || 'Free';
        setMembership(storedMembership);
        const storedInventory = JSON.parse(localStorage.getItem('careerClashInventory') || '[]');
        setInventory(storedInventory);
    };
    window.addEventListener('currencyChange', handleStorageChange);
    return () => window.removeEventListener('currencyChange', handleStorageChange);
  }, []);

  const handlePurchase = (item: ShopItem) => {
    if (inventory.includes(item.name)) {
        toast({ variant: 'destructive', title: 'Already Owned', description: `You already own ${item.name}.` });
        return;
    }

    const currentCoins = parseInt(localStorage.getItem('careerClashCoins') || '0', 10);
    const currentGems = parseInt(localStorage.getItem('careerClashGems') || '0', 10);

    if (item.currency === 'coins') {
        if (currentCoins < item.price) {
            toast({ variant: 'destructive', title: 'Insufficient Coins', description: 'You do not have enough coins to purchase this item.' });
            return;
        }
        localStorage.setItem('careerClashCoins', (currentCoins - item.price).toString());
    } else {
        if (currentGems < item.price) {
            toast({ variant: 'destructive', title: 'Insufficient Gems', description: 'You do not have enough gems to purchase this item.' });
            return;
        }
        localStorage.setItem('careerClashGems', (currentGems - item.price).toString());
    }
    
    const newInventory = [...inventory, item.name];
    setInventory(newInventory);
    localStorage.setItem('careerClashInventory', JSON.stringify(newInventory));

    window.dispatchEvent(new Event('currencyChange'));
    window.dispatchEvent(new Event('profileChange'));

    toast({ title: 'Purchase Successful!', description: `You have successfully purchased ${item.name}.`, className: "bg-green-500 text-white" });
  };

  const handleCurrencyPurchase = (amount: number, currency: 'coins' | 'gems', packName: string) => {
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

  const handleMembershipPurchase = (planName: string) => {
    localStorage.setItem('careerClashMembership', planName);
    window.dispatchEvent(new Event('currencyChange'));
    toast({ title: 'Subscription Activated!', description: `You are now subscribed to the ${planName} plan.`, className: "bg-green-500 text-white" });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Item Shop</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
            Purchase cosmetics, power-ups, memberships, and career-boosting tools.
            </p>
        </div>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
          <TabsTrigger value="currencies">Currencies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="memberships">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {memberships.map((plan) => {
                    const PlanIcon = plan.icon;
                    const isCurrentPlan = membership === plan.name;
                    return (
                        <Card key={plan.name} className={cn("flex flex-col", plan.highlight && "border-primary ring-2 ring-primary shadow-lg shadow-primary/20", isCurrentPlan && "border-green-500 ring-2 ring-green-500")}>
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <PlanIcon className={cn("h-8 w-8", plan.color)} />
                                    <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold">{plan.price.split('/')[0]}</span>
                                    <span className="text-muted-foreground">/{plan.price.split('/')[1]}</span>
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
                            <CardFooter>
                                <Button className="w-full" variant={plan.highlight ? 'default' : 'outline'} onClick={() => handleMembershipPurchase(plan.name)} disabled={isCurrentPlan}>
                                    {isCurrentPlan ? "Current Plan" : "Subscribe"}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>

        <TabsContent value="addons" className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline text-center mb-4 flex items-center justify-center gap-2 text-red-400"><Flame className="animate-pulse" />Limited Time Offers</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {limitedTimeOffers.map(item => (
                        <div key={item.name} className="relative">
                            <ItemCard item={item} onPurchase={() => handlePurchase(item)} isOwned={inventory.includes(item.name)} />
                            <Badge className="absolute -top-2 -right-2 flex items-center gap-1 bg-destructive text-destructive-foreground"><Clock className="h-3 w-3" />{item.endsIn}</Badge>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="border-t pt-8">
                 <h2 className="text-2xl font-bold font-headline text-center mb-4">Permanent Collection</h2>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {addOns.map((item, i) => (
                        <ItemCard key={item.name} item={item} onPurchase={() => handlePurchase(item)} isOwned={inventory.includes(item.name)} />
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
                            <Button className="w-full" onClick={() => handleCurrencyPurchase(pack.amount, pack.currency as 'coins' | 'gems', pack.name)}>
                               {pack.price}
                            </Button>
                        </CardFooter>
                     </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
