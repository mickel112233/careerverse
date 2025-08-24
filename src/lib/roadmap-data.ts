
import { Code, Palette, Megaphone, BrainCircuit, Bot, Gamepad2, PenSquare, Briefcase, Handshake, Cloud, ClipboardList, Rocket, Tv, Sparkles } from 'lucide-react';
import { canvaDesignRoadmap } from './roadmaps/canva-design';
import { promptEngineeringRoadmap } from './roadmaps/prompt-engineering';
import { reelsEditingRoadmap } from './roadmaps/reels-editing';
import { basicSeoRoadmap } from './roadmaps/basic-seo';
import { socialMediaRoadmap } from './roadmaps/social-media';
import { affiliateMarketingRoadmap } from './roadmaps/affiliate-marketing';

export interface RoadmapLevel {
    id: string;
    title: string;
    description: string;
    xp: number;
    coins: number;
    content?: string;
};

export interface Roadmap {
    streamName: string;
    levels: RoadmapLevel[];
}

export const allStreams = [
    { name: 'Canva Design', icon: Palette, category: 'creativity' },
    { name: 'ChatGPT Prompt Engineering', icon: Bot, category: 'technical' },
    { name: 'Social Media Management', icon: Megaphone, category: 'social' },
    { name: 'Reels & Shorts Video Editing', icon: Tv, category: 'creativity' },
    { name: 'Basic SEO', icon: BrainCircuit, category: 'technical' },
    { name: 'Affiliate Marketing', icon: Handshake, category: 'social' },
    { name: 'Copywriting', icon: PenSquare, category: 'creativity' },
    { name: 'Resume & LinkedIn Optimization', icon: Briefcase, category: 'social' },
    { name: 'Digital Product Creation', icon: Sparkles, category: 'leadership' },
    { name: 'AI Literacy', icon: Rocket, category: 'logic' }
];

const roadmaps: { [key: string]: Roadmap } = {
    "Canva Design": canvaDesignRoadmap,
    "ChatGPT Prompt Engineering": promptEngineeringRoadmap,
    "Reels & Shorts Video Editing": reelsEditingRoadmap,
    "Basic SEO": basicSeoRoadmap,
    "Social Media Management": socialMediaRoadmap,
    "Affiliate Marketing": affiliateMarketingRoadmap,
};

export function getRoadmapByStream(streamName: string): Roadmap | null {
    return roadmaps[streamName] || null;
}
