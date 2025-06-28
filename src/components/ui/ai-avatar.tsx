
'use client';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateImage } from '@/ai/flows/image-generator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AiAvatarProps {
    prompt: string;
    alt: string;
    fallback: string;
    className?: string;
}

export function AiAvatar({ prompt, alt, fallback, className }: AiAvatarProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const cacheKey = `ai-image-cache:${prompt}`;

        const fetchImage = async () => {
            setIsLoading(true);
            try {
                const cachedUrl = localStorage.getItem(cacheKey);
                if (cachedUrl) {
                    if (!isCancelled) {
                        setImageUrl(cachedUrl);
                    }
                } else {
                    const generatedUrl = await generateImage(prompt);
                    if (!isCancelled) {
                        try {
                            localStorage.setItem(cacheKey, generatedUrl);
                        } catch (e) {
                            console.warn(`Failed to cache image for prompt "${prompt}". Storage may be full.`, e);
                        }
                        setImageUrl(generatedUrl);
                    }
                }
            } catch (error) {
                console.error(`Failed to generate AI image for prompt "${prompt}":`, error);
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        };

        if (prompt) {
            fetchImage();
        } else {
            setIsLoading(false);
        }

        return () => { isCancelled = true; };
    }, [prompt]);
    
    if (isLoading) {
        return <Skeleton className={cn("rounded-full", className)} />;
    }

    return (
        <Avatar className={className}>
            {imageUrl && <AvatarImage src={imageUrl} alt={alt} />}
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}
