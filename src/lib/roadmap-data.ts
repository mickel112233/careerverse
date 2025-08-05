
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
    levels: [
        { id: 'canva-level-1', title: 'Introduction to Canva', description: 'What Canva is, what it’s used for, and why it’s a powerful tool for designers and non-designers alike.', xp: 100, coins: 10 },
        { id: 'canva-level-2', title: 'Navigating the Canva Dashboard and Editor', description: 'A tour of the main dashboard, project folders, and the core components of the design editor interface.', xp: 107, coins: 11 },
        { id: 'canva-level-3', title: 'Understanding File Types (JPG, PNG, PDF)', description: 'Learn the difference between key file formats and when to use each for web, print, and social media.', xp: 114, coins: 12 },
        { id: 'canva-level-4', title: 'Using Canva on Mobile', description: 'Explore the mobile app interface, its unique features, and how to design effectively on the go.', xp: 121, coins: 13 },
        { id: 'canva-level-5', title: 'Working with Templates', description: 'How to find, customize, and effectively use Canva’s vast library of pre-designed templates.', xp: 128, coins: 14 },
        { id: 'canva-level-6', title: 'Basic Text and Typography', description: 'Add and style text, understand headings vs. body text, and apply basic text effects.', xp: 135, coins: 15 },
        { id: 'canva-level-7', title: 'Using Canva Elements (Shapes, Icons, Photos)', description: 'Discover the Elements library and how to add shapes, icons, and other graphics to your designs.', xp: 142, coins: 16 },
        { id: 'canva-level-8', title: 'Uploading Your Own Images', description: 'Learn how to upload, manage, and edit your own photos and logos within Canva.', xp: 149, coins: 17 },
        { id: 'canva-level-9', title: 'Saving and Sharing Designs', description: 'How to save your work, download it in various formats, and share it for collaboration or publishing.', xp: 156, coins: 18 },
        { id: 'canva-level-10', title: 'Working with Photos in Canva', description: 'How to use Canva’s built-in photo library, apply filters, and make basic adjustments.', xp: 163, coins: 19 },
        ...Array.from({ length: 90 }, (_, i) => {
            const levelNum = i + 11;
            return {
                id: `canva-level-${levelNum}`,
                title: `Level ${levelNum}: Placeholder Title`,
                description: `This is a placeholder description for level ${levelNum} of the Canva Design roadmap.`,
                xp: 100 + (levelNum * 7),
                coins: 10 + levelNum,
            };
        }),
    ],
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
