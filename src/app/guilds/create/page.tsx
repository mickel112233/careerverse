
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Crown, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';


const formSchema = z.object({
  guildName: z.string().min(3, "Guild name must be at least 3 characters.").max(30, "Guild name cannot exceed 30 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description cannot exceed 200 characters."),
});

export default function CreateGuildPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guildName: "",
      description: "",
    },
  });

  useEffect(() => {
    const membership = localStorage.getItem('careerClashMembership');
    if (membership && membership !== 'Free') {
        setIsPremium(true);
    }
    setIsLoading(false);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Guild Created!",
      description: `Your guild "${values.guildName}" has been successfully founded.`,
      className: "bg-green-500 text-white border-green-600",
    });
    // In a real app, you'd save this to a database
    localStorage.setItem('userGuild', JSON.stringify(values));
    router.push('/guilds');
  }

  if (isLoading) {
    return (
        <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8 space-y-8">
            <Skeleton className="h-12 w-1/2 mx-auto" />
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-10 w-10 mx-auto rounded-full" />
                    <Skeleton className="h-8 w-1/3 mx-auto mt-2" />
                    <Skeleton className="h-6 w-2/3 mx-auto mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-10 w-40 mx-auto" />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-6 w-3/4 mt-2" />
                </CardHeader>
                <CardContent>
                     <Skeleton className="h-12 w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
    );
  }
  
  if (!isPremium) {
    return (
        <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Create Your Guild</h1>
                <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
                Build your community. Choose a plan that fits your guild's ambitions and start recruiting today.
                </p>
            </div>

            <Card className="mb-8 text-center bg-muted/30">
                <CardHeader>
                    <Crown className="h-12 w-12 text-yellow-400 mx-auto" />
                    <CardTitle>Premium Subscriber Perk</CardTitle>
                    <CardDescription>
                        Premium subscribers automatically get the Empire tier (500 members) included with their membership!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/shop">
                            Explore Memberships
                        </Link>
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

  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Found Your Guild</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          Congratulations, Commander! As a premium member, you can establish your own guild right now.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guild Details</CardTitle>
          <CardDescription>Define your guild's identity. This information will be visible to all players.</CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <FormField
                        control={form.control}
                        name="guildName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Guild Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., The Code Crusaders" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Guild Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A short, epic description of what your guild is all about." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Found Guild
                    </Button>
                </CardFooter>
            </form>
        </Form>
      </Card>
    </div>
  );
}
