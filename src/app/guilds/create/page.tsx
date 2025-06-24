import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const guildTiers = [
  {
    name: 'Starter',
    price: '₹49',
    members: 100,
    features: ['Basic Guild Management', 'Public/Private Listing', 'Team Battles'],
    highlight: false,
  },
  {
    name: 'Growing',
    price: '₹69',
    members: 200,
    features: ['All Starter Features', 'Custom Guild Banner', 'Priority Support'],
    highlight: false,
  },
  {
    name: 'Established',
    price: '₹99',
    members: 300,
    features: ['All Growing Features', 'Advanced Moderation Tools', 'Guild Analytics'],
    highlight: true,
  },
  {
    name: 'Empire',
    price: '₹149',
    members: 500,
    features: ['All Established Features', 'Exclusive Guild Events', 'Dedicated Discord Role'],
    highlight: false,
  },
];

export default function CreateGuildPage() {
  return (
    <div className="container mx-auto max-w-5xl p-4 sm:p-6 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Create Your Guild</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          Build your community. Choose a plan that fits your guild's ambitions and start recruiting today.
        </p>
      </div>

      <Card className="mb-8 bg-primary/10 border-primary/20">
        <CardHeader className="flex-row items-center gap-4">
            <Crown className="h-10 w-10 text-yellow-400" />
            <div>
                <CardTitle>Premium Subscriber Perk</CardTitle>
                <CardDescription>
                    Premium subscribers automatically get the <strong className="text-primary">Empire</strong> tier (500 members) included with their membership!
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/shop">Explore Memberships</Link>
            </Button>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {guildTiers.map((tier) => (
            <Card key={tier.name} className={cn("flex flex-col", tier.highlight && "border-primary ring-2 ring-primary shadow-lg shadow-primary/20")}>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{tier.price}</span>
                        <span className="text-muted-foreground">/month</span>
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
                    <Button className="w-full" variant={tier.highlight ? 'default' : 'outline'}>
                        Choose {tier.name}
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
