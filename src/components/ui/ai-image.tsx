'use client';

import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface AiImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    prompt: string;
    alt: string;
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

export function AiImage({ prompt, alt, width, height, className, ...props }: AiImageProps) {
    const w = Number(width) || (props.layout === 'fill' ? 600 : 400);
    const h = Number(height) || (props.layout === 'fill' ? 400 : 200);

    const colorSeed = useMemo(() => simpleHash(prompt) % 5, [prompt]);
    const colors = [
        '2d3436/636e72', // Dracula
        '00b894/55efc4', // Mint
        '0984e3/74b9ff', // Blue
        'd63031/ff7675', // Pink
        '6c5ce7/a29bfe', // Purple
    ];
    const placeholderUrl = `https://placehold.co/${w}x${h}/${colors[colorSeed]}.png`;

    return (
        <Image
            src={placeholderUrl}
            alt={alt}
            width={width}
            height={height}
            className={cn(className)}
            {...props}
        />
    );
}
