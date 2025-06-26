
'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { generateImage } from '@/ai/flows/image-generator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AiImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    prompt: string;
    alt: string;
}

export function AiImage({ prompt, alt, width, height, className, ...props }: AiImageProps) {
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
                    if (!isCancelled) setImageUrl(cachedUrl);
                    return;
                }
                const generatedUrl = await generateImage(prompt);
                if (!isCancelled) {
                    localStorage.setItem(cacheKey, generatedUrl);
                    setImageUrl(generatedUrl);
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

    if (isLoading || !imageUrl) {
        if (props.layout === 'fill') {
            return <Skeleton className={cn('w-full h-full', className)} />;
        }
        const w = Number(width);
        const h = Number(height);
        if (!isNaN(w) && !isNaN(h)) {
            return <Skeleton className={cn(className)} style={{ width: w, height: h }} />;
        }
        // Fallback skeleton if width/height are not available
        return <Skeleton className={cn('w-full h-48', className)} />;
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
