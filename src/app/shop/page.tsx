import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gem, Shield, Star, Zap, Paintbrush, FileText, ShoppingCart, Crown, Sparkles, Wand2, Percent } from "lucide-react";
import Image from "next/image";

const memberships = [
    {
        name: 'Premium',
        price: '₹99/mo',
        icon: Star,
        color: 'text-cyan-400',
        features: [
            'Empire Guild (500 members)',
            'Exclusive Profile Badge',
            'Ad-Free Experience',
            '5% Shop Discount',
            'Monthly 500 Coins',
        ],
        highlight: false,
    },
    {
        name: 'Premium+',
        price: '₹199/mo',
        icon: Sparkles,
        color: 'text-fuchsia-400',
        features: [
            'All Premium Benefits',
            'Golden Username Effect',
            'Exclusive Animated Avatar Frame',
            '10% Shop Discount',
            'Monthly 1,200 Coins',
        ],
        highlight: true,
    },
    {
        name: 'Elite',
        price: '₹349/mo',
        icon: Crown,
        color: 'text-yellow-400',
        features: [
            'All Premium+ Benefits',
            'Exclusive Profile Theme',
            'Beta Access to New Features',
            '15% Shop Discount',
            'Monthly 2,500 Coins',
        ],
        highlight: false,
    },
    {
        name: 'Super',
        price: '₹499/mo',
        icon: Wand2,
        color: 'text-purple-400',
        features: [
            'All Elite Benefits',
            'Unique "Super" Title & Badge',
            'Direct line to support',
            '20% Shop Discount',
            'Monthly 5,000 Coins',
        ],
        highlight: false,
    },
];

const cosmetics = [
  { name: 'Cosmic Avatar Frame', price: 500, type: 'Frame', icon: Star, image: 'https://placehold.co/400x400.png', dataAiHint: 'avatar frame' },
  { name: 'Neon Glow Profile FX', price: 750, type: 'Animation', icon: Zap, image: 'https://placehold.co/400x400.png', dataAiHint: 'neon animation' },
  { name: 'Legendary "The Visionary" Title', price: 1000, type: 'Title', icon: Shield, image: 'https://placehold.co/400x400.png', dataAiHint: 'title banner' },
  { name: 'Dark Matter Profile Theme', price: 1500, type: 'Theme', icon: Paintbrush, image: 'https://placehold.co/400x400.png', dataAiHint: 'dark theme' },
  { name: 'Holographic Card Back', price: 600, type: 'Cosmetic', icon: Sparkles, image: 'https://placehold.co/400x400.png', dataAiHint: 'holographic texture' },
  { name: '8-Bit Victory Animation', price: 800, type: 'Animation', icon: Wand2, image: 'https://placehold.co/400x400.png', dataAiHint: 'pixel art explosion' },
];

const powerUps = [
  { name: 'XP Booster (x2)', description: 'Double your XP gain for 3 battles.', price: 200, icon: Percent },
  { name: 'Retry Token', description: 'Get a second chance on a lost battle.', price: 300, icon: Shield },
];

const careerPacks = [
    { name: 'AI Resume Builder Template', description: 'A template optimized for AI/ML roles.', price: 400, icon: FileText },
    { name: 'Startup Pitch Deck', description: 'A professional deck to pitch your next big idea.', price: 600, icon: FileText },
]

export default function ShopPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Item Shop</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Purchase cosmetics, power-ups, memberships, and career-boosting tools.
        </p>
      </div>

        <div className="flex justify-end gap-4 mb-8">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <span className="text-yellow-400">🟡</span>
                <span>1,250 Coins</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
                <Gem className="text-primary"/>
                <span>100 ClashGems</span>
            </div>
            <Button>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy Gems & Coins
            </Button>
        </div>

      <Tabs defaultValue="memberships" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="cosmetics">Cosmetics</TabsTrigger>
          <TabsTrigger value="power-ups">Power-Ups</TabsTrigger>
          <TabsTrigger value="career">Career Packs</TabsTrigger>
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
                                <Button className="w-full" variant={plan.highlight ? 'default' : 'outline'}>
                                    Subscribe
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>

        <TabsContent value="cosmetics">
           <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                    Note: This is just a sample of our 1000+ items! The shop rotates daily with new and exciting cosmetics.
                </p>
            </div>
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cosmetics.map((item) => {
                    const ItemIcon = item.icon;
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
                               <Button className="w-full">
                                   <span className="text-yellow-400 mr-2">🟡</span>
                                   {item.price.toLocaleString()} Coins
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
                                <Button className="w-full">
                                    <span className="text-yellow-400 mr-2">🟡</span>
                                    {item.price.toLocaleString()} Coins
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>
        <TabsContent value="career">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {careerPacks.map((item) => {
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
                            <CardFooter className="bg-card-foreground/5 p-4">
                                <Button className="w-full">
                                   <span className="text-yellow-400 mr-2">🟡</span>
                                   {item.price.toLocaleString()} Coins
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
