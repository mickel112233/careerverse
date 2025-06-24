'use client';

import Logo from '@/components/icons/logo';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onFinished }: { onFinished: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000); // Start fading out after 2 seconds

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 2500); // Finish after 2.5 seconds (0.5s fade-out)
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <Logo className="h-24 w-24 animate-pulse" />
      <h1 className="mt-4 text-4xl font-headline font-black tracking-tighter bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
        CAREER CLASH
      </h1>
    </div>
  );
}
