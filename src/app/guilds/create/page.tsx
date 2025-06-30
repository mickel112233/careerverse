
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Crown, ArrowRight, Loader2, Users, Lock, Globe, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';


const formSchema = z.object({
  guildName: z.string().min(3, "Guild name must be at least 3 characters.").max(30, "Guild name cannot exceed 30 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description cannot exceed 200 characters."),
  requirements: z.string().max(200, "Requirements cannot exceed 200 characters.").optional(),
  type: z.enum(["public", "private"], { required_error: "You must select a guild type." }),
  password: z.string().optional(),
}).refine(data => {
    if (data.type === 'private' && (!data.password || data.password.length < 4)) {
        return false;
    }
    return true;
}, {
    message: "Private guilds require a password of at least 4 characters.",
    path: ["password"],
});

const LoadingSkeleton = () => (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8 space-y-8">
        <div className="text-center space-y-2">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full max-w-lg mx-auto" />
        </div>
        <Card>
            <CardHeader className="items-center text-center">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-8 w-48 mt-2" />
                <Skeleton className="h-5 w-64 mt-2" />
            </CardHeader>
            <CardContent className="flex justify-center">
                <Skeleton className="h-10 w-44" />
            </CardContent>
        </Card>
    </div>
);


export default function CreateGuildPage() {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [memberCapacity, setMemberCapacity] = useState(50);
  const router = useRouter();
  const { toast } = useToast();

  const [crestImage, setCrestImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guildName: "",
      description: "",
      requirements: "",
      type: "public",
      password: "",
    },
  });

  const guildType = form.watch("type");

  useEffect(() => {
    const membership = localStorage.getItem('careerClashMembership') || 'Free';
    let capacity = 50;
    if (membership === 'Premium') capacity = 100;
    if (membership === 'Premium+') capacity = 200;
    if (membership === 'Elite' || membership === 'Super') capacity = 500;
    
    if (membership !== 'Free' && membership !== 'Basic') {
        setIsPremium(true);
    }
    setMemberCapacity(capacity);
    setIsLoading(false);
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'crest' | 'banner') => {
      const file = e.target.files?.[0];
      if (file) {
          if (file.size > 2 * 1024 * 1024) { // 2MB limit
              toast({ variant: 'destructive', title: 'File too large', description: 'Please upload an image smaller than 2MB.'});
              return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result as string;
              if (type === 'crest') {
                  setCrestImage(base64String);
              } else {
                  setBannerImage(base64String);
              }
          };
          reader.readAsDataURL(file);
      }
  };


  function onSubmit(values: z.infer<typeof formSchema>) {
    const guildId = `GUILD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const slug = values.guildName.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-');

    const newGuild = {
        ...values,
        id: guildId,
        name: values.guildName,
        slug: slug,
        capacity: memberCapacity,
        crestImage: crestImage || `https://placehold.co/256x256.png`,
        bannerImage: bannerImage || `https://placehold.co/1200x300.png`,
        image: crestImage || `https://placehold.co/600x400.png`,
        owner: 'QuantumLeap',
        members: [
            { 
                name: 'QuantumLeap', 
                role: 'Leader', 
                xp: parseInt(localStorage.getItem('careerClashTotalXp') || '0', 10),
                coins: parseInt(localStorage.getItem('careerClashCoins') || '100', 10),
                gems: parseInt(localStorage.getItem('careerClashGems') || '5', 10),
                prompt: 'cyberpunk woman portrait' 
            }
        ]
    };

    toast({
      title: "Guild Founded!",
      description: `Your guild "${values.guildName}" has been successfully established.`,
      className: "bg-green-500 text-white border-green-600",
    });
    
    localStorage.setItem('userGuild', JSON.stringify(newGuild));
    window.dispatchEvent(new Event('guildChange'));
    router.push('/guilds/my-guild');
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (!isPremium) {
    return (
        <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Create Your Guild</h1>
                <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
                Forge your legacy. A premium membership is required to lead a guild.
                </p>
            </div>

            <Card className="text-center bg-muted/30 border-primary/20">
                <CardHeader>
                    <Crown className="h-12 w-12 text-yellow-400 mx-auto" />
                    <CardTitle>A Premium Subscriber Perk</CardTitle>
                    <CardDescription>
                        Unlock the ability to create and manage your own guild with any premium membership plan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/shop?tab=memberships">
                            Explore Memberships <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
       <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Found Your Guild</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          Congratulations, Commander! As a premium member, you can establish your guild right now and lead your community to greatness.
        </p>
      </div>

      <Card>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Guild Foundation</CardTitle>
                  <CardDescription>Define your guild's identity. This information will be visible to all players.</CardDescription>
                </CardHeader>
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
                            <FormLabel>Public Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A short, epic description of what your guild is all about." {...field} />
                            </FormControl>
                             <FormDescription>This is your guild's public motto or summary.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="requirements"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recruitment Requirements</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g., Level 20+, active daily, must join Discord." {...field} />
                            </FormControl>
                            <FormDescription>Let potential recruits know what you're looking for.</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormItem>
                            <FormLabel>Guild Crest</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e, 'crest')} />
                            </FormControl>
                             <FormDescription>Square image (e.g., 256x256). Max 2MB.</FormDescription>
                             {crestImage && <Image src={crestImage} alt="Crest preview" width={128} height={128} className="rounded-lg mt-2 border" />}
                        </FormItem>
                        <FormItem>
                            <FormLabel>Guild Banner</FormLabel>
                            <FormControl>
                                 <Input type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e, 'banner')} />
                            </FormControl>
                            <FormDescription>Wide image (e.g., 1200x300). Max 2MB.</FormDescription>
                             {bannerImage && <Image src={bannerImage} alt="Banner preview" width={250} height={62.5} className="rounded-lg mt-2 border aspect-[4/1] object-cover" />}
                        </FormItem>
                    </div>

                     <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Guild Privacy</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="public" />
                                    </FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2"><Globe className="h-4 w-4"/> Public - Anyone can find and join.</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="private" />
                                    </FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2"><Lock className="h-4 w-4"/> Private - Only joinable via ID and password.</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    {guildType === 'private' && (
                         <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guild Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter a secret password" {...field} />
                                </FormControl>
                                <FormDescription>Only players with this password can join.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    )}

                    <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                        <p className="font-semibold">Member Capacity</p>
                        <div className="flex items-center gap-2 text-primary font-bold">
                            <Users className="h-5 w-5" />
                            <span>{memberCapacity} Members</span>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={form.formState.isSubmitting} size="lg">
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
