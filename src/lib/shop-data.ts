
import { Gem, Shield, Star, Zap, Paintbrush, Sparkles, Crown, Trophy, Percent, FileText, Package, Bot, Ghost, Flame, Wand2 } from "lucide-react";

export type ShopItem = {
    name: string;
    price: number;
    currency: 'coins' | 'gems';
    type: 'Frame' | 'Animation' | 'Theme' | 'Title' | 'Pet';
    icon: React.ElementType;
    prompt: string;
    description: string;
    rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
};

export const addOns: ShopItem[] = [
  { name: 'Cosmic Avatar Frame', price: 50, currency: 'gems', type: 'Frame', icon: Star, prompt: 'A square frame with swirling nebulae, distant stars, cosmic dust, glowing accents, sci-fi and ethereal style.', description: 'A frame swirling with nebulae and distant stars.', rarity: 'Rare' },
  { name: 'Neon Glow Profile FX', price: 75, currency: 'gems', type: 'Animation', icon: Zap, prompt: 'A square frame with vibrant neon lights pulsing outward, futuristic tech style, bright electric blue and purple accents.', description: 'Make your profile pulse with vibrant neon energy.', rarity: 'Rare' },
  { name: 'Dark Matter Theme', price: 150, currency: 'gems', type: 'Theme', icon: Paintbrush, prompt: 'A dark, sleek abstract background inspired by outer space and dark matter, subtle glowing patterns, cosmic textures, elegant and mysterious.', description: 'A sleek, dark theme inspired by the mysteries of space.', rarity: 'Epic' },
  { name: 'The Apprentice Title', price: 5000, currency: 'coins', type: 'Title', icon: Shield, prompt: 'A shiny, minimalist badge design for "The Apprentice" title, subtle gradient gold or silver effect, modern and clean style.', description: 'Show you\'re on the path to greatness.', rarity: 'Common' },
  { name: 'The Adept Title', price: 25000, currency: 'coins', type: 'Title', icon: Shield, prompt: 'ornate steel title banner', description: 'Your growing expertise is recognized.', rarity: 'Common' },
  { name: 'The Master Title', price: 75000, currency: 'coins', type: 'Title', icon: Trophy, prompt: 'masterful gold title banner', description: 'You have achieved a high level of skill.', rarity: 'Rare' },
  { name: 'The Legend Title', price: 200, currency: 'gems', type: 'Title', icon: Trophy, prompt: 'legendary trophy banner', description: 'Your name is whispered in the halls of champions.', rarity: 'Epic' },
  { name: 'God-Tier Title', price: 500, currency: 'gems', type: 'Title', icon: Crown, prompt: 'golden crown banner', description: 'You have ascended beyond mere mortals.', rarity: 'Legendary' },
  { name: 'Glitch-in-the-Matrix FX', price: 100, currency: 'gems', type: 'Animation', icon: Sparkles, prompt: 'glitch effect animation green', description: 'A subtle, digital glitch effect for your profile.', rarity: 'Rare' },
  { name: 'Clockwork Frame', price: 60, currency: 'gems', type: 'Frame', icon: Star, prompt: 'steampunk clockwork frame', description: 'A finely crafted frame of brass and gears.', rarity: 'Rare' },
  { name: 'AI Companion: Bit', price: 300, currency: 'gems', type: 'Pet', icon: Bot, prompt: 'small friendly robot pet', description: 'A curious little robot that follows you around.', rarity: 'Epic' },
  { name: 'AI Companion: Specter', price: 600, currency: 'gems', type: 'Pet', icon: Ghost, prompt: 'holographic ghost pet', description: 'A spectral, holographic companion for your profile.', rarity: 'Legendary' },
];

export const limitedTimeOffers: (ShopItem & { endsIn: string })[] = [
    { name: 'Fire & Ice Frame', price: 120, currency: 'gems', type: 'Frame', icon: Flame, prompt: 'A square frame design with dynamic swirling elemental fire and ice effects, glowing edges, magical, futuristic style.', description: 'A frame that swirls with elemental fire and ice.', rarity: 'Epic', endsIn: '2d 4h' },
    { name: 'The Pioneer Title', price: 50, currency: 'gems', type: 'Title', icon: Trophy, prompt: 'A badge design for "The Pioneer" title, symbolizing originality and legacy, elegant metallic finish, futuristic and inspiring look.', description: 'For those who were here from the start. A true original.', rarity: 'Legendary', endsIn: '1d 8h' },
];

export const memberships = [
    {
        name: 'Premium',
        price: '₹149/mo',
        icon: Star,
        color: 'text-cyan-400',
        features: [
            'Create a Guild',
            'Exclusive Profile Badge',
            'Ad-Free Experience',
            '5% Shop Discount',
            'Monthly 1,000 Coins',
        ],
        highlight: false,
    },
    {
        name: 'Premium+',
        price: '₹299/mo',
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
        price: '₹499/mo',
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
        price: '₹799/mo',
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

export const allShopItems = [...addOns, ...limitedTimeOffers];
