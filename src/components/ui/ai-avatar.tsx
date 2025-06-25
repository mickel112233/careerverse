'use client';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateImage } from '@/ai/flows/image-generator';
import { cn } from '@/lib/utils';

interface AiAvatarProps {
    prompt: string;
    alt: string;
    fallback: string;
    className?: string;
}

export function AiAvatar({ prompt, alt, fallback, className }: AiAvatarProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;
        if (prompt) {
            generateImage(prompt)
                .then(url => {
                    if (!isCancelled) setImageUrl(url);
                })
                .catch(err => {
                    console.error(`Failed to generate avatar for prompt "${prompt}":`, err);
                });
        }
        return () => { isCancelled = true; };
    }, [prompt]);

    return (
        <Avatar className={className}>
            {imageUrl && <AvatarImage src={imageUrl} alt={alt} />}
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    )
}
