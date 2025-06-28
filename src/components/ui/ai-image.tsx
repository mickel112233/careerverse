'use client';

import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface AiImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    prompt: string;
    alt: string;
}

export function AiImage({ prompt, alt, width, height, className, ...props }: AiImageProps) {
    // For layout="fill", width and height might not be provided. Use a default.
    const w = Number(width) || (props.layout === 'fill' ? 600 : 400);
    const h = Number(height) || (props.layout === 'fill' ? 400 : 200);
    const placeholderUrl = `https://placehold.co/${w}x${h}.png`;

    return (
        <Image
            src={placeholderUrl}
            alt={alt}
            width={width}
            height={height}
            className={cn(className)}
            data-ai-hint={prompt.split(' ').slice(0, 2).join(' ')}
            {...props}
        />
    );
}
