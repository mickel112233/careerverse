
import { Gem, Shield, Star, Zap, Paintbrush, Sparkles, Crown, Trophy, Users, Wand2 } from "lucide-react";

export type PurchasableItem = {
    name: string;
    price: number;
    currency: 'coins' | 'gems';
    icon: React.ElementType;
    description: string;
    rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
};

export type GuildPerk = PurchasableItem & {
    type: 'Guild Perk';
    value: number; // How many slots to add
};

export const guildPerks: GuildPerk[] = [
  { name: 'Guild Expansion I', price: 100, currency: 'gems', type: 'Guild Perk', icon: Users, description: 'Increase your guild\'s member capacity by 10 slots.', rarity: 'Common', value: 10 },
  { name: 'Guild Expansion II', price: 225, currency: 'gems', type: 'Guild Perk', icon: Users, description: 'Increase your guild\'s member capacity by 25 slots.', rarity: 'Common', value: 25 },
  { name: 'Guild Expansion III', price: 400, currency: 'gems', type: 'Guild Perk', icon: Users, description: 'Increase your guild\'s member capacity by 50 slots.', rarity: 'Rare', value: 50 },
  { name: 'Guild Expansion IV', price: 750, currency: 'gems', type: 'Guild Perk', icon: Users, description: 'Increase your guild\'s member capacity by 100 slots.', rarity: 'Epic', value: 100 },
];

export const memberships = [
    {
        name: 'Premium',
        monthlyPrice: '₹200/mo',
        yearlyPrice: '₹2000/yr',
        icon: Star,
        color: 'text-cyan-400',
        features: [
            'Ability to Create a Guild',
            'Unlock All Learning Stages Instantly',
            'Exclusive Profile Badge',
            'Ad-Free Experience',
            '5% Shop Discount',
            'Monthly 1,000 Coins',
        ],
        highlight: false,
    },
    {
        name: 'Premium+',
        monthlyPrice: '₹350/mo',
        yearlyPrice: '₹3500/yr',
        icon: Sparkles,
        color: 'text-fuchsia-400',
        features: [
            'All Premium Benefits',
            'Golden Username Effect',
            'Exclusive Animated Avatar Frame',
            '10% Shop Discount',
            'Monthly 2,500 Coins',
        ],
        highlight: true,
    },
    {
        name: 'Elite',
        monthlyPrice: '₹550/mo',
        yearlyPrice: '₹5500/yr',
        icon: Crown,
        color: 'text-yellow-400',
        features: [
            'All Premium+ Benefits',
            'Custom Guild Roles',
            'Beta Access to New Features',
            '15% Shop Discount',
            'Monthly 6,000 Coins',
        ],
        highlight: false,
    },
     {
        name: 'Super',
        monthlyPrice: '₹800/mo',
        yearlyPrice: '₹8000/yr',
        icon: Wand2,
        color: 'text-purple-400',
        features: [
            'All Elite Benefits',
            'Unique "Super" Title & Badge',
            'Direct line to support',
            '20% Shop Discount',
            'Monthly 15,000 Coins',
        ],
        highlight: false,
    },
];

export const currencyPacks = [
    { name: 'Pocket of Coins', amount: 5000, price: '₹89', currency: 'coins' },
    { name: 'Fistful of Gems', amount: 100, price: '₹89', currency: 'gems' },
    { name: 'Bag of Coins', amount: 12000, price: '₹179', currency: 'coins' },
    { name: 'Handful of Gems', amount: 250, price: '₹179', currency: 'gems' },
    { name: 'Chest of Coins', amount: 30000, price: '₹349', currency: 'coins' },
    { name: 'Treasure of Gems', amount: 600, price: '₹449', currency: 'gems' },
];
