
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gem, Shield, Star, Zap, Paintbrush, FileText, ShoppingCart, Crown, Sparkles, Wand2, Percent, Check, Users, Trophy } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';

const memberships = [
    {
        name: 'Premium',
        price: '₹149/mo',
        icon: Star,
        color: 'text-cyan-400',
        features: [
            'Empire Guild (500 members)',
            'Exclusive Profile Badge',
            'Ad-Free Experience',
            '5% Shop Discount',
            'Monthly 1,000 Coins',
        ],
        highlight: false,
    },
    {
        name: 'Premium+',
        price: '₹299/mo',
        icon: Sparkles,
        color: 'text-fuchsia-400',
        features: [
            'All Premium Benefits',
            'Golden Username Effect',
            'Exclusive Animated Avatar Frame',
            '10% Shop Discount',
            'Monthly 2,500 Coins',
        ],
        highlight: true,
    },
    {
        name: 'Elite',
        price: '₹499/mo',
        icon: Crown,
        color: 'text-yellow-400',
        features: [
            'All Premium+ Benefits',
            'Exclusive Profile Theme',
            'Beta Access to New Features',
            '15% Shop Discount',
            'Monthly 6,000 Coins',
        ],
        highlight: false,
    },
    {
        name: 'Super',
        price: '₹799/mo',
        icon: Wand2,
        color: 'text-purple-400',
        features: [
            'All Elite Benefits',
            'Unique "Super" Title & Badge',
            'Direct line to support',
            '20% Shop Discount',
            'Monthly 15,000 Coins',
        ],
        highlight: false,
    },
];

const addOns = [
  { name: 'Cosmic Avatar Frame', price: 500, currency: 'coins', type: 'Frame', icon: Star, image: 'https://placehold.co/400x400.png', dataAiHint: 'avatar frame' },
  { name: 'Neon Glow Profile FX', price: 750, currency: 'coins', type: 'Animation', icon: Zap, image: 'https://placehold.co/400x400.png', dataAiHint: 'neon animation' },
  { name: 'Dark Matter Profile Theme', price: 150, currency: 'gems', type: 'Theme', icon: Paintbrush, image: 'https://placehold.co/400x400.png', dataAiHint: 'dark theme' },
  { name: 'Holographic Card Back', price: 600, currency: 'coins', type: 'Cosmetic', icon: Sparkles, image: 'https://placehold.co/400x400.png', dataAiHint: 'holographic texture' },
  { name: 'The Newbie Title', price: 100, currency: 'coins', type: 'Title', icon: Shield, image: 'https://placehold.co/400x400.png', dataAiHint: 'title banner' },
  { name: 'The Apprentice Title', price: 500, currency: 'coins', type: 'Title', icon: Shield, image: 'https://placehold.co/400x400.png', dataAiHint: 'title banner' },
  { name: 'The Legend Title', price: 200, currency: 'gems', type: 'Title', icon: Trophy, image: 'https://placehold.co/400x400.png', dataAiHint: 'trophy banner' },
  { name: 'God-Tier Title', price: 500, currency: 'gems', type: 'Title', icon: Crown, image: 'https://placehold.co/400x400.png', dataAiHint: 'crown banner' },
];

const powerUps = [
  { name: 'XP Booster (x2)', description: 'Double your XP gain for 3 battles.', price: 20, currency: 'gems', icon: Percent },
  { name: 'Retry Token', description: 'Get a second chance on a lost battle.', price: 30, currency: 'gems', icon: Shield },
  { name: 'AI Resume Builder Template', description: 'A template optimized for AI/ML roles.', price: 40, currency: 'gems', icon: FileText },
  { name: 'Startup Pitch Deck', description: 'A professional deck to pitch your next big idea.', price: 60, currency: 'gems', icon: FileText },
];

const guildTiers = [
    {
      name: 'Starter',
      price: 50,
      currency: 'gems',
      members: 100,
      features: ['Basic Guild Management', 'Public/Private Listing', 'Team Battles'],
      highlight: false,
    },
    {
      name: 'Growing',
      price: 70,
      currency: 'gems',
      members: 200,
      features: ['All Starter Features', 'Custom Guild Banner', 'Priority Support'],
      highlight: false,
    },
    {
      name: 'Established',
      price: 100,
      currency: 'gems',
      members: 300,
      features: ['All Growing Features', 'Advanced Moderation Tools', 'Guild Analytics'],
      highlight: true,
    },
    {
      name: 'Empire',
      price: 150,
      currency: 'gems',
      members: 500,
      features: ['All Established Features', 'Exclusive Guild Events', 'Dedicated Discord Role'],
      highlight: false,
    },
];

const CurrencyDisplay = ({ amount, type }: { amount: number, type: 'coins' | 'gems' }) => (
    <div className="flex items-center gap-2 text-lg font-semibold bg-muted/50 p-2 px-4 rounded-md">
        {type === 'coins' ? <span className="text-yellow-400">🟡</span> : <Gem className="text-primary"/>}
        <span>{amount.toLocaleString()}</span>
    </div>
)

