'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface AiAvatarProps {
    prompt: string;
    alt: string;
    fallback: string;
    className?: string;
}

// Simple hash function to get a number from a string
function simpleHash(str: string): number {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

export function AiAvatar({ prompt, alt, fallback, className }: AiAvatarProps) {
    // Use a hash of the prompt to select from a few color schemes for variety
    const colorSeed = useMemo(() => simpleHash(prompt) % 5, [prompt]);
    const colors = [
        '6441a5/2a0845', // Twitch purple
        '4caf50/8bc34a', // Green
        '2196f3/64b5f6', // Blue
        'ff9800/ffc107', // Orange
        'f44336/ef5350', // Red
    ];
    const placeholderUrl = `https://placehold.co/100x100/${colors[colorSeed]}.png`;
    
    const hint = prompt.split(' ').slice(0, 2).join(' ');

    return (
        <Avatar className={cn(className)}>
            <AvatarImage
                src={placeholderUrl}
                alt={alt}
                data-ai-hint={hint}
            />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}
