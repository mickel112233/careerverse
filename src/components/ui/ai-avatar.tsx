'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface AiAvatarProps {
    prompt: string;
    alt: string;
    fallback: string;
    className?: string;
}

export function AiAvatar({ prompt, alt, fallback, className }: AiAvatarProps) {
    const placeholderUrl = `https://placehold.co/100x100.png`;

    return (
        <Avatar className={className}>
            <AvatarImage
                src={placeholderUrl}
                alt={alt}
                data-ai-hint={prompt.split(' ').slice(0, 2).join(' ')}
            />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}
