'use client';

import Image, { ImageProps } from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAiImage } from '@/hooks/use-ai-image';

interface AiImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    prompt: string;
    alt: string;
}

export function AiImage({ prompt, alt, width, height, className, ...props }: AiImageProps) {
    const { imageUrl, isLoading } = useAiImage(prompt);

    if (isLoading) {
        if (props.layout === 'fill') {
            return <Skeleton className={cn('w-full h-full', className)} />;
        }
        const w = Number(width);
        const h = Number(height);
        if (!isNaN(w) && !isNaN(h)) {
            return <Skeleton className={cn(className)} style={{ width: w, height: h }} />;
        }
        return <Skeleton className={cn('w-full h-48', className)} />;
    }

    if (!imageUrl) {
        const w = Number(width) || 400;
        const h = Number(height) || 200;
        return (
            <Image
                src={`https://placehold.co/${w}x${h}.png`}
                alt={`Placeholder for: ${alt}`}
                width={width}
                height={height}
                className={cn(className)}
                data-ai-hint={prompt.split(' ').slice(0, 2).join(' ')}
                {...props}
            />
        );
    }

    return (
        <Image
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            className={cn(className)}
            unoptimized={imageUrl.startsWith('data:image')}
            {...props}
        />
    );
}
