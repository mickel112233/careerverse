
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Gem, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CurrencyDisplay = ({ amount, type }: { amount: number, type: 'coins' | 'gems' }) => (
    <div className="flex items-center gap-1 font-semibold bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border/50">
        {type === 'coins' ? <span className="text-yellow-400 text-lg">🟡</span> : <Gem className="h-4 w-4 text-primary"/>}
        <span className="text-foreground">{amount.toLocaleString()}</span>
    </div>
);

export default function CurrencyHeader() {
    const [coins, setCoins] = useState(0);
    const [gems, setGems] = useState(0);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const updateCurrencies = () => {
            setCoins(parseInt(localStorage.getItem('careerClashCoins') || '1250', 10));
            setGems(parseInt(localStorage.getItem('careerClashGems') || '100', 10));
        };
        
        updateCurrencies();

        // Listen for storage changes to update UI across tabs
        window.addEventListener('storage', updateCurrencies);
        // Also listen for a custom event for same-tab updates
        window.addEventListener('currencyChange', updateCurrencies);

        return () => {
            window.removeEventListener('storage', updateCurrencies);
            window.removeEventListener('currencyChange', updateCurrencies);
        };
    }, []);

    const handleGoToShop = () => {
        router.push('/shop');
    }

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <CurrencyDisplay amount={coins} type="coins" />
            <CurrencyDisplay amount={gems} type="gems" />
            <Button size="icon" variant="outline" onClick={handleGoToShop} className="h-10 w-10">
                <ShoppingCart className="h-5 w-5" />
                 <span className="sr-only">Go to Shop</span>
            </Button>
        </div>
    );
}
