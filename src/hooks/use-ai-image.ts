'use client';

import { useState, useEffect } from 'react';
import { generateImage } from '@/ai/flows/image-generator';

// In-memory cache to prevent multiple requests for the same image in a single session.
const imageCache = new Map<string, string>();

export function useAiImage(prompt: string) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const cacheKey = `ai-image-cache:${prompt}`;

    useEffect(() => {
        let isCancelled = false;

        const fetchImage = async () => {
            if (!prompt) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            // 1. Check in-memory cache
            if (imageCache.has(prompt)) {
                if (!isCancelled) {
                    setImageUrl(imageCache.get(prompt)!);
                    setIsLoading(false);
                }
                return;
            }

            // 2. Check localStorage cache
            const cachedUrl = localStorage.getItem(cacheKey);
            if (cachedUrl) {
                if (!isCancelled) {
                    imageCache.set(prompt, cachedUrl); // Populate in-memory cache
                    setImageUrl(cachedUrl);
                    setIsLoading(false);
                }
                return;
            }

            // 3. Fetch from API
            try {
                const generatedUrl = await generateImage(prompt);
                if (!isCancelled) {
                    imageCache.set(prompt, generatedUrl);
                    try {
                        localStorage.setItem(cacheKey, generatedUrl);
                    } catch (e) {
                        console.warn(`Failed to cache image for prompt "${prompt}". Storage may be full.`, e);
                    }
                    setImageUrl(generatedUrl);
                }
            } catch (error) {
                console.error(`Failed to generate AI image for prompt "${prompt}":`, error);
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        };

        fetchImage();

        return () => { isCancelled = true; };
    }, [prompt, cacheKey]);

    return { imageUrl, isLoading };
}
