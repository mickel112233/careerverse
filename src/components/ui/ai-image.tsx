'use client';

import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface AiImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    prompt: string;
    alt: string;
}

const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, '-');

export function AiImage({ prompt, alt, width, height, className, ...props }: AiImageProps) {
    const w = Number(width) || (props.layout === 'fill' ? 600 : 400);
    const h = Number(height) || (props.layout === 'fill' ? 400 : 200);
    const fallbackUrl = `https://placehold.co/${w}x${h}.png`;

    const imageUrl = prompt ? `/image/${slugify(prompt)}.png` : fallbackUrl;

    return (
        <Image
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            className={cn(className)}
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackUrl; }}
            {...props}
        />
    );
}
