
import { Code, Palette, Megaphone, BrainCircuit, Bot, Gamepad2, PenSquare, Briefcase, Handshake, Cloud, ClipboardList, Rocket, Tv, Sparkles } from 'lucide-react';

export interface RoadmapLevel {
    id: string;
    title: string;
    description: string;
    xp: number;
    coins: number;
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

const canvaDesignRoadmap: Roadmap = {
    streamName: 'Canva Design',
    levels: Array.from({ length: 100 }, (_, i) => {
        const levelNum = i + 1;
        return {
            id: `canva-level-${levelNum}`,
            title: `Level ${levelNum}: Placeholder Title`,
            description: `This is a placeholder description for level ${levelNum} of the Canva Design roadmap.`,
            xp: 100 + (i * 7),
            coins: 10 + i,
        };
    }),
};

// You can add other roadmaps here
// const promptEngineeringRoadmap: Roadmap = { ... };

const roadmaps: { [key: string]: Roadmap } = {
    'Canva Design': canvaDesignRoadmap,
    // 'ChatGPT Prompt Engineering': promptEngineeringRoadmap, // Add other roadmaps here
};

export function getRoadmapByStream(streamName: string): Roadmap | null {
    // For now, we only return the Canva roadmap, as it's the only one with data.
    // In the future, this could look up different roadmaps.
    if (streamName && roadmaps[streamName]) {
        return roadmaps[streamName];
    }
    // Return a default or null if the selected stream has no roadmap yet.
    // For this app, we'll just return the Canva one if any valid stream is selected.
    if(allStreams.some(s => s.name === streamName)) {
        return canvaDesignRoadmap;
    }

    return null;
}
