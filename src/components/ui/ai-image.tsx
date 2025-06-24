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
    
    const placeholderUrl = `https://placehold.co/${width}x${height}.png`;

    useEffect(() => {
        let isCancelled = false;

        const fetchImage = async () => {
            if (!prompt) {
                setImageUrl(placeholderUrl);
                return;
            }
            try {
                const generatedUrl = await generateImage(prompt);
                if (!isCancelled) {
                    setImageUrl(generatedUrl);
                }
            } catch (error) {
                console.error(`Failed to generate AI image for prompt "${prompt}":`, error);
                if (!isCancelled) {
                    setImageUrl(placeholderUrl);
                }
            }
        };

        fetchImage();

        return () => {
            isCancelled = true;
        };
    }, [prompt, width, height, placeholderUrl]);

    if (!imageUrl) {
        return <Skeleton className={cn(className)} style={{ width: Number(width), height: Number(height) }} />;
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
