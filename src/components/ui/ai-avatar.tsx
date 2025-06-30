'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface AiAvatarProps {
    prompt: string;
    alt: string;
    fallback: string;
    className?: string;
}

const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-');

export function AiAvatar({ prompt, alt, fallback, className }: AiAvatarProps) {
    const imageUrl = prompt ? `/image/${slugify(prompt)}.png` : undefined;

    return (
        <Avatar className={cn(className)}>
            <AvatarImage
                src={imageUrl}
                alt={alt}
            />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
}
