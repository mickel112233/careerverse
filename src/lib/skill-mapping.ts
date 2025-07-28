
export type PowerLevels = {
    logic: number;
    creativity: number;
    leadership: number;
    technical: number;
    social: number;
};

export const categoryToSkillMapping: { [key: string]: keyof PowerLevels } = {
    'Canva Design': 'creativity',
    'ChatGPT Prompt Engineering': 'technical',
    'Social Media Management': 'social',
    'Reels & Shorts Video Editing': 'creativity',
    'Basic SEO': 'technical',
    'Affiliate Marketing': 'social',
    'Copywriting': 'creativity',
    'Resume & LinkedIn Optimization': 'social',
    'Digital Product Creation': 'leadership',
    'AI Literacy': 'logic'
};