export default function ShopPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'memberships';
  const { toast } = useToast();

  const [coins, setCoins] = useState(0);
  const [gems, setGems] = useState(0);
  const [inventory, setInventory] = useState<string[]>([]);

  useEffect(() => {
    setCoins(parseInt(localStorage.getItem('careerClashCoins') || '1250', 10));
    setGems(parseInt(localStorage.getItem('careerClashGems') || '100', 10));
    setInventory(JSON.parse(localStorage.getItem('careerClashInventory') || '[]'));
  }, []);

  const handlePurchase = (cost: number, currency: 'coins' | 'gems', itemName: string) => {
    if (inventory.includes(itemName)) {
        toast({ variant: 'destructive', title: 'Already Owned', description: `You already own ${itemName}.` });
        return;
    }

    if (currency === 'coins') {
        if (coins < cost) {
            toast({ variant: 'destructive', title: 'Insufficient Coins', description: 'You do not have enough coins to purchase this item.' });
            return;
        }
        const newBalance = coins - cost;
        setCoins(newBalance);
        localStorage.setItem('careerClashCoins', newBalance.toString());
    } else {
        if (gems < cost) {
            toast({ variant: 'destructive', title: 'Insufficient Gems', description: 'You do not have enough gems to purchase this item.' });
            return;
        }
        const newBalance = gems - cost;
        setGems(newBalance);
        localStorage.setItem('careerClashGems', newBalance.toString());
    }
    
    const newInventory = [...inventory, itemName];
    setInventory(newInventory);
    localStorage.setItem('careerClashInventory', JSON.stringify(newInventory));

    toast({ title: 'Purchase Successful!', description: `You have successfully purchased ${itemName}.` });
  };

  const handleMembershipPurchase = (planName: string) => {
    localStorage.setItem('careerClashMembership', planName);
    toast({ title: 'Subscription Activated!', description: `You are now subscribed to the ${planName} plan.` });
  };

  const handleBuyCurrencies = () => {
    toast({ title: 'Coming Soon!', description: 'The currency store is not yet available.' });
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Item Shop</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
            Purchase cosmetics, power-ups, memberships, and career-boosting tools.
            </p>
        </div>
        <div className="flex items-center gap-4">
            <CurrencyDisplay amount={coins} type="coins" />
            <CurrencyDisplay amount={gems} type="gems" />
            <Button onClick={handleBuyCurrencies}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy Currencies
            </Button>
        </div>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
          <TabsTrigger value="power-ups">Power-Ups</TabsTrigger>
          <TabsTrigger value="guilds">Guilds</TabsTrigger>
        </TabsList>
        
        <TabsContent value="memberships">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {memberships.map((plan) => {
                    const PlanIcon = plan.icon;
                    return (
                        <Card key={plan.name} className={cn("flex flex-col", plan.highlight && "border-primary ring-2 ring-primary shadow-lg shadow-primary/20")}>
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
                                <Button className="w-full" variant={plan.highlight ? 'default' : 'outline'} onClick={() => handleMembershipPurchase(plan.name)}>
                                    Subscribe
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>

        <TabsContent value="addons">
           <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                    Note: This is just a sample of our 1000+ items! The shop rotates daily with new and exciting add-ons.
                </p>
            </div>
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {addOns.map((item) => {
                    const ItemIcon = item.icon;
                    const isOwned = inventory.includes(item.name);
                    return (
                        <Card key={item.name} className="flex flex-col hover:shadow-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                             <CardHeader className="p-0 relative">
                               <Image src={item.image} alt={item.name} width={400} height={400} className="w-full h-48 object-cover" data-ai-hint={item.dataAiHint}/>
                               <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-md"><ItemIcon className="h-5 w-5 text-accent"/></div>
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <CardTitle className="font-headline text-lg mb-2">{item.name}</CardTitle>
                                <CardDescription>{item.type}</CardDescription>
                            </CardContent>
                            <CardFooter className="bg-card-foreground/5 p-4">
                               <Button className="w-full" onClick={() => handlePurchase(item.price, item.currency as 'coins' | 'gems', item.name)} disabled={isOwned}>
                                   {isOwned ? (
                                       <>
                                        <Check className="mr-2" /> Owned
                                       </>
                                   ) : (
                                       <>
                                        {item.currency === 'coins' ? <span className="text-yellow-400 mr-2">🟡</span> : <Gem className="text-primary mr-2"/>}
                                        {item.price.toLocaleString()}
                                       </>
                                   )}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
           </div>
        </TabsContent>
        <TabsContent value="power-ups">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {powerUps.map((item) => {
                    const ItemIcon = item.icon;
                    const isOwned = inventory.includes(item.name);
                    return (
                        <Card key={item.name} className="flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <ItemIcon className="h-8 w-8 text-primary"/>
                                    <CardTitle className="font-headline text-lg">{item.name}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                            <CardFooter className="bg-card-foreground/5 p-4">
                                <Button className="w-full" onClick={() => handlePurchase(item.price, item.currency as 'coins' | 'gems', item.name)}>
                                    {item.currency === 'coins' ? <span className="text-yellow-400 mr-2">🟡</span> : <Gem className="text-primary mr-2"/>}
                                    {item.price.toLocaleString()}
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>
        <TabsContent value="guilds">
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {guildTiers.map((tier) => (
                    <Card key={tier.name} className={cn("flex flex-col", tier.highlight && "border-primary ring-2 ring-primary shadow-lg shadow-primary/20")}>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">{tier.name}</CardTitle>
                             <div className="flex items-center gap-2">
                                <Gem className="h-6 w-6 text-primary"/>
                                <span className="text-4xl font-bold">{tier.price}</span>
                             </div>
                            <CardDescription className="flex items-center gap-2 pt-2">
                                <Users className="h-4 w-4" />
                                Up to {tier.members} members
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2">
                            {tier.features.map(feature => (
                                <div key={feature} className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    <p className="text-muted-foreground text-sm">{feature}</p>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant={tier.highlight ? 'default' : 'outline'} onClick={() => handlePurchase(tier.price, tier.currency as 'gems', `${tier.name} Guild Plan`)}>
                                Choose {tier.name}
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
