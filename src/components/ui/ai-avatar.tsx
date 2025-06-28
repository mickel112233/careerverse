'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAiImage } from '@/hooks/use-ai-image';

interface AiAvatarProps {
    prompt: string;
    alt: string;
    fallback: string;
    className?: string;
}

export function AiAvatar({ prompt, alt, fallback, className }: AiAvatarProps) {
    const { imageUrl, isLoading } = useAiImage(prompt);
    
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
