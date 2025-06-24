
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gem, Shield, Star, Zap, Paintbrush, FileText, ShoppingCart, Crown, Sparkles, Wand2, Percent, Check, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';
import { AiImage } from '@/components/ui/ai-image';
import { motion } from 'framer-motion';

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
  { name: 'Cosmic Avatar Frame', price: 500, currency: 'coins', type: 'Frame', icon: Star, imageHint: 'cosmic avatar frame' },
  { name: 'Neon Glow Profile FX', price: 750, currency: 'coins', type: 'Animation', icon: Zap, imageHint: 'neon profile animation' },
  { name: 'Dark Matter Profile Theme', price: 150, currency: 'gems', type: 'Theme', icon: Paintbrush, imageHint: 'dark matter space theme' },
  { name: 'Holographic Card Back', price: 600, currency: 'coins', type: 'Cosmetic', icon: Sparkles, imageHint: 'holographic card texture' },
  { name: 'The Newbie Title', price: 100, currency: 'coins', type: 'Title', icon: Shield, imageHint: 'simple title banner' },
  { name: 'The Apprentice Title', price: 500, currency: 'coins', type: 'Title', icon: Shield, imageHint: 'ornate title banner' },
  { name: 'The Legend Title', price: 200, currency: 'gems', type: 'Title', icon: Trophy, imageHint: 'legendary trophy banner' },
  { name: 'God-Tier Title', price: 500, currency: 'gems', type: 'Title', icon: Crown, imageHint: 'golden crown banner' },
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

const currencyPacks = [
    { name: 'Pocket of Coins', amount: 5000, price: '₹89', currency: 'coins' },
    { name: 'Bag of Coins', amount: 12000, price: '₹179', currency: 'coins' },
    { name: 'Fistful of Gems', amount: 500, price: '₹449', currency: 'gems' },
    { name: 'Treasure of Gems', amount: 1500, price: '₹1,299', currency: 'gems' },
]


export default function ShopPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'memberships';
  const { toast } = useToast();

  const [inventory, setInventory] = useState<string[]>([]);

  useEffect(() => {
    const storedInventory = JSON.parse(localStorage.getItem('careerClashInventory') || '[]');
    setInventory(storedInventory);
  }, []);

  const handlePurchase = (cost: number, currency: 'coins' | 'gems', itemName: string) => {
    if (inventory.includes(itemName)) {
        toast({ variant: 'destructive', title: 'Already Owned', description: `You already own ${itemName}.` });
        return;
    }

    const currentCoins = parseInt(localStorage.getItem('careerClashCoins') || '0', 10);
    const currentGems = parseInt(localStorage.getItem('careerClashGems') || '0', 10);

    if (currency === 'coins') {
        if (currentCoins < cost) {
            toast({ variant: 'destructive', title: 'Insufficient Coins', description: 'You do not have enough coins to purchase this item.' });
            return;
        }
        localStorage.setItem('careerClashCoins', (currentCoins - cost).toString());
    } else {
        if (currentGems < cost) {
            toast({ variant: 'destructive', title: 'Insufficient Gems', description: 'You do not have enough gems to purchase this item.' });
            return;
        }
        localStorage.setItem('careerClashGems', (currentGems - cost).toString());
    }
    
    const newInventory = [...inventory, itemName];
    setInventory(newInventory);
    localStorage.setItem('careerClashInventory', JSON.stringify(newInventory));

    window.dispatchEvent(new Event('currencyChange'));

    toast({ title: 'Purchase Successful!', description: `You have successfully purchased ${itemName}.`, className: "bg-green-500 text-white" });
  };

  const handleMembershipPurchase = (planName: string) => {
    localStorage.setItem('careerClashMembership', planName);
    window.dispatchEvent(new Event('currencyChange'));
    toast({ title: 'Subscription Activated!', description: `You are now subscribed to the ${planName} plan.`, className: "bg-green-500 text-white" });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Item Shop</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
            Purchase cosmetics, power-ups, memberships, and career-boosting tools.
            </p>
        </div>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="addons">Add-ons</TabsTrigger>
          <TabsTrigger value="power-ups">Power-Ups</TabsTrigger>
          <TabsTrigger value="guilds">Guilds</TabsTrigger>
          <TabsTrigger value="currencies">Currencies</TabsTrigger>
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
                {addOns.map((item, i) => {
                    const ItemIcon = item.icon;
                    const isOwned = inventory.includes(item.name);
                    return (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                            <Card className="flex flex-col h-full hover:shadow-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                                <CardHeader className="p-0 relative">
                                <AiImage prompt={item.imageHint} alt={item.name} width={400} height={400} className="w-full h-48 object-cover" />
                                <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-md"><ItemIcon className="h-5 w-5 text-accent"/></div>
                                </CardHeader>
                                <CardContent className="p-4 flex-grow">
                                    <CardTitle className="font-headline text-lg mb-2">{item.name}</CardTitle>
                                    <CardDescription>{item.type}</CardDescription>
                                </CardContent>
                                <CardFooter className="bg-card-foreground/5 p-4 mt-auto">
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
                        </motion.div>
                    )
                })}
           </div>
        </TabsContent>
        <TabsContent value="power-ups">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {powerUps.map((item) => {
                    const ItemIcon = item.icon;
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
                            <CardFooter className="bg-card-foreground/5 p-4 mt-auto">
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
                        <CardFooter className="mt-auto">
                            <Button className="w-full" variant={tier.highlight ? 'default' : 'outline'} onClick={() => handlePurchase(tier.price, tier.currency as 'gems', `${tier.name} Guild Plan`)}>
                                Choose {tier.name}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="currencies">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-headline font-bold">Refill Your Wallet</h2>
                <p className="text-muted-foreground">Purchase Coins and Gems to spend in the shop.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {currencyPacks.map((pack) => (
                     <Card key={pack.name}>
                        <CardHeader className="items-center text-center">
                            {pack.currency === 'coins' ? <span className="text-yellow-400 text-5xl">🟡</span> : <Gem className="h-12 w-12 text-primary"/>}
                            <CardTitle className="font-headline text-xl">{pack.name}</CardTitle>
                            <CardDescription>{pack.amount.toLocaleString()} {pack.currency}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button className="w-full" disabled>
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
