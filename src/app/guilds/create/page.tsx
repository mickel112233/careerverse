
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CreateGuildPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Create Your Guild</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          Build your community. Choose a plan that fits your guild's ambitions and start recruiting today.
        </p>
      </div>

      <Card className="mb-8 bg-primary/10 border-primary/20 text-center">
        <CardHeader>
            <Crown className="h-12 w-12 text-yellow-400 mx-auto" />
            <CardTitle>Premium Subscriber Perk</CardTitle>
            <CardDescription>
                Premium subscribers automatically get the <strong className="text-primary">Empire</strong> tier (500 members) included with their membership! No separate guild plan needed.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/shop">Explore Memberships</Link>
            </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Standard Guild Plans</CardTitle>
            <CardDescription>Not a premium subscriber? No problem. You can purchase a guild plan from our shop.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Choose from a variety of tiers to match the size of your community. You can start small and upgrade anytime from the Item Shop.</p>
        </CardContent>
        <CardFooter>
            <Button asChild className="w-full">
                <Link href="/shop?tab=guilds">
                    View Guild Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
